// src/Data/WalletData.ts

export type Variant = {
  image: string;
  price: number;
  discount?: number;
};

export type Wallet = {
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

export const wallets: Wallet[] = [
  {
    id: "w1",
    sku: "WL-LEA-001",
    name: "Classic Leather Wallet for Men",
    description: "Premium handmade leather wallet with sleek finish and elegant stitching.",
    price: 600,
    rating: 4.8,
    reviews: 120,
    discount: 10,
    highlight: "Best Seller",
    category: "Leather",
    tags: ["Leather", "Men", "Classic", "Handmade"],
    brand: "LeatherCo",
    seller: "LeatherCo Official",
    inStock: true,
    warranty: "6 months",
    returnPolicy: "7-day easy returns",
    image: "/wallet1.jpg",
    variants: [
      { image: "/wallet1.jpg", price: 600, discount: 10 },
      { image: "/wallet1-1.jpg", price: 650, discount: 5 },
      { image: "/wallet1-2.jpg", price: 650, discount: 5 },
      { image: "/wallet1-3.jpg", price: 650, discount: 5 },
      { image: "/wallet1-4.jpg", price: 650, discount: 5 },

    ],
    contents: ["Wallet", "Gift Box", "Warranty Card"],
    occasion: ["Birthdays", "Father's Day", "Anniversaries"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–5 days" },
    customization: { available: true, options: ["Monogramming", "Color Choice"] },
    material: "Genuine Leather",
    dimensions: "11 x 9 x 2 cm",
    weight: "120g",
    careInstructions: "Wipe with dry cloth, avoid water.",
    specifications: { "Card Slots": "6", "Currency Pockets": "2", "Coin Pocket": "1" },
  },
  {
    id: "w2",
    sku: "WL-FAB-002",
    name: "Fabric Zipper Wallet",
    description: "Lightweight fabric wallet with secure zipper closure and trendy prints.",
    price: 850,
    rating: 4.4,
    reviews: 50,
    discount: 5,
    highlight: "Popular Choice",
    category: "Fabric",
    tags: ["Fabric", "Trendy", "Lightweight"],
    brand: "FabWallets",
    seller: "FabWallets Official",
    inStock: true,
    warranty: "3 months",
    returnPolicy: "7-day easy returns",
    image: "/wallet8.jpg",
    variants: [
      { image: "/wallet8.jpg", price: 850 },
      { image: "/wallet8-1.jpg", price: 900, discount: 5 },
      { image: "/wallet8-2.jpg", price: 900, discount: 5 },
      { image: "/wallet8-3.jpg", price: 900, discount: 5 },

    ],
    contents: ["Wallet"],
    occasion: ["Casual", "College", "Travel"],
    delivery: { type: "Standard", availability: "Metro Cities", estimated: "3–5 days" },
    customization: { available: true, options: ["Print Choice"] },
    material: "Cotton Fabric",
    dimensions: "10 x 8 x 2 cm",
    weight: "80g",
    careInstructions: "Hand wash only, air dry.",
    specifications: { "Zipper Pockets": "2", "Card Slots": "4" },
  },
  {
    id: "w3",
    sku: "WL-RES-003",
    name: "Resin Art Wallet",
    description: "Unique resin art wallet with glossy finish and creative designs.",
    price: 1500,
    rating: 4.6,
    reviews: 60,
    discount: 10,
    highlight: "Trendy Pick",
    category: "Resin",
    tags: ["Resin", "Art", "Unique", "Creative"],
    brand: "ArtResin",
    seller: "ArtResin Official",
    inStock: true,
    warranty: "6 months",
    returnPolicy: "7-day easy returns",
    image: "/wallet6.jpg",
    variants: [
      { image: "/wallet6.jpg", price: 1500, discount: 10 },
      { image: "/wallet6-1.jpg", price: 1550, discount: 5 },
      { image: "/wallet6-2.jpg", price: 1550, discount: 5 },
      { image: "/wallet6-3.jpg", price: 1550, discount: 5 },
      { image: "/wallet6-4.jpg", price: 1550, discount: 5 },
      { image: "/wallet6-5.jpg", price: 1550, discount: 5 },


    ],
    contents: ["Wallet", "Gift Box"],
    occasion: ["Gifting", "Special Occasions", "Anniversaries"],
    delivery: { type: "Express", availability: "Across India", estimated: "2–4 days" },
    customization: { available: true, options: ["Color Choice"] },
    material: "Resin",
    dimensions: "11 x 9 x 2 cm",
    weight: "110g",
    careInstructions: "Wipe with soft cloth.",
    specifications: { "Compartments": "3", "Card Slots": "6" },
  },
  {
    id: "w4",
    sku: "WL-HAN-004",
    name: "Hand-Painted Wallet",
    description: "Hand-painted fabric wallet featuring custom artistic patterns.",
    price: 1100,
    rating: 4.5,
    reviews: 55,
    highlight: "Artistic",
    category: "Fabric",
    tags: ["Hand-Painted", "Artistic", "Fabric"],
    brand: "ArtWallets",
    seller: "ArtWallets Official",
    inStock: true,
    warranty: "3 months",
    returnPolicy: "7-day easy returns",
    image: "/wallet5.jpg",
    variants: [{ image: "/wallet5.jpg", price: 1100 },
      { image: "/wallet5-1.jpg", price: 1100,discount: 5},
      { image: "/wallet5-2.jpg", price: 1100,discount: 5},
      { image: "/wallet5-3.jpg", price: 1100,discount: 5},
      { image: "/wallet5-4.jpg", price: 1100,discount: 5},
      { image: "/wallet5-5.jpg", price: 1100,discount: 5},

    ]
    ,
    contents: ["Wallet"],
    occasion: ["Casual", "College", "Gifting"],
    delivery: { type: "Standard", availability: "Metro Cities", estimated: "3–5 days" },
    customization: { available: true, options: ["Design Choice"] },
    material: "Canvas Fabric",
    dimensions: "10 x 9 x 2 cm",
    weight: "85g",
    careInstructions: "Spot clean only.",
    specifications: { "Card Slots": "4", "Currency Pockets": "2" },
  },
  {
    id: "w5",
    sku: "WL-LEA-005",
    name: "Slim Leather Card Holder",
    description: "Minimalist leather wallet for carrying essential cards with style.",
    price: 700,
    rating: 4.4,
    reviews: 40,
    category: "Leather",
    tags: ["Leather", "Slim", "Minimalist"],
    brand: "SlimCo",
    seller: "SlimCo Official",
    inStock: true,
    warranty: "6 months",
    returnPolicy: "7-day easy returns",
    image: "/wallet4.jpg",
    variants: [{ image: "/wallet4.jpg", price: 700 },
      { image: "/wallet4-1.jpg", price: 700 },
      { image: "/wallet4-2.jpg", price: 700 },
      { image: "/wallet4-3.jpg", price: 700 },

    ],
    contents: ["Card Holder"],
    occasion: ["Office", "Daily Use", "Travel"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–5 days" },
    customization: { available: false },
    material: "Genuine Leather",
    dimensions: "10 x 7 x 1.5 cm",
    weight: "70g",
    careInstructions: "Avoid moisture, wipe with dry cloth.",
    specifications: { "Card Slots": "6" },
  },
  {
    id: "w6",
    sku: "WL-FAB-006",
    name: "Eco-Friendly Fabric Wallet",
    description: "Made from eco-friendly fabric, stylish and sustainable wallet option.",
    price: 950,
    rating: 4.3,
    reviews: 30,
    highlight: "Eco Pick",
    category: "Fabric",
    tags: ["Eco-Friendly", "Sustainable", "Fabric"],
    brand: "EcoWallets",
    seller: "EcoWallets Official",
    inStock: true,
    warranty: "3 months",
    returnPolicy: "7-day easy returns",
    image: "/wallet3.jpg",
    variants: [{ image: "/wallet3.jpg", price: 950 },
      { image: "/wallet3-1.jpg", price: 950 },
      { image: "/wallet3-2.jpg", price: 950 },
      { image: "/wallet3-3.jpg", price: 950 },
      { image: "/wallet3-4.jpg", price: 950 },
      { image: "/wallet3-5.jpg", price: 950 },

    ],
    contents: ["Wallet"],
    occasion: ["Sustainable Gifting", "Daily Use"],
    delivery: { type: "Standard", availability: "Metro Cities", estimated: "3–5 days" },
    customization: { available: true, options: ["Color Choice"] },
    material: "Recycled Fabric",
    dimensions: "11 x 9 x 2 cm",
    weight: "90g",
    careInstructions: "Hand wash, air dry.",
    specifications: { "Card Slots": "5", "Currency Pockets": "2" },
  },
  {
    id: "w7",
    sku: "WL-RES-007",
    name: "Crochet Wallet",
    description: "Crochet wallet with colorful patterns.",
    price: 1600,
    rating: 4.7,
    reviews: 45,
    highlight: "Luxury",
    category: "Resin",
    tags: ["Resin", "Glitter", "Luxury", "Trendy"],
    brand: "ArtResin",
    seller: "ArtResin Official",
    inStock: true,
    warranty: "6 months",
    returnPolicy: "7-day easy returns",
    image: "/wallet7.jpg",
    variants: [
      { image: "/wallet7.jpg", price: 1600 },
      { image: "/wallet7-1.jpg", price: 1650 },
      { image: "/wallet7-2.jpg", price: 1650 },
      { image: "/wallet7-3.jpg", price: 1650 },
      { image: "/wallet7-4.jpg", price: 1650 },
      { image: "/wallet7-5.jpg", price: 1650 },
      { image: "/wallet7-6.jpg", price: 1650 },


    ],
    contents: ["Wallet", "Gift Box"],
    occasion: ["Parties", "Special Gifting"],
    delivery: { type: "Express", availability: "Across India", estimated: "2–4 days" },
    customization: { available: true, options: ["Add Name"] },
    material: "Resin",
    dimensions: "11 x 9 x 2 cm",
    weight: "115g",
    careInstructions: "Avoid scratches, wipe with soft cloth.",
    specifications: { "Compartments": "3", "Card Slots": "6" },
  },
 
];
