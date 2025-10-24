export type Variant = {
  image: string;
  price: number;
  discount?: number;
};

export type RakhiKit = {
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

export const rakhiKits: RakhiKit[] = [
  {
    id: "rk1",
    sku: "RK-TRD-001",
    name: "Traditional Rakhi Celebration Kit",
    description:
      "Celebrate Raksha Bandhan with a traditional kit including rakhis, sweets, and festive accessories.",
    price: 799,
    rating: 4.7,
    reviews: 180,
    discount: 10,
    highlight: "Best Seller",
    category: "Festival",
    tags: ["rakhi", "traditional", "sweets", "celebration"],
    brand: "CraftiCrazy",
    seller: "Handcrafted by CraftiCrazy",
    inStock: true,
    warranty: "Not Applicable",
    returnPolicy: "Replacement only for damaged items",
    image: "/rakhi1.jpg",
    variants: [
      { image: "/rakhi1.jpg", price: 799 },
      { image: "/rakhi1-1.jpg", price: 850, discount: 10 },
      { image: "/rakhi1-2.jpg", price: 850, discount: 10 },
      { image: "/rakhi1-3.jpg", price: 850, discount: 10 },


    ],
    contents: [
      "Set of 3 Traditional Rakhis",
      "Mini Sweets Box",
      "Decorative Thali",
      "Roli & Chawal Pack",
    ],
    delivery: {
      type: "Standard",
      availability: "Across India",
      estimated: "3–5 days",
    },
    customization: { available: true, options: ["Add Name Tag", "Gift Wrap"] },
    material: "Cotton Thread + Eco Packaging",
    dimensions: "10 x 8 x 4 inches",
    weight: "700g",
    careInstructions: "Keep in dry place.",
    specifications: { Type: "Traditional", Theme: "Festive" },
  },

  {
    id: "rk2",
    sku: "RK-LUX-002",
    name: "Luxury Rakhi Gift Box",
    description:
      "A premium Rakhi kit with designer rakhis, dry fruits, and luxurious gift box packaging.",
    price: 1499,
    rating: 4.9,
    reviews: 140,
    discount: 12,
    highlight: "Luxury Edition",
    category: "Premium",
    tags: ["luxury", "gift", "rakhi", "premium"],
    brand: "CraftiCrazy",
    seller: "Handcrafted by CraftiCrazy",
    inStock: true,
    warranty: "Not Applicable",
    returnPolicy: "Replacement only for damaged items",
    image: "/rakhi2.jpg",
    variants: [
      { image: "/rakhi2.jpg", price: 1499 },
      { image: "/rakhi2-1.jpg", price: 1600, discount: 12 },
      { image: "/rakhi2-2.jpg", price: 1600, discount: 12 },
      { image: "/rakhi2-3.jpg", price: 1600, discount: 12 },

    ],
    contents: [
      "Set of 3 Designer Rakhis",
      "Premium Dry Fruits Pack",
      "Luxury Gift Box",
      "Roli & Chawal",
    ],
    delivery: {
      type: "Express",
      availability: "Across India",
      estimated: "2–4 days",
    },
    customization: { available: true, options: ["Add Name Tag", "Select Box Color"] },
    material: "Metal & Silk Thread + Hard Box",
    dimensions: "12 x 10 x 5 inches",
    weight: "1.2 kg",
    careInstructions: "Wipe clean; store in cool dry place.",
    specifications: { Type: "Luxury", ColorScheme: "Gold & Red" },
  },

  {
  id: "rk3",
  sku: "RK-RES-003",
  name: "Elegant Resin Rakhi",
  description:
    "A beautifully handcrafted resin rakhi with intricate designs, perfect for gifting your sibling.",
  price: 399,
  rating: 4.8,
  reviews: 95,
  discount: 8,
  highlight: "Best Seller",
  category: "Resin",
  tags: ["resin", "rakhi", "handcrafted", "gift"],
  brand: "CraftiCrazy",
  seller: "Handcrafted by CraftiCrazy",
  inStock: true,
  warranty: "Not Applicable",
  returnPolicy: "Replacement only for damaged items",
  image: "/rakhi3.jpg",
  variants: [
    { image: "/rakhi3.jpg", price: 399 },
    { image: "/rakhi3-1.jpg", price: 429, discount: 8 },
    { image: "/rakhi3-2.jpg", price: 429, discount: 8 },
    { image: "/rakhi3-3.jpg", price: 429, discount: 8 },
    { image: "/rakhi3-4.jpg", price: 429, discount: 8 },
    { image: "/rakhi3-5.jpg", price: 429, discount: 8 },
    { image: "/rakhi3-6.jpg", price: 429, discount: 8 },
    { image: "/rakhi3-7.jpg", price: 429, discount: 8 },
    { image: "/rakhi3-8.jpg", price: 429, discount: 8 },
    { image: "/rakhi3-9.jpg", price: 429, discount: 8 },

  ],
  delivery: {
    type: "Standard",
    availability: "Across India",
    estimated: "3–5 days",
  },
  customization: { available: true, options: ["Add Name Tag", "Gift Wrap"] },
  material: "Resin + Cotton Thread",
  dimensions: "6 x 1 x 0.5 inches",
  weight: "50g",
  careInstructions: "Keep in a dry place; avoid direct sunlight.",
  specifications: { Type: "Resin", Theme: "Elegant & Modern" },
},
 {
    id: "rk4",
    sku: "RK-LUX-002",
    name: "Resin Rakhi Gift Box",
    description:
      "A premium Rakhi kit with designer rakhis,chocolates, and luxurious gift box packaging.",
    price: 1499,
    rating: 4.9,
    reviews: 140,
    discount: 12,
    highlight: "Luxury Edition",
    category: "Premium",
    tags: ["luxury", "gift", "rakhi", "premium"],
    brand: "CraftiCrazy",
    seller: "Handcrafted by CraftiCrazy",
    inStock: true,
    warranty: "Not Applicable",
    returnPolicy: "Replacement only for damaged items",
    image: "/Rakhi4.jpeg",
    variants: [
      { image: "/Rakhi4.jpeg", price: 1499 },
      { image: "/Rakhi4-1.jpeg", price: 1600, discount: 12 },
      { image: "/Rakhi4-2.jpeg", price: 1600, discount: 12 },
      { image: "/Rakhi4-3.jpg", price: 1600, discount: 12 },
      { image: "/Rakhi4-4.jpg", price: 1600, discount: 12 },
      { image: "/Rakhi4-5.jpg", price: 1600, discount: 12 },

    ],
    contents: [
      "Set of 3 Designer Rakhis",
      "Premium chocolate Pack",
      "Photo Frame",
      "Roli & Chawal",
    ],
    delivery: {
      type: "Express",
      availability: "Across India",
      estimated: "2–4 days",
    },
    customization: { available: true, options: ["Add Name Tag", "Select Box Color"] },
    material: "Metal & Silk Thread + Hard Box",
    dimensions: "12 x 10 x 5 inches",
    weight: "1.2 kg",
    careInstructions: "Wipe clean; store in cool dry place.",
    specifications: { Type: "Luxury", ColorScheme: "Gold & Red" },
  },
];
