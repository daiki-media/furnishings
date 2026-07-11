import Link from "next/link";
import { MapPin, Clock, PhoneCall, Mail, ArrowRight, Globe } from "lucide-react";
import Reveal from "@/components/common/reveal";
import SectionHeading from "@/components/home/section-heading";

const details = [
    { icon: MapPin, label: "Showroom", value: "Furnishing Flooring Solutions, Selangor, Malaysia" },
    { icon: Clock, label: "Business hours", value: "Mon–Sat: 9:00 AM – 6:00 PM · Sun: Closed" },
    { icon: PhoneCall, label: "Phone / WhatsApp", value: "+60 12-349 8710", href: "https://wa.me/60123498710" },
    { icon: Mail, label: "Email", value: "info@furnishings.com.my", href: "mailto:info@furnishings.com.my" },
];

const locations = [
    "Kuala Lumpur",
    "Selangor",
    "Penang",
    "Johor Bahru",
    "Melaka",
    "Ipoh",
    "Sabah & Sarawak",
];

export default function ShowroomSection() {
    return (
        <section className="py-24 md:py-32 bg-charcoal">
            <div className="container mx-auto px-6">
                <SectionHeading
                    invert
                    eyebrow="Come Say Hello"
                    title="Visit our showroom"
                    subtitle="Based in Selangor and installing nationwide — see and feel the materials in person, six days a week."
                />

                <div className="grid lg:grid-cols-2 gap-8 mt-16 items-stretch">
                    {/* Info card */}
                    <Reveal className="h-full">
                        <div className="h-full bg-white/[0.04] border border-white/10 rounded-3xl p-8 md:p-10 flex flex-col">
                            <div className="space-y-6">
                                {details.map(({ icon: Icon, label, value, href }) => (
                                    <div key={label} className="flex items-start gap-4">
                                        <span className="flex items-center justify-center w-11 h-11 rounded-full bg-orange-600/15 text-orange-400 shrink-0">
                                            <Icon className="w-5 h-5" />
                                        </span>
                                        <div>
                                            <p className="text-sm text-white/50">{label}</p>
                                            {href ? (
                                                <a href={href} className="text-white font-medium hover:text-orange-400 transition-colors">
                                                    {value}
                                                </a>
                                            ) : (
                                                <p className="text-white font-medium">{value}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Coverage chips */}
                            <div className="mt-8 pt-8 border-t border-white/10">
                                <div className="flex items-center gap-2 text-sm font-semibold text-white/90 mb-4">
                                    <Globe className="w-4 h-4 text-orange-400" />
                                    Installing across Malaysia
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {locations.map((location) => (
                                        <span key={location} className="bg-white/[0.06] border border-white/10 text-white/80 px-3 py-1.5 rounded-full text-sm font-medium">
                                            {location}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-6 py-3.5 rounded-full text-sm font-semibold transition-colors"
                                >
                                    Get directions
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <a
                                    href="https://wa.me/60123498710"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-white/10 transition-colors"
                                >
                                    Book a visit
                                </a>
                            </div>
                        </div>
                    </Reveal>

                    {/* Map */}
                    <Reveal delay={0.1} className="h-full">
                        <div className="h-full min-h-[360px] rounded-3xl overflow-hidden border border-white/10">
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
    );
}
