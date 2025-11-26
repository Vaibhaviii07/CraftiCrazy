
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
    name: "3D Miniature Frame",
    description: "Capture memories elegantly with this premium Miniature frame.",
    price: 600,
    discount: undefined,
    highlight: "Luxury",
    category: "Luxury",
    tags: ["luxury", "gift", "wedding", "Miniature"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "7 days replacement guarantee",
    returnPolicy: "7-day easy returns",
    image: "/miniature1.jpeg",
    variants: [
      { image: "/miniature1.jpeg", price: 600 },
      { image: "/miniature2.jpeg", price: 600,  },
      { image: "/miniature3.jpeg", price: 600,  },
    ],
    contents: ["Glass Frame", "Gift Box", "Cleaning Cloth"],
    occasion: ["Weddings", "Anniversaries"],
    delivery: { type: "Home Delivery", availability: "All India", estimated: "3–5 business days" },
    customization: { available: true, options: ["Customization on your demand"] },
    material: "Glass, Wood",
    dimensions: "A4 Size (12*8 inch)",
    weight: "1.5 kg",
    careInstructions: "Wipe gently with a soft cloth; avoid harsh chemicals.",
    maxOrderQuantity: 5,
    specifications: {
      Frame: "Premium clear glass",
      Backing: "Wooden panel",
      Stand: "Detachable wooden/plastic stand",
    },
  },
  {
    id: "gf-2",
    sku: "GF-MOD-002",
    name: "Modern Minimalist Frame",
    description: "Clean lines and clear glass make this frame a perfect addition to contemporary interiors.",
    price: 90,
    discount: undefined,
    highlight: "Discounted",
    category: "Modern",
    tags: ["modern", "gift", "home", "decor"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "7 days replacement guarantee",
    returnPolicy: "7-day easy returns",
    image: "/frame4i-3.jpeg",
    variants: [
      { image: "/frame4i-2.jpeg", price: 90 },
      { image: "/frame4i-1.jpeg", price: 90 },
      { image: "/frame4i-3.jpeg", price: 90 },
      { image: "/frame4i-4.jpeg", price: 90 },
      { image: "/frame5i-1.jpeg", price: 180 },
      { image: "/frame5i-2.jpeg", price: 180 },
      { image: "/frame5i-3.jpeg", price: 180 },
      

    ],
    contents: ["Glass Frame", "Stand"],
    occasion: ["Home Decor", "Office"],
    delivery: { type: "Home Delivery", availability: "Metro Cities", estimated: "3–6 business days" },
    customization: { available: false },
    material: "Glass, Metal Stand",
    dimensions: "4*4 inch/5*7 inch",
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
    price: 300,
    discount: undefined,
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
      { image: "/glass7.jpg", price: 300 },
      { image: "/glass7-1.jpg", price: 300, },
      { image: "/glass7-2.jpg", price: 300,  },
      { image: "/glass7-3.jpg", price: 300,  },
     

    ],
    contents: ["Glass Frame", "Gift Box", "Engraving Card"],
    occasion: ["Birthdays", "Anniversaries"],
    delivery: { type: "Express", availability: "All India", estimated: "2–4 business days" },
    customization: { available: true, options: ["Customization on your demand"] },
    material: "Glass, Wood, Paper",
    dimensions: "4*4 inch/5*7 inch",
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
    discount: undefined,
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
      { image: "/glass2.jpg", price: 1799 },
      { image: "/glass2-1.jpg", price: 1899 },
      { image: "/glass2-2.jpg", price: 1899 },
      { image: "/glass2-3.jpg", price: 1899 },

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
    sku: "GF-CL-006",
    name: "Classic Clear Glass Frame",
    description: "Simple, elegant, and timeless — a clear glass frame for any occasion.",
    price: 999,
    discount: undefined,
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
      { image: "/glass1-1.jpg", price: 1099, },
      { image: "/glass1-2.jpg", price: 1099 },
      { image: "/glass1-3.jpg", price: 1099 },


    ],
    contents: ["Glass Frame", "Stand"],
    occasion: ["Home Decor", "Office"],
    delivery: { type: "Home Delivery", availability: "All India", estimated: "3–5 business days" },
    customization: { available: true, options: ["Customization on your demand"] },
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
    id: "gf-6",
    sku: "GF-FAM-009",
    name: "A4 Sized Glass Frame",
    description: "Showcase your memories with this elegant glass frame.",
    price: 200,
    discount: undefined,
    highlight: "Family",
    category: "Classic",
    tags: ["family", "gift", "glass", "home"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "7 days replacement guarantee",
    returnPolicy: "7-day easy returns",
    image: "/frame12i-1.jpeg",
    variants: [
      { image: "/frame12i-1.jpeg", price: 200 },
      { image: "/frame12i-2.jpeg", price: 200 },
      { image: "/frame12i-3.jpeg", price: 200 },
      { image: "/frame12i-4.jpeg", price: 200},
      { image: "/frame12i-5.jpeg", price: 200},
      { image: "/frame12i-6.jpeg", price: 200},

    ],
    contents: ["Glass Frame", "Stand", "Gift Box"],
    occasion: ["Home Decor", "Family"],
    delivery: { type: "Home Delivery", availability: "All India", estimated: "3–5 business days" },
    customization: { available: true, options: ["Customization on your demand"]  },
    material: "Glass, Wood, Cardboard",
    dimensions: "A4 Sized (12*8)",
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
    id: "gf-7",
    sku: "GF-MEM-010",
    name: "Lighting Glass Frame",
    description: "Perfect for preserving precious memories, this Lighting frame is elegant and timeless.",
    price: 600,
    discount: undefined,
    highlight: "Memorable",
    category: "Luxury",
    tags: ["memories", "gift", "glass", "luxury"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "7 days replacement guarantee",
    returnPolicy: "7-day easy returns",
    image: "/light-1.jpeg",
    variants: [
      { image: "/light-1.jpeg", price: 600 },
      { image: "/light-2.jpeg", price: 600 },
      { image: "/light-3.jpeg", price: 600},
      { image: "/light-4.jpeg", price: 600 },
      { image: "/light-5.jpeg", price: 600 },
      { image: "/light-6.jpeg", price: 600 },
      { image: "/light-7.jpeg", price: 600 },
      { image: "/light-8.jpeg", price: 600 },



    ],
    contents: ["Glass Frame", "Gift Box", "Stand","Lighting"],
    occasion: ["Anniversaries", "Birthdays"],
    delivery: { type: "Home Delivery", availability: "All India", estimated: "3–5 business days" },
    customization: { available: true, options: ["Customization on your demand"] },
    material: "Glass, Wood, Acrylic",
    dimensions: "A4 Sized (12*8)",
    weight: "1.5 kg",
    careInstructions: "Clean with microfiber cloth only; handle with care.",
    maxOrderQuantity: 5,
    specifications: {
      Frame: "Tempered glass",
      Stand: "Acrylic detachable",
      Box: "Premium gift box",
    },
    
  },
   {
    id: "gf-8",
    sku: "GF-MEM-010",
    name: "Memory Lane Glass Frame",
    description: "Perfect for preserving precious memories, this frame is elegant and timeless.",
    price: 200,
    discount: undefined,
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
      { image: "/glass3.jpg", price: 200 },
      { image: "/glass3-2.jpg", price: 200 },
      { image: "/glass3-3.jpg", price: 200 },
      { image: "/glass3-4.jpg", price: 200 },
      { image: "/glass3-5.jpg", price: 200 },


    ],
    contents: ["Glass Frame", "Gift Box", "Stand"],
    occasion: ["Anniversaries", "Birthdays"],
    delivery: { type: "Home Delivery", availability: "All India", estimated: "3–5 business days" },
    customization: { available: true, options: ["Customization on your demand"] },
    material: "Glass, Wood, Acrylic",
    dimensions: "A4 Sized (12*8)",
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
