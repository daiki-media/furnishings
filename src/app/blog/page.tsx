import type { Metadata } from "next";
import PageHeader from "@/components/common/header";
import BlogList from "@/components/blogs/blog-section";

export const metadata: Metadata = {
    title: "Flooring & Home Décor Blog Malaysia | Vinyl, SPC & Interior Ideas | Furnishing",
    description: "Read flooring and home décor tips for Malaysian homes and offices on the Furnishing blog. Discover vinyl, SPC, laminate and carpet tile ideas, maintenance guides and renovation inspiration.",
    alternates: {
        canonical: "https://www.furnishings.com.my/blog",
    },
};

// Static ISR page (no searchParams): pagination lives at /blog/page/[n], so
// every blog page is served from the static cache and the CMS is only hit on
// revalidation — never on a user request.
export default function BlogPage() {
  return (
    <main>
      <PageHeader title="Flooring & Home Décor Blog in Malaysia" />

      <BlogList
        showPagination={true}
        itemsPerPage={9}
        currentPage={1}
      />

    </main>
  );
}

export const revalidate = 1800;
