import React from "react";
import { Gift, RotateCcw, Percent, Headphones,Sparkles, Truck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { giftCategories } from "../Data/GiftCategories";

export default function GiftCollections() {
  // Steps for How It Works
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
    <div className="min-h-screen py-20 px-6 font-[Poppins]">
      {/* How It Works Section */}
       <section className="bg-white mb-7 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex flex-col items-center justify-center text-center px-8 py-6"
          >
            <div className="mb-4 hover:shadow-2xl  hover:shadow-2xl transition-transform duration-500 hover:-translate-y-3">{step.icon}</div>
            <h3 className="text-lg font-semibold text-[#603808]">
              {step.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{step.description}</p>
          </div>
        ))}
      </div>
    </section>

     <section className="py-10 px-6">
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
        className="w-full h-[600px] object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col items-start justify-end p-6 text-white">
        <p className="text-sm uppercase tracking-wide">{offers[0].title}</p>
        <h3 className="text-2xl font-semibold mb-3">{offers[0].subtitle}</h3>
        <a
          href={offers[0].link}
          className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
        >
          Shop Now
        </a>
      </div>
    </motion.div>

    {/* Right Column with 2 Small Cards */}
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
            className="w-full h-[290px] object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-start justify-end p-4 text-white">
            <p className="text-xs uppercase tracking-wide">{offer.title}</p>
            <h3 className="text-lg font-semibold mb-2">{offer.subtitle}</h3>
            <a
              href={offer.link}
              className="bg-white text-gray-900 px-3 py-1 rounded-lg text-xs font-medium hover:bg-gray-200 transition"
            >
              Shop Now
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* Hero Section */}
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-6xl font-semibold font-[Playfair_Display] text-[#603808]">
          Luxury Gift Collections
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Discover{" "}
          <span className="font-semibold italic text-[#AB420A]">
            artisanal creations
          </span>{" "}
          blending{" "}
          <span className="text-[#8C5E3C] italic font-medium">elegance</span> &{" "}
          <span className="italic text-[#AB420A]">luxury</span>. Crafted to
          make every moment unforgettable.
        </p>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto space-y-32">
        {giftCategories.map((category) => (
          <div key={category.id} className="space-y-12">
            {/* Category Header */}
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-[Playfair_Display] font-bold text-[#603808] flex items-center justify-center gap-2">
                <Gift className="w-7 h-7 text-[#D9A441]" /> {category.name}
              </h2>
              <p className="text-lg italic text-[#8C5E3C] mt-2">
                {category.tagline}
              </p>
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
                        <div className="absolute inset-0 flex items-center justify-center bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <FiArrowRight className="text-white w-10 h-10" />
                        </div>
                      </div>
                      {/* Card Text */}
                      <div className="mt-6 text-center">
                        <p className="text-xl font-semibold text-gray-900 font-playfair leading-snug">
                          {variant.name}
                        </p>
                        <div className="mt-3 flex justify-center gap-4 items-baseline">
                          <span className="text-gray-400 text-sm line-through">
                            ₹{variant.oldPrice}
                          </span>
                          <span className="text-2xl font-bold text-[#b46029] font-cinzel">
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
        ))}
      </div>

    </div>
  );
}
