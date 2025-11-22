// src/Data/WoodenFrameData.ts
export type Variant = {
  image: string;
  price: number;
  discount?: number;
};

export type WoodenFrame = {
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
  maxOrderQuantity?: number;
  specifications?: {
    [key: string]: string;
  };
};

export const woodenFrames: WoodenFrame[] = [
  {
    id: "wf1",
    sku: "WF-CL-001",
    name: "Classic Family Frame",
    description: "Elegant handcrafted wooden frame perfect for preserving family memories in style.",
    price: 1200,
    rating: 5,
    reviews: 45,
    discount: 10,
    highlight: "Best Seller",
    category: "Classic",
    tags: ["classic", "family", "handcrafted"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "6 months craftsmanship warranty",
    returnPolicy: "7-day easy returns",
    image: "/wooden1.jpg",
    variants: [
      { image: "/wooden1.jpg", price: 1200, discount: 10 },
      { image: "/wooden1-1.jpg", price: 1300, discount: 5 },
      { image: "/wooden1-2.jpg", price: 1300, discount: 5 },
      { image: "/wooden1-3.jpg", price: 1300, discount: 5 },
      { image: "/wooden1-4.jpg", price: 1300, discount: 5 },


    ],
    contents: ["Handcrafted Wooden Frame"],
    delivery: { type: "Standard & Express", availability: "Across India", estimated: "3–7 business days" },
    customization: { available: true, options: ["Engraving Name", "Add Photo Insert"] },
    material: "Premium Oak Wood",
    dimensions: "25 x 20 x 3 cm",
    weight: "1.2 kg",
    careInstructions: "Wipe with dry cloth; avoid moisture.",
    maxOrderQuantity: 5,
    specifications: { Frame: "Handcrafted oak wood, polished finish" },
  },
  {
    id: "wf2",
    sku: "WF-BD-002",
    name: "Birthday Memory Frame",
    description: "Celebrate birthdays with this beautifully carved wooden frame, ideal for gifting loved ones.",
    price: 1500,
    rating: 4,
    reviews: 30,
    discount: 15,
    highlight: "Discounted",
    category: "Birthday",
    tags: ["birthday", "gift", "handcrafted"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "6 months craftsmanship warranty",
    returnPolicy: "7-day easy returns",
    image: "/wooden2.jpg",
    variants: [
      { image: "/wooden2.jpg", price: 1500, discount: 15 },
      { image: "/wooden2-1.jpg", price: 1600, discount: 10 },
      { image: "/wooden2-2.jpg", price: 1600, discount: 10 },
      { image: "/wooden2-3.jpg", price: 1600, discount: 10 },

    ],
    contents: ["Handcrafted Wooden Frame"],
    delivery: { type: "Standard", availability: "Metro Cities", estimated: "3–5 business days" },
    customization: { available: true, options: ["Engraving Name", "Add Birthday Message"] },
    material: "Mahogany Wood",
    dimensions: "28 x 22 x 3 cm",
    weight: "1.5 kg",
    careInstructions: "Avoid direct sunlight; clean with soft cloth.",
    maxOrderQuantity: 5,
    specifications: { Frame: "Carved mahogany wood with smooth finish" },
  },
  {
    id: "wf3",
    sku: "WF-TR-003",
    name: "Travel Adventure Frame",
    description: "A rustic wooden frame designed to showcase your travel photographs and cherished adventures.",
    price: 1800,
    rating: 5,
    reviews: 50,
    discount: 5,
    highlight: "Luxury",
    category: "Travel",
    tags: ["travel", "adventure", "rustic", "wooden"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "6 months craftsmanship warranty",
    returnPolicy: "7-day easy returns",
    image: "/wooden3.jpg",
    variants: [
      { image: "/wooden3.jpg", price: 1800, discount: 5 },
      { image: "/wooden3-1.jpg", price: 1900,discount: 5  },
      { image: "/wooden3-2.jpg", price: 1900,discount: 5  },
      { image: "/wooden3-3.jpg", price: 1900,discount: 5  },
      { image: "/wooden3-4.jpg", price: 1900,discount: 5  },

    ],
    contents: ["Handcrafted Wooden Frame"],
    delivery: { type: "Express", availability: "Across India", estimated: "2–4 business days" },
    customization: { available: true, options: ["Add Travel Quote", "Engraving"] },
    material: "Teak Wood",
    dimensions: "30 x 25 x 3 cm",
    weight: "1.7 kg",
    careInstructions: "Wipe with soft cloth; keep away from water.",
    maxOrderQuantity: 5,
    specifications: { Frame: "Rustic teak wood with natural finish" },
  },
  {
    id: "wf4",
    sku: "WF-PET-004",
    name: "Pet Lover Frame",
    description: "Capture adorable moments of your pets in this handcrafted wooden frame.",
    price: 1400,
    rating: 4,
    reviews: 25,
    discount: undefined,
    highlight: "Popular",
    category: "Pets",
    tags: ["pets", "gift", "handcrafted"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "6 months craftsmanship warranty",
    returnPolicy: "7-day easy returns",
    image: "/wooden4.jpg",
    variants: [
      { image: "/wooden4.jpg", price: 1400 },
      { image: "/wooden4-1.jpg", price: 1900,discount: 5  },
      { image: "/wooden4-2.jpg", price: 1900,discount: 5  },
      { image: "/wooden4-3.jpg", price: 1900,discount: 5  },


    ],
    contents: ["Handcrafted Wooden Frame"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–6 business days" },
    customization: { available: true, options: ["Engraving Name", "Add Pet Name"] },
    material: "Maple Wood",
    dimensions: "28 x 22 x 3 cm",
    weight: "1.3 kg",
    careInstructions: "Keep away from water; wipe with soft cloth.",
    maxOrderQuantity: 5,
    specifications: { Frame: "Maple wood handcrafted frame" },
  },
  {
    id: "wf5",
    sku: "WF-FR-005",
    name: "Friends Forever Frame",
    description: "Celebrate friendship memories with this stylish wooden frame, perfect for gifting.",
    price: 1600,
    rating: 5,
    reviews: 40,
    discount: 12,
    highlight: "Best Seller",
    category: "Friends",
    tags: ["friends", "gift", "handcrafted"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "6 months craftsmanship warranty",
    returnPolicy: "7-day easy returns",
    image: "/wooden7.jpg",
    variants: [
      { image: "/wooden7.jpg", price: 1600, discount: 12 },
      { image: "/wooden7-1.jpg", price: 1700 },
      { image: "/wooden7-2.jpg", price: 1700 ,discount: 12},
      { image: "/wooden7-3.jpg", price: 1700 ,discount: 12},
      { image: "/wooden7-4.jpg", price: 1700 ,discount: 12},
      { image: "/wooden7-5.jpg", price: 1700 ,discount: 12},



    ],
    contents: ["Handcrafted Wooden Frame"],
    delivery: { type: "Express", availability: "Metro Cities", estimated: "2–5 business days" },
    customization: { available: true, options: ["Engraving Name", "Add Friendship Quote"] },
    material: "Walnut Wood",
    dimensions: "30 x 25 x 3 cm",
    weight: "1.5 kg",
    careInstructions: "Keep dry; polish occasionally.",
    maxOrderQuantity: 5,
    specifications: { Frame: "Walnut wood handcrafted frame with smooth finish" },
  },
  {
    id: "wf6",
    sku: "WF-CO-006",
    name: "Romantic Couple Frame",
    description: "A beautifully carved wooden frame designed to hold your favorite couple photographs.",
    price: 2000,
    rating: 5,
    reviews: 55,
    discount: 20,
    highlight: "Luxury",
    category: "Romantic",
    tags: ["romantic", "couple", "gift"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "6 months craftsmanship warranty",
    returnPolicy: "7-day easy returns",
    image: "/wooden5.jpg",
    variants: [
      { image: "/wooden5.jpg", price: 2000, discount: 20 },
      { image: "/wooden5-1.jpg", price: 2100 },
      { image: "/wooden5-2.jpg", price: 2000, discount: 20 },
      { image: "/wooden5-3.jpg", price: 2000, discount: 20 },
      { image: "/wooden5-4.jpg", price: 2000, discount: 20 },
      { image: "/wooden5-5.jpg", price: 2000, discount: 20 },


    ],
    contents: ["Handcrafted Wooden Frame"],
    delivery: { type: "Express", availability: "Across India", estimated: "2–4 business days" },
    customization: { available: true, options: ["Add Couple Name", "Add Anniversary Date"] },
    material: "Cherry Wood",
    dimensions: "32 x 28 x 3 cm",
    weight: "1.8 kg",
    careInstructions: "Keep away from moisture; polish wood occasionally.",
    maxOrderQuantity: 5,
    specifications: { Frame: "Cherry wood handcrafted frame, polished finish" },
  },
  {
    id: "wf7",
    sku: "WF-MIN-007",
    name: "Minimalist Wooden Frame",
    description: "Sleek and minimal design, perfect for modern home decor and gifting.",
    price: 1300,
    rating: 4,
    reviews: 20,
    discount: undefined,
    highlight: "Budget",
    category: "Minimalist",
    tags: ["minimalist", "modern", "gift"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "6 months craftsmanship warranty",
    returnPolicy: "7-day easy returns",
    image: "/wooden6.jpg",
    variants: [
      { image: "/wooden6.jpg", price: 1300 ,discount: 20},
      { image: "/wooden6-1.jpg", price: 1300 ,discount: 20},
      { image: "/wooden6-2.jpg", price: 1300 ,discount: 20},
      { image: "/wooden6-3.jpg", price: 1300 ,discount: 20},
      { image: "/wooden6-4.jpg", price: 1300 ,discount: 20},
      { image: "/wooden6-5.jpg", price: 1300 ,discount: 20},



    ],
    contents: ["Handcrafted Wooden Frame"],
    delivery: { type: "Standard", availability: "Metro Cities", estimated: "3–6 business days" },
    customization: { available: true, options: ["Add Minimalist Quote"] },
    material: "Pine Wood",
    dimensions: "25 x 20 x 3 cm",
    weight: "1 kg",
    careInstructions: "Avoid moisture; clean with soft cloth.",
    maxOrderQuantity: 5,
    specifications: { Frame: "Pine wood minimalist handcrafted frame" },
  },
  {
    id: "wf8",
    sku: "WF-VI-008",
    name: "Vintage Carved Frame",
    description: "Handcrafted vintage wooden frame with intricate carvings, ideal for classic photos.",
    price: 2200,
    rating: 5,
    reviews: 35,
    discount: 15,
    highlight: "Luxury",
    category: "Vintage",
    tags: ["vintage", "carved", "classic"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "6 months craftsmanship warranty",
    returnPolicy: "7-day easy returns",
    image: "/wooden10.jpg",
    variants: [
      { image: "/wooden10.jpg", price: 2200, discount: 15 },
      { image: "/wooden10-1.jpg", price: 2300 },
      { image: "/wooden10-2.jpg", price: 2200, discount: 15 },
     

    ],
    contents: ["Handcrafted Wooden Frame"],
    delivery: { type: "Express", availability: "Across India", estimated: "2–5 business days" },
    customization: { available: true, options: ["Add Vintage Engraving"] },
    material: "Teak Wood",
    dimensions: "32 x 28 x 3 cm",
    weight: "1.9 kg",
    careInstructions: "Polish occasionally; avoid moisture.",
    maxOrderQuantity: 5,
    specifications: { Frame: "Teak wood handcrafted vintage frame" },
  },
  {
    id: "wf9",
    sku: "WF-AR-009",
    name: "Artistic Photo Frame",
    description: "Unique artistic wooden frame designed to make your photos pop with style.",
    price: 1750,
    rating: 5,
    reviews: 40,
    discount: 10,
    highlight: "Discounted",
    category: "Artistic",
    tags: ["artistic", "unique", "gift"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "6 months craftsmanship warranty",
    returnPolicy: "7-day easy returns",
    image: "/wooden9.jpg",
    variants: [
      { image: "/wooden9.jpg", price: 1750, discount: 10 },
      { image: "/wooden9-1.jpg", price: 1850 },
      { image: "/wooden9-2.jpg", price: 1750, discount: 10 },
      { image: "/wooden9-3.jpg", price: 1750, discount: 10 },
      { image: "/wooden9-4.jpg", price: 1750, discount: 10 },
      { image: "/wooden9-5.jpg", price: 1750, discount: 10 },


    ],
    contents: ["Handcrafted Wooden Frame"],
    delivery: { type: "Standard", availability: "Metro Cities", estimated: "3–7 business days" },
    customization: { available: true, options: ["Add Artistic Quote"] },
    material: "Oak Wood",
    dimensions: "28 x 22 x 3 cm",
    weight: "1.4 kg",
    careInstructions: "Keep dry; wipe occasionally.",
    maxOrderQuantity: 5,
    specifications: { Frame: "Oak wood handcrafted artistic frame" },
  },
  {
    id: "wf10",
    sku: "WF-PE-010",
    name: "Personalized Engraved Frame",
    description: "Add a personal touch with this engraved wooden frame, perfect for special gifts.",
    price: 2500,
    rating: 5,
    reviews: 60,
    discount: 18,
    highlight: "Best Seller",
    category: "Personalized",
    tags: ["personalized", "gift", "engraved"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "6 months craftsmanship warranty",
    returnPolicy: "7-day easy returns",
    image: "/wooden8.jpg",
    variants: [
      { image: "/wooden8.jpg", price: 2500, discount: 18 },
      { image: "/wooden8-1.jpg", price: 2600 },
      { image: "/wooden8-2.jpg", price: 2500, discount: 18 },

    ],
    contents: ["Handcrafted Wooden Frame"],
    delivery: { type: "Express", availability: "Across India", estimated: "2–5 business days" },
    customization: { available: true, options: ["Engraving Name", "Add Personal Message"] },
    material: "Walnut Wood",
    dimensions: "30 x 25 x 3 cm",
    weight: "1.6 kg",
    careInstructions: "Avoid moisture; polish occasionally.",
    maxOrderQuantity: 5,
    specifications: { Frame: "Walnut wood handcrafted engraved frame" },
  },
];
