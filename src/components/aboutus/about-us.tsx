import {
    Star,
    Users,
    Award,
    Home,
    Building,
    MapPin,
    PhoneCall,
    ArrowRight,
    Check,
    Clock,
    Mail,
    Globe,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/common/reveal";
import SectionHeading from "@/components/home/section-heading";

// Facts sourced from the site's own content (contact page, coverage list).
// Deliberately avoids invented project counts / founding year — swap in real
// figures when available.
const stats = [
    { value: "6+", label: "Regions across Malaysia" },
    { value: "15-yr", label: "Product warranties" },
    { value: "100%", label: "Waterproof options" },
    { value: "Free", label: "On-site measurement" },
];

const offerings = [
    {
        icon: Home,
        title: "Vinyl Flooring Solutions",
        content:
            "A broad range of vinyl planks, tiles and sheets with realistic wood, stone and marble finishes.",
        points: ["100% waterproof", "Anti-slip & scratch-resistant", "Hygienic & low-maintenance", "Easy installation"],
    },
    {
        icon: Building,
        title: "SPC Flooring",
        content:
            "Highly durable SPC click-lock flooring built for long-term performance in high-traffic areas — resistant to wear, humidity and impact.",
    },
    {
        icon: Star,
        title: "Wall Panels & Surfaces",
        content:
            "From PVC wall cladding to custom decorative panels, offering thermal insulation, sound dampening and premium aesthetic finishes.",
    },
    {
        icon: Users,
        title: "Consultation & Installation",
        content:
            "Free consultation, on-site measurement and professional installation services following high-quality standards.",
    },
];

const reasons = [
    { title: "Designed for Malaysia’s Climate", desc: "Every product resists moisture, heat and tropical weather — perfect for the local environment." },
    { title: "Premium Quality Materials", desc: "Our flooring and wall panels meet international standards and are backed by manufacturer warranties." },
    { title: "Wide Range of Designs", desc: "Hundreds of colours, grains and patterns to suit minimalist, modern, industrial and luxury interiors." },
    { title: "Start-to-Finish Service", desc: "From consultation and delivery to skilled installation and after-sales support — end-to-end convenience." },
    { title: "Competitive Prices", desc: "Professional-grade flooring and wall finishes made affordable for homeowners, contractors and designers." },
    { title: "Proven Track Record", desc: "Projects completed across residential and commercial sites, trusted by clients nationwide." },
];

const audience = [
    { icon: Home, title: "Homeowners", desc: "Updating floors with water-resistant, stylish options." },
    { icon: Star, title: "Interior Designers", desc: "Seeking creative, reliable furnishing materials." },
    { icon: Building, title: "Commercial Businesses", desc: "Requiring flooring with durability and design appeal." },
    { icon: Users, title: "Developers", desc: "Looking for bulk supply and expert installation." },
    { icon: Award, title: "Hospitality & Retail", desc: "Needing quick turnarounds and professional finishing." },
];

const locations = ["Kuala Lumpur", "Selangor", "Penang", "Johor Bahru", "Melaka", "Ipoh", "Sabah & Sarawak"];

// LocalBusiness/Organization structured data — built from real contact details.
const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.furnishings.com.my/#organization",
    name: "Furnishing Solutions",
    url: "https://www.furnishings.com.my/",
    logo: "https://www.furnishings.com.my/logo.jpg",
    description:
        "Specialist in vinyl, SPC, laminate flooring, carpet tiles and artificial grass in Malaysia, with professional installation for homes and businesses.",
    email: "info@furnishings.com.my",
    telephone: "+60 12-349 8710",
    address: {
        "@type": "PostalAddress",
        addressLocality: "Selangor",
        addressRegion: "Selangor",
        addressCountry: "MY",
    },
    areaServed: locations.map((name) => ({ "@type": "AdministrativeArea", name })),
    openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
    },
};

