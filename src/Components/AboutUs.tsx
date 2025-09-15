import React from "react";
import { motion } from "framer-motion";
import { Heart, Gift, Star } from "lucide-react";

const AboutUs: React.FC = () => {
  return (
    <section className="bg-gray-100 py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        {/* Left Image with Animation */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src="/AboutUs.jpg"
            alt="About CraftiCrazy"
            className="rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-snug">
            About <span className="text-amber-600">CraftiCrazy</span>
          </h2>

          <p className="text-lg text-gray-700 mb-4 font-serif leading-relaxed">
            At{" "}
            <span className="font-semibold text-gray-900">CraftiCrazy</span>, we
            craft gifts that speak the language of emotions. From handmade
            hampers to keepsakes, rakhis, photo frames, and more — every
            creation is designed to celebrate moments and memories.
          </p>

          <p className="text-lg text-gray-700 mb-8 font-serif leading-relaxed">
            Our products are perfect for birthdays, anniversaries, festivals, or
            any special occasion where love, thoughtfulness, and quality matter.
          </p>

          {/* Values with icons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-serif">
            <div className="flex items-center gap-3">
              <Heart className="text-amber-500 w-6 h-6" />
              <span className="text-gray-800 font-medium">Made with Love</span>
            </div>
            <div className="flex items-center gap-3">
              <Gift className="text-amber-500 w-6 h-6" />
              <span className="text-gray-800 font-medium">Unique Gifts</span>
            </div>
            <div className="flex items-center gap-3">
              <Star className="text-amber-500 w-6 h-6" />
              <span className="text-gray-800 font-medium">Premium Quality</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
