'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import SearchAutoComplete from '@/components/common/SearchAutoComplete';
import Logo from '@/components/common/logo';
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
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    const toggleMobileMenu = () => setMobileMenuOpen((v) => !v);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data || []);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setCategories([]);
            }
        };
        fetchCategories();
    }, []);

    // Subtle elevation once the user scrolls past the hero edge.
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [mobileMenuOpen]);

    const exploreCategories = categories.map((cat) => ({
        label: cat.name,
        href: `/category/${cat.slug}`,
    }));

    const mainNavItems: NavItem[] = [
        { label: 'Home', href: '/' },
        {
            label: 'Categories',
            href: '/category',
            dropdown: exploreCategories,
        },
        { label: 'About', href: '/about-us' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: '/contact' },
    ];

    const isActive = (href: string) =>
        href === '/' ? pathname === '/' : pathname.startsWith(href);

    const DesktopNavLink = ({ item }: { item: NavItem }) => {
        const active = isActive(item.href);
        return (
            <div className="relative group">
                <Link
                    href={item.href}
                    className={`flex items-center gap-1 px-1 py-2 text-sm font-medium transition-colors ${active ? 'text-orange-600' : 'text-charcoal hover:text-orange-600'
                        }`}
                >
                    {item.label}
                    {item.dropdown && item.dropdown.length > 0 && (
                        <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                    )}
                    {/* Animated underline */}
                    <span
                        className={`pointer-events-none absolute -bottom-0.5 left-0 h-0.5 bg-orange-500 transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'
                            }`}
                    />
                </Link>

                {item.dropdown && item.dropdown.length > 0 && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-60 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
                        <div className="bg-white rounded-2xl shadow-xl shadow-zinc-900/10 border border-zinc-100 p-2 max-h-96 overflow-y-auto">
                            {item.dropdown.length === 0 ? (
                                <p className="px-3 py-2 text-sm text-zinc-400">Loading…</p>
                            ) : (
                                item.dropdown.map((cat, idx) => (
                                    <Link
                                        key={idx}
                                        href={cat.href}
                                        className="block px-3 py-2.5 text-sm text-zinc-600 hover:bg-cream hover:text-orange-600 rounded-xl transition-colors"
                                    >
                                        {cat.label}
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <header
            className={`sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md transition-shadow duration-300 ${scrolled ? 'shadow-md shadow-zinc-900/5 border-b border-zinc-100' : 'border-b border-transparent'
                }`}
        >
            <div className="container mx-auto flex items-center justify-between gap-6 px-6 py-3">
                <Logo />

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-8">
                    {mainNavItems.map((item, i) => (
                        <DesktopNavLink key={i} item={item} />
                    ))}
                </nav>

                {/* Right cluster: search + Shop CTA */}
                <div className="hidden lg:flex items-center gap-4">
                    <div className="w-56">
                        <SearchAutoComplete />
                    </div>
                    <Link
                        href="/shop"
                        className="group inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-md shadow-orange-900/15"
                    >
                        Shop
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMobileMenu}
                    aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                    className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl text-charcoal hover:bg-cream transition-colors"
                >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 top-0 bg-white z-40 overflow-y-auto lg:hidden">
                    <div className="flex justify-between items-center px-6 py-3 border-b border-zinc-100">
                        <Logo />
                        <button
                            onClick={toggleMobileMenu}
                            aria-label="Close menu"
                            className="flex items-center justify-center w-10 h-10 rounded-xl text-charcoal hover:bg-cream transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="p-6 border-b border-zinc-100">
                        <SearchAutoComplete />
                    </div>

                    <nav className="flex flex-col p-4">
                        {mainNavItems.map((item, idx) => (
                            <div key={idx} className="w-full">
                                <Link
                                    href={item.href}
                                    className={`block px-4 py-3 text-lg font-medium rounded-xl transition-colors ${isActive(item.href) ? 'text-orange-600 bg-cream' : 'text-charcoal hover:bg-cream'
                                        }`}
                                    onClick={() => !item.dropdown && setMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                                {item.dropdown && item.dropdown.length > 0 && (
                                    <div className="ml-4 border-l border-zinc-200 pl-4 my-1 space-y-1">
                                        {item.dropdown.map((cat, i) => (
                                            <Link
                                                key={i}
                                                href={cat.href}
                                                className="block px-4 py-2 text-base text-zinc-600 hover:text-orange-600 rounded-lg transition-colors"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {cat.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    <div className="p-6">
                        <Link
                            href="/shop"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-6 py-4 rounded-full text-base font-semibold transition-colors"
                        >
                            Shop the Collection
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
