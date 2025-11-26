// src/Components/CustomerReview.tsx
import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";

export interface Review {
  _id?: string;
  name: string;
  email?: string;
  title?: string;
  comment: string;
  rating: number;
  image?: string | null; // nullable
  date: string;
}

interface CustomerReviewProps {
  productId: string;
  variantId?: string;
  setBackendRating?: (rating: number) => void;
  setBackendReviewsCount?: (count: number) => void;
}

export default function CustomerReview({
  productId,
  variantId,
  setBackendRating,
  setBackendReviewsCount,
}: CustomerReviewProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    if (!productId) return;
    try {
      const res = await fetch(
        `http://localhost:8000/api/reviews/product/${productId}?limit=8`
      );
      if (!res.ok) throw new Error("Reviews fetch failed");
      const data = await res.json();

      const reviewsArray: Review[] = Array.isArray(data.reviews) ? data.reviews : [];
      setReviews(reviewsArray);

      if (setBackendRating) setBackendRating(data.averageRating ?? 0);
      if (setBackendReviewsCount) setBackendReviewsCount(data.reviewCount ?? 0);
    } catch (err) {
      console.error(err);
      setReviews([]);
      if (setBackendRating) setBackendRating(0);
      if (setBackendReviewsCount) setBackendReviewsCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId, variantId]);

  if (loading)
    return (
      <div className="mt-8 max-w-4xl mx-auto flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-gray-100 h-24 rounded-2xl animate-pulse"></div>
        ))}
      </div>
    );

  if (!reviews.length)
    return <p className="text-gray-500 mt-4 text-center">No reviews yet.</p>;

  return (
    <div className="mt-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Customer Reviews</h2>
      <div className="flex flex-col gap-6">
        {reviews.map((review) => (
          <div
            key={review._id || review.name}
            className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {review.image ? (
                  <img
                    src={review.image}
                    alt={review.name || "User avatar"}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold">
                    {review.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-800">{review.name}</p>
                  <p className="text-gray-400 text-xs">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
            </div>

            {review.title && (
              <p className="font-semibold text-gray-900 mt-3 text-lg">{review.title}</p>
            )}
            <p className="text-gray-700 mt-2 leading-relaxed">
              {review.comment.length > 200
                ? review.comment.slice(0, 200) + "..."
                : review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
