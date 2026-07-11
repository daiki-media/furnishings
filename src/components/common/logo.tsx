import Link from "next/link";

type LogoProps = {
    /** "dark" for light backgrounds (charcoal text), "light" for dark backgrounds (white text). */
    variant?: "dark" | "light";
    className?: string;
    /** Hide the wordmark and show only the mark (e.g. tight spaces). */
    markOnly?: boolean;
};

/**
 * Brand wordmark: an orange "stacked planks" mark + serif "Furnishing" with a
 * spaced "Solutions" kicker. Pure markup — replaces the old logo image.
 */
export default function Logo({ variant = "dark", className = "", markOnly = false }: LogoProps) {
    const word = variant === "light" ? "text-white" : "text-charcoal";
    const kicker = variant === "light" ? "text-white/50" : "text-zinc-400";

    return (
        <Link
            href="/"
            aria-label="Furnishing Solutions — home"
            className={`inline-flex items-center gap-3 group ${className}`}
        >
            <span className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-md shadow-orange-900/20 transition-transform duration-300 group-hover:scale-105">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="4" y="6" width="16" height="2.6" rx="1.3" fill="white" fillOpacity="0.95" />
                    <rect x="4" y="10.7" width="10.5" height="2.6" rx="1.3" fill="white" fillOpacity="0.8" />
                    <rect x="4" y="15.4" width="14" height="2.6" rx="1.3" fill="white" fillOpacity="0.6" />
                </svg>
            </span>

            {!markOnly && (
                <span className="flex flex-col leading-none">
                    <span className={`font-display text-xl font-medium tracking-tight ${word}`}>
                        Furnishing
                    </span>
                    <span className={`text-[0.6rem] font-semibold uppercase tracking-[0.3em] mt-1 ${kicker}`}>
                        Solutions
                    </span>
                </span>
            )}
        </Link>
    );
}
