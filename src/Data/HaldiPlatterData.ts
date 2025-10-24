// src/Data/HaldiPlatterData.ts
export type Variant = {
  image: string;
  price: number;
  discount?: number;
};

export type HaldiPlatter = {
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

export const haldiPlatters: HaldiPlatter[] = [
  {
    id: "hp1",
    sku: "HP-TRD-001",
    name: "Traditional Haldi Platter",
    description: "Beautifully crafted traditional Haldi platter with intricate designs, perfect for pre-wedding ceremonies.",
    price: 599,
    rating: 4.7,
    reviews: 85,
    discount: 20,
    highlight: "Best Seller",
    category: "Traditional",
    tags: ["haldi", "wedding", "traditional"],
    brand: "CraftiCrazy",
    seller: "Handcrafted by CraftiCrazy",
    inStock: true,
    warranty: "3 months",
    returnPolicy: "7-day easy returns",
    image: "/Haldi1.jpg",
    variants: [
      { image: "/Haldi1.jpg", price: 599 },
      { image: "/Haldi1-1.jpg", price: 649, discount: 10 },
      { image: "/Haldi1-2.jpg", price: 649, discount: 10 },
      { image: "/Haldi1-3.jpg", price: 649, discount: 10 },
      { image: "/Haldi1-4.jpg", price: 649, discount: 10 },
      { image: "/Haldi1-5.jpg", price: 649, discount: 10 },

    ],
    contents: ["Haldi Platter"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–5 days" },
    customization: { available: true, options: ["Name Tag", "Color Accent"] },
    material: "Resin with decorative paints",
    dimensions: "12 inch diameter",
    weight: "500g",
    careInstructions: "Wipe with dry cloth only",
    specifications: { Color: "Yellow & Gold", Shape: "Round" },
  },
  
  {
    id: "hp3",
    sku: "HP-LUX-003",
    name: "Resin Haldi Platter",
    description: "Premium royal-style Haldi platter with metallic detailing and crystals for a luxurious touch.",
    price: 899,
    rating: 4.9,
    reviews: 50,
    discount: 10,
    highlight: "Luxury Edition",
    category: "Luxury",
    tags: ["haldi", "luxury", "premium"],
    brand: "CraftiCrazy",
    seller: "Handcrafted by CraftiCrazy",
    inStock: true,
    warranty: "6 months",
    returnPolicy: "7-day easy returns",
    image: "/Haldi3.jpg",
    variants: [
      { image: "/Haldi3.jpg", price: 899 },
      { image: "/Haldi3-1.jpg", price: 950, discount: 5 },
      { image: "/Haldi3-2.jpg", price: 950, discount: 5 },

    ],
    contents: ["Haldi Platter", "Decorative Crystals"],
    delivery: { type: "Express", availability: "Metro Cities", estimated: "2–4 days" },
    customization: { available: true, options: ["Crystal Color", "Name Tag"] },
    material: "Resin with metal & crystal accents",
    dimensions: "14 inch diameter",
    weight: "650g",
    careInstructions: "Handle with care; clean with dry cloth",
    specifications: { Color: "Yellow & Gold", Shape: "Round" },
  },
];
