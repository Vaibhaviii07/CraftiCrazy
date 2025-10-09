import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HomePage = () => {
  useEffect(() => {
    console.log("HomePage mounted");

    // Example: could trigger an animation, analytics, or fetch data here

    return () => {
      console.log("HomePage unmounted");
    };
  }, []);

  return (
    <div className="bg-[#FBFAF7]">
      {/* Hero Section */}
      <section className="relative w-full h-[260px] sm:h-[380px] md:h-[500px] flex items-center justify-center overflow-hidden">
        {/* Lazy Loaded Hero Image */}
        <img
          src="./hero5.jpg"
          alt="Handmade Gifts"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 md:bg-gradient-to-r md:from-black/70 md:via-black/50 md:to-transparent"></div>

        {/* Hero Content */}
        <div className="absolute z-10 flex items-center justify-center w-full h-full px-3 sm:px-8 md:px-16 text-center">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="p-4 sm:p-8 md:p-12 rounded-3xl max-w-[95%] sm:max-w-2xl"
          >
            {/* Heading */}
            <h1 className="text-[1.4rem] sm:text-4xl md:text-5xl font-extrabold text-white mb-3 sm:mb-5 leading-snug sm:leading-tight tracking-wide drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]">
              Handmade Gifts <br /> That Speak from the{" "}
              <span className="text-[#E6CFA9]">Heart</span>
            </h1>

            {/* Divider */}
            <div className="w-14 sm:w-20 h-1 mx-auto bg-[#E6CFA9] mb-3 sm:mb-6 rounded-full"></div>

            {/* Subheading */}
            <p className="text-[0.8rem] sm:text-lg md:text-xl text-white/90 mb-5 sm:mb-8 font-serif leading-relaxed max-w-md sm:max-w-xl mx-auto drop-shadow-[0_3px_5px_rgba(0,0,0,0.4)]">
              Discover our unique collection of hampers, frames, accessories, and
              more — each crafted with{" "}
              <span className="text-[#E6CFA9] font-semibold">love & care</span>.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center">
              <Link
                to="/newarrivals"
                className="px-4 sm:px-8 py-2 sm:py-3 bg-[#FFF0CE] hover:bg-[#fff1eb] rounded-full text-[#cb997e] font-semibold text-[0.8rem] sm:text-lg transition-all transform hover:scale-105 shadow-md"
              >
                Shop Now
              </Link>
              <Link
                to="/aboutus"
                className="px-4 sm:px-8 py-2 sm:py-3 bg-[#FFE8CD] border border-[#cb997e] hover:bg-[#6c584c] rounded-full text-[#cb997e] font-semibold text-[0.8rem] sm:text-lg transition-all transform hover:scale-105 shadow-sm"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
