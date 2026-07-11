// Server component: blogs are fetched on the cached server, so the browser no
// longer downloads the large /api/blogs payload. Pagination uses normal links
// (?page=N) which the statically-rendered route serves from cache.
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PaginationLink from '@/components/common/pagination-link';
import { getBlogs } from '@/lib/api';
import { Blog, getBlogImageUrl, getBlogPreviewText } from '@/lib/interfaces';

interface BlogListProps {
  limit?: number;
  showHeader?: boolean;
  showPagination?: boolean;
  itemsPerPage?: number;
  currentPage?: number;
}

function getVisiblePages(currentPage: number, totalPages: number): (number | '...')[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, '...', totalPages];
  }
  if (currentPage >= totalPages - 3) {
    return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }
  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
}

// Page 1 lives at /blog; pages 2+ live at /blog/page/N (static ISR routes).
const pageHref = (page: number) => (page === 1 ? '/blog' : `/blog/page/${page}`);

function PaginationControls({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <div className="flex justify-center items-center gap-2 mt-16">
      {currentPage === 1 ? (
        <span className="px-5 py-2.5 rounded-full text-sm font-semibold bg-cream text-zinc-400 cursor-not-allowed">
          Previous
        </span>
      ) : (
        <PaginationLink
          href={pageHref(currentPage - 1)}
          className="px-5 py-2.5 rounded-full text-sm font-semibold bg-charcoal text-white hover:bg-charcoal/80 transition-colors"
        >
          Previous
        </PaginationLink>
      )}

      <div className="flex gap-1.5">
        {visiblePages.map((page, index) =>
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="w-10 h-10 flex items-center justify-center text-zinc-400">
              …
            </span>
          ) : (
            <PaginationLink
              key={page}
              href={pageHref(page)}
              className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                currentPage === page
                  ? 'bg-orange-600 text-white'
                  : 'bg-cream text-charcoal hover:bg-orange-50 hover:text-orange-600'
              }`}
            >
              {page}
            </PaginationLink>
          )
        )}
      </div>

      {currentPage === totalPages ? (
        <span className="px-5 py-2.5 rounded-full text-sm font-semibold bg-cream text-zinc-400 cursor-not-allowed">
          Next
        </span>
      ) : (
        <PaginationLink
          href={pageHref(currentPage + 1)}
          className="px-5 py-2.5 rounded-full text-sm font-semibold bg-charcoal text-white hover:bg-charcoal/80 transition-colors"
        >
          Next
        </PaginationLink>
      )}
    </div>
  );
}

// Format a date string into a readable format
function formatDate(dateStr?: string): string {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('en-MY', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

export default async function BlogList({
  limit,
  showHeader = true,
  showPagination = false,
  itemsPerPage = 9,
  currentPage = 1,
}: BlogListProps) {
  const response = await getBlogs();
  const allBlogs: Blog[] = response.success && Array.isArray(response.data) ? response.data : [];

  const totalBlogs = allBlogs.length;
  const totalPages = Math.ceil(totalBlogs / itemsPerPage);

  let displayBlogs: Blog[];
  if (showPagination) {
    const safePage = Math.min(Math.max(currentPage, 1), Math.max(totalPages, 1));
    const startIndex = (safePage - 1) * itemsPerPage;
    displayBlogs = allBlogs.slice(startIndex, startIndex + itemsPerPage);
  } else {
    displayBlogs = limit ? allBlogs.slice(0, limit) : allBlogs;
  }

  if (displayBlogs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-600 text-lg">No blogs found</p>
      </div>
    );
  }

  // On page 1 (or non-paginated), show the first blog as a featured hero card
  const isFirstPage = currentPage === 1;
  const featuredBlog = isFirstPage ? displayBlogs[0] : null;
  const remainingBlogs = isFirstPage ? displayBlogs.slice(1) : displayBlogs;

  return (
    <section className="py-24 md:py-32 bg-cream">
      <div className="container mx-auto px-6">
        {showHeader && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-orange-600 mb-5">
              <span className="h-px w-6 bg-orange-500/60" />
              From Our Journal
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight text-charcoal mb-5 leading-[1.1]">Our blogs</h2>
            <p className="text-zinc-500 text-lg leading-relaxed">
              Stay updated with the latest ideas, inspiration, and innovations from the furnishing world.
            </p>
          </div>
        )}

        {showPagination && (
          <div className="mb-8 text-sm text-zinc-500">
            Showing {displayBlogs.length} of {totalBlogs} posts · Page {currentPage} of {totalPages}
          </div>
        )}

        {/* Featured post — hero-sized card on page 1 */}
        {featuredBlog && (
          <Link
            href={`/blog/${featuredBlog.slug}`}
            className="group block mb-10 bg-white rounded-3xl border border-zinc-100 overflow-hidden hover:border-orange-200 hover:shadow-xl transition-all duration-300"
          >
            <div className="grid md:grid-cols-2">
              <div className="relative h-64 md:h-auto md:min-h-[360px] overflow-hidden bg-cream">
                <Image
                  src={getBlogImageUrl(featuredBlog.featuredImage) || '/placeholder-blog.jpg'}
                  alt={featuredBlog.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                {formatDate(featuredBlog.publish_date || featuredBlog.created_at) && (
                  <p className="text-sm text-zinc-400 mb-3">
                    {formatDate(featuredBlog.publish_date || featuredBlog.created_at)}
                  </p>
                )}
                <h3 className="font-display text-2xl md:text-3xl font-medium text-charcoal group-hover:text-orange-600 transition-colors leading-tight mb-4 line-clamp-3">
                  {featuredBlog.title}
                </h3>
                <p className="text-zinc-600 leading-relaxed mb-6 line-clamp-3 text-lg">
                  {getBlogPreviewText(featuredBlog.excerpt, 200) || getBlogPreviewText(featuredBlog.content, 200)}
                </p>
                <span className="inline-flex items-center gap-2 text-orange-600 font-semibold text-sm group-hover:gap-3 transition-all">
                  Read article
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Blog grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {remainingBlogs.map((blog) => {
            const imageUrl = getBlogImageUrl(blog.featuredImage);

            return (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="group bg-white rounded-2xl border border-zinc-100 overflow-hidden h-full flex flex-col hover:border-orange-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-52 w-full overflow-hidden bg-cream">
                  <Image
                    src={imageUrl || '/placeholder-blog.jpg'}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  {formatDate(blog.publish_date || blog.created_at) && (
                    <p className="text-xs text-zinc-400 mb-2">
                      {formatDate(blog.publish_date || blog.created_at)}
                    </p>
                  )}

                  <h3 className="font-display text-xl font-medium mb-3 text-charcoal group-hover:text-orange-600 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-zinc-600 mb-4 leading-relaxed line-clamp-3">
                    {getBlogPreviewText(blog.excerpt) || getBlogPreviewText(blog.content)}
                  </p>

                  <div className="mt-auto">
                    <span className="inline-flex items-center gap-1.5 text-orange-600 font-semibold text-sm group-hover:gap-2.5 transition-all">
                      Read more
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {showPagination && <PaginationControls currentPage={currentPage} totalPages={totalPages} />}
      </div>
    </section>
  );
}
