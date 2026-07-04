import { cache } from "react";
import { Blog } from "./interfaces";

const API_BASE = "https://cms.furnishings.daikimedia.com/api";

async function fetchWithRetry(url: string, options: RequestInit = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      // 45s, not 10s: the CMS blogs endpoint regularly takes 30s+ to respond.
      // With a 10s abort every attempt failed even though the CMS would have
      // answered. Users never wait on this — pages are prerendered and only
      // builds/background revalidations hit the CMS.
      const timeoutId = setTimeout(() => controller.abort(), 45000);

      const res = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        console.error(`API error (attempt ${i + 1}/${retries}):`, res.status);
        if (i === retries - 1) return null;
        continue;
      }

      const contentType = res.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error(
          `Non-JSON response (attempt ${i + 1}/${retries}):`,
          text.substring(0, 200)
        );
        if (i === retries - 1) return null;
        continue;
      }

      return res;
    } catch (error) {
      console.error(`Fetch attempt ${i + 1}/${retries} failed:`, error);

      // Never throw: a single unreachable-CMS request must not crash a build
      // or page render. Callers all handle null by falling back to empty data.
      if (i === retries - 1) return null;

      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, i) * 1000)
      );
    }
  }

  return null;
}


// In the browser we fetch from our own /api proxy routes instead of the CMS:
// same-origin, served with the Cache-Control headers from next.config.ts, so
// repeat page views hit the browser/CDN cache instead of re-downloading the
// full payload from the CMS on every visit.
//
// Returns `failed: true` when the CMS request itself broke (network error,
// non-2xx, bad payload) as opposed to the CMS legitimately reporting zero
// products, so callers can tell "temporarily unavailable" from "no products"
// instead of rendering both as a bare empty state.
const fetchProductsWithStatus = async (): Promise<{ data: any[]; failed: boolean }> => {
  try {
    const isBrowser = typeof window !== "undefined";
    const res = await fetchWithRetry(
      isBrowser ? "/api/products" : `${API_BASE}/products`,
      isBrowser ? {} : { next: { revalidate: 1800 } }
    );

    if (!res) return { data: [], failed: true };

    const data = await res.json();
    if (!data.success) {
      console.error("Products API responded without success:", data);
      return { data: [], failed: true };
    }
    return { data: data.data, failed: false };
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return { data: [], failed: true };
  }
};

// Browser-side memoization: several client components call getProducts() from
// their own useEffect, and React's cache() only dedupes during a server render.
// Without this, /api/products (a large payload) is downloaded multiple times per
// page load. Caching the in-flight promise per browser session fixes that.
let clientProductsPromise: ReturnType<typeof fetchProductsWithStatus> | null = null;

const getProductsWithStatus = cache(async () => {
  if (typeof window !== "undefined") {
    if (!clientProductsPromise) {
      clientProductsPromise = fetchProductsWithStatus().catch((error) => {
        clientProductsPromise = null; // allow retry on failure
        throw error;
      });
    }
    return clientProductsPromise;
  }
  return fetchProductsWithStatus();
});

export const getProducts = cache(async () => {
  const { data } = await getProductsWithStatus();
  return data;
});

// For pages that need to distinguish a broken CMS request from a genuinely
// empty catalogue (e.g. the shop page showing "0 of 0 products").
export const getProductsStatus = cache(async () => {
  const { data, failed } = await getProductsWithStatus();
  return { count: data.length, failed };
});

