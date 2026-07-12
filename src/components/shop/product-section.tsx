"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import SquareLoader from "../common/loader";
import { Suspense } from 'react';
import { Category, Product, ProductListItem, toProductListItem, formatPrice } from "@/lib/interfaces";
import { ArrowRight, X, SlidersHorizontal } from "lucide-react";

interface ProductsSectionProps {
    page?: number;
    category?: string;
    sort?: string;
    itemsPerPage?: number;
    showAll?: boolean;
    // Data fetched on the server (cached) and passed in as props.
    initialProducts?: Product[];
    initialCategories?: Category[];
    // True when the server-side product fetch itself failed (CMS down/error),
    // as opposed to it succeeding with a genuinely empty catalogue — lets the
    // empty state below tell users which situation they're looking at.
    fetchFailed?: boolean;
}

// Custom hook for debouncing
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

function ProductsSectionContent({
    page = 1,
    category,
    sort,
    itemsPerPage = 12,
    initialProducts = [],
    initialCategories = [],
    fetchFailed = false,
}: ProductsSectionProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    // Filter states - initialize from URL
    const [selectedCategories, setSelectedCategories] = useState<string[]>(
        category ? category.split(',') : []
    );
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState(sort || 'default');

    // Categories come from the server (cached) via props.
    const categories = initialCategories;

    // Debounce filter values to prevent too many URL updates
    const debouncedCategories = useDebounce(selectedCategories, 500);
    const debouncedBrands = useDebounce(selectedBrands, 500);
    const debouncedSort = useDebounce(sortBy, 500);

    // Derive the visible products by filtering + sorting + paginating the
    // server-provided data on the client (no API request here).
    const { products, totalProducts, totalPages } = useMemo(() => {
        let filtered = [...initialProducts];

        if (selectedCategories.length > 0) {
            filtered = filtered.filter(
                (p) => p.category && selectedCategories.includes(p.category.name)
            );
        }

        if (selectedBrands.length > 0) {
            filtered = filtered.filter((p) =>
                selectedBrands.includes(p.brand.toLowerCase())
            );
        }

        if (sortBy !== 'default') {
            filtered.sort((a, b) => {
                const priceA = (a.retail_price || a.purchase_price || 0) as number;
                const priceB = (b.retail_price || b.purchase_price || 0) as number;
                switch (sortBy) {
                    case 'price-asc': return priceA - priceB;
                    case 'price-desc': return priceB - priceA;
                    case 'name-asc': return a.name.localeCompare(b.name);
                    case 'name-desc': return b.name.localeCompare(a.name);
                    default: return 0;
                }
            });
        }

        const total = filtered.length;
        const pages = Math.ceil(total / itemsPerPage) || 1;
        const startIndex = (page - 1) * itemsPerPage;
        const paginated = filtered
            .slice(startIndex, startIndex + itemsPerPage)
            .map(toProductListItem);

        return { products: paginated, totalProducts: total, totalPages: pages };
    }, [initialProducts, selectedCategories, selectedBrands, sortBy, page, itemsPerPage]);

    // Update URL when debounced filters change
    useEffect(() => {
        const params = new URLSearchParams();
        
        if (debouncedCategories.length > 0) {
            params.set('category', debouncedCategories.join(','));
        }
        
        if (debouncedBrands.length > 0) {
            params.set('brand', debouncedBrands.join(','));
        }
        
        if (debouncedSort !== 'default') {
            params.set('sort', debouncedSort);
        }
        
        if (page > 1) {
            params.set('page', page.toString());
        }
        
        const newUrl = `/shop${params.toString() ? `?${params.toString()}` : ''}`;
        router.push(newUrl, { scroll: false });
    }, [debouncedCategories, debouncedBrands, debouncedSort, page, router]);

    // Handle category change
    const handleCategoryChange = useCallback((categoryName: string) => {
        setSelectedCategories(prev => {
            const newCategories = prev.includes(categoryName)
                ? prev.filter(c => c !== categoryName)
                : [...prev, categoryName];
            return newCategories;
        });
    }, []);

    // Handle brand change
    const handleBrandChange = useCallback((brand: string) => {
        setSelectedBrands(prev => {
            const newBrands = prev.includes(brand)
                ? prev.filter(b => b !== brand)
                : [...prev, brand];
            return newBrands;
        });
    }, []);

    // Handle sort change
    const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSort = e.target.value;
        setSortBy(newSort);
    }, []);

    // Handle clear filters
    const handleClearFilters = useCallback(() => {
        setSelectedCategories([]);
        setSelectedBrands([]);
        setSortBy('default');
        router.push('/shop', { scroll: false });
    }, [router]);

    // Handle page change
    const handlePageChange = useCallback((newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        router.push(`/shop?${params.toString()}`, { scroll: false });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [router, searchParams]);

    const uniqueBrands = useMemo(() => {
        const brands = new Set<string>();
        initialProducts.forEach(p => {
            const brand = p.brand?.toLowerCase().trim();
            if (brand) brands.add(brand);
        });
        return Array.from(brands).sort();
    }, [initialProducts]);

    const renderFilters = () => (
        <>
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-display text-xl font-medium text-charcoal">Filters</h3>
            </div>

            <div className="mb-8">
                <h4 className="text-sm font-semibold text-charcoal uppercase tracking-wide mb-3">Categories</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                    {categories.map((cat) => (
                        <label key={cat.id} className="flex items-center cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(cat.name)}
                                onChange={() => handleCategoryChange(cat.name)}
                                className="w-4 h-4 accent-orange-600 rounded border-zinc-300 focus:ring-orange-500"
                            />
                            <span className="ml-2 text-sm text-zinc-600 group-hover:text-orange-600 transition-colors">
                                {cat.name} ({cat.products_count})
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {uniqueBrands.length > 0 && (
                <div className="mb-8">
                    <h4 className="text-sm font-semibold text-charcoal uppercase tracking-wide mb-3">Brand</h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                        {uniqueBrands.map((brand) => (
                            <label key={brand} className="flex items-center cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={selectedBrands.includes(brand)}
                                    onChange={() => handleBrandChange(brand)}
                                    className="w-4 h-4 accent-orange-600 rounded border-zinc-300 focus:ring-orange-500"
                                />
                                <span className="ml-2 text-sm text-zinc-600 group-hover:text-orange-600 transition-colors capitalize">
                                    {brand}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {(selectedCategories.length > 0 || selectedBrands.length > 0 || sortBy !== 'default') && (
                <button
                    onClick={handleClearFilters}
                    className="w-full bg-orange-600 text-white px-4 py-2 rounded-full text-base font-medium hover:bg-orange-500 transition-colors"
                >
                    Clear All Filters
                </button>
            )}
        </>
    );

    return (
        <div className="bg-cream py-16 md:py-24">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-charcoal mb-4">
                        Our Products
                    </h2>
                    <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
                        Enhance your home or office with our elegant and durable flooring collections.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Mobile Filters Drawer */}
                    {isMobileFiltersOpen && (
                        <div className="fixed inset-0 z-50 flex lg:hidden">
                            <div className="fixed inset-0 bg-black/30" onClick={() => setIsMobileFiltersOpen(false)} />
                            <div className="relative ml-auto w-full max-w-xs h-full bg-white flex flex-col py-6 px-4 shadow-xl overflow-y-auto">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-display text-xl font-medium text-charcoal">Filters</h3>
                                    <button type="button" onClick={() => setIsMobileFiltersOpen(false)} className="text-zinc-400 hover:text-zinc-500">
                                        <span className="sr-only">Close menu</span>
                                        <X className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                                {renderFilters()}
                            </div>
                        </div>
                    )}

                    {/* Desktop Filters Sidebar */}
                    {products.length > 0 && (
                        <div className="hidden lg:block w-full lg:w-64 flex-shrink-0">
                            <div className="bg-white rounded-2xl border border-zinc-100 p-6 sticky top-24">
                                {renderFilters()}
                            </div>
                        </div>
                    )}

                    {/* Products Grid */}
                    <div className="flex-1 w-full">
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <button
                                    onClick={() => setIsMobileFiltersOpen(true)}
                                    className="lg:hidden flex items-center gap-2 text-sm font-medium text-charcoal border border-zinc-200 rounded-xl px-4 py-2 bg-white"
                                >
                                    <SlidersHorizontal className="w-4 h-4" />
                                    Filters
                                </button>
                                <div className="text-sm text-zinc-600">
                                    Showing {products.length} of {totalProducts} products
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <label htmlFor="sort" className="text-sm text-zinc-600 whitespace-nowrap">Sort by:</label>
                                <select
                                    id="sort"
                                    value={sortBy}
                                    onChange={handleSortChange}
                                    className="text-sm border border-zinc-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500/40 text-charcoal w-full sm:w-auto bg-white"
                                >
                                    <option value="default">Default</option>
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                    <option value="name-asc">Name: A to Z</option>
                                    <option value="name-desc">Name: Z to A</option>
                                </select>
                            </div>
                        </div>

                        {products.length === 0 ? (
                            <div className="text-center py-12 rounded-2xl border border-zinc-100 text-charcoal bg-white">
                                {fetchFailed ? (
                                    <p className="text-lg mb-4">
                                        We&apos;re having trouble loading products right now. Please try again shortly.
                                    </p>
                                ) : (
                                    <>
                                        <p className="text-lg mb-4">No products found.</p>
                                        <button
                                            onClick={handleClearFilters}
                                            className="text-orange-600 hover:text-orange-500 font-medium"
                                        >
                                            Clear all filters
                                        </button>
                                    </>
                                )}
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 mb-8">
                                    {products.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                        />
                                    ))}
                                </div>

                                {totalPages > 1 && (
                                    <Pagination
                                        currentPage={page}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Product Card Component
function ProductCard({ 
    product 
}: { 
    product: ProductListItem; 
}) {
    const formattedPrice = formatPrice(product.price);

    return (
        <Link
            href={`/shop/${product.category.slug}/${product.slug}`}
            className="group relative flex flex-col overflow-hidden bg-white rounded-2xl border border-zinc-100 hover:border-orange-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
            <div className="relative h-56 overflow-hidden bg-cream">
                <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover p-4 transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                />
            </div>

            <div className="flex flex-col flex-grow p-6">
                <h3 className="font-display text-lg font-medium mb-3 text-charcoal group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
                    {product.name}
                </h3>
                <p className="text-sm text-zinc-600 mb-4 line-clamp-2 flex-grow">
                    {product.description || "Premium quality flooring solution for your space."}
                </p>

                {formattedPrice && (
                    <div className="mb-3">
                        <span className="text-sm font-semibold text-charcoal">
                            {formattedPrice}
                        </span>
                    </div>
                )}

                <div className="flex items-center text-orange-600 font-medium mt-auto pb-1">
                    <span className="text-sm">View Product</span>
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
            </div>
            
            <div className="h-1 bg-gradient-to-r from-orange-400 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </Link>
    );
}

// Pagination Component
function Pagination({ 
    currentPage, 
    totalPages, 
    onPageChange 
}: { 
    currentPage: number; 
    totalPages: number; 
    onPageChange: (page: number) => void;
}) {
    const getVisiblePages = () => {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        
        if (currentPage <= 4) {
            return [1, 2, 3, 4, 5, '...', totalPages];
        } else if (currentPage >= totalPages - 3) {
            return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        } else {
            return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
        }
    };

    const visiblePages = getVisiblePages();

    return (
        <div className="flex justify-center items-center space-x-2 mt-12">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-full transition-colors ${
                    currentPage === 1
                        ? 'bg-cream text-zinc-400 cursor-not-allowed'
                        : 'bg-charcoal text-white hover:bg-zinc-800'
                }`}
            >
                Previous
            </button>
            
            <div className="flex space-x-2">
                {visiblePages.map((page, index) => (
                    page === '...' ? (
                        <span key={`ellipsis-${index}`} className="w-10 h-10 flex items-center justify-center text-zinc-600">
                            …
                        </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => onPageChange(page as number)}
                            className={`w-10 h-10 rounded-full transition-colors ${
                                currentPage === page
                                    ? 'bg-orange-600 text-white'
                                    : 'bg-white text-zinc-600 hover:bg-zinc-100'
                            }`}
                        >
                            {page}
                        </button>
                    )
                ))}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-full transition-colors ${
                    currentPage === totalPages
                        ? 'bg-cream text-zinc-400 cursor-not-allowed'
                        : 'bg-charcoal text-white hover:bg-zinc-800'
                }`}
            >
                Next
            </button>
        </div>
    );
}

export default function ProductsSection(props: ProductsSectionProps) {
    return (
        <Suspense fallback={<div className="min-h-[500px] flex items-center justify-center">
            <SquareLoader text="Loading..." />
        </div>}>
            <ProductsSectionContent {...props} />
        </Suspense>
    );
}
