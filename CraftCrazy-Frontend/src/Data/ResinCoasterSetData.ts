export type Variant = {
  image: string;
  price: number;
  discount?: number;
};

export type ResinCoasterSet = {
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

export const resinCoasterSets: ResinCoasterSet[] = [
  {
    id: "cset-1",
    sku: "RC-OCW-001",
    name: "Ocean Wave Resin Coaster Set",
    description: "Beautiful handmade ocean wave inspired resin coaster set with glossy finish.",
    price: 750,
    rating: 4.9,
    reviews: 150,
    discount: 5,
    highlight: "Best Seller",
    category: "Ocean",
    tags: ["ocean", "handmade", "glossy", "gift"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "6 months shine warranty",
    returnPolicy: "7-day easy returns",
    image: "/coaster1.jpg",
    variants: [
      { image: "/coaster1.jpg", price: 750 },
      { image: "/coaster1-1.jpg", price: 800, discount: 5 },
      { image: "/coaster1-2.jpg", price: 800, discount: 5 },
      { image: "/coaster1-3.jpg", price: 800, discount: 5 },
      { image: "/coaster1-4.jpg", price: 800, discount: 5 },

    ],
    contents: ["4 coasters", "Gift Box"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–5 days" },
    customization: { available: true, options: ["Add Name", "Choose Color"] },
    material: "Epoxy Resin",
    dimensions: "10x10 cm each",
    weight: "250g per coaster",
    careInstructions: "Wipe with soft cloth; avoid hot liquids",
    specifications: { Color: "Blue", Shape: "Round" }
  },
  {
    id: "cset-2",
    sku: "RC-FLR-002",
    name: "Floral Embedded Resin Coaster Set",
    description: "Handmade resin coasters with real dried flowers embedded inside.",
    price: 820,
    rating: 4.8,
    reviews: 120,
    discount: 5,
    highlight: "Popular Choice",
    category: "Floral",
    tags: ["floral", "handmade", "gift", "trending"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "6 months durability warranty",
    returnPolicy: "7-day easy returns",
    image: "/coaster2.jpg",
    variants: [
      { image: "/coaster2.jpg", price: 820 },
      { image: "/coaster2-1.jpg", price: 870, discount: 5 },
      { image: "/coaster2-2.jpg", price: 870, discount: 5 },
      { image: "/coaster2-3.jpg", price: 870, discount: 5 },
      { image: "/coaster2-4.jpg", price: 870, discount: 5 },
      { image: "/coaster2-5.jpg", price: 870, discount: 5 },
      { image: "/coaster2-6.jpg", price: 870, discount: 5 },
      { image: "/coaster2-7.jpg", price: 870, discount: 5 },
      { image: "/coaster2-8.jpg", price: 870, discount: 5 },

    ],
    contents: ["4 coasters", "Gift Box"],
    delivery: { type: "Express", availability: "Metro Cities", estimated: "2–4 days" },
    customization: { available: true, options: ["Choose Flower Type", "Add Initials"] },
    material: "Epoxy Resin + Dried Flowers",
    dimensions: "10x10 cm each",
    weight: "260g per coaster",
    careInstructions: "Avoid soaking in water; clean with dry cloth",
    specifications: { Color: "Multicolor", Shape: "Round" }
  },
  {
    id: "cset-3",
    sku: "RC-GLF-003",
    name: "Gold Leaf Resin Coaster Set",
    description: "Elegant resin coaster set with gold leaf accents for a premium look.",
    price: 950,
    rating: 4.7,
    reviews: 110,
    discount: 10,
    highlight: "Luxury Pick",
    category: "Luxury",
    tags: ["gold leaf", "luxury", "handmade", "gift"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "12 months shine warranty",
    returnPolicy: "7-day easy returns",
    image: "/coaster3.jpg",
    variants: [
      { image: "/coaster3.jpg", price: 950 },
      { image: "/coaster3-1.jpg", price: 1000, discount: 10 },
      { image: "/coaster3-2.jpg", price: 1000, discount: 10 },
      { image: "/coaster3-3.jpg", price: 1000, discount: 10 },
      { image: "/coaster3-4.jpg", price: 1000, discount: 10 },

    ],
    contents: ["4 coasters", "Gift Box", "Certificate"],
    delivery: { type: "Express", availability: "Metro Cities", estimated: "2–4 days" },
    customization: { available: true, options: ["Add Name", "Choose Gold Pattern"] },
    material: "Epoxy Resin + Gold Leaf",
    dimensions: "10x10 cm each",
    weight: "270g per coaster",
    careInstructions: "Clean with soft dry cloth; avoid heat",
    specifications: { Color: "Gold", Shape: "Round" }
  },
  {
    id: "cset-4",
    sku: "RC-MBL-004",
    name: "Marble Effect Resin Coaster Set",
    description: "Stylish marble-effect resin coasters that suit any home décor.",
    price: 700,
    rating: 4.5,
    reviews: 100,
    discount: 5,
    highlight: "Trending",
    category: "Marble",
    tags: ["marble", "handmade", "gift", "stylish"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "6 months shine warranty",
    returnPolicy: "7-day easy returns",
    image: "/coaster4.jpg",
    variants: [
      { image: "/coaster4.jpg", price: 700 },
      { image: "/coaster4-1.jpg", price: 750, discount: 5 },
      { image: "/coaster4-2.jpg", price: 750, discount: 5 },
      { image: "/coaster4-3.jpg", price: 750, discount: 5 },
      { image: "/coaster4-4.jpg", price: 750, discount: 5 },
      { image: "/coaster4-5.jpg", price: 750, discount: 5 },
      

    ],
    contents: ["4 coasters", "Gift Box"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–5 days" },
    customization: { available: true, options: ["Choose Marble Color"] },
    material: "Epoxy Resin",
    dimensions: "10x10 cm each",
    weight: "240g per coaster",
    careInstructions: "Wipe with damp cloth; avoid chemicals",
    specifications: { Color: "White/Gray", Shape: "Round" }
  },
  {
    id: "cset-5",
    sku: "RC-GEO-005",
    name: "Geode Style Resin Coaster Set",
    description: "Stunning geode-inspired resin coasters with crystal-like finish.",
    price: 1200,
    rating: 5.0,
    reviews: 180,
    discount: 10,
    highlight: "Premium Choice",
    category: "Geode",
    tags: ["geode", "luxury", "handmade", "gift"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "12 months shine warranty",
    returnPolicy: "7-day easy returns",
    image: "/coaster5.jpg",
    variants: [
      { image: "/coaster5.jpg", price: 1200 },
      { image: "/coaster5-1.jpg", price: 1250, discount: 10 },
      { image: "/coaster5-2.jpg", price: 1250, discount: 10 },
      { image: "/coaster5-3.jpg", price: 1250, discount: 10 },
      { image: "/coaster5-4.jpg", price: 1250, discount: 10 },
      { image: "/coaster5-5.jpg", price: 1250, discount: 10 },
      { image: "/Coaster.jpeg", price: 1250, discount: 10 },



    ],
    contents: ["4 coasters", "Gift Box", "Certificate"],
    delivery: { type: "Express", availability: "Metro Cities", estimated: "2–4 days" },
    customization: { available: true, options: ["Choose Color Combination", "Add Initials"] },
    material: "Epoxy Resin + Crystal Dust",
    dimensions: "10x10 cm each",
    weight: "300g per coaster",
    careInstructions: "Handle with care; clean with soft cloth",
    specifications: { Color: "Multiple colors", Shape: "Round" }
  }
];
