import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SingleBlogContent from "@/components/blog/single-blog-content";
import { getBlogBySlug, getBlogs } from "@/lib/api";

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


  return {
    title: blog.meta_title || blog.title,
    description: blog.meta_description || blog.excerpt || "",
    alternates: {
        canonical: `https://www.furnishings.com.my/blog/${blog.slug}`,
    },
    openGraph: {
      title: blog.meta_title || blog.title,
      description: blog.meta_description || blog.excerpt || "",
      images: blog.featuredImage ? [`${baseUrl}/storage/${blog.featuredImage}`] : [],
      type: 'article',
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