// src/Data/ResinKeychainData.ts
export type Variant = {
  image: string;
  price: number;
  discount?: number;
};

export type ResinKeychain = {
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

export const resinKeychains: ResinKeychain[] = [
  {
    id: "rk1",
    sku: "RK-FLR-001",
    name: "Floral Resin Keychain",
    description: "Handmade resin keychain with preserved real flowers.",
    price: 250,
    rating: 4.8,
    reviews: 120,
    discount: 5,
    highlight: "Best Seller",
    category: "Floral",
    tags: ["floral", "gift", "handmade", "trending"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "3 months shine warranty",
    returnPolicy: "7-day easy returns",
    image: "/resinkeychains1.jpg",
    variants: [
        { image: "/resinkeychains1.jpg", price: 450, discount:undefined },
      { image: "/keychain3.jpg", price: 450, discount:undefined },
      { image: "/keychain3-1.jpg", price: 470, discount: 2 },
      { image: "/keychain3-2.jpg", price: 470, discount: 2 },
      { image: "/keychain3-3.jpg", price: 470, discount: 2 },
      { image: "/keychain3-4.jpg", price: 470, discount: 2 },
      { image: "/keychain3-5.jpg", price: 470, discount: 2 },
     

    ],
    contents: ["Resin Keychain", "Gift Bag"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–5 days" },
    customization: { available: true, options: ["Add Name", "Add Initial"] },
    material: "Resin with dried flowers",
    dimensions: "5x3 cm",
    weight: "20g",
    careInstructions: "Avoid direct sunlight, wipe gently",
    specifications: { Color: "Multicolor", Shape: "Flower" },
  },
  {
    id: "rk2",
    sku: "RK-CUS-002",
    name: "Memories Preserved Resin Keychain",
    description: "Unique resin keychain that preserves memories with shimmer effects.",
    price: 300,
    rating: 4.6,
    reviews: 90,
    discount: 10,
    highlight: "Popular Choice",
    category: "Custom",
    tags: ["custom", "memories", "gift", "personalized"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "3 months durability warranty",
    returnPolicy: "7-day easy returns",
    image: "/resinkeychains3.jpg",
    variants: [
      { image: "/resinkeychains3.jpg", price: 300, discount: 10 },
      { image: "/resinkeychains3-1.jpg", price: 320, discount: 5 },
      { image: "/resinkeychains3-2.jpg", price: 320, discount: 5 },
      { image: "/resinkeychains3-3.jpg", price: 320, discount: 5 },
      { image: "/resinkeychains3-4.jpg", price: 320, discount: 5 },
      { image: "/resinkeychains3-5.jpg", price: 320, discount: 5 },

    ],
    contents: ["Resin Keychain", "Gift Box"],
    delivery: { type: "Express", availability: "Metro Cities", estimated: "2–4 days" },
    customization: { available: true, options: ["Photo Embed", "Custom Message"] },
    material: "Resin with shimmer",
    dimensions: "5x3.5 cm",
    weight: "25g",
    careInstructions: "Do not bend, keep away from heat",
    specifications: { Color: "Clear with Glitter", Shape: "Rectangle" },
  },
  {
    id: "rk3",
    sku: "RK-ALP-003",
    name: "Initial Letter Keychain",
    description: "Custom resin keychain with your favorite letter and glitter.",
    price: 200,
    rating: 4.9,
    reviews: 150,
    discount: 0,
    highlight: "Trending",
    category: "Alphabet",
    tags: ["alphabet", "personalized", "gift", "handmade"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "3 months shine warranty",
    returnPolicy: "7-day easy returns",
    image: "/resinkeychains2.jpg",
    variants: [
      { image: "/resinkeychains2.jpg", price: 200 },
      { image: "/resinkeychains2-1.jpg", price: 200 },
      { image: "/resinkeychains2-2.jpg", price: 200 },
      { image: "/keychain1.jpg", price: 500, discount: 5 },
      { image: "/keychain1-2.jpg", price: 520, discount: 3 },
      { image: "/keychain1-3.jpg", price: 520, discount: 3 },
      { image: "/keychain1-5.jpg", price: 520, discount: 3 },
    ],
    contents: ["Resin Keychain"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–5 days" },
    customization: { available: true, options: ["Choose Letter", "Add Glitter"] },
    material: "Resin with glitter",
    dimensions: "4x4 cm",
    weight: "15g",
    careInstructions: "Keep dry, avoid scratches",
    specifications: { Color: "Clear with Glitter", Shape: "Alphabet" },
  },
  {
    id: "rk4",
    sku: "RK-PHO-004",
    name: "Resin Photo Keychain",
    description: "Beautiful photo resin keychain with customized design.",
    price: 280,
    rating: 4.7,
    reviews: 80,
    discount: 5,
    highlight: "Custom Pick",
    category: "Custom",
    tags: ["photo", "custom", "gift", "memories"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "3 months durability warranty",
    returnPolicy: "7-day easy returns",
    image: "/resinkeychains5.jpg",
    variants: [
      { image: "/resinkeychains5.jpg", price: 280, discount: 5 },
      { image: "/resinkeychains5-1.jpg", price: 300, discount: 2 },
      { image: "/resinkeychains5-2.jpg", price: 300, discount: 3 },
      { image: "/resinkeychains5-3.jpg", price: 300, discount: 4},
      { image: "/resinkeychains5-4.jpg", price: 300, discount: 5 },
      
    ],
    contents: ["Resin Keychain", "Photo Print"],
    delivery: { type: "Express", availability: "Across India", estimated: "2–4 days" },
    customization: { available: true, options: ["Add Photo", "Add Text"] },
    material: "Resin with photo embed",
    dimensions: "5x4 cm",
    weight: "22g",
    careInstructions: "Avoid water, keep away from heat",
    specifications: { Color: "Transparent", Shape: "Rectangle" },
  },
  {
    id: "rk5",
    sku: "RK-CHA-005",
    name: "Butterfly Charm Keychain",
    description: "Delicate resin keychain with embedded butterfly charm.",
    price: 320,
    rating: 4.5,
    reviews: 70,
    discount: 5,
    highlight: "Best Seller",
    category: "Charm",
    tags: ["charm", "butterfly", "gift", "handmade"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "3 months shine warranty",
    returnPolicy: "7-day easy returns",
    image: "/resinkeychains4.jpg",
    variants: [
      { image: "/resinkeychains4.jpg", price: 320, discount: 5 },
      { image: "/resinkeychains4-1.jpg", price: 350, discount: 1},
      { image: "/resinkeychains4-2.jpg", price: 350, discount: 1},
      { image: "/resinkeychains4-3.jpg", price: 350, discount: 1},
      { image: "/resinkeychains4-4.jpg", price: 350, discount: 1},
      { image: "/resinkeychains4-5.jpg", price: 350, discount: 1},
    ],
    contents: ["Resin Keychain", "Gift Box", "Charm"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–5 days" },
    customization: { available: false },
    material: "Resin with butterfly charm",
    dimensions: "5x3.5 cm",
    weight: "23g",
    careInstructions: "Avoid scratches, keep dry",
    specifications: { Color: "Multicolor", Shape: "Butterfly" },
  },
];
