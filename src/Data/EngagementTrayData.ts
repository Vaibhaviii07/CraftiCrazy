// src/Data/EngagementTrayData.ts
export type Variant = {
  image: string;
  price: number;
  discount?: number;
};

export type EngagementTray = {
  id: string;
  sku: string;
  name: string;
  description?: string;
  price: number;
  rating?: number;
  reviews?: number;
  discount?: number;
  highlight?: string;
  category: string;
  tags?: string[];
  brand?: string;
  seller?: string;
  inStock: boolean;
  warranty?: string;
  returnPolicy?: string;
  image: string;
  variants?: Variant[];
  contents?: string[];
  delivery?: { type: string; availability: string; estimated: string };
  customization?: { available: boolean; options?: string[] };
  material?: string;
  dimensions?: string;
  weight?: string;
  careInstructions?: string;
  specifications?: { [key: string]: string };
};

export const engagementTrays: EngagementTray[] = [
  {
    id: "et1",
    sku: "ET-GLD-001",
    name: "Golden Floral Engagement Tray",
    description: "Elegant golden floral tray perfect for ring ceremonies and engagements.",
    price: 1800,
    rating: 4.9,
    reviews: 120,
    discount: 10,
    highlight: "Best Seller",
    category: "Traditional",
    tags: ["gold", "floral", "engagement"],
    brand: "CraftiCrazy",
    seller: "Handcrafted by CraftiCrazy",
    inStock: true,
    warranty: "6 months",
    returnPolicy: "7-day easy returns",
    image: "/tray1.jpg",
    variants: [
      { image: "/tray1.jpg", price: 1800 },
      { image: "/tray1-1.jpg", price: 1850, discount: 10 },
      { image: "/Tray1-2.jpg", price: 1850, discount: 10 },
      { image: "/Tray1-3.jpg", price: 1850, discount: 10 },
      { image: "/Tray1-4.jpg", price: 1850, discount: 10 },
      { image: "/Tray1-5.jpg", price: 1850, discount: 10 },

    ],
    contents: ["Engagement Tray"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–5 days" },
    customization: { available: true, options: ["Name Tag", "Color Accent"] },
    material: "Resin and artificial flowers",
    dimensions: "14 inch diameter",
    weight: "650g",
    careInstructions: "Clean with a dry cloth only",
    specifications: { Color: "Gold & Ivory", Shape: "Round" },
  },
 
  {
    id: "et2",
    sku: "ET-RSE-002",
    name: "Rose Romance Engagement Tray",
    description: "Beautiful rose-themed tray symbolizing love and elegance for your special day.",
    price: 1750,
    rating: 4.7,
    reviews: 95,
    discount: 5,
    highlight: "Romantic Pick",
    category: "Floral",
    tags: ["rose", "romantic", "pink"],
    brand: "CraftiCrazy",
    seller: "Handcrafted by CraftiCrazy",
    inStock: true,
    warranty: "6 months",
    returnPolicy: "7-day easy returns",
    image: "/tray3.jpg",
    variants: [
      { image: "/tray3.jpg", price: 1750 },
      { image: "/tray3-1.jpg", price: 1800, discount: 5 },
      { image: "/tray3-2.jpg", price: 1800, discount: 5 },
      { image: "/tray3-3.jpg", price: 1800, discount: 5 },
      { image: "/tray3-4.jpg", price: 1800, discount: 5 },
      { image: "/tray3-5.jpg", price: 1800, discount: 5 },
      { image: "/tray3-6.jpg", price: 1800, discount: 5 },
      { image: "/tray3-7.jpg", price: 1800, discount: 5 },
      { image: "/tray3-8.jpg", price: 1800, discount: 5 },
      { image: "/tray3-9.jpg", price: 1800, discount: 5 },
      { image: "/tray3-10.jpg", price: 1800, discount: 5 },
      { image: "/tray3-11.jpg", price: 1800, discount: 5 },
      { image: "/tray3-12.jpg", price: 1800, discount: 5 },

    ],
    contents: ["Engagement Tray"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–5 days" },
    customization: { available: true, options: ["Rose Color", "Couple Name"] },
    material: "Resin with embedded roses",
    dimensions: "14 inch diameter",
    weight: "620g",
    careInstructions: "Avoid moisture exposure",
    specifications: { Color: "Pink & Gold", Shape: "Round" },
  },
  {
    id: "et5",
    sku: "ET-CHR-005",
    name: "Royal Charm Engagement Tray",
    description: "Premium royal-style engagement tray adorned with crystals and metallic detailing.",
    price: 1900,
    rating: 4.9,
    reviews: 140,
    discount: 12,
    highlight: "Luxury Edition",
    category: "Luxury",
    tags: ["royal", "crystal", "premium"],
    brand: "CraftiCrazy",
    seller: "Handcrafted by CraftiCrazy",
    inStock: true,
    warranty: "6 months",
    returnPolicy: "7-day easy returns",
    image: "/tray5.jpg",
    variants: [
      { image: "/tray5.jpg", price: 1900 },
      { image: "/tray5-1.jpg", price: 2000, discount: 12 },
      { image: "/tray5-2.jpg", price: 2000, discount: 12 },
      { image: "/tray5-3.jpg", price: 2000, discount: 12 },
      { image: "/tray5-4.jpg", price: 2000, discount: 12 },
      { image: "/tray5-5.jpg", price: 2000, discount: 12 },
      { image: "/tray5-6.jpg", price: 2000, discount: 12 },
      { image: "/tray5-7.jpg", price: 2000, discount: 12 },
      { image: "/tray5-8.jpg", price: 2000, discount: 12 },

    ],
    contents: ["Engagement Tray"],
    delivery: { type: "Express", availability: "Metro Cities", estimated: "2–4 days" },
    customization: { available: true, options: ["Crystal Color", "Name Tag"] },
    material: "Resin with crystal & metal decor",
    dimensions: "15 inch diameter",
    weight: "700g",
    careInstructions: "Handle with care; clean with dry cloth",
    specifications: { Color: "Gold & Blue", Shape: "Round" },
  },
  {
    id: "et6",
    sku: "ET-MIN-006",
    name: "Minimal Blush Engagement Tray",
    description: "Simple and sophisticated blush resin tray for minimal elegance lovers.",
    price: 1400,
    rating: 4.5,
    reviews: 78,
    discount: undefined,
    highlight: "Minimalist Pick",
    category: "Modern",
    tags: ["minimal", "blush", "elegant"],
    brand: "CraftiCrazy",
    seller: "Handcrafted by CraftiCrazy",
    inStock: true,
    warranty: "3 months",
    returnPolicy: "7-day easy returns",
    image: "/tray6.jpg",
    variants: [
      { image: "/tray6.jpg", price: 1400 },
      { image: "/tray6-1.jpg", price: 1450 },
      { image: "/tray6-2.jpg", price: 1450 },
      { image: "/tray6-3.jpg", price: 1450 },
      { image: "/tray6-4.jpg", price: 1450 },
      { image: "/tray6-5.jpg", price: 1450 },
      { image: "/tray6-6.jpg", price: 1450 },
      { image: "/tray6-7.jpg", price: 1450 },
      { image: "/tray6-8.jpg", price: 1450 },

    ],
    contents: ["Engagement Tray"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–5 days" },
    customization: { available: true, options: ["Monogram Initials"] },
    material: "Resin",
    dimensions: "13 inch diameter",
    weight: "530g",
    careInstructions: "Avoid harsh cleaning agents",
    specifications: { Color: "Blush Pink", Shape: "Round" },
  },
];
