import type { Metadata } from "next";
import Link from "next/link";
import ProductsSection from "@/components/shop/product-section";
import { getCategories, getProducts, getProductsStatus } from "@/lib/api";

export const metadata: Metadata = {
    title: "Shop Vinyl, SPC, Laminate & Carpet Tiles Online in Malaysia | Furnishing",
    description: "Browse all vinyl, SPC, laminate flooring and carpet tiles online at Furnishing Malaysia. Compare designs and finishes, then request a quotation or consultation for your home or office.",
    alternates: {
        canonical: "https://www.furnishings.com.my/shop",
    },
    openGraph: {
        title: "Shop Flooring Online | Furnishing Solutions Malaysia",
        description: "Browse vinyl, SPC, laminate flooring and carpet tiles. Compare designs, then request a quotation for your home or office.",
        url: "https://www.furnishings.com.my/shop",
        siteName: "Furnishing Solutions",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Shop Flooring Online | Furnishing Solutions Malaysia",
        description: "Browse vinyl, SPC, laminate flooring and carpet tiles online.",
    },
};

const shopSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Shop Flooring Products",
    description: "Browse all vinyl, SPC, laminate flooring and carpet tiles at Furnishing Solutions Malaysia.",
    url: "https://www.furnishings.com.my/shop",
    isPartOf: {
        "@type": "WebSite",
        name: "Furnishing Solutions",
        url: "https://www.furnishings.com.my",
    },
};

interface ShopPageProps {
    searchParams?: Promise<{
        page?: string;
        category?: string;
        sort?: string;
    }>;
}

export default async function Shop({ searchParams }: ShopPageProps) {
    const params = await searchParams;
    const page = Number(params?.page) || 1;
    const category = params?.category;
    const sort = params?.sort;

    const [initialProducts, initialCategories, productsStatus] = await Promise.all([
        getProducts(),
        getCategories(),
        getProductsStatus(),
    ]);

    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(shopSchema) }}
            />

            {/* Hero */}
            <section className="relative bg-charcoal overflow-hidden">
                <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-600/15 blur-3xl" />
                <div className="relative container mx-auto px-6 pt-16 pb-16 md:pt-20 md:pb-20">
                    <nav className="text-sm text-white/60 mb-5">
                        <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
                        <span className="mx-2">/</span>
                        <span className="text-white/90">Shop</span>
                    </nav>
                    <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-orange-400 mb-4">
                        <span className="h-px w-6 bg-orange-400/70" />
                        Our Collection
                    </span>
                    <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium text-white leading-[1.05] tracking-tight max-w-3xl">
                        Vinyl &amp; flooring solutions
                    </h1>
                    <p className="mt-5 text-lg text-white/75 max-w-2xl leading-relaxed">
                        Browse our full range of vinyl, SPC, laminate and carpet tile flooring — compare designs and request a quotation.
                    </p>
                </div>
            </section>

            <ProductsSection
                page={page}
                category={category}
                sort={sort}
                itemsPerPage={12}
                initialProducts={initialProducts}
                initialCategories={initialCategories}
                fetchFailed={productsStatus.failed}
            />
        </main>
    );
}

export const revalidate = 1800;
