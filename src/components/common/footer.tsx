"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Facebook, Twitter, Linkedin, Youtube, ArrowUp } from "lucide-react";
import { getCategories } from '@/lib/api';
import Logo from '@/components/common/logo';

interface Category {
    id: number;
    name: string;
    slug: string;
    products_count: number;
}

export default function Footer() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
                
            } catch (error) {
                console.error('Error fetching categories for footer:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <footer className="relative bg-black text-white rounded-t-3xl overflow-hidden font-sans">
            <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 100 L300 0 L600 200" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
                    <path d="M400 300 L800 100 L1200 400" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
                </svg>
            </div>

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-16 py-8 sm:py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[3.3fr_1fr_1fr] gap-8 lg:gap-12">
                    <div className="space-y-4 sm:space-y-6 md:col-span-2 lg:col-span-1 lg:pr-16">
                        <Logo variant="light" />
                        <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                            From supply to professional installation, Furnishing Solutions is your one-stop destination
                            for innovative, lasting, and visually striking interior solutions.
                        </p>

                        <div className="flex space-x-4 text-white">
                            <Link href="/" aria-label="Furnishings on Facebook"><Facebook className="w-5 h-5 hover:text-orange-600 transition-colors" /></Link>
                            <Link href="/" aria-label="Furnishings on Twitter"><Twitter className="w-5 h-5 hover:text-orange-600 transition-colors" /></Link>
                            <Link href="/" aria-label="Furnishings on LinkedIn"><Linkedin className="w-5 h-5 hover:text-orange-600 transition-colors" /></Link>
                            <Link href="/" aria-label="Furnishings on YouTube"><Youtube className="w-5 h-5 hover:text-orange-600 transition-colors" /></Link>
                        </div>

                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="flex items-center justify-center space-x-2 border border-white px-3 py-2 rounded-md hover:bg-orange-600 hover:text-black transition-colors text-xs sm:text-sm w-full sm:w-auto"
                        >
                            <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="uppercase tracking-wide">Back to Top</span>
                        </button>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-bold text-orange-600 text-base sm:text-lg">INFORMATION</h4>
                        <ul className="space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base">
                            <li><Link href="/about-us" className="hover:text-orange-600 transition-colors block py-1">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-orange-600 transition-colors block py-1">Contact Us</Link></li>
                            <li><Link href="/terms-and-conditions" className="hover:text-orange-600 transition-colors block py-1">Terms & Conditions</Link></li>
                            <li><Link href="/return-and-refunds-policy" className="hover:text-orange-600 transition-colors block py-1">Return and Refunds Policy</Link></li>
                            <li><Link href="/privacy-policy" className="hover:text-orange-600 transition-colors block py-1">Privacy Policy</Link></li>
                            <li><Link href="/cookie-policy" className="hover:text-orange-600 transition-colors block py-1">Cookie Policy</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-bold text-orange-600 text-base sm:text-lg">CATEGORIES</h4>
                        {loading ? (
                            <div className="space-y-2">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="h-4 bg-gray-700 animate-pulse rounded"></div>
                                ))}
                            </div>
                        ) : (
                            <ul className="space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base">
                                {categories.map((category) => (
                                    <li key={category.id}>
                                        <Link
                                            href={`/category/${category.slug}`}
                                            className="hover:text-orange-600 transition-colors block py-1"
                                        >
                                            {category.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-black text-center py-3 px-4 text-xs sm:text-sm text-white border-t border-orange-600">
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0">
                    <span>© {new Date().getFullYear()} Furnishings powered by</span>
                    <span className="sm:ml-1">
                        <a
                            href="https://www.daikimedia.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-600 underline hover:text-orange-400 transition-colors"
                        >
                            Daiki Media
                        </a>. All rights reserved.
                    </span>
                </div>
            </div>
        </footer>
    );
}