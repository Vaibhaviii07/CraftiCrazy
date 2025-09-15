import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    feedback:
      "Absolutely loved the Photo Frame! It made my engagement day so much more special. The packaging and detailing were perfect.",
    location: "Mumbai, India",
    product: "Resin Photo Frame",
    image: "Review1.jpeg",
  },
  {
    id: 2,
    name: "Rohit Mehta",
    feedback:
      "I ordered a handmade gift hamper for my friend, and it was elegant and unique. She absolutely loved it, and everyone admired the craftsmanship. Highly recommended for special occasions.",
    location: "Delhi, India",
    product: "Luxury Gift Hamper",
    image: "Review2.jpeg",
  },
  {
    id: 3,
    name: "Ananya Gupta",
    feedback:
      "I ordered a Raksha Bandhan hamper for my brother, and he absolutely loved it! The hamper was thoughtful and beautifully packed.",
    product: "Customized Keychain",
    image: "Review3.jpeg",
  },
];

export default function ModernTestimonials() {
  const [current, setCurrent] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-[#FBFAF7]">
      {/* Header */}
      <div className="text-center mb-16 px-4">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#AB420A]">
          What Our Customers Say
        </h2>
        <p className="mt-4 text-lg text-[#6B3F28] max-w-xl mx-auto">
          Hear from those who chose handmade craftsmanship for their big moments.
        </p>
      </div>

      {/* Testimonial Slider */}
      <div className="relative max-w-4xl mx-auto px-4 flex justify-center items-center h-[420px]">
        <AnimatePresence>
          {testimonials.map(
            (t, index) =>
              index === current && (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, x: 100, scale: 0.85 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -100, scale: 0.85 }}
                  transition={{ duration: 0.8 }}
                  className="absolute w-full md:w-3/4 lg:w-2/3 bg-white p-8 md:p-12 rounded-3xl shadow-2xl flex flex-col items-center text-center"
                >
                  <img
                    src={t.image}
                    alt={t.product}
                    className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-full mb-6 border-4 border-[#b46029]"
                  />
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-800">{t.name}</h3>
                  {t.location && <p className="text-sm text-gray-500 mb-3">{t.location}</p>}
                  <p className="text-gray-700 italic text-center mb-4">"{t.feedback}"</p>
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5" fill="currentColor" stroke="none" />
                    ))}
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-12 gap-4">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-4 h-4 rounded-full transition-colors ${
              idx === current ? "bg-[#b46029]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
