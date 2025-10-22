// src/Data/WeddingHamperData.ts

export type Variant = {
  image: string;
  price: number;
  discount?: number;
};

export type WeddingHamper = {
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

export const weddingHampers: WeddingHamper[] = [
  {
    id: "wh-1",
    sku: "WH-LUX-001",
    name: "Royal Wedding Hamper",
    description: "Celebrate the big day with an opulent hamper featuring premium champagne, artisanal chocolates, and fresh exotic flowers — the perfect gift for newlyweds.",
    price: 5999,
    rating: 5,
    reviews: 120,
    discount: 20,
    highlight: "Luxury",
    category: "Luxury",
    tags: ["luxury", "gift", "wedding", "premium"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "7 days replacement guarantee",
    returnPolicy: "7-day easy returns",
    image: "/wedding11.jpg",
    variants: [
      { image: "/wedding11.jpg", price: 5999 },
      { image: "/wedding11-1.jpg", price: 6299, discount: 5 },
      { image: "/wedding11-2.jpg", price: 6299, discount: 5 },
      { image: "/wedding11-3.jpg", price: 6299, discount: 5 },
      { image: "/wedding11-4.jpg", price: 6299, discount: 5 },
    ],
    contents: ["Premium Champagne", "Artisanal Chocolates", "Exotic Flowers"],
    occasion: ["Wedding", "Anniversary"],
    delivery: { type: "Home Delivery", availability: "All India", estimated: "3–5 business days" },
    customization: { available: true, options: ["Gift Wrap", "Personal Message"] },
    material: "Champagne, Chocolates, Flowers, Gift Box",
    dimensions: "35 x 25 x 15 cm",
    weight: "2.5 kg",
    careInstructions: "Keep champagne upright; chocolates in cool place; flowers fresh.",
    maxOrderQuantity: 5,
    specifications: {
      Champagne: "Premium vintage 750ml",
      Chocolates: "Artisanal assorted 200g",
      Flowers: "Exotic fresh flowers, assorted",
    },
  },
  {
    id: "wh-2",
    sku: "WH-SWT-002",
    name: "Sweet Togetherness Hamper",
    description: "A delightful collection of gourmet cookies, handcrafted chocolates, and scented candles — crafted to celebrate love and sweetness.",
    price: 2999,
    rating: 4,
    reviews: 95,
    discount: 15,
    highlight: "Sweet",
    category: "Foodie",
    tags: ["sweet", "gift", "wedding", "chocolates"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "7 days replacement guarantee",
    returnPolicy: "7-day easy returns",
    image: "/wedding4.jpg",
    variants: [
      { image: "/wedding4.jpg", price: 2999 },
      { image: "/wedding4-1.jpg", price: 3099, discount: 5 },
      { image: "/wedding4-2.jpg", price: 3199, discount: 5 },
      { image: "/wedding4-3.jpg", price: 3299, discount: 5 },
    ],
    contents: ["Gourmet Cookies", "Handcrafted Chocolates", "Scented Candles"],
    occasion: ["Wedding"],
    delivery: { type: "Home Delivery", availability: "All India", estimated: "3–5 business days" },
    customization: { available: true, options: ["Personal Message"] },
    material: "Cookies, Chocolates, Wax, Packaging",
    dimensions: "30 x 20 x 12 cm",
    weight: "1.5 kg",
    careInstructions: "Store cookies and chocolates in cool dry place; candles away from heat.",
    maxOrderQuantity: 5,
    specifications: {
      Cookies: "Gourmet assorted 200g",
      Chocolates: "Handcrafted assorted 150g",
      Candles: "Scented 2 pcs",
    },
  },
  {
    id: "wh-3",
    sku: "WH-TRD-003",
    name: "Traditional Blessings Hamper",
    description: "Bring joy with this cultural hamper featuring dry fruits, silver-coated sweets, and a handcrafted diya — a token of blessings and prosperity.",
    price: 3499,
    rating: 5,
    reviews: 80,
    discount: 10,
    highlight: "Traditional",
    category: "Traditional",
    tags: ["traditional", "gift", "wedding", "blessings"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "7 days replacement guarantee",
    returnPolicy: "7-day easy returns",
    image: "/wedding5.jpg",
    variants: [
      { image: "/wedding5.jpg", price: 3499 },
      { image: "/wedding5-1.jpg", price: 3599, discount: 5 },
      { image: "/wedding5-2.jpg", price: 3699, discount: 5 },
      { image: "/wedding5-3.jpg", price: 3799, discount: 5 },
    ],
    contents: ["Dry Fruits", "Silver-Coated Sweets", "Handcrafted Diya"],
    occasion: ["Wedding", "Blessings"],
    delivery: { type: "Home Delivery", availability: "All India", estimated: "3–5 business days" },
    customization: { available: false },
    material: "Dry Fruits, Silver Sweets, Clay, Packaging",
    dimensions: "28 x 18 x 12 cm",
    weight: "1.8 kg",
    careInstructions: "Store sweets in cool, dry place; handle diya carefully.",
    maxOrderQuantity: 5,
    specifications: {
      "Dry Fruits": "Premium mix, 250g",
      "Silver-Coated Sweets": "Assorted 150g",
      "Diya": "Handcrafted clay, painted",
    },
  },
  {
    id: "wh-4",
    sku: "WH-PRSN-004",
    name: "Elegant Couple Hamper",
    description: "A thoughtful hamper with personalized mugs, a couple photo frame, and artisanal chocolates — designed to cherish togetherness.",
    price: 2499,
    rating: 4,
    reviews: 70,
    discount: 5,
    highlight: "Personalized",
    category: "Personalized",
    tags: ["couple", "gift", "personalized", "wedding"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "7 days replacement guarantee",
    returnPolicy: "7-day easy returns",
    image: "/wedding6.jpg",
    variants: [
      { image: "/wedding6.jpg", price: 2499 },
      { image: "/wedding6-1.jpg", price: 2599, discount: 5 },
      { image: "/wedding6-2.jpg", price: 2699, discount: 5 },
      { image: "/wedding6-3.jpg", price: 2799, discount: 5 },
    ],
    contents: ["Personalized Mugs", "Couple Photo Frame", "Chocolates"],
    occasion: ["Wedding", "Anniversary", "Couple Gift"],
    delivery: { type: "Home Delivery", availability: "All India", estimated: "2–4 business days" },
    customization: { available: true, options: ["Name Engraving", "Message Card", "Customized Gift"] },
    material: "Ceramic, Wood, Chocolates, Cardboard",
    dimensions: "28 x 20 x 12 cm",
    weight: "1.5 kg",
    careInstructions: "Handle mugs and frame with care; chocolates in cool place.",
    maxOrderQuantity: 5,
    specifications: {
      Mugs: "Ceramic, 300ml, customizable",
      "Photo Frame": "Wooden, 4x6 inch",
      Chocolates: "Assorted, 150g",
    },
  },
  {
    id: "wh-5",
    sku: "WH-SPA-005",
    name: "Luxury Spa Hamper",
    description: "Pamper the couple with luxury spa essentials, aromatic oils, and skincare treats — the perfect way to unwind post-wedding celebrations.",
    price: 4499,
    rating: 5,
    reviews: 90,
    discount: 15,
    highlight: "Wellness",
    category: "Wellness",
    tags: ["spa", "gift", "wellness", "wedding"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "7 days replacement guarantee",
    returnPolicy: "7-day easy returns",
    image: "/wedding1.jpg",
    variants: [
      { image: "/wedding1.jpg", price: 4499 },
      { image: "/wedding1-1.jpg", price: 4599, discount: 5 },
      { image: "/wedding1-2.jpg", price: 4699, discount: 5 },
      { image: "/wedding1-3.jpg", price: 4799, discount: 5 },
      { image: "/wedding1-4.jpg", price: 4899, discount: 5 },
    ],
    contents: ["Aromatic Oils", "Skincare Products", "Luxury Spa Set"],
    occasion: ["Wedding", "Wellness"],
    delivery: { type: "Home Delivery", availability: "All India", estimated: "3–5 business days" },
    customization: { available: false },
    material: "Oils, Creams, Bath Salts, Packaging",
    dimensions: "32 x 22 x 15 cm",
    weight: "2.0 kg",
    careInstructions: "Keep products in cool dry place; avoid moisture.",
    maxOrderQuantity: 5,
    specifications: {
      Oils: "Assorted aromatic oils, 100ml each",
      "Skincare Products": "Luxury creams and lotions, 150g",
      "Spa Set": "Bath salts, bath bomb, scented candles",
    },
  },
  {
    id: "wh-6",
    sku: "WH-ROM-006",
    name: "Couple’s Romantic Delight",
    description: "Surprise the lovebirds with premium wine, scented candles, and gourmet chocolates — a hamper that celebrates romance.",
    price: 3999,
    rating: 5,
    reviews: 85,
    discount: 10,
    highlight: "Romantic",
    category: "Romantic",
    tags: ["romantic", "gift", "couple", "wedding"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "7 days replacement guarantee",
    returnPolicy: "7-day easy returns",
    image: "/wedding7.jpg",
    variants: [
      { image: "/wedding7.jpg", price: 3999 },
      { image: "/wedding7-1.jpg", price: 4099, discount: 5 },
      { image: "/wedding7-2.jpg", price: 4199, discount: 5 },
      { image: "/wedding7-3.jpg", price: 4299, discount: 5 },
      { image: "/wedding7-4.jpg", price: 4399, discount: 5 },
    ],
    contents: ["Premium Wine", "Scented Candles", "Gourmet Chocolates"],
    occasion: ["Anniversary", "Valentine", "Wedding"],
    delivery: { type: "Home Delivery", availability: "All India", estimated: "2–4 business days" },
    customization: { available: true, options: ["Personal Note"] },
    material: "Wine, Wax, Chocolates, Packaging",
    dimensions: "30 x 20 x 12 cm",
    weight: "1.8 kg",
    careInstructions: "Store wine upright; chocolates in cool place; candles away from heat.",
    maxOrderQuantity: 5,
    specifications: {
      Wine: "Premium red wine 750ml",
      Candles: "Scented 2 pcs",
      Chocolates: "Gourmet assorted 150g",
    },
  },
  {
    id: "wh-7",
    sku: "WH-MOD-007",
    name: "Modern Wedding Hamper",
    description: "A stylish collection featuring trendy accessories, elegant perfumes, and a designer gift box — curated for modern celebrations.",
    price: 4999,
    rating: 5,
    reviews: 100,
    discount: 15,
    highlight: "Modern Luxury",
    category: "Luxury",
    tags: ["modern", "gift", "wedding", "premium"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "7 days replacement guarantee",
    returnPolicy: "7-day easy returns",
    image: "/wedding8.jpg",
    variants: [
      { image: "/wedding8.jpg", price: 4999 },
      { image: "/wedding8-1.jpg", price: 5299, discount: 6 },
      { image: "/wedding8-2.jpg", price: 5299, discount: 6 },
      { image: "/wedding8-3.jpg", price: 5299, discount: 6 },
      { image: "/wedding8-4.jpg", price: 5299, discount: 6 },
    ],
    contents: ["Trendy Accessories", "Elegant Perfume", "Designer Gift Box"],
    occasion: ["Wedding", "Luxury Gift"],
    delivery: { type: "Home Delivery", availability: "All India", estimated: "3–5 business days" },
    customization: { available: true, options: ["Gift Box Choice"] },
    material: "Accessories, Perfume, Packaging Box",
    dimensions: "32 x 22 x 15 cm",
    weight: "2.0 kg",
    careInstructions: "Keep accessories and perfume in cool dry place.",
    maxOrderQuantity: 5,
    specifications: {
      Accessories: "Trendy items, assorted",
      Perfume: "Elegant fragrance, 50ml",
      "Gift Box": "Designer quality",
    },
  },
  {
    id: "wh-8",
    sku: "WH-DRY-008",
    name: "Classic Dry Fruit Hamper",
    description: "A traditional and healthy gift — premium dry fruits packed in a luxurious wooden box, perfect for blessings and prosperity.",
    price: 2499,
    rating: 4,
    reviews: 60,
    discount: 10,
    highlight: "Healthy & Classic",
    category: "Traditional",
    tags: ["dry fruits", "gift", "wedding", "traditional"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "7 days replacement guarantee",
    returnPolicy: "7-day easy returns",
    image: "/wedding9.jpg",
    variants: [
      { image: "/wedding9.jpg", price: 2499 },
      { image: "/wedding9-1.jpg", price: 2499, discount: 6 },
      { image: "/wedding9-2.jpg", price: 2499, discount: 6 },
      { image: "/wedding9-3.jpg", price: 2499, discount: 6 },
      { image: "/wedding9-4.jpg", price: 2499, discount: 6 },
    ],
    contents: ["Premium Dry Fruits", "Luxury Wooden Box"],
    occasion: ["Wedding", "Blessings", "Traditional"],
    delivery: { type: "Home Delivery", availability: "All India", estimated: "3–5 business days" },
    customization: { available: false },
    material: "Dry Fruits, Wooden Box, Packaging",
    dimensions: "28 x 18 x 12 cm",
    weight: "1.7 kg",
    careInstructions: "Store dry fruits in cool dry place; keep box safe.",
    maxOrderQuantity: 5,
    specifications: {
      "Dry Fruits": "Premium mix 250g",
      "Wooden Box": "Luxury quality, handcrafted",
    },
  },
];