const AboutUs = () => {
    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
            />

            {/* Hero */}
            <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-charcoal">
                <Image
                    src="/about3.jpg"
                    alt="Furnishing Solutions flooring showroom"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/30" />
                <div className="relative z-10 container mx-auto px-6 pb-16 md:pb-20">
                    <nav className="text-sm text-white/60 mb-5">
                        <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
                        <span className="mx-2">/</span>
                        <span className="text-white/90">About Us</span>
                    </nav>
                    <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-orange-400 mb-4">
                        <span className="h-px w-6 bg-orange-400/70" />
                        Our Story
                    </span>
                    <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium text-white leading-[1.05] tracking-tight max-w-3xl">
                        Flooring specialists in Malaysia
                    </h1>
                    <p className="mt-5 text-lg text-white/75 max-w-2xl leading-relaxed">
                        Furnishing Solutions supplies and installs vinyl, SPC, laminate flooring, carpet tiles and
                        interior surfaces — for homes and commercial spaces nationwide.
                    </p>
                </div>
            </section>

            {/* Stats bar */}
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

            {/* Story — editorial split */}
            <section className="py-24 md:py-32 bg-cream">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
                        <Reveal>
                            <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-orange-600 mb-5">
                                <span className="h-px w-6 bg-orange-500/60" />
                                Who We Are
                            </span>
                            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] text-charcoal">
                                Malaysia’s trusted interior &amp; flooring partner
                            </h2>
                            <p className="mt-6 text-lg text-zinc-600 leading-relaxed">
                                Established with a mission to transform spaces with practical yet beautiful materials,
                                Furnishing Solutions has grown into a go-to brand for top-quality vinyl flooring, PVC
                                tiles, SPC panels and interior wall solutions.
                            </p>
                            <p className="mt-4 text-lg text-zinc-600 leading-relaxed">
                                Our success is rooted in deep industry knowledge, consistent product quality and a
                                steadfast commitment to customer satisfaction — trusted by homeowners, designers and
                                contractors throughout Kuala Lumpur, Johor, Penang, Selangor and East Malaysia.
                            </p>
                            <Link
                                href="/shop"
                                className="mt-8 inline-flex items-center gap-2 text-charcoal font-semibold border-b-2 border-orange-500 pb-1 hover:gap-3 transition-all"
                            >
                                Browse our products
                                <ArrowRight className="w-4 h-4 text-orange-600" />
                            </Link>
                        </Reveal>

                        <Reveal delay={0.15} className="relative">
                            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-zinc-900/10">
                                <Image src="/about2.jpg" alt="Furnishing Solutions installation" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl px-6 py-4 hidden md:block">
                                <p className="font-display text-2xl font-medium text-charcoal">Nationwide</p>
                                <p className="text-sm text-zinc-500">Supply &amp; installation</p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-24 md:py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-6">
                        {[
                            { title: "Our Mission", content: "To supply modern, stylish and resilient interior furnishing solutions optimised for Malaysia’s climate and lifestyle — offering clients high value and professional service.", image: "/about1.jpg" },
                            { title: "Our Vision", content: "To be Malaysia’s most reliable furnishing partner by delivering durable flooring, contemporary wall designs and seamless project execution with a client-first mindset.", image: "/about2.jpg" },
                        ].map((item, index) => (
                            <Reveal key={index} delay={index * 0.1}>
                                <div className="group h-full bg-cream rounded-3xl border border-zinc-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                                    <div className="relative h-60">
                                        <Image src={item.image} alt={item.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                    <div className="p-8">
                                        <h3 className="font-display text-2xl font-medium text-charcoal mb-3">{item.title}</h3>
                                        <p className="text-zinc-600 leading-relaxed">{item.content}</p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Craftsmanship / team band */}
            <section className="py-24 md:py-32 bg-cream">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
                        <Reveal className="order-2 lg:order-1">
                            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl shadow-zinc-900/10">
                                <Image src="/Flooring/Flooring-2.jpg" alt="Our flooring installation team at work" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                            </div>
                        </Reveal>
                        <Reveal delay={0.1} className="order-1 lg:order-2">
                            <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-orange-600 mb-5">
                                <span className="h-px w-6 bg-orange-500/60" />
                                The People Behind the Work
                            </span>
                            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] text-charcoal">
                                Craftsmanship you can trust
                            </h2>
                            <p className="mt-6 text-lg text-zinc-600 leading-relaxed">
                                Behind every floor is a team of experienced consultants and skilled installers who treat
                                each project as their own. From precise subfloor preparation to a spotless final finish,
                                we handle the details so your space is ready to enjoy.
                            </p>
                            <div className="mt-8 grid sm:grid-cols-2 gap-3">
                                {["Certified, experienced installers", "Careful subfloor preparation", "Clean, on-time project delivery", "After-sales support & warranty"].map((p) => (
                                    <div key={p} className="flex items-center gap-2.5">
                                        <Check className="w-4 h-4 text-orange-600 shrink-0" />
                                        <span className="text-zinc-700">{p}</span>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* What We Offer */}
            <section className="py-24 md:py-32 bg-white">
                <div className="container mx-auto px-6">
                    <SectionHeading eyebrow="Our Expertise" title="What we offer" subtitle="A complete range of flooring and interior surfaces, backed by professional service." />
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
                        {offerings.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <Reveal key={index} delay={index * 0.06} className="h-full">
                                    <div className="h-full bg-cream rounded-2xl border border-zinc-100 p-7 hover:border-orange-200 hover:shadow-xl transition-all duration-300">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-50 text-orange-600 mb-5">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <h3 className="font-display text-xl font-medium text-charcoal mb-3">{item.title}</h3>
                                        <p className="text-zinc-600 leading-relaxed text-sm">{item.content}</p>
                                        {item.points && (
                                            <div className="mt-5 space-y-2 pt-5 border-t border-zinc-100">
                                                {item.points.map((p) => (
                                                    <div key={p} className="flex items-center gap-2">
                                                        <Check className="w-4 h-4 text-orange-600 shrink-0" />
                                                        <span className="text-sm text-zinc-600">{p}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                    <Reveal delay={0.1} className="text-center mt-14">
                        <Link href="/category" className="inline-flex items-center gap-2 text-charcoal font-semibold border-b-2 border-orange-500 pb-1 hover:gap-3 transition-all">
                            Explore all categories
                            <ArrowRight className="w-4 h-4 text-orange-600" />
                        </Link>
                    </Reveal>
                </div>
            </section>

            {/* Why Choose — dark band */}
            <section className="py-24 md:py-32 bg-charcoal">
                <div className="container mx-auto px-6">
                    <SectionHeading invert eyebrow="Why Furnishing Solutions" title="Reasons clients choose us" subtitle="From climate-ready materials to end-to-end service — the advantages that set us apart." />
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px mt-16 bg-white/10 rounded-2xl overflow-hidden border border-white/10">
                        {reasons.map((item, index) => (
                            <Reveal key={index} delay={index * 0.05} className="h-full">
                                <div className="h-full p-8 bg-charcoal hover:bg-white/[0.04] transition-colors duration-300">
                                    <span className="font-display text-3xl font-medium text-orange-400/30">{String(index + 1).padStart(2, "0")}</span>
                                    <h3 className="font-display text-xl font-medium text-white mt-3 mb-2">{item.title}</h3>
                                    <p className="text-white/60 leading-relaxed">{item.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Who We Serve */}
            <section className="py-24 md:py-32 bg-white">
                <div className="container mx-auto px-6">
                    <SectionHeading eyebrow="Our Clients" title="Who we serve" subtitle="Tailored flooring and furnishing solutions for every kind of project." />
                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-16">
                        {audience.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <Reveal key={index} delay={index * 0.06} className="h-full">
                                    <div className="h-full bg-cream rounded-2xl border border-zinc-100 p-6 text-center hover:border-orange-200 hover:shadow-lg transition-all duration-300">
                                        <div className="flex items-center justify-center w-12 h-12 bg-orange-50 text-orange-600 rounded-full mb-4 mx-auto">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <h3 className="font-display text-lg font-medium text-charcoal mb-2">{item.title}</h3>
                                        <p className="text-sm text-zinc-600 leading-relaxed">{item.desc}</p>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Visit our showroom — real details + map + coverage */}
            <section className="py-24 md:py-32 bg-cream">
                <div className="container mx-auto px-6">
                    <SectionHeading eyebrow="Come Say Hello" title="Visit our showroom" subtitle="Prefer to see and feel the materials in person? Our Selangor showroom is open six days a week." />

                    <div className="grid lg:grid-cols-2 gap-8 mt-16 items-stretch">
                        {/* Info card */}
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
                                    <div className="flex items-start gap-4">
                                        <span className="flex items-center justify-center w-11 h-11 rounded-full bg-orange-50 text-orange-600 shrink-0"><Mail className="w-5 h-5" /></span>
                                        <div>
                                            <p className="font-semibold text-charcoal">Email</p>
                                            <a href="mailto:info@furnishings.com.my" className="text-zinc-600 hover:text-orange-600 transition-colors">info@furnishings.com.my</a>
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
                                        {locations.map((location) => (
                                            <span key={location} className="bg-cream border border-zinc-200 text-zinc-700 px-3 py-1.5 rounded-full text-sm font-medium">
                                                {location}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-8 flex flex-wrap gap-4">
                                    <Link href="/contact" className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-6 py-3.5 rounded-full text-sm font-semibold transition-colors">
                                        Get directions & contact
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
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

            {/* Closing CTA */}
            <section className="py-24 md:py-32 bg-white">
                <div className="container mx-auto px-6">
                    <Reveal className="relative overflow-hidden bg-charcoal rounded-[2rem] py-16 px-6 md:px-12 text-center">
                        <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-orange-600/20 blur-3xl" />
                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight text-white leading-[1.1]">
                                Furnish your space with confidence
                            </h2>
                            <p className="mt-5 text-lg text-white/70 leading-relaxed">
                                Whether you’re upgrading your home or re-fitting a commercial space, we’re ready to help.
                                Contact us for a free consultation today.
                            </p>
                            <div className="mt-10 flex flex-wrap justify-center gap-4">
                                <a
                                    href="https://wa.me/60123498710"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 shadow-xl shadow-orange-900/20"
                                >
                                    <PhoneCall className="w-5 h-5" />
                                    Chat on WhatsApp
                                </a>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 border border-white/25 text-white px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:bg-white/10"
                                >
                                    Contact Us
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </main>
    );
};

export default AboutUs;
