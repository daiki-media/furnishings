import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import BlogList from "@/components/blogs/blog-section";
import { getBlogs } from "@/lib/api";

const ITEMS_PER_PAGE = 9;

type Props = {
  params: Promise<{ pageNumber: string }>;
};

export async function generateStaticParams() {
  const response = await getBlogs();
  const total = response.success && Array.isArray(response.data) ? response.data.length : 0;
  const totalPages = Math.max(Math.ceil(total / ITEMS_PER_PAGE), 1);

  return Array.from({ length: Math.max(totalPages - 1, 0) }, (_, i) => ({
    pageNumber: String(i + 2),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pageNumber } = await params;
  return {
    title: `Flooring & Home Décor Blog Malaysia | Page ${pageNumber} | Furnishing`,
    description:
      "Read flooring and home décor tips for Malaysian homes and offices on the Furnishing blog. Discover vinyl, SPC, laminate and carpet tile ideas, maintenance guides and renovation inspiration.",
    alternates: {
      canonical: `https://www.furnishings.com.my/blog/page/${pageNumber}`,
    },
    // Paginated pages should not be indexed — page 1 (/blog) is the canonical
    // listing. This prevents duplicate-content signals for search engines.
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      title: `Flooring Blog — Page ${pageNumber} | Furnishing Solutions`,
      description: "Read flooring and home décor tips for Malaysian homes and offices.",
      url: `https://www.furnishings.com.my/blog/page/${pageNumber}`,
      siteName: "Furnishing Solutions",
      type: "website",
    },
  };
}

export default async function BlogPaginatedPage({ params }: Props) {
  const { pageNumber } = await params;
  const currentPage = Number(pageNumber);

  if (!Number.isInteger(currentPage) || currentPage < 1) {
    notFound();
  }
  if (currentPage === 1) {
    redirect("/blog");
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-charcoal overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-600/15 blur-3xl" />
        <div className="relative container mx-auto px-6 pt-16 pb-16 md:pt-20 md:pb-20">
          <nav className="text-sm text-white/60 mb-5">
            <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-orange-400 transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-white/90">Page {currentPage}</span>
          </nav>
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-orange-400 mb-4">
            <span className="h-px w-6 bg-orange-400/70" />
            From Our Journal
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium text-white leading-[1.05] tracking-tight max-w-3xl">
            Flooring &amp; home décor blog
          </h1>
          <p className="mt-5 text-lg text-white/75 max-w-2xl leading-relaxed">
            Ideas, inspiration and practical guides for Malaysian homes and offices — page {currentPage}.
          </p>
        </div>
      </section>

      <BlogList
        showPagination={true}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
      />
    </main>
  );
}

export const revalidate = 1800;
