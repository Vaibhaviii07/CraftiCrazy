// src/Data/ResinPujaThaleData.ts
export type Variant = {
  image: string;
  price: number;
  discount?: number;
};

export type ResinPujaThale = {
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

export const resinPujaThales: ResinPujaThale[] = [
  {
    id: "pt1",
    sku: "PT-TRAD-001",
    name: "Golden Lotus Puja Thale",
    description: "Beautiful golden lotus resin Puja Thale for auspicious rituals.",
    price: 1200,
    rating: 4.9,
    reviews: 95,
    discount: 10,
    highlight: "Best Seller",
    category: "Traditional",
    tags: ["gold", "lotus", "traditional", "ritual"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "6 months",
    returnPolicy: "7-day easy returns",
    image: "/thale2.jpg",
    variants: [
      { image: "/thale2.jpg", price: 1200 },
      { image: "/thale2-1.jpg", price: 1300, discount: 10 },
      { image: "/thale2-2.jpg", price: 1300, discount: 10 },
      { image: "/thale2-3.jpg", price: 1300, discount: 10 },
      { image: "/thale2-4.jpg", price: 1300, discount: 10 },
      { image: "/thale2-5.jpg", price: 1300, discount: 10 },
      { image: "/thale2-6.jpg", price: 1300, discount: 10 },


    ],
    contents: ["Puja Thale"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–5 days" },
    customization: { available: true, options: ["Engraving", "Color Accent"] },
    material: "Resin with gold leaf",
    dimensions: "10 inch diameter",
    weight: "500g",
    careInstructions: "Wipe with soft dry cloth",
    specifications: { Color: "Gold", Shape: "Round" },
  },
  {
    id: "pt2",
    sku: "PT-FLOR-002",
    name: "Floral Resin Puja Thale",
    description: "Elegant floral resin Thale perfect for pooja and decor.",
    price: 950,
    rating: 4.7,
    reviews: 88,
    discount: 5,
    highlight: "Popular Choice",
    category: "Floral",
    tags: ["floral", "decor", "gift"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "3 months",
    returnPolicy: "7-day easy returns",
    image: "/thale1.jpg",
    variants: [
      { image: "/thale1.jpg", price: 950 },
      { image: "/thale1-1.jpg", price: 1000, discount: 5 },
      { image: "/thale1-2.jpg", price: 1000, discount: 5 },
      { image: "/thale1-3.jpg", price: 1000, discount: 5 },
      { image: "/thale1-4.jpg", price: 1000, discount: 5 },
      { image: "/thale1-5.jpg", price: 1000, discount: 5 },
      { image: "/thale1-6.jpg", price: 1000, discount: 5 },

    ],
    contents: ["Puja Thale"],
    delivery: { type: "Express", availability: "Metro Cities", estimated: "2–3 days" },
    customization: { available: true, options: ["Color Variation"] },
    material: "Resin",
    dimensions: "9 inch diameter",
    weight: "450g",
    careInstructions: "Wipe with damp cloth",
    specifications: { Color: "Pink Floral", Shape: "Round" },
  },
  {
    id: "pt3",
    sku: "PT-TRAD-003",
    name: "Peacock Feather Puja Thale",
    description: "Resin Puja Thale with embedded peacock feather motif.",
    price: 1250,
    rating: 4.8,
    reviews: 90,
    discount: undefined,
    highlight: "Trending",
    category: "Traditional",
    tags: ["peacock", "traditional", "ritual"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "6 months",
    returnPolicy: "7-day easy returns",
    image: "/thale3.jpg",
    variants: [
      { image: "/thale3.jpg", price: 1250 },
      { image: "/thale3-1.jpg", price: 1350, discount: 10 },
      { image: "/thale3-2.jpg", price: 1350, discount: 10 },
      { image: "/thale3-3.jpg", price: 1350, discount: 10 },
      { image: "/thale3-4.jpg", price: 1350, discount: 10 },

    ],
    contents: ["Puja Thale"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–5 days" },
    customization: { available: false },
    material: "Resin with peacock feather",
    dimensions: "10 inch diameter",
    weight: "520g",
    careInstructions: "Avoid direct sunlight",
    specifications: { Color: "Blue/Green", Shape: "Round" },
  },
  {
    id: "pt4",
    sku: "PT-MOD-004",
    name: "Marble Effect Puja Thale",
    description: "Stylish marble-effect resin Thale for festive pooja rituals.",
    price: 1000,
    rating: 4.6,
    reviews: 85,
    discount: 5,
    highlight: "Modern Pick",
    category: "Modern",
    tags: ["marble", "modern", "decor"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "6 months",
    returnPolicy: "7-day easy returns",
    image: "/thale4.jpg",
    variants: [
      { image: "/thale4.jpg", price: 1000 },
      { image: "/thale4-1.jpg", price: 1100, discount: 5 },
      { image: "/thale4-2.jpg", price: 1100, discount: 5 },
      { image: "/thale4-3.jpg", price: 1100, discount: 5 },
      { image: "/thale4-4.jpg", price: 1100, discount: 5 },
     

    ],
    contents: ["Puja Thale"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–5 days" },
    customization: { available: true, options: ["Marble Pattern"] },
    material: "Resin",
    dimensions: "10 inch diameter",
    weight: "500g",
    careInstructions: "Wipe with soft cloth",
    specifications: { Color: "White/Gray", Shape: "Round" },
  },
  {
    id: "pt5",
    sku: "PT-FES-005",
    name: "Festive Red & Gold Puja Thale",
    description: "Red and gold resin Thale perfect for Diwali and poojas.",
    price: 1150,
    rating: 4.7,
    reviews: 89,
    discount: 7,
    highlight: "Festive Pick",
    category: "Festive",
    tags: ["red", "gold", "diwali", "ritual"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "6 months",
    returnPolicy: "7-day easy returns",
    image: "/thale5.jpg",
    variants: [
      { image: "/thale5.jpg", price: 1150 },
      { image: "/thale5-1.jpg", price: 1250, discount: 7 },
      { image: "/thale5-2.jpg", price: 1250, discount: 7 },
      { image: "/thale5-3.jpg", price: 1250, discount: 7 },
      { image: "/thale5-4.jpg", price: 1250, discount: 7 },


    ],
    contents: ["Puja Thale"],
    delivery: { type: "Express", availability: "Metro Cities", estimated: "2–4 days" },
    customization: { available: true, options: ["Color Accent"] },
    material: "Resin",
    dimensions: "10 inch diameter",
    weight: "510g",
    careInstructions: "Wipe with soft cloth",
    specifications: { Color: "Red/Gold", Shape: "Round" },
  },
  {
    id: "pt6",
    sku: "PT-MIN-006",
    name: "Minimalist Resin Puja Thale",
    description: "Simple and minimalist resin Thale for everyday rituals.",
    price: 900,
    rating: 4.5,
    reviews: 82,
    discount: undefined,
    highlight: "Minimalist Pick",
    category: "Modern",
    tags: ["minimalist", "modern", "daily"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "3 months",
    returnPolicy: "7-day easy returns",
    image: "/thale6.jpg",
    variants: [
      { image: "/thale6.jpg", price: 900 },
      { image: "/thale6-1.jpg", price: 950 },
      { image: "/thale6-2.jpg", price: 950 },
      { image: "/thale6-3.jpg", price: 950 },
      { image: "/thale6-4.jpg", price: 950 },
      { image: "/thale6-5.jpg", price: 950 },
      { image: "/thale6-6.jpg", price: 950 },
      { image: "/thale6-7.jpg", price: 950 },


    ],
    contents: ["Puja Thale"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–5 days" },
    customization: { available: false },
    material: "Resin",
    dimensions: "9 inch diameter",
    weight: "450g",
    careInstructions: "Avoid water exposure",
    specifications: { Color: "Beige", Shape: "Round" },
  },
];
