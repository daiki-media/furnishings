import type { Metadata } from "next";
import PageHeader from "@/components/common/header";

export const metadata: Metadata = {
    title: "Terms & Conditions | Furnishing Online Flooring Store Malaysia",
    description: "Review the terms and conditions for shopping with Furnishing in Malaysia. Learn about orders, payments, warranties and website usage for our flooring products and services.",
    alternates: {
        canonical: "https://www.furnishings.com.my/terms-and-conditions",
    },
};

export default function Terms() {

    return (
        <>
            <PageHeader />
            <main className="container mx-auto px-4 py-10">
                <h2 className="text-3xl font-bold text-black item-center text-center mb-12">Terms & Conditions</h2>

                <section className="space-y-4 text-gray-800 text-base leading-relaxed">
                    <p>
                        All returns are to be returned to WCD HQ not later than <strong className="text-orange-600">21 days</strong> from the date of invoice at your own cost and are subject to a <strong className="text-orange-600">10% handling fee</strong>.
                    </p>
                    <p>
                        All WCD employees are <strong className="text-orange-600">not authorized</strong> to collect the returns.
                    </p>
                    <p>
                        Delivery within Klang Valley will be charged <strong className="text-orange-600">RM10.00</strong> per order.
                    </p>
                    <p>
                        The following items are strictly <strong className="text-orange-600">non-returnable</strong>: All cut/indent items, sample books, murals, and fabric books.
                    </p>
                    <p>
                        Colour variation from the sample book and roll are within acceptable tolerance.
                    </p>
                    <p>
                        WCD reserves the right to change prices as and when it deems necessary. Please check the price at the time of ordering.
                    </p>
                    <p>
                        Prices are subject to change without notice.
                    </p>
                    <p>
                        Same day delivery is available for orders received <strong className="text-orange-600">before 9 AM</strong>.
                    </p>
                    <p>
                        Outstation orders will be delivered through the specified transport or freight company.
                    </p>

                    <hr className="border-t border-orange-600 my-6" />

                    <h2 className="text-2xl font-semibold text-orange-600">Indent Charges by Air</h2>

                    <p>
                        Indent prices are revised regularly as freight costs fluctuate. WCD does not intend to profit from these charges.
                    </p>
                    <p>
                        The <strong className="text-orange-600">cut-off day</strong> for indent orders is every <strong className="text-orange-600">Wednesday</strong>. Shipping is estimated to take <strong className="text-orange-600">10–14 working days</strong>.
                    </p>
                    <p>
                        Indent items are strictly <strong className="text-orange-600">non-returnable</strong> and <strong className="text-orange-600">non-exchangeable</strong>.
                    </p>
                    <p>
                        A <strong className="text-orange-600">50% down payment</strong> is required upon confirmation of order. The balance must be paid before delivery.
                    </p>
                </section>
            </main>
        </>
    )
}
