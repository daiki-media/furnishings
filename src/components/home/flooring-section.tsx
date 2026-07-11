import { CloudRainWind, Layers, Sprout, LayoutDashboard, Home, RulerDimensionLine, ArrowRight } from "lucide-react";
import Link from "next/link";
import Reveal from "@/components/common/reveal";
import SectionHeading from "@/components/home/section-heading";

interface FlooringItem {
    title: string;
    description: string;
    icon: React.ReactNode;
    href: string;
    cta: string;
}

const flooringItems: FlooringItem[] = [
    {
        title: "Laminate Flooring",
        description:
            "Warm, wood-look laminate that's hard-wearing and budget-friendly — a natural fit for living rooms, bedrooms and busy family homes.",
        icon: <CloudRainWind size={22} />,
        href: "/shop",
        cta: "Shop laminate",
    },
    {
        title: "Vinyl Flooring",
        description:
            "Waterproof vinyl planks, tiles and sheets that shrug off spills and humidity — ideal for kitchens, bathrooms and wet areas across Malaysia.",
        icon: <Layers size={22} />,
        href: "/shop",
        cta: "Shop vinyl",
    },
    {
        title: "Synthetic Grass",
        description:
            "Low-maintenance artificial grass that stays green all year — perfect for balconies, patios and outdoor play areas without the upkeep.",
        icon: <Sprout size={22} />,
        href: "/shop",
        cta: "Explore turf",
    },
    {
        title: "Carpet & Carpet Tiles",
        description:
            "Comfortable, acoustic carpet tiles for offices and commercial spaces — easy to install, easy to replace, and available online or in-store.",
        icon: <LayoutDashboard size={22} />,
        href: "/shop",
        cta: "Shop carpet tiles",
    },
    {
        title: "Commercial Flooring",
        description:
            "Durable, high-traffic flooring for offices, retail and clinics — with volume pricing and nationwide installation for larger projects.",
        icon: <Home size={22} />,
        href: "/contact",
        cta: "Request a project quote",
    },
    {
        title: "Advice & Inspiration",
        description:
            "Not sure where to start? Browse our journal for design ideas, care tips and guides on choosing the right flooring for your space.",
        icon: <RulerDimensionLine size={22} />,
        href: "/blog",
        cta: "Read the journal",
    },
];

const FlooringSection = () => {
    return (
        <section className="py-24 md:py-32 bg-white">
            <div className="container mx-auto px-6">
                <SectionHeading
                    eyebrow="Explore by Need"
                    title="Flooring solutions for every space"
                    subtitle="From waterproof vinyl and warm laminate to artificial grass and commercial carpet tiles — find the right surface for your home or business in Malaysia."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
                    {flooringItems.map((item, index) => (
                        <Reveal key={index} delay={index * 0.06} className="h-full">
                            <Link
                                href={item.href}
                                className="group h-full flex flex-col bg-cream p-7 rounded-2xl border border-zinc-100 hover:border-orange-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-5">
                                    {item.icon}
                                </div>
                                <h3 className="font-display text-xl font-medium text-charcoal mb-3">{item.title}</h3>
                                <p className="text-zinc-600 leading-relaxed">{item.description}</p>
                                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-orange-600 group-hover:gap-3 transition-all">
                                    {item.cta}
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FlooringSection;
