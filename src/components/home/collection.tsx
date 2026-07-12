// src/components/home/collection.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import SquareLoader from "../common/loader";
import SectionHeading from "@/components/home/section-heading";
import Reveal from "@/components/common/reveal";
import { getCategories } from "@/lib/api";
import { Category, getCategoryImageUrl } from "@/lib/interfaces";

export default function FloorCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const categoriesData = await getCategories();
                
                if (categoriesData && categoriesData.length > 0) {
                    setCategories(categoriesData);
                } else {
                    setCategories([]);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError('Failed to load categories');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Show only first 6 categories
    const displayCategories = categories.slice(0, 6);

    if (error) {
        return (
            <section className="py-24 md:py-32 bg-cream">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-red-600">{error}</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-24 md:py-32 bg-cream">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <SectionHeading
                        align="left"
                        eyebrow="Shop by Category"
                        title="Browse our flooring range"
                        subtitle="Real products, ready to order — explore each category and request a quote for your space."
                    />
                    <Reveal delay={0.1} className="shrink-0">
                        <Link
                            href="/shop"
                            className="hidden md:inline-flex items-center gap-2 text-charcoal font-semibold border-b-2 border-orange-500 pb-1 hover:gap-3 transition-all"
                        >
                            View all
                            <ArrowRight className="w-4 h-4 text-orange-600" />
                        </Link>
                    </Reveal>
                </div>

                {/* Categories Grid */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <SquareLoader text="Loading..." />
                    </div>
                ) : categories.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-zinc-500">No categories found.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                            {displayCategories.map((category, index) => (
                                <Reveal key={category.id} delay={index * 0.06} className="h-full">
                                    <Link
                                        href={`/category/${category.slug}`}
                                        className="group relative flex flex-col h-full overflow-hidden rounded-2xl bg-white border border-zinc-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                    >
                                        {/* Image Container */}
                                        <div className="relative h-56 overflow-hidden bg-stone-100">
                                            <Image
                                                src={getCategoryImageUrl(category)}
                                                alt={category.name}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                className="object-cover p-4 group-hover:scale-110 transition-transform duration-500"
                                                loading="lazy"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = '/placeholder-category.jpg';
                                                }}
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex flex-col flex-1">
                                            <h3 className="font-display text-xl font-medium mb-2 text-charcoal group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
                                                {category.name}
                                            </h3>
                                            <p className="text-sm text-zinc-500 mb-4">
                                                {category.products_count} {category.products_count === 1 ? 'product' : 'products'}
                                            </p>
                                            <div className="mt-auto flex items-center text-orange-600 font-medium">
                                                <span className="text-sm">Explore Collection</span>
                                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                                            </div>
                                        </div>

                                        {/* Decorative Accent */}
                                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                    </Link>
                                </Reveal>
                            ))}
                        </div>

                        {/* View All Button */}
                        {categories.length > 6 && (
                            <div className="text-center mt-14">
                                <Link
                                    href="/shop"
                                    className="inline-flex items-center bg-orange-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-700 transition-colors group"
                                >
                                    View All Products
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}