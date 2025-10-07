// src/Data/DiwaliHampersData.ts
export type Variant = {
  image: string;
  price: number;
  discount?: number;
};

export type DiwaliHamper = {
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

export const diwaliHampers: DiwaliHamper[] = [
  {
    id: "dh1",
    sku: "DH-SWT-001",
    name: "Festive Sweets Hamper",
    description:
      "Assorted mithai, chocolates, and dry fruits, elegantly packaged for Diwali gifting.",
    price: 1299,
    rating: 4.7,
    reviews: 23,
    discount: 10,
    highlight: "Best Seller",
    category: "Sweets",
    tags: ["Festive", "Sweets"],
    brand: "CraftiCrazy",
    seller: "Handcrafted by CraftiCrazy",
    inStock: true,
    warranty: "1 month",
    returnPolicy: "7-day easy returns",
    image: "/images/diwali/diwali1.jpg",
    variants: [
      { image: "/images/diwali/diwali1.jpg", price: 1299 },
      { image: "/images/diwali/diwali1-1.jpg", price: 1399, discount: 5 },
    ],
    contents: ["Assorted Mithai", "Chocolates", "Dry Fruits"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–5 days" },
    customization: { available: true, options: ["Add Name Card", "Gift Wrap Color"] },
    material: "Cardboard Box with decorative elements",
    dimensions: "12 x 8 x 6 inch",
    weight: "1.2kg",
    careInstructions: "Store in a cool, dry place",
    specifications: { Theme: "Festive", Packaging: "Premium" },
  },
  {
    id: "dh2",
    sku: "DH-DRY-002",
    name: "Premium Dry Fruit Hamper",
    description:
      "Almonds, cashews, raisins in decorative packaging, perfect for gifting premium Diwali treats.",
    price: 1599,
    rating: 4.8,
    reviews: 18,
    discount: 0,
    highlight: "Limited Edition",
    category: "Dry Fruits",
    tags: ["Dry Fruits", "Premium"],
    brand: "CraftiCrazy",
    seller: "Handcrafted by CraftiCrazy",
    inStock: true,
    warranty: "2 months",
    returnPolicy: "7-day easy returns",
    image: "/images/diwali/dryfruit-hamper.jpg",
    variants: [
      { image: "/images/diwali/dryfruit-hamper.jpg", price: 1599 },
      { image: "/images/diwali/dryfruit-hamper-1.jpg", price: 1699 },
    ],
    contents: ["Almonds", "Cashews", "Raisins"],
    delivery: { type: "Express", availability: "Metro Cities", estimated: "2–4 days" },
    customization: { available: true, options: ["Personalized Card"] },
    material: "Wooden Box with glass lid",
    dimensions: "14 x 10 x 6 inch",
    weight: "1.5kg",
    careInstructions: "Keep away from moisture",
    specifications: { Packaging: "Wooden Box", Seal: "Premium Transparent Lid" },
  },
  {
    id: "dh3",
    sku: "DH-LUX-003",
    name: "Luxury Gift Box",
    description:
      "Festive candles, sweets, chocolates, and decor items in a luxurious gift box.",
    price: 2499,
    rating: 5,
    reviews: 12,
    discount: 15,
    highlight: "Luxury Edition",
    category: "Luxury",
    tags: ["Luxury", "Decor"],
    brand: "CraftiCrazy",
    seller: "Handcrafted by CraftiCrazy",
    inStock: true,
    warranty: "3 months",
    returnPolicy: "7-day easy returns",
    image: "/images/diwali/luxury-box.jpg",
    variants: [
      { image: "/images/diwali/luxury-box.jpg", price: 2499 },
      { image: "/images/diwali/luxury-box-1.jpg", price: 2599, discount: 5 },
    ],
    contents: ["Candles", "Sweets", "Chocolates", "Decor Items"],
    delivery: { type: "Express", availability: "Across India", estimated: "2–3 days" },
    customization: { available: true, options: ["Box Color", "Add Name Card"] },
    material: "Premium Cardboard & Glass",
    dimensions: "15 x 12 x 8 inch",
    weight: "2kg",
    careInstructions: "Handle with care",
    specifications: { Theme: "Festive Luxury", Packaging: "Gift Box" },
  },
];
