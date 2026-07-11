"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
    children: ReactNode;
    /** Extra delay (seconds) before the animation starts — handy for staggering. */
    delay?: number;
    /** How far the element travels up as it fades in. */
    y?: number;
    className?: string;
    as?: "div" | "section" | "li" | "span";
};

/**
 * Lightweight scroll reveal. Content is always rendered in the DOM (so SSR/SEO
 * is unchanged) — framer-motion only animates opacity/transform once the block
 * scrolls into view. `once` keeps it from replaying on every scroll.
 */
export default function Reveal({
    children,
    delay = 0,
    y = 24,
    className,
    as = "div",
}: RevealProps) {
    const MotionTag = motion[as];

    return (
        <MotionTag
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </MotionTag>
    );
}
