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
    price: 500,
    discount: undefined,
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
      { image: "/frame1.jpg", price: 500 },
      { image: "/frame1-1.jpg", price: 500 },
      { image: "/frame1-2.jpg", price: 500 },
      { image: "/frame1-3.jpg", price: 500 },

    ],
    contents: ["Resin Frame", "Gift Box"],
    occasion: ["Birthdays", "Anniversaries"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–5 days" },
    customization: { available: true, options: ["Customization on your demand" , "3 inch circle ,3 inch  heart,4 inch rectangle ,6 inch  heart,8 inch  circle ,12 inch circle"] },
    material: "Resin with preserved flowers",
    dimensions: "customized",
    weight: "550g",
    careInstructions: "Wipe with soft cloth, avoid direct sunlight",
    specifications: { Color: "Transparent", FrameType: "Floral Encased" },
  },
  {
    id: "rf2",
    sku: "RF-MIN-002",
    name: "Minimalist Clear Resin Frame",
    description: "Transparent resin frame with subtle gold accents, perfect for modern home and office spaces.",
    price: 149,
    discount: undefined,
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
      { image: "/frame2.jpg", price: 149},

      { image: "/frame2-2.jpg", price: 149},
      { image: "/frame2-3.jpg", price: 600},
      { image: "/frame2-4.jpg", price: 900 },
    ],
    contents: ["Resin Frame", "Golden Stand", "Soft Cloth"],
    occasion: ["Home Decor", "Office", "Gifting"],
    delivery: { type: "Standard", availability: "Metro Cities", estimated: "3–6 days" },
    customization: { available: true, options:  ["Customization on your demand" , "3 inch circle ,3 inch  heart,4 inch rectangle ,6 inch  heart,8 inch  circle ,12 inch circle"]},
    material: "Transparent resin with gold accents",
    dimensions: "customized",
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
    discount: undefined,
    highlight: "Trendy Pick",
    category: "Nature",
    tags: ["eco-friendly", "natural", "gift", "modern"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "6 months durability warranty",
    returnPolicy: "7-day replacement policy",
    image: "/frame3.jpg",
    variants: [
      { image: "/frame3.jpg", price: 950},
      { image: "/frame3-1.jpg", price: 1000},
      { image: "/frame3-2.jpg", price: 1000 },
      { image: "/frame3-3.jpg", price: 1000},
      { image: "/frame3-4.jpg", price: 1000},
    ],
    contents: ["Resin Frame", "Gift Box", "Care Guide"],
    occasion: ["Home Decor", "Nature Lovers", "Eco-friendly Gifts"],
    delivery: { type: "Express", availability: "Across India", estimated: "2–4 days" },
    customization: { available: true, options: ["Add Leaf Pattern", "Personalized Note","Customization on your demand" , " 3 inch circle ,3 inch  heart,4 inch rectangle ,6 inch  heart,8 inch  circle ,12 inch circle"] },
    material: "Resin with natural pressed leaves",
    dimensions: "customized",
    weight: "580g",
    careInstructions: "Avoid direct sunlight, wipe gently",
    specifications: { Color: "Green & Transparent", FrameType: "Leaves" },
  },
  {
    id: "rf5",
    sku: "RF-LUX-005",
    name: "Memories preservation Resin Frame",
    description: "Premium resin frame with Memories preservation Resin Frame for a luxurious finish.",
    price: 1300,
    discount: undefined,
    highlight: "Luxury",
    category: "Luxury",
    tags: ["luxury", "gift", "exclusive", "premium"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "Lifetime crystal shine guarantee",
    returnPolicy: "15-day returns & replacements",
    image: "/mem1.jpeg",
    variants: [
      { image: "/mem1.jpeg", price: 1300 },
      { image: "/mem2.jpeg", price: 900 },
    
    ],
    contents: ["Resin Frame", "Gift Box", "Cleaning Cloth"],
    occasion: ["Weddings", "Anniversaries"],
    delivery: { type: "Express", availability: "Across India", estimated: "2–4 days" },
    customization: { available: true, options: ["Add Crystal Pattern","Customization on your demand" , "3 inch circle ,3 inch  heart,4 inch rectangle ,6 inch  heart,8 inch  circle ,12 inch circle"] },
    material: "Resin with embedded crystals",
    dimensions: "customized",
    weight: "800g",
    careInstructions: "Handle with care, clean with soft cloth",
    specifications: { Color: "Transparent with Crystals", Style: "Luxury" },
  },
];
