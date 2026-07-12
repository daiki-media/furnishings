import type { Metadata } from "next";
import Link from "next/link";
import BlogList from "@/components/blogs/blog-section";

export const metadata: Metadata = {
    title: "Flooring & Home Décor Blog Malaysia | Vinyl, SPC & Interior Ideas | Furnishing",
    description: "Read flooring and home décor tips for Malaysian homes and offices on the Furnishing blog. Discover vinyl, SPC, laminate and carpet tile ideas, maintenance guides and renovation inspiration.",
    alternates: {
        canonical: "https://www.furnishings.com.my/blog",
    },
    openGraph: {
        title: "Flooring & Home Décor Blog Malaysia | Furnishing Solutions",
        description: "Read flooring and home décor tips for Malaysian homes and offices. Discover vinyl, SPC, laminate and carpet tile ideas, maintenance guides and renovation inspiration.",
        url: "https://www.furnishings.com.my/blog",
        siteName: "Furnishing Solutions",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Flooring & Home Décor Blog Malaysia | Furnishing Solutions",
        description: "Read flooring and home décor tips for Malaysian homes and offices.",
    },
};

// CollectionPage structured data for the blog listing
const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Furnishing Solutions Blog",
    description: "Flooring and home décor tips, maintenance guides and renovation inspiration for Malaysian homes and offices.",
    url: "https://www.furnishings.com.my/blog",
    isPartOf: {
        "@type": "WebSite",
        name: "Furnishing Solutions",
        url: "https://www.furnishings.com.my",
    },
};

export default function BlogPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
      />

      {/* Hero */}
      <section className="relative bg-charcoal overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-600/15 blur-3xl" />
        <div className="relative container mx-auto px-6 pt-16 pb-16 md:pt-20 md:pb-20">
          <nav className="text-sm text-white/60 mb-5">
            <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/90">Blog</span>
          </nav>
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-orange-400 mb-4">
            <span className="h-px w-6 bg-orange-400/70" />
            From Our Journal
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium text-white leading-[1.05] tracking-tight max-w-3xl">
            Flooring &amp; home décor blog
          </h1>
          <p className="mt-5 text-lg text-white/75 max-w-2xl leading-relaxed">
            Ideas, inspiration and practical guides for Malaysian homes and offices — from vinyl and SPC tips to interior design trends.
          </p>
        </div>
      </section>

      <BlogList
        showPagination={true}
        itemsPerPage={9}
        currentPage={1}
      />
    </main>
  );
}

export const revalidate = 1800;
