'use client';
import { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const slides = [
    {
        title: 'Vinyl Sheet Flooring',
        subtitle: 'New Collection',
        description:
            'Premium vinyl sheet flooring designed for modern Malaysian living — where quality meets timeless style.',
        image: '/carpet-tile.jpg',
    },
    {
        title: 'Luxury Vinyl Flooring',
        subtitle: 'Trending Now',
        description:
            'Durable, low-maintenance and waterproof flooring — the perfect foundation for homes, offices and commercial spaces.',
        image: '/Flooring/Flooring-1.jpg',
    },
];

const stats = [
    { value: '100%', label: 'Waterproof' },
    { value: '15 yr', label: 'Warranty' },
    { value: 'Nationwide', label: 'Installation' },
];

export default function HeroBanner() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    const prevSlide = () =>
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    const nextSlide = () =>
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };
    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };
    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;
        const distance = touchStartX.current - touchEndX.current;
        if (distance > 50) nextSlide();
        else if (distance < -50) prevSlide();
        touchStartX.current = null;
        touchEndX.current = null;
    };

    return (
        <section
            className="relative min-h-[88vh] flex flex-col justify-end overflow-hidden bg-charcoal"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Background image (LCP) with a slow ken-burns drift */}
            {slides.map((slide, index) => (
                <div
                    key={slide.image}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        priority={index === 0}
                        sizes="100vw"
                        className={`object-cover transition-transform ease-out duration-[8000ms] ${index === currentSlide ? 'scale-110' : 'scale-100'
                            }`}
                    />
                </div>
            ))}

            {/* Warm cinematic scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-charcoal/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-transparent to-transparent" />

            {/* Eyebrow top-left */}
            <div className="absolute top-0 left-0 right-0 z-10">
                <div className="container mx-auto px-6 pt-10">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={currentSlide}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.25em] text-orange-400"
                        >
                            <span className="h-px w-8 bg-orange-400/70" />
                            {slides[currentSlide].subtitle}
                        </motion.span>
                    </AnimatePresence>
                </div>
            </div>

            {/* Main content */}
            <div className="relative z-10 container mx-auto px-6 pb-16 md:pb-24">
                <div className="max-w-4xl">
                    {/* Static, keyword-rich H1 — stays constant across slides for SEO */}
                    <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-medium text-white leading-[1.03] tracking-tight">
                        Premium{' '}
                        <span className="italic text-orange-400">vinyl flooring</span>{' '}
                        <br />
                        in Malaysia
                    </h1>

                    <AnimatePresence mode="wait">
                        <motion.p
                            key={currentSlide}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="mt-7 text-lg md:text-xl text-white/75 max-w-xl leading-relaxed"
                        >
                            {slides[currentSlide].description}
                        </motion.p>
                    </AnimatePresence>

                    <div className="mt-10 flex flex-wrap items-center gap-4">
                        <Link
                            href="/shop"
                            className="group inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 shadow-xl shadow-orange-900/30"
                        >
                            Shop the Collection
                            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 border border-white/25 text-white px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
                        >
                            Get a Free Quote
                        </Link>
                    </div>

                    {/* Stats + controls row */}
                    <div className="mt-14 flex flex-wrap items-end justify-between gap-8 border-t border-white/15 pt-8">
                        <div className="flex flex-wrap gap-10">
                            {stats.map((stat) => (
                                <div key={stat.label}>
                                    <p className="font-display text-3xl md:text-4xl font-medium text-white">
                                        {stat.value}
                                    </p>
                                    <p className="text-sm text-white/60 mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                            {slides.map((slide, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    aria-label={`Show slide ${index + 1}: ${slide.title}`}
                                    aria-current={index === currentSlide}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-orange-500 w-10' : 'bg-white/30 w-5 hover:bg-white/60'
                                        }`}
                                />
                            ))}
                            <button
                                onClick={prevSlide}
                                aria-label="Previous slide"
                                className="ml-3 hidden sm:flex items-center justify-center w-11 h-11 rounded-full border border-white/25 text-white hover:bg-white/10 transition-colors"
                            >
                                <ArrowLeft size={18} />
                            </button>
                            <button
                                onClick={nextSlide}
                                aria-label="Next slide"
                                className="hidden sm:flex items-center justify-center w-11 h-11 rounded-full border border-white/25 text-white hover:bg-white/10 transition-colors"
                            >
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
