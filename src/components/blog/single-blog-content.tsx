// Server component: only renders blog content (no client-side state/effects),
// so it ships no client JS and the related products are fetched on the server.
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowLeft } from "lucide-react";
import RelatedProducts from "@/components/blog/related-products";

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    featuredImage: string;
    content: string;
    author: string;
    publish_date: string;
    excerpt: string;
    category_name?: string;
}

// The CMS currently stores a literal placeholder ("mrs. X" / "mr. X") as the
// author on most posts. Showing that verbatim reads as a fake credential, so
// fall back to an honest, generic byline until the CMS is given a real
// author/editorial-reviewer entity.
function displayAuthor(author: string): string {
    const normalized = author?.trim().toLowerCase();
    if (!normalized || normalized === 'mrs. x' || normalized === 'mr. x') {
        return 'Furnishings Editorial Team';
    }
    return author;
}

function formatDate(dateStr: string): string {
    try {
        return new Date(dateStr).toLocaleDateString('en-MY', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    } catch {
        return dateStr;
    }
}

export default function SingleBlogContent({ blog }: { blog: BlogPost }) {
    const processContent = (content: string): string => {
        const baseUrl = 'https://cms.furnishings.daikimedia.com';
        let html = content.replace(/src="\/storage\//g, `src="${baseUrl}/storage/`);

        // The CMS editor (Quill) saves section titles as bold paragraphs
        // (<p><strong>Title</strong></p>) instead of real headings, so they
        // render like plain text and carry no SEO weight. Promote short
        // bold-only paragraphs to headings: lead-ins ending with ":" become
        // h3, the rest h2. Long bold paragraphs are left untouched.
        html = html.replace(
            /<p[^>]*>\s*<strong[^>]*>([\s\S]*?)<\/strong>\s*<\/p>/g,
            (match, inner) => {
                const text = inner.replace(/<[^>]+>/g, '').trim();
                if (!text || text.length > 120) return match;
                return text.endsWith(':') ? `<h3>${inner}</h3>` : `<h2>${inner}</h2>`;
            }
        );

        // Quill inserts empty spacer paragraphs (<p><br></p>) between blocks;
        // drop them so the prose margins control spacing instead of giving the
        // page large uneven gaps.
        html = html.replace(/<p[^>]*>(\s|&nbsp;|<br\s*\/?>)*<\/p>/g, '');

        return html;
    };

    const imageUrl = blog.featuredImage
        ? `https://cms.furnishings.daikimedia.com/storage/${blog.featuredImage}`
        : null;

    // Strip HTML to estimate word count for structured data
    const plainText = blog.content?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() || '';
    const wordCount = plainText.split(/\s+/).filter(Boolean).length;

    const canonicalUrl = `https://www.furnishings.com.my/blog/${blog.slug}`;

    // Article structured data for SEO — BlogPosting
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${canonicalUrl}#article`,
        headline: blog.title,
        description: blog.excerpt || "",
        image: imageUrl || undefined,
        datePublished: blog.publish_date,
        dateModified: blog.publish_date,
        wordCount,
        inLanguage: "en-MY",
        author: {
            "@type": "Person",
            name: displayAuthor(blog.author),
        },
        publisher: {
            "@type": "Organization",
            name: "Furnishing Solutions",
            url: "https://www.furnishings.com.my",
            logo: {
                "@type": "ImageObject",
                url: "https://www.furnishings.com.my/logo.jpg",
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": canonicalUrl,
        },
    };

    // BreadcrumbList structured data
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.furnishings.com.my",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: "https://www.furnishings.com.my/blog",
            },
            {
                "@type": "ListItem",
                position: 3,
                name: blog.title,
                item: canonicalUrl,
            },
        ],
    };

    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* Hero — featured image with gradient overlay, like About Us hero */}
            <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-end overflow-hidden bg-charcoal">
                {imageUrl && (
                    <Image
                        src={imageUrl}
                        alt={blog.title}
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                    />
                )}
                {/* Gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/30" />

                <div className="relative z-10 container mx-auto px-6 pb-16 md:pb-20">
                    {/* Breadcrumb */}
                    <nav className="text-sm text-white/60 mb-5">
                        <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
                        <span className="mx-2">/</span>
                        <Link href="/blog" className="hover:text-orange-400 transition-colors">Blog</Link>
                        <span className="mx-2">/</span>
                        <span className="text-white/90 line-clamp-1">{blog.title}</span>
                    </nav>

                    {/* Category badge */}
                    {blog.category_name && (
                        <span className="inline-block bg-orange-600 text-white text-xs font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full mb-5">
                            {blog.category_name}
                        </span>
                    )}

                    {/* Title */}
                    <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-white leading-[1.1] tracking-tight max-w-4xl">
                        {blog.title}
                    </h1>

                    {/* Meta — date + author */}
                    <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-white/60">
                        <span className="inline-flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-orange-400" />
                            {formatDate(blog.publish_date)}
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <User className="w-4 h-4 text-orange-400" />
                            {displayAuthor(blog.author)}
                        </span>
                    </div>
                </div>
            </section>

            {/* Article content */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto">
                        <div
                            className="prose prose-lg max-w-none"
                            dangerouslySetInnerHTML={{
                                __html: processContent(blog.content)
                            }}
                        />

                        {/* Back to blog */}
                        <div className="mt-16 pt-10 border-t border-zinc-200">
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 text-charcoal font-semibold border-b-2 border-orange-500 pb-1 hover:gap-3 transition-all"
                            >
                                <ArrowLeft className="w-4 h-4 text-orange-600" />
                                Back to all articles
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <RelatedProducts />
        </main>
    );
}
