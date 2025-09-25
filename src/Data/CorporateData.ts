// src/Data/CorporateHampersData.ts

export type Variant = {
  image: string;
  price: string;
  discount: number;
};

export type CorporateHamper = {
  id: string;
  name: string;
  description?: string;
  price: string;
  image: string;
  rating?: number;
  discount?: number;
  category: string;
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
  highlight?: string;
  popularity?: number; 
  newArrival?: boolean; 
};



export const corporateHampers: CorporateHamper[] = [
  {
    id: "c1",
    name: "Executive Luxury Hamper",
    description:
      "Premium corporate gift including fine chocolates, a luxury pen, and gourmet coffee — ideal for high-value clients.",
    price: "₹4,999",
    rating: 5,
    discount: 20,
    category: "Luxury Gifts",
    popularity: 95,
    newArrival: true,
    image: "/corporate2.jpg",
    variants: [
      { image: "/corporate2.jpg", price: "₹4,999", discount: 20 },
      { image: "/corporate2-1.jpg", price: "₹5,199", discount: 15 },
      { image: "/corporate2-2.jpg", price: "₹5,199", discount: 15 },

    ],
    contents: ["Fine Chocolates", "Luxury Pen", "Gourmet Coffee"],
    delivery: { type: "Express", availability: "Across India", estimated: "2–3 days" },
    customization: { available: true, options: ["Company Logo Engraving"] },
    occasion: ["Corporate Gifting", "Festivals"],
  },
  {
    id: "c2",
    name: "Client Delight Hamper",
    description:
      "Curated with cookies, dry fruits, and a personalized greeting — crafted to strengthen client relationships.",
    price: "₹2,999",
    rating: 4,
    discount: 10,
    category: "Client Hampers",
    popularity: 85,
    newArrival: false,
    image: "/corporate3.jpg",
    variants: [
      { image: "/corporate3.jpg", price: "₹2,999", discount: 10 },
      { image: "/corporate3-1.jpg", price: "₹3,199", discount: 8 },
      { image: "/corporate3-2.jpg", price: "₹3,199", discount: 8 },
      { image: "/corporate3-3.jpg", price: "₹3,199", discount: 8 },

    ],
    contents: ["Cookies", "Dry Fruits", "Personalized Greeting Card"],
    delivery: { type: "Standard", availability: "Metro Cities", estimated: "3–5 days" },
    customization: { available: true, options: ["Add Company Branding"] },
    occasion: ["Client Gifting", "Festivals"],
  },
  {
    id: "c3",
    name: "Employee Appreciation Box",
    description:
      "Celebrate your team with this thoughtful hamper filled with healthy snacks, premium tea, and a thank-you note.",
    price: "₹1,999",
    rating: 5,
    discount: 15,
    category: "Employee Hampers",
    popularity: 90,
    newArrival: false,
    image: "/corporate1.jpg",
    variants: [
      { image: "/corporate1.jpg", price: "₹1,999", discount: 15 },
      { image: "/corporate1-1.jpg", price: "₹2,199", discount: 10 },
    ],
    contents: ["Healthy Snacks", "Premium Tea", "Thank-you Note"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–6 days" },
    customization: { available: true, options: ["Personalized Message"] },
    occasion: ["Employee Rewards", "Festive Gifts"],
  },
  {
    id: "c4",
    name: "Business Class Hamper",
    description:
      "Elegant hamper with assorted chocolates, premium coffee, and an engraved keychain — designed for executives.",
    price: "₹3,499",
    rating: 5,
    discount: undefined,
    category: "Luxury Gifts",
    popularity: 70,
    newArrival: false,
    image: "/corporate14.jpg",
    variants: [
      { image: "/corporate14.jpg", price: "₹3,499", discount: 0 },
      { image: "/corporate14-1.jpg", price: "₹3,699", discount: 5 },
    ],
    contents: ["Assorted Chocolates", "Premium Coffee", "Engraved Keychain"],
    delivery: { type: "Express", availability: "Metro Cities", estimated: "2–4 days" },
    customization: { available: true, options: ["Custom Engraving"] },
    occasion: ["Corporate Events", "Festivals"],
  },
  {
    id: "c5",
    name: "Festive Corporate Hamper",
    description:
      "A festive hamper packed with dry fruits, sweets, and sparkling juice — perfect for Diwali and New Year gifting.",
    price: "₹3,999",
    rating: 4,
    discount: 15,
    category: "Festive Hampers",
    popularity: 88,
    newArrival: true,
    image: "/corporate6.jpg",
    variants: [
      { image: "/corporate6.jpg", price: "₹3,999", discount: 15 },
      { image: "/corporate6-1.jpg", price: "₹4,199", discount: 12 },
    ],
    contents: ["Dry Fruits", "Indian Sweets", "Sparkling Juice"],
    delivery: { type: "Express", availability: "Across India", estimated: "2–3 days" },
    customization: { available: true, options: ["Add Festival Greeting Card"] },
    occasion: ["Diwali", "New Year"],
  },
  {
    id: "c6",
    name: "Wellness Office Hamper",
    description:
      "Health-focused corporate gift featuring flowers, protein bars, and fruits — show care for your employees’ wellbeing.",
    price: "₹2,499",
    rating: 5,
    discount: 10,
    category: "Employee Hampers",
    popularity: 80,
    newArrival: false,
    image: "/corporate7.jpg",
    variants: [
      { image: "/corporate7.jpg", price: "₹2,499", discount: 10 },
      { image: "/corporate7-1.jpg", price: "₹2,699", discount: 8 },
    ],
    contents: ["Fresh Flowers", "Protein Bars", "Seasonal Fruits"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–6 days" },
    customization: { available: true, options: ["Add Wellness Note"] },
    occasion: ["Employee Care", "Festivals"],
  },
  {
    id: "c7",
    name: "Premium Wine & Cheese Hamper",
    description:
      "Exquisite wine, artisanal cheese, and gourmet crackers — an elite gift for valued business partners.",
    price: "₹6,499",
    rating: 5,
    discount: 18,
    category: "Luxury Gifts",
    popularity: 92,
    newArrival: true,
    image: "/corporate9.jpg",
    variants: [
      { image: "/corporate9.jpg", price: "₹6,499", discount: 18 },
      { image: "/corporate9-1.jpg", price: "₹6,799", discount: 15 },
    ],
    contents: ["Imported Wine", "Artisanal Cheese", "Gourmet Crackers"],
    delivery: { type: "Express", availability: "Metro Cities", estimated: "2–4 days" },
    customization: { available: false },
    occasion: ["Business Deals", "Premium Gifting"],
  },
  {
    id: "c8",
    name: "Team Celebration Hamper",
    description:
      "Packed with cupcakes, cookies, chips, and soft drinks — a fun box to celebrate corporate milestones.",
    price: "₹1,499",
    rating: 4,
    discount: 12,
    category: "Employee Hampers",
    popularity: 75,
    newArrival: false,
    image: "/corporate15.jpg",
    variants: [
      { image: "/corporate15.jpg", price: "₹1,499", discount: 12 },
      { image: "/corporate15-1.jpg", price: "₹1,699", discount: 8 },
    ],
    contents: ["Cupcakes", "Cookies", "Chips", "Soft Drinks"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–6 days" },
    customization: { available: true, options: ["Add Celebration Message"] },
    occasion: ["Team Parties", "Corporate Celebrations"],
  },
  {
    id: "c9",
    name: "Eco-Friendly Corporate Hamper",
    description:
      "Sustainable hamper with jute bags, bamboo bottles, and organic snacks — perfect for green corporate gifting.",
    price: "₹2,799",
    rating: 5,
    discount: 10,
    category: "Eco Hampers",
    popularity: 89,
    newArrival: false,
    image: "/corporate11.jpg",
    variants: [
      { image: "/corporate11.jpg", price: "₹2,799", discount: 10 },
      { image: "/corporate11-1.jpg", price: "₹2,999", discount: 8 },
    ],
    contents: ["Jute Bag", "Bamboo Bottle", "Organic Snacks"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–6 days" },
    customization: { available: true, options: ["Add Company Logo"] },
    occasion: ["Eco Gifting", "Festivals"],
  },
  {
    id: "c10",
    name: "Golden Corporate Treat Box",
    description:
      "Luxury golden gift box with fine dry fruits, chocolate truffles — designed to impress clients.",
    price: "₹5,499",
    rating: 5,
    discount: 20,
    category: "Client Hampers",
    popularity: 97,
    newArrival: true,
    image: "/corporate13.jpg",
    variants: [
      { image: "/corporate13.jpg", price: "₹5,499", discount: 20 },
      { image: "/corporate13-1.jpg", price: "₹5,799", discount: 15 },
    ],
    contents: ["Fine Dry Fruits", "Chocolate Truffles"],
    delivery: { type: "Express", availability: "Metro Cities", estimated: "2–4 days" },
    customization: { available: true, options: ["Custom Branding"] },
    occasion: ["Client Gifting", "Festive Occasions"],
  },
];
