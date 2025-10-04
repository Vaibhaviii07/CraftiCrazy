import React from "react";
import { motion } from "framer-motion";
import { Heart, Gift, Star } from "lucide-react";

const AboutUs: React.FC = () => {
  return (
    <section className="bg-gray-100 py-16 px-4 sm:px-6 md:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Image with Animation */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex justify-center md:justify-start"
        >
          <img
            src="/AboutUs.jpg"
            alt="About CraftiCrazy"
            className="w-full max-w-md md:max-w-full rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-snug text-center md:text-left">
            About <span className="text-[#a47148]">CraftiCrazy</span>
          </h2>

          <p className="text-base sm:text-lg text-gray-700 mb-4 font-serif leading-relaxed text-center md:text-left">
            At <span className="font-semibold text-gray-900">CraftiCrazy</span>, we craft gifts that speak the language of emotions. From handmade hampers to keepsakes, rakhis, photo frames, and more — every creation is designed to celebrate moments and memories.
          </p>

          <p className="text-base sm:text-lg text-gray-700 mb-6 font-serif leading-relaxed text-center md:text-left">
            Our products are perfect for birthdays, anniversaries, festivals, or any special occasion where love, thoughtfulness, and quality matter.
          </p>

          {/* Values with icons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-center sm:text-left font-serif">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Heart className="text-[#a47148] w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-gray-800 font-medium text-sm sm:text-base">Made with Love</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Gift className="text-[#a47148] w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-gray-800 font-medium text-sm sm:text-base">Unique Gifts</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Star className="text-[#a47148] w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-gray-800 font-medium text-sm sm:text-base">Premium Quality</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
