// src/Data/GlassFrameData.ts

export type Variant = {
  image: string;
  price: string;
  discount?: number;
};

export type GlassFrame = {
  id: string;
  name: string;
  description?: string;
  price: string;
  image: string;
  rating?: number;
  discount?: number;
  category: string;
  highlight?: string;
  variants?: Variant[];
  contents?: string[];
  occasion?: string[];
  delivery?: {
    type: string;
    availability: string;
    estimated: string;
  };
  customization?: {
    available: boolean;
    options?: string[];
  };
};

export const glassFrames: GlassFrame[] = [
  {
    id: "gf1",
    name: "Wedding Keepsake Glass Frame",
    description: "Capture wedding memories elegantly with this premium keepsake frame.",
    price: "₹2,999",
    rating: 5,
    discount: 10,
    category: "Luxury",
    highlight: "Luxury",
    image: "/glass6.jpg",
    variants: [
      { image: "/glass6.jpg", price: "₹2,999", discount: 10 },
      { image: "/glass6-1.jpg", price: "₹3,199", discount: 5 },
      { image: "/glass6-2.jpg", price: "₹3,199", discount: 5 },
      { image: "/glass6-3.jpg", price: "₹3,199", discount: 5 },

    ],
    contents: ["Glass Frame", "Gift Box", "Cleaning Cloth"],
    occasion: ["Weddings", "Anniversaries"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–5 days" },
    customization: { available: true, options: ["Engrave Name", "Add Message"] },
  },
  {
    id: "gf2",
    name: "Modern Minimalist Frame",
    description: "Clean lines and clear glass make this frame a perfect addition to contemporary interiors.",
    price: "₹1,299",
    rating: 4,
    discount: 5,
    category: "Modern",
    highlight: "Discounted",
    image: "/glass5.jpg",
    variants: [{ image: "/glass5.jpg", price: "₹1,299", discount: 5 },
              { image: "/glass5-1.jpg", price: "₹1,299", discount: 5 },
              { image: "/glass5-2.jpg", price: "₹1,299", discount: 5 },
              { image: "/glass5-3.jpg", price: "₹1,299", discount: 5 },
              { image: "/glass5-4.jpg", price: "₹1,299", discount: 5 },
              { image: "/glass5-5.jpg", price: "₹1,299", discount: 5 },
              ],
              
    contents: ["Glass Frame", "Stand"],
    occasion: ["Home Decor", "Office"],
    delivery: { type: "Standard", availability: "Metro Cities", estimated: "3–6 days" },
    customization: { available: false },
  },
  {
    id: "gf3",
    name: "Personalized Glass Frame",
    description: "Customize this elegant glass frame with a name or message to make it truly unique.",
    price: "₹1,499",
    rating: 5,
    discount: 15,
    category: "Personalized",
    highlight: "Best Seller",
    image: "/glass7.jpg",
    variants: [
      { image: "/glass7.jpg", price: "₹1,499", discount: 15 },
      { image: "/glass7-1.jpg", price: "₹1,699", discount: 10 },
      { image: "/glass7-2.jpg", price: "₹1,699", discount: 10 },
      { image: "/glass7-3.jpg", price: "₹1,699", discount: 10 },

    ],
    contents: ["Glass Frame", "Gift Box", "Engraving Card"],
    occasion: ["Birthdays", "Anniversaries"],
    delivery: { type: "Express", availability: "Across India", estimated: "2–4 days" },
    customization: { available: true, options: ["Engrave Name", "Add Message"] },
  },
  {
    id: "gf4",
    name: "Floating Glass Frame",
    description: "This transparent floating frame gives your photo a magical, suspended appearance.",
    price: "₹1,799",
    rating: 4,
    discount: 3,
    category: "Modern",
    highlight: "Luxury",
    image: "/glass2.jpg",
    variants: [
      { image: "/glass2.jpg", price: "₹1,799", discount: 7 },
      { image: "/glass2-1.jpg", price: "₹1,899", discount: 5 },
      { image: "/glass2-2.jpg", price: "₹1,899", discount: 5 },
      { image: "/glass2-3.jpg", price: "₹1,899", discount: 5 },
     

    ],
    contents: ["Floating Glass Frame", "Stand"],
    occasion: ["Home Decor", "Gifting"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–5 days" },
    customization: { available: false },
  },
  {
    id: "gf5",
    name: "Premium Anniversary Glass Frame",
    description: "Celebrate anniversaries with a crystal-clear glass frame designed for elegance and love.",
    price: "₹2,499",
    rating: 5,
    discount: 15,
    category: "Personalized",
    highlight: "Best Seller",
    image: "/glass4.jpg",
    variants: [
      { image: "/glass4.jpg", price: "₹2,499", discount: 15 },
      { image: "/glass4-1.jpg", price: "₹2,699", discount: 10 },
      { image: "/glass4-2.jpg", price: "₹2,699", discount: 10 },
      { image: "/glass4-3.jpg", price: "₹2,699", discount: 10 },
      { image: "/glass4-4.jpeg", price: "₹2,699", discount: 10 },
      { image: "/glass4-5.jpg", price: "₹2,699", discount: 10 },


    ],
    contents: ["Glass Frame", "Gift Box", "Cleaning Cloth"],
    occasion: ["Anniversaries"],
    delivery: { type: "Express", availability: "Across India", estimated: "2–4 days" },
    customization: { available: true, options: ["Engrave Name", "Add Message"] },
  },
  {
    id: "gf6",
    name: "Glass Photo Cube",
    description: "Innovative cube-shaped glass frame for a 3D effect on your cherished pictures.",
    price: "₹1,799",
    rating: 5,
    discount: 5,
    category: "Modern",
    highlight: "Trendy",
    image: "/glass9.jpg",
    variants: [
      { image: "/glass9.jpg", price: "₹1,799", discount: 5 },
      { image: "/glass9-1.jpg", price: "₹1,899", discount: undefined },
      { image: "/glass9-2.jpg", price: "₹1,899", discount:  4},
      { image: "/glass9-3.jpg", price: "₹1,899", discount: 5 },

    ],
    contents: ["Glass Cube Frame"],
    occasion: ["Home Decor", "Gifting"],
    delivery: { type: "Standard", availability: "Metro Cities", estimated: "3–6 days" },
    customization: { available: false },
  },
  {
    id: "gf7",
    name: "Double Layer Glass Frame",
    description: "Two panes of clear glass create a stunning depth effect for your most beautiful photos.",
    price: "₹1,599",
    rating: 4,
    discount: 0,
    category: "Luxury",
    highlight: "Luxury",
    image: "/glass10.jpg",
    variants: [{ image: "/glass10.jpg", price: "₹1,599", discount: undefined },
              { image: "/glass10-1.jpg", price: "₹1,599", discount: 12 },
              { image: "/glass10-2.jpg", price: "₹1,599", discount: 3 },
              { image: "/glass10-3.jpg", price: "₹1,599", discount: 5 }
    ],

    contents: ["Double Layer Glass Frame", "Stand"],
    occasion: ["Home Decor", "Office"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–5 days" },
    customization: { available: false },
  },
  {
    id: "gf8",
    name: "Heart-Shaped Glass Frame",
    description: "A romantic glass frame shaped like a heart — perfect for couples and special occasions.",
    price: "₹1,299",
    rating: 5,
    discount: 10,
    category: "Personalized",
    highlight: "Best Seller",
    image: "/glass11.jpg",
    variants: [
      { image: "/glass11.jpg", price: "₹1,299", discount: 10 },
      { image: "/glass11-1.jpg", price: "₹1,399", discount: 5 },
      { image: "/glass11-2.jpg", price: "₹1,399", discount: 5 },
      { image: "/glass11-3.jpg", price: "₹1,399", discount: 5 },

    ],
    contents: ["Heart-Shaped Frame", "Gift Box"],
    occasion: ["Valentine's Day", "Anniversaries"],
    delivery: { type: "Express", availability: "Across India", estimated: "2–4 days" },
    customization: { available: true, options: ["Engrave Name", "Add Message"] },
  },
  {
    id: "gf9",
    name: "Artistic Glass Frame",
    description: "Artistic glass with intricate patterns adds an artistic touch to any photo.",
    price: "₹1,499",
    rating: 4,
    discount: 15,
    category: "Artistic",
    highlight: "Discounted",
    image: "/glass3.jpg",
    variants: [
      { image: "/glass3.jpg", price: "₹1,499", discount: 15 },
      { image: "/glass3-1.jpg", price: "₹1,699", discount: 10 },
      { image: "/glass3-2.jpg", price: "₹1,699", discount: 10 },
      { image: "/glass3-3.jpg", price: "₹1,699", discount: 10 },
      { image: "/glass3-4.jpg", price: "₹1,699", discount: 10 },
      { image: "/glass3-5.jpg", price: "₹1,699", discount: 10 },


    ],
    contents: ["Artistic Glass Frame", "Stand"],
    occasion: ["Home Decor", "Gifting"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–6 days" },
    customization: { available: false },
  },
  
];
