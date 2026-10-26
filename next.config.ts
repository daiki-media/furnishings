import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve images straight from their source instead of through Vercel's
    // image optimizer. The project ran out of its image optimization quota
    // (Oct 2026): every not-yet-cached size returned HTTP 402
    // OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED and showed as a broken image.
    // The CMS product JPGs are already small (~40-80 KB).
    unoptimized: true,
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
      // Product slugs cleaned up in the CMS (Oct 2026). Other legacy slug
      // forms are resolved in getProductBySlug; these get a real 301 because
      // they were live, linked URLs. The last one cannot be derived: the
      // product had been given another product's slug.
      ...[
        ["-eclipse-premium-eclipse-light-green-0975", "eclipse-premium-eclipse-light-green-0975"],
        ["-topaz-70-kiruma-cinders", "topaz-70-kiruma-cinders"],
        ["-topaz-70-kiruma-cinerous", "topaz-70-kiruma-cinerous"],
        ["-topaz-70-oro-ashes", "topaz-70-oro-ashes"],
        ["eclipse-premium---eclipse-medium-cool-grey-0967", "eclipse-premium-eclipse-medium-cool-grey-0967"],
        ["versafloor-oak-vinyl-sheet---cocoa-brown", "versafloor-oak-vinyl-sheet-cocoa-brown"],
        ["-tapiflex-essential-50-stamp-dark-blue", "tapiflex-tiles-50-stamp-dark-blue"],
        // Slug had been set to a pasted CMS admin URL (fixed 26 Oct 2026).
        ["httpscmsfurnishingsdaikimediacomadminproducts845preview", "tapiflex-excellence-19db-uni-deep-red"],
      ].map(([from, to]) => ({
        source: `/shop/:category/${from}`,
        destination: `/shop/:category/${to}`,
        permanent: true,
      })),
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
      // No custom Cache-Control for /shop: product pages use ISR
      // (revalidate = 300) and Next sets the CDN headers itself. The old
      // "s-maxage=3600, stale-while-revalidate=86400" header was also sent
      // on error / "Product Not Found" responses, so the CDN could keep
      // serving a broken product page for up to a day (W42-005).
    ];
  },
};

export default nextConfig;
