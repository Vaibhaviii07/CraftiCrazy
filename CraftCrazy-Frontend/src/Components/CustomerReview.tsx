// src/Components/CustomerReview.tsx
import React, { useRef, useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";

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

  // ⭐ Added for backend ratings like Birthday/Bracelet system
  setBackendRating?: (rating: number) => void;
  setBackendReviewsCount?: (count: number) => void;
}

const CustomerReview: React.FC<CustomerReviewProps> = ({
  productId,
  setBackendRating,
  setBackendReviewsCount,
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // ⭐ Load reviews from localStorage + update backend rating
  const loadReviews = () => {
    const stored = localStorage.getItem(`reviews_${productId}`);
    const parsed = stored ? JSON.parse(stored) : [];
    setReviews(parsed);

    // ⭐ Update backend rating & review count
    if (setBackendRating && setBackendReviewsCount) {
      if (parsed.length > 0) {
        const avg =
          parsed.reduce((acc: number, r: Review) => acc + r.rating, 0) /
          parsed.length;

        setBackendRating(avg);
        setBackendReviewsCount(parsed.length);
      } else {
        setBackendRating(0);
        setBackendReviewsCount(0);
      }
    }
  };

  useEffect(() => {
    loadReviews();

    const handleNewReview = (e: any) => {
      if (e.detail === productId) loadReviews();
    };

    window.addEventListener("new-review", handleNewReview);
    return () => window.removeEventListener("new-review", handleNewReview);
  }, [productId]);

  // ⭐ Delete review
  const deleteReview = (index: number) => {
    const updated = [...reviews];
    updated.splice(index, 1);
    setReviews(updated);

    localStorage.setItem(`reviews_${productId}`, JSON.stringify(updated));

    window.dispatchEvent(new CustomEvent("new-review", { detail: productId }));
  };

  // ⭐ Scroll controls
  const scrollLeft = () =>
    scrollRef.current?.scrollBy({ left: -250, behavior: "smooth" });

  const scrollRight = () =>
    scrollRef.current?.scrollBy({ left: 250, behavior: "smooth" });

  return (
    <div className="py-12 sm:py-16 border-t mt-6">
      {/* Header */}
      <div className="text-center mb-8 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1b1b1b]">
          Customer Feedback
        </h2>
        <p className="mt-3 sm:mt-4 text-sm sm:text-lg md:text-xl text-[#6B3F28] max-w-xl sm:max-w-2xl mx-auto italic leading-relaxed">
          Real stories from those who chose handcrafted perfection.
        </p>
      </div>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-500 text-sm sm:text-base">
          No reviews yet. Be the first to review!
        </p>
      ) : (
        <div className="relative max-w-full sm:max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={scrollLeft}
              className="bg-white/90 hover:bg-white shadow p-2 rounded-full transition"
            >
              <ChevronLeft className="text-[#603808]" size={20} />
            </button>

            <div
              ref={scrollRef}
              className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-2"
            >
              {reviews.map((review, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-all flex-shrink-0 w-64 sm:w-72 md:w-80 relative"
                >
                  {review.image && (
                    <div className="relative">
                      <img
                        src={review.image}
                        alt={review.name}
                        className="w-full h-48 sm:h-56 object-cover"
                      />

                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#f8e6db] rounded-md px-2 py-1 flex gap-1 shadow-md text-xs sm:text-sm">
                        {Array.from({ length: review.rating }).map((_, j) => (
                          <Star
                            key={j}
                            size={14}
                            className="text-yellow-500 fill-yellow-500"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-6 pb-5 px-4 sm:px-5 flex flex-col text-center">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">
                      {review.name}
                    </h3>

                    {review.title && (
                      <p className="text-gray-500 text-xs sm:text-sm mb-1">
                        {review.title}
                      </p>
                    )}

                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      {review.comment}
                    </p>

                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(review.date).toLocaleDateString()}
                    </p>

                    {/* Delete Button */}
                    <button
                      onClick={() => deleteReview(i)}
                      className="absolute top-2 right-2 p-1 text-gray-500 hover:text-red-600 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={scrollRight}
              className="bg-white/90 hover:bg-white shadow p-2 rounded-full transition"
            >
              <ChevronRight className="text-[#603808]" size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerReview;