export const getProductBySlug = cache(async (slug: string) => {
  const normalizedSlug = slug.toLowerCase().trim();

  try {
    // Reuse the already-fetched (and cache()-deduped within this render)
    // product catalog first. This is also a correctness fix: the CMS's
    // `?slug=` query has been observed to ignore the filter and return the
    // full, unfiltered catalog (same byte size as /api/products), which
    // made the old `data.data[0]` fallback silently return whichever
    // product happened to be first in the catalog for every slug.
    const products = await getProducts();
    const found = products.find(
      (p: any) => p.slug?.toLowerCase().trim() === normalizedSlug
    );
    if (found) return found;

    // Fallback for a product that isn't in the general list yet (e.g. just
    // published, ahead of that cache's revalidation). Search the response
    // by slug rather than trusting data.data[0], since the endpoint may
    // return the whole catalog regardless of the query.
    const res = await fetchWithRetry(`${API_BASE}/products?slug=${slug}`, {
      next: { revalidate: 1800 },
    });

    if (res) {
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        const match = data.data.find(
          (p: any) => p.slug?.toLowerCase().trim() === normalizedSlug
        );
        if (match) return match;
        // Only trust a single-item response as an actual filter match.
        if (data.data.length === 1) return data.data[0];
      }
    }

    return null;
  } catch (error) {
    console.error("Failed to fetch product by slug:", error);
    return null;
  }
});


const fetchCategories = async () => {
  try {
    const isBrowser = typeof window !== "undefined";
    const res = await fetchWithRetry(
      isBrowser ? "/api/categories" : `${API_BASE}/categories`,
      isBrowser ? {} : { next: { revalidate: 3600 } }
    );

    if (!res) return [];

    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
};

// Same browser-side memoization as products: navbar + footer both call
// getCategories() on every page, so without this the request fires repeatedly.
let clientCategoriesPromise: ReturnType<typeof fetchCategories> | null = null;

export const getCategories = cache(async () => {
  if (typeof window !== "undefined") {
    if (!clientCategoriesPromise) {
      clientCategoriesPromise = fetchCategories().catch((error) => {
        clientCategoriesPromise = null; // allow retry on failure
        throw error;
      });
    }
    return clientCategoriesPromise;
  }
  return fetchCategories();
});


// Stable sort so pagination (archive pages, /blog/page/[n]) always slices the
// same order. Without this, posts can shift position between requests and a
// page can end up empty while another post is skipped entirely.
function sortBlogsStable(blogs: Blog[]): Blog[] {
  return [...blogs].sort((a, b) => {
    const dateA = new Date(a.publish_date || a.created_at || 0).getTime() || 0;
    const dateB = new Date(b.publish_date || b.created_at || 0).getTime() || 0;
    if (dateB !== dateA) return dateB - dateA;
    return (b.id || 0) - (a.id || 0);
  });
}

export const getBlogs = cache(async () => {
  try {
    const res = await fetchWithRetry(`${API_BASE}/blogs/all-blogs`, {
      next: { revalidate: 1800 },
    });

    if (!res) {
      return {
        success: false,
        data: [],
        meta: { currentPage: 1, totalPages: 0, totalItems: 0 },
      };
    }

    const data = await res.json();

    if (Array.isArray(data)) {
      const sorted = sortBlogsStable(data);
      return {
        success: true,
        data: sorted,
        meta: {
          currentPage: 1,
          totalPages: 1,
          totalItems: sorted.length,
        },
      };
    }

    if (data?.data && Array.isArray(data.data)) {
      const sorted = sortBlogsStable(data.data);
      return {
        success: true,
        data: sorted,
        meta: data.meta || {
          currentPage: 1,
          totalPages: 1,
          totalItems: sorted.length,
        },
      };
    }

    return {
      success: true,
      data: [],
      meta: { currentPage: 1, totalPages: 0, totalItems: 0 },
    };
  } catch (error) {
    console.error("Error fetching blogs:", error);

    return {
      success: false,
      data: [],
      meta: { currentPage: 1, totalPages: 0, totalItems: 0 },
    };
  }
});



export const getBlogBySlug = cache(async (slug: string) => {
  try {
    // Try direct slug endpoint with retry logic
    const res = await fetchWithRetry(`${API_BASE}/blogs/${slug}`, {
      next: { revalidate: 1800 },
    });

    if (res) {
      const data = await res.json();
      // Handle both direct object and wrapped responses
      if (data && !data.error) return data.data ?? data;
    }

    // Fallback: search within all blogs
    const allBlogs = await getBlogs();
    const found = allBlogs.data?.find((blog: any) => blog.slug === slug);
    return found || null;

  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    return null;
  }
});