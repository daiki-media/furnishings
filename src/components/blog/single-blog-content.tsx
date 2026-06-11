// Server component: only renders blog content (no client-side state/effects),
// so it ships no client JS and the related products are fetched on the server.
import Image from "next/image";
import PageHeader from "@/components/common/header";
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

    return (
        <>
            <PageHeader title={blog.title} />
            <section className="py-12 px-6">
                <div className="container mx-auto max-w-4xl">
                    <p className="text-gray-500 mb-6">
                        By {blog.author} | {new Date(blog.publish_date).toDateString()}
                    </p>

                    <div className="relative h-96 w-full mb-8">
                        <Image
                            src={`https://cms.furnishings.daikimedia.com/storage/${blog.featuredImage}`}
                            alt={blog.title}
                            fill
                            className="object-cover rounded-lg"
                            priority
                        />
                    </div>

                    <p className="text-lg text-gray-700 mb-8">{blog.excerpt}</p>

                    <div
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ 
                            __html: processContent(blog.content) 
                        }}
                    />
                </div>
            </section>
            
            <RelatedProducts />
        </>
    );
}