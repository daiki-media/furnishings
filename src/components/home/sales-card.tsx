'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Ruler, PhoneCall } from 'lucide-react';

export default function MeasurementCta() {
    return (
        <section className="py-24 md:py-32 bg-cream">
            <div className="container mx-auto px-6">
                <div className="relative overflow-hidden rounded-[2rem] bg-charcoal">
                    {/* Background image on the right */}
                    <div className="absolute inset-y-0 right-0 w-full md:w-1/2">
                        <Image
                            src="/Flooring/Flooring-2.jpg"
                            alt="Professional flooring measurement and installation"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/70 md:via-charcoal/40 to-transparent" />
                    </div>

                    {/* Copy */}
                    <div className="relative z-10 max-w-xl px-8 py-16 md:px-14 md:py-20">
                        <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-orange-400 mb-5">
                            <span className="h-px w-6 bg-orange-400/70" />
                            No Obligation
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl font-medium text-white leading-[1.1] tracking-tight">
                            Book a free on-site measurement
                        </h2>
                        <p className="mt-5 text-lg text-white/70 leading-relaxed">
                            Our specialists visit your space, assess the subfloor, and recommend the right flooring —
                            then hand you an itemised quotation with no surprises.
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-6">
                            <div className="flex items-center gap-3 text-white/80">
                                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10">
                                    <Ruler className="w-5 h-5 text-orange-400" />
                                </span>
                                <span className="text-sm">Accurate on-site survey</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/80">
                                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10">
                                    <PhoneCall className="w-5 h-5 text-orange-400" />
                                </span>
                                <span className="text-sm">Same-day response</span>
                            </div>
                        </div>

                        <div className="mt-10 flex flex-wrap items-center gap-4">
                            <a
                                href="https://wa.me/60123498710"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 shadow-xl shadow-orange-900/30"
                            >
                                Book via WhatsApp
                                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                            </a>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 border border-white/25 text-white px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:bg-white/10"
                            >
                                Request a Quote
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
