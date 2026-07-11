'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { getProducts } from '@/lib/api';

// Create a simpler type for search results
interface SearchProduct {
    id: number;
    name: string;
    slug: string;
    categorySlug: string;
}

const SearchAutoComplete: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<SearchProduct[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [products, setProducts] = useState<SearchProduct[]>([]);
    const [loading, setLoading] = useState(false);
    const [initialLoadDone, setInitialLoadDone] = useState(false);

    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Fetch products once using centralized API
    useEffect(() => {
        let mounted = true;

        const fetchProducts = async () => {
            try {
                setLoading(true);
                
                const productsData = await getProducts();

                if (mounted && Array.isArray(productsData) && productsData.length > 0) {
                    // Map to a simpler structure for search
                    const productList: SearchProduct[] = productsData.map((item: any) => ({
                        id: item.id,
                        name: item.name,
                        slug: item.slug,
                        categorySlug: item.category?.slug || 'uncategorized'
                    }));
                    setProducts(productList);
                }
            } catch (error) {
                console.error('Error fetching products for search:', error);
            } finally {
                if (mounted) {
                    setLoading(false);
                    setInitialLoadDone(true);
                }
            }
        };

        fetchProducts();

        return () => {
            mounted = false;
        };
    }, []);

    // Memoize filtered products for performance
    const filteredProducts = useMemo(() => {
        if (searchTerm.trim() === '' || !initialLoadDone) return [];
        
        const searchLower = searchTerm.toLowerCase();
        return products
            .filter(product => product.name.toLowerCase().includes(searchLower))
            .slice(0, 8);
    }, [searchTerm, products, initialLoadDone]);

    // Update suggestions when filtered products change
    useEffect(() => {
        setSuggestions(filteredProducts);
        setShowDropdown(filteredProducts.length > 0 && searchTerm.trim() !== '');
        setSelectedIndex(-1);
    }, [filteredProducts, searchTerm]);

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
                setSelectedIndex(-1);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSuggestionSelect = useCallback((product: SearchProduct) => {
        setSearchTerm(product.name);
        setShowDropdown(false);
        setSelectedIndex(-1);
        router.push(`/shop/${product.categorySlug}/${product.slug}`);
    }, [router]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (!showDropdown || suggestions.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev < suggestions.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
                    handleSuggestionSelect(suggestions[selectedIndex]);
                } else if (suggestions.length > 0) {
                    handleSuggestionSelect(suggestions[0]);
                }
                break;
            case 'Escape':
                setShowDropdown(false);
                setSelectedIndex(-1);
                inputRef.current?.blur();
                break;
        }
    }, [showDropdown, suggestions, selectedIndex, handleSuggestionSelect]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }, []);

    const handleInputFocus = useCallback(() => {
        if (searchTerm.trim() !== '' && suggestions.length > 0) {
            setShowDropdown(true);
        }
    }, [searchTerm, suggestions]);

    const handleClearSearch = useCallback(() => {
        setSearchTerm('');
        setShowDropdown(false);
        setSelectedIndex(-1);
        inputRef.current?.focus();
    }, []);

    return (
        <div ref={searchRef} className="relative w-full max-w-md mx-auto">
            <div className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onKeyDown={handleKeyDown}
                    placeholder="Search for flooring..."
                    className="w-full px-4 py-2.5 pr-11 text-sm text-charcoal bg-cream border border-zinc-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-400 focus:bg-white transition-all duration-200"
                    aria-label="Search products"
                    autoComplete="off"
                />

                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    {searchTerm ? (
                        <button
                            onClick={handleClearSearch}
                            className="text-gray-400 hover:text-gray-600 focus:outline-none"
                            aria-label="Clear search"
                        >
                            <span className="text-lg">&times;</span>
                        </button>
                    ) : (
                        <Search className="w-5 h-5 text-gray-400" />
                    )}
                </div>
            </div>

            {loading && searchTerm.trim() !== '' && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <div className="px-4 py-3 text-gray-500 text-center">
                        <div className="flex items-center justify-center space-x-2">
                            <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                            <span>Loading...</span>
                        </div>
                    </div>
                </div>
            )}

            {showDropdown && suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-white border border-zinc-100 rounded-2xl shadow-xl max-h-64 overflow-y-auto">
                    {suggestions.map((product, index) => (
                        <button
                            key={product.id || product.slug}
                            onClick={() => handleSuggestionSelect(product)}
                            className={`w-full px-4 py-3 text-left hover:bg-cream focus:bg-cream focus:outline-none transition-colors duration-150 ${
                                index === selectedIndex ? 'bg-orange-50 text-orange-700' : 'text-zinc-700'
                            } ${index === 0 ? 'rounded-t-2xl' : ''} ${
                                index === suggestions.length - 1 ? 'rounded-b-2xl' : 'border-b border-zinc-100'
                            }`}
                        >
                            <div className="flex items-center">
                                <Search className="w-4 h-4 mr-3 text-zinc-400 flex-shrink-0" />
                                <span className="truncate">{product.name}</span>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {showDropdown && searchTerm.trim() !== '' && suggestions.length === 0 && !loading && initialLoadDone && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <div className="px-4 py-3 text-gray-500 text-center">
                        No products found for "{searchTerm}"
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchAutoComplete;