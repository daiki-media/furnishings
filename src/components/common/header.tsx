"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getProducts } from "@/lib/api";
import { Product } from "@/lib/interfaces"; // Import from interfaces

interface PageHeaderProps {
    hide?: boolean;
    title?: string;
    // Pages that render their own H1 (e.g. category pages) pass "p" so the
    // banner title is not a second H1 (W42-033).
    titleAs?: "h1" | "p";
}

export default function PageHeader({ hide = false, title, titleAs = "h1" }: PageHeaderProps) {
    const TitleTag = titleAs;
    const pathname = usePathname();
    const paths = pathname.split("/").filter(Boolean);
    const lastSegment = paths[paths.length - 1];
    const [productMap, setProductMap] = useState<Map<string, string>>(new Map());
    const [isLoaded, setIsLoaded] = useState(false);

    // Fetch products using centralized API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await getProducts();
                
                if (Array.isArray(products) && products.length > 0) {
                    const map = new Map<string, string>();
                    products.forEach((product: Product) => {
                        if (product?.slug) map.set(product.slug, product.name);
                        if (product?.sku) map.set(product.sku, product.name);
                    });
                    setProductMap(map);
                }
            } catch (error) {
                console.error('Error fetching products for header:', error);
            } finally {
                setIsLoaded(true);
            }
        };

        fetchProducts();
    }, []);

    // Helper function to convert text to title case
    const toTitleCase = (str: string): string => {
        if (!str) return '';
        return str
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    // Memoize page title to avoid recalculation on every render
    const pageTitle = (() => {
        if (title) return title;
        
        const productName = productMap.get(lastSegment);
        if (productName) return productName;
        
        if (lastSegment) {
            // Special handling for category pages
            if (paths.length === 2 && paths[0] === 'category') {
                return `${toTitleCase(lastSegment)} in Malaysia`;
            }
            return toTitleCase(lastSegment);
        }
        
        return "Home";
    })();

    // Generate breadcrumbs only when needed
    const renderBreadcrumbs = () => {
        if (!isLoaded || paths.length === 0) return null;

        return paths.map((segment, index) => {
            const path = "/" + paths.slice(0, index + 1).join("/");
            const label = productMap.get(segment) || toTitleCase(segment);

            return (
                <span key={segment + index}>
                    <span className="mx-1">/</span>
                    <Link href={path} className="hover:underline text-white">
                        {label}
                    </Link>
                </span>
            );
        });
    };

    if (hide) {
        return null;
    }

    return (
        <div className="bg-black py-12 text-center h-48">
            <TitleTag className="text-4xl font-bold text-orange-600 italic">
                {pageTitle}
            </TitleTag>
            <div className="mt-2 text-white text-sm">
                <Link href="/" className="hover:underline text-white">
                    Home
                </Link>
                {renderBreadcrumbs()}
                {!isLoaded && paths.length > 0 && (
                    <span className="ml-1 opacity-50">Loading...</span>
                )}
            </div>
        </div>
    );
}