import type { Metadata } from "next";
import Link from "next/link";
import FloorCategories from "@/components/home/collection";

export const metadata: Metadata = {
    title: "Flooring Categories Malaysia | Vinyl, SPC, Laminate & Carpet Tile | Furnishing",
    description: "Browse flooring categories from Furnishing Solutions — vinyl planks, SPC panels, laminate, carpet tiles and more. Professional supply and installation across Malaysia.",
    alternates: {
        canonical: "https://www.furnishings.com.my/category",
    },
    openGraph: {
        title: "Flooring Categories | Furnishing Solutions Malaysia",
        description: "Browse vinyl, SPC, laminate and carpet tile flooring categories. Professional supply and installation across Malaysia.",
        url: "https://www.furnishings.com.my/category",
        siteName: "Furnishing Solutions",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Flooring Categories | Furnishing Solutions Malaysia",
        description: "Browse vinyl, SPC, laminate and carpet tile flooring categories.",
    },
};

const categoryListSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Flooring Categories",
    description: "Browse flooring categories from Furnishing Solutions — vinyl, SPC, laminate, carpet tiles and more.",
    url: "https://www.furnishings.com.my/category",
    isPartOf: {
        "@type": "WebSite",
        name: "Furnishing Solutions",
        url: "https://www.furnishings.com.my",
    },
};

export default function CategoryPage() {
    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryListSchema) }}
            />

            {/* Hero */}
            <section className="relative bg-charcoal overflow-hidden">
                <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-600/15 blur-3xl" />
                <div className="relative container mx-auto px-6 pt-16 pb-16 md:pt-20 md:pb-20">
                    <nav className="text-sm text-white/60 mb-5">
                        <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
                        <span className="mx-2">/</span>
                        <span className="text-white/90">Categories</span>
                    </nav>
                    <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-orange-400 mb-4">
                        <span className="h-px w-6 bg-orange-400/70" />
                        Shop by Category
                    </span>
                    <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium text-white leading-[1.05] tracking-tight max-w-3xl">
                        Browse our flooring range
                    </h1>
                    <p className="mt-5 text-lg text-white/75 max-w-2xl leading-relaxed">
                        Explore vinyl, SPC, laminate, carpet tiles and more — each category tailored for Malaysian homes and commercial spaces.
                    </p>
                </div>
            </section>

            <FloorCategories />
        </main>
    );
}
