import type { Metadata } from "next";
import CollectionsPage from "@/components/category/collections-page";
import { collectionsDoc } from "@/data/category-page-content";
import { getCategories } from "@/lib/api";
import { Category, getCategoryImageUrl } from "@/lib/interfaces";

// Meta title and description from the SEO content sheet (Furnishings tab, row 4).
export const metadata: Metadata = {
    title: "Vinyl, SPC, Laminate and Carpet Tile Flooring - Furnishings",
    description:
        "Compare vinyl sheet, SPC, laminate, carpet tile and artificial grass collections. See real specifications, then request a free quote or sample.",
    alternates: {
        canonical: "https://www.furnishings.com.my/category",
    },
};

export const revalidate = 1800;

export default async function CategoryPage() {
    // Category photos from the CMS. The page still renders its copy if the
    // CMS is unreachable; only the photos are left out.
    const images: Record<string, string> = {};
    try {
        const categories: Category[] = (await getCategories()) ?? [];
        for (const category of categories) {
            if (category.image) images[category.slug] = getCategoryImageUrl(category);
        }
    } catch {
        // No photos this render.
    }

    return <CollectionsPage doc={collectionsDoc} images={images} />;
}
