// src/app/category/[...slug]/page.tsx
import { notFound } from "next/navigation";
import { Suspense } from "react";
import CategoryPage from "@/components/category/category-page";
import PageHeader from "@/components/common/header";
import ProductsLoading from "@/components/shop/products-loading";
import { getCategories, getCategoriesOrThrow, getProductsOrThrow } from "@/lib/api";
import { Category, Product } from "@/lib/interfaces";

type Props = {
  params: Promise<{ slug: string[] }>;
};

// Prerender all category pages (SSG + ISR) — there are only a handful and
// they then serve from the static cache regardless of CMS availability.
export async function generateStaticParams() {
  const categories: Category[] = await getCategories();
  if (!Array.isArray(categories)) return [];
  return categories
    .filter((c) => typeof c.slug === "string" && c.slug.length > 0)
    .map((c) => ({ slug: [c.slug] }));
}

export const revalidate = 1800;

export default async function CategoryPageRoute({ params }: Props) {
  const { slug } = await params;

  if (!Array.isArray(slug) || slug.length === 0) {
    notFound();
  }

  const categorySlug = slug[0];
  const normalizedSlug = categorySlug.toLowerCase().trim();

  // Fetch on the cached server and pass to the client filter UI as props.
  // The strict versions throw when the CMS fails, so a failure can't be
  // cached as "0 products found" or a false 404.
  const [categories, allProducts] = await Promise.all([
    getCategoriesOrThrow(),
    getProductsOrThrow(),
  ]);

  const category = (categories as Category[]).find(
    (c: Category) => c.slug.toLowerCase().trim() === normalizedSlug
  );

  if (!category) {
    notFound();
  }

  const categoryProducts: Product[] = (allProducts || []).filter(
    (p: Product) => p.category?.slug?.toLowerCase().trim() === normalizedSlug
  );

  return (
    <main>
      {/* CategoryPage renders the page's H1 ("{Category} in Malaysia"). */}
      <PageHeader titleAs="p" />
      <Suspense fallback={<ProductsLoading />}>
        <CategoryPage
          slug={categorySlug}
          initialCategory={category}
          initialProducts={categoryProducts}
        />
      </Suspense>
    </main>
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  if (!Array.isArray(slug) || slug.length === 0) {
    return {
      title: "Category Not Found",
      description: "The category you are looking for does not exist.",
    };
  }

  const categorySlug = slug[0];
  const categories: Category[] = await getCategoriesOrThrow();

  const category = categories.find(
    (c) => c.slug.toLowerCase().trim() === categorySlug.toLowerCase().trim()
  );

  if (!category) {
    return {
      title: "Category Not Found",
      description: "The category you are looking for does not exist.",
    };
  }

  return {
    title: `${category.name} Flooring Malaysia | Furnishings`,
    description: `Browse our collection of ${category.name.toLowerCase()} flooring solutions in Malaysia.`,
    alternates: {
      canonical: `https://www.furnishings.com.my/category/${categorySlug}`,
    },
  };
}