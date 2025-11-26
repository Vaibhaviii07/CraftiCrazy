// src/Data/ResinJewelryData.ts
import { womenAccessories } from "./WomenAccessoriesData";

const selectedAccessories = womenAccessories.filter(item =>
  ["Earrings", "Pendant", "Necklaces", "Bracelets", "Rings", "Sets"].includes(item.category)
);

export type Variant = {
  image: string;
  price: number;
  discount?: number;
};

export type ResinJewelry = {
  id: string;
  sku?: string;
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
  inStock?: boolean;
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
  occasion?: string[];
};
export const originalResinJewelry: ResinJewelry[] = [
  
  {
    id: "rj12",
    sku: "RJ-HC-012",
    name: "Resin Hair Clips",
    description: "Trendy resin hair clips with colorful finish.",
    price: 300,
    rating: 4.2,
    reviews: 75,
    discount: 8,
    highlight: "Budget Pick",
    category: "Hair Accessories",
    tags: ["hair", "clip", "resin"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "2 months",
    returnPolicy: "7-day returns",
    image: "/jewell4.jpg",
    variants: [
      { image: "/jewell4.jpg", price: 300, discount: 8 },
      { image: "/jewell4-1.jpg", price: 350, discount: 10 },
      { image: "/jewell4-2.jpg", price: 350, discount: 10 },
      { image: "/jewell4-3.jpg", price: 350, discount: 10 },
      { image: "/jewell4-4.jpg", price: 350, discount: 10 },
      { image: "/jewell4-5.jpg", price: 350, discount: 10 },
      { image: "/jewell4-6.jpg", price: 350, discount: 10 },
      { image: "/jewell4-7.jpg", price: 350, discount: 10 },

    ],
    contents: ["2 Hair Clips", "Gift Pouch"],
    occasion: ["Daily Use", "Gifting"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–5 days" },
    customization: { available: true, options: ["Custom Colors"] },
    material: "Resin",
    dimensions: "2.5 inches",
    weight: "15g",
    careInstructions: "Handle gently",
    specifications: { Color: "Colorful Mix", Style: "Hair Clips" },
  },
  {
    id: "rj13",
    sku: "RJ-ER-013",
    name: "Resin Traditional Earrings",
    description: "Elegant handmade resin earrings with traditional detailing.",
    price: 950,
    rating: 4.8,
    reviews: 170,
    discount: 10,
    highlight: "Cultural Pick",
    category: "Earrings",
    tags: ["traditional", "earrings", "resin"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "6 months warranty",
    returnPolicy: "7-day returns",
    image: "/jewell9.jpg",
    variants: [
      { image: "/jewell9.jpg", price: 950, discount: 10 },
      { image: "/jewell9-1.jpg", price: 1000, discount: 8 },
      { image: "/jewell9-2.jpg", price: 1000, discount: 8 },
      { image: "/jewell9-3.jpg", price: 1000, discount: 8 },
      { image: "/jewell9-4.jpg", price: 1000, discount: 8 },
      { image: "/jewell9-5.jpg", price: 1000, discount: 8 },
      { image: "/jewell9-6.jpg", price: 1000, discount: 8 },
      { image: "/jewell9-7.jpg", price: 1000, discount: 8 },
      { image: "/jewell9-8.jpg", price: 1000, discount: 8 },
      { image: "/jewell9-9.jpg", price: 1000, discount: 8 },
      { image: "/jewell9-10.jpg", price: 1000, discount: 8 },
      { image: "/jewell9-11.jpg", price: 1000, discount: 8 },
      { image: "/jewell9-12.jpg", price: 1000, discount: 8 },
      { image: "/jewell9-13.jpg", price: 1000, discount: 8 },
      { image: "/jewell9-14.jpg", price: 1000, discount: 8 },
      { image: "/jewell9-15.jpg", price: 1000, discount: 8 },


    ],
    contents: ["Earrings", "Gift Box"],
    occasion: ["Festivals", "Weddings"],
    delivery: { type: "Express", availability: "Across India", estimated: "2–5 days" },
    customization: { available: false },
    material: "Resin with traditional design",
    dimensions: "2.5 inches",
    weight: "35g",
    careInstructions: "Keep away from moisture",
    specifications: { Color: "Glossy Gold & Resin", Style: "Traditional Earrings" },
  },
  {
    id: "rj14",
    sku: "RJ-AC-014",
    name: "Resin Bookmark",
    description: "Handmade resin bookmark with floral inclusions.",
    price: 350,
    rating: 4.3,
    reviews: 85,
    discount: 8,
    highlight: "Reader’s Choice",
    category: "Accessories",
    tags: ["bookmark", "floral", "resin"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "2 months",
    returnPolicy: "No returns",
    image: "/jewell11.jpg",
    variants: [
      { image: "/jewell11.jpg", price: 350, discount: 8 },
      { image: "/jewell11-1.jpg", price: 400, discount: 5 },
      { image: "/jewell11-2.jpg", price: 400, discount: 5 },
      { image: "/jewell11-3.jpg", price: 400, discount: 5 },
      { image: "/jewell11-4.jpg", price: 400, discount: 5 },
      { image: "/jewell11-5.jpg", price: 400, discount: 5 },
      { image: "/jewell11-6.jpg", price: 400, discount: 5 },
      { image: "/jewell11-7.jpg", price: 400, discount: 5 },
      { image: "/jewell11-8.jpg", price: 400, discount: 5 },
      { image: "/jewell11-9.jpg", price: 400, discount: 5 },

    ],
    contents: ["Resin Bookmark"],
    occasion: ["Reading", "Gifting"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–6 days" },
    customization: { available: true, options: ["Add Name"] },
    material: "Resin with floral inclusions",
    dimensions: "5 inches",
    weight: "15g",
    careInstructions: "Avoid bending",
    specifications: { Color: "Transparent Floral", Style: "Bookmark" },
  },
];
export const resinJewelry: ResinJewelry[] = [
  ...originalResinJewelry,
  ...womenAccessories
    .filter(item => item.material?.toLowerCase().includes("resin")) // only resin items
    .map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      rating: item.rating,
      reviews: item.reviews,
      discount: item.discount,
      highlight: item.highlight,
      category: item.category,
      tags: item.tags,
      brand: item.brand,
      seller: item.seller,
      inStock: item.inStock,
      warranty: item.warranty,
      returnPolicy: item.returnPolicy,
      image: item.image,
      variants: item.variants,
      contents: item.contents,
      delivery: item.delivery,
      customization: item.customization,
      material: item.material,
      dimensions: item.dimensions,
      weight: item.weight,
      careInstructions: item.careInstructions,
      specifications: item.specifications,
      occasion: item.occasion,
    })),
];