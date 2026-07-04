'use client';
import { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, Star, Shield, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const slides = [
    {
        title: 'Vinyl Sheet Flooring',
        subtitle: 'New Products',
        description:
            'Transform your space with premium vinyl sheet flooring designed for modern living. Quality and style combined.',
        image: '/carpet-tile.jpg',
    },
    {
        title: 'Vinyl Flooring',
        subtitle: 'Trending Now',
        description:
            'Buy premium vinyl flooring in Malaysia – durable, low-maintenance, and perfect for homes, offices, and commercial spaces.',
        image: '/sofa.jpg',
    },
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
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) {
            nextSlide();
        } else if (isRightSwipe) {
            prevSlide();
        }

        touchStartX.current = null;
        touchEndX.current = null;
    };

    return (
        <div className="bg-gradient-to-br from-gray-50 to-white">
            <div
                className="relative overflow-hidden transition-all duration-500"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {/* Optimized hero/LCP image (next/image serves WebP/AVIF, resized & preloaded) */}
                {slides.map((slide, index) => (
                    <Image
                        key={slide.image}
                        src={slide.image}
                        alt={slide.title}
                        fill
                        priority={index === 0}
                        sizes="100vw"
                        className={`object-cover transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}
                    />
                ))}
                <div className="absolute inset-0 bg-black bg-opacity-70" />
                <div className="container mx-auto px-6 py-20 relative z-10">
                    <div className="text-center space-y-8">
                        <h1 className="text-5xl font-semibold text-white leading-tight">
                            Transform your space with{' '}
                            <span className="text-orange-500 relative">
                                {slides[currentSlide].title.toLowerCase()}
                            </span>
                        </h1>

                        <p className="text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed z-100">
                            {slides[currentSlide].description}
                        </p>
                        <div className="pt-4">
                            <Link
                                href="/shop"
                                className="inline-block bg-orange-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                Shop Now
                            </Link>
                        </div>
                    </div>

                    <div className="flex justify-center space-x-3 mt-12">
                        {slides.map((slide, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                aria-label={`Show slide ${index + 1}: ${slide.title}`}
                                aria-current={index === currentSlide}
                                className={`h-3 rounded-full transition-all duration-200 ${index === currentSlide
                                    ? 'bg-white w-8'
                                    : 'bg-white/50 w-3 hover:bg-white'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                <button
                    onClick={prevSlide}
                    aria-label="Previous slide"
                    className="hidden lg:block absolute left-6 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-700 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 z-10"
                >
                    <ArrowLeft size={24} />
                </button>
                <button
                    onClick={nextSlide}
                    aria-label="Next slide"
                    className="hidden lg:block absolute right-6 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-700 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 z-10"
                >
                    <ArrowRight size={24} />
                </button>
            </div>

            <div className="bg-white border-t border-gray-100">
                <div className="container mx-auto px-6 pt-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex items-center md:justify-center space-x-3 text-gray-800">
                            <div className="flex items-center justify-center w-12 h-12 bg-orange-600 rounded-lg">
                                <Star className="w-8 h-8 text-white" />
                            </div>
                            <span className="font-medium">Premium Quality Guaranteed</span>
                        </div>
                        <div className="flex items-center md:justify-center space-x-3 text-gray-800">
                            <div className="flex items-center justify-center w-12 h-12 bg-orange-600 rounded-lg">
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <span className="font-medium">10,000+ Happy Customers</span>
                        </div>
                        <div className="flex items-center md:justify-center space-x-3 text-gray-800">
                            <div className="flex items-center justify-center w-12 h-12 bg-orange-600 rounded-lg">
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                            <span className="font-medium">Secure & Fast Delivery</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}