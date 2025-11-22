// src/Data/ToteBagData.ts

export type Variant = {
  image: string;
  price: number;
  discount?: number;
};

export type ToteBag = {
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

export const toteBags: ToteBag[] = [
  {
    id: "tb1",
    sku: "TB-CANVAS-001",
    name: "Canvas Tote Bag",
    description: "Sturdy and stylish canvas tote bag for everyday use.",
    price: 1200,
    rating: 4.8,
    reviews: 120,
    discount: 10,
    highlight: "Eco-Friendly Choice",
    category: "Canvas",
    tags: ["eco", "canvas", "casual"],
    brand: "CraftiCrazy",
    seller: "CraftiCrazy Store",
    inStock: true,
    warranty: "6 months stitching warranty",
    returnPolicy: "7-day easy returns",
    image: "/totebag1.jpg",
    variants: [
      { image: "/totebag1.jpg", price: 1200 },
      { image: "/totebag1-1.jpg", price: 1150, discount: 5 },
      { image: "/totebag1-2.jpg", price: 1150, discount: 5 },
      { image: "/totebag1-3.jpg", price: 1150, discount: 5 },
      { image: "/totebag1-4.jpg", price: 1150, discount: 5 },
      { image: "/totebag1-5.jpg", price: 1150, discount: 5 },


    ],
    contents: ["Tote Bag", "Dust Bag"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3-5 days" },
    customization: { available: true, options: ["Add Name", "Add Logo"] },
    material: "Cotton Canvas",
    dimensions: "14x16 inches",
    weight: "350g",
    careInstructions: "Hand wash recommended, avoid bleach",
    specifications: { Color: "Natural", Type: "Canvas Tote" },
    maxOrderQuantity: 5,
    occasion: ["Everyday Use", "Shopping", "Gifts"]
  },
  {
    id: "tb2",
    sku: "TB-FAB-002",
    name: "Eco-Friendly Tote Bag",
    description: "Reusable eco-friendly tote bag made from organic materials.",
    price: 900,
    rating: 4.4,
    reviews: 80,
    discount: 5,
    highlight: "Sustainable & Reusable",
    category: "Fabric",
    tags: ["eco", "organic", "fabric"],
    brand: "CraftiCrazy",
    seller: "CraftiCrazy Store",
    inStock: true,
    warranty: "3 months stitching warranty",
    returnPolicy: "7-day replacement",
    image: "/totebag3.jpg",
    variants: [
      { image: "/totebag3.jpg", price: 900 },
      { image: "/totebag3-1.jpg", price: 850, discount: 5 },
      { image: "/totebag3-2.jpg", price: 850, discount: 5 },
      { image: "/totebag3-3.jpg", price: 850, discount: 5 },
      { image: "/totebag3-4.jpg", price: 850, discount: 5 },
      { image: "/totebag3-5.jpg", price: 850, discount: 5 },

    ],
    contents: ["Tote Bag"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3-5 days" },
    customization: { available: true, options: ["Add Logo", "Add Patch"] },
    material: "Organic Cotton",
    dimensions: "14x15 inches",
    weight: "300g",
    careInstructions: "Hand wash recommended, avoid bleach",
    specifications: { Color: "Natural", Type: "Eco Tote" },
    maxOrderQuantity: 6,
    occasion: ["Shopping", "College", "Gifts"]
  },
  {
    id: "tb3",
    sku: "TB-EMB-003",
    name: "Embroidered Tote Bag",
    description: "Hand-embroidered tote bag with colorful patterns.",
    price: 1500,
    rating: 4.5,
    reviews: 72,
    discount: 8,
    highlight: "Artisan Handcrafted",
    category: "Fabric",
    tags: ["embroidered", "handmade", "fabric"],
    brand: "CraftiCrazy",
    seller: "CraftiCrazy Store",
    inStock: true,
    warranty: "6 months stitching warranty",
    returnPolicy: "7-day replacement",
    image: "/totebag4.jpg",
    variants: [
      { image: "/totebag4.jpg", price: 1500 },
      { image: "/totebag4-1.jpg", price: 1400, discount: 8 },
      { image: "/totebag4-2.jpg", price: 1400, discount: 8 },
      { image: "/totebag4-3.jpg", price: 1400, discount: 8 },
      { image: "/totebag4-4.jpg", price: 1400, discount: 8 },
      { image: "/totebag4-5.jpg", price: 1400, discount: 8 },

    ],
    contents: ["Tote Bag", "Gift Bag"],
    delivery: { type: "Express", availability: "Metro Cities", estimated: "2-4 days" },
    customization: { available: true, options: ["Add Name", "Add Patch"] },
    material: "Fabric with embroidery",
    dimensions: "14x16 inches",
    weight: "400g",
    careInstructions: "Hand wash gently",
    specifications: { Color: "Multi-color", Type: "Embroidered Tote" },
    maxOrderQuantity: 4,
    occasion: ["Gifting", "Casual Use"]
  },
 
];
