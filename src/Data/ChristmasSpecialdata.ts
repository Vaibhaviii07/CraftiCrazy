// src/Data/ChristmasSpecialsData.ts
export type Variant = {
  image: string;
  price: number;
  discount?: number;
};

export type ChristmasSpecial = {
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

export const christmasSpecials: ChristmasSpecial[] = [
  {
    id: "cs1",
    sku: "CS-HMP-001",
    name: "Deluxe Christmas Hamper",
    description: "Luxurious hamper filled with gourmet treats and festive goodies, perfect for gifting this Christmas.",
    price: 2500,
    rating: 4.8,
    reviews: 56,
    discount: 15,
    highlight: "Best Seller",
    category: "Hamper",
    tags: ["Christmas", "Gourmet", "Luxury", "Holiday Special"],
    brand: "CraftiCrazy",
    seller: "Handcrafted by CraftiCrazy",
    inStock: true,
    warranty: "7-day freshness guarantee",
    returnPolicy: "7-day easy returns",
    image: "/ChristmasHamper1.jpg",
    variants: [
      { image: "/ChristmasHamper1.jpg", price: 2500, discount: 15 },
      { image: "/ChristmasHamper1-1.jpg", price: 2600, discount: 10 },
      { image: "/ChristmasHamper1-2.jpg", price: 2600, discount: 10 },

    ],
    contents: ["Chocolate Box", "Mini Wine Bottle", "Christmas Cookies", "Decorative Candle"],
    delivery: { type: "Home Delivery", availability: "Nationwide", estimated: "2–4 days" },
    customization: { available: true, options: ["Add Name Tag", "Custom Message Card", "Choose Ribbon Color"] },
    material: "Wooden Basket with Fabric Lining",
    dimensions: "30cm x 20cm x 15cm",
    weight: "3kg",
    careInstructions: "Keep dry. Handle with care.",
    specifications: { Color: "Red & Green", Theme: "Festive" },
  },
  {
    id: "cs2",
    sku: "CS-TRAY-002",
    name: "Festive Christmas Tray",
    description: "A beautifully decorated Christmas tray perfect for gifting or for festive celebrations at home.",
    price: 1800,
    rating: 4.5,
    reviews: 32,
    discount: 10,
    highlight: "Limited Edition",
    category: "Tray",
    tags: ["Christmas", "Tray", "Holiday Gift", "Limited Edition"],
    brand: "CraftiCrazy",
    seller: "Handcrafted by CraftiCrazy",
    inStock: true,
    warranty: "7-day freshness guarantee",
    returnPolicy: "7-day easy returns",
    image: "/ChristmasTray1.jpg",
    variants: [
      { image: "/ChristmasTray1.jpg", price: 1800, discount: 10 },
      { image: "/ChristmasTray2.jpg", price: 1800, discount: 10 },
      { image: "/ChristmasTray3.jpg", price: 1800, discount: 10 },

    ],
    contents: ["Assorted Chocolates", "Christmas Ornaments", "Mini Scented Candle"],
    delivery: { type: "Home Delivery", availability: "Nationwide", estimated: "2–3 days" },
    customization: { available: true, options: ["Add Personalized Card", "Choose Tray Color"] },
    material: "Metal Tray with Decorative Finish",
    dimensions: "25cm x 15cm x 5cm",
    weight: "1.5kg",
    careInstructions: "Wipe clean with a soft cloth.",
    specifications: { Color: "Red & Gold", Shape: "Rectangular" },
  },
  {
    id: "cs3",
    sku: "CS-BOX-003",
    name: "Santa’s Sweet Treat Box",
    description: "Cheerful box packed with Santa-themed candies, chocolates, and mini gifts for kids and adults.",
    price: 1200,
    rating: 4.7,
    reviews: 40,
    discount: 5,
    highlight: "Premium Pick",
    category: "Candy Box",
    tags: ["Christmas", "Candy", "Festive", "Gifts"],
    brand: "CraftiCrazy",
    seller: "Handcrafted by CraftiCrazy",
    inStock: true,
    warranty: "7-day freshness guarantee",
    returnPolicy: "7-day easy returns",
    image: "/SantasSweetBox1.jpg",
    variants: [
      { image: "/SantasSweetBox1.jpg", price: 1200, discount: 5 },
      { image: "/SantasSweetBox2.jpg", price: 1200, discount: 5 },
      { image: "/SantasSweetBox3.jpg", price: 1200, discount: 5 },

    ],
    contents: ["Assorted Chocolates", "Candy Canes", "Mini Plush Toy"],
    delivery: { type: "Home Delivery", availability: "Nationwide", estimated: "2–3 days" },
    customization: { available: true, options: ["Add Name", "Special Gift Message"] },
    material: "Cardboard Box with Decorative Lid",
    dimensions: "20cm x 20cm x 10cm",
    weight: "1kg",
    careInstructions: "Store in a cool dry place.",
    specifications: { Color: "Red & White", Theme: "Santa" },
  },
];
