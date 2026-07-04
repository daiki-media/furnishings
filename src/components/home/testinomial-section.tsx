"use client";
import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const TestimonialsSection = () => {
    const testimonials = [
        {
            id: 1,
            name: "Teresa Whiting",
            date: "2025-06-18",
            rating: 4,
            text: "Amazing service and quality work. The team was professional and delivered exactly what we needed",
            avatar: "T",
            bgColor: "bg-blue-600"
        },
        {
            id: 4,
            name: "Nur Hanis",
            date: "2025-06-18",
            rating: 4,
            text: "Our kitchen vinyl floor survived multiple floods—no damage, no peeling. Furnishing Solutions did an excellent job with installation and customer service.",
            avatar: "N",
            bgColor: "bg-green-600"
        },
        {
            id: 5,
            name: "Imran Rafiq",
            date: "2025-06-18",
            rating: 5,
            text: "Stylish and easy to maintain. Our café looks great and still looks brand new after a year of daily use. Highly recommend their flooring solutions.",
            avatar: "I",
            bgColor: "bg-red-600"
        },
        {
            id: 6,
            name: "Sarah Ahmed",
            date: "2025-06-17",
            rating: 4,
            text: "Outstanding service from start to finish. The team was punctual, professional, and the quality exceeded our expectations.",
            avatar: "S",
            bgColor: "bg-indigo-600"
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Check if we can go to previous
    const canGoPrev = currentIndex > 0;

    // Check if we can go to next (when last 3 testimonials are visible)
    const canGoNext = currentIndex < testimonials.length - 3;

    const nextTestimonial = () => {
        if (isAnimating || !canGoNext) return;
        setIsAnimating(true);
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const prevTestimonial = () => {
        if (isAnimating || !canGoPrev) return;
        setIsAnimating(true);
        setCurrentIndex((prevIndex) => prevIndex - 1);
        setTimeout(() => setIsAnimating(false), 500);
    };

    return (
        <div className="py-16 ">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Client Testimonials
                    </h2>
                </div>
                <div className="relative container mx-auto">
                    <button
                        onClick={prevTestimonial}
                        disabled={isAnimating || !canGoPrev}
                        aria-label="Previous testimonial"
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-600" />
                    </button>
                    <button
                        onClick={nextTestimonial}
                        disabled={isAnimating || !canGoNext}
                        aria-label="Next testimonial"
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <ChevronRight className="w-6 h-6 text-gray-600" />
                    </button>
                    <div className="overflow-hidden">
                        <div
                            className="flex gap-6 mb-12 transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(-${currentIndex * (100 / 3)}%)`,
                                width: `${(testimonials.length * 100) / 3}%`
                            }}
                        >
                            {testimonials.map((testimonial,) => (
                                <div
                                    key={testimonial.id}
                                    className="bg-white rounded-xl shadow-md  transition-all duration-300 p-6 border border-orange-500"
                                    style={{ width: `${100 / testimonials.length}%`, minWidth: '300px' }}
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-12 h-12 ${testimonial.bgColor} rounded-full flex items-center justify-center text-white font-semibold text-lg`}>
                                                {testimonial.avatar}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                                                <p className="text-sm text-gray-500">{testimonial.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Image
                                                src="/icons8-google-logo-48.png"
                                                alt="Logo"
                                                width={30}
                                                height={30}
                                                className="rounded-md" />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="flex">
                                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                                                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-gray-700 leading-relaxed">
                                        <p className="text-sm text-justify">{testimonial.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialsSection;