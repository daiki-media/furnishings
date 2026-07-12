"use client";

import Reveal from "@/components/common/reveal";
import SectionHeading from "@/components/home/section-heading";
import { Check } from "lucide-react";

const pricingData = [
    {
        product: "PVC Sheet Flooring",
        standard: "RM 4 – RM 10",
        premium: "RM 11 – RM 15",
    },
    {
        product: "Luxury Vinyl Plank",
        standard: "RM 7 – RM 18",
        premium: "RM 19 – RM 35",
    },
    {
        product: "Luxury Vinyl Tile",
        standard: "RM 7 – RM 18",
        premium: "RM 19 – RM 40",
    },
    {
        product: "Click-Lock Vinyl",
        standard: "RM 10 – RM 25",
        premium: "RM 26 – RM 40",
    },
];

export default function PricingSection() {
    return (
        <section className="py-24 md:py-32 bg-white">
            <div className="container mx-auto px-6">
                <SectionHeading
                    eyebrow="Transparent Pricing"
                    title="Pricing guide"
                    subtitle="Vinyl & flooring price per sq ft in Malaysia — no hidden costs."
                />

                <Reveal delay={0.1} className="max-w-4xl mx-auto mt-16">
                    <div className="rounded-[1.75rem] border border-zinc-100 bg-cream overflow-hidden">
                        {/* Column header */}
                        <div className="hidden sm:grid grid-cols-[1.4fr_1fr_1fr] items-center px-8 py-5 bg-charcoal text-white/70 text-xs font-semibold uppercase tracking-[0.15em]">
                            <span>Flooring Type</span>
                            <span className="text-center">Standard</span>
                            <span className="text-center">Premium</span>
                        </div>

                        {/* Rows */}
                        <div className="divide-y divide-zinc-200/70">
                            {pricingData.map((item) => (
                                <div
                                    key={item.product}
                                    className="grid grid-cols-1 sm:grid-cols-[1.4fr_1fr_1fr] items-center gap-3 sm:gap-0 px-6 sm:px-8 py-6 transition-colors hover:bg-white/60"
                                >
                                    <h3 className="font-display text-xl font-medium text-charcoal">
                                        {item.product}
                                    </h3>

                                    <div className="flex items-center justify-between sm:justify-center sm:flex-col sm:gap-1">
                                        <span className="sm:hidden text-xs font-semibold uppercase tracking-wide text-zinc-400">
                                            Standard
                                        </span>
                                        <span className="text-lg font-semibold text-zinc-700">{item.standard}</span>
                                    </div>

                                    <div className="flex items-center justify-between sm:justify-center sm:flex-col sm:gap-1">
                                        <span className="sm:hidden text-xs font-semibold uppercase tracking-wide text-orange-500">
                                            Premium
                                        </span>
                                        <span className="inline-flex items-center rounded-full bg-orange-600 px-4 py-1.5 text-base font-semibold text-white">
                                            {item.premium}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer note inside the card */}
                        <div className="flex items-center justify-center gap-2 px-8 py-5 bg-orange-50 border-t border-orange-100 text-sm font-medium text-orange-800">
                            <Check className="w-4 h-4" />
                            Free consultation &amp; on-site measurement included
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={0.15}>
                    <p className="mt-8 text-center text-zinc-500 text-sm max-w-3xl mx-auto leading-relaxed">
                        Prices are per sq ft and vary based on wear-layer thickness, design complexity, and project scale.
                        Volume and project-based discounts are available for contractors, developers, and bulk installations.
                    </p>
                </Reveal>
            </div>
        </section>
    );
}
