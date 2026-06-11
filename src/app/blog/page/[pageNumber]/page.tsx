import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import PageHeader from "@/components/common/header";
import BlogList from "@/components/blogs/blog-section";
import { getBlogs } from "@/lib/api";

// Path-based pagination (/blog/page/2, /blog/page/3, ...) so every page is a
// static ISR page served from cache. Query-string pagination would force the
// route to render dynamically on every request.
const ITEMS_PER_PAGE = 9;

type Props = {
  params: Promise<{ pageNumber: string }>;
};

export async function generateStaticParams() {
  const response = await getBlogs();
  const total = response.success && Array.isArray(response.data) ? response.data.length : 0;
  const totalPages = Math.max(Math.ceil(total / ITEMS_PER_PAGE), 1);

  // Page 1 lives at /blog, so prebuild pages 2..N.
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
      <PageHeader title="Flooring & Home Décor Blog in Malaysia" />

      <BlogList
        showPagination={true}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
      />
    </main>
  );
}

export const revalidate = 1800;
