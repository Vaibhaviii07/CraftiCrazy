export interface ResinKeychain {
  id: string; // changed from number to string
  name: string;
  price: number;
  image: string;
  popularity: number;
  rating: number;
  category: string;
  description: string;
}

export const resinKeychains: ResinKeychain[] = [
  {
    id: "rk1",
    name: "Floral Resin Keychain",
    price: 250,
    image: "/resinkeychains1.jpg",
    popularity: 90,
    rating: 4.8,
    category: "Floral",
    description: "Handmade resin keychain with preserved real flowers."
  },
  {
    id: "rk2",
    name: "Memories Preserved Resin Keychain",
    price: 300,
    image: "/resinkeychains3.jpg",
    popularity: 85,
    rating: 4.6,
    category: "Custom",
    description: "Unique Memories preserved resin keychain with shimmer effects."
  },
  {
    id: "rk3",
    name: "Initial Letter Keychain",
    price: 200,
    image: "/resinkeychains2.jpg",
    popularity: 92,
    rating: 4.9,
    category: "Alphabet",
    description: "Custom resin keychain with your favorite letter and glitter."
  },
  {
    id: "rk4",
    name: "Resin Photo Keychain",
    price: 280,
    image: "/resinkeychains5.jpg",
    popularity: 88,
    rating: 4.7,
    category: "Custom",
    description: "Beautiful Photo resin keychain with Customized design."
  },
  {
    id: "rk5",
    name: "Butterfly Charm Keychain",
    price: 320,
    image: "/resinkeychains4.jpg",
    popularity: 80,
    rating: 4.5,
    category: "Charm",
    description: "Delicate resin keychain with embedded butterfly charm."
  }
];
