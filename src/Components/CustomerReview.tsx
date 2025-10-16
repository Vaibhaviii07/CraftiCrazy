// src/Components/CustomerReview.tsx
import React, { useRef, useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

export interface Review {
  name: string;
  email?: string;
  title?: string;
  comment: string;
  rating: number;
  image?: string;
  date: string;
  productId?: string;
}

interface CustomerReviewProps {
  productId: string;
}

const CustomerReview: React.FC<CustomerReviewProps> = ({ productId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load reviews from localStorage
  const loadReviews = () => {
    const stored = localStorage.getItem(`reviews_${productId}`);
    if (stored) setReviews(JSON.parse(stored));
    else setReviews([]);
  };

  useEffect(() => {
    loadReviews();
    const handleNewReview = (e: any) => {
      if (e.detail === productId) loadReviews();
    };
    window.addEventListener("new-review", handleNewReview);
    return () => window.removeEventListener("new-review", handleNewReview);
  }, [productId]);

  // Scroll Handlers
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="py-16 border-t mt-6">
      {/* Header */}
      <div className="text-center mb-10 px-4">
        <h2 className="text-4xl md:text-5xl font-serif text-[#1b1b1b]">
          Customer Feedback
        </h2>
        <p className="mt-4 text-lg md:text-xl text-[#6B3F28] max-w-2xl mx-auto italic leading-relaxed">
          Real stories from those who chose handcrafted perfection for their special moments.
        </p>
      </div>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">
          No reviews yet. Be the first to review!
        </p>
      ) : (
        <div className="relative max-w-5xl mx-auto px-4">
          {/* Scroll Container */}
          <div className="flex items-center justify-center gap-3">
            {/* Left Arrow (closer to cards) */}
            <button
              onClick={scrollLeft}
              className="bg-white/90 hover:bg-white shadow-md p-2 rounded-full z-10 transition-all"
            >
              <ChevronLeft className="text-[#603808]" size={24} />
            </button>

            {/* Cards */}
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-2 justify-center"
            >
              {reviews.map((review, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex-shrink-0 w-72"
                >
                  {review.image && (
                    <div className="relative">
                      <img
                        src={review.image}
                        alt={review.name}
                        className="w-full h-56 object-cover"
                      />
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#f8e6db] rounded-md px-3 py-1 flex gap-1 shadow-md">
                        {Array.from({ length: review.rating }).map((_, j) => (
                          <Star
                            key={j}
                            size={16}
                            className="text-yellow-500 fill-yellow-500"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-6 pb-5 px-5 text-center flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-3">
                      {review.name}
                    </h3>
                    {review.title && (
                      <p className="text-gray-500 text-sm mb-2">
                        {review.title}
                      </p>
                    )}
                    <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                      {review.comment}
                    </p>
                    <p className="text-xs text-gray-400 mt-3">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Arrow (closer to cards) */}
            <button
              onClick={scrollRight}
              className="bg-white/90 hover:bg-white shadow-md p-2 rounded-full z-10 transition-all"
            >
              <ChevronRight className="text-[#603808]" size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerReview;
