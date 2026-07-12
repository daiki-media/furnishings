"use client";

import { useState } from "react";
import Link from "next/link";
import {
    MapPin,
    Clock,
    Phone,
    Mail,
    ArrowRight,
    Layers,
    Ruler,
    Building2,
    Calendar,
    MessageCircle,
    Check,
    Star,
    Globe,
    PhoneCall,
} from "lucide-react";
import Reveal from "@/components/common/reveal";
import SectionHeading from "@/components/home/section-heading";

const contactDetails = [
    { icon: MapPin, label: "Showroom", value: "Furnishing Flooring Solutions, Selangor, Malaysia" },
    { icon: Clock, label: "Business hours", value: "Mon–Sat: 9:00 AM – 6:00 PM · Sun: Closed" },
    { icon: Phone, label: "Call us", value: "+60 12-349 8710", href: "tel:+60123498710" },
    { icon: MessageCircle, label: "WhatsApp", value: "+60 12-349 8710", href: "https://wa.me/60123498710" },
    { icon: Mail, label: "Email", value: "info@furnishings.com.my", href: "mailto:info@furnishings.com.my" },
];

const quoteTips = [
    { icon: Layers, text: "Flooring type you're interested in (LVP, LVT, PVC Sheet, SPC)" },
    { icon: Ruler, text: "Area size in square feet or metres" },
    { icon: Building2, text: "Room type & intended use (kitchen, living room, office…)" },
    { icon: MapPin, text: "Property location (city and state)" },
    { icon: Calendar, text: "Preferred time for installation" },
];

const stats = [
    { value: "6+", label: "Regions across Malaysia" },
    { value: "Free", label: "On-site measurement" },
    { value: "Same day", label: "Response time" },
    { value: "15 yr", label: "Product warranty" },
];

const WHATSAPP_NUMBER = "60123498710";

const serviceAreas = ["Kuala Lumpur", "Selangor", "Penang", "Johor Bahru", "Melaka", "Ipoh", "Sabah & Sarawak"];

// ContactPage + LocalBusiness structured data, built from real contact details.
const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Furnishing Solutions",
    url: "https://www.furnishings.com.my/contact",
    mainEntity: {
        "@type": "LocalBusiness",
        "@id": "https://www.furnishings.com.my/#business",
        name: "Furnishing Solutions",
        url: "https://www.furnishings.com.my/",
        image: "https://www.furnishings.com.my/logo.jpg",
        telephone: "+60 12-349 8710",
        email: "info@furnishings.com.my",
        priceRange: "RM",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Selangor",
            addressRegion: "Selangor",
            addressCountry: "MY",
        },
        areaServed: serviceAreas.map((name) => ({ "@type": "AdministrativeArea", name })),
        openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "09:00",
            closes: "18:00",
        },
        contactPoint: {
            "@type": "ContactPoint",
            telephone: "+60 12-349 8710",
            contactType: "sales",
            areaServed: "MY",
            availableLanguage: ["en", "ms"],
        },
    },
};

