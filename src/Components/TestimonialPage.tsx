import React, { useState } from "react";
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

export default function TestimonialsCards() {
  const [page, setPage] = useState(0);
  const perPage = 3;

  const totalPages = Math.ceil(testimonials.length / perPage);

  const startIndex = page * perPage;
  const currentTestimonials = testimonials.slice(startIndex, startIndex + perPage);

  const handlePrev = () => setPage((prev) => (prev > 0 ? prev - 1 : prev));
  const handleNext = () => setPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));

  return (
    <section className="py-20  relative">
      {/* Header */}
      <div className="text-center mb-14 px-4 relative">
        <h2 className="text-4xl md:text-5xl font-serif text-[#603808]">
          Our Happy Clients
        </h2>
        <p className="mt-4 text-lg text-[#6B3F28] max-w-xl mx-auto italic">
          Hear from those who chose handmade craftsmanship for their big moments.
        </p>

        {/* Arrows */}
        {totalPages > 1 && (
          <div className="absolute top-0 right-6 flex gap-3 mt-9">
            <button
              onClick={handlePrev}
              disabled={page === 0}
              className={`p-2 rounded-full shadow-md bg-white hover:bg-gray-100 transition ${
                page === 0 ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              <ChevronLeft className="w-5 h-5 text-[#603808]" />
            </button>
            <button
              onClick={handleNext}
              disabled={page === totalPages - 1}
              className={`p-2 rounded-full shadow-md bg-white hover:bg-gray-100 transition ${
                page === totalPages - 1 ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              <ChevronRight className="w-5 h-5 text-[#603808]" />
            </button>
          </div>
        )}
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-3 px-6">
        {currentTestimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition"
          >
            <img
              src={t.image}
              alt={t.product}
              className="w-28 h-28 object-cover rounded-full mb-5 border-4 border-[#b46029]"
            />
            <h3 className="text-xl font-semibold text-gray-800">{t.name}</h3>
            {t.location && <p className="text-sm text-gray-500 mb-2">{t.location}</p>}
            <p className="text-gray-700 italic mb-4">"{t.feedback}"</p>
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5" fill="currentColor" stroke="none" />
              ))}
            </div>
          </div>
        ))}
      </div>
      
    </section>
  );
}
