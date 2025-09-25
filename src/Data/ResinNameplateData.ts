// src/Data/ResinNameplateData.ts
export interface ResinNameplate {
 id: string; 
  name: string;
  price: number;
  image: string;
  popularity: number;
  rating: number;
  category: string;
  description: string;
}

export const resinNameplates: ResinNameplate[] = [
  {
    id: "np1",
    name: "Personalized Ocean Resin Nameplate",
    price: 900,
    image: "/nameplate1.jpg",
    popularity: 90,
    rating: 4.8,
    category: "Ocean",
    description: "Custom nameplate with blue ocean waves and shimmering sand effect."
  },
  {
    id: "np2",
   name: "Floral Resin Nameplate",
    price: 850,
    image: "/nameplate2.jpg",
    popularity: 87,
    rating: 4.7,
    category: "Floral",
    description: "Embedded real flowers in resin for a delicate and charming nameplate."
  },
  {
    id: "np3",
    name: " Resin Nameplate",
    price: 950,
    image: "/nameplate3.jpg",
    popularity: 88,
    rating: 4.8,
    category: "Personalized",
    description: "Elegant resin for a sophisticated look."
  },
  {
    id: "np4",
    name: "Custom pearl Resin Nameplate",
    price: 1200,
    image: "/nameplate4.jpg",
    popularity: 95,
    rating: 5.0,
    category: "Personalized",
    description: "Add your initials or name in stylish resin design for a personal touch."
  },
];
