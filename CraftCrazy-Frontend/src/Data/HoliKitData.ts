// src/Data/HoliKitData.ts

export type Variant = {
  image: string;
  price: number;
  discount?: number;
};

export type HoliKit = {
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

export const holiKits: HoliKit[] = [
  {
    id: "hk1",
    sku: "HK-VIB-001",
    name: "Vibrant Holi Celebration Kit",
    description:
      "A premium Holi kit filled with organic colors, water balloons, and festive treats for a colorful celebration.",
    price: 1299,
    rating: 4.8,
    reviews: 220,
    discount: 10,
    highlight: "Best Seller",
    category: "Festival",
    tags: ["Holi", "colors", "organic", "celebration"],
    brand: "CraftiCrazy",
    seller: "Handcrafted by CraftiCrazy",
    inStock: true,
    warranty: "Not Applicable",
    returnPolicy: "Replacement only for damaged items",
    image: "/holi1.jpg",
    variants: [
      { image: "/holi1.jpg", price: 1299 },
      { image: "/holi1-1.jpg", price: 1350, discount: 10 },
      { image: "/holi1-2.jpg", price: 1350, discount: 10 },
      { image: "/holi1-3.jpg", price: 1350, discount: 10 },
      { image: "/holi1-4.jpg", price: 1350, discount: 10 },

    ],
    contents: [
      "Organic Gulal (5 colors)",
      "Water Balloons Pack",
      "Mini Pichkari",
      "Sweet Treat Box",
      "Decorative Basket",
    ],
    delivery: {
      type: "Standard",
      availability: "Across India",
      estimated: "3–5 days",
    },
    customization: { available: true, options: ["Custom Message Tag", "Gift Wrap"] },
    material: "Eco-friendly packaging",
    dimensions: "12 x 10 x 6 inches",
    weight: "1.2 kg",
    careInstructions: "Store in a dry place away from moisture.",
    specifications: { Type: "Organic", Theme: "Vibrant Festive" },
  },


  {
    id: "hk2",
    sku: "HK-LUX-002",
    name: "Luxury Holi Gift Box",
    description:
      "A luxurious Holi gift set including organic colors, sweets, perfume spray, and eco-friendly accessories.",
    price: 1999,
    rating: 4.9,
    reviews: 150,
    discount: 12,
    highlight: "Luxury Edition",
    category: "Premium",
    tags: ["luxury", "gift", "holi", "premium"],
    brand: "CraftiCrazy",
    seller: "Handcrafted by CraftiCrazy",
    inStock: true,
    warranty: "Not Applicable",
    returnPolicy: "Replacement only for damaged items",
    image: "/holi2.jpg",
    variants: [
      { image: "/holi2.jpg", price: 1999 },
      { image: "/holi2-1.jpg", price: 2100, discount: 12 },
      { image: "/holi2-2.jpg", price: 2100, discount: 12 },
      { image: "/holi2-3.jpg", price: 2100, discount: 12 },
    ],
    contents: [
      "Organic Colors Set",
      "Fragrance Spray (50ml)",
      "Handmade Sweets Box",
      "Eco Pichkari",
      "Luxury Gift Box Packaging",
    ],
    delivery: {
      type: "Express",
      availability: "Across India",
      estimated: "2–4 days",
    },
    customization: { available: true, options: ["Add Name Label", "Select Color Theme"] },
    material: "Hardboard Box + Eco Decor",
    dimensions: "15 x 12 x 5 inches",
    weight: "1.6 kg",
    careInstructions: "Wipe clean; store in cool place.",
    specifications: { Type: "Luxury", ColorScheme: "Gold & Multicolor" },
  },

  {
    id: "hk3",
    sku: "HK-KID-003",
    name: "Kids Fun Holi Kit",
    description:
      "Fun-filled Holi kit designed especially for kids — safe, colorful, and joyful!",
    price: 999,
    rating: 4.6,
    reviews: 130,
    discount: 5,
    highlight: "Kids Favorite",
    category: "Kids",
    tags: ["kids", "fun", "safe", "holi"],
    brand: "CraftiCrazy",
    seller: "Handcrafted by CraftiCrazy",
    inStock: true,
    warranty: "Not Applicable",
    returnPolicy: "Replacement only for damaged items",
    image: "/holi3.jpg",
    variants: [
      { image: "/holi3.jpg", price: 999 },
      { image: "/holi3-1.jpg", price: 1050, discount: 5 },
      { image: "/holi3-2.jpg", price: 1050, discount: 5 },
      { image: "/holi3-3.jpg", price: 1050, discount: 5 },
    ],
    contents: [
      "Safe Herbal Colors (4 shades)",
      "Mini Water Gun",
      "Water Balloons Pack",
      "Candy Box",
      "Kid-Friendly Gift Basket",
    ],
    delivery: {
      type: "Standard",
      availability: "Across India",
      estimated: "3–6 days",
    },
    customization: { available: true, options: ["Name Label", "Cartoon Stickers"] },
    material: "Plastic-free packaging",
    dimensions: "11 x 9 x 4 inches",
    weight: "900g",
    careInstructions: "Avoid direct contact with eyes.",
    specifications: { Type: "Kids", SafeFor: "3+ years" },
  },
];
