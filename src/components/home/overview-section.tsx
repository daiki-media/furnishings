import { CheckCircle, HeartHandshake, ShieldCheck, Leaf } from "lucide-react";
import Reveal from "@/components/common/reveal";
import SectionHeading from "@/components/home/section-heading";

const coreValues = [
    {
        icon: ShieldCheck,
        title: "Quality Assurance",
        description: "Every product is rigorously inspected and certified for performance.",
    },
    {
        icon: HeartHandshake,
        title: "Customer Focus",
        description: "We value clear communication, tailored service, and support from start to finish.",
    },
    {
        icon: CheckCircle,
        title: "Trust & Transparency",
        description: "Honest pricing, reliable warranties, and dependable installation schedules.",
    },
    {
        icon: Leaf,
        title: "Innovation & Sustainability",
        description: "We offer eco-friendly products and modern, healthy solutions.",
    },
];

export default function CompanyOverviewSection() {
    return (
        <section className="py-24 md:py-32 bg-cream">
            <div className="container mx-auto px-6">
                {/* Company Profile */}
                <SectionHeading eyebrow="About Us" title="Company profile" />
                <Reveal delay={0.1} className="max-w-4xl mx-auto mt-8 space-y-4">
                    <p className="text-lg text-zinc-600 leading-relaxed text-center">
                        Established to bring advanced flooring solutions to Malaysians, <strong className="text-charcoal">Furnishing Solutions</strong> has rapidly built a reputation for reliability and design excellence.
                        We collaborate with industry-leading manufacturers to source products suited to tropical conditions—ensuring long-term beauty, safety, and style.
                    </p>
                    <p className="text-lg text-zinc-600 leading-relaxed text-center">
                        From apartments and landed homes to offices, retail spaces, and factories, our team provides tailored solutions backed by transparent service, ethical sourcing, and performance-focused installations.
                        We believe that great interiors start from the ground up—and that quality flooring underpins functional, beautiful spaces.
                    </p>
                </Reveal>

                {/* Core Values */}
                <div className="mt-20">
                    <SectionHeading eyebrow="What We Stand For" title="Our core values" />
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
                        {coreValues.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <Reveal key={index} delay={index * 0.06} className="h-full">
                                    <div className="h-full p-7 bg-white border border-zinc-100 rounded-2xl hover:border-orange-200 hover:shadow-xl transition-all duration-300">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-50 text-orange-600 mb-5">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <h3 className="font-display text-lg font-medium text-charcoal mb-2">{value.title}</h3>
                                        <p className="text-base text-zinc-600 leading-relaxed">{value.description}</p>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
