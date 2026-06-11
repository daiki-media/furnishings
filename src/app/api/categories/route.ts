import { getCategories } from "@/lib/api";

// Same-origin proxy for the CMS categories endpoint (see api/products/route.ts).
export const revalidate = 3600;

export async function GET() {
  const categories = await getCategories();
  return Response.json({ success: true, data: categories });
}
