import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/common/reveal";
import SectionHeading from "@/components/home/section-heading";

type Project = {
    image: string;
    title: string;
    tag: string;
    /** Tailwind column/row span for the bento layout. */
    className: string;
};

const projects: Project[] = [
    {
        image: "/Flooring/Flooring-1.jpg",
        title: "Luxury vinyl plank living room",
        tag: "Residential · Kuala Lumpur",
        className: "sm:col-span-2 sm:row-span-2",
    },
    {
        image: "/LVT & SPC1.jpg",
        title: "SPC flooring for a modern kitchen",
        tag: "Residential · Selangor",
        className: "",
    },
    {
        image: "/carpet-tiles1.jpg",
        title: "Office carpet tiles",
        tag: "Commercial · Petaling Jaya",
        className: "",
    },
    {
        image: "/VINYL2.jpg",
        title: "Waterproof vinyl bathroom",
        tag: "Residential · Penang",
        className: "",
    },
    {
        image: "/Artificial Grass1.jpg",
        title: "Balcony artificial grass",
        tag: "Outdoor · Johor Bahru",
        className: "",
    },
];

export default function GallerySection() {
    return (
        <section className="py-24 md:py-32 bg-cream">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <SectionHeading
                        align="left"
                        eyebrow="Our Work"
                        title="Recent flooring projects"
                        subtitle="A look at real homes and businesses we've transformed across Malaysia."
                    />
                    <Reveal delay={0.1} className="shrink-0">
                        <Link
                            href="/shop"
                            className="hidden md:inline-flex items-center gap-2 text-charcoal font-semibold border-b-2 border-orange-500 pb-1 hover:gap-3 transition-all"
                        >
                            Start your project
                            <ArrowRight className="w-4 h-4 text-orange-600" />
                        </Link>
                    </Reveal>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px] gap-4 mt-16">
                    {projects.map((project, index) => (
                        <Reveal
                            key={project.image}
                            delay={index * 0.06}
                            className={`group relative overflow-hidden rounded-2xl ${project.className}`}
                        >
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                sizes="(max-width: 640px) 50vw, 25vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-5">
                                <span className="text-xs font-medium uppercase tracking-[0.15em] text-orange-300">
                                    {project.tag}
                                </span>
                                <h3 className="text-white font-medium leading-snug mt-1">
                                    {project.title}
                                </h3>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
