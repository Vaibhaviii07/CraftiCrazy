// src/Data/ResinFramedata.ts

export type Variant = {
  image: string;
  price: number;
  discount?: number;
};

export type ResinFrame = {
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
  delivery?: {
    type: string;
    availability: string;
    estimated: string;
  };
  customization?: {
    available: boolean;
    options?: string[];
  };
  material?: string;
  dimensions?: string;
  weight?: string;
  careInstructions?: string;
  specifications?: { [key: string]: string };
  maxOrderQuantity?: number;
  occasion?: string[];
};

export const resinFrames: ResinFrame[] = [
  {
    id: "rf1",
    sku: "RF-FLR-001",
    name: "Floral Encased Resin Frame",
    description: "Delicate flowers encased in clear resin for a natural look.",
    price: 1100,
    rating: 4.7,
    reviews: 245,
    discount: 10,
    highlight: "Best Seller",
    category: "Floral",
    tags: ["floral", "gift", "handmade", "trending"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "6 months color & shine warranty",
    returnPolicy: "7-day easy returns",
    image: "/frame1.jpg",
    variants: [
      { image: "/frame1.jpg", price: 1100, discount: 10 },
      { image: "/frame1-1.jpg", price: 1200, discount: 5 },
      { image: "/frame1-2.jpg", price: 1200, discount: 5 },
      { image: "/frame1-3.jpg", price: 1200, discount: 5 },
      { image: "/frame1-4.jpg", price: 1200, discount: 5 },
    ],
    contents: ["Resin Frame", "Gift Box"],
    occasion: ["Birthdays", "Anniversaries"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–5 days" },
    customization: { available: true, options: ["Add Name", "Add Message"] },
    material: "Resin with preserved flowers",
    dimensions: "8x10 inches",
    weight: "550g",
    careInstructions: "Wipe with soft cloth, avoid direct sunlight",
    specifications: { Color: "Transparent", FrameType: "Floral Encased" },
  },
  {
    id: "rf2",
    sku: "RF-MIN-002",
    name: "Minimalist Clear Resin Frame",
    description: "Transparent resin frame with subtle gold accents, perfect for modern home and office spaces.",
    price: 900,
    rating: 4.5,
    reviews: 180,
    discount: 10,
    highlight: "Popular Choice",
    category: "Minimalist",
    tags: ["minimal", "modern", "decor", "gift"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "3 months durability warranty",
    returnPolicy: "7-day easy returns",
    image: "/frame2.jpg",
    variants: [
      { image: "/frame2.jpg", price: 900, discount: 15 },
      { image: "/frame2-1.jpg", price: 950, discount: 10 },
      { image: "/frame2-2.jpg", price: 980, discount: 12 },
      { image: "/frame2-3.jpg", price: 1020, discount: 8 },
      { image: "/frame2-4.jpg", price: 1050, discount: 5 },
    ],
    contents: ["Resin Frame", "Golden Stand", "Soft Cloth"],
    occasion: ["Home Decor", "Office", "Gifting"],
    delivery: { type: "Standard", availability: "Metro Cities", estimated: "3–6 days" },
    customization: { available: true, options: ["Name Engraving", "Gift Wrap"] },
    material: "Transparent resin with gold accents",
    dimensions: "10x12 inches",
    weight: "600g",
    careInstructions: "Keep away from heat, clean with soft cloth",
    specifications: { Color: "Clear with Gold", Style: "Minimalist" },
  },
  {
    id: "rf3",
    sku: "RF-NAT-003",
    name: "Leaves Resin Frame",
    description: "Elegant resin frame with natural pressed leaves, adding a refreshing and earthy touch to any space.",
    price: 950,
    rating: 4.4,
    reviews: 120,
    discount: 8,
    highlight: "Trendy Pick",
    category: "Nature",
    tags: ["eco-friendly", "natural", "gift", "modern"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: false,
    warranty: "6 months durability warranty",
    returnPolicy: "7-day replacement policy",
    image: "/frame3.jpg",
    variants: [
      { image: "/frame3.jpg", price: 950, discount: 8 },
      { image: "/frame3-1.jpg", price: 1000, discount: 5 },
      { image: "/frame3-2.jpg", price: 1000, discount: 5 },
      { image: "/frame3-3.jpg", price: 1000, discount: 5 },
      { image: "/frame3-4.jpg", price: 1000, discount: 5 },
    ],
    contents: ["Resin Frame", "Gift Box", "Care Guide"],
    occasion: ["Home Decor", "Nature Lovers", "Eco-friendly Gifts"],
    delivery: { type: "Express", availability: "Across India", estimated: "2–4 days" },
    customization: { available: true, options: ["Add Leaf Pattern", "Personalized Note"] },
    material: "Resin with natural pressed leaves",
    dimensions: "9x11 inches",
    weight: "580g",
    careInstructions: "Avoid direct sunlight, wipe gently",
    specifications: { Color: "Green & Transparent", FrameType: "Leaves" },
  },
  {
    id: "rf4",
    sku: "RF-WOD-004",
    name: "Handmade Wooden Resin Frame",
    description: "A premium resin frame bordered with natural wood, featuring vibrant resin art — blending rustic charm with modern elegance.",
    price: 1300,
    rating: 4.9,
    reviews: 300,
    discount: 15,
    highlight: "Best Seller",
    category: "Wooden",
    tags: ["handmade", "wooden", "luxury", "gift"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "12 months polish warranty",
    returnPolicy: "10-day return policy",
    image: "/frame4.jpg",
    variants: [
      { image: "/frame4.jpg", price: 1300, discount: 15 },
      { image: "/frame4-1.jpg", price: 1400, discount: 10 },
      { image: "/frame4-2.jpg", price: 1400, discount: 10 },
      { image: "/frame4-3.jpg", price: 1400, discount: 10 },
      { image: "/frame4-4.jpg", price: 1400, discount: 10 },
    ],
    contents: ["Resin Frame", "Wooden Stand", "Protective Coating"],
    occasion: ["Anniversaries", "Home Decor", "Gifting"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–5 days" },
    customization: { available: true, options: ["Engrave Name", "Add Message", "Select Wood Finish"] },
    material: "Resin with natural wood border",
    dimensions: "11x13 inches",
    weight: "750g",
    careInstructions: "Clean with dry cloth, avoid water",
    specifications: { Color: "Natural Wood & Resin", Style: "Handmade Wooden" },
  },
  {
    id: "rf5",
    sku: "RF-LUX-005",
    name: "Crystal Encased Resin Frame",
    description: "Premium resin frame with crystals embedded for a luxurious finish.",
    price: 1400,
    rating: 5.0,
    reviews: 410,
    discount: 20,
    highlight: "Luxury",
    category: "Luxury",
    tags: ["luxury", "gift", "exclusive", "premium"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "Lifetime crystal shine guarantee",
    returnPolicy: "15-day returns & replacements",
    image: "/frame5.jpg",
    variants: [
      { image: "/frame5.jpg", price: 1400, discount: 20 },
      { image: "/frame5-1.jpg", price: 1500, discount: 15 },
      { image: "/frame5-2.jpg", price: 1500, discount: 15 },
      { image: "/frame5-3.jpg", price: 1500, discount: 15 },
      { image: "/frame5-4.jpg", price: 1500, discount: 15 },
    ],
    contents: ["Resin Frame", "Gift Box", "Cleaning Cloth"],
    occasion: ["Weddings", "Anniversaries"],
    delivery: { type: "Express", availability: "Across India", estimated: "2–4 days" },
    customization: { available: true, options: ["Add Crystal Pattern", "Engrave Name"] },
    material: "Resin with embedded crystals",
    dimensions: "12x14 inches",
    weight: "800g",
    careInstructions: "Handle with care, clean with soft cloth",
    specifications: { Color: "Transparent with Crystals", Style: "Luxury" },
  },
];
