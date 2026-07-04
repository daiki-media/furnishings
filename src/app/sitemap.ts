import { MetadataRoute } from 'next';
import { getCategories, getProducts, getBlogs } from '@/lib/api';
import { Category, Product, Blog, BlogResponse } from '@/lib/interfaces';

// ISR: regenerate at most once an hour instead of on every crawler request,
// so a slow/unreachable CMS can't make the sitemap fail or serve only the
// static-page fallback in the middle of a crawl.
export const revalidate = 3600;

const baseUrl = 'https://www.furnishings.com.my';

const staticPages = [
    { url: '/', priority: 1.0 },
    { url: '/about-us', priority: 0.8 },
    { url: '/contact', priority: 0.8 },
    { url: '/blog', priority: 0.7 },
    { url: '/return-and-refunds-policy', priority: 0.5 },
    { url: '/terms-and-conditions', priority: 0.5 },
    { url: '/privacy-policy', priority: 0.5 },
    { url: '/cookie-policy', priority: 0.5 },
];

function cleanUrl(url: string): string {
    return url.replace(/[&]/g, 'and').replace(/\s+/g, '-').toLowerCase();
}

function getLastModified(item: any): string {
    const currentDate = new Date().toISOString();
    return item.updatedAt || item.updated_at || item.createdAt || item.created_at || currentDate;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    try {
        // Use centralized API functions
        const [categoriesData, productsData, blogsData] = await Promise.all([
            getCategories(),
            getProducts(),
            getBlogs(),
        ]);

        // Ensure we're working with arrays
        const categories = Array.isArray(categoriesData) ? categoriesData as Category[] : [];
        const products = Array.isArray(productsData) ? productsData as Product[] : [];
        
        // Handle blogs data which might have different structure
        let blogs: Blog[] = [];
        if (Array.isArray(blogsData)) {
            blogs = blogsData as Blog[];
        } else if (blogsData && typeof blogsData === 'object' && 'data' in blogsData && Array.isArray((blogsData as BlogResponse).data)) {
            blogs = (blogsData as BlogResponse).data;
        }

        const currentDate = new Date().toISOString();

        // Static pages
        const staticUrls = staticPages.map((page) => ({
            url: `${baseUrl}${cleanUrl(page.url)}`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: page.priority,
        }));

        // Category URLs
        const categoryUrls = categories
            .filter((category): category is Category => !!category?.slug)
            .map((category) => ({
                url: `${baseUrl}/category/${cleanUrl(category.slug)}`,
                lastModified: getLastModified(category),
                changeFrequency: 'weekly' as const,
                priority: 0.8,
            }));

        // Product URLs
        const productUrls = products
            .filter((product): product is Product => !!product?.slug)
            .map((product) => {
                const categorySlug = product.category?.slug ? cleanUrl(product.category.slug) : 'products';
                const productSlug = cleanUrl(product.slug);

                return {
                    url: `${baseUrl}/shop/${categorySlug}/${productSlug}`,
                    lastModified: getLastModified(product),
                    changeFrequency: 'daily' as const,
                    priority: 0.7,
                };
            });

        // Blog URLs
        const blogUrls = blogs
            .filter((blog): blog is Blog => !!blog?.slug)
            .map((blog) => ({
                url: `${baseUrl}/blog/${cleanUrl(blog.slug)}`,
                lastModified: getLastModified(blog),
                changeFrequency: 'weekly' as const,
                priority: 0.6,
            }));

        const finalSitemap = [...staticUrls, ...categoryUrls, ...productUrls, ...blogUrls];

        // Log for debugging (optional - remove in production)
        if (process.env.NODE_ENV === 'development') {
            console.log(`Sitemap generated with ${finalSitemap.length} URLs`);
            console.log(`Static: ${staticUrls.length}, Categories: ${categoryUrls.length}, Products: ${productUrls.length}, Blogs: ${blogUrls.length}`);
        }

        return finalSitemap;
    } catch (error) {
        console.error('Sitemap generation failed:', error);

        // Fallback to static pages only
        const currentDate = new Date().toISOString();
        return staticPages.map((page) => ({
            url: `${baseUrl}${cleanUrl(page.url)}`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: page.priority,
        }));
    }
}