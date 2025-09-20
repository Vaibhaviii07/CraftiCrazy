
export type ResinFrame = {
  id: number;
  name: string;
  price: number;
  image: string;
  popularity: number;
  rating: number;
  category: string;
  description?: string;
};

export const resinFrames: ResinFrame[] = [
  {
    id: 1,
    name: "Classic Resin Frame",
    price: 1200,
    image: "/resin1.jpg",
    popularity: 85,
    rating: 4.5,
    category: "Classic",
    description: "Handmade resin frame with a traditional touch."
  },
  {
    id: 2,
    name: "Modern Resin Art Frame",
    price: 1500,
    image: "/resin2.jpg",
    popularity: 90,
    rating: 4.8,
    category: "Modern",
    description: "Contemporary resin frame with artistic edges."
  },
  {
    id: 3,
    name: "Pearl White Resin Frame",
    price: 2000,
    image: "/resin3.jpg",
    popularity: 95,
    rating: 5,
    category: "Premium",
    description: "Elegant pearl white resin frame with a glossy look."
  },
  {
    id: 4,
    name: "Ocean Blue Resin Frame",
    price: 1400,
    image: "/resin7.jpg",
    popularity: 88,
    rating: 4.6,
    category: "Modern",
    description: "Deep ocean-inspired blue resin frame with glossy texture."
  },
  {
    id: 5,
    name: "Floral Embedded Resin Frame",
    price: 1600,
    image: "/resin8.jpg",
    popularity: 92,
    rating: 4.9,
    category: "Artistic",
    description: "Unique resin frame embedded with real dried flowers."
  },
  {
    id: 6,
    name: "Marble Effect Resin Frame",
    price: 1750,
    image: "/resin5.jpg",
    popularity: 80,
    rating: 4.4,
    category: "Classic",
    description: "Resin frame with a premium marble-like effect."
  },
  {
    id: 7,
    name: "Minimal Resin Edge Frame",
    price: 1100,
    image: "/resin4.jpg",
    popularity: 65,
    rating: 4.1,
    category: "Minimalist",
    description: "Simple and sleek resin frame with minimalistic edges."
  },
  {
    id: 8,
    name: "Resin Varmala Preservation Frame",
    price: 1350,
    image: "/resin6.jpg",
    popularity: 78,
    rating: 4.3,
    category: "Rustic",
    description: "Resin frame with preserved varmala flowers."
  }
];
