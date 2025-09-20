export type Bracelet = {
  id: number;
  name: string;
  price: number;
  image: string;
  popularity: number;
  rating: number;
  category: string;
  description?: string;
};

export const bracelets: Bracelet[] = [
  {
    id: 1,
    name: "Beaded Friendship Bracelet",
    price: 250,
    image: "/bracelet1.jpg",
    popularity: 90,
    rating: 4.6,
    category: "Beaded",
    description: "Colorful handmade bracelet, perfect for gifting friends.",
  },
  {
    id: 2,
    name: "Macrame Charm Bracelet",
    price: 320,
    image: "/bracelet2.jpg",
    popularity: 75,
    rating: 4.4,
    category: "Macrame",
    description: "Stylish macrame bracelet with adjustable knot and charms.",
  },
  {
    id: 3,
    name: "Resin Handmade Bracelet",
    price: 450,
    image: "/bracelet3.jpg",
    popularity: 88,
    rating: 4.7,
    category: "Resin",
    description: "Durable Resin bracelet with Resin handcrafted finish.",
  },
  {
    id: 4,
    name: "Thread Woven Bracelet",
    price: 280,
    image: "/bracelet4.jpg",
    popularity: 70,
    rating: 4.2,
    category: "Thread",
    description: "Hand-woven thread bracelet with vibrant colors.",
  },
  {
    id: 5,
    name: "Charm Anklet Bracelet",
    price: 350,
    image: "/bracelet5.jpg",
    popularity: 80,
    rating: 4.5,
    category: "Charm",
    description: "Delicate bracelet with small charms and handmade finish.",
  },
  {
    id: 6,
    name: "Knotted Friendship Bracelet",
    price: 200,
    image: "/bracelet7.jpg",
    popularity: 60,
    rating: 4.0,
    category: "Thread",
    description: "Classic knotted bracelet with bright, colorful threads.",
  },
  {
    id: 7,
    name: "Boho Style Macrame Bracelet",
    price: 400,
    image: "/bracelet6.jpg",
    popularity: 85,
    rating: 4.6,
    category: "Macrame",
    description: "Handmade boho bracelet with intricate macrame designs.",
  }
];
