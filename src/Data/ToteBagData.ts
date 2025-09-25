export interface ToteBag {
  id: string;
  name: string;
  price: number;
  image: string;
  popularity: number;
  rating: number;
  category: string;
  description: string;
}

export const toteBags: ToteBag[] = [
  {
    id: "tb1",
    name: "Canvas Tote Bag",
    price: 1200,
    image: "/totebag1.jpg",
    popularity: 95,
    rating: 4.8,
    category: "Canvas",
    description: "Sturdy and stylish canvas tote bag for everyday use."
  },
  {
    id: "tb2",
    name: "Leather Tote Bag",
    price: 2500,
    image: "/totebag2.jpg",
    popularity: 88,
    rating: 4.6,
    category: "Leather",
    description: "Premium handmade leather tote bag with spacious compartments."
  },
  {
    id: "tb3",
    name: "Eco-Friendly Tote Bag",
    price: 900,
    image: "/totebag3.jpg",
    popularity: 80,
    rating: 4.4,
    category: "Fabric",
    description: "Reusable eco-friendly tote bag made from organic materials."
  },
  {
    id: "tb4",
    name: "Embroidered Tote Bag",
    price: 1500,
    image: "/totebag4.jpg",
    popularity: 75,
    rating: 4.5,
    category: "Fabric",
    description: "Hand-embroidered tote bag with colorful patterns."
  },
  {
    id: "tb5",
    name: "Mini Leather Tote",
    price: 1800,
    image: "/totebag5.jpg",
    popularity: 70,
    rating: 4.3,
    category: "Leather",
    description: "Compact and elegant leather tote for daily essentials."
  },
  {
    id: "tb6",
    name: "Printed Canvas Tote",
    price: 1100,
    image: "/totebag6.jpg",
    popularity: 65,
    rating: 4.2,
    category: "Canvas",
    description: "Lightweight canvas tote with trendy printed designs."
  }
];
