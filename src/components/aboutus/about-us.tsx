import React from 'react';
import { Heart, Star, Users, Award, Home, Building, Leaf, Shield, Binoculars } from 'lucide-react';
import Image from 'next/image';
const AboutUs = () => {
    return (
        <div className="bg-white ">
            <div className='container mx-auto px-6 '>
                <section className="py-12">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl  font-bold text-black mb-4">Our Story</h2>
                    </div>
                    <div className="text-center mx-auto">
                        <div className="">
                            <p className="text-gray-700 text-lg  mb-6">
                                Established with a mission to transform spaces with practical yet beautiful materials, Furnishing has grown into a go-to brand for top-quality vinyl flooring, PVC tiles, SPC panels, and interior wall solutions.
                            </p>
                            <p className="text-gray-700 text-lg">
                                Our success is rooted in in-depth industry knowledge, consistent product quality, and a steadfast commitment to customer satisfaction. From initial consultation to final installation, Furnishing handles every step with care, offering solutions trusted by homeowners, designers, and contractors throughout Kuala Lumpur, Johor, Penang, Selangor, and East Malaysia.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="container mx-auto  py-12">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl  font-bold text-black mb-6">
                                Malaysia’s Trusted Interior & Flooring Partner
                            </h2>
                            <p className="text-gray-700 text-lg leading-relaxed mb-4 text-justify">
                                Furnishing is Malaysia’s trusted name for delivering premium vinyl and SPC flooring,
                                stylish interior solutions, and modern furnishing materials tailored to local tastes.
                                We pride ourselves on offering durable, elegant, and affordable flooring and wall
                                furnishing options that enhance the look and function of homes, offices, and commercial
                                spaces nationwide.
                            </p>
                            <p className="text-gray-700 text-lg leading-relaxed text-justify">
                                From supply to professional installation, Furnishing is your one-stop destination for
                                innovative, lasting, and visually striking interior solutions.
                            </p>
                        </div>
                        <div className="w-full h-[400px] relative rounded-2xl overflow-hidden shadow-md">
                            <Image
                                src="/about3.jpg"
                                alt="Furnishing Malaysia"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </section>

                <div className="grid lg:grid-cols-2 gap-8  py-12">
                    {[
                        {
                            title: "Our Mission",
                            content:
                                "To supply modern, stylish, and resilient interior furnishing solutions that are optimized for Malaysia's climate and lifestyle needs, while offering clients high value and professional service.",
                            image: "/about1.jpg",
                        },
                        {
                            title: "Our Vision",
                            content:
                                "To be Malaysia's most reliable furnishing partner by delivering durable flooring, contemporary wall designs, and seamless project execution with a client-first mindset.",
                            image: "/about2.jpg",
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="bg-white border border-orange-100 rounded-3xl shadow-md overflow-hidden transition-all duration-500"
                        >
                            <div className="w-full h-56 bg-orange-100 flex items-center justify-center p-6">
                                <div className="relative w-full h-full">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover h-full w-full rounded-lg"
                                    />
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-black mb-4">{item.title}</h3>
                                <p className="text-gray-700 text-base leading-relaxed text-justify">{item.content}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <section className=" py-12 ">
                    <div className="text-center mb-12 ">
                        <h2 className="text-3xl  font-bold text-gray-900 mb-4">What We Offer</h2>

                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white rounded-xl shadow-md p-6 border border-orange-100 ">
                            <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                                <Home className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Vinyl Flooring Solutions</h3>
                            <p className="text-gray-600 text-base text-justify mb-4">
                                Broad range of vinyl flooring options—planks, tiles, and sheets—with realistic wood, stone, and marble finishes.
                            </p>
                            <div className="space-y-2">
                                <div className="flex items-center text-base text-orange-600">
                                    <Shield className="w-4 h-4 mr-2" />
                                    100% waterproof
                                </div>
                                <div className="flex items-center text-base text-orange-600">
                                    <Shield className="w-4 h-4 mr-2" />
                                    Anti-slip & scratch-resistant
                                </div>
                                <div className="flex items-center text-base text-orange-600">
                                    <Shield className="w-4 h-4 mr-2" />
                                    Hygienic and low-maintenance
                                </div>
                                <div className="flex items-center text-base text-orange-600">
                                    <Shield className="w-4 h-4 mr-2" />
                                    Easy installation
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 border border-orange-100  transition-shadow">
                            <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                                <Building className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">SPC Flooring</h3>
                            <p className="text-gray-600 text-base text-justify">
                                Highly durable SPC click-lock flooring designed for long-term performance in high-traffic areas. Resistant to wear, humidity, and impact.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 border border-orange-100 ">
                            <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                                <Star className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Wall Panels & Decorative Surfaces</h3>
                            <p className="text-gray-600 text-base text-justify">
                                From PVC wall cladding to custom decorative panels, offering thermal insulation, sound dampening, and premium aesthetic finishes.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 border border-orange-100 ">
                            <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Consultation & Installation</h3>
                            <p className="text-gray-600 text-base text-justify">
                                Free consultation, on-site measurement, and professional installation services following high-quality standards.
                            </p>
                        </div>
                    </div>
                </section>

                <div className="py-12">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl  font-bold text-gray-900 mb-4">Why Choose Furnishing?</h2>

                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white rounded-xl shadow-md p-6 border border-orange-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Designed for Malaysia&apos;s Climate</h3>
                            <p className="text-gray-600 text-base text-justify">All products are selected for their resistance to moisture, heat, and tropical weather conditions—perfect for Malaysia&apos;s environment.</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 border border-orange-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Quality Materials</h3>
                            <p className="text-gray-600 text-base text-justify">Our flooring and wall panels meet international quality standards and are backed by manufacturer warranties.</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 border border-orange-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Wide Range of Designs</h3>
                            <p className="text-gray-600 text-base text-justify">Choose from hundreds of colors, grains, and patterns that suit minimalist, modern, industrial, and luxury interiors.</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 border border-orange-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Start-to-Finish Service</h3>
                            <p className="text-gray-600 text-base text-justify">From consultation and delivery to skilled installation and after-sales support, we offer end-to-end convenience.</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 border border-orange-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Competitive Prices</h3>
                            <p className="text-gray-600 text-base text-justify">We make professional-grade flooring and wall finishes affordable—ideal for homeowners, contractors, and designers alike.</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 border border-orange-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Proven Track Record</h3>
                            <p className="text-gray-600 text-base text-justify">With projects completed across residential and commercial sites, our products and services are trusted by clients nationwide.</p>
                        </div>
                    </div>
                </div>

                <section className="py-12">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Who We Serve</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="border border-orange-100 shadow-md rounded-xl bg-white p-6 text-center">
                            <div className="flex items-center justify-center w-12 h-12 bg-orange-600 rounded-lg mb-4 mx-auto">
                                <Home className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-bold text-black text-xl mb-2">Homeowners</h3>
                            <p className="text-base text-gray-600 text-justify">Updating floors with water-resistant, stylish options.</p>
                        </div>

                        <div className="border border-orange-100 shadow-md rounded-xl bg-white p-6 text-center">
                            <div className="flex items-center justify-center w-12 h-12 bg-orange-600 rounded-lg mb-4 mx-auto">
                                <Star className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-bold text-gray-900 text-xl mb-2">Interior Designers</h3>
                            <p className="text-base text-gray-600 text-justify">Seeking creative, reliable furnishing materials.</p>
                        </div>

                        <div className="border border-orange-100 shadow-md rounded-xl bg-white p-6 text-center">
                            <div className="flex items-center justify-center w-12 h-12 bg-orange-600 rounded-lg mb-4 mx-auto">
                                <Building className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-bold text-gray-900 text-xl mb-2">Commercial Businesses</h3>
                            <p className="text-base text-gray-600 text-justify">Requiring flooring with durability and design appeal.</p>
                        </div>

                        <div className="md:col-span-3 flex flex-col md:flex-row justify-center gap-6">
                            <div className="border border-orange-100 shadow-md rounded-xl bg-white p-6 text-center w-full md:w-1/3">
                                <div className="flex items-center justify-center w-12 h-12 bg-orange-600 rounded-lg mb-4 mx-auto">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="font-bold text-gray-900 text-xl mb-2">Developers</h3>
                                <p className="text-base text-gray-600 text-justify">
                                    Looking for bulk supply and expert installation.
                                </p>
                            </div>

                            <div className="border border-orange-100 shadow-md rounded-xl bg-white p-6 text-center w-full md:w-1/3">
                                <div className="flex items-center justify-center w-12 h-12 bg-orange-600 rounded-lg mb-4 mx-auto">
                                    <Award className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="font-bold text-gray-900 text-xl mb-2">Hospitality & Retail</h3>
                                <p className="text-base text-gray-600 text-justify">
                                    Needing quick turnarounds and professional finishing.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-12">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Core Values</h2>

                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white rounded-xl shadow-md p-6 border border-orange-100 text-center">
                            <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <Binoculars className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
                            <p className="text-gray-600 text-base text-justify">Adopting new trends and sustainable materials</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 border border-orange-100 text-center">
                            <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Integrity</h3>
                            <p className="text-gray-600 text-base text-justify">Transparent processes and honest recommendations</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 border border-orange-100 text-center">
                            <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <Heart className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Customer-Focused</h3>
                            <p className="text-gray-600 text-base text-justify">Every space and client need is unique</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 border border-orange-100 text-center">
                            <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <Leaf className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Sustainability</h3>
                            <p className="text-gray-600 text-base text-justify">Promoting eco-friendly and recyclable products</p>
                        </div>
                    </div>
                </section>

                <section className="py-12">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Serving Across Malaysia</h2>

                    </div>

                    <div className=" rounded-2xl ">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6  text-center">
                            <div className="bg-white rounded-lg p-4 border border-orange-100  shadow-md">
                                <h3 className="font-bold text-orange-600 text-lg ">Kuala Lumpur</h3>
                            </div>
                            <div className="bg-white rounded-lg border border-orange-100 p-4 shadow-md">
                                <h3 className="font-bold text-orange-600  text-lg">Selangor</h3>
                            </div>
                            <div className="bg-white rounded-lg p-4 border border-orange-100 shadow-md">
                                <h3 className="font-bold text-orange-600 text-lg">Penang</h3>
                            </div>
                            <div className="bg-white rounded-lg p-4 border border-orange-100 shadow-md">
                                <h3 className="font-bold text-orange-600 text-lg">Johor Bahru</h3>
                            </div>
                            <div className="bg-white rounded-lg p-4 border border-orange-100 shadow-md">
                                <h3 className="font-bold text-orange-600 text-lg">Ipoh</h3>
                            </div>
                            <div className="bg-white rounded-lg p-4 border border-orange-100 shadow-md">
                                <h3 className="font-bold text-orange-600 text-lg">Sabah & Sarawak</h3>
                            </div>
                        </div>
                        <p className="text-center text-gray-700 mt-8 text-lg">
                            We ensure fast delivery, expert installation, and dedicated support in every major city and region.
                        </p>
                    </div>
                </section>

                <section className='py-12'>
                    <div className="bg-orange-50 p-8 text-center  rounded-xl">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-12">
                            Furnish Your Space with Confidence
                        </h3>
                        <p className="text-gray-700 text-lg">
                            Whether you&apos;re upgrading your home or re-fitting your commercial space, we’re ready to help.   <span className='text-orange-600'> <a href="https://www.furnishings.com.my/contact">Contact us</a></span>  for a free consultation today, and let us bring your vision to life.

                        </p>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default AboutUs;