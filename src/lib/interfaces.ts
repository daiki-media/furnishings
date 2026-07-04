// lib/interfaces.ts

export interface Category {
    id: number;
    name: string;
    slug: string;
    products_count: number;
    image: string;
}

export interface ProductCategory {
    id: number;
    name: string;
    slug: string;
}

export interface ProductImages {
    main_image: string;
    gallery: string[];
    thumbnails: string[] | null;
    alt_texts: string[] | null;
}

export interface ProductSEO {
    meta_title: string;
    meta_description: string;
    keywords: string[];
}

export interface ProductDescription {
    short: string | null;
    long: string | null;
}

export interface ProductFeatures {
    main_features: string[];
    benefits: string[];
    design_compatibility: string[];
}

export interface ProductSpecification {
    key: string;
    value: string;
}

export interface ProductCTA {
    text: string | null;
    url: string | null;
    style: string;
    target: string;
}

export interface ProductFAQ {
    question: string | null;
    answer: string | null;
}

export interface ProductAdditionalDescription {
    main_title: string | null;
    sections: any[];
}

export interface Product {
    id: number;
    sku: string;
    name: string;
    slug: string;
    brand: string;
    status: string;
    category: ProductCategory;
    images: ProductImages;
    seo: ProductSEO;
    description: ProductDescription;
    features: ProductFeatures;
    specifications: ProductSpecification[];
    installation: any | null;
    maintenance: any | null;
    faqs: ProductFAQ[];
    cta: ProductCTA;
    additional_description: ProductAdditionalDescription | null;
    purchase_price: number | null;
    retail_price: number | null;
    quantity: number;
    created_at: string;
    updated_at: string;
}

// ProductListItem interface for listing pages
export interface ProductListItem {
    id: number;
    name: string;
    slug: string;
    brand: string;
    category: {
        id: number;
        name: string;
        slug: string;
    };
    image: string;
    description: string;
    price: number;
}

// lib/interfaces.ts

export interface Blog {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    featuredImage?: string;
    author?: string;
    publish_date: string;
    created_at: string;
    updated_at: string;
    tags?: string;
    category?: string;
    views?: number;
    image?: string;
    status?: string;
    meta_title?: string;
    meta_description?: string;
    category_name?: string;
    focus_keyword?: string;
    allow_comments?: boolean;
}


export interface BlogResponse {
    success: boolean;
    data: Blog[];
    meta?: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
    };
}

// Helper Functions
const API_BASE = "https://cms.furnishings.daikimedia.com";

export function getFullImageUrl(imagePath: string): string {
    if (!imagePath) return '/placeholder.svg';
    if (imagePath.startsWith('http')) return imagePath;
    // Handle double slashes in path
    const cleanPath = imagePath.replace(/^\/+/, '');
    return `${API_BASE}/${cleanPath}`;
}

export function getCategoryImageUrl(category: Category): string {
    if (!category.image) return '/placeholder-category.jpg';
    // Handle the category image path - it's already in storage/categories/ format
    const imagePath = category.image.startsWith('storage/') 
        ? category.image 
        : `storage/${category.image}`;
    return getFullImageUrl(imagePath);
}

export function getBlogImageUrl(imagePath?: string): string {
    if (!imagePath) return "/placeholder-blog.jpg";
    if (imagePath.startsWith("http")) return imagePath;

    const cleanPath = imagePath.replace(/^\/+/, "");
    return `${API_BASE}/storage/${cleanPath}`;
}

// The CMS stores blog excerpt/content as Quill-generated HTML, so plain-text
// previews (archive cards, meta descriptions) need tags stripped first or the
// raw markup leaks into the visible/crawlable text.
export function getBlogPreviewText(html?: string, maxLength = 160): string {
    if (!html) return '';
    const text = html
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength).trimEnd()}...`;
}

export function getProductDisplayPrice(product: Product): number {
    if (product.retail_price) {
        return typeof product.retail_price === 'string' 
            ? parseFloat(product.retail_price) 
            : product.retail_price;
    }
    if (product.purchase_price) {
        return typeof product.purchase_price === 'string'
            ? parseFloat(product.purchase_price)
            : product.purchase_price;
    }
    return 0;
}

export function formatPrice(price: number): string {
    if (!price || price <= 0) return '';
    return `RM ${price.toFixed(2)}`;
}

// Add toProductListItem function
export function toProductListItem(product: Product): ProductListItem {
    return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        brand: product.brand,
        category: product.category || { 
            id: 0, 
            name: 'Uncategorized', 
            slug: 'uncategorized' 
        },
        image: getFullImageUrl(product.images.main_image),
        description: product.description.short || product.description.long || '',
        price: getProductDisplayPrice(product)
    };
}