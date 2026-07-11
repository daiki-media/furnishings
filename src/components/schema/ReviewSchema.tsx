// Server component: emits static JSON-LD only (no hooks / interactivity),
// so it ships zero client JavaScript. Describes the business as a LocalBusiness
// with service area, contact and customer reviews for rich-result eligibility.
const ReviewSchema = () => {
    const reviews = [
        {
            name: "Teresa Whiting",
            rating: 4,
            text: "Amazing service and quality work. The team was professional and delivered exactly what we needed.",
        },
        {
            name: "Nur Hanis",
            rating: 5,
            text: "Our kitchen vinyl floor survived multiple floods—no damage, no peeling. Furnishing Solutions did an excellent job with installation and customer service.",
        },
        {
            name: "Imran Rafiq",
            rating: 5,
            text: "Stylish and easy to maintain. Our café looks great and still looks brand new after a year of daily use. Highly recommend their flooring solutions.",
        },
        {
            name: "Sarah Ahmed",
            rating: 4,
            text: "Outstanding service from start to finish. The team was punctual, professional, and the quality exceeded our expectations.",
        },
    ];

    // ⭐ Calculate aggregate rating
    const avgRating =
        reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    const serviceAreas = [
        "Kuala Lumpur",
        "Selangor",
        "Klang Valley",
        "Penang",
        "Johor Bahru",
        "Melaka",
        "Ipoh",
        "Sabah",
        "Sarawak",
    ];

    const schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://www.furnishings.com.my/#business",
        name: "Furnishing Solutions",
        description:
            "Vinyl, SPC, laminate and carpet tile flooring supplier and installer serving homes and businesses across Malaysia.",
        url: "https://www.furnishings.com.my/",
        image: "https://www.furnishings.com.my/logo.jpg",
        logo: "https://www.furnishings.com.my/logo.jpg",
        telephone: "+60 12-349 8710",
        priceRange: "RM",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Selangor",
            addressRegion: "Selangor",
            addressCountry: "MY",
        },
        areaServed: serviceAreas.map((area) => ({
            "@type": "AdministrativeArea",
            name: area,
        })),
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: avgRating.toFixed(1),
            reviewCount: reviews.length,
            bestRating: "5",
        },
        review: reviews.map((r) => ({
            "@type": "Review",
            author: { "@type": "Person", name: r.name },
            reviewRating: {
                "@type": "Rating",
                ratingValue: r.rating,
                bestRating: "5",
            },
            reviewBody: r.text,
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

export default ReviewSchema;
