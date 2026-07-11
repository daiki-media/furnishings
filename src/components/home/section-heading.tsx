import type { ReactNode } from "react";
import Reveal from "@/components/common/reveal";

type SectionHeadingProps = {
    /** Small uppercase label above the title. */
    eyebrow?: string;
    title: ReactNode;
    subtitle?: ReactNode;
    align?: "center" | "left";
    /** Use on dark backgrounds. */
    invert?: boolean;
    className?: string;
};

/**
 * Shared section header: eyebrow + serif display title + optional subtitle.
 * Gives every section the same typographic rhythm and an elegant reveal.
 */
export default function SectionHeading({
    eyebrow,
    title,
    subtitle,
    align = "center",
    invert = false,
    className = "",
}: SectionHeadingProps) {
    const isCenter = align === "center";

    return (
        <Reveal
            className={`${isCenter ? "text-center mx-auto max-w-3xl" : "text-left max-w-3xl"} ${className}`}
        >
            {eyebrow && (
                <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-orange-600 mb-5">
                    <span className="h-px w-6 bg-orange-500/60" />
                    {eyebrow}
                </span>
            )}
            <h2
                className={`font-display text-4xl sm:text-5xl md:text-[3.25rem] font-medium tracking-tight leading-[1.08] ${invert ? "text-white" : "text-charcoal"
                    }`}
            >
                {title}
            </h2>
            {subtitle && (
                <p
                    className={`mt-6 text-lg leading-relaxed ${invert ? "text-white/70" : "text-zinc-500"
                        }`}
                >
                    {subtitle}
                </p>
            )}
        </Reveal>
    );
}
