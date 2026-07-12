"use client";

import { useState, useMemo, useCallback } from "react";
import { Facebook, Twitter, Instagram, Phone, MapPin, Check, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import { Product, getFullImageUrl, formatPrice } from "@/lib/interfaces";

interface SingleProductProps {
    productData: Product;
    // Related products are computed on the cached server and passed in.
    relatedProducts?: Product[];
}

export default function SingleProduct({ productData, relatedProducts = [] }: SingleProductProps) {
    const [activeTab, setActiveTab] = useState("description");
    const [selectedImage, setSelectedImage] = useState(0);

    // Get category name safely
    const categoryName = productData.category?.name || 'Uncategorized';
    const categorySlug = productData.category?.slug || 'uncategorized';

    // Get gallery images
    const galleryImages = useMemo(() => {
        return (productData.images.gallery || []).filter(img => img);
    }, [productData.images.gallery]);

    // Static FAQs as fallback
    const staticFaqs = useMemo(() => [
        {
            question: "What is this type of flooring?",
            answer: "It's a durable and stylish flooring solution designed to enhance interiors while remaining practical.",
        },
        {
            question: "Is it waterproof?",
            answer: "Yes, it is engineered to resist water, spills, and humidity, making it suitable for tropical climates.",
        },
        {
            question: "How long does it last?",
            answer: "With proper installation and care, it can last between 10–20 years.",
        },
        {
            question: "Is it anti-slip?",
            answer: "Yes, the surface is designed to reduce slipping, making it safe for wet areas.",
        },
        {
            question: "Is it easy to clean?",
            answer: "Yes, simple sweeping and occasional mopping are enough to maintain it.",
        },
        {
            question: "Is it cost-effective?",
            answer: "Yes, it's one of the most budget-friendly options while offering premium looks.",
        },
    ], []);

    // Filter out null FAQs
    const validFaqs = useMemo(() => {
        return (productData.faqs || []).filter(faq => faq.question && faq.answer);
    }, [productData.faqs]);

    // Determine which FAQs to display
    const faqsToDisplay = useMemo(() => {
        if (validFaqs.length > 0) {
            return validFaqs;
        }
        return staticFaqs;
    }, [validFaqs, staticFaqs]);

    // Render tab content
    const renderTabContent = useCallback(() => {
        switch (activeTab) {
            case "description":
                return (
                    <div className="py-8">
                        <div className="space-y-8">
                            <div>
                                <h3 className="font-display text-xl font-medium text-charcoal mb-4">
                                    Product Description
                                </h3>
                                <div 
                                    className="text-zinc-600 leading-relaxed mb-4 prose max-w-none"
                                    dangerouslySetInnerHTML={{ 
                                        __html: productData.description.long || productData.description.short || 'No description available.' 
                                    }}
                                />
                            </div>

                            {/* Features Section */}
                            {productData.features?.main_features?.length > 0 && (
                                <div>
                                    <h4 className="font-display text-lg font-medium text-charcoal mb-3">Key Features</h4>
                                    <ul className="space-y-2">
                                        {productData.features.main_features.map((feature, index) => (
                                            <li key={index} className="flex items-start gap-3 text-zinc-600">
                                                <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            
                            {/* Design Compatibility */}
                            {productData.features?.design_compatibility?.length > 0 && (
                                <div>
                                    <h4 className="font-display text-lg font-medium text-charcoal mb-3">
                                        Design Compatibility
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {productData.features.design_compatibility.map(
                                            (style, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-orange-50 text-orange-700 border border-orange-200 rounded-full px-4 py-1.5 text-sm font-medium"
                                                >
                                                    {style}
                                                </span>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );

            case "specifications":
                return (
                    <div className="py-8 space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Product Specifications */}
                            <div className="bg-cream rounded-2xl p-6">
                                <h4 className="font-display text-lg font-medium text-charcoal mb-4">
                                    Product Specifications
                                </h4>
                                <div className="space-y-3">
                                    {productData.specifications && 
                                     productData.specifications.length > 0 ? (
                                        productData.specifications.map((spec, index) => (
                                            <div key={index} className="flex justify-between border-b border-zinc-200 pb-2">
                                                <span className="text-zinc-600">{spec.key}:</span>
                                                <span className="font-medium text-charcoal">{spec.value}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-zinc-500">No specifications available.</p>
                                    )}
                                </div>
                            </div>

                            {/* Installation Details */}
                            <div className="bg-cream rounded-2xl p-6">
                                <h4 className="font-display text-lg font-medium text-charcoal mb-4">
                                    Installation Details
                                </h4>
                                <div className="space-y-4">
                                    {productData.installation ? (
                                        <>
                                            <div className="flex justify-between border-b border-zinc-200 pb-2">
                                                <span className="font-medium text-charcoal">Installation Method:</span>
                                                <p className="text-zinc-600 text-sm">
                                                    {productData.installation.method || "Contact us for installation details"}
                                                </p>
                                            </div>
                                            {productData.installation.diy_friendly && (
                                                <span className="inline-block px-3 py-1 bg-green-50 border border-green-200 text-green-700 rounded-full text-sm">
                                                    DIY Friendly
                                                </span>
                                            )}
                                        </>
                                    ) : (
                                        <p className="text-zinc-500">Contact us for installation details.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Benefits Section */}
                        {productData.features?.benefits?.length > 0 && (
                            <div className="bg-cream rounded-2xl p-6">
                                <h4 className="font-display text-lg font-medium text-charcoal mb-4">
                                    Why Customers Choose This
                                </h4>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none">
                                    {productData.features.benefits.map((benefit, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-zinc-600">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                );

            case "faq":
                return (
                    <div className="py-8">
                        <h3 className="font-display text-2xl font-medium text-charcoal mb-8 text-center">
                            Frequently Asked Questions
                        </h3>
                        {faqsToDisplay.length > 0 ? (
                            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto space-y-4">
                                {faqsToDisplay.map((faq, index) => (
                                    <AccordionItem
                                        key={index}
                                        value={`item-${index}`}
                                        className="border border-zinc-100 rounded-2xl px-6"
                                    >
                                        <AccordionTrigger className="font-display font-medium text-charcoal text-lg hover:text-orange-600 transition-colors">
                                            {faq.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-zinc-600 pt-4 pb-6">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        ) : (
                            <p className="text-center text-zinc-500">No FAQs available.</p>
                        )}
                    </div>
                );

            default:
                return null;
        }
    }, [activeTab, productData, faqsToDisplay]);

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <nav className="flex text-sm text-zinc-500 mb-6">
                    <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href="/shop" className="hover:text-orange-600 transition-colors">Shop</Link>
                    <span className="mx-2">/</span>
                    <Link href={`/category/${categorySlug}`} className="hover:text-orange-600 transition-colors">
                        {categoryName}
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-charcoal font-medium">{productData.name}</span>
                </nav>

                {/* Product Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                    {/* Product Images */}
                    <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
                        {/* Main Image */}
                        <div className="aspect-square bg-cream rounded-[2rem] overflow-hidden relative">
                            <Image
                                src={getFullImageUrl(
                                    galleryImages[selectedImage] || productData.images.main_image
                                )}
                                alt={productData.images.alt_texts?.[selectedImage] || productData.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                                priority
                            />
                        </div>
                        
                        {/* Thumbnail Images */}
                        {galleryImages.length > 0 && (
                            <div className="flex space-x-4 overflow-x-auto pb-2">
                                {galleryImages.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                                            selectedImage === index 
                                                ? 'border-orange-500 scale-105' 
                                                : 'border-zinc-200 hover:border-orange-300'
                                        }`}
                                    >
                                        <Image
                                            src={getFullImageUrl(img)}
                                            alt={`Thumbnail ${index + 1}`}
                                            fill
                                            sizes="80px"
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <div className="flex flex-wrap gap-4 text-sm text-zinc-500 mb-4">
                                <span>SKU: <span className="font-medium text-charcoal">{productData.sku}</span></span>
                                <span>Brand: <span className="font-medium text-charcoal">{productData.brand}</span></span>
                                <span>Category: <span className="font-medium text-charcoal">{categoryName}</span></span>
                            </div>
                            
                            <h1 className="font-display text-3xl lg:text-4xl font-medium text-charcoal mb-4">
                                {productData.name}
                            </h1>
                            
                            <div 
                                className="text-zinc-600 leading-relaxed mb-6 prose max-w-none"
                                dangerouslySetInnerHTML={{ 
                                    __html: productData.description.short || 'Contact us for more information about this product.' 
                                }}
                            />
                        </div>

                        {/* Key Features Quick Preview */}
                        {productData.features?.main_features?.length > 0 && (
                            <div className="bg-cream rounded-2xl border border-zinc-100 p-6">
                                <h3 className="font-display font-medium text-charcoal mb-3">Key Features</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {productData.features.main_features
                                        .slice(0, 6)
                                        .map((feature, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center text-sm text-zinc-600"
                                            >
                                                <Check className="w-4 h-4 text-orange-600 mr-3 flex-shrink-0" />
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}

                        {/* Call to Action */}
                        <div className="bg-charcoal rounded-2xl p-8 space-y-4">
                            <h3 className="font-display font-medium text-white text-lg">
                                {productData.cta?.text || "Get This Product"}
                            </h3>
                            
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link 
                                    href="https://wa.me/60123498710"
                                    className="flex-1 flex items-center justify-center bg-orange-600 text-white px-6 py-3 rounded-full hover:bg-orange-500 transition-colors"
                                >
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    WhatsApp Us
                                </Link>
                                <Link
                                    href="/contact"
                                    className="flex-1 flex items-center justify-center border border-zinc-600 text-white hover:bg-zinc-800 px-6 py-3 rounded-full transition-colors"
                                >
                                    <MapPin className="w-4 h-4 mr-2" />
                                    Visit Showroom
                                </Link>
                            </div>
                            
                            <p className="text-sm text-zinc-400 font-medium">
                                Contact us for pricing and availability
                            </p>
                        </div>

                        {/* Social Share */}
                        <div className="flex items-center space-x-4 pt-4 border-t border-zinc-100">
                            <span className="text-zinc-500">Share:</span>
                            <div className="flex items-center space-x-3">
                                <button aria-label="Share on Facebook" className="p-2 text-zinc-500 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-all">
                                    <Facebook className="w-5 h-5" />
                                </button>
                                <button aria-label="Share on Twitter" className="p-2 text-zinc-500 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-all">
                                    <Twitter className="w-5 h-5" />
                                </button>
                                <button aria-label="Share on Instagram" className="p-2 text-zinc-500 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-all">
                                    <Instagram className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="border-t border-zinc-100 pt-8">
                    {/* Tab Navigation */}
                    <div className="flex flex-wrap gap-2 border-b border-zinc-100">
                        {['description', 'specifications', 'faq'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3 capitalize transition-all ${
                                    activeTab === tab
                                        ? 'text-charcoal font-semibold border-b-2 border-orange-600'
                                        : 'text-zinc-500 hover:text-charcoal font-medium'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="min-h-[400px]">{renderTabContent()}</div>
                </div>
            </div>
            
            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <div className="bg-cream py-16">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="font-display text-2xl font-medium text-charcoal mb-8">
                            Related Products
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/shop/${product.category?.slug || 'uncategorized'}/${product.slug}`}
                                    className="group relative overflow-hidden rounded-2xl bg-white border border-zinc-100 hover:border-orange-200 transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="relative h-48 overflow-hidden bg-cream">
                                        <Image
                                            src={getFullImageUrl(product.images.main_image)}
                                            alt={product.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                            className="object-cover p-4 transition-transform duration-500 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                    </div>

                                    <div className="p-6">
                                        <h3 className="font-display text-lg font-medium mb-2 text-charcoal group-hover:text-orange-600 transition-colors line-clamp-2">
                                            {product.name}
                                        </h3>
                                        <p className="text-sm text-zinc-600 mb-4 line-clamp-2">
                                            {product.description.short || 'Premium quality flooring solution'}
                                        </p>
                                        <div className="flex items-center text-orange-600 font-medium group-hover:underline decoration-orange-600 underline-offset-4">
                                            <span className="text-sm">View Product</span>
                                            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}