import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getProducts } from "@/lib/api";
import { Product, getFullImageUrl, formatPrice } from "@/lib/interfaces";
import SectionHeading from "@/components/home/section-heading";

function shuffleArray<T>(array: T[]): T[] {
    if (!Array.isArray(array)) return [];

    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Server component: products are fetched on the cached server (no client-side
// /api/products download). Rendered as static HTML.
export default async function RelatedProducts() {
    const productsData = await getProducts();
    const products: Product[] =
        Array.isArray(productsData) && productsData.length > 0
            ? shuffleArray(productsData).slice(0, 4)
            : [];

    if (products.length === 0) {
        return null;
    }

    return (
        <section className="py-24 md:py-32 bg-cream">
            <div className="container mx-auto px-6">
                <SectionHeading
                    eyebrow="Explore Our Range"
                    title="Related products"
                    subtitle="Discover flooring solutions that complement the ideas in this article."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
                    {products.map((product) => {
                        const imageUrl = getFullImageUrl(product.images.main_image);
                        const categorySlug = product.category?.slug || 'uncategorized';
                        const price = product.retail_price || product.purchase_price || 0;

                        return (
                            <Link
                                key={product.id}
                                href={`/shop/${categorySlug}/${product.slug}`}
                                className="group h-full flex flex-col bg-white rounded-2xl border border-zinc-100 overflow-hidden hover:border-orange-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="relative h-56 overflow-hidden bg-cream">
                                    {imageUrl ? (
                                        <Image
                                            src={imageUrl}
                                            alt={product.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                            className="object-cover p-4 group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-zinc-400">
                                            No Image
                                        </div>
                                    )}
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="font-display text-lg font-medium text-charcoal mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                                        {product.name}
                                    </h3>
                                    <p className="text-sm text-zinc-600 mb-4 line-clamp-2 leading-relaxed">
                                        {product.description?.short || product.description?.long || "Explore this premium flooring solution."}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between">
                                        {price > 0 && (
                                            <span className="text-sm font-semibold text-charcoal">
                                                {formatPrice(typeof price === 'string' ? parseFloat(price) : price)}
                                            </span>
                                        )}
                                        <span className="inline-flex items-center gap-1.5 text-orange-600 font-semibold text-sm group-hover:gap-2.5 transition-all ml-auto">
                                            View
                                            <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>

                                {/* Bottom accent line */}
                                <div className="h-1 bg-gradient-to-r from-orange-400 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
