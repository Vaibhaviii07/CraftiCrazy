
export type Wallet = {
  id: number;
  name: string;
  price: number;
  image: string;
  popularity: number;
  rating: number;
  category: string;
  description?: string;
};

export const wallets: Wallet[] = [
  {
    id: 1,
    name: "Classic Leather Wallet for Men",
    price: 600,
    image: "/wallet1.jpg",
    popularity: 95,
    rating: 4.8,
    category: "Leather",
    description: "Premium handmade leather wallet with sleek finish and elegant stitching."
  },
  {
    id: 2,
    name: "Vintage Brown Wallet",
    price: 1350,
    image: "/wallet2.jpg",
    popularity: 90,
    rating: 4.7,
    category: "Leather",
    description: "Durable vintage-style brown leather wallet with spacious compartments."
  },
  {
    id: 3,
    name: "Fabric Zipper Wallet",
    price: 850,
    image: "/wallet8.jpg",
    popularity: 80,
    rating: 4.4,
    category: "Fabric",
    description: "Lightweight fabric wallet with secure zipper closure and trendy prints."
  },
  {
    id: 4,
    name: "Crochet Handmade Wallet",
    price: 600,
    image: "/wallet7.jpg",
    popularity: 75,
    rating: 4.2,
    category: "Crochet",
    description: "Colorful crochet wallet, hand-knitted for casual daily use."
  },
  {
    id: 5,
    name: "Resin Art Wallet",
    price: 1500,
    image: "/wallet6.jpg",
    popularity: 88,
    rating: 4.6,
    category: "Resin",
    description: "Unique resin art wallet with glossy finish and creative designs."
  },
  {
    id: 6,
    name: "Hand-Painted Wallet",
    price: 1100,
    image: "/wallet5.jpg",
    popularity: 82,
    rating: 4.5,
    category: "Fabric",
    description: "Hand-painted fabric wallet featuring custom artistic patterns."
  },
  {
    id: 7,
    name: "Slim Leather Card Holder",
    price: 700,
    image: "/wallet4.jpg",
    popularity: 85,
    rating: 4.4,
    category: "Leather",
    description: "Minimalist leather wallet for carrying essential cards with style."
  },
  {
    id: 9,
    name: "Eco-Friendly Fabric Wallet",
    price: 950,
    image: "/wallet3.jpg",
    popularity: 78,
    rating: 4.3,
    category: "Fabric",
    description: "Made from eco-friendly fabric, stylish and sustainable wallet option."
  },
  {
   id: 10,
    name: "Classic Leather Wallet for women",
    price: 600,
    image: "/wallet11.jpg",
    popularity: 95,
    rating: 4.8,
    category: "Leather",
    description: "Premium handmade leather wallet with sleek finish and elegant stitching."
  },
];
