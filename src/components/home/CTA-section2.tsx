
import { PhoneCall, Mail, UserSearch, Clock } from "lucide-react";
import Link from "next/link";
import Reveal from "@/components/common/reveal";
export default function CTASection2() {
    return (
        <section className="py-24 md:py-32 bg-white">
            <div className="container mx-auto px-6">
                <Reveal className="relative overflow-hidden bg-charcoal rounded-[2rem] py-16 px-6 md:px-12 text-white text-center">
                    {/* Decorative glow */}
                    <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-orange-600/20 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-orange-500/10 blur-3xl" />

                    <div className="relative z-10">
                        <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-orange-400 mb-5">
                            <span className="h-px w-6 bg-orange-400/60" />
                            Free Consultation
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl font-medium mb-5 tracking-tight leading-[1.1]">Let’s shape your interior together</h2>
                        <p className="text-base md:text-lg max-w-3xl mx-auto mb-8 text-white/70 leading-relaxed">
                            Ready to transform your living or working space? At <strong className="text-white">Furnishing Solutions</strong>, we pair smart materials with expert workmanship to create floors that are beautiful, functional, and built to last. Contact us today for your free consultation and quotation.
                        </p>

                        <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-white text-sm">
                            <a
                                href="https://wa.me/60123498710"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 px-6 py-3.5 rounded-full font-semibold transition-colors"
                            >
                                <PhoneCall className="w-5 h-5" />
                                WhatsApp: +60 12-349 8710
                            </a>
                            <Link
                                href="/contact"
                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-3.5 rounded-full font-semibold transition-colors backdrop-blur-sm"
                            >
                                <UserSearch className="w-5 h-5" />
                                <span>Contact Us</span>
                            </Link>
                            <a
                                href="mailto:info@furnishings.com.my"
                                className="flex items-center gap-2 text-white/70 hover:text-white px-4 py-3.5 transition-colors"
                            >
                                <Mail className="w-5 h-5" />
                                <span>info@furnishings.com.my</span>
                            </a>
                        </div>

                        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-white/50">
                            <Clock className="w-4 h-4 text-orange-400" />
                            <span>Open Mon–Sat, 9:00 AM – 6:00 PM · Selangor, Malaysia</span>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}