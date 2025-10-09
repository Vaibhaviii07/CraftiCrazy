import React, { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

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
  {
    id: 4,
    name: "Sanjay Verma",
    feedback:
      "The customized gift was beyond my expectations! Excellent work and very professional service.",
    location: "Pune, India",
    product: "Custom Gift",
    image: "Review4.jpeg",
  },
];

export default function TestimonialsSlider() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Scroll to the active card
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.clientWidth * currentIndex,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-20 relative bg-[#fff8f2]">
      {/* Header */}
      <div className="text-center mb-14 px-4">
        <h2 className="text-4xl md:text-5xl font-serif text-[#603808]">
          Our Happy Clients
        </h2>
        <p className="mt-4 text-lg text-[#6B3F28] max-w-xl mx-auto italic">
          Hear from those who chose handmade craftsmanship for their big moments.
        </p>
      </div>

      {/* Slider */}
      <div className="relative max-w-6xl mx-auto">
        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow hover:bg-[#f2e6db]"
        >
          <ChevronLeft className="w-6 h-6 text-[#C45A36]" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow hover:bg-[#f2e6db]"
        >
          <ChevronRight className="w-6 h-6 text-[#C45A36]" />
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-hidden scroll-smooth snap-x snap-mandatory gap-6 px-4"
        >
          {testimonials.map((t, idx) => (
            <div
              key={t.id}
              className="flex-shrink-0 w-full sm:w-[300px] md:w-[350px] snap-center bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl hover:scale-105 transition-transform duration-300"
            >
              <img
                src={t.image}
                alt={t.product}
                className="w-28 h-28 object-cover rounded-full mb-5 border-4 border-[#b46029]"
              />
              <h3 className="text-xl font-semibold text-gray-800">{t.name}</h3>
              {t.location && (
                <p className="text-sm text-gray-500 mb-2">{t.location}</p>
              )}
              <p className="text-gray-700 italic mb-4">"{t.feedback}"</p>
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5" fill="currentColor" stroke="none" />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-6 gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition ${
                currentIndex === idx ? "bg-[#C45A36]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
