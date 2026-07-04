"use client"
import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const CertificateCarousel = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const certificates = [
        {
            id: 1,
            name: "OEKO-TEX",
            logo: "/images/marquee/img1.png"
        },
        {
            id: 2,
            name: "ISO 14001",
            logo: "/images/marquee/img2.png"
        },
        {
            id: 3,
            name: "Indoor Air Quality A+",
            logo: "/images/marquee/img3.png"
        },
        {
            id: 4,
            name: "GREENGUARD",
            logo: "/images/marquee/img4.png"
        },
        {
            id: 5,
            name: "1KG Certification",
            logo: "/images/marquee/img5.png"
        },
        {
            id: 6,
            name: "ASTM International",
            logo: "/images/marquee/img6.png"
        },
        {
            id: 7,
            name: "ASTM International",
            logo: "/images/marquee/img7.png"
        },
        {
            id: 8,
            name: "ASTM International",
            logo: "/images/marquee/img8.png"
        },
        {
            id: 9,
            name: "ASTM International",
            logo: "/images/marquee/img9.png"
        },
        {
            id: 10,
            name: "ASTM International",
            logo: "/images/marquee/img10.png"
        },
        {
            id: 11,
            name: "ASTM International",
            logo: "/images/marquee/img11.png"
        }
    ];

    const updateScrollButtons = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
            setTimeout(updateScrollButtons, 300);
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
            setTimeout(updateScrollButtons, 300);
        }
    };

    React.useEffect(() => {
        updateScrollButtons();
        const handleResize = () => updateScrollButtons();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="py-12">
            <div className="mx-auto  px-4">
                <h2 className="text-center text-3xl font-bold mb-12 text-black">
                    Choose with Confidence with Our Certification
                </h2>

                <div className="relative">
                    <button
                        onClick={scrollLeft}
                        disabled={!canScrollLeft}
                        aria-label="Scroll certifications left"
                        className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center transition-all duration-300 ${canScrollLeft
                            ? 'text-gray-700 hover:bg-gray-50 hover:shadow-xl cursor-pointer'
                            : 'text-gray-300 cursor-not-allowed'
                            }`}
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={scrollRight}
                        disabled={!canScrollRight}
                        aria-label="Scroll certifications right"
                        className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center transition-all duration-300 ${canScrollRight
                            ? 'text-gray-700 hover:bg-gray-50 hover:shadow-xl cursor-pointer'
                            : 'text-gray-300 cursor-not-allowed'
                            }`}
                    >
                        <ChevronRight size={24} />
                    </button>

                    <div
                        ref={scrollContainerRef}
                        className="flex gap-8 overflow-x-auto scrollbar-hide px-16 py-4"
                        onScroll={updateScrollButtons}
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {certificates.map((cert) => (
                            <div
                                key={cert.id}
                                className="flex-shrink-0 flex items-center justify-center w-48 h-40 bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 border border-gray-100"
                            >
                                <Image
                                    src={cert.logo}
                                    alt={cert.name}
                                    width={140}
                                    height={140}
                                    className="h-auto w-auto max-w-[140px] max-h-[140px] object-contain filter hover:brightness-110 transition-all duration-300"
                                    style={{
                                        background: 'transparent',
                                        objectFit: 'contain'
                                    }}
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        const nextSibling = target.nextSibling as HTMLElement;
                                        target.style.display = 'none';
                                        nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div
                                    className="hidden items-center justify-center h-24 w-32 bg-gray-100 rounded text-gray-500 text-sm text-center"
                                >
                                    {cert.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                
                /* Smooth scroll behavior */
                .scrollbar-hide {
                    scroll-behavior: smooth;
                }
                
                /* Ensure PNG transparency is preserved */
                img {
                    background: none !important;
                    backdrop-filter: none;
                }
            `}</style>
        </div>
    );
};

export default CertificateCarousel;