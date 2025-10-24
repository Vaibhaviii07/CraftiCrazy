export type Variant = {
  image: string;
  price: number;
  discount?: number;
};

export type ResinNameplate = {
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

export const resinNameplates: ResinNameplate[] = [
  {
    id: "np1",
    sku: "RN-OCN-001",
    name: "Personalized Ocean Resin Nameplate",
    description: "Custom nameplate with blue ocean waves and shimmering sand effect.",
    price: 900,
    rating: 4.8,
    reviews: 90,
    discount: 5,
    highlight: "Best Seller",
    category: "Ocean",
    tags: ["ocean", "personalized", "handmade", "gift"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "6 months shine warranty",
    returnPolicy: "7-day easy returns",
    image: "/nameplate1.jpg",
    variants: [
      { image: "/nameplate1.jpg", price: 900 },
      { image: "/nameplate1-1.jpg", price: 950, discount: 5 },
      { image: "/nameplate1-2.jpg", price: 950, discount: 5 },
     
    ],
    contents: ["Nameplate", "Gift Box"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–5 days" },
    customization: { available: true, options: ["Add Name", "Choose Font"] },
    material: "Epoxy Resin",
    dimensions: "20x8 cm",
    weight: "500g",
    careInstructions: "Wipe with soft cloth; avoid water",
    specifications: { Color: "Blue", Shape: "Rectangular" }
  },
  {
    id: "np2",
    sku: "RN-FLR-002",
    name: "Floral Resin Nameplate",
    description: "Embedded real flowers in resin for a delicate and charming nameplate.",
    price: 850,
    rating: 4.7,
    reviews: 87,
    discount: 5,
    highlight: "Popular Choice",
    category: "Floral",
    tags: ["floral", "handmade", "personalized", "gift"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "6 months durability warranty",
    returnPolicy: "7-day easy returns",
    image: "/nameplate2.jpg",
    variants: [
      { image: "/nameplate2.jpg", price: 850 },
      { image: "/nameplate2-1.jpg", price: 900, discount: 5 },
      { image: "/nameplate2-2.jpg", price: 900, discount: 5 },
      { image: "/nameplate2-3.jpg", price: 900, discount: 5 },
      { image: "/nameplate2-4.jpg", price: 900, discount: 5 },
      { image: "/nameplate2-5.jpg", price: 900, discount: 5 },

    ],
    contents: ["Nameplate", "Gift Box"],
    delivery: { type: "Express", availability: "Metro Cities", estimated: "2–4 days" },
    customization: { available: true, options: ["Choose Flower Type", "Add Initials"] },
    material: "Epoxy Resin + Dried Flowers",
    dimensions: "20x8 cm",
    weight: "520g",
    careInstructions: "Avoid water; clean with dry cloth",
    specifications: { Color: "Multicolor", Shape: "Rectangular" }
  },
  {
    id: "np3",
    sku: "RN-PER-003",
    name: "Elegant Resin Nameplate",
    description: "Elegant resin nameplate for a sophisticated look.",
    price: 950,
    rating: 4.8,
    reviews: 88,
    discount: 5,
    highlight: "Premium Choice",
    category: "Personalized",
    tags: ["elegant", "personalized", "handmade", "gift"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "12 months shine warranty",
    returnPolicy: "7-day easy returns",
    image: "/nameplate3.jpg",
    variants: [
      { image: "/nameplate3.jpg", price: 950 },
      { image: "/nameplate3-1.jpg", price: 1000, discount: 5 },
      { image: "/nameplate3-2.jpg", price: 1000, discount: 5 },
      { image: "/nameplate3-3.jpg", price: 1000, discount: 5 },
      { image: "/nameplate3-4.jpg", price: 1000, discount: 5 },
      { image: "/nameplate3-5.jpg", price: 1000, discount: 5 },
      { image: "/nameplate3-6.jpg", price: 1000, discount: 5 },

    ],
    contents: ["Nameplate", "Gift Box", "Certificate"],
    delivery: { type: "Express", availability: "Metro Cities", estimated: "2–4 days" },
    customization: { available: true, options: ["Add Name", "Choose Color"] },
    material: "Epoxy Resin",
    dimensions: "20x8 cm",
    weight: "550g",
    careInstructions: "Clean with soft dry cloth; avoid heat",
    specifications: { Color: "Gold", Shape: "Rectangular" }
  },
  {
    id: "np4",
    sku: "RN-PER-004",
    name: "Custom Pearl Resin Nameplate",
    description: "Add your initials or name in stylish resin design for a personal touch.",
    price: 1200,
    rating: 5.0,
    reviews: 95,
    discount: 10,
    highlight: "Luxury Pick",
    category: "Personalized",
    tags: ["pearl", "luxury", "handmade", "gift"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "12 months durability warranty",
    returnPolicy: "7-day easy returns",
    image: "/nameplate4.jpg",
    variants: [
      { image: "/nameplate4.jpg", price: 1200 },
      { image: "/nameplate4-1.jpg", price: 1250, discount: 10 },
      { image: "/nameplate4-2.jpg", price: 1250, discount: 10 },
      { image: "/nameplate4-3.jpg", price: 1250, discount: 10 },
      { image: "/nameplate4-4.jpg", price: 1250, discount: 10 },
      { image: "/nameplate4-5.jpg", price: 1250, discount: 10 },

    ],
    contents: ["Nameplate", "Gift Box", "Certificate"],
    delivery: { type: "Express", availability: "Metro Cities", estimated: "2–4 days" },
    customization: { available: true, options: ["Add Initials", "Choose Pearl Finish"] },
    material: "Epoxy Resin + Pearl Accents",
    dimensions: "20x8 cm",
    weight: "600g",
    careInstructions: "Handle with care; clean with soft cloth",
    specifications: { Color: "Pearl White", Shape: "Rectangular" }
  }
];
