// src/Data/DiwaliHampersData.ts
export interface DiwaliHamper {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export const diwaliHampers: DiwaliHamper[] = [
  {
    id: 1,
    name: "Festive Sweets Hamper",
    description: "Assorted mithai, chocolates, and dry fruits.",
    price: 1299,
    category: "Sweets",
    image: "/diwali1.jpg",
  },
  {
    id: 2,
    name: "Premium Dry Fruit Hamper",
    description: "Almonds, cashews, raisins in decorative packaging.",
    price: 1599,
    category: "Dry Fruits",
    image: "/images/diwali/dryfruit-hamper.jpg",
  },
  {
    id: 3,
    name: "Luxury Gift Box",
    description: "Festive candles, sweets, chocolates & decor.",
    price: 2499,
    category: "Luxury",
    image: "/images/diwali/luxury-box.jpg",
  },
];
