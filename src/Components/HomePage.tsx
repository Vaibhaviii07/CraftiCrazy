import React from "react";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <div className="bg-[#FBFAF7]">
      {/* Hero Section */}
      <section className="relative w-full min-h-[80vh] flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('./hero5.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/60 md:bg-gradient-to-r md:from-black/70 md:via-black/50 md:to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full w-full px-4 sm:px-8 md:px-16">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="p-6 sm:p-8 md:p-12 rounded-3xl max-w-xl sm:max-w-2xl text-center"
          >
            {/* Heading */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 leading-snug sm:leading-tight">
              Handmade Gifts <br /> That Speak from the{" "}
              <span className="text-[#E6CFA9]">Heart</span>
            </h1>

            {/* Accent Divider */}
            <div className="w-16 sm:w-24 h-1 mx-auto bg-[#E6CFA9] mb-6 sm:mb-8 rounded-full"></div>

            {/* Subheading */}
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-10 font-serif leading-relaxed">
              Discover our unique collection of hampers, frames, accessories, and
              more — each crafted with{" "}
              <span className="text-[#E6CFA9] font-semibold">love & care</span>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/newarrivals"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-[#FFF0CE] hover:bg-[#fff1eb] rounded-full text-[#cb997e] font-semibold text-base sm:text-lg transition-all transform hover:scale-105 shadow-md"
              >
                Shop Now
              </a>
              <a
                href="/AboutUs"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-[#FFE8CD] border border-[#cb997e] hover:bg-[#6c584c] rounded-full text-[#cb997e] font-semibold text-base sm:text-lg transition-all transform hover:scale-105 shadow-sm"
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
