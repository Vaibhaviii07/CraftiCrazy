export interface Product {
    name: string;
    href: string;
  }
  
export const allProducts: Product[] = [
  { name: "Birthday Hampers", href: "/BirthdayHamper" },
  { name: "Wedding Hampers", href: "/hampers/wedding" },
  { name: "Corporate Hampers", href: "/hampers/corporate" },
  { name: "Wooden Frames", href: "/frames/wooden" },
  { name: "Glass Frames", href: "/frames/glass" },
  { name: "Resin Jewelry", href: "/resin/jewelry" },
  { name: "Resin Wall Clocks", href: "/resin/clocks" },
  { name: "Diwali Hampers", href: "/festival/diwali" },
  { name: "Christmas Specials", href: "/festival/christmas" },
  { name: "Rakhi Gifts", href: "/festival/rakhi" },
  { name: "Resin Name Plates", href: "/resin/nameplates" },
  { name: "Resin Keychains", href: "/resin/keychains" },
  { name: "New Arrivals", href: "/NewArrivals" },
  { name: "Customized Orders", href: "/CustomerDemand" },
];