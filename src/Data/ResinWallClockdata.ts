// src/Data/ResinClockData.ts
export interface ResinClock {
  id: string;
  name: string;
  price: number;
  image: string;
  popularity: number;
  rating: number;
  category: string;
  description: string;
}

export const resinClocks: ResinClock[] = [
  {
    id: "c1",
    name: "Ocean Foam Resin Clock",
    price: 1300,
    image: "/clock2.jpg",
    popularity: 86,
    rating: 4.6,
    category: "Ocean",
    description: "Realistic ocean waves and foamy surf captured perfectly inside resin."
  },
  {
    id: "c2",
    name: "Floating Petals Resin Clock",
    price: 1200,
    image: "/clock3.jpg",
    popularity: 88,
    rating: 4.7,
    category: "Floral",
    description: "Real dried flowers encapsulated in resin for a serene, botanical vibe."
  },
  {
    id: "c3",
    name: "Cosmic Nebula Resin Clock",
    price: 1550,
    image: "/clock4.jpg",
    popularity: 92,
    rating: 4.8,
    category: "Galaxy",
    description: "A cosmic masterpiece with swirling colors and glittering stars embedded inside."
  },
  {
    id: "c4",
    name: "Geode Slice Resin Clock",
    price: 1700,
    image: "/clock5.jpg",
    popularity: 90,
    rating: 4.9,
    category: "Mineral",
    description: "Natural geode slices embedded in clear resin create a unique, luxurious centerpiece."
  },
  {
    id: "c5",
    name: "Sunset Glow Resin Clock",
    price: 1350,
    image: "/clock6.jpg",
    popularity: 87,
    rating: 4.5,
    category: "Sunset",
    description: "Warm sunset colors captured in resin for a calming, ambient effect."
  }
];
