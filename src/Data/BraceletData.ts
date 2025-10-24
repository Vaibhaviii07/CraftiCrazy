// src/Data/BraceletData.ts

export type Variant = {
  image: string;
  price: number;
  discount?: number;
};

export type Bracelet = {
  id: string;
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

export const bracelets: Bracelet[] = [
  {
    id: "b1",
    name: "Beaded Friendship Bracelet",
    description: "Colorful handmade bracelet, perfect for gifting friends. Lightweight, stylish, and full of positive vibes.",
    price: 250,
    rating: 4.6,
    reviews: 120,
    discount: 10,
    highlight: "Handmade",
    category: "Beaded",
    tags: ["friendship", "gift", "handmade", "trending"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "3 months quality guarantee",
    returnPolicy: "7-day easy returns",
    image: "/bracelet1.jpg",
    variants: [
      { image: "/bracelet1.jpg", price: 250, discount: 10 },
      { image: "/bracelet1-1.jpg", price: 270, discount: 5 },
      { image: "/bracelet1-2.jpg", price: 270, discount: 5 },
      { image: "/bracelet1-3.jpg", price: 270, discount: 5 },
      { image: "/bracelet1-4.jpg", price: 270, discount: 5 },

    ],
    contents: ["Beaded Handmade Bracelet", "Gift Box"],
    occasion: ["Friendship Day", "Birthday"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–5 days" },
    customization: { available: true, options: ["Add Name Beads"] },
    material: "Beads, Thread",
    dimensions: "18 cm adjustable",
    weight: "15 g",
    careInstructions: "Avoid water; store in dry place.",
    maxOrderQuantity: 5,
    specifications: {
      Beads: "Premium glass and wooden beads",
      Thread: "Durable cotton thread",
    },
  },
  {
    id: "b2",
    name: "Macrame Charm Bracelet",
    description: "Stylish macrame bracelet with adjustable knot and charms — a trendy addition to casual outfits.",
    price: 320,
    rating: 4.4,
    reviews: 100,
    discount: 15,
    highlight: "Trendy",
    category: "Macrame",
    tags: ["macrame", "charm", "gift", "trendy"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "3 months quality guarantee",
    returnPolicy: "7-day easy returns",
    image: "/bracelet2.jpg",
    variants: [
      { image: "/bracelet2.jpg", price: 320, discount: 15 },
      { image: "/bracelet2-1.jpg", price: 350, discount: 8 },
      { image: "/bracelet2-2.jpg", price: 350, discount: 8 },
      { image: "/bracelet2-3.jpg", price: 350, discount: 8 },
      { image: "/bracelet2-4.jpg", price: 350, discount: 8 },
      { image: "/bracelet2-5.jpg", price: 350, discount: 8 },


    ],
    contents: ["Macrame Bracelet", "Charm Set"],
    occasion: ["Birthday", "Casual Gift"],
    delivery: { type: "Express", availability: "Metro Cities", estimated: "2–4 days" },
    customization: { available: true, options: ["Choose Charm Design"] },
    material: "Cotton Thread, Metal Charms",
    dimensions: "Adjustable 18–22 cm",
    weight: "20 g",
    careInstructions: "Keep away from water; gentle cleaning only.",
    maxOrderQuantity: 5,
    specifications: {
      Charms: "Metal alloy, lightweight",
      Thread: "Durable cotton",
    },
  },
  {
    id: "b3",
    name: "Resin Handmade Bracelet",
    description: "Durable resin bracelet with a handcrafted finish. Artistic and unique, made for style lovers.",
    price: 450,
    rating: 4.7,
    reviews: 90,
    discount: 12,
    highlight: "Artistic",
    category: "Resin",
    tags: ["resin", "handmade", "gift", "artistic"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "6 months durability guarantee",
    returnPolicy: "7-day easy returns",
    image: "/bracelet3.jpg",
    variants: [
      { image: "/bracelet3.jpg", price: 450, discount: 12 },
      { image: "/bracelet3-1.jpg", price: 480, discount: 10 },
      { image: "/bracelet3-2.jpg", price: 480, discount: 10 },
      { image: "/bracelet3-3.jpg", price: 480, discount: 10 },
      { image: "/bracelet3-4.jpg", price: 480, discount: 10 },
      { image: "/bracelet3-5.jpg", price: 480, discount: 10 },


    ],
    contents: ["Resin Handmade Bracelet", "Gift Box"],
    occasion: ["Birthday", "Anniversary"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–6 days" },
    customization: { available: true, options: ["Choose Resin Color"] },
    material: "Resin, Metal",
    dimensions: "18 cm adjustable",
    weight: "25 g",
    careInstructions: "Avoid direct sunlight and water exposure.",
    maxOrderQuantity: 5,
    specifications: {
      Resin: "High-quality epoxy resin",
      Metal: "Alloy connectors",
    },
  },
  {
    id: "b4",
    name: "Thread Woven Bracelet",
    description: "Hand-woven thread bracelet with vibrant colors. A fun and stylish accessory for daily wear.",
    price: 280,
    rating: 4.2,
    reviews: 80,
    discount: 5,
    highlight: "Colorful",
    category: "Thread",
    tags: ["thread", "handmade", "colorful", "gift"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "3 months quality guarantee",
    returnPolicy: "7-day easy returns",
    image: "/bracelet4.jpg",
    variants: [
      { image: "/bracelet4.jpg", price: 280, discount: 5 },
      { image: "/bracelet4-1.jpg", price: 300, discount: 3 },
      { image: "/bracelet4-2.jpg", price: 300, discount: 3 },
      { image: "/bracelet4-3.jpg", price: 300, discount: 3 },
      { image: "/bracelet4-4.jpg", price: 300, discount: 3 },
      { image: "/bracelet4-5.jpg", price: 300, discount: 3 },

    ],
    contents: ["Thread Bracelet", "Adjustable Strap"],
    occasion: ["Friendship Day", "Birthday"],
    delivery: { type: "Standard", availability: "Across India", estimated: "4–7 days" },
    customization: { available: true, options: ["Choose Thread Color"] },
    material: "Cotton Thread",
    dimensions: "18–22 cm adjustable",
    weight: "18 g",
    careInstructions: "Keep dry; avoid stretching.",
    maxOrderQuantity: 5,
    specifications: {
      Thread: "Premium colored cotton",
    },
  },
  {
    id: "b5",
    name: "Charm Anklet Bracelet",
    description: "Delicate bracelet with small charms and handmade finish. Perfect for festive and casual occasions.",
    price: 350,
    rating: 4.5,
    reviews: 95,
    discount: 20,
    highlight: "Delicate",
    category: "Charm",
    tags: ["charm", "handmade", "gift", "festive"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "3 months quality guarantee",
    returnPolicy: "7-day easy returns",
    image: "/bracelet5.jpg",
    variants: [
      { image: "/bracelet5.jpg", price: 350, discount: 20 },
      { image: "/bracelet5-1.jpg", price: 370, discount: 15 },
      { image: "/bracelet5-2.jpg", price: 370, discount: 15 },
      { image: "/bracelet5-3.jpg", price: 370, discount: 15 },
      { image: "/bracelet5-4.jpg", price: 370, discount: 15 },
      { image: "/bracelet5-5.jpg", price: 370, discount: 15 },
      { image: "/bracelet5-6.jpg", price: 370, discount: 15 },
      { image: "/bracelet5-7.jpg", price: 370, discount: 15 },

    ],
    contents: ["Charm Bracelet", "Extra Charms"],
    occasion: ["Birthday", "Festive Gift"],
    delivery: { type: "Standard", availability: "Metro Cities", estimated: "3–5 days" },
    customization: { available: true, options: ["Add Custom Charm"] },
    material: "Alloy, Beads",
    dimensions: "18 cm adjustable",
    weight: "20 g",
    careInstructions: "Avoid water and perfumes; store in box.",
    maxOrderQuantity: 5,
    specifications: {
      Charms: "Mini metal charms",
      Alloy: "Durable lightweight metal",
    },
  },
  {
    id: "b6",
    name: "Couple Matching Bracelet Set",
    description: "Set of two matching bracelets for couples, featuring adjustable straps and engraved initials.",
    price: 650,
    rating: 4.7,
    reviews: 110,
    discount: 22,
    highlight: "Romantic",
    category: "Couple",
    tags: ["couple", "gift", "romantic", "anniversary"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "6 months quality guarantee",
    returnPolicy: "7-day easy returns",
    image: "/bracelet10.jpg",
    variants: [
      { image: "/bracelet10.jpg", price: 650, discount: 22 },
      { image: "/bracelet10-1.jpg", price: 700, discount: 18 },
      { image: "/bracelet10-2.jpg", price: 700, discount: 18 },
      { image: "/bracelet10-3.jpg", price: 700, discount: 18 },
      { image: "/bracelet10-4.jpg", price: 700, discount: 18 },
      { image: "/bracelet10-5.jpg", price: 700, discount: 18 },
      { image: "/bracelet10-6.jpg", price: 700, discount: 18 },

    ],
    contents: ["2 Matching Bracelets", "Gift Box"],
    occasion: ["Valentine’s Day", "Anniversary", "Birthday"],
    delivery: { type: "Express", availability: "Across India", estimated: "2–4 days" },
    customization: { available: true, options: ["Engraved Initials", "Color Choice"] },
    material: "Alloy, Thread",
    dimensions: "18 cm adjustable",
    weight: "40 g",
    careInstructions: "Avoid water and perfumes; store separately.",
    maxOrderQuantity: 5,
    specifications: {
      Alloy: "Durable lightweight metal",
      Thread: "Premium cotton thread",
    },
  },
];
