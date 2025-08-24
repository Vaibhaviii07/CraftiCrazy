import React from "react";
import { ArrowRight } from "lucide-react";

const giftCategories = [
  {
    id: 1,
    name: "Resin Photo Frame",
    tagline: "Preserve Memories | Glossy Finish",
    image: "ResinFrame.jpeg",
    description:
      "A unique resin photo frame designed to preserve your special moments in style. Crafted with precision, it captures memories in vibrant colors and a glossy finish, making it a perfect gift for loved ones or a centerpiece for your cherished photos.",
  },
  {
    id: 2,
    name: "Handmade Keychain",
    tagline: "Stylish | Custom Resin Design",
    image: "keyChain.jpeg",
    description:
      "Custom resin keychains designed with love. Each piece is durable, stylish, and infused with miniature art, charms, or dried flowers. Perfect for adding a touch of personality to your keys or gifting to someone special.",
  },
  {
    id: 3,
    name: "Wedding Varmala Preservation",
    tagline: "Eco-Friendly | Everlasting Memories",
    image: "Wedding.jpeg",
    description:
      "Eco-friendly wedding crafts created from preserved flowers and sustainable materials. Celebrate love and nature by keeping your wedding memories alive in a unique, artistic form that’s perfect for display or gifting.",
  },
  {
    id: 4,
    name: "Engagement Ring Holder",
    tagline: "Elegant | Perfect for Proposals",
    image: "Engagement1.jpeg",
    description:
      "Elegant ring holders with delicate floral details, crafted to showcase engagement rings in style. Ideal for proposals, weddings, or as a keepsake, these holders are both functional and a timeless decorative piece.",
  },
];

export default function GiftCollections() {
  return (
    <div className="min-h-screen py-20 px-6 ">
      
      {/* Section Heading */}
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-6xl font-bold font-serif text-[#AB420A] drop-shadow-lg">
          Best Sellers
        </h1>
        <p className="mt-6 text-base md:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Discover our most-loved creations — from elegant keepsakes to unique 
          handcrafted pieces, each gift blends{" "}
          <span className="font-semibold text-[#AB420A]">tradition</span> with{" "}
          <span className="font-semibold text-[#AB420A]">modern artistry</span>.
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-24">
        {giftCategories.map((item, index) => (
          <div
            key={item.id}
            className={`flex flex-col md:flex-row items-center transition-all duration-500 ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
           
            <div className="flex-shrink-0 w-40 h-40 md:w-96 md:h-96 rounded-full overflow-hidden shadow-lg duration-500 hover:scale-105">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

           
            <div className="md:w-18"></div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#AB420A] mb-2">
                {item.name}
              </h2>
              <p className="text-lg text-[#8C5E3C] font-medium mb-4">
                {item.tagline}
              </p>
              <p className="text-gray-700 font-serif text-base md:text-lg mb-6">
                {item.description}
              </p>

              <a
                href="#"
                className="inline-flex items-center text-[#AB420A] font-semibold hover:underline hover:text-[#D45C1B] transition-colors duration-300"
              >
                Check Product <ArrowRight className="ml-2 w-6 h-6" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
