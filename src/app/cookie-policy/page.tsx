import type { Metadata } from "next";
import PageHeader from "@/components/common/header";

export const metadata: Metadata = {
    title: "Cookie Policy | Furnishing Online Flooring Store Malaysia",
    description: "Learn what cookies furnishings.com.my uses, why we use them, and how you can manage or disable them in your browser.",
    alternates: {
        canonical: "https://www.furnishings.com.my/cookie-policy",
    },
};

export default function CookiePolicy() {
    return (
        <>
            <PageHeader />
            <main className="container mx-auto px-4 py-10 max-w-4xl">
                <h2 className="text-3xl font-bold text-black item-center text-center mb-12">Cookie Policy</h2>

                <section className="space-y-4 text-gray-800 text-base leading-relaxed">
                    <p>
                        This Cookie Policy explains how furnishings.com.my uses cookies and similar technologies,
                        and how you can control them.
                    </p>

                    <h2 className="text-2xl font-semibold text-orange-600 pt-4">What Are Cookies</h2>
                    <p>
                        Cookies are small text files stored on your device when you visit a website. They help
                        websites function properly and let us understand how visitors use our site.
                    </p>

                    <h2 className="text-2xl font-semibold text-orange-600 pt-4">Cookies We Use</h2>
                    <p>
                        <strong className="text-orange-600">Google Tag Manager:</strong> Used to manage analytics
                        and marketing tags on our site.
                    </p>
                    <p>
                        <strong className="text-orange-600">Ahrefs Analytics:</strong> Used to measure site traffic
                        and understand how visitors find and use our content.
                    </p>
                    <p>
                        These tools may collect non-identifying information such as pages viewed, time spent on the
                        site, device and browser type, and referring website.
                    </p>

                    <h2 className="text-2xl font-semibold text-orange-600 pt-4">Managing Cookies</h2>
                    <p>
                        Most web browsers let you control cookies through their settings, including blocking or
                        deleting them. Disabling cookies may affect how some parts of this website function.
                    </p>

                    <h2 className="text-2xl font-semibold text-orange-600 pt-4">More Information</h2>
                    <p>
                        For details on how we handle personal data more generally, see our{" "}
                        <a href="/privacy-policy" className="text-orange-600 hover:underline">Privacy Policy</a>.
                    </p>
                </section>
            </main>
        </>
    );
}
