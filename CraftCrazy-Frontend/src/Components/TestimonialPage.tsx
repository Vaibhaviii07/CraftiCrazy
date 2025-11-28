import React, { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

export default function TestimonialsSlider() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // SAFE default value → no undefined crash
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch reviews from backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/reviews");

        console.log("Reviews Response:", res.data);

        // FIX: match your backend structure
        const reviews = res.data?.allReviews || [];

        setTestimonials(reviews);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    fetchReviews();
  }, []);

  // Auto slide only when data exists
  useEffect(() => {
    if (testimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials]);

  // Scroll to active slide
  useEffect(() => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollTo({
      left: scrollRef.current.clientWidth * currentIndex,
      behavior: "smooth",
    });
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  // While loading backend data
  if (testimonials.length === 0) {
    return (
      <section className="py-20 text-center bg-[#FBF7F0]">
        <h2 className="text-2xl text-gray-500 font-serif">Loading reviews...</h2>
      </section>
    );
  }

  return (
    <section className="py-20 relative bg-[#FBF7F0]">
      <div className="text-center mb-16 px-4">
        <h2 className="text-4xl md:text-5xl font-serif text-[#603808] font-semibold">
          What Our Clients Say
        </h2>
        <p className="mt-4 text-lg text-[#6B3F28] max-w-xl mx-auto italic leading-relaxed">
          Hear from customers who chose our handcrafted gifts.
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto">

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/90 rounded-full shadow hover:bg-[#f2e6db] transition"
        >
          <ChevronLeft className="w-6 h-6 text-[#8C5E3C]" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/90 rounded-full shadow hover:bg-[#f2e6db] transition"
        >
          <ChevronRight className="w-6 h-6 text-[#8C5E3C]" />
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-hidden scroll-smooth snap-x snap-mandatory gap-6 px-4"
        >
          {testimonials.map((t: any) => (
            <div
              key={t._id}
              className="flex-shrink-0 w-full sm:w-[320px] md:w-[360px] snap-center bg-white rounded-3xl shadow-md p-8 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-transform duration-300"
            >
              <img
                src={t.image}
                alt={t.product}
                className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-full mb-5 border-4 border-[#D9A441]"
              />

              <h3 className="text-xl sm:text-2xl font-serif text-gray-800 font-semibold">
                {t.name}
              </h3>

              {t.location && (
                <p className="text-sm sm:text-base text-gray-500 mb-3">
                  {t.location}
                </p>
              )}

              <p className="text-gray-700 italic mb-4 leading-relaxed">
                "{t.feedback}"
              </p>

              <div className="flex text-[#D9A441]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-8 gap-3">
          {testimonials.map((_: any, idx: number) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-colors ${
                currentIndex === idx ? "bg-[#8C5E3C]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
