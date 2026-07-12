import dynamic from "next/dynamic";
import type { Metadata } from "next";
import HeroBanner from "@/components/home/hero-section";
import { TrustIntro, FlooringGuide, WhyChooseUs } from "@/components/home/main-content-section";

// Above-the-fold sections load eagerly; everything below is code-split with
// next/dynamic so its client JS isn't parsed/executed on first paint (lowers TBT).
// ssr stays enabled (default) so the HTML/SEO content is unchanged.
const FloorCategories = dynamic(() => import("@/components/home/collection"));
const GalleryProjects = dynamic(() => import("@/components/home/gallery-section"));
const CertificateMarquee = dynamic(() => import("@/components/home/Certificate-section"));
const MeasurementCta = dynamic(() => import("@/components/home/sales-card"));
const ProcessSection = dynamic(() => import("@/components/home/process-section"));
const VinylBenefitsSection = dynamic(() => import("@/components/home/benefits-section"));
const PricingSection = dynamic(() => import("@/components/home/pricing-section"));
const FlooringSection = dynamic(() => import("@/components/home/flooring-section"));
const ShowroomSection = dynamic(() => import("@/components/home/showroom-section"));
const FaqSection = dynamic(() => import("@/components/home/faq-section"));
const TestimonialsSection = dynamic(() => import("@/components/home/testinomial-section"));
const CTASection2 = dynamic(() => import("@/components/home/CTA-section2"));
// BlogList is a server component (fetches on the server) so it ships no client JS.
import BlogList from "@/components/blogs/blog-section";

export const metadata: Metadata = {
  title: "Vinyl & SPC Flooring Malaysia | Furnishing Solutions",
  description: "Shop waterproof vinyl, SPC, laminate & carpet tile flooring in Malaysia. Free on-site measurement & quotation for homes, offices & businesses nationwide.",
  alternates: {
    canonical: "https://www.furnishings.com.my",
  },
  openGraph: {
    title: "Vinyl & SPC Flooring Malaysia | Furnishing Solutions",
    description: "Shop waterproof vinyl, SPC, laminate & carpet tile flooring in Malaysia. Free on-site measurement & quotation nationwide.",
    url: "https://www.furnishings.com.my",
    siteName: "Furnishing Solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vinyl & SPC Flooring Malaysia | Furnishing Solutions",
    description: "Shop waterproof vinyl, SPC, laminate & carpet tile flooring in Malaysia.",
  },
};

export default function Home() {
  return (
    <main>
      {/* Act 1 — Hook & trust */}
      <HeroBanner />
      <TrustIntro />

      {/* Act 2 — Understand, then shop */}
      <FlooringGuide />
      <FloorCategories />

      {/* Act 3 — Why choose us */}
      <WhyChooseUs />
      <VinylBenefitsSection />

      {/* Act 4 — Proof */}
      <GalleryProjects />
      <CertificateMarquee />
      <TestimonialsSection />

      {/* Act 5 — How & how much */}
      <ProcessSection />
      <PricingSection />

      {/* Act 6 — Convert & learn more */}
      <MeasurementCta />
      <FlooringSection />
      <ShowroomSection />
      <FaqSection />
      <CTASection2 />
      <BlogList limit={6} />
    </main>
  );
}
export const revalidate = 1800;