const ContactUsPage = () => {
    const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleWhatsApp = (e: React.FormEvent) => {
        e.preventDefault();
        const lines = [
            `Hello Furnishing Solutions, I'd like a quote.`,
            ``,
            `Name: ${form.name || "-"}`,
            `Email: ${form.email || "-"}`,
            `Phone: ${form.phone || "-"}`,
            `Subject: ${form.subject || "-"}`,
            ``,
            form.message || "",
        ];
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
        window.open(url, "_blank", "noopener,noreferrer");
    };

    const handleEmail = () => {
        const subject = form.subject || "Flooring enquiry";
        const body = [
            `Name: ${form.name || "-"}`,
            `Email: ${form.email || "-"}`,
            `Phone: ${form.phone || "-"}`,
            ``,
            form.message || "",
        ].join("\n");
        window.location.href = `mailto:info@furnishings.com.my?subject=${encodeURIComponent(
            subject
        )}&body=${encodeURIComponent(body)}`;
    };

    const inputClass =
        "w-full px-4 py-3 rounded-xl bg-cream border border-zinc-200 text-charcoal placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-400 focus:bg-white transition-all";

    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
            />

            {/* ── Hero ── tall, dramatic, content anchored to bottom like About Us */}
            <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-charcoal">
                {/* Warm gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/40" />
                {/* Decorative blur blobs */}
                <div className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-orange-600/15 blur-[100px]" />
                <div className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-orange-400/5 blur-[80px]" />

                <div className="relative z-10 container mx-auto px-6 pb-16 md:pb-20">
                    <nav className="text-sm text-white/60 mb-5">
                        <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
                        <span className="mx-2">/</span>
                        <span className="text-white/90">Contact</span>
                    </nav>
                    <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-orange-400 mb-4">
                        <span className="h-px w-6 bg-orange-400/70" />
                        Get In Touch
                    </span>
                    <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium text-white leading-[1.05] tracking-tight max-w-3xl">
                        Let's start your flooring project
                    </h1>
                    <p className="mt-5 text-lg text-white/75 max-w-2xl leading-relaxed">
                        Whether you need expert advice, a custom quote or an on-site consultation, our team is ready
                        to help. Reach us by WhatsApp, email, or the form below.
                    </p>

                    {/* Hero CTAs */}
                    <div className="mt-10 flex flex-wrap items-center gap-4">
                        <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 shadow-xl shadow-orange-900/30"
                        >
                            <MessageCircle className="w-5 h-5" />
                            Chat on WhatsApp
                            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </a>
                        <Link
                            href="/shop"
                            className="inline-flex items-center gap-2 border border-white/25 text-white px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
                        >
                            Browse Products
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Stats bar ── same pattern as About Us */}
            <section className="bg-charcoal border-t border-white/10">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/10">
                        {stats.map((stat) => (
                            <div key={stat.label} className="py-8 px-4 text-center">
                                <p className="font-display text-3xl md:text-4xl font-medium text-orange-400">{stat.value}</p>
                                <p className="text-sm text-white/60 mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Contact channels ── horizontal strip, scannable */}
            <section className="py-24 md:py-32 bg-cream">
                <div className="container mx-auto px-6">
                    <SectionHeading
                        eyebrow="Reach Us Directly"
                        title="Get in touch"
                        subtitle="Multiple ways to connect — pick whichever suits you best."
                    />

                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-16">
                        {contactDetails.map(({ icon: Icon, label, value, href }, index) => (
                            <Reveal key={label} delay={index * 0.06} className="h-full">
                                <div className="h-full bg-white rounded-2xl border border-zinc-100 p-6 text-center hover:border-orange-200 hover:shadow-lg transition-all duration-300">
                                    <div className="flex items-center justify-center w-12 h-12 bg-orange-50 text-orange-600 rounded-full mb-4 mx-auto">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <p className="text-sm text-zinc-500 mb-1">{label}</p>
                                    {href ? (
                                        <a href={href} className="text-charcoal font-medium hover:text-orange-600 transition-colors text-sm">
                                            {value}
                                        </a>
                                    ) : (
                                        <p className="text-charcoal font-medium text-sm">{value}</p>
                                    )}
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Quote form ── full-width, editorial split with heading left, form right */}
            <section className="py-24 md:py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">

                        {/* Left — heading + trust signals */}
                        <Reveal>
                            <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-orange-600 mb-5">
                                <span className="h-px w-6 bg-orange-500/60" />
                                Free Quotation
                            </span>
                            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] text-charcoal">
                                Request a free quote
                            </h2>
                            <p className="mt-6 text-lg text-zinc-600 leading-relaxed">
                                Fill in a few details about your project and send them straight to our team.
                                We typically reply within the same day with a full, transparent breakdown —
                                materials, installation and warranty included.
                            </p>

                            <div className="mt-8 space-y-3">
                                {[
                                    "No obligations — 100% free estimate",
                                    "Same-day response via WhatsApp",
                                    "Full cost breakdown, no hidden fees",
                                    "On-site measurement included",
                                ].map((text) => (
                                    <div key={text} className="flex items-center gap-2.5">
                                        <Check className="w-4 h-4 text-orange-600 shrink-0" />
                                        <span className="text-zinc-700">{text}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 flex items-center gap-2 text-sm text-zinc-500">
                                <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                                Rated 4.5★ by customers on Google
                            </div>
                        </Reveal>

                        {/* Right — form card */}
                        <Reveal delay={0.15}>
                            <form onSubmit={handleWhatsApp} className="bg-cream rounded-3xl border border-zinc-100 p-8 md:p-10">
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">Full name</label>
                                        <input id="name" name="name" value={form.name} onChange={handleChange} required placeholder="Your name" className={inputClass} />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">Email</label>
                                        <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" className={inputClass} />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-2">Phone</label>
                                        <input id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="+60…" className={inputClass} />
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-charcoal mb-2">Subject</label>
                                        <input id="subject" name="subject" value={form.subject} onChange={handleChange} placeholder="e.g. Vinyl for a 3-room condo" className={inputClass} />
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">Message</label>
                                    <textarea id="message" name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Tell us about your project — flooring type, area size, location and timeline." className={`${inputClass} resize-none`} />
                                </div>

                                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                                    <button
                                        type="submit"
                                        className="flex-1 inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-6 py-4 rounded-full text-base font-semibold transition-colors shadow-xl shadow-orange-900/20"
                                    >
                                        <MessageCircle className="w-5 h-5" />
                                        Send via WhatsApp
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleEmail}
                                        className="inline-flex items-center justify-center gap-2 border border-zinc-300 text-charcoal px-6 py-4 rounded-full text-base font-semibold hover:bg-cream transition-colors"
                                    >
                                        <Mail className="w-5 h-5" />
                                        Send via Email
                                    </button>
                                </div>
                            </form>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ── What to include ── dark band with gap-px grid like WhyChooseUs */}
            <section className="py-24 md:py-32 bg-charcoal">
                <div className="container mx-auto px-6">
                    <SectionHeading
                        invert
                        eyebrow="For a Faster Quote"
                        title="What to include in your enquiry"
                        subtitle="Share these details and we'll come back with an accurate estimate — materials, installation and warranty included."
                    />
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px mt-16 bg-white/10 rounded-2xl overflow-hidden border border-white/10">
                        {quoteTips.map(({ icon: Icon, text }, index) => (
                            <Reveal key={index} delay={index * 0.06} className="h-full">
                                <div className="h-full p-8 bg-charcoal hover:bg-white/[0.04] transition-colors duration-300">
                                    <span className="font-display text-3xl font-medium text-orange-400/30">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-600/15 text-orange-400 mt-4 mb-4">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <p className="text-white/80 leading-relaxed">{text}</p>
                                </div>
                            </Reveal>
                        ))}
                        {/* Filler cell — CTA, matches WhyChooseUs last cell */}
                        <Reveal delay={0.36} className="h-full">
                            <div className="h-full p-8 bg-charcoal flex flex-col justify-center">
                                <Check className="w-6 h-6 text-orange-400 mb-3" />
                                <p className="font-display text-2xl text-white leading-snug mb-2">
                                    Full breakdown,<span className="text-orange-400"> no hidden fees.</span>
                                </p>
                                <a
                                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-5 inline-flex items-center gap-2 text-orange-400 font-semibold hover:gap-3 transition-all"
                                >
                                    Get your quote
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ── Showroom + Map ── 2-col layout like About Us showroom section */}
            <section className="py-24 md:py-32 bg-cream">
                <div className="container mx-auto px-6">
                    <SectionHeading
                        eyebrow="Come Say Hello"
                        title="Visit our showroom"
                        subtitle="Prefer to see and feel the materials in person? Our Selangor showroom is open six days a week."
                    />

                    <div className="grid lg:grid-cols-2 gap-8 mt-16 items-stretch">
                        {/* Info card — matches About Us showroom info card */}
                        <Reveal className="h-full">
                            <div className="h-full bg-white rounded-3xl border border-zinc-100 p-8 md:p-10 flex flex-col">
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <span className="flex items-center justify-center w-11 h-11 rounded-full bg-orange-50 text-orange-600 shrink-0"><MapPin className="w-5 h-5" /></span>
                                        <div>
                                            <p className="font-semibold text-charcoal">Showroom</p>
                                            <p className="text-zinc-600">Furnishing Flooring Solutions, Selangor, Malaysia</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <span className="flex items-center justify-center w-11 h-11 rounded-full bg-orange-50 text-orange-600 shrink-0"><Clock className="w-5 h-5" /></span>
                                        <div>
                                            <p className="font-semibold text-charcoal">Business hours</p>
                                            <p className="text-zinc-600">Mon–Sat: 9:00 AM – 6:00 PM · Sun: Closed (by appointment)</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <span className="flex items-center justify-center w-11 h-11 rounded-full bg-orange-50 text-orange-600 shrink-0"><PhoneCall className="w-5 h-5" /></span>
                                        <div>
                                            <p className="font-semibold text-charcoal">Phone / WhatsApp</p>
                                            <a href="https://wa.me/60123498710" className="text-zinc-600 hover:text-orange-600 transition-colors">+60 12-349 8710</a>
                                        </div>
                                    </div>
                                </div>

                                {/* Coverage chips */}
                                <div className="mt-8 pt-8 border-t border-zinc-100">
                                    <div className="flex items-center gap-2 text-sm font-semibold text-charcoal mb-4">
                                        <Globe className="w-4 h-4 text-orange-600" />
                                        Serving across Malaysia
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {serviceAreas.map((location) => (
                                            <span key={location} className="bg-cream border border-zinc-200 text-zinc-700 px-3 py-1.5 rounded-full text-sm font-medium">
                                                {location}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <a
                                        href={`https://wa.me/${WHATSAPP_NUMBER}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-6 py-3.5 rounded-full text-sm font-semibold transition-colors"
                                    >
                                        Get directions & contact
                                        <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </Reveal>

                        {/* Map */}
                        <Reveal delay={0.1} className="h-full">
                            <div className="h-full min-h-[360px] rounded-3xl overflow-hidden border border-zinc-100 shadow-sm">
                                <iframe
                                    title="Furnishing Solutions showroom location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1573291.9860987484!2d101.0727241!3d4.0895796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6a5aab8eaba0ddcd%3A0x54759df5cc229ce4!2sVinyl%20Flooring%20%26%20Carpets%20Specialist%20Center!5e1!3m2!1sen!2sin!4v1754302526927!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, minHeight: "360px" }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ── Closing CTA ── matches CTASection2 pattern */}
            <section className="py-24 md:py-32 bg-white">
                <div className="container mx-auto px-6">
                    <Reveal className="relative overflow-hidden bg-charcoal rounded-[2rem] py-16 px-6 md:px-12 text-center">
                        <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-orange-600/20 blur-3xl" />
                        <div className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-orange-500/10 blur-3xl" />

                        <div className="relative z-10 max-w-3xl mx-auto">
                            <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-orange-400 mb-5">
                                <span className="h-px w-6 bg-orange-400/60" />
                                Free Consultation
                            </span>
                            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight text-white leading-[1.1]">
                                Your trusted flooring partner in Malaysia
                            </h2>
                            <p className="mt-5 text-lg text-white/70 leading-relaxed">
                                No matter the size or scope of your project, we bring expertise, quality assurance and
                                complete customer satisfaction. Let's take the first step toward stylish, long-lasting floors.
                            </p>
                            <div className="mt-10 flex flex-wrap justify-center gap-4">
                                <a
                                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 shadow-xl shadow-orange-900/20"
                                >
                                    <PhoneCall className="w-5 h-5" />
                                    WhatsApp: +60 12-349 8710
                                </a>
                                <Link
                                    href="/shop"
                                    className="inline-flex items-center gap-2 border border-white/25 text-white px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:bg-white/10"
                                >
                                    Browse Products
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-white/50">
                                <Clock className="w-4 h-4 text-orange-400" />
                                <span>Open Mon–Sat, 9:00 AM – 6:00 PM · Selangor, Malaysia</span>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </main>
    );
};

export default ContactUsPage;
