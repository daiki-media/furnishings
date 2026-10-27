// Server component: emits static JSON-LD only (no hooks / interactivity),
// so it ships zero client JavaScript.
//
// Only facts shown on the site belong here. No review or aggregateRating
// markup until there is a real, verifiable review source, and no street
// address or postcode until the approved showroom address is confirmed.
const LocalBusinessSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Furnishings",
        url: "https://www.furnishings.com.my/",
        image: "https://www.furnishings.com.my/images/logo%20(2).png",
        address: {
            "@type": "PostalAddress",
            addressRegion: "Selangor",
            addressCountry: "MY",
        },
        telephone: "+60 12-349 8710",
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

export default LocalBusinessSchema;
