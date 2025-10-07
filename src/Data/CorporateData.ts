// src/Data/CorporateHampersData.ts

export type Variant = {
  image: string;
  price: number;
  discount?: number;
};

export type CorporateHamper = {
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
  material?: string;
  dimensions?: string;
  weight?: string;
  careInstructions?: string;
  maxOrderQuantity?: number;
  specifications?: {
    [key: string]: string;
  };
};

export const corporateHampers: CorporateHamper[] = [
  {
    id: "c1",
    sku: "CH-LUX-001",
    name: "Executive Luxury Hamper",
    description:
      "Premium corporate gift including fine chocolates, a luxury pen, and gourmet coffee — ideal for high-value clients and VIP events.",
    price: 4999,
    rating: 5,
    reviews: 120,
    discount: 20,
    highlight: "Luxury",
    category: "Luxury Gifts",
    tags: ["luxury", "corporate", "executive", "VIP"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "7 days replacement guarantee",
    returnPolicy: "7-day easy returns",
    image: "/corporate2.jpg",
    variants: [
      { image: "/corporate2.jpg", price: 4999, discount: 20 },
      { image: "/corporate2-1.jpg", price: 5199, discount: 15 },
      { image: "/corporate2-2.jpg", price: 5299, discount: 10 },
    ],
    contents: ["Fine Chocolates", "Luxury Pen", "Gourmet Coffee", "Elegant Packaging Box"],
    occasion: ["Corporate Gifting", "Festivals", "Client Appreciation"],
    delivery: { type: "Express", availability: "Across India", estimated: "2–3 business days" },
    customization: { available: true, options: ["Company Logo Engraving", "Custom Message Card"] },
    material: "Chocolates, Metal Pen, Coffee Beans, Cardboard",
    dimensions: "32 x 22 x 12 cm",
    weight: "2.2 kg",
    careInstructions: "Store chocolates in cool, dry place; avoid sunlight.",
    maxOrderQuantity: 10,
    specifications: {
      Chocolates: "Assorted premium dark & milk chocolates, 200g",
      Pen: "Luxury metal pen with engraving option",
      Coffee: "Gourmet Arabica beans, 250g",
      Packaging: "High-quality premium gift box",
    },
  },
  {
    id: "c2",
    sku: "CH-CLT-002",
    name: "Client Delight Hamper",
    description:
      "Curated with cookies, dry fruits, and a personalized greeting card — crafted to strengthen client relationships and leave a lasting impression.",
    price: 2999,
    rating: 4,
    reviews: 85,
    discount: 10,
    highlight: "Client Gifting",
    category: "Client Hampers",
    tags: ["client", "gift", "cookies", "dry fruits"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "7 days replacement guarantee",
    returnPolicy: "7-day easy returns",
    image: "/corporate3.jpg",
    variants: [
      { image: "/corporate3.jpg", price: 2999, discount: 10 },
      { image: "/corporate3-1.jpg", price: 3199, discount: 8 },
      { image: "/corporate3-2.jpg", price: 3299, discount: 5 },
    ],
    contents: ["Assorted Cookies", "Dry Fruits Box", "Personalized Greeting Card", "Luxury Gift Box"],
    occasion: ["Client Gifting", "Festivals", "Business Events"],
    delivery: { type: "Standard", availability: "Metro Cities", estimated: "3–5 business days" },
    customization: { available: true, options: ["Add Company Branding", "Custom Message Card"] },
    material: "Cookies, Dry Fruits, Cardstock, Gift Wrap",
    dimensions: "28 x 18 x 10 cm",
    weight: "1.5 kg",
    careInstructions: "Store in a cool, dry place; consume cookies within 7 days.",
    maxOrderQuantity: 10,
    specifications: {
      Cookies: "Assorted gourmet cookies, 200g",
      DryFruits: "Mixed premium nuts, 150g",
      Card: "Handwritten personalized greeting",
    },
  },
  {
    id: "c3",
    sku: "CH-EMP-003",
    name: "Employee Appreciation Box",
    description:
      "Celebrate your team with this thoughtful hamper filled with healthy snacks, premium tea, and a thank-you note — perfect for employee recognition.",
    price: 1999,
    rating: 5,
    reviews: 95,
    discount: 15,
    highlight: "Employee Care",
    category: "Employee Hampers",
    tags: ["employee", "gift", "snacks", "tea"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "7 days replacement guarantee",
    returnPolicy: "7-day easy returns",
    image: "/corporate1.jpg",
    variants: [
      { image: "/corporate1.jpg", price: 1999, discount: 15 },
      { image: "/corporate1-1.jpg", price: 2199, discount: 10 },
      { image: "/corporate1-2.jpg", price: 2199, discount: 10 },
      { image: "/corporate1-3.jpg", price: 2199, discount: 10 },

    ],
    contents: ["Healthy Snacks", "Premium Tea Pack", "Thank-you Note", "Eco-Friendly Packaging"],
    occasion: ["Employee Rewards", "Festive Gifts", "Team Appreciation"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–6 business days" },
    customization: { available: true, options: ["Personalized Message", "Add Company Logo"] },
    material: "Snacks, Tea Leaves, Cardstock, Gift Box",
    dimensions: "25 x 20 x 10 cm",
    weight: "1.3 kg",
    careInstructions: "Keep snacks in dry place; tea in sealed pouch.",
    maxOrderQuantity: 10,
    specifications: {
      Snacks: "Mixed healthy snacks, 200g",
      Tea: "Premium tea leaves, 150g",
      Card: "Handwritten personalized note",
    },
  },
  {
    id: "c4",
    sku: "CH-FES-004",
    name: "Festive Corporate Hamper",
    description:
      "A festive hamper packed with dry fruits, sweets, and sparkling juice — perfect for Diwali, New Year, and festival celebrations.",
    price: 3999,
    rating: 4,
    reviews: 110,
    discount: 15,
    highlight: "Festive",
    category: "Festive Hampers",
    tags: ["festive", "gift", "dry fruits", "sweets"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "7 days replacement guarantee",
    returnPolicy: "7-day easy returns",
    image: "/corporate6.jpg",
    variants: [
      { image: "/corporate6.jpg", price: 3999, discount: 15 },
      { image: "/corporate6-1.jpg", price: 4199, discount: 12 },
      { image: "/corporate6-2.jpg", price: 4199, discount: 12 },
      { image: "/corporate6-3.jpg", price: 4199, discount: 12 },

    ],
    contents: ["Premium Dry Fruits", "Indian Sweets", "Sparkling Juice Bottle", "Festive Packaging Box"],
    occasion: ["Diwali", "New Year", "Festive Gifting"],
    delivery: { type: "Express", availability: "Across India", estimated: "2–3 business days" },
    customization: { available: true, options: ["Add Festival Greeting Card"] },
    material: "Dry Fruits, Sweets, Glass Bottle, Cardboard Box",
    dimensions: "30 x 20 x 12 cm",
    weight: "2 kg",
    careInstructions: "Store in a cool, dry place; avoid direct sunlight.",
    maxOrderQuantity: 10,
    specifications: {
      DryFruits: "Assorted premium nuts, 250g",
      Sweets: "Assorted mithai, 200g",
      Juice: "Sparkling beverage, 500ml",
    },
  },
  {
    id: "c5",
    sku: "CH-WEL-005",
    name: "Wellness Office Hamper",
    description:
      "Health-focused corporate gift featuring flowers, protein bars, and fresh fruits — show care for your employees’ wellbeing and productivity.",
    price: 2499,
    rating: 5,
    reviews: 90,
    discount: 10,
    highlight: "Wellness",
    category: "Employee Hampers",
    tags: ["wellness", "health", "employee", "gift"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "7 days replacement guarantee",
    returnPolicy: "7-day easy returns",
    image: "/corporate7.jpg",
    variants: [
      { image: "/corporate7.jpg", price: 2499, discount: 10 },
      { image: "/corporate7-1.jpg", price: 2699, discount: 8 },
      { image: "/corporate7-2.jpg", price: 2699, discount: 8 },
      { image: "/corporate7-3.jpg", price: 2699, discount: 8 },
      { image: "/corporate7-4.jpg", price: 2699, discount: 8 },

    ],
    contents: ["Fresh Flowers", "Protein Bars", "Seasonal Fruits", "Wellness Note"],
    occasion: ["Employee Care", "Festivals", "Wellbeing Initiatives"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–6 business days" },
    customization: { available: true, options: ["Add Wellness Note", "Personalized Message"] },
    material: "Flowers, Protein Bars, Fresh Fruits, Cardstock",
    dimensions: "28 x 18 x 10 cm",
    weight: "1.8 kg",
    careInstructions: "Keep flowers in water; store protein bars in dry place; fruits refrigerated.",
    maxOrderQuantity: 10,
    specifications: {
      Flowers: "Seasonal fresh flowers bouquet",
      ProteinBars: "Pack of 5, assorted flavors",
      Fruits: "Seasonal fruits, 500g",
    },
  },
  {
    id: "c6",
    sku: "CH-BUS-006",
    name: "Business Class Hamper",
    description:
      "Elegant hamper with assorted chocolates, premium coffee, and an engraved keychain — designed for corporate executives and business meetings.",
    price: 3499,
    rating: 5,
    reviews: 70,
    discount: 1,
    highlight: "Executive",
    category: "Luxury Gifts",
    tags: ["business", "luxury", "executive", "gift"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "7 days replacement guarantee",
    returnPolicy: "7-day easy returns",
    image: "/corporate14.jpg",
    variants: [
      { image: "/corporate14.jpg", price: 3499, discount: 1 },
      { image: "/corporate14-1.jpg", price: 3699, discount: 5 },
      { image: "/corporate14-2.jpg", price: 3699, discount: 5 },

    ],
    contents: ["Assorted Chocolates", "Premium Coffee", "Engraved Keychain", "Luxury Box Packaging"],
    occasion: ["Corporate Events", "Festivals", "Business Meetings"],
    delivery: { type: "Express", availability: "Metro Cities", estimated: "2–4 business days" },
    customization: { available: true, options: ["Custom Engraving"] },
    material: "Chocolates, Coffee, Metal Keychain, Cardboard Box",
    dimensions: "30 x 22 x 12 cm",
    weight: "2 kg",
    careInstructions: "Store chocolates in cool, dry place; avoid sunlight.",
    maxOrderQuantity: 10,
    specifications: {
      Chocolates: "Assorted premium chocolates, 200g",
      Coffee: "Gourmet coffee, 250g",
      Keychain: "Engraved metal keychain",
    },
  },
  {
    id: "c7",
    sku: "CH-WIN-007",
    name: "Premium Wine & Cheese Hamper",
    description:
      "Exquisite wine, artisanal cheese, and gourmet crackers — an elite gift for valued business partners and celebrations.",
    price: 6499,
    rating: 5,
    reviews: 95,
    discount: 18,
    highlight: "Premium",
    category: "Luxury Gifts",
    tags: ["wine", "cheese", "luxury", "corporate"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "7 days replacement guarantee",
    returnPolicy: "7-day easy returns",
    image: "/corporate9.jpg",
    variants: [
      { image: "/corporate9.jpg", price: 6499, discount: 18 },
      { image: "/corporate9-1.jpg", price: 6799, discount: 15 },
      { image: "/corporate9-2.jpg", price: 6799, discount: 15 },
      { image: "/corporate9-3.jpg", price: 6799, discount: 15 },

    ],
    contents: ["Imported Wine", "Artisanal Cheese", "Gourmet Crackers", "Luxury Packaging"],
    occasion: ["Business Deals", "Premium Gifting", "Celebrations"],
    delivery: { type: "Express", availability: "Metro Cities", estimated: "2–4 business days" },
    customization: { available: false },
    material: "Wine, Cheese, Crackers, Cardboard Box",
    dimensions: "32 x 22 x 12 cm",
    weight: "3 kg",
    careInstructions: "Store wine upright; keep cheese refrigerated; avoid sunlight.",
    maxOrderQuantity: 5,
    specifications: {
      Wine: "Imported red wine, 750ml",
      Cheese: "Assorted artisanal cheeses, 300g",
      Crackers: "Gourmet crackers, 200g",
    },
  },
  {
    id: "c8",
    sku: "CH-TEAM-008",
    name: "Team Celebration Hamper",
    description:
      "Packed with cupcakes, cookies, chips, and soft drinks — a fun box to celebrate corporate milestones and team achievements.",
    price: 1499,
    rating: 4,
    reviews: 60,
    discount: 12,
    highlight: "Fun",
    category: "Employee Hampers",
    tags: ["team", "celebration", "fun", "snacks"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "7 days replacement guarantee",
    returnPolicy: "7-day easy returns",
    image: "/corporate15.jpg",
    variants: [
      { image: "/corporate15.jpg", price: 1499, discount: 12 },
      { image: "/corporate15-1.jpg", price: 1699, discount: 8 },
      { image: "/corporate15-2.jpg", price: 1699, discount: 8 },
      { image: "/corporate15-3.jpg", price: 1699, discount: 8 },
      { image: "/corporate15-4.jpg", price: 1699, discount: 8 },

    ],
    contents: ["Cupcakes", "Cookies", "Chips", "Soft Drinks", "Fun Packaging Box"],
    occasion: ["Team Parties", "Corporate Celebrations", "Milestone Events"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–6 business days" },
    customization: { available: true, options: ["Add Celebration Message"] },
    material: "Cupcakes, Cookies, Chips, Soft Drinks, Cardboard Box",
    dimensions: "30 x 20 x 12 cm",
    weight: "2 kg",
    careInstructions: "Keep cupcakes refrigerated; consume snacks within 5 days.",
    maxOrderQuantity: 10,
    specifications: {
      Cupcakes: "Pack of 4, assorted flavors",
      Cookies: "Assorted gourmet cookies, 200g",
      Chips: "Potato chips, 150g",
      SoftDrinks: "250ml each, pack of 2",
    },
  },
  {
    id: "c9",
    sku: "CH-ECO-009",
    name: "Eco-Friendly Corporate Hamper",
    description:
      "Sustainable hamper with jute bags, bamboo bottles, and organic snacks — perfect for green corporate gifting and eco-conscious clients.",
    price: 2799,
    rating: 5,
    reviews: 75,
    discount: 10,
    highlight: "Eco-Friendly",
    category: "Eco Hampers",
    tags: ["eco", "green", "corporate", "sustainable"],
    brand: "CraftiCrazy",
    seller: "Handmade by CraftiCrazy",
    inStock: true,
    warranty: "7 days replacement guarantee",
    returnPolicy: "7-day easy returns",
    image: "/corporate11.jpg",
    variants: [
      { image: "/corporate11.jpg", price: 2799, discount: 10 },
      { image: "/corporate11-1.jpg", price: 2999, discount: 8 },
      { image: "/corporate11-2.jpg", price: 2999, discount: 8 },
      { image: "/corporate11-3.jpg", price: 2999, discount: 8 },

    ],
    contents: ["Jute Bag", "Bamboo Bottle", "Organic Snacks", "Eco Packaging Box"],
    occasion: ["Eco Gifting", "Festivals", "Corporate Sustainability"],
    delivery: { type: "Standard", availability: "Across India", estimated: "3–6 business days" },
    customization: { available: true, options: ["Add Company Logo", "Eco Message Card"] },
    material: "Jute, Bamboo, Organic Snacks, Cardboard Box",
    dimensions: "28 x 18 x 10 cm",
    weight: "1.5 kg",
    careInstructions: "Wash jute bag; bamboo bottle reusable; store snacks in dry place.",
    maxOrderQuantity: 10,
    specifications: {
      JuteBag: "Reusable jute tote bag, 30 x 35 cm",
      BambooBottle: "Reusable bamboo water bottle, 500ml",
      Snacks: "Organic trail mix, 200g",
    },
  },
 {
  id: "c10",
  sku: "CH-ODO-010",
  name: "Office Desk Organizer",
  description:
    "Keep your workspace elegant and organized with this  featuring a stylish desk organizer, pen holder, notebook set, and motivational card — perfect for corporate gifting or employee rewards.",
  price: 1999,
  rating: 4,
  reviews: 50,
  discount: 12,
  highlight: "Productivity",
  category: "Office ",
  tags: ["office", "desk", "organizer", "productivity", "corporate"],
  brand: "CraftiCrazy",
  seller: "Handmade by CraftiCrazy",
  inStock: true,
  warranty: "7 days replacement guarantee",
  returnPolicy: "7-day easy returns",
  image: "/DeskOrganizer.jpeg",
  variants: [
    { image: "/DeskOrganizer.jpeg", price: 1999, discount: 12 },
    { image: "/corporateDeskOrganizer-1.jpg", price: 2099, discount: 10 },
    { image: "/corporateDeskOrganizer-2.jpg", price: 2199, discount: 8 },
    { image: "/corporateDeskOrganizer-3.jpg", price: 2199, discount: 8 },
    { image: "/corporateDeskOrganizer-4.jpg", price: 2199, discount: 8 },
    { image: "/corporateDeskOrganizer-5.jpg", price: 2199, discount: 8 },
    { image: "/corporateDeskOrganizer-6.jpg", price: 2199, discount: 8 },
    { image: "/corporateDeskOrganizer-7.jpg", price: 2199, discount: 8 },

  ],
  contents: ["Desk Organizer", "Pen Holder", "Notebook Set", "Motivational Card"],
  occasion: ["Corporate Gifting", "Employee Rewards", "Workspace Upgrade"],
  delivery: { type: "Standard", availability: "Across India", estimated: "3–5 business days" },
  customization: { available: true, options: ["Add Company Logo", "Custom Note"] },
  material: "Wood, Metal, Paper",
  dimensions: "30 x 20 x 12 cm",
  weight: "1.2 kg",
  careInstructions: "Wipe with a dry cloth; avoid water and sunlight exposure.",
  maxOrderQuantity: 10,
  specifications: {
    DeskOrganizer: "Wooden multi-compartment organizer for stationery",
    PenHolder: "Metal pen holder for 10 pens",
    NotebookSet: "Set of 2 notebooks, 80 pages each",
    Card: "Motivational card with corporate message",
  },
}
];
