export type Variant = {
  image: string;
  price: number;
  discount?: number;
};

export type VarmalaPreservation = {
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

export const varmalaPreservations: VarmalaPreservation[] = [
  {
    id: "vp1",
    sku: "VP-GLD-001",
    name: "Golden Rose Varmala Preservation",
    description: "Preserve your wedding varmalas in elegant golden resin frames.",
    price: 2500,
    rating: 4.9,
    reviews: 85,
    discount: 10,
    highlight: "Best Seller",
    category: "Traditional",
    tags: ["gold", "roses", "wedding"],
    brand: "CraftiCrazy",
    seller: "Handcrafted by CraftiCrazy",
    inStock: true,
    warranty: "6 months",
    returnPolicy: "7-day easy returns",
    image: "/vp1.jpg",
    variants: [
      { image: "/vp1.jpg", price: 2500 },
      { image: "/vp1-1.jpg", price: 2600, discount: 10 },
      { image: "/vp1-2.jpg", price: 2600, discount: 10 },
      { image: "/vp1-3.jpg", price: 2600, discount: 10 },
      { image: "/vp1-4.jpg", price: 2600, discount: 10 },
      { image: "/vp1-5.jpg", price: 2600, discount: 10 },
      { image: "/vp1-6.jpg", price: 2600, discount: 10 },
      { image: "/vp1-7.jpg", price: 2600, discount: 10 },

    ],
    contents: ["Varmala Preservation Frame"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–5 days" },
    customization: { available: true, options: ["Frame Color", "Name Engraving"] },
    material: "Resin with preserved flowers",
    dimensions: "16x16 inch",
    weight: "900g",
    careInstructions: "Keep away from moisture; wipe with dry cloth",
    specifications: { Color: "Gold & Red", Shape: "Square" },
  },
  {
    id: "vp2",
    sku: "VP-PNK-002",
    name: "Pink Blossom Varmala Preservation",
    description: "Soft pink resin frame to preserve the delicate beauty of your wedding varmalas.",
    price: 2300,
    rating: 4.8,
    reviews: 70,
    discount: 5,
    highlight: "Romantic Pick",
    category: "Floral",
    tags: ["pink", "romantic", "roses"],
    brand: "CraftiCrazy",
    seller: "Handcrafted by CraftiCrazy",
    inStock: true,
    warranty: "6 months",
    returnPolicy: "7-day easy returns",
    image: "/vp2.jpg",
    variants: [
      { image: "/vp2.jpg", price: 2300 },
      { image: "/vp2-1.jpg", price: 2350, discount: 5 },
      { image: "/vp2-2.jpg", price: 2350, discount: 5 },
      { image: "/vp2-3.jpg", price: 2350, discount: 5 },
      { image: "/vp2-4.jpg", price: 2350, discount: 5 },
      { image: "/vp2-5.jpg", price: 2350, discount: 5 },
      { image: "/vp2-6.jpg", price: 2350, discount: 5 },
      { image: "/vp2-7.jpg", price: 2350, discount: 5 },
      { image: "/vp2-8.jpg", price: 2350, discount: 5 },
      { image: "/vp2-9.jpg", price: 2350, discount: 5 },
      { image: "/vp2-10.jpg", price: 2350, discount: 5 },



    ],
    contents: ["Varmala Preservation Frame"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–5 days" },
    customization: { available: true, options: ["Couple Name", "Flower Accent"] },
    material: "Resin with embedded roses",
    dimensions: "15x15 inch",
    weight: "850g",
    careInstructions: "Avoid direct sunlight; clean with dry cloth",
    specifications: { Color: "Pink & Ivory", Shape: "Square" },
  },
];
