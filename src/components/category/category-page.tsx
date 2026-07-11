'use client';

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, SlidersHorizontal, ArrowRight } from "lucide-react";
import { Category, Product, getFullImageUrl, getProductDisplayPrice, formatPrice } from "@/lib/interfaces";

interface CategoryPageProps {
    slug?: string;
    initialProducts?: Product[];
    initialCategory?: Category | null;
}

const PRICE_RANGES = ['Under RM50', 'RM50 - RM100', 'RM100 - RM200', 'Over RM200'] as const;

function getVisiblePages(currentPage: number, totalPages: number): (number | '...')[] {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 4) return [1, 2, 3, 4, 5, '...', totalPages];
    if (currentPage >= totalPages - 3) return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
}

function matchesPriceRange(price: number, range: string): boolean {
    switch (range) {
        case 'Under RM50': return price < 50;
        case 'RM50 - RM100': return price >= 50 && price <= 100;
        case 'RM100 - RM200': return price > 100 && price <= 200;
        case 'Over RM200': return price > 200;
        default: return true;
    }
}

export default function CategoryPage({
    initialProducts = [],
    initialCategory = null,
}: CategoryPageProps) {
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    const uniqueBrands = useMemo(() => {
        const brands = new Set(
            initialProducts
                .map(p => p.brand?.toLowerCase())
                .filter((brand): brand is string => Boolean(brand && brand.trim() !== ''))
        );
        return Array.from(brands).sort();
    }, [initialProducts]);

    const filteredProducts = useMemo(() => {
        let filtered = initialProducts;

        if (selectedBrands.length > 0) {
            filtered = filtered.filter(product =>
                selectedBrands.includes(product.brand?.toLowerCase())
            );
        }

        if (selectedPriceRanges.length > 0) {
            filtered = filtered.filter(product => {
                const price = getProductDisplayPrice(product);
                return selectedPriceRanges.some(range => matchesPriceRange(price, range));
            });
        }

        return filtered;
    }, [initialProducts, selectedBrands, selectedPriceRanges]);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);
    const hasActiveFilters = selectedBrands.length > 0 || selectedPriceRanges.length > 0;

    useEffect(() => { setCurrentPage(1); }, [selectedBrands, selectedPriceRanges]);
    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [currentPage]);

    const toggleBrand = (brand: string) =>
        setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);

    const togglePriceRange = (range: string) =>
        setSelectedPriceRanges(prev => prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]);

    const clearAllFilters = () => { setSelectedBrands([]); setSelectedPriceRanges([]); };

    if (!initialCategory) return null;

    const FilterContent = () => (
        <>
            <h2 className="font-display text-xl font-medium text-charcoal mb-6">Filters</h2>

            {uniqueBrands.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wide mb-3">Brand</h3>
                    <div className="space-y-2.5 max-h-60 overflow-y-auto">
                        {uniqueBrands.map((brand) => (
                            <label key={brand} className="flex items-center cursor-pointer group">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-orange-600 border-zinc-300 rounded focus:ring-orange-500/40"
                                    checked={selectedBrands.includes(brand)}
                                    onChange={() => toggleBrand(brand)}
                                />
                                <span className="ml-3 text-sm text-zinc-600 group-hover:text-orange-600 capitalize transition-colors">
                                    {brand}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            )}

            <div className="mb-8">
                <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wide mb-3">Price range</h3>
                <div className="space-y-2.5">
                    {PRICE_RANGES.map((range) => (
                        <label key={range} className="flex items-center cursor-pointer group">
                            <input
                                type="checkbox"
                                className="w-4 h-4 text-orange-600 border-zinc-300 rounded focus:ring-orange-500/40"
                                checked={selectedPriceRanges.includes(range)}
                                onChange={() => togglePriceRange(range)}
                            />
                            <span className="ml-3 text-sm text-zinc-600 group-hover:text-orange-600 transition-colors">
                                {range}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <button
                onClick={clearAllFilters}
                disabled={!hasActiveFilters}
                className="w-full bg-orange-600 hover:bg-orange-500 text-white py-3 px-4 rounded-full text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
                Clear all filters
            </button>
        </>
    );

    return (
        <section className="py-16 md:py-24 bg-cream">
            <div className="container mx-auto px-6">

                {/* Toolbar: count + mobile filter toggle */}
                <div className="flex items-center justify-between mb-8">
                    <p className="text-sm text-zinc-500">
                        {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                        {totalPages > 1 && <span> · Page {currentPage} of {totalPages}</span>}
                    </p>
                    {uniqueBrands.length > 0 && (
                        <button
                            onClick={() => setShowMobileFilters(true)}
                            className="lg:hidden inline-flex items-center gap-2 border border-zinc-300 text-charcoal px-4 py-2 rounded-full text-sm font-semibold hover:bg-white transition-colors"
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            Filters
                        </button>
                    )}
                </div>

                {/* Active filter chips */}
                {hasActiveFilters && (
                    <div className="flex flex-wrap gap-2 mb-8">
                        {selectedBrands.map(brand => (
                            <button
                                key={brand}
                                onClick={() => toggleBrand(brand)}
                                className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-700 border border-orange-200 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-orange-100 transition-colors capitalize"
                            >
                                {brand}
                                <X className="w-3.5 h-3.5" />
                            </button>
                        ))}
                        {selectedPriceRanges.map(range => (
                            <button
                                key={range}
                                onClick={() => togglePriceRange(range)}
                                className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-700 border border-orange-200 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-orange-100 transition-colors"
                            >
                                {range}
                                <X className="w-3.5 h-3.5" />
                            </button>
                        ))}
                        <button
                            onClick={clearAllFilters}
                            className="text-sm text-zinc-500 hover:text-orange-600 transition-colors underline underline-offset-2"
                        >
                            Clear all
                        </button>
                    </div>
                )}

                <div className="flex gap-10">
                    {/* Desktop sidebar */}
                    {uniqueBrands.length > 0 && (
                        <div className="hidden lg:block w-64 shrink-0">
                            <div className="sticky top-24 bg-white rounded-2xl border border-zinc-100 p-6">
                                <FilterContent />
                            </div>
                        </div>
                    )}

                    {/* Products grid */}
                    <div className="flex-1 min-w-0">
                        {filteredProducts.length === 0 ? (
                            <div className="bg-white rounded-2xl border border-zinc-100 p-12 text-center">
                                <h2 className="font-display text-xl font-medium text-charcoal mb-3">No products found</h2>
                                <p className="text-zinc-500 mb-6">Try adjusting your filters to see more results.</p>
                                <Link
                                    href="/shop"
                                    className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors"
                                >
                                    Browse all products
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {currentProducts.map((product) => {
                                        const imageUrl = getFullImageUrl(product.images.main_image);
                                        const price = getProductDisplayPrice(product);

                                        return (
                                            <Link
                                                key={product.id}
                                                href={`/shop/${product.category?.slug || 'uncategorized'}/${product.slug}`}
                                                className="group bg-white rounded-2xl border border-zinc-100 overflow-hidden h-full flex flex-col hover:border-orange-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                            >
                                                <div className="relative h-52 bg-cream overflow-hidden">
                                                    <Image
                                                        src={imageUrl || '/placeholder.svg'}
                                                        alt={product.name}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                        className="object-cover p-4 group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>
                                                <div className="p-6 flex-1 flex flex-col">
                                                    <h3 className="font-display text-lg font-medium text-charcoal group-hover:text-orange-600 transition-colors line-clamp-2 mb-2">
                                                        {product.name}
                                                    </h3>
                                                    <p className="text-sm text-zinc-600 line-clamp-2 mb-4 leading-relaxed">
                                                        {product.description?.short || "Premium flooring solution"}
                                                    </p>
                                                    <div className="mt-auto flex items-center justify-between">
                                                        <span className="text-xs text-zinc-400 capitalize">{product.brand}</span>
                                                        {price > 0 && (
                                                            <span className="text-sm font-semibold text-charcoal">
                                                                {formatPrice(price)}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="h-1 bg-gradient-to-r from-orange-400 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                            </Link>
                                        );
                                    })}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex justify-center items-center gap-2 mt-16">
                                        <button
                                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                            className="px-5 py-2.5 rounded-full text-sm font-semibold bg-charcoal text-white hover:bg-charcoal/80 transition-colors disabled:bg-cream disabled:text-zinc-400 disabled:cursor-not-allowed"
                                        >
                                            Previous
                                        </button>

                                        <div className="flex gap-1.5">
                                            {getVisiblePages(currentPage, totalPages).map((page, index) =>
                                                page === '...' ? (
                                                    <span key={`ellipsis-${index}`} className="w-10 h-10 flex items-center justify-center text-zinc-400">
                                                        …
                                                    </span>
                                                ) : (
                                                    <button
                                                        key={page}
                                                        onClick={() => setCurrentPage(page as number)}
                                                        className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                                                            currentPage === page
                                                                ? 'bg-orange-600 text-white'
                                                                : 'bg-white text-charcoal border border-zinc-200 hover:border-orange-200 hover:text-orange-600'
                                                        }`}
                                                    >
                                                        {page}
                                                    </button>
                                                )
                                            )}
                                        </div>

                                        <button
                                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                            disabled={currentPage === totalPages}
                                            className="px-5 py-2.5 rounded-full text-sm font-semibold bg-charcoal text-white hover:bg-charcoal/80 transition-colors disabled:bg-cream disabled:text-zinc-400 disabled:cursor-not-allowed"
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile filter drawer */}
            {showMobileFilters && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-charcoal/50" onClick={() => setShowMobileFilters(false)} />
                    <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-white p-6 overflow-y-auto shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-display text-xl font-medium text-charcoal">Filters</h2>
                            <button
                                onClick={() => setShowMobileFilters(false)}
                                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-cream transition-colors"
                            >
                                <X className="w-5 h-5 text-charcoal" />
                            </button>
                        </div>
                        <FilterContent />
                    </div>
                </div>
            )}
        </section>
    );
}
