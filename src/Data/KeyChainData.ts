
export type KeyChain = {
  id: number;
  name: string;
  price: number;
  image: string;
  popularity: number;
  rating: number;
  category: string;
  description?: string;
};

export const keyChains: KeyChain[] = [
  {
  id: 1,
  name: "Handmade Custom Keychain",
  price: 350,
  image: "/keychain8.jpeg",
  popularity: 85,
  rating: 4.7,
  category: "Personalized",
  description: "Elegant handmade keychain with your choice for daily use."
},

  {
    id: 2,
    name: "Resin Embedded Keychain",
    price: 450,
    image: "/keychain3.jpg",
    popularity: 80,
    rating: 4.5,
    category: "Resin",
    description: "Beautiful resin keychain with floral and glitter designs inside."
  },
  {
  id: 3,
  name: "Crochet Keychain",
  price: 300,
  image: "/keychain7.jpg",
  popularity: 78,
  rating: 4.3,
  category: "Crochet",
  description: "Handmade crochet keychain, knitted uniquely with your choice of colors."
},

  {
    id: 4,
    name: "Personalized Name Keychain",
    price: 500,
    image: "/keychain1.jpg",
    popularity: 90,
    rating: 4.8,
    category: "Personalized",
    description: "Customizable keychain featuring your name or initials."
  },
  {
    id: 5,
    name: "Mini Tassel Keychain",
    price: 250,
    image: "/keychain2.jpg",
    popularity: 70,
    rating: 4.2,
    category: "Fashion",
    description: "Cute mini tassel keychain adding a fun touch to your keys."
  },
  {
    id: 6,
    name: "Metal Charm Keychain",
    price: 400,
    image: "/keychain4.jpg",
    popularity: 82,
    rating: 4.5,
    category: "Metal",
    description: "Stylish metal keychain with engraved charm designs."
  },
  {
    id: 7,
    name: "Hand-painted Wooden Keychain",
    price: 480,
    image: "/keychain5.jpg",
    popularity: 75,
    rating: 4.3,
    category: "Wooden",
    description: "Colorful hand-painted wooden keychain for unique personalization."
  },
  {
    id: 8,
    name: "Acrylic Photo Keychain",
    price: 520,
    image: "/keychain6.jpg",
    popularity: 88,
    rating: 4.7,
    category: "Personalized",
    description: "Custom acrylic keychain with a personal photo embedded inside."
  },
 
];
