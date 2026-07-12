import ContactUsPage from "@/components/contact-page/contact-page"
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | Furnishing Solutions — Flooring Malaysia",
    description: "Get in touch with Furnishing Solutions for vinyl, SPC, laminate flooring and carpet tiles in Malaysia. Request a free quote, site visit or product advice — via WhatsApp, email or our Selangor showroom.",
    alternates: {
        canonical: "https://www.furnishings.com.my/contact",
    },
};

export default function ContactUs() {
    return <ContactUsPage />;
}
