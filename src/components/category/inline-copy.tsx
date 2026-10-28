import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Renders content-doc text with two inline markers: [label](href) links and
 * **bold**. Anything else prints as typed.
 */
const MARKERS = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;

const linkClass =
    "font-medium text-orange-700 underline decoration-orange-300 underline-offset-4 hover:text-orange-800 hover:decoration-orange-600";

export default function InlineCopy({ text }: { text: string }) {
    const nodes: ReactNode[] = [];
    let cursor = 0;

    for (const match of text.matchAll(MARKERS)) {
        const [marker, label, href, bold] = match;
        const start = match.index ?? 0;
        if (start > cursor) nodes.push(text.slice(cursor, start));

        if (href) {
            nodes.push(
                href.startsWith("/") ? (
                    <Link className={linkClass} href={href} key={start}>
                        {label}
                    </Link>
                ) : (
                    <a className={linkClass} href={href} key={start} target="_blank" rel="noopener noreferrer">
                        {label}
                    </a>
                ),
            );
        } else {
            nodes.push(
                <strong className="font-semibold text-gray-900" key={start}>
                    {bold}
                </strong>,
            );
        }
        cursor = start + marker.length;
    }

    if (cursor < text.length) nodes.push(text.slice(cursor));
    return <>{nodes}</>;
}
