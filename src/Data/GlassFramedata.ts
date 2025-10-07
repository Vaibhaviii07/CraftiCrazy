
export type Variant = {
  image: string;
  price: number;
  discount?: number;
};

export type GlassFrame = {
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
  occasion?: string[];
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
  maxOrderQuantity?: number;
  specifications?: {
    [key: string]: string;
  };
};

export const glassFrames: GlassFrame[] = [
  {
    id: "gf-1",
    sku: "GF-LUX-001",
    name: "Wedding Keepsake Glass Frame",
    description: "Capture wedding memories elegantly with this premium keepsake frame.",
    price: 2999,
    rating: 5,
    reviews: 120,
    discount: 10,
    highlight: "Luxury",
    category: "Luxury",
    tags: ["luxury", "gift", "wedding", "keepsake"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "7 days replacement guarantee",
    returnPolicy: "7-day easy returns",
    image: "/glass6.jpg",
    variants: [
      { image: "/glass6.jpg", price: 2999 },
      { image: "/glass6-1.jpg", price: 3199, discount: 5 },
      { image: "/glass6-2.jpg", price: 3199, discount: 5 },
      { image: "/glass6-3.jpg", price: 3199, discount: 5 },
    ],
    contents: ["Glass Frame", "Gift Box", "Cleaning Cloth"],
    occasion: ["Weddings", "Anniversaries"],
    delivery: { type: "Home Delivery", availability: "All India", estimated: "3–5 business days" },
    customization: { available: true, options: ["Engrave Name", "Add Message"] },
    material: "Glass, Wood, Acrylic",
    dimensions: "30 x 25 x 5 cm",
    weight: "1.5 kg",
    careInstructions: "Wipe gently with a soft cloth; avoid harsh chemicals.",
    maxOrderQuantity: 5,
    specifications: {
      Frame: "Premium clear glass",
      Backing: "Wooden panel",
      Stand: "Detachable acrylic stand",
    },
  },
  {
    id: "gf-2",
    sku: "GF-MOD-002",
    name: "Modern Minimalist Frame",
    description: "Clean lines and clear glass make this frame a perfect addition to contemporary interiors.",
    price: 1299,
    rating: 4,
    reviews: 80,
    discount: 5,
    highlight: "Discounted",
    category: "Modern",
    tags: ["modern", "gift", "home", "decor"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "7 days replacement guarantee",
    returnPolicy: "7-day easy returns",
    image: "/glass5.jpg",
    variants: [
      { image: "/glass5.jpg", price: 1299 },
      { image: "/glass5-1.jpg", price: 1299 },
      { image: "/glass5-2.jpg", price: 1299 },
      { image: "/glass5-3.jpg", price: 1299 },
    ],
    contents: ["Glass Frame", "Stand"],
    occasion: ["Home Decor", "Office"],
    delivery: { type: "Home Delivery", availability: "Metro Cities", estimated: "3–6 business days" },
    customization: { available: false },
    material: "Glass, Metal Stand",
    dimensions: "25 x 20 x 3 cm",
    weight: "1 kg",
    careInstructions: "Dust with dry cloth; avoid water contact.",
    maxOrderQuantity: 5,
    specifications: {
      Frame: "Tempered glass",
      Stand: "Metal with anti-slip pads",
    },
  },
  {
    id: "gf-3",
    sku: "GF-PER-003",
    name: "Personalized Glass Frame",
    description: "Customize this elegant glass frame with a name or message to make it truly unique.",
    price: 1499,
    rating: 5,
    reviews: 95,
    discount: 15,
    highlight: "Best Seller",
    category: "Personalized",
    tags: ["personalized", "gift", "anniversary", "birthday"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "7 days replacement guarantee",
    returnPolicy: "7-day easy returns",
    image: "/glass7.jpg",
    variants: [
      { image: "/glass7.jpg", price: 1499 },
      { image: "/glass7-1.jpg", price: 1699, discount: 10 },
      { image: "/glass7-2.jpg", price: 1699, discount: 10 },
      { image: "/glass7-3.jpg", price: 1699, discount: 10 },
     

    ],
    contents: ["Glass Frame", "Gift Box", "Engraving Card"],
    occasion: ["Birthdays", "Anniversaries"],
    delivery: { type: "Express", availability: "All India", estimated: "2–4 business days" },
    customization: { available: true, options: ["Engrave Name", "Add Message"] },
    material: "Glass, Wood, Paper",
    dimensions: "28 x 22 x 4 cm",
    weight: "1.3 kg",
    careInstructions: "Clean gently with microfiber cloth; avoid water.",
    maxOrderQuantity: 5,
    specifications: {
      Frame: "Clear glass",
      Engraving: "Laser engraved card",
      Box: "Premium cardboard",
    },
  },
  {
    id: "gf-4",
    sku: "GF-FLT-004",
    name: "Floating Glass Frame",
    description: "This transparent floating frame gives your photo a magical, suspended appearance.",
    price: 1799,
    rating: 4,
    reviews: 70,
    discount: 3,
    highlight: "Luxury",
    category: "Modern",
    tags: ["floating", "glass", "frame", "decor"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "7 days replacement guarantee",
    returnPolicy: "7-day easy returns",
    image: "/glass2.jpg",
    variants: [
      { image: "/glass2.jpg", price: 1799, discount: 7 },
      { image: "/glass2-1.jpg", price: 1899, discount: 5 },
      { image: "/glass2-2.jpg", price: 1899, discount: 5 },
      { image: "/glass2-3.jpg", price: 1899, discount: 5 },

    ],
    contents: ["Floating Glass Frame", "Stand"],
    occasion: ["Home Decor", "Gifting"],
    delivery: { type: "Home Delivery", availability: "All India", estimated: "3–5 business days" },
    customization: { available: false },
    material: "Glass, Acrylic Stand",
    dimensions: "27 x 20 x 4 cm",
    weight: "1.2 kg",
    careInstructions: "Handle with care; wipe with soft cloth only.",
    maxOrderQuantity: 5,
    specifications: {
      Frame: "Clear glass panels",
      Stand: "Acrylic removable",
    },
  },
  {
    id: "gf-5",
    sku: "GF-HRT-005",
    name: "Heart-Shaped Glass Frame",
    description: "A romantic glass frame shaped like a heart — perfect for couples and special occasions.",
    price: 1299,
    rating: 5,
    reviews: 85,
    discount: 10,
    highlight: "Best Seller",
    category: "Personalized",
    tags: ["heart", "romantic", "gift", "valentine"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "7 days replacement guarantee",
    returnPolicy: "7-day easy returns",
    image: "/glass11.jpg",
    variants: [
      { image: "/glass11.jpg", price: 1299, discount: 10 },
      { image: "/glass11-1.jpg", price: 1399, discount: 5 },
      { image: "/glass11-2.jpg", price: 1399, discount: 5 },
      { image: "/glass11-3.jpg", price: 1399, discount: 5 },

    ],
    contents: ["Heart-Shaped Frame", "Gift Box"],
    occasion: ["Valentine's Day", "Anniversaries"],
    delivery: { type: "Express", availability: "All India", estimated: "2–4 business days" },
    customization: { available: true, options: ["Engrave Name", "Add Message"] },
    material: "Glass, Cardboard",
    dimensions: "22 x 22 x 3 cm",
    weight: "1 kg",
    careInstructions: "Keep away from sharp objects; wipe gently.",
    maxOrderQuantity: 5,
    specifications: {
      Frame: "Tempered glass",
      Box: "Premium gift box",
    },
  },
  {
    id: "gf-6",
    sku: "GF-CL-006",
    name: "Classic Clear Glass Frame",
    description: "Simple, elegant, and timeless — a clear glass frame for any occasion.",
    price: 999,
    rating: 4,
    reviews: 65,
    discount: 5,
    highlight: "Classic",
    category: "Classic",
    tags: ["classic", "gift", "glass", "decor"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "7 days replacement guarantee",
    returnPolicy: "7-day easy returns",
    image: "/glass1.jpg",
    variants: [
      { image: "/glass1.jpg", price: 999 },
      { image: "/glass1-1.jpg", price: 1099, discount: 5 },
      { image: "/glass1-2.jpg", price: 1099, discount: 5 },
      { image: "/glass1-3.jpg", price: 1099, discount: 5 },


    ],
    contents: ["Glass Frame", "Stand"],
    occasion: ["Home Decor", "Office"],
    delivery: { type: "Home Delivery", availability: "All India", estimated: "3–5 business days" },
    customization: { available: false },
    material: "Glass, Metal Stand",
    dimensions: "25 x 20 x 3 cm",
    weight: "1 kg",
    careInstructions: "Dust with dry cloth; avoid water.",
    maxOrderQuantity: 5,
    specifications: {
      Frame: "Clear glass",
      Stand: "Metal support",
    },
  },
  {
    id: "gf-7",
    sku: "GF-ROM-007",
    name: "Romantic Couple Glass Frame",
    description: "Perfect gift for couples — a beautiful frame for romantic memories.",
    price: 1499,
    rating: 5,
    reviews: 90,
    discount: 10,
    highlight: "Romantic",
    category: "Romantic",
    tags: ["couple", "romantic", "gift", "anniversary"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "7 days replacement guarantee",
    returnPolicy: "7-day easy returns",
    image: "/glass8.jpg",
    variants: [
      { image: "/glass8.jpg", price: 1499 },
      { image: "/glass8-1.jpg", price: 1599, discount: 5 },
      { image: "/glass8-2.jpg", price: 1599, discount: 5 },
      { image: "/glass8-3.jpg", price: 1599, discount: 5 },
      { image: "/glass8-4.jpg", price: 1599, discount: 5 },

    ],
    contents: ["Glass Frame", "Gift Box"],
    occasion: ["Anniversaries", "Valentine"],
    delivery: { type: "Express", availability: "All India", estimated: "2–4 business days" },
    customization: { available: true, options: ["Add Photo", "Engrave Message"] },
    material: "Glass, Cardboard",
    dimensions: "25 x 20 x 3 cm",
    weight: "1.2 kg",
    careInstructions: "Clean with microfiber cloth; avoid water contact.",
    maxOrderQuantity: 5,
    specifications: {
      Frame: "Tempered glass",
      Box: "Premium gift box",
    },
  },
  {
    id: "gf-8",
    sku: "GF-LUV-008",
    name: "Love Forever Glass Frame",
    description: "A beautiful glass frame for capturing everlasting love moments.",
    price: 1699,
    rating: 5,
    reviews: 75,
    discount: 7,
    highlight: "Love",
    category: "Romantic",
    tags: ["love", "gift", "glass", "couple"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "7 days replacement guarantee",
    returnPolicy: "7-day easy returns",
    image: "/glass9.jpg",
    variants: [
      { image: "/glass9.jpg", price: 1699 },
      { image: "/glass9-1.jpg", price: 1799, discount: 5 },
      { image: "/glass9-2.jpg", price: 1799, discount: 5 },
      { image: "/glass9-3.jpg", price: 1799, discount: 5 },
      


    ],
    contents: ["Glass Frame", "Gift Box"],
    occasion: ["Anniversaries", "Valentine"],
    delivery: { type: "Home Delivery", availability: "All India", estimated: "3–5 business days" },
    customization: { available: true, options: ["Engrave Name"] },
    material: "Glass, Cardboard",
    dimensions: "26 x 22 x 3 cm",
    weight: "1.3 kg",
    careInstructions: "Clean gently with microfiber cloth.",
    maxOrderQuantity: 5,
    specifications: {
      Frame: "Tempered glass",
      Box: "Premium quality",
    },
  },
  {
    id: "gf-9",
    sku: "GF-FAM-009",
    name: "Family Moments Glass Frame",
    description: "Showcase your cherished family memories with this elegant glass frame.",
    price: 1999,
    rating: 5,
    reviews: 85,
    discount: 10,
    highlight: "Family",
    category: "Classic",
    tags: ["family", "gift", "glass", "home"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "7 days replacement guarantee",
    returnPolicy: "7-day easy returns",
    image: "/glass10.jpg",
    variants: [
      { image: "/glass10.jpg", price: 1999 },
      { image: "/glass10-1.jpg", price: 2099, discount: 5 },
      { image: "/glass10-2.jpg", price: 2099, discount: 5 },
      { image: "/glass10-3.jpg", price: 2099, discount: 5 },

    ],
    contents: ["Glass Frame", "Stand", "Gift Box"],
    occasion: ["Home Decor", "Family"],
    delivery: { type: "Home Delivery", availability: "All India", estimated: "3–5 business days" },
    customization: { available: true, options: ["Engrave Family Name"] },
    material: "Glass, Wood, Cardboard",
    dimensions: "28 x 22 x 4 cm",
    weight: "1.5 kg",
    careInstructions: "Wipe gently with soft cloth.",
    maxOrderQuantity: 5,
    specifications: {
      Frame: "Tempered glass",
      Stand: "Wooden",
      Box: "Premium gift box",
    },
  },
  {
    id: "gf-10",
    sku: "GF-MEM-010",
    name: "Memory Lane Glass Frame",
    description: "Perfect for preserving precious memories, this frame is elegant and timeless.",
    price: 2199,
    rating: 5,
    reviews: 95,
    discount: 12,
    highlight: "Memorable",
    category: "Luxury",
    tags: ["memories", "gift", "glass", "luxury"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "7 days replacement guarantee",
    returnPolicy: "7-day easy returns",
    image: "/glass3.jpg",
    variants: [
      { image: "/glass3.jpg", price: 2199 },
      { image: "/glass3-1.jpg", price: 2299, discount: 5 },
      { image: "/glass3-2.jpg", price: 2399, discount: 10 },
      { image: "/glass3-3.jpg", price: 2399, discount: 10 },
      { image: "/glass3-4.jpg", price: 2399, discount: 10 },
      { image: "/glass3-5.jpg", price: 2399, discount: 10 },


    ],
    contents: ["Glass Frame", "Gift Box", "Stand"],
    occasion: ["Anniversaries", "Birthdays"],
    delivery: { type: "Home Delivery", availability: "All India", estimated: "3–5 business days" },
    customization: { available: true, options: ["Engrave Name", "Add Message"] },
    material: "Glass, Wood, Acrylic",
    dimensions: "30 x 25 x 5 cm",
    weight: "1.5 kg",
    careInstructions: "Clean with microfiber cloth only; handle with care.",
    maxOrderQuantity: 5,
    specifications: {
      Frame: "Tempered glass",
      Stand: "Acrylic detachable",
      Box: "Premium gift box",
    },
  },
];
