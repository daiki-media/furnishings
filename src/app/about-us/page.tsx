import AboutUs from "@/components/aboutus/about-us";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | Furnishing Solutions — Flooring Malaysia",
    description: "Learn about Furnishing Solutions, a specialist in vinyl, SPC, laminate flooring, carpet tiles and artificial grass in Malaysia — trusted by homes and businesses nationwide.",
    alternates: {
        canonical: "https://www.furnishings.com.my/about-us",
    },
    openGraph: {
        title: "About Us | Furnishing Solutions Malaysia",
        description: "Malaysia's trusted flooring specialist — vinyl, SPC, laminate, carpet tiles. Professional supply and installation nationwide.",
        url: "https://www.furnishings.com.my/about-us",
        siteName: "Furnishing Solutions",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "About Us | Furnishing Solutions Malaysia",
        description: "Malaysia's trusted flooring specialist — vinyl, SPC, laminate, carpet tiles.",
    },
};

export default function About() {
    return <AboutUs />;
}
