import { Phone, MapPin, Palette, FileText, Wrench, Shield } from "lucide-react";
import Reveal from "@/components/common/reveal";
import SectionHeading from "@/components/home/section-heading";

const processSteps = [
    {
        icon: Phone,
        title: "Free Consultation",
        description:
            "Contact us by phone or WhatsApp with your room dimensions and preferred flooring style. Our team will guide you through suitable choices and available designs.",
    },
    {
        icon: MapPin,
        title: "On-Site Floor Survey",
        description:
            "We conduct a site visit to assess subfloor conditions (flatness, moisture content, shade exposure) to recommend the best solution.",
    },
    {
        icon: Palette,
        title: "Product Sampling",
        description:
            "Visit our Selangor showroom to view actual flooring samples under natural lighting, or receive sample swatches to evaluate before purchase.",
    },
    {
        icon: FileText,
        title: "Tailored Quotation",
        description:
            "We provide a full breakdown including material costs, labour, installation time, warranty information, and optional accessories—ensuring no surprises.",
    },
    {
        icon: Wrench,
        title: "Professional Installation & Quality Inspection",
        description:
            "Our certified installers execute precise layout, cut, and seal work. We ensure cleanliness and safety throughout—and perform a final quality check once installation is complete.",
    },
    {
        icon: Shield,
        title: "Aftercare & Warranty Support",
        description:
            "Depending on product selection, warranty ranges from 5 to 15 years. We offer ongoing maintenance advice and respond promptly to any concerns.",
    },
];

export default function ProcessSection() {
    return (
        <section className="py-24 md:py-32 bg-cream">
            <div className="container mx-auto px-6">
                <SectionHeading
                    eyebrow="How It Works"
                    title="Our Process — Clear, Efficient, Customer-Centric"
                    subtitle="From first consultation to aftercare, six streamlined steps take your flooring project from idea to installed."
                />

                {/* Numbered step cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
                    {processSteps.map((process, index) => {
                        const IconComponent = process.icon;
                        return (
                            <Reveal key={index} delay={index * 0.06} className="h-full">
                                <div className="relative h-full p-7 bg-white rounded-2xl border border-zinc-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300">
                                    {/* Step number watermark */}
                                    <span className="absolute top-5 right-6 font-display text-5xl font-medium text-orange-100 select-none">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-orange-50 text-orange-600 mb-5">
                                        <IconComponent className="w-6 h-6" />
                                    </div>
                                    <h3 className="relative font-display text-lg font-medium text-charcoal mb-2">
                                        {process.title}
                                    </h3>
                                    <p className="relative text-zinc-600 leading-relaxed">
                                        {process.description}
                                    </p>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
