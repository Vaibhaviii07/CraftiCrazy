import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Quote, Star, Mail, MapPin, Phone } from "lucide-react";

interface Review {
  _id: string;
  name: string;
  role?: string;
  email?: string;
  phone?: string;
  address?: string;
  reviewText: string;
  rating: number;
  createdAt: string;
}

// Avatar generator
const randomAvatar = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=random&color=fff&bold=true&size=128&font-size=0.45`;

const CustomerReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null); // For "Read More"

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/reviews");
        setReviews(res.data || []);
      } catch {
        console.warn("⚠️ Using static fallback reviews");
        setReviews([
          {
            _id: "1",
            name: "Vaibhavi Tingane",
            role: "CEO of Norja",
            email: "vaibhavi.t@example.com",
            phone: "9876543210",
            address: "Nagpur, Maharashtra",
            reviewText:
              "Excellent platform! The user experience is seamless, and I’m impressed by the quality of service provided. The team is super responsive, and I appreciate how the interface feels modern yet simple to navigate. Absolutely love it!",
            rating: 5,
            createdAt: "2025-10-20T09:30:00Z",
          },
          {
            _id: "2",
            name: "Rohit Sharma",
            role: "Manager at CHO",
            email: "rohit.sharma@example.com",
            phone: "9123456789",
            address: "Pune, Maharashtra",
            reviewText:
              "Highly recommend! The responsiveness and design are top-notch. Great support too! This is one of the best admin panels I’ve used in a long time — smooth, fast, and very intuitive.",
            rating: 4,
            createdAt: "2025-10-22T11:00:00Z",
          },
          {
            _id: "3",
            name: "Kiara Advain",
            role: "CEO of Empiro",
            email: "kiara.advain@example.com",
            phone: "9998887776",
            address: "Mumbai, Maharashtra",
            reviewText:
              "I absolutely love the layout and visuals. Very clean and professional design. The animations feel smooth, and the typography is perfectly balanced. Truly premium work!",
            rating: 4.5,
            createdAt: "2025-10-25T08:15:00Z",
          },
          {
            _id: "4",
            name: "Anjali Patil",
            role: "Marketing Head",
            email: "anjali.patil@example.com",
            phone: "9876541230",
            address: "Bangalore, Karnataka",
            reviewText:
              "The best experience ever! Everything runs smoothly. The backend integration is seamless and the overall presentation feels polished. Kudos to the team for maintaining such a high-quality interface!",
            rating: 5,
            createdAt: "2025-09-18T15:45:00Z",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <motion.div
      className="p-6 bg-gray-50 min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2a0a4b]">⭐ Customer Reviews</h1>
        <p className="text-gray-500 mt-1">
          Feedback from our valuable customers and users.
        </p>
      </div>

      {/* Reviews Grid */}
      {loading ? (
        <p className="text-center text-gray-600">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews found.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {reviews.map((r) => {
            const isExpanded = expanded === r._id;
            const shortText =
              r.reviewText.length > 120
                ? r.reviewText.slice(0, 120) + "..."
                : r.reviewText;

            return (
              <motion.div
                key={r._id}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 250 }}
                className="relative bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-xl hover:border-[#845EF7]/60 transition-all duration-300"
              >
                <Quote className="absolute top-3 right-3 text-white bg-[#845EF7] rounded-full p-1 w-6 h-6 shadow-sm" />

                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={randomAvatar(r.name)}
                    alt={r.name}
                    className="w-12 h-12 rounded-full border-2 border-[#845EF7]/40"
                  />
                  <div>
                    <h3 className="font-semibold text-[#4b0082]">{r.name}</h3>
                    <p className="text-sm text-gray-500">{r.role}</p>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                  {isExpanded ? r.reviewText : shortText}
                </p>
                {r.reviewText.length > 120 && (
                  <button
                    onClick={() =>
                      setExpanded(isExpanded ? null : r._id)
                    }
                    className="text-[#845EF7] text-sm font-medium hover:underline"
                  >
                    {isExpanded ? "Show Less" : "Read More"}
                  </button>
                )}

                {/* Rating + Date */}
                <div className="flex items-center justify-between text-sm text-gray-600 mt-4">
                  <div className="flex items-center gap-1">
                    <span className="font-medium">Rating:</span>
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-4 h-4 ${
                          idx < Math.round(r.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-500">
                    {new Date(r.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {/* Contact Info */}
                <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-600 space-y-1">
                  <p className="flex items-center gap-1">
                    <Mail size={12} className="text-[#845EF7]" /> {r.email}
                  </p>
                  <p className="flex items-center gap-1">
                    <Phone size={12} className="text-[#845EF7]" />{" "}
                    {r.phone || "Not provided"}
                  </p>
                  <p className="flex items-center gap-1">
                    <MapPin size={12} className="text-[#845EF7]" />{" "}
                    {r.address || "Not provided"}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default CustomerReviewsPage;
