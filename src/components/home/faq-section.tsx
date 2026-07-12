"use client";

import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const faqItems = [
    {
        question: "Is vinyl flooring truly waterproof?",
        answer:
            "Yes. All LVP, LVT, and PVC sheet options are fully waterproof and leak-resistant when professionally fitted, making them perfect for wet zones.",
    },
    {
        question: "Will vinyl warp or swell in humid Malaysian environments?",
        answer:
            "No. High-quality products from Furnishing Solutions are engineered for dimensional stability in tropical conditions, preventing warping or buckling.",
    },
    {
        question: "Can vinyl be installed over existing tile or concrete floors?",
        answer:
            "Yes. Provided the subfloor is flat and firm. We level and prep as needed to support flawless installation.",
    },
    {
        question: "How durable is vinyl flooring in a family home?",
        answer:
            "With proper care, residential-grade vinyl lasts 10–15 years; commercial-grade products can exceed 20 years, depending on wear-layer thickness and usage.",
    },
    {
        question: "How should I clean vinyl floors?",
        answer:
            "Regular sweeping followed by damp mopping with a gentle, pH-neutral cleaner is sufficient. Avoid strong solvents and abrasive brushes.",
    },
    {
        question: "Are vinyl floors environmentally safe?",
        answer:
            "Yes. We offer low-VOC certified products like Greenguard and FloorScore, in recyclable formats.",
    },
    {
        question: "What warranties are provided?",
        answer:
            "Most vinyl flooring comes with 10–15-year manufacturer warranties; installation coverage is available separately based on product type.",
    },
];

export default function FaqSection() {
    const [openItem, setOpenItem] = useState<string | null>(null);

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    };

    return (
        <section className="py-24 md:py-32 bg-cream">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
                    {/* Sticky Heading */}
                    <div className="md:sticky md:top-24 self-start">
                        <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-orange-600 mb-5">
                            <span className="h-px w-6 bg-orange-500/60" />
                            Got Questions?
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight text-charcoal leading-[1.1]">Frequently asked questions</h2>
                        <p className="text-zinc-500 mt-5 text-lg leading-relaxed">
                            Everything you need to know about our flooring — check out our most asked queries.
                        </p>
                    </div>

                    {/* Accordion Q&A */}
                    <div className="md:col-span-2">
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full bg-white border border-zinc-100 rounded-2xl divide-y divide-zinc-200/70 overflow-hidden"
                            onValueChange={(val) => setOpenItem(val)}
                        >
                            {faqItems.map((item, index) => {
                                const itemKey = `item-${index}`;
                                const isOpen = openItem === itemKey;

                                return (
                                    <AccordionItem key={itemKey} value={itemKey}>
                                        <AccordionTrigger className="text-left text-lg font-medium py-4 px-4 flex justify-between items-center hover:bg-orange-50 [&>svg]:hidden no-underline hover:no-underline">
                                            <span className="flex-1">{item.question}</span>
                                            <div className="flex-shrink-0 ml-2">
                                                {isOpen ? (
                                                    <Minus className="w-5 h-5 text-gray-600" />
                                                ) : (
                                                    <Plus className="w-5 h-5 text-gray-600" />
                                                )}
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="text-gray-700 px-4 pb-4">
                                            {item.answer}
                                        </AccordionContent>
                                        {/* Radix unmounts AccordionContent while collapsed, so on first
                                            load (nothing open) the answer text is absent from the
                                            server-rendered HTML. This keeps every answer crawlable
                                            without touching the interactive accordion's open/close logic. */}
                                        {!isOpen && (
                                            <p className="sr-only">{item.answer}</p>
                                        )}
                                    </AccordionItem>
                                );
                            })}
                        </Accordion>
                    </div>
                </div>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
        </section>
    );
}
