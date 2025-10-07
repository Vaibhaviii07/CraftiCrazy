import React from "react";
import { Gift, RotateCcw, Percent, Headphones, Truck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { giftCategories } from "../Data/GiftCategories";

export default function GiftCollections() {
  const steps = [
    {
      id: 1,
      title: "Free Shipping",
      description: "Free shipping on all orders",
      icon: <Truck className="w-8 h-8 text-[#603808]" />,
    },
    {
      id: 2,
      title: "30 Days Returns",
      description: "Back guarantee in 7 days",
      icon: <RotateCcw className="w-8 h-8 text-[#603808]" />,
    },
    {
      id: 3,
      title: "Member Discount",
      description: "Exclusive savings for members",
      icon: <Percent className="w-8 h-8 text-[#603808]" />,
    },
    {
      id: 4,
      title: "24/7 Support",
      description: "Contact us anytime",
      icon: <Headphones className="w-8 h-8 text-[#603808]" />,
    },
  ];

  const offers = [
    {
      id: 1,
      title: "Flat Discount 30%",
      subtitle: "Custom Resin Ring Tray",
      image: "ringTray.jpeg",
      link: "/resin",
    },
    {
      id: 2,
      title: "20% Off",
      subtitle: "Handmade Candles",
      image: "diya.jpeg",
      link: "/festival",
    },
    {
      id: 3,
      title: "Limited Offer",
      subtitle: "Gift Hampers for All festivals",
      image: "DiwaliHamper.jpeg",
      link: "/hamper",
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 font-[Poppins]">
      {/* How It Works */}
      <section className="bg-white mb-6 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center justify-center text-center px-4 py-6"
            >
              <div className="mb-3 transition-transform duration-500 hover:-translate-y-2">
                {step.icon}
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-[#603808]">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Offers Section */}
      <section className="py-8">
        <div className="grid lg:grid-cols-2 gap-5 max-w-7xl mx-auto">
          {/* Left Large Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative rounded-xl overflow-hidden shadow-md group cursor-pointer"
          >
            <img
              src={offers[0].image}
              alt={offers[0].subtitle}
              className="w-full h-72 sm:h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-start justify-end p-4 sm:p-6 text-white">
              <p className="text-xs sm:text-sm uppercase tracking-wide">
                {offers[0].title}
              </p>
              <h3 className="text-lg sm:text-2xl font-semibold mb-2 sm:mb-3">
                {offers[0].subtitle}
              </h3>
              <a
                href={offers[0].link}
                className="bg-white text-gray-900 px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-200 transition"
              >
                Shop Now
              </a>
            </div>
          </motion.div>

          {/* Right Cards */}
          <div className="grid gap-5">
            {offers.slice(1).map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative rounded-xl overflow-hidden shadow-md group cursor-pointer"
              >
                <img
                  src={offer.image}
                  alt={offer.subtitle}
                  className="w-full h-40 sm:h-[250px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-start justify-end p-3 sm:p-4 text-white">
                  <p className="text-[10px] sm:text-xs uppercase tracking-wide">
                    {offer.title}
                  </p>
                  <h3 className="text-sm sm:text-lg font-semibold mb-1 sm:mb-2">
                    {offer.subtitle}
                  </h3>
                  <a
                    href={offer.link}
                    className="bg-white text-gray-900 px-2 py-1 sm:px-3 sm:py-1 rounded-lg text-[10px] sm:text-xs font-medium hover:bg-gray-200 transition"
                  >
                    Shop Now
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero */}
      <div className="text-center mb-10 mt-6">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold font-[Playfair_Display] text-[#603808]">
          Luxury Gift Collections
        </h1>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl font-[Playfair_Display] text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Discover{" "}
          <span className="font-semibold italic text-[#AB420A]">
            artisanal creations
          </span>{" "}
          blending{" "}
          <span className="text-[#8C5E3C] italic font-medium">elegance</span> &
          <span className="italic text-[#AB420A]"> luxury</span>. Crafted to
          make every moment unforgettable.
        </p>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto space-y-20 sm:space-y-23">
        {giftCategories.map((category) => (
          <div key={category.id} className="space-y-8 sm:space-y-10">
            {/* Category Header */}
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#603808] flex items-center justify-center gap-2">
                <Gift className="w-6 h-6 sm:w-7 sm:h-7 text-[#D9A441]" />{" "}
                {category.name}
              </h2>
              <p className="text-sm sm:text-lg italic text-[#8C5E3C] mt-2">
                {category.tagline}
              </p>
            </div>

          {/* Product Cards */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar py-4">
                <AnimatePresence>
                  {category.variants.map((variant) => (
                    <motion.div
                      key={variant.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.4 }}
                      className="group flex-shrink-0 w-[260px] sm:w-[300px] md:w-[320px] snap-center"
                    >
                      <Link to={variant.link} className="w-full ">
                        {/* Card */}
                        <div className="relative w-full h-72 sm:h-80 ml-10 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-2">
                          <img
                            src={variant.image}
                            alt={variant.name}
                            className="w-full h-full object-cover"
                          />
                          {/* Discount Badge */}
                          <span className="absolute top-3 right-3 bg-[#b46029] text-white text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded-md shadow">
                            {variant.discount} OFF
                          </span>
                          {/* Hover Arrow */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <FiArrowRight className="text-white w-6 h-6 sm:w-10 sm:h-10" />
                          </div>
                        </div>
                        {/* Card Text */}
                        <div className="mt-3 text-center ml-10">
                          <p className="text-lg sm:text-xl text-gray-900 font-playfair leading-snug">
                            {variant.name}
                          </p>
                          <div className="mt-1 flex justify-center gap-2 sm:gap-3 items-baseline">
                            <span className="text-gray-400 italic text-xs sm:text-sm line-through">
                              ₹{variant.oldPrice}
                            </span>
                            <span className="text-xl sm:text-2xl text-[#b46029] font-cinzel">
                              ₹{variant.price}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
