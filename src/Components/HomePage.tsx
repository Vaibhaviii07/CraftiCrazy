import React from "react";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <div className="bg-[#FBFAF7]">
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('./hero1.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        </div>

        {/* Hero Content (Right-aligned solid card) */}
        <div className="relative z-10 flex items-center justify-end h-full w-full px-6 md:px-20">
          <motion.div
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="p-10 md:p-12 rounded-3xl  max-w-lg text-left"
          >
            {/* Heading */}
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#3c2f2f] mb-6 leading-tight">
              Handmade Gifts <br /> That Speak from the{" "}
              <span className="text-[#6c584c]">Heart</span>
            </h1>

            {/* Accent Divider */}
            <div className="w-20 h-1 bg-[#6c584c] mb-8 rounded-full"></div>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-black mb-10 font-serif leading-relaxed">
              Discover our unique collection of hampers, frames, accessories, and more — 
              each crafted with <span className="text-[#edede9] font-semibold">love & care</span>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/newarrivals"
                className="px-8 py-4 bg-[#6c584c] hover:bg-[#fff1eb] rounded-full text-[#cb997e] font-semibold text-lg transition-all transform hover:scale-110 shadow-md"
              >
                Shop Now
              </a>
              <a
                href="/AboutUs"
                className="px-8 py-4 bg-[#fff1eb] border border-[#cb997e] hover:bg-[#6c584c] rounded-full text-[#cb997e] font-semibold text-lg transition-all transform hover:scale-105 shadow-sm"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
