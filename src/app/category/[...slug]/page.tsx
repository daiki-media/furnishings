import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import CategoryPage from "@/components/category/category-page";
import ProductsLoading from "@/components/shop/products-loading";
import { getCategories, getProducts } from "@/lib/api";
import { Category, Product } from "@/lib/interfaces";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateStaticParams() {
  const categories: Category[] = await getCategories();
  if (!Array.isArray(categories)) return [];
  return categories
    .filter((c) => typeof c.slug === "string" && c.slug.length > 0)
    .map((c) => ({ slug: [c.slug] }));
}

export const revalidate = 1800;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  if (!Array.isArray(slug) || slug.length === 0) {
    return {
      title: "Category Not Found",
      description: "The category you are looking for does not exist.",
    };
  }

  const categorySlug = slug[0];
  const categories: Category[] = await getCategories();

  const category = categories.find(
    (c) => c.slug.toLowerCase().trim() === categorySlug.toLowerCase().trim()
  );

  if (!category) {
    return {
      title: "Category Not Found",
      description: "The category you are looking for does not exist.",
    };
  }

  const title = `${category.name} Flooring Malaysia | Furnishing Solutions`;
  const description = `Shop ${category.name.toLowerCase()} flooring in Malaysia — ${category.products_count} products available. Professional supply, installation and warranty from Furnishing Solutions.`;
  const canonicalUrl = `https://www.furnishings.com.my/category/${categorySlug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Furnishing Solutions",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CategoryPageRoute({ params }: Props) {
  const { slug } = await params;

  if (!Array.isArray(slug) || slug.length === 0) {
    notFound();
  }

  const categorySlug = slug[0];
  const normalizedSlug = categorySlug.toLowerCase().trim();

  const [categories, allProducts] = await Promise.all([
    getCategories(),
    getProducts(),
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

  const canonicalUrl = `https://www.furnishings.com.my/category/${categorySlug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.furnishings.com.my" },
      { "@type": "ListItem", position: 2, name: "Categories", item: "https://www.furnishings.com.my/category" },
      { "@type": "ListItem", position: 3, name: category.name, item: canonicalUrl },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${category.name} Flooring`,
    description: `${category.name} flooring products available at Furnishing Solutions Malaysia.`,
    url: canonicalUrl,
    numberOfItems: categoryProducts.length,
    itemListElement: categoryProducts.slice(0, 20).map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      url: `https://www.furnishings.com.my/shop/${product.category?.slug || "uncategorized"}/${product.slug}`,
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Hero */}
      <section className="relative bg-charcoal overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-600/15 blur-3xl" />
        <div className="relative container mx-auto px-6 pt-16 pb-16 md:pt-20 md:pb-20">
          <nav className="text-sm text-white/60 mb-5">
            <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/category" className="hover:text-orange-400 transition-colors">Categories</Link>
            <span className="mx-2">/</span>
            <span className="text-white/90">{category.name}</span>
          </nav>
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-orange-400 mb-4">
            <span className="h-px w-6 bg-orange-400/70" />
            {category.name}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium text-white leading-[1.05] tracking-tight max-w-3xl">
            {category.name} in Malaysia
          </h1>
          <p className="mt-5 text-lg text-white/75 max-w-2xl leading-relaxed">
            Browse {categoryProducts.length} {category.name.toLowerCase()} flooring products — professional supply, installation and warranty included.
          </p>
        </div>
      </section>

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
