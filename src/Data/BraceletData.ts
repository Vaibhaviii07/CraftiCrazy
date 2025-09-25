// src/Data/BraceletData.ts

export type Variant = {
  image: string;
  price: string;
  discount: number;
};

export type Bracelet = {
  id: string;
  name: string;
  description: string;
  price: string;
  rating: number;
  discount: number;
  category: string;
  highlight: string;
  image: string;
  popularity?: number; // <-- Add this
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
  occasion?: string[];
};

export const bracelets: Bracelet[] = [
  {
    id: "b1",
    name: "Beaded Friendship Bracelet",
    description:
      "Colorful handmade bracelet, perfect for gifting friends. Lightweight, stylish, and full of positive vibes.",
    price: "₹250",
    rating: 4.6,
    discount: 10,
    category: "Beaded",
    highlight: "Handmade",
    image: "/bracelet1.jpg",
    variants: [
      { image: "/bracelet1.jpg", price: "₹250", discount: 10 },
      { image: "/bracelet1-1.jpg", price: "₹270", discount: 5 },
      { image: "/bracelet1-2.jpg", price: "₹270", discount: 5 },
      { image: "/bracelet1-3.jpg", price: "₹270", discount: 5 },
      { image: "/bracelet1-4.jpg", price: "₹270", discount: 5 },


    ],
    contents: ["Beaded Handmade Bracelet"],
    delivery: {
      type: "Standard",
      availability: "Across India",
      estimated: "3–5 business days",
    },
    customization: { available: true, options: ["Add Name Beads"] },
    occasion: ["Friendship Day", "Birthday"],
  },
  {
    id: "b2",
    name: "Macrame Charm Bracelet",
    description:
      "Stylish macrame bracelet with adjustable knot and charms — a trendy addition to casual outfits.",
    price: "₹320",
    rating: 4.4,
    discount: 15,
    category: "Macrame",
    highlight: "Trendy",
    image: "/bracelet2.jpg",
    variants: [
      { image: "/bracelet2.jpg", price: "₹320", discount: 15 },
      { image: "/bracelet2-1.jpg", price: "₹350", discount: 8 },
      { image: "/bracelet2-2.jpg", price: "₹350", discount: 8 },
      { image: "/bracelet2-3.jpg", price: "₹350", discount: 8 },
      { image: "/bracelet2-4.jpg", price: "₹350", discount: 8 },
      { image: "/bracelet2-5.jpg", price: "₹350", discount: 8 },


    ],
    contents: ["Macrame Bracelet", "Adjustable Knot", "Charm Set"],
    delivery: { type: "Express", availability: "Metro Cities", estimated: "2–4 days" },
    customization: { available: true, options: ["Choose Charm Design"] },
    occasion: ["Birthday", "Casual Gift"],
  },
  {
    id: "b3",
    name: "Resin Handmade Bracelet",
    description:
      "Durable resin bracelet with a handcrafted finish. Artistic and unique, made for style lovers.",
    price: "₹450",
    rating: 4.7,
    discount: 12,
    category: "Resin",
    highlight: "Artistic",
    image: "/bracelet3.jpg",
    variants: [
      { image: "/bracelet3.jpg", price: "₹450", discount: 12 },
      { image: "/bracelet3-1.jpg", price: "₹480", discount: 10 },
      { image: "/bracelet3-2.jpg", price: "₹480", discount: 10 },
      { image: "/bracelet3-3.jpg", price: "₹480", discount: 10 },
      { image: "/bracelet3-4.jpg", price: "₹480", discount: 10 },
      { image: "/bracelet3-5.jpg", price: "₹480", discount: 10 },



    ],
    contents: ["Handcrafted Resin Bracelet"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–6 days" },
    customization: { available: true, options: ["Choose Resin Color"] },
    occasion: ["Anniversary", "Birthday"],
  },
  {
    id: "b4",
    name: "Thread Woven Bracelet",
    description:
      "Hand-woven thread bracelet with vibrant colors. A fun and stylish accessory for daily wear.",
    price: "₹280",
    rating: 4.2,
    discount: 5,
    category: "Thread",
    highlight: "Colorful",
    image: "/bracelet4.jpg",
    variants: [
      { image: "/bracelet4.jpg", price: "₹280", discount: 5 },
      { image: "/bracelet4-1.jpg", price: "₹300", discount: 3 },
      { image: "/bracelet4-2.jpg", price: "₹300", discount: 3 },
      { image: "/bracelet4-3.jpg", price: "₹300", discount: 3 },
      { image: "/bracelet4-4.jpg", price: "₹300", discount: 3 },
      { image: "/bracelet4-5.jpg", price: "₹300", discount: 3 },

    ],
    contents: ["Thread Bracelet", "Adjustable Strap"],
    delivery: { type: "Standard", availability: "Across India", estimated: "4–7 days" },
    customization: { available: true, options: ["Choose Thread Color"] },
    occasion: ["Friendship Day", "Birthday"],
  },
  {
    id: "b5",
    name: "Charm Anklet Bracelet",
    description:
      "Delicate bracelet with small charms and handmade finish. Perfect for festive and casual occasions.",
    price: "₹350",
    rating: 4.5,
    discount: 20,
    category: "Charm",
    highlight: "Delicate",
    image: "/bracelet5.jpg",
    variants: [
      { image: "/bracelet5.jpg", price: "₹350", discount: 20 },
      { image: "/bracelet5-1.jpg", price: "₹370", discount: 15 },
      { image: "/bracelet5-2.jpg", price: "₹370", discount: 15 },
      { image: "/bracelet5-3.jpg", price: "₹370", discount: 15 },
      { image: "/bracelet5-4.jpg", price: "₹370", discount: 15 },
      { image: "/bracelet5-5.jpg", price: "₹370", discount: 15 },
      { image: "/bracelet5-6.jpg", price: "₹370", discount: 15 },
      { image: "/bracelet5-7.jpg", price: "₹370", discount: 15 },

    ],
    contents: ["Charm Bracelet", "Extra Charms"],
    delivery: { type: "Standard", availability: "Metro Cities", estimated: "3–5 days" },
    customization: { available: true, options: ["Add Custom Charm"] },
    occasion: ["Birthday", "Festive Gift"],
  },
  {
    id: "b6",
    name: "Couple Matching Bracelet Set",
    description:
      "Set of two matching bracelets for couples, featuring adjustable straps and engraved initials.",
    price: "₹650",
    rating: 4.7,
    discount: 22,
    category: "Couple",
    highlight: "Romantic",
    image: "/bracelet10.jpg",
    variants: [
      { image: "/bracelet10.jpg", price: "₹650", discount: 22 },
      { image: "/bracelet10-1.jpg", price: "₹700", discount: 18 },
      { image: "/bracelet10-2.jpg", price: "₹700", discount: 18 },
      { image: "/bracelet10-3.jpg", price: "₹700", discount: 18 },
      { image: "/bracelet10-4.jpg", price: "₹700", discount: 18 },
      { image: "/bracelet10-5.jpg", price: "₹700", discount: 18 },
      { image: "/bracelet10-.jpg", price: "₹700", discount: 18 },

    ],
    contents: ["2 Matching Bracelets", "Gift Box"],
    delivery: { type: "Express", availability: "Across India", estimated: "2–4 days" },
    customization: { available: true, options: ["Engraved Initials", "Color Choice"] },
    occasion: ["Valentine’s Day", "Anniversary", "Birthday"],
  },
];
