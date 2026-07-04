'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import SearchAutoComplete from '@/components/common/SearchAutoComplete';
import { getCategories } from '@/lib/api';
import { Category } from '@/lib/interfaces'; 

interface NavItem {
    label: string;
    href: string;
    dropdown?: { label: string; href: string; }[];
}

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const data = await getCategories();
                setCategories(data || []);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setCategories([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    // Build category structure based on your actual data
    const exploreCategories = categories.map(cat => ({
        label: cat.name,
        href: `/category/${cat.slug}`
    }));

    const mainNavItems: NavItem[] = [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about-us" },
        {
            label: "Explore Categories",
            href: "/category",
            dropdown: exploreCategories,
        },
        { label: "Contact", href: "/contact" },
        { label: "Shop", href: "/shop" },
        { label: "Blogs", href: "/blog" },
    ];

    // Desktop NavLink component
    const DesktopNavLink = ({ item }: { item: NavItem }) => (
        <div className="relative group">
            <a 
                href={item.href} 
                className="flex items-center font-semibold px-3 py-2 text-black hover:text-orange-400 transition"
            >
                {item.label}
                {item.dropdown && item.dropdown.length > 0 && (
                    <ChevronDown className="h-4 w-4 ml-1 transition-transform group-hover:rotate-180" />
                )}
            </a>

            {item.dropdown && item.dropdown.length > 0 && (
                <div className="absolute top-full left-0 mt-0 bg-white shadow-lg border rounded-md w-48 opacity-0 group-hover:opacity-100 group-hover:visible invisible transition duration-300">
                    <div className="flex flex-col p-2">
                        {item.dropdown.map((cat, idx) => (
                            <a 
                                key={idx}
                                href={cat.href} 
                                className="block px-3 py-2 text-base font-normal hover:bg-gray-100 hover:text-orange-400 rounded-md"
                            >
                                {cat.label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    // Mobile NavLink component
    const MobileNavLink = ({ item }: { item: NavItem }) => (
        <div className="w-full">
            <a
                href={item.href}
                className="block px-4 py-3 text-lg font-medium text-gray-900 hover:bg-gray-100 rounded-md transition"
                onClick={() => !item.dropdown && setMobileMenuOpen(false)}
            >
                {item.label}
            </a>
            {item.dropdown && item.dropdown.length > 0 && (
                <div className="ml-4 border-l pl-4 space-y-2 mt-2">
                    {item.dropdown.map((cat, idx) => (
                        <a
                            key={idx}
                            href={cat.href}
                            className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {cat.label}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <header className="w-full bg-white border-b border-gray-200 shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between px-4 py-3">
                <Link href="/" className="flex items-center space-x-2">
                    <Image 
                        src="/images/logo (2).png" 
                        alt="Logo" 
                        width={50} 
                        height={50} 
                        className="rounded-md"
                        priority
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8 items-center">
                    {mainNavItems.map((item, i) => (
                        <DesktopNavLink key={i} item={item} />
                    ))}
                </nav>

                {/* Desktop Search */}
                <div className="hidden md:block w-64">
                    <SearchAutoComplete />
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleMobileMenu}
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 bg-white z-40 overflow-y-auto md:hidden">
                    <div className="flex justify-between items-center px-4 py-3 border-b shadow-md">
                        <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                            <Image src="/images/logo (2).png" alt="Logo" width={40} height={40} className="rounded-md" />
                        </Link>
                        <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Close menu">
                            <X className="w-6 h-6" />
                        </Button>
                    </div>

                    <div className="p-4 border-b">
                        <SearchAutoComplete />
                    </div>

                    <div className="flex flex-col space-y-2 p-4">
                        {mainNavItems.map((item, idx) => (
                            <MobileNavLink key={idx} item={item} />
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}

export default Navbar;