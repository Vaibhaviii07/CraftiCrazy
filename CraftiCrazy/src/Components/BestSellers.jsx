import { Star } from "lucide-react";

const bestSellers = [
  {
    id: 1,
    name: "Resin Photo Frame",
    image: "ResinFrame.jpeg",
    description:
      "A unique resin photo frame designed to preserve your special moments in style.",
  },
  {
    id: 2,
    name: "Handmade Keychain",
    image: "keyChain.jpeg",
    description:
      "Custom resin keychains designed with love. Durable, stylish, and perfect for everyday use.",
  },
  {
    id: 3,
    name: "Wedding Varmala Preservation",
    image: "Wedding.jpeg",
    description:
      "Eco-friendly wedding crafts created from waste materials. Unique, sustainable, and full of love for the planet.",
  },
  {
    id: 4,
    name: "Engagement Ring Holder",
    description:
      "Elegant resin ring holder with floral details – perfect for weddings, proposals, or keepsakes.",
    image: "Engagement1.jpeg",
  },
  {
    id: 5,
    name: "Photo Frame",
    image: "PhotoFrame.jpeg",
    description:
      "Where art meets memory – a handcrafted frame built to last a lifetime.",
  },
  {
    id: 6,
    name: "Magical Gift Box",
    image: "/GiftBox3.jpeg",
    description: "A surprise box filled with love & creativity.",
  },
];

export default function BestSeller() {
  return (
    <div className="bg-[#FBFAF7] min-h-screen py-12 px-6">
      {/* Title */}
      <h1 className="text-4xl font-serif font-bold text-center text-[#AB420A] mb-4">
        Where taste meets trust
      </h1>
      <p className="text-lg text-center text-[#CD500C] max-w-2xl mx-auto mb-12">
        These best sellers have earned a special place in every heart and every home.
      </p>

      {/* Grid Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {bestSellers.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-80 object-cover rounded-t-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800 group-hover:text-[#AB420A] transition-colors duration-300">
                {item.name}
              </h2>
              <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
