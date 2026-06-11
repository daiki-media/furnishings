'use client';

import Link, { useLinkStatus } from 'next/link';

// Shows a small spinner inside the link while the next page is loading, so
// users get instant feedback when they click a pagination link.
function PendingSpinner() {
    const { pending } = useLinkStatus();
    if (!pending) return null;
    return (
        <span
            aria-hidden
            className="ml-2 inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent align-middle"
        />
    );
}

export default function PaginationLink({
    href,
    className,
    children,
}: {
    href: string;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <Link href={href} scroll={true} className={className}>
            {children}
            <PendingSpinner />
        </Link>
    );
}
