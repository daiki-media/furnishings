import Image from "next/image";
import Link from "next/link";
import InlineCopy from "./inline-copy";

/**
 * The /category page. Every heading, sentence, list item and FAQ comes from
 * the content doc (src/data/category-page-content.ts); the layout adds no copy
 * of its own. Category photos come from the CMS when it is reachable.
 */

const SITE_URL = "https://www.furnishings.com.my";

export type DocLink = { label: string; href: string };

export type CollectionsBlock =
    | { type: "paragraph"; text: string }
    | { type: "list"; items: string[] }
    | { type: "cta"; items: DocLink[] }
    | { type: "faq" };

export type CollectionsDoc = {
    title: string;
    intro: string;
    sections: { heading: string; slug: string | null; blocks: CollectionsBlock[] }[];
    faqs: { question: string; answer: string }[];
};

/** Strips inline markup so schema text matches what readers see. */
function plainText(text: string) {
    return text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, "");
}

function CtaRow({ items }: { items: DocLink[] }) {
    return (
        <div className="mt-8 flex flex-wrap gap-3">
            {items.map((item, index) => (
                <Link
                    key={item.label}
                    href={item.href}
                    className={
                        index === 0
                            ? "inline-flex items-center rounded-lg bg-orange-600 px-6 py-3 font-medium text-white transition-colors hover:bg-orange-700"
                            : "inline-flex items-center rounded-lg border border-orange-600 px-6 py-3 font-medium text-orange-700 transition-colors hover:bg-orange-50"
                    }
                >
                    {item.label}
                </Link>
            ))}
        </div>
    );
}

function Blocks({ blocks, faqs }: { blocks: CollectionsBlock[]; faqs: CollectionsDoc["faqs"] }) {
    return (
        <>
            {blocks.map((block, index) => {
                switch (block.type) {
                    case "paragraph":
                        return (
                            <p key={index} className="mt-5 text-lg leading-8 text-gray-600">
                                <InlineCopy text={block.text} />
                            </p>
                        );
                    case "list":
                        return (
                            <ul key={index} className="mt-5 space-y-3">
                                {block.items.map((item) => (
                                    <li key={item} className="flex gap-3 text-lg leading-8 text-gray-600">
                                        <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-orange-500" aria-hidden="true" />
                                        <span>
                                            <InlineCopy text={item} />
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        );
                    case "cta":
                        return <CtaRow key={index} items={block.items} />;
                    case "faq":
                        return (
                            <div key={index} className="mt-8 divide-y divide-gray-200 border-y border-gray-200">
                                {faqs.map((faq) => (
                                    <details key={faq.question} className="group py-5">
                                        <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-semibold text-gray-900 marker:hidden">
                                            <span>{faq.question}</span>
                                            <span
                                                className="shrink-0 text-2xl leading-none text-orange-600 transition-transform group-open:rotate-45"
                                                aria-hidden="true"
                                            >
                                                +
                                            </span>
                                        </summary>
                                        <p className="mt-3 text-lg leading-8 text-gray-600">
                                            <InlineCopy text={faq.answer} />
                                        </p>
                                    </details>
                                ))}
                            </div>
                        );
                }
            })}
        </>
    );
}

export default function CollectionsPage({
    doc,
    images,
}: {
    doc: CollectionsDoc;
    /** Category slug → photo URL from the CMS. */
    images: Record<string, string>;
}) {
    const collections = doc.sections.filter((section) => section.slug);
    const others = doc.sections.filter((section) => !section.slug);

    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "@id": `${SITE_URL}/category#collection`,
                url: `${SITE_URL}/category`,
                name: doc.title,
                description: plainText(doc.intro),
                mainEntity: {
                    "@type": "ItemList",
                    itemListElement: collections.map((section, index) => ({
                        "@type": "ListItem",
                        position: index + 1,
                        name: section.heading,
                        url: `${SITE_URL}/category/${section.slug}`,
                    })),
                },
            },
            {
                // Server-rendered so crawlers get it without running the
                // site-wide client breadcrumb (which waits for the catalogue).
                "@type": "BreadcrumbList",
                "@id": `${SITE_URL}/category#breadcrumb`,
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                    { "@type": "ListItem", position: 2, name: doc.title, item: `${SITE_URL}/category` },
                ],
            },
            {
                "@type": "FAQPage",
                "@id": `${SITE_URL}/category#faq`,
                mainEntity: doc.faqs.map((faq) => ({
                    "@type": "Question",
                    name: plainText(faq.question),
                    acceptedAnswer: { "@type": "Answer", text: plainText(faq.answer) },
                })),
            },
        ],
    };

    return (
        <main className="bg-white">
            <section className="bg-orange-50/60 py-16 sm:py-20">
                <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">{doc.title}</h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        <InlineCopy text={doc.intro} />
                    </p>
                </div>
            </section>

            {collections.map((section, index) => {
                const image = section.slug ? images[section.slug] : undefined;
                return (
                    <section
                        key={section.heading}
                        id={section.slug ?? undefined}
                        className={`scroll-mt-28 py-14 sm:py-16 ${index % 2 === 1 ? "bg-gray-50" : "bg-white"}`}
                    >
                        <div className="container mx-auto grid gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
                            {image ? (
                                <Link
                                    href={`/category/${section.slug}`}
                                    className="relative block h-64 overflow-hidden rounded-2xl bg-orange-100 lg:h-80"
                                    aria-label={section.heading}
                                >
                                    <Image
                                        src={image}
                                        alt={section.heading}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 40vw"
                                        className="object-cover p-4 transition-transform duration-500 hover:scale-105"
                                    />
                                </Link>
                            ) : (
                                <div className="hidden lg:block" />
                            )}
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900">{section.heading}</h2>
                                <Blocks blocks={section.blocks} faqs={doc.faqs} />
                            </div>
                        </div>
                    </section>
                );
            })}

            {others.map((section) => (
                <section key={section.heading} className="border-t border-gray-200 py-14 sm:py-16">
                    <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-gray-900">{section.heading}</h2>
                        <Blocks blocks={section.blocks} faqs={doc.faqs} />
                    </div>
                </section>
            ))}

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
            />
        </main>
    );
}
