import { Product } from "@/lib/interfaces";

const SITE_URL = "https://www.furnishings.com.my";

// Server-rendered Product JSON-LD, built only from catalogue data (W42-019).
//
// Offer / price / availability are deliberately left out:
// - product pages show no price (enquiry / quotation flow), and Google
//   requires schema prices to match a price visible on the page;
// - retail_price exists for only ~202 of 810 products and its unit
//   (per m², per box, per roll) is not in the data;
// - quantity is 0 for every product, so stock is not tracked and must not
//   be reported as OutOfStock.
// No ratings or reviews are added either. Add an Offer here only after the
// catalogue owner confirms prices and units and the page displays them.
export default function ProductSchema({ product }: { product: Product }) {
  const categorySlug = product.category?.slug || "uncategorized";
  const url = `${SITE_URL}/shop/${categorySlug}/${product.slug}`;

  const images = [product.images?.main_image, ...(product.images?.gallery || [])].filter(
    (src): src is string => typeof src === "string" && src.startsWith("http")
  );

  const description =
    product.seo?.meta_description?.trim() ||
    product.description?.short?.trim() ||
    undefined;

  // The CMS sends specifications as an array of {key, value} for most
  // products, but as an object of empty {key, value} slots for ~116.
  const rawSpecs: unknown = product.specifications;
  const specList: unknown[] = Array.isArray(rawSpecs)
    ? rawSpecs
    : rawSpecs && typeof rawSpecs === "object"
      ? Object.values(rawSpecs)
      : [];
  const additionalProperty = specList
    .map((s) => s as { key?: unknown; value?: unknown } | null)
    .filter(
      (s): s is { key: string; value: string } =>
        typeof s?.key === "string" && s.key.trim() !== "" &&
        typeof s?.value === "string" && s.value.trim() !== ""
    )
    .map((s) => ({
      "@type": "PropertyValue",
      name: s.key.trim(),
      value: s.value.trim(),
    }));

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.name,
    url,
    ...(images.length > 0 && { image: images }),
    ...(description && { description }),
    ...(product.sku && { sku: product.sku }),
    ...(product.brand && { brand: { "@type": "Brand", name: product.brand } }),
    ...(product.category?.name && { category: product.category.name }),
    ...(additionalProperty.length > 0 && { additionalProperty }),
  };

  return (
    <script
      type="application/ld+json"
      // Escape "<" so catalogue text can never close the script tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
