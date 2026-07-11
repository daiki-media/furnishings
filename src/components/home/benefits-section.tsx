import { Shield, Droplets, Zap, Volume2, Sparkles, Bug } from "lucide-react";
import Image from "next/image";
import Reveal from "@/components/common/reveal";

const benefits = [
    {
        icon: Droplets,
        title: "Water & Moisture Resistant",
        description: "Continue performing under wet or humid conditions."
    },
    {
        icon: Shield,
        title: "Scratch, Stain & Impact Proof",
        description: "Built to withstand pets, high heels, heavy furniture, and daily wear."
    },
    {
        icon: Volume2,
        title: "Comfortable & Sound-Absorbing",
        description: "Thicker vinyl layers cushion footsteps and reduce sound reverberation."
    },
    {
        icon: Sparkles,
        title: "Easy to Maintain",
        description: "Regular sweeping and damp mopping are all that's required."
    },
    {
        icon: Bug,
        title: "Termite & Pest Resistant",
        description: "Vinyl and PVC resist infestation, unlike timber flooring."
    },
    {
        icon: Zap,
        title: "Eco-Conscious Options",
        description: "Low-VOC and recyclable products support healthier living spaces."
    }
];

export default function VinylBenefitsSection() {
    return (
        <section className="py-24 md:py-32 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-stretch">
                    {/* Image column — fills the block height */}
                    <Reveal className="lg:col-span-2 h-full">
                        <div className="relative h-72 lg:h-full min-h-full rounded-[2rem] overflow-hidden shadow-2xl shadow-zinc-900/10">
                            <Image
                                src="/VINYL1.jpg"
                                alt="Vinyl flooring in a modern Malaysian home"
                                fill
                                sizes="(max-width: 1024px) 100vw, 40vw"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 p-8">
                                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-orange-300 mb-3">
                                    <span className="h-px w-6 bg-orange-300/70" />
                                    Why Vinyl &amp; PVC
                                </span>
                                <h2 className="font-display text-3xl md:text-4xl font-medium text-white leading-[1.1]">
                                    Benefits for
                                    <br />
                                    Malaysian homes
                                </h2>
                            </div>
                        </div>
                    </Reveal>

                    {/* Benefits grid */}
                    <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
                        {benefits.map((benefit, index) => {
                            const IconComponent = benefit.icon;
                            return (
                                <Reveal key={index} delay={index * 0.05} className="h-full">
                                    <div className="group relative h-full bg-cream rounded-2xl border border-zinc-100 p-6 hover:border-orange-200 hover:shadow-lg transition-all duration-300">
                                        <span className="absolute top-5 right-6 font-display text-3xl font-medium text-zinc-200 group-hover:text-orange-200 transition-colors select-none">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <span className="flex items-center justify-center w-11 h-11 rounded-full bg-orange-600 text-white mb-4">
                                            <IconComponent className="w-5 h-5" />
                                        </span>
                                        <h3 className="text-base font-semibold text-charcoal mb-1.5">{benefit.title}</h3>
                                        <p className="text-sm text-zinc-600 leading-relaxed">{benefit.description}</p>
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
