import React from "react";
import { Gift } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
const giftCategories = [
  {
    id: 1,
    name: "Photo Frame",
    tagline: "Preserve Memories | Glossy Finish",
    variants: [
      { id: 101, name: "Resin Frame", image: "ResinFrame.jpeg", oldPrice: 899, price: 699, discount: "20%", link: "/frames/resin" },
      { id: 102, name: "Wooden Frame", image: "Wooden_Frame.jpeg", oldPrice: 1099, price: 899, discount: "18%", link: "/frames/wooden" },
      { id: 103, name: "Glass Frame", image: "PhotoFrame.jpeg", oldPrice: 999, price: 799, discount: "20%", link: "/frames/glass" },
    ],
  },
  {
    id: 2,
    name: "Handmade Keychain",
    tagline: "Stylish | Custom Resin Design",
    variants: [
      { id: 201, name: "Flower Keychain", image: "FlowerKeyChain.jpeg", oldPrice: 399, price: 299, discount: "25%", link: "/keychains/flower" },
      { id: 202, name: "Mini Art Keychain", image: "chain.jpeg", oldPrice: 349, price: 259, discount: "26%", link: "/keychains/art" },
      { id: 203, name: "Resin Initial Keychain", image: "keyChain.jpeg", oldPrice: 499, price: 379, discount: "24%", link: "/keychains/initial" },
    ],
  },
  {
    id: 3,
    name: "Customized Hampers",
    tagline: "Perfect Gift for Any Occasion",
    variants: [
      { id: 301, name: "Luxury Hamper", image: "LuxHamper.jpeg", oldPrice: 2999, price: 2499, discount: "17%", link: "/hampers/luxury" },
      { id: 302, name: "Sweet Treats Hamper", image: "Hamper.jpeg", oldPrice: 1999, price: 1699, discount: "15%", link: "/hampers/sweets" },
      { id: 303, name: "Girls Special Hamper", image: "Acess.jpeg", oldPrice: 1799, price: 1499, discount: "17%", link: "/hampers/girls" },
    ],
  },
  {
    id: 4,
    name: "Festival Special",
    tagline: "Celebrate with Joy | Limited Edition",
    variants: [
      { id: 401, name: "Diwali Special Hamper", image: "DiwaliHamper.jpeg", oldPrice: 2499, price: 1999, discount: "20%", link: "/festival/diwali" },
      { id: 402, name: "Christmas Joy Pack", image: "ChristmasHamper.jpeg", oldPrice: 2299, price: 1899, discount: "17%", link: "/festival/christmas" },
      { id: 403, name: "Holi Special", image: "HoliHamper.jpeg", oldPrice: 1799, price: 1499, discount: "17%", link: "/festival/holi" },
      { id: 404, name: "Raksha Bandhan", image: "RakhiHamper.jpeg", oldPrice: 1599, price: 1299, discount: "19%", link: "/festival/rakhi" },
    ],
  },
];

export default function GiftCollections() {
  return (
    <div className="min-h-screen bg-[#FFF9F3] py-20 px-6 font-[Poppins]">
      
      {/* Hero Section */}
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-6xl font-extrabold font-[Playfair_Display] text-[#AB420A]">
          Luxury Gift Collections
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Discover <span className="font-semibold text-[#AB420A]">artisanal creations</span> blending{" "}
          <span className="text-[#8C5E3C] font-medium">elegance</span> &{" "}
          <span className="italic text-[#AB420A]">luxury</span>. Crafted to make every moment unforgettable.
        </p>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto space-y-32">
        {giftCategories.map((category) => (
          <div key={category.id} className="space-y-12">
            
            {/* Category Header */}
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-[Playfair_Display] font-bold text-[#AB420A] flex items-center justify-center gap-2">
                <Gift className="w-7 h-7 text-[#D9A441]" /> {category.name}
              </h2>
              <p className="text-lg text-[#8C5E3C] mt-2">{category.tagline}</p>
            </div>

            {/* Product Cards */}
             <div className="max-w-6xl mx-auto px-6 sm:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
              <AnimatePresence>
                {category.variants.map((variant) => (
                  <motion.div
                    key={variant.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.5 }}
                    className="group flex justify-center"
                  >
                    <Link to={variant.link} className="w-full max-w-[360px]">
                      {/* Card */}
                      <div className="relative w-full h-[420px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-3">
                        <img
                          src={variant.image}
                          alt={variant.name}
                          className="w-full h-full object-cover"
                        />
                        {/* Discount Badge */}
                        <span className="absolute top-4 right-4 bg-[#b46029] text-white text-sm font-semibold px-3 py-1 rounded-md shadow">
                          {variant.discount} OFF
                        </span>
                        {/* Hover Arrow */}
                        <div className="absolute inset-0 flex items-center justify-center  bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <FiArrowRight className="text-white w-10 h-10" />
                        </div>
                      </div>
                      {/* Card Text */}
                      <div className="mt-6 text-center">
                        <p className="text-xl font-semibold text-gray-900 font-playfair leading-snug">{variant.name}</p>
                        <div className="mt-3 flex justify-center gap-4 items-baseline">
                          <span className="text-gray-400 text-sm line-through">₹{variant.oldPrice}</span>
                          <span className="text-2xl font-bold text-[#b46029] font-cinzel">₹{variant.price}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>


          </div>
        ))}
      </div>
    </div>
  );
}
