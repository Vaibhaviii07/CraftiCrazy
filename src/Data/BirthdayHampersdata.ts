export type Variant = {
  image: string;
  price: string;
  discount: number;
};

export type BirthdayHamper = {
  id: string;
  name: string;
  description: string;
  price: string;
  rating: number;
  discount: number;
  category: string;
  highlight: string;
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
  occasion?: string[];
};

export const birthdayHampers = [
  {
    id: "bh-1",
    name: "Husband’s Luxury Surprise",
    description: "Pamper your beloved with this premium hamper ...",
    price: "₹2,499",
    rating: 5,
    discount: 15,
    category: "Him",
    highlight: "Luxury",
    image: "/Birthday6.jpg",
    variants: [
      { image: "/Birthday6.jpg", price: "₹2,499", discount: 15 },
      { image: "/Birthday6-1.jpg", price: "₹2,599", discount: 9 },
      { image: "/birthday6-2.jpg", price: "₹2,699", discount: 15 },
      { image: "/Birthday6-3.jpg", price: "₹2,799", discount: 10 },
      { image: "/Birthday6-4.jpg", price: "₹2,899", discount: 12 },
      { image: "/Birthday6-5.jpg", price: "₹600", discount: 12 },
    ],
    contents: [
      "Premium Gourmet Chocolates (250g)",
      "Branded Perfume (100ml)",
      "Handwritten Greeting Card",
      "Luxury Gift Box Packaging as per your choice",
    ],
    delivery: {
      type: "Standard & Express",
      availability: "Across India",
      estimated: "2–5 business days",
    },
    customization: {
      available: true,
      options: ["Custom Card Message", "Add Photo Print", "Choose Chocolate Flavour", "Customize your hamper as per your choice"],
    },
    occasion: ["Birthday", "Anniversary"],
  },
  {
    id: "bh-2",
    name: "Sweet Indulgence Hamper",
    description:
      "Delight the senses with an irresistible collection of cookies, cupcakes, and handcrafted chocolates — the perfect sweet surprise for a birthday to remember.",
    price: "₹1,999",
    rating: 4,
    discount: 20,
    category: "Her",
    highlight: "Foodie",
    image: "/Birthday8.jpg",
      variants: [
      { image: "/Birthday8.jpg", price: "₹299", discount: 15 },
      { image: "/Birthday8-1.jpg", price: "₹1,099", discount: 9 },
      { image: "/Birthday8-2.jpg", price: "₹1000", discount: 15 },
      { image: "/Birthday8-3.jpg", price: "₹1200", discount: 10 },
      { image: "/Birthday8-4.jpg", price: "₹800", discount: 4 },
      { image: "/Birthday8-5.jpg", price: "₹800", discount: 10 },

    
    ],

    contents: [
      "Assorted Cookies Box",
      "Mini Cupcake Set",
      "Handcrafted Chocolate Pack",
      "Greeting Card",
    ],
    delivery: {
      type: "Standard",
      availability: "Metro Cities",
      estimated: "3–7 business days",
    },
    customization: {
      available: false,
    },
    occasion: ["Birthday"],
  },
  {
    id: "bh-3",
    name: "Mini Delight Hamper",
    description: "A charming, compact gift with delectable chocolates and a personalized photo frame — small in size but big on love and thoughtfulness.",
    price: "₹999",
    rating: 3,
    discount: null,
    category: "Friend",
    highlight: "Budget",
    image: "/Birthday2.jpg",
     variants: [
      { image: "/Birthday2.jpg", price: "₹299", discount: 15 },
      { image: "/Birthday2-1.jpg", price: "₹1,099", discount: 9 },
      { image: "/Birthday2-2.jpg", price: "₹1000", discount: 15 },
    
    ],
    contents: ["Delectable Chocolates", "Personalized Photo Frame"],
    delivery: { type: "Standard", availability: "Metro Cities", estimated: "3–5 business days" },
    customization: { available: true, options: ["Add Small Card"] },
    occasion: ["Birthday"],
  },
  {
    id: "bh-4",
    name: "Romantic Surprise Box",
    description:
      "An enchanting hamper featuring roses, scented candles, chocolates, and a love note — designed to add magic to special birthdays.",
    price: "₹2,899",
    rating: 5,
    discount: 12,
    category: "Couple",
    highlight: "Romantic",
    image: "/Birthday11.jpeg",
      variants: [
      { image: "/Birthday11.jpeg", price: "₹2,499", discount: 15 },
      { image: "/Birthday11-1.jpg", price: "₹2,599", discount: 9 },
      { image: "/Birthday11-2.jpg", price: "₹2,699", discount: 15 },
      { image: "/Birthday11-3.jpg", price: "₹2,799", discount: 10 },
      { image: "/Birthday11-4.jpg", price: "₹2,899", discount: 12 },
    ],

    contents: [
      "Fresh Red Roses",
      "Scented Candle Set",
      "Luxury Chocolate Box",
      "Personalized Love Note",
    ],
    delivery: {
      type: "Express",
      availability: "Metro Cities",
      estimated: "1–3 business days",
    },
    customization: {
      available: true,
      options: ["Custom Love Note", "Choose Candle Fragrance"," Custom Jewelry Box"],
    },
    occasion: ["Birthday", "Anniversary", "Valentine’s Day"],
  },
  {
    id: "bh-5",
    name: "Office Buddy Hamper",
    description:
      "A thoughtful gift for colleagues — featuring coffee, snacks, a diary, and a pen set to celebrate birthdays in style.",
    price: "₹1,899",
    rating: 4,
    discount: 15,
    category: "Colleague",
    highlight: "Workplace",
    image: "/Birthday12.jpg",
    variants: [
      { image: "/Birthday12.jpg", price: "₹2,499", discount: 15 },
      { image: "/Birthday12-1.jpg", price: "₹2,599", discount: 9 },
      { image: "/Birthday12-2.jpg", price: "₹2,699", discount: 15 },
      { image: "/Birthday12-3.jpg", price: "₹2,799", discount: 10 },
      { image: "/Birthday12-4.jpg", price: "₹2,899", discount: 12 },
    ],

    contents: [
      "Premium Coffee Pack",
      "Healthy Snacks Box",
      "Stylish Diary",
      "Elegant Pen Set",
    ],
    delivery: {
      type: "Standard",
      availability: "Across India",
      estimated: "3–6 business days",
    },
    customization: {
      available: true,
      options: ["Add Company Logo on Diary"],
    },
    occasion: ["Birthday", "Work Anniversary"],
  },
  
  {
    id: "bh-6",
    name: "Personalized Treasure Box",
    description: "A beautifully curated gift box featuring a custom mug, assorted chocolates, and a heartfelt greeting card — make their birthday truly personal and memorable.",
    price: "₹2,499",
    rating: 5,
    discount: 15,
    category: "Her",
    highlight: "Personalized",
    image: "/Birthday7.jpg",
    variants: [
      { image: "/Birthday7.jpg", price: "₹2,499", discount: 15 },
      { image: "/Birthday7-1.jpg", price: "₹2,599", discount: 9 },
      { image: "/Birthday7-2.jpg", price: "₹2,699", discount: 15 },
      { image: "/Birthday7-3.jpg", price: "₹2,799", discount: 10 },
    
    ],
    contents: ["Custom Mug", "Assorted Chocolates", "Heartfelt Greeting Card"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–6 business days" },
    customization: { available: true, options: ["Add Custom Name", "Choose Box Color"] },
    occasion: ["Birthday", "Anniversary"],
  },
  {
    id: "bh-7",
    name: "Wife’s Romantic Surprise",
    description: "Sweep her off her feet with premium makeup, fresh flowers, and a personalized greeting card — a birthday hamper designed to show your love and care.",
    price: "₹2,499",
    rating: 5,
    discount: 15,
    category: "Her",
    highlight: "Romantic",
    image: "/Birthday4.jpg",
    variants: [
      { image: "/Birthday4.jpg", price: "₹2,499", discount: 15 },
      { image: "/Birthday4-1.jpg", price: "₹2,499", discount: 15 },
      { image: "/Birthday4-2.jpg", price: "₹1,499", discount: 15 },
      { image: "/Birthday4-3.jpg", price: "₹2,000", discount: 15 },
      { image: "/Birthday4-4.jpg", price: "₹2,000", discount: 15 },


    ],
    contents: ["Premium Makeup", "Fresh Flowers", "Personalized Greeting Card"],
    delivery: { type: "Express", availability: "Across India", estimated: "2–4 business days" },
    customization: { available: true, options: ["Add Personal Message", "Choose Flower Type"] },
    occasion: ["Birthday", "Anniversary"],
  },
   {
    id: "bh-8",
   name: "Desi Celebration Hamper",
    description: "Celebrate tradition and joy with chocolates, fresh flowers, bangles, elegant earrings, a matching saree, and a personalized card — a complete birthday experience.",
    price: "₹3,499",
    rating: 5,
    discount: 15,
    category: "Her",
    highlight: "Traditional",
    image: "/GirlHamper.jpeg",
    variants: [
      { image: "/GirlHamper.jpeg", price: "₹3,499", discount: 15 },
      { image: "/GirlHamper-1.jpeg", price: "₹3,499", discount: 5 },
      { image: "/GirlHamper-2.jpeg", price: "₹3,499", discount: 10 },
      { image: "/GirlHamper-3.jpeg", price: "₹3,499", discount: 25 },
      { image: "/GirlHamper4.jpg", price: "₹3,499", discount: 7 },
      { image: "/GirlHamper-5.jpeg", price: "₹3,499", discount: 15 },
      { image: "/GirlHamper-6.jpg", price: "₹3,499", discount: 12 },

    ],
    contents: ["Chocolates", "Fresh Flowers", "Bangles & Earrings", "Matching Saree", "Personalized Card"],
    delivery: { type: "Standard", availability: "Metro Cities", estimated: "3–7 business days" },
    customization: { available: true, options: ["Add Custom Message", "Choose Saree Color"] },
    occasion: ["Birthday", "Traditional"],
  },
];
