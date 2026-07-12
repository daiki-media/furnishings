import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SingleBlogContent from "@/components/blog/single-blog-content";
import { getBlogBySlug, getBlogs } from "@/lib/api";
import { getBlogPreviewText } from "@/lib/interfaces";

type Props = {
  params: Promise<{ slug: string }>;
};

// Prerender every blog post (SSG + ISR): posts are served from the static
// cache instead of rendering on demand, so they stay fast and available even
// when the CMS is slow or down. New posts not in the build are rendered on
// first request (dynamicParams default) and cached from then on.
export async function generateStaticParams() {
  const response = await getBlogs();
  const blogs = response.success && Array.isArray(response.data) ? response.data : [];
  return blogs
    .filter((blog: { slug?: string }) => typeof blog.slug === "string" && blog.slug.length > 0)
    .map((blog: { slug: string }) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  const baseUrl = "https://www.furnishings.com.my";

  if (!blog) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const title = blog.meta_title || blog.title;
  const description = blog.meta_description || getBlogPreviewText(blog.excerpt, 160) || getBlogPreviewText(blog.content, 160) || "";
  const imageUrl = blog.featuredImage ? `${baseUrl}/storage/${blog.featuredImage}` : undefined;
  const canonicalUrl = `${baseUrl}/blog/${blog.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Furnishing Solutions",
      type: "article",
      publishedTime: blog.publish_date || undefined,
      authors: blog.author ? [blog.author] : undefined,
      ...(imageUrl ? {
        images: [{
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        }],
      } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  
  if (!blog) {
    notFound();
  }
  return <SingleBlogContent blog={blog} />;
}

export const revalidate = 1800;
