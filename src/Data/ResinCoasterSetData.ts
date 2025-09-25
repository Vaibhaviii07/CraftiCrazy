export interface ResinCoaster {
  id: string;
  name: string;
  price: number;
  image: string;
  popularity: number;
  rating: number;
  category: string;
  description: string;
}

export const resinCoasterSets: ResinCoaster[] = [
  {
    id: "cset-1",
    name: "Ocean Wave Resin Coaster Set",
    price: 750,
    image: "/coaster1.jpg",
    popularity: 95,
    rating: 4.9,
    category: "Ocean",
    description: "Beautiful handmade ocean wave inspired resin coaster set with glossy finish."
  },
  {
    id: "cset-2",
    name: "Floral Embedded Resin Coaster Set",
    price: 820,
    image: "/coaster2.jpg",
    popularity: 92,
    rating: 4.8,
    category: "Floral",
    description: "Handmade resin coasters with real dried flowers embedded inside."
  },
  {
    id: "cset-3",
    name: "Gold Leaf Resin Coaster Set",
    price: 950,
    image: "/coaster3.jpg",
    popularity: 90,
    rating: 4.7,
    category: "Luxury",
    description: "Elegant resin coaster set with gold leaf accents for a premium look."
  },
  {
    id: "cset-4",
    name: "Marble Effect Resin Coaster Set",
    price: 700,
    image: "/coaster4.jpg",
    popularity: 85,
    rating: 4.5,
    category: "Marble",
    description: "Stylish marble-effect resin coasters that suit any home décor."
  },
  {
    id: "cset-5",
    name: "Geode Style Resin Coaster Set",
    price: 1200,
    image: "/coaster5.jpg",
    popularity: 98,
    rating: 5.0,
    category: "Geode",
    description: "Stunning geode-inspired resin coasters with crystal-like finish."
  }
];
