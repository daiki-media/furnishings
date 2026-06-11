import { getProducts } from "@/lib/api";

// Same-origin proxy for the CMS products endpoint. Client components fetch
// this instead of the CMS directly so responses are served with the
// Cache-Control headers from next.config.ts (browser + CDN cacheable) and the
// CMS is only hit from the shared server data cache.
export const revalidate = 1800;

export async function GET() {
  const products = await getProducts();
  return Response.json({ success: true, data: products });
}
