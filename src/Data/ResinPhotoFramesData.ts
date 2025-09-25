export interface ResinPhotoFrame {
  id: string;
  name: string;
  price: number;
  image: string;
  popularity: number;
  rating: number;
  category: string;
  description: string;
}

export const resinPhotoFrames: ResinPhotoFrame[] = [
  {
    id: "ff1",
    name: "Floral Encased Resin Frame",
    price: 1100,
    image: "/frame1.jpg",
    popularity: 85,
    rating: 4.7,
    category: "Floral",
    description: "Delicate flowers encased in clear resin for a natural look."
  },
  {
    id: "ff2",
    name: "Minimalist Clear Resin Frame",
    price: 900,
    image: "/frame2.jpg",
    popularity: 80,
    rating: 4.5,
    category: "Minimalist",
    description: "Transparent resin frame with subtle gold accents."
  },
  {
    id: "ff3",
    name: "Leaves Resin Frame",
    price: 950,
    image: "/frame3.jpg",
    popularity: 78,
    rating: 4.4,
    category: "Nature",
    description: "Pressed leaves beautifully encased in resin."
  },
  {
    id: "ff4",
    name: "Handmade Wooden Resin Frame",
    price: 1300,
    image: "/frame4.jpg",
    popularity: 93,
    rating: 4.9,
    category: "Wooden",
    description: "Resin frame with natural wood border and colorful resin art."
  },
  {
    id: "ff5",
    name: "Crystal Encased Resin Frame",
    price: 1400,
    image: "/frame5.jpg",
    popularity: 96,
    rating: 5.0,
    category: "Luxury",
    description: "Premium resin frame with crystals embedded for a luxurious finish."
  }
];
