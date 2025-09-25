// src/Data/KeyChaindata.ts

export type Variant = {
  image: string;
  price: string; // original string in data
  discount?: number;
};


export type KeyChain = {
  id: string;
  name: string;
  description: string;
  price: string;
  rating: number;
  discount?: number;
  category: string;
  highlight?: string;
  image: string;
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

export const keyChains: KeyChain[] = [
  {
    id: "kc1",
    name: "Handmade Custom Keychain",
    description: "Elegant handmade keychain with your choice for daily use.",
    price: "₹350",
    rating: 4.7,
    discount: 5,
    category: "Personalized",
    highlight: "Unique",
    image: "/keychain8.jpeg",
    variants: [
      { image: "/keychain8.jpeg", price: "₹350", discount: 5 },
      { image: "/keychain8-1.jpg", price: "₹370", discount: 3 },
      { image: "/keychain8-2.jpg", price: "₹370", discount: 3 },
      { image: "/keychain8-3.jpg", price: "₹370", discount: 3 },
      { image: "/keychain8-4.jpg", price: "₹370", discount: 3 },
      { image: "/keychain8-5.jpg", price: "₹370", discount: 3 },


    ],
    contents: ["Handmade Keychain"],
    occasion: ["Gifting", "Daily Use"],
    delivery: { type: "Standard", availability: "Across India", estimated: "2–4 days" },
    customization: { available: true, options: ["Add Name", "Choose Color"] }
  },
  {
    id: "kc2",
    name: "Resin Embedded Keychain",
    description: "Beautiful resin keychain with floral and glitter designs inside.",
    price: "₹450",
    rating: 4.5,
    discount: 0,
    category: "Resin",
    highlight: "Artistic",
    image: "/keychain3.jpg",
    variants: [
      { image: "/keychain3.jpg", price: "₹450", discount: 0 },
      { image: "/keychain3-1.jpg", price: "₹470", discount: 2 }
    ],
    contents: ["Resin Keychain"],
    occasion: ["Gifting", "Party Favors"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–5 days" },
    customization: { available: false }
  },
  {
    id: "kc3",
    name: "Crochet Keychain",
    description: "Handmade crochet keychain, knitted uniquely with your choice of colors.",
    price: "₹300",
    rating: 4.3,
    discount: 0,
    category: "Crochet",
    highlight: "Handcrafted",
    image: "/keychain7.jpg",
    variants: [
      { image: "/keychain7.jpg", price: "₹300", discount: 0 },
      { image: "/keychain7-1.jpg", price: "₹320", discount: 2 }
    ],
    contents: ["Crochet Keychain"],
    occasion: ["Gifting", "Home Decor"],
    delivery: { type: "Standard", availability: "Across India", estimated: "2–5 days" },
    customization: { available: true, options: ["Choose Yarn Color"] }
  },
  {
    id: "kc4",
    name: "Personalized Name Keychain",
    description: "Customizable keychain featuring your name or initials.",
    price: "₹500",
    rating: 4.8,
    discount: 5,
    category: "Personalized",
    highlight: "Exclusive",
    image: "/keychain1.jpg",
    variants: [
      { image: "/keychain1.jpg", price: "₹500", discount: 5 },
      { image: "/keychain1-1.jpg", price: "₹520", discount: 3 }
    ],
    contents: ["Keychain with Nameplate"],
    occasion: ["Gifting", "Special Events"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–5 days" },
    customization: { available: true, options: ["Add Name/Initials"] }
  },
  {
    id: "kc5",
    name: "Mini Tassel Keychain",
    description: "Cute mini tassel keychain adding a fun touch to your keys.",
    price: "₹250",
    rating: 4.2,
    discount: 0,
    category: "Fashion",
    highlight: "Trendy",
    image: "/keychain2.jpg",
    variants: [
      { image: "/keychain2.jpg", price: "₹250", discount: 0 },
      { image: "/keychain2-1.jpg", price: "₹270", discount: 2 }
    ],
    contents: ["Mini Tassel Keychain"],
    occasion: ["Gifting", "Daily Use"],
    delivery: { type: "Standard", availability: "Across India", estimated: "2–4 days" },
    customization: { available: false }
  },
  {
    id: "kc6",
    name: "Metal Charm Keychain",
    description: "Stylish metal keychain with engraved charm designs.",
    price: "₹400",
    rating: 4.5,
    discount: 0,
    category: "Metal",
    highlight: "Elegant",
    image: "/keychain4.jpg",
    variants: [
      { image: "/keychain4.jpg", price: "₹400", discount: 0 },
      { image: "/keychain4-1.jpg", price: "₹420", discount: 2 }
    ],
    contents: ["Metal Charm Keychain"],
    occasion: ["Gifting", "Office Use"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–5 days" },
    customization: { available: false }
  },
  {
    id: "kc7",
    name: "Hand-painted Wooden Keychain",
    description: "Colorful hand-painted wooden keychain for unique personalization.",
    price: "₹480",
    rating: 4.3,
    discount: 0,
    category: "Wooden",
    highlight: "Artistic",
    image: "/keychain5.jpg",
    variants: [
      { image: "/keychain5.jpg", price: "₹480", discount: 0 },
      { image: "/keychain5-1.jpg", price: "₹500", discount: 2 }
    ],
    contents: ["Hand-painted Wooden Keychain"],
    occasion: ["Gifting", "Decorative"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–5 days" },
    customization: { available: true, options: ["Choose Design/Color"] }
  },
  {
    id: "kc8",
    name: "Acrylic Photo Keychain",
    description: "Custom acrylic keychain with a personal photo embedded inside.",
    price: "₹520",
    rating: 4.7,
    discount: 0,
    category: "Personalized",
    highlight: "Memorable",
    image: "/keychain6.jpg",
    variants: [
      { image: "/keychain6.jpg", price: "₹520", discount: 0 },
      { image: "/keychain6-1.jpg", price: "₹540", discount: 3 }
    ],
    contents: ["Acrylic Photo Keychain"],
    occasion: ["Gifting", "Memorable Moments"],
    delivery: { type: "Standard", availability: "Across India", estimated: "2–4 days" },
    customization: { available: true, options: ["Add Photo", "Add Name"] }
  }
];
