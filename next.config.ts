import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.furnishings.daikimedia.com",
        port: "",
        pathname: "/**",
      },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    // AVIF first: ~20-30% smaller than WebP on photographic images for
    // browsers that support it; Next negotiates via Accept header and falls
    // back to WebP automatically.
    formats: ["image/avif", "image/webp"],
  },

  async redirects() {
    return [
      // Old query-string pagination -> static path-based pagination
      {
        source: "/blog",
        has: [{ type: "query", key: "page", value: "(?<p>[2-9]|\\d{2,})" }],
        destination: "/blog/page/:p",
        permanent: true,
      },
      // Old route used a literal "&" in the path, which is fragile in URLs,
      // mismatched the sitemap (which already listed /terms-and-conditions),
      // and never actually redirected anywhere -> canonical clean path.
      {
        source: "/terms-&-conditions",
        destination: "/terms-and-conditions",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|gif|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/shop/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      }
    ];
  },
};

export default nextConfig;
