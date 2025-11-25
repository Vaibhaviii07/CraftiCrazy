// src/Data/ResinClockData.ts
export type Variant = {
  
  image: string;
  price: number;
  discount?: number;
};

export type ResinClock = {
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
};

export const resinClocks: ResinClock[] = [
  {
    id: "c1",
    sku: "RC-OCE-001",
    name: "Ocean Foam Resin Clock",
    description: "Realistic ocean waves and foamy surf captured perfectly inside resin.",
    price: 1300,
    rating: 4.6,
    reviews: 45,
    discount: 10,
    highlight: "Best Seller",
    category: "Ocean",
    tags: ["ocean", "waves", "resin", "handmade"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "6 months warranty",
    returnPolicy: "7-day easy returns",
    image: "/clock2.jpg",
    variants: [
      { image: "/clock2.jpg", price: 1300 },
      { image: "/clock2-1.jpg", price: 1350, discount: 5 },
      { image: "/clock2-2.jpg", price: 1400, discount: 8 },
      { image: "/clock2-3.jpg", price: 1400, discount: 8 },
      { image: "/clock2-4.jpg", price: 1400, discount: 8 },
      { image: "/clock2-5.jpg", price: 1400, discount: 8 },

    ],
    contents: ["Resin Clock", "Packaging Box"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–5 days" },
    customization: { available: false },
    material: "Resin with pigments",
    dimensions: "30x30 cm",
    weight: "800g",
    careInstructions: "Avoid direct sunlight, clean with soft cloth",
    specifications: { Color: "Blue & White", Shape: "Round" },
  },
  {
    id: "c2",
    sku: "RC-FLP-002",
    name: "Floating Petals Resin Clock",
    description: "Real dried flowers encapsulated in resin for a serene, botanical vibe.",
    price: 1200,
    rating: 4.7,
    reviews: 38,
    discount: 5,
    highlight: "Popular Choice",
    category: "Floral",
    tags: ["floral", "botanical", "gift", "resin"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "6 months warranty",
    returnPolicy: "7-day easy returns",
    image: "/clock3.jpg",
    variants: [
      { image: "/clock3.jpg", price: 1200 },
      { image: "/clock3-1.jpg", price: 1250, discount: 5 },
      { image: "/clock3-2.jpg", price: 1280, discount: 7 },
      { image: "/clock3-3.jpg", price: 1280, discount: 7 },
      { image: "/clock3-4.jpg", price: 1280, discount: 7 },
      { image: "/clock3-5.jpg", price: 1280, discount: 7 },
      

    ],
    contents: ["Resin Clock", "Gift Box"],
    delivery: { type: "Express", availability: "Metro Cities", estimated: "2–4 days" },
    customization: { available: true, options: ["Add Initials", "Add Name"] },
    material: "Resin with dried flowers",
    dimensions: "28x28 cm",
    weight: "750g",
    careInstructions: "Keep dry, avoid scratches",
    specifications: { Color: "Pink & Green", Shape: "Round" },
  },
  {
    id: "c3",
    sku: "RC-COS-003",
    name: "Cosmic Nebula Resin Clock",
    description: "A cosmic masterpiece with swirling colors and glittering stars embedded inside.",
    price: 1550,
    rating: 4.8,
    reviews: 60,
    discount: 8,
    highlight: "Trending",
    category: "Galaxy",
    tags: ["cosmic", "galaxy", "resin", "art"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "6 months warranty",
    returnPolicy: "7-day easy returns",
    image: "/clock4.jpg",
    variants: [
      { image: "/clock4.jpg", price: 1550 },
      { image: "/clock4-1.jpg", price: 1600, discount: 5 },
      { image: "/clock4-2.jpg", price: 1650, discount: 7 },
     

    ],
    contents: ["Resin Clock", "Protective Packaging"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–5 days" },
    customization: { available: true, options: ["Custom Color Blend"] },
    material: "Resin with glitter pigments",
    dimensions: "32x32 cm",
    weight: "900g",
    careInstructions: "Wipe gently with soft cloth",
    specifications: { Color: "Purple & Blue", Shape: "Round" },
  },
];
