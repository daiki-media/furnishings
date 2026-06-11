// Server component: blogs are fetched on the cached server, so the browser no
// longer downloads the large /api/blogs payload. Pagination uses normal links
// (?page=N) which the statically-rendered route serves from cache.
import Image from 'next/image';
import Link from 'next/link';
import PaginationLink from '@/components/common/pagination-link';
import { getBlogs } from '@/lib/api';
import { Blog, getBlogImageUrl } from '@/lib/interfaces';

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
  const baseBtn = 'px-4 py-2 rounded-md transition-colors';

  return (
    <div className="flex justify-center items-center space-x-2 mt-12">
      {currentPage === 1 ? (
        <span className={`${baseBtn} bg-gray-100 text-gray-400 cursor-not-allowed`}>Previous</span>
      ) : (
        <PaginationLink href={pageHref(currentPage - 1)} className={`${baseBtn} bg-orange-600 text-white hover:bg-orange-700`}>
          Previous
        </PaginationLink>
      )}

      <div className="flex space-x-2">
        {visiblePages.map((page, index) =>
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="w-10 h-10 flex items-center justify-center">
              ...
            </span>
          ) : (
            <PaginationLink
              key={page}
              href={pageHref(page)}
              className={`w-10 h-10 flex items-center justify-center rounded-md transition-colors ${
                currentPage === page
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {page}
            </PaginationLink>
          )
        )}
      </div>

      {currentPage === totalPages ? (
        <span className={`${baseBtn} bg-gray-100 text-gray-400 cursor-not-allowed`}>Next</span>
      ) : (
        <PaginationLink href={pageHref(currentPage + 1)} className={`${baseBtn} bg-orange-600 text-white hover:bg-orange-700`}>
          Next
        </PaginationLink>
      )}
    </div>
  );
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
        <p className="text-gray-600 text-lg">No blogs found</p>
      </div>
    );
  }

  return (
    <section className="py-12 px-6">
      <div className="container mx-auto">
        {showHeader && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Blogs</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Stay updated with the latest ideas, inspiration, and innovations from the furnishing world
            </p>
          </div>
        )}

        {showPagination && (
          <div className="mb-6 text-sm text-gray-600">
            Showing {displayBlogs.length} of {totalBlogs} blog posts • Page {currentPage} of {totalPages}
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayBlogs.map((blog) => {
            const imageUrl = getBlogImageUrl(blog.featuredImage);

            return (
              <div
                key={blog.id}
                className="border rounded-lg overflow-hidden shadow-md border-orange-100 h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <Link href={`/blog/${blog.slug}`} className="block h-full">
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                    <Image
                      src={imageUrl || '/placeholder-blog.jpg'}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-semibold text-lg mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-base text-gray-600 mb-4 leading-relaxed line-clamp-3">
                      {blog.excerpt || blog.content?.substring(0, 150) || ''}
                    </p>

                    <div className="mt-auto">
                      <span className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                        Read More
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {showPagination && <PaginationControls currentPage={currentPage} totalPages={totalPages} />}
      </div>
    </section>
  );
}
