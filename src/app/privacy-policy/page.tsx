import type { Metadata } from "next";
import PageHeader from "@/components/common/header";

export const metadata: Metadata = {
    title: "Privacy Policy | Furnishing Online Flooring Store Malaysia",
    description: "Read how Furnishing collects, uses and protects your personal data when you use furnishings.com.my, in line with Malaysia's Personal Data Protection Act 2010.",
    alternates: {
        canonical: "https://www.furnishings.com.my/privacy-policy",
    },
};

export default function PrivacyPolicy() {
    return (
        <>
            <PageHeader />
            <main className="container mx-auto px-4 py-10 max-w-4xl">
                <h2 className="text-3xl font-bold text-black item-center text-center mb-12">Privacy Policy</h2>

                <section className="space-y-4 text-gray-800 text-base leading-relaxed">
                    <p>
                        This Privacy Policy explains how Furnishing (&quot;we&quot;, &quot;us&quot;) collects, uses and
                        protects information when you visit furnishings.com.my, in line with Malaysia&apos;s Personal
                        Data Protection Act 2010 (PDPA).
                    </p>

                    <h2 className="text-2xl font-semibold text-orange-600 pt-4">Information We Collect</h2>
                    <p>
                        When you submit an enquiry through our contact form, or reach us via phone or WhatsApp, we
                        collect the information you choose to provide, such as your name and the details of your
                        message or enquiry, so that we can respond to you.
                    </p>

                    <h2 className="text-2xl font-semibold text-orange-600 pt-4">Cookies and Analytics</h2>
                    <p>
                        Our website uses Google Tag Manager and Ahrefs Analytics to understand how visitors use the
                        site and to improve our content and services. These tools may set cookies or use similar
                        technologies to collect non-identifying information such as pages visited, device type, and
                        general location. See our{" "}
                        <a href="/cookie-policy" className="text-orange-600 hover:underline">Cookie Policy</a>{" "}
                        for details on the specific cookies used and how to manage them.
                    </p>

                    <h2 className="text-2xl font-semibold text-orange-600 pt-4">How We Use Your Information</h2>
                    <p>
                        We use the information you provide only to respond to your enquiry, provide quotations, and
                        assist with your order or service request. We do not sell your personal data to third
                        parties.
                    </p>

                    <h2 className="text-2xl font-semibold text-orange-600 pt-4">Data Sharing</h2>
                    <p>
                        We may share information with service providers who help us operate our business, such as
                        our website hosting and content management provider, delivery and installation partners, and
                        analytics providers, solely for the purposes described in this policy.
                    </p>

                    <h2 className="text-2xl font-semibold text-orange-600 pt-4">Your Rights</h2>
                    <p>
                        Under the PDPA, you may request access to, correction of, or removal of your personal data
                        held by us. To make a request, contact us using the details on our{" "}
                        <a href="/contact" className="text-orange-600 hover:underline">Contact page</a>.
                    </p>

                    <h2 className="text-2xl font-semibold text-orange-600 pt-4">Changes to This Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. Changes will be posted on this page.
                    </p>
                </section>
            </main>
        </>
    );
}
