// AI-crawler discovery file (llms.txt draft convention). Complements
// robots.txt/sitemap.xml — it doesn't affect ranking, but gives LLM-based
// crawlers a fast, accurate summary instead of having to infer one.
export const revalidate = 86400;

export async function GET() {
  const body = `# Furnishings

> Furnishings (furnishings.com.my) sells vinyl, SPC and laminate flooring and carpet tiles in Malaysia, with installation services for homes and businesses.

## Shop
- [All products](https://www.furnishings.com.my/shop)
- [Categories](https://www.furnishings.com.my/category)

## Company
- [About us](https://www.furnishings.com.my/about-us)
- [Contact](https://www.furnishings.com.my/contact)
- [Terms and conditions](https://www.furnishings.com.my/terms-and-conditions)
- [Return and refunds policy](https://www.furnishings.com.my/return-and-refunds-policy)

## Content
- [Blog](https://www.furnishings.com.my/blog)

## Machine-readable references
- [Sitemap](https://www.furnishings.com.my/sitemap.xml)
- [Robots](https://www.furnishings.com.my/robots.txt)
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
