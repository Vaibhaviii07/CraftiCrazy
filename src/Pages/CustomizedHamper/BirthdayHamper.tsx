import React from "react";
// src/Pages/CustomizedHamper/BirthdayHamper.jsx
import { Gift, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
const birthdayHampers = [
{
    id: 1,
    name: "Luxury Birthday Hamper",
    description:
      "A delightful hamper filled with gourmet chocolates, scented candles, and a personalized greeting card.",
    price: "₹2,499",
    tag: "Luxury",
    image: "birthday1.jpg",
  },
  {
    id: 2,
    name: "Sweet Treats Hamper",
    description:
      "An assortment of cookies, cupcakes, and handmade chocolates — perfect for a sweet birthday surprise.",
    price: "₹1,999",
    tag: "Sweet",
    image: "birthday2.jpg",
  },
  {
    id: 3,
    name: "Royal Celebration Hamper",
    description:
      "Premium wine, exotic flowers, and artisanal cheese curated for a grand birthday celebration.",
    price: "₹3,999",
    tag: "Premium",
    image: "birthday3.jpg",
  },
  {
    id: 4,
    name: "Mini Birthday Hamper",
    description:
      "Compact yet thoughtful with chocolates, a scented mini candle, and a birthday mug.",
    price: "₹999",
    tag: "Budget",
    image: "birthday4.jpg",
  },
];


export default function BirthdayHamper() {
  const [activeTag, setActiveTag] = useState("All");

  // Get unique tags for filter buttons
  const tags = ["All", ...new Set(birthdayHampers.map(h => h.tag))];

  // Filter hampers based on selected tag
  const filteredHampers =
    activeTag === "All"
      ? birthdayHampers
      : birthdayHampers.filter(h => h.tag === activeTag);

  return (
    <div className="bg-gradient-to-b from-[#fdfcfb] to-[#f7f2ec] min-h-screen py-16 px-6">
      
      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Gift className="mx-auto text-[#AB420A] w-12 h-12 mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-[#2c2c2c] tracking-wide">
            Celebrate with Birthday Hampers
          </h1>
          <p className="mt-5 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Thoughtfully curated hampers that blend{" "}
            <span className="text-[#AB420A] font-medium">elegance and love</span>, 
            creating gifts as memorable as the occasion itself.
          </p>
        </motion.div>
      </div>

      {/* Filter Buttons */}
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-4 mb-10">
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-5 py-2 rounded-full font-medium transition ${
              activeTag === tag
                ? "bg-[#AB420A] text-white shadow-md"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Hampers Grid */}
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {filteredHampers.map((hamper, i) => (
          <motion.div
            key={hamper.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition duration-300 relative"
          >
            {/* Ribbon Tag */}
            {hamper.tag && (
              <span className="absolute top-4 right-0 bg-[#AB420A] text-white text-xs font-medium px-3 py-1 rounded-l-full shadow">
                {hamper.tag}
              </span>
            )}

            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={hamper.image}
                alt={hamper.name}
                className="w-full h-64 object-cover transform hover:scale-105 transition duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#2c2c2c]">
                {hamper.name}
              </h3>
              <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                {hamper.description}
              </p>

              {/* Divider */}
              <div className="my-4 border-t border-gray-100"></div>

              {/* Price + Button */}
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-[#AB420A]">
                  {hamper.price}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2 bg-[#AB420A] text-white rounded-full text-sm font-medium hover:shadow-md hover:bg-[#8c3207] transition"
                >
                  Add to Cart
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="max-w-6xl mx-auto mt-20 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Heart className="mx-auto text-[#AB420A] w-12 h-12 mb-3" />
          <h2 className="text-3xl font-semibold text-[#2c2c2c]">
            Crafted with Care
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto font-light">
            Every hamper is carefully designed with premium products and timeless
            elegance, making birthdays truly unforgettable.
          </p>
        </motion.div>
      </div>
      
    </div>
  );
}
