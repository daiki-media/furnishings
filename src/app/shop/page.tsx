import type { Metadata } from "next";
import PageHeader from "@/components/common/header";
import ProductsSection from "@/components/shop/product-section";
import { getCategories, getProducts, getProductsStatus } from "@/lib/api";

export const metadata: Metadata = {
    title: "Shop Vinyl, SPC, Laminate & Carpet Tiles Online in Malaysia | Furnishing",
    description: "Browse all vinyl, SPC, laminate flooring and carpet tiles online at Furnishing Malaysia. Compare designs and finishes, then request a quotation or consultation for your home or office",
    alternates: {
        canonical: "https://www.furnishings.com.my/shop",
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

    // Fetch on the server (cached via the centralized API) and pass to the
    // client filter UI as props — no client-side /api/products request.
    const [initialProducts, initialCategories, productsStatus] = await Promise.all([
        getProducts(),
        getCategories(),
        getProductsStatus(),
    ]);

    return (
        <main>
            <PageHeader title="Vinyl & Flooring Solutions in Malaysia" />

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