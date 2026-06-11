import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import SingleProduct from "@/components/shop/single-product";
import PageHeader from "@/components/common/header";
import ProductLoading from "@/components/shop/product-loading";
import { getProductBySlug, getProducts } from "@/lib/api";
import { getFullImageUrl, Product } from "@/lib/interfaces";

type Params = {
  slug: string[];
};

// Prerender the first 60 product pages (SSG + ISR) at their canonical
// /shop/{category}/{product} paths; the rest render on first request and are
// cached from then on (dynamicParams ISR). Capped because prerendering all
// 800+ products fires hundreds of parallel build-time requests at the CMS,
// which it cannot handle (connect timeouts killed full builds).
const PRERENDER_PRODUCT_COUNT = 60;

export async function generateStaticParams() {
  const products = await getProducts();
  if (!Array.isArray(products)) return [];
  return products
    .filter((p: Product) => typeof p.slug === "string" && p.slug.length > 0)
    .slice(0, PRERENDER_PRODUCT_COUNT)
    .map((p: Product) => ({
      slug: [p.category?.slug || "uncategorized", p.slug],
    }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;

  if (!Array.isArray(slug) || slug.length === 0) {
    notFound();
  }
  if (slug.length === 1) {
    const productSlug = slug[0];
    const productData = await getProductBySlug(productSlug);

    if (!productData) {
      notFound();
    }

    const categorySlug = productData.category?.slug || "uncategorized";
    redirect(`/shop/${categorySlug}/${productData.slug}`);
  }
  if (slug.length === 2) {
    const [category, productSlug] = slug;

    return (
      <main>
        <PageHeader />
        <Suspense fallback={<ProductLoading />}>
          <ProductContent category={category} productSlug={productSlug} />
        </Suspense>
      </main>
    );
  }

  notFound();
}

async function ProductContent({
  category,
  productSlug,
}: {
  category: string;
  productSlug: string;
}) {
  const productData = await getProductBySlug(productSlug);

  if (!productData) {
    notFound();
  }

  const canonicalCategory = productData.category?.slug || "uncategorized";
  if (category.toLowerCase().trim() !== canonicalCategory.toLowerCase().trim()) {
    redirect(`/shop/${canonicalCategory}/${productData.slug}`);
  }

  const productWithFullUrls = {
    ...productData,
    images: {
      ...productData.images,
      main_image: getFullImageUrl(productData.images.main_image),
      gallery: (productData.images.gallery || []).map(getFullImageUrl),
      thumbnails: productData.images.thumbnails
        ? (Array.isArray(productData.images.thumbnails)
            ? productData.images.thumbnails.map(getFullImageUrl)
            : [])
        : [],
    },
  };

  // Compute related products on the cached server (same category first,
  // then fall back to any other products) instead of fetching on the client.
  const allProducts: Product[] = (await getProducts()) || [];
  let relatedProducts = allProducts
    .filter((p) => p.category?.slug === canonicalCategory && p.id !== productData.id)
    .slice(0, 4);
  if (relatedProducts.length === 0) {
    relatedProducts = allProducts.filter((p) => p.id !== productData.id).slice(0, 4);
  }

  return (
    <SingleProduct
      productData={productWithFullUrls}
      relatedProducts={relatedProducts}
    />
  );
}

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (!Array.isArray(slug) || slug.length === 0) {
    return {
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
    };
  }

  const productSlug = slug.length === 1 ? slug[0] : slug[1];
  const productData = await getProductBySlug(productSlug);

  if (!productData) {
    return {
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
    };
  }

  const categorySlug = productData.category?.slug || "uncategorized";
  const imageUrl = getFullImageUrl(productData.images.main_image) || "/placeholder.svg";
  const canonicalUrl = `https://www.furnishings.com.my/shop/${categorySlug}/${productData.slug}`;

  const metaTitle = productData.seo?.meta_title || `${productData.name} | Furnishings Malaysia`;
  const metaDescription = productData.seo?.meta_description || 
    `Shop ${productData.name} at Malaysia. Premium quality flooring solution with excellent durability and design.`;

  // Return the metadata object directly
  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonicalUrl,
      siteName: "Furnishings Malaysia",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: productData.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [imageUrl],
    },
    keywords: productData.seo?.keywords?.join(', ') || '',
  };
}