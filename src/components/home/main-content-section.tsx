import {
    Droplet,
    ShieldCheck,
    Brush,
    Wrench,
    Globe,
    Check,
    Home,
    Layers,
    ArrowRight,
    Star,
    Users,
    Shield,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/common/reveal";
import SectionHeading from "@/components/home/section-heading";

const features = [
    {
        icon: ShieldCheck,
        title: "Climate-Ready Durability",
        description:
            "Malaysia’s hot, humid, and rainy environment can compromise traditional flooring—causing buckling, warping, and swelling. Furnishing Solutions offers flooring products specifically engineered for moisture resilience, thermal stability, and termite resistance, making them ideal for local conditions.",
    },
    {
        icon: Droplet,
        title: "100% Waterproof Performance",
        description:
            "All our flooring options—including luxury vinyl plank (LVP), luxury vinyl tile (LVT), and PVC sheet—are fully waterproof when installed properly. They withstand moisture in kitchens, bathrooms, laundry rooms, and other wet zones without risk of damage or leakage.",
    },
    {
        icon: Brush,
        title: "Wide Range of Stylish Designs",
        description: (
            <>
                <p>Choose from thousands of inspiring patterns and colours, including:</p>
                <ul className="list-disc list-outside pl-5 text-white/60 text-base space-y-1 mt-2">
                    <li>Wood-look vinyl planks (oak, walnut, teak)</li>
                    <li>Stone, marble, and concrete-effect tiles</li>
                    <li>
                        Monochrome or vibrant patterned rolls suitable for modern, minimalist, or traditional Malaysian interiors
                    </li>
                </ul>
                <p className="mt-2">Our diverse design range ensures every customer finds the perfect match for their décor.</p>
            </>
        ),
    },
    {
        icon: Wrench,
        title: "Professional Installation & Aftercare",
        description:
            "Our flooring specialists handle every step—from precise subfloor preparation to seamless installation, edge finishing, and final inspection. We also provide maintenance guidance and warranties to ensure your peace of mind.",
    },
    {
        icon: Globe,
        title: "Transparent Pricing & Nationwide Reach",
        description:
            "Furnishing Solutions provides honest per-sq-ft costing, including materials and labour. We offer volume discounts for large projects, and our services cover key Malaysian regions—Kuala Lumpur, Klang Valley, Penang, Johor, Melaka, East Malaysia, Ipoh, and beyond.",
    },
];

const flooringData = [
    {
        type: "Luxury Vinyl Plank (LVP)",
        description: "Durable wood-look planks with natural texture",
        idealFor: "Living rooms, bedrooms, retail outlets",
        icon: <Home className="w-6 h-6" />,
        features: ["Wood-look finish", "Natural texture", "High durability"],
    },
    {
        type: "Luxury Vinyl Tile (LVT)",
        description: "Stone-look tiles with anti-slip & stain-resistant finishes",
        idealFor: "Kitchens, bathrooms, hallways",
        icon: <Layers className="w-6 h-6" />,
        features: ["Stone-look design", "Anti-slip surface", "Stain-resistant"],
    },
    {
        type: "Click-Lock Vinyl",
        description: "Easy-to-install floating flooring—no adhesive required",
        idealFor: "DIY projects, rental units, renovations",
        icon: <Wrench className="w-6 h-6" />,
        features: ["No adhesive needed", "Easy installation", "DIY friendly"],
    },
    {
        type: "Vinyl Sheet Flooring (SVC)",
        description: "Seamless vinyl rolls for large, wet areas",
        idealFor: "Clinics, labs, commercial wet zones",
        icon: <Droplet className="w-6 h-6" />,
        features: ["Seamless design", "Waterproof", "Commercial grade"],
    },
];

const trustBadges = [
    { icon: Star, label: "Premium Quality Guaranteed" },
    { icon: Users, label: "Trusted Across Malaysia" },
    { icon: Shield, label: "Secure & Fast Delivery" },
];

/**
 * Trust intro — editorial split: statement copy on the left, layered flooring
 * imagery on the right. Sits right below the hero to establish authority.
 */
export function TrustIntro() {
    return (
        <section className="py-24 md:py-32 bg-cream">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
                    {/* Copy */}
                    <Reveal>
                        <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-orange-600 mb-5">
                            <span className="h-px w-6 bg-orange-500/60" />
                            Malaysia’s Flooring Specialist
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] text-charcoal">
                            The most trusted vinyl flooring &amp; carpet provider
                        </h2>
                        <p className="mt-6 text-lg text-zinc-600 leading-relaxed">
                            Furnishing Solutions is Malaysia’s foremost specialist in vinyl and PVC flooring,
                            offering high-quality products and professional installation services tailored to
                            the country’s humid, tropical climate. Whether you’re renovating a condominium in
                            Kuala Lumpur, fitting a café in Penang, or refurbishing offices in Johor Bahru, our
                            waterproof, stylish, and easy-to-maintain flooring solutions deliver exceptional
                            performance and customer satisfaction.
                        </p>

                        <div className="mt-8 space-y-3">
                            {trustBadges.map(({ icon: Icon, label }) => (
                                <div key={label} className="flex items-center gap-3">
                                    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-orange-100 text-orange-600 shrink-0">
                                        <Icon className="w-4 h-4" />
                                    </span>
                                    <span className="text-zinc-700 font-medium">{label}</span>
                                </div>
                            ))}
                        </div>

                        <Link
                            href="/about-us"
                            className="mt-8 inline-flex items-center gap-2 text-charcoal font-semibold border-b-2 border-orange-500 pb-1 hover:gap-3 transition-all"
                        >
                            More about us
                            <ArrowRight className="w-4 h-4 text-orange-600" />
                        </Link>
                    </Reveal>

                    {/* Layered images */}
                    <Reveal delay={0.15} className="relative">
                        <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-zinc-900/10">
                            <Image
                                src="/Flooring/Flooring-3.jpg"
                                alt="Premium vinyl flooring installation"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-8 -left-8 w-40 h-52 rounded-2xl overflow-hidden shadow-xl ring-8 ring-cream hidden sm:block">
                            <Image
                                src="/LVT & SPC.jpg"
                                alt="Luxury vinyl tile detail"
                                fill
                                sizes="160px"
                                className="object-cover"
                            />
                        </div>
                        {/* Floating stat card */}
                        <div className="absolute -top-6 -right-4 bg-white rounded-2xl shadow-xl px-6 py-4 hidden md:block">
                            <p className="font-display text-3xl font-medium text-charcoal">15+ yrs</p>
                            <p className="text-sm text-zinc-500">Warranty coverage</p>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

/**
 * Flooring buyer's guide — educational. Helps a visitor understand the four
 * vinyl *types* (LVP/LVT/Click-Lock/Sheet) and which suits their space, before
 * they browse the real, purchasable catalogue in <FloorCategories/>.
 */
export function FlooringGuide() {
    return (
        <section className="py-24 md:py-32 bg-white">
            <div className="container mx-auto px-6">
                <SectionHeading
                    eyebrow="Buyer’s Guide"
                    title="Which flooring is right for you?"
                    subtitle="New to vinyl? Compare the four main types by look, strength, and where each performs best — then explore the collection below."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
                    {flooringData.map((flooring, index) => (
                        <Reveal key={index} delay={index * 0.08} className="group h-full">
                            <div className="h-full flex flex-col bg-cream rounded-2xl border border-zinc-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
                                <div className="p-7">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-600 text-white mb-6">
                                        {flooring.icon}
                                    </div>
                                    <h3 className="font-display text-xl font-medium text-charcoal mb-2">{flooring.type}</h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed">{flooring.description}</p>
                                </div>

                                <div className="px-7 pb-7 mt-auto">
                                    <div className="space-y-2 mb-5 pt-5 border-t border-zinc-200/70">
                                        {flooring.features.map((feature, featureIndex) => (
                                            <div key={featureIndex} className="flex items-center gap-2">
                                                <Check className="w-4 h-4 text-orange-600 shrink-0" />
                                                <span className="text-sm text-zinc-600">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400 mb-1.5">Best for</p>
                                    <span className="inline-block bg-orange-50 text-orange-700 text-xs font-medium px-3 py-1.5 rounded-full border border-orange-100">
                                        {flooring.idealFor}
                                    </span>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

/**
 * Why-choose-us — dark premium band. The differentiators that set the company
 * apart (engineered for the climate, waterproof, install & aftercare, pricing).
 */
export function WhyChooseUs() {
    return (
        <section className="py-24 md:py-32 bg-charcoal">
            <div className="container mx-auto px-6">
                <SectionHeading
                    invert
                    eyebrow="Why Furnishing Solutions"
                    title="Built for Malaysian living"
                    subtitle="Engineered materials, expert installation, and honest pricing — the reasons customers choose us."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px mt-16 bg-white/10 rounded-2xl overflow-hidden border border-white/10">
                    {features.map((feature, index) => (
                        <Reveal key={index} delay={index * 0.06} className="h-full">
                            <div className="h-full p-8 bg-charcoal hover:bg-white/[0.04] transition-colors duration-300">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-600/15 text-orange-400 mb-6">
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-display text-xl font-medium text-white mb-3">{feature.title}</h3>
                                {typeof feature.description === "string" ? (
                                    <p className="text-base text-white/60 leading-relaxed">{feature.description}</p>
                                ) : (
                                    <div className="text-base text-white/60 leading-relaxed">{feature.description}</div>
                                )}
                            </div>
                        </Reveal>
                    ))}
                    {/* Filler cell to complete the grid on lg */}
                    <Reveal delay={0.36} className="h-full hidden lg:block">
                        <div className="h-full p-8 bg-charcoal flex flex-col justify-center">
                            <p className="font-display text-2xl text-white leading-snug">
                                Ready to start your
                                <span className="text-orange-400"> flooring project?</span>
                            </p>
                            <Link
                                href="/contact"
                                className="mt-5 inline-flex items-center gap-2 text-orange-400 font-semibold hover:gap-3 transition-all"
                            >
                                Get a free quote
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
