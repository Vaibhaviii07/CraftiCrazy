// src/Data/KeyChaindata.ts

export type Variant = {
  image: string;
  price: number;
  discount?: number;
};

export type KeyChain = {
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

export const keyChains: KeyChain[] = [
  {
    id: "kc1",
    sku: "KC-CUS-001",
    name: "Handmade Custom Keychain",
    description: "Elegant handmade keychain with personalization options.",
    price: 350,
    rating: 4.7,
    reviews: 128,
    discount: 5,
    highlight: "Unique",
    category: "Personalized",
    tags: ["custom", "gift", "daily use"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "6 months durability warranty",
    returnPolicy: "7-day replacement policy",
    image: "/keychain8.jpeg",
    variants: [
      { image: "/keychain8.jpeg", price: 350, discount: 5 },
      { image: "/keychain8-1.jpg", price: 370, discount: 3 },
      { image: "/keychain8-2.jpg", price: 370, discount: 3 },
      { image: "/keychain8-3.jpg", price: 370, discount: 3 },
      { image: "/keychain8-4.jpg", price: 370, discount: 3 },
      { image: "/keychain8-5.jpg", price: 370, discount: 3 },
    ],
    contents: ["Handmade Keychain", "Gift Box"],
    occasion: ["Gifting", "Daily Use"],
    delivery: { type: "Standard", availability: "Across India", estimated: "2–4 days" },
    customization: { available: true, options: ["Add Name", "Choose Color"] },
    material: "Resin and metal clasp",
    dimensions: "3x1 inches",
    weight: "40g",
    careInstructions: "Avoid water, clean with soft cloth",
    specifications: { Style: "Handmade", Finish: "Glossy" },
    maxOrderQuantity: 5,
  },
  {
    id: "kc2",
    sku: "KC-RSN-002",
    name: "Resin Embedded Keychain",
    description: "Beautiful resin keychain with floral and glitter designs.",
    price: 450,
    rating: 4.5,
    reviews: 95,
    discount: undefined,
    highlight: "Artistic",
    category: "Resin",
    tags: ["resin", "floral", "gift"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "3 months shine warranty",
    returnPolicy: "7-day returns",
    image: "/keychain3.jpg",
    variants: [
      { image: "/keychain3.jpg", price: 450, discount:undefined },
      { image: "/keychain3-1.jpg", price: 470, discount: 2 },
      { image: "/keychain3-2.jpg", price: 470, discount: 2 },
      { image: "/keychain3-3.jpg", price: 470, discount: 2 },
      { image: "/keychain3-4.jpg", price: 470, discount: 2 },
      { image: "/keychain3-5.jpg", price: 470, discount: 2 },
     


    ],
    contents: ["Resin Keychain", "Gift Wrap"],
    occasion: ["Gifting", "Party Favors"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–5 days" },
    customization: { available: false },
    material: "Clear resin with glitter & flowers",
    dimensions: "2.5x1 inches",
    weight: "35g",
    careInstructions: "Keep away from direct sunlight",
    specifications: { Color: "Transparent", Style: "Embedded Resin" },
    maxOrderQuantity: 4,
  },
  {
    id: "kc3",
    sku: "KC-CRCH-003",
    name: "Crochet Keychain",
    description: "Handmade crochet keychain with customizable yarn colors.",
    price: 300,
    rating: 4.3,
    reviews: 80,
    discount: 1,
    highlight: "Handcrafted",
    category: "Crochet",
    tags: ["crochet", "handmade", "yarn"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "3 months warranty",
    returnPolicy: "7-day replacement policy",
    image: "/keychain7.jpg",
    variants: [
      { image: "/keychain7.jpg", price: 300, discount: 1 },
      { image: "/keychain7-1.jpg", price: 320, discount: 2 },
      { image: "/keychain7-2.jpg", price: 320, discount: 2 },
      { image: "/keychain7-3.jpg", price: 320, discount: 2 },
      { image: "/keychain7-4.jpg", price: 320, discount: 2 },
      { image: "/keychain7-5.jpg", price: 320, discount: 2 },
      { image: "/keychain7-6.jpg", price: 320, discount: 2 },
      { image: "/keychain7-7.jpg", price: 320, discount: 2 },


    ],
    contents: ["Crochet Keychain"],
    occasion: ["Gifting", "Decor"],
    delivery: { type: "Standard", availability: "Across India", estimated: "2–5 days" },
    customization: { available: true, options: ["Choose Yarn Color"] },
    material: "Cotton yarn",
    dimensions: "3x2 inches",
    weight: "25g",
    careInstructions: "Hand wash gently if needed",
    specifications: { Style: "Crochet", Color: "Customizable" },
    maxOrderQuantity: 10,
  },
  {
    id: "kc4",
    sku: "KC-NAM-004",
    name: "Personalized Name Keychain",
    description: "Customizable keychain featuring your name or initials.",
    price: 500,
    rating: 4.8,
    reviews: 210,
    discount: 5,
    highlight: "Exclusive",
    category: "Personalized",
    tags: ["name", "personalized", "exclusive"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "6 months engraving warranty",
    returnPolicy: "7-day easy returns",
    image: "/keychain1.jpg",
    variants: [
      { image: "/keychain1.jpg", price: 500, discount: 5 },
      { image: "/keychain1-1.jpg", price: 520, discount: 3 },
      { image: "/keychain1-2.jpg", price: 520, discount: 3 },
      { image: "/keychain1-3.jpg", price: 520, discount: 3 },
      { image: "/keychain1-4.jpg", price: 520, discount: 3 },
      { image: "/keychain1-5.jpg", price: 520, discount: 3 },

    ],
    contents: ["Name Keychain"],
    occasion: ["Gifting", "Special Events"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–5 days" },
    customization: { available: true, options: ["Add Name/Initials"] },
    material: "Acrylic with engraved letters",
    dimensions: "3x1 inches",
    weight: "30g",
    careInstructions: "Handle with care",
    specifications: { Color: "Customizable", Style: "Name Engraved" },
    maxOrderQuantity: 6,
  },
  {
    id: "kc5",
    sku: "KC-FSN-005",
    name: "Mini Tassel Keychain",
    description: "Cute tassel keychain adding a stylish touch to your keys.",
    price: 250,
    rating: 4.2,
    reviews: 65,
    discount: undefined,
    highlight: "Trendy",
    category: "Fashion",
    tags: ["tassel", "trendy", "fashion"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "3 months",
    returnPolicy: "7-day returns",
    image: "/keychain2.jpg",
    variants: [
      { image: "/keychain2.jpg", price: 250, discount: undefined },
      { image: "/keychain2-1.jpg", price: 270, discount: 2 },
      { image: "/keychain2-2.jpg", price: 270, discount: 2 },
      { image: "/keychain2-3.jpg", price: 270, discount: 2 },
      { image: "/keychain2-4.jpg", price: 270, discount: 2 },
      { image: "/keychain2-5.jpg", price: 270, discount: 2 },

    ],
    contents: ["Mini Tassel Keychain"],
    occasion: ["Daily Use", "Gifting"],
    delivery: { type: "Standard", availability: "Across India", estimated: "2–4 days" },
    customization: { available: false },
    material: "Synthetic fabric tassel",
    dimensions: "4 inches",
    weight: "20g",
    careInstructions: "Avoid water exposure",
    specifications: { Style: "Tassel", Color: "Assorted" },
    maxOrderQuantity: 12,
  },
  {
    id: "kc6",
    sku: "KC-MTL-006",
    name: "Metal Charm Keychain",
    description: "Stylish metal keychain with engraved charm designs.",
    price: 400,
    rating: 4.5,
    reviews: 110,
    discount: 2,
    highlight: "Elegant",
    category: "Metal",
    tags: ["metal", "charm", "durable"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "12 months rust-free guarantee",
    returnPolicy: "10-day return policy",
    image: "/keychain4.jpg",
    variants: [
      { image: "/keychain4.jpg", price: 400, discount: 2 },
      { image: "/keychain4-1.jpg", price: 420, discount: 2 },
      { image: "/keychain4-2.jpg", price: 420, discount: 2 },
      { image: "/keychain4-3.jpg", price: 420, discount: 2 },
      { image: "/keychain4-4.jpg", price: 420, discount: 2 },
      { image: "/keychain4-5.jpg", price: 420, discount: 2 },

    ],
    contents: ["Metal Charm Keychain"],
    occasion: ["Office Use", "Gifting"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–5 days" },
    customization: { available: false },
    material: "Stainless steel with engraved charm",
    dimensions: "2.5 inches",
    weight: "50g",
    careInstructions: "Polish occasionally",
    specifications: { Finish: "Matte/Glossy", Durability: "High" },
    maxOrderQuantity: 8,
  },
  {
    id: "kc7",
    sku: "KC-WOD-007",
    name: "Hand-painted Wooden Keychain",
    description: "Colorful hand-painted wooden keychain for personalization.",
    price: 480,
    rating: 4.3,
    reviews: 90,
    discount: 4,
    highlight: "Artistic",
    category: "Wooden",
    tags: ["wooden", "painted", "artistic"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "6 months polish warranty",
    returnPolicy: "7-day replacement policy",
    image: "/keychain5.jpg",
    variants: [
      { image: "/keychain5.jpg", price: 480, discount: 4 },
      { image: "/keychain5-1.jpg", price: 500, discount: 2 },
      { image: "/keychain5-2.jpg", price: 500, discount: 2 },
      { image: "/keychain5-3.jpg", price: 500, discount: 2 },
      { image: "/keychain5-4.jpg", price: 500, discount: 2 },
      { image: "/keychain5-5.jpg", price: 500, discount: 2 },

    ],
    contents: ["Hand-painted Wooden Keychain"],
    occasion: ["Decor", "Gifting"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–5 days" },
    customization: { available: true, options: ["Choose Design", "Select Colors"] },
    material: "Wood with acrylic paint",
    dimensions: "3x2 inches",
    weight: "45g",
    careInstructions: "Keep away from water",
    specifications: { Style: "Hand-painted", Finish: "Glossy" },
    maxOrderQuantity: 7,
  },
  
];
