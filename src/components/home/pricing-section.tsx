"use client";

const pricingData = [
    {
        product: "PVC Sheet Flooring",
        standard: "RM 4 – RM 10",
        premium: "RM 11 – RM 15",
    },
    {
        product: "Luxury Vinyl Plank",
        standard: "RM 7 – RM 18",
        premium: "RM 19 – RM 35",
    },
    {
        product: "Luxury Vinyl Tile",
        standard: "RM 7 – RM 18",
        premium: "RM 19 – RM 40",
    },
    {
        product: "Click-Lock Vinyl",
        standard: "RM 10 – RM 25",
        premium: "RM 26 – RM 40",
    },
];

export default function PricingSection() {
    return (
        <section className=" py-12 px-6">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-black">Pricing Guide</h2>
                    <h2 className="text-gray-500 mt-2 text-sm">(Vinyl &amp; flooring price per sq ft in Malaysia)</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {pricingData.map((item, index) => (
                        <div
                            key={index}
                            className="group bg-white border border-orange-200 rounded-2xl shadow-md  p-8 relative overflow-hidden"
                        >
                            {/* Background Gradient */}


                            {/* Content */}
                            <div className="relative z-10">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-bold text-black ">
                                        {item.product}
                                    </h3>

                                </div>

                                {/* Pricing Cards */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Standard Range */}
                                    <div className="bg-gray-100 p-6 rounded-xl border border-gray-300 ">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center">

                                                <p className="text-sm font-medium text-gray-700">Standard Range</p>
                                            </div>
                                            <span className="text-xs bg-gray-600 text-white px-2 py-1 rounded-full font-medium">
                                                Basic
                                            </span>
                                        </div>
                                        <p className="text-2xl font-bold text-gray-800 mb-1">{item.standard}</p>
                                        <p className="text-xs text-gray-600">per sq ft</p>
                                    </div>

                                    {/* Premium Range */}
                                    <div className="bg-orange-100 p-6 rounded-xl border border-orange-200 relative">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center">
                                                <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                                                <p className="text-sm font-medium text-amber-700">Premium Range</p>
                                            </div>
                                            <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded-full font-medium">
                                                Premium
                                            </span>
                                        </div>
                                        <p className="text-2xl font-bold text-gray-800 mb-1">{item.premium}</p>
                                        <p className="text-xs text-gray-600">per sq ft</p>

                                        {/* Premium Badge */}
                                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Info */}
                                <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <svg className="w-6 h-6 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Free consultation & measurement included</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="mt-12 text-center text-gray-600 text-base  ">
                    Actual prices vary based on wear-layer thickness, design complexity, and project scale. Volume and project-based discounts are available for contractors, developers, and bulk installations.

                </p>
            </div>
        </section>
    );
}
