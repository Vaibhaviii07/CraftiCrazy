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
      icon: <Truck className="w-6 h-6 sm:w-8 sm:h-8 text-[#603808]" />,
    },
    {
      id: 2,
      title: "30 Days Returns",
      description: "Back guarantee in 7 days",
      icon: <RotateCcw className="w-6 h-6 sm:w-8 sm:h-8 text-[#603808]" />,
    },
    {
      id: 3,
      title: "Member Discount",
      description: "Exclusive savings for members",
      icon: <Percent className="w-6 h-6 sm:w-8 sm:h-8 text-[#603808]" />,
    },
    {
      id: 4,
      title: "24/7 Support",
      description: "Contact us anytime",
      icon: <Headphones className="w-6 h-6 sm:w-8 sm:h-8 text-[#603808]" />,
    },
  ];

  const offers = [
    {
      id: 1,
      title: "Flat Discount 30%",
      subtitle: "Custom Resin Ring Tray",
      image: "ringTray.jpeg",
      link: "/Tray",
    },
    {
      id: 2,
      title: "20% Off",
      subtitle: "Handmade Candles",
      image: "diya.jpeg",
      link: "/diwali",
    },
    {
      id: 3,
      title: "Limited Offer",
      subtitle: "Gift Hampers for All Festivals",
      image: "DiwaliHamper.jpeg",
      link: "/diwali",
    },
  ];

  return (
    <div className="min-h-screen py-8 sm:py-12 px-3 sm:px-6 font-[Poppins] bg-[#FBFAF7]">
      {/* HOW IT WORKS */}
      <section className="bg-white mb-10 py-8 rounded-lg shadow-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-gray-200">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center justify-center text-center px-3 py-5"
            >
              <div className="mb-2 transition-transform duration-500 hover:-translate-y-2">
                {step.icon}
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-[#603808]">
                {step.title}
              </h3>
              <p className="text-[11px] sm:text-sm text-gray-500 mt-1 leading-tight">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* OFFERS SECTION */}
      <section className="py-6">
        <div className="grid lg:grid-cols-2 gap-5 max-w-7xl mx-auto">
          {/* Left Big Card */}
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
              className="w-full h-56 sm:h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-start justify-end p-3 sm:p-6 text-white">
              <p className="text-xs uppercase tracking-wide">{offers[0].title}</p>
              <h3 className="text-lg sm:text-2xl font-semibold mb-2">
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

          {/* Right Smaller Offers */}
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
                  className="w-full h-36 sm:h-[250px] object-cover group-hover:scale-105 transition-transform duration-500"
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

      {/* HEADER SECTION */}
      <div className="text-center mb-10 mt-6 px-2">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold font-[Playfair_Display] text-[#603808]">
          Luxury Gift Collections
        </h1>
        <p className="mt-3 sm:mt-4 text-sm sm:text-lg font-[Playfair_Display] text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Discover{" "}
          <span className="font-semibold italic text-[#AB420A]">
            artisanal creations
          </span>{" "}
          blending{" "}
          <span className="text-[#8C5E3C] italic font-medium">elegance</span> &{" "}
          <span className="italic text-[#AB420A]">luxury</span>. Crafted to make
          every moment unforgettable.
        </p>
      </div>

    <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20">
  {giftCategories.map((category) => (
    <div key={category.id} className="space-y-6">
      {/* Category Title */}
      <div className="text-center">
        <h2 className="text-xl sm:text-3xl font-serif text-[#603808] flex items-center justify-center gap-2">
          <Gift className="w-5 h-5 sm:w-7 sm:h-7 text-[#D9A441]" />{" "}
          {category.name}
        </h2>
        <p className="text-xs sm:text-base italic text-[#8C5E3C] mt-1">
          {category.tagline}
        </p>
      </div>

   {/* Product Scroll Cards */}
<div className="flex justify-center flex-wrap gap-6 ">
  <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-3 ">
    <AnimatePresence>
      {category.variants.map((variant) => (
        <motion.div
          key={variant.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          className="group flex-shrink-0 w-[220px] sm:w-[280px] md:w-[300px] snap-center no-scrollbar "
        >
          <Link to={variant.link} className=" h-full justify-center">
            <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-2">
              <img
                src={variant.image}
                alt={variant.name}
                className="w-full h-full object-cover"
              /> 
              <span className="absolute top-2 right-2 bg-[#b46029] text-white text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-md shadow">
                {variant.discount} OFF
              </span>
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FiArrowRight className="text-white w-5 h-5 sm:w-8 sm:h-8" />
              </div>
            </div>

            <div className="mt-2 text-center">
              <p className="text-base sm:text-lg text-gray-900 font-[Playfair_Display] leading-snug">
                {variant.name}
              </p>
              <div className="mt-1 flex justify-center gap-2 items-baseline">
                <span className="text-gray-400 italic text-xs sm:text-sm line-through">
                  ₹{variant.oldPrice}
                </span>
                <span className="text-lg sm:text-xl text-[#b46029] font-[Cinzel]">
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
