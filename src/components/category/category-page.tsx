// components/category/category-page.tsx
'use client';

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Category, Product, getFullImageUrl, getProductDisplayPrice } from "@/lib/interfaces";

interface CategoryPageProps {
    slug?: string;
    // Products (already filtered to this category) and the category itself are
    // fetched on the cached server and passed in as props.
    initialProducts?: Product[];
    initialCategory?: Category | null;
}

export default function CategoryPage({
    initialProducts = [],
    initialCategory = null,
}: CategoryPageProps) {
    const categoryProducts = initialProducts;
    const currentCategory = initialCategory;

    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    const categoryName = currentCategory?.name;

    // Filter products based on selected filters
    const filteredProducts = useMemo(() => {
        let filtered = categoryProducts;

        // Filter by brands
        if (selectedBrands.length > 0) {
            filtered = filtered.filter(product =>
                selectedBrands.includes(product.brand?.toLowerCase())
            );
        }

        // Filter by price range
        if (selectedPriceRanges.length > 0) {
            filtered = filtered.filter(product => {
                const price = getProductDisplayPrice(product);
                return selectedPriceRanges.some(range => {
                    switch (range) {
                        case 'Under RM50':
                            return price < 50;
                        case 'RM50 - RM100':
                            return price >= 50 && price <= 100;
                        case 'RM100 - RM200':
                            return price > 100 && price <= 200;
                        case 'Over RM200':
                            return price > 200;
                        default:
                            return true;
                    }
                });
            });
        }

        return filtered;
    }, [categoryProducts, selectedBrands, selectedPriceRanges]);

    // Get unique brands from products
    const uniqueBrands = useMemo(() => {
        const brands = new Set(
            categoryProducts
                .map(p => p.brand?.toLowerCase())
                .filter((brand): brand is string => Boolean(brand && brand.trim() !== ''))
        );
        return Array.from(brands).sort();
    }, [categoryProducts]);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedBrands, selectedPriceRanges]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const clearAllFilters = () => {
        setSelectedBrands([]);
        setSelectedPriceRanges([]);
    };

    const handleBrandFilter = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand)
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        );
    };

    const handlePriceRangeFilter = (range: string) => {
        setSelectedPriceRanges(prev =>
            prev.includes(range)
                ? prev.filter(r => r !== range)
                : [...prev, range]
        );
    };

    const PaginationControls = () => {
        if (totalPages <= 1) return null;

        const getVisiblePages = () => {
            const visiblePages = [];
            const maxVisiblePages = 5;

            if (totalPages <= maxVisiblePages) {
                for (let i = 1; i <= totalPages; i++) {
                    visiblePages.push(i);
                }
            } else {
                if (currentPage <= 3) {
                    for (let i = 1; i <= 4; i++) {
                        visiblePages.push(i);
                    }
                    visiblePages.push('...');
                    visiblePages.push(totalPages);
                } else if (currentPage >= totalPages - 2) {
                    visiblePages.push(1);
                    visiblePages.push('...');
                    for (let i = totalPages - 3; i <= totalPages; i++) {
                        visiblePages.push(i);
                    }
                } else {
                    visiblePages.push(1);
                    visiblePages.push('...');
                    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                        visiblePages.push(i);
                    }
                    visiblePages.push('...');
                    visiblePages.push(totalPages);
                }
            }
            return visiblePages;
        };

        const visiblePages = getVisiblePages();

        return (
            <div className="flex justify-center items-center mt-8 mb-6">
                <div className="flex items-center space-x-2 bg-white rounded-lg shadow-md p-2">
                    <button
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        aria-label="Previous page"
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            currentPage === 1
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        &laquo;
                    </button>

                    {visiblePages.map((page, index) => (
                        <React.Fragment key={index}>
                            {page === '...' ? (
                                <span className="px-3 py-2 text-gray-400">...</span>
                            ) : (
                                <button
                                    onClick={() => handlePageChange(page as number)}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        currentPage === page
                                            ? 'bg-orange-600 text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    {page}
                                </button>
                            )}
                        </React.Fragment>
                    ))}

                    <button
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        aria-label="Next page"
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            currentPage === totalPages
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        &raquo;
                    </button>
                </div>
            </div>
        );
    };

    if (!currentCategory) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-4">
                        <nav className="flex text-sm text-gray-500">
                            <Link href="/" className="hover:text-orange-600">Home</Link>
                            <span className="mx-2">/</span>
                            <Link href="/category" className="hover:text-orange-600">Category</Link>
                            <span className="mx-2">/</span>
                            <span className="text-gray-900 font-medium">{categoryName}</span>
                        </nav>
                    </div>
                    
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        {categoryName} in Malaysia
                    </h1>
                    <p className="text-gray-600">
                        {filteredProducts.length} products found
                        {filteredProducts.length > 0 && (
                            <span className="ml-2 text-sm">
                                | Page {currentPage} of {totalPages}
                            </span>
                        )}
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    {uniqueBrands.length > 0 && (
                        <div className="lg:w-1/4">
                            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                                <h2 className="text-xl font-bold text-gray-800 mb-6">Filters</h2>
                                
                                {/* Brand Filter */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Brands</h3>
                                    <div className="space-y-2 max-h-60 overflow-y-auto">
                                        {uniqueBrands.map((brand) => (
                                            <label key={brand} className="flex items-center cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                                                    checked={selectedBrands.includes(brand)}
                                                    onChange={() => handleBrandFilter(brand)}
                                                />
                                                <span className="ml-3 text-sm text-gray-700 group-hover:text-orange-600 capitalize">
                                                    {brand}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Range Filter */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Price Range</h3>
                                    <div className="space-y-2">
                                        {['Under RM50', 'RM50 - RM100', 'RM100 - RM200', 'Over RM200'].map((range) => (
                                            <label key={range} className="flex items-center cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                                                    checked={selectedPriceRanges.includes(range)}
                                                    onChange={() => handlePriceRangeFilter(range)}
                                                />
                                                <span className="ml-3 text-sm text-gray-700 group-hover:text-orange-600">
                                                    {range}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Clear Filters Button */}
                                <button
                                    onClick={clearAllFilters}
                                    disabled={selectedBrands.length === 0 && selectedPriceRanges.length === 0}
                                    className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Products Grid */}
                    <div className="lg:w-3/4">
                        {/* Active Filters Display */}
                        {(selectedBrands.length > 0 || selectedPriceRanges.length > 0) && (
                            <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Active Filters:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedBrands.map(brand => (
                                        <span key={brand} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center">
                                            {brand}
                                            <button
                                                onClick={() => handleBrandFilter(brand)}
                                                aria-label={`Remove ${brand} filter`}
                                                className="ml-2 text-orange-600 hover:text-orange-800 font-bold"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                    {selectedPriceRanges.map(range => (
                                        <span key={range} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                                            {range}
                                            <button
                                                onClick={() => handlePriceRangeFilter(range)}
                                                aria-label={`Remove ${range} filter`}
                                                className="ml-2 text-blue-600 hover:text-blue-800 font-bold"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Products */}
                        {filteredProducts.length === 0 ? (
                            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                                <h2 className="text-xl font-semibold text-gray-700 mb-4">No Products Found</h2>
                                <p className="text-gray-600 mb-6">Try adjusting your filters to see more results.</p>
                                <Link
                                    href="/shop"   
                                    className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                                >
                                    Browse All Products
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
                                                className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300"
                                            >
                                                <div className="relative h-48 bg-gray-100 overflow-hidden">
                                                    <Image
                                                        src={imageUrl || '/placeholder.svg'}
                                                        alt={product.name}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                        className="object-cover p-4 group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                                <div className="p-4">
                                                    <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors line-clamp-2 mb-2">
                                                        {product.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                                                        {product.description?.short || "Premium flooring solution"}
                                                    </p>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xs text-gray-500 capitalize">{product.brand}</span>
                                                        {price > 0 && (
                                                            <span className="text-sm font-semibold text-orange-600">
                                                                RM {price.toFixed(2)}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>

                                <PaginationControls />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}