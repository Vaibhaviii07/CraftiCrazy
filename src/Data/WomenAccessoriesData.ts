export type WomenAccessory = {
  id: string;
  name: string;
  price: number;
  image: string;
  popularity: number;
  rating: number;
  category: string;
  description?: string;
};

export const womenAccessories: WomenAccessory[] = [
  {
    id: "w1",
    name: "Handmade Beaded Necklace",
    price: 120,
    image: "/Access3.jpg",
    popularity: 90,
    rating: 4.8,
    category: "Necklaces",
    description: "Elegant handmade beaded necklace featuring vibrant colors and intricate detailing."
  },
  {
    id: "w2",
    name: "Handcrafted Resin Earrings",
    price: 800,
    image: "/Access2.jpg",
    popularity: 85,
    rating: 4.5,
    category: "Earrings",
    description: "Stylish handcrafted resin earrings, perfect for daily wear or special occasions."
  },
  {
    id: "w3",
    name: "Handmade Beaded Bracelet",
    price: 600,
    image: "/Access1.jpg",
    popularity: 75,
    rating: 4.3,
    category: "Bracelets",
    description: "Colorful handmade beaded bracelet, a charming accessory for any outfit."
  },
  {
    id: "w4",
    name: "Hand-painted Silk Scarf",
    price: 1500,
    image: "/Access4.jpg",
    popularity: 92,
    rating: 4.9,
    category: "Scarves",
    description: "Unique hand-painted silk scarf with exquisite patterns and vibrant hues."
  },
  {
    id: "w5",
    name: "Handprinted Tote Bag",
    price: 2500,
    image: "/Access5.jpg",
    popularity: 88,
    rating: 4.7,
    category: "Bags",
    description: "Durable handprinted tote bag, beautifully designed for everyday use."
  },
  {
    id: "w6",
    name: "Handmade Resin Ring",
    price: 700,
    image: "/Access7.jpg",
    popularity: 78,
    rating: 4.4,
    category: "Rings",
    description: "Artisan resin ring handcrafted with precision, ideal for gifting or personal wear."
  },
  {
    id: "w7",
    name: "Floral Hair Clips",
    price: 400,
    image: "/Access11.jpg",
    popularity: 65,
    rating: 4.1,
    category: "Hair Accessories",
    description: "Charming floral hair clips, perfect for casual and festive hairstyles."
  },
  {
    id: "w8",
    name: "Handmade Resin Bracelet",
    price: 950,
    image: "/Access9.jpg",
    popularity: 80,
    rating: 4.3,
    category: "Bracelets",
    description: "Vibrant handmade resin bracelet, a stylish addition to any jewelry collection."
  },
  {
    id: "w9",
    name: "Hand-stitched Handkerchief",
    price: 1800,
    image: "/craft.jpeg",
    popularity: 85,
    rating: 4.6,
    category: "Scarves",
    description: "Elegant hand-stitched handkerchief with a unique, intricate pattern."
  },
  {
    id: "w10",
    name: "Handmade Resin Pendant",
    price: 1200,
    image: "/Access8.jpg",
    popularity: 82,
    rating: 4.5,
    category: "Necklaces",
    description: "Artistic handmade resin pendant featuring natural inclusions and fine craftsmanship."
  }
];
