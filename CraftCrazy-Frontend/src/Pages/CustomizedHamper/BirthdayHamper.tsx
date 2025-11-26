import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";

// Birthday Hamper type
interface BirthdayHamper {
  id: string;
  name: string;
  price: number;
  discount?: number;
  category?: string;
  image: string;
  description?: string;
  rating?: number;
}

// LazyImage component
const LazyImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const imgRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={`w-full h-full ${!isVisible ? "bg-gray-200 animate-pulse" : ""}`}>
      {isVisible && <img src={src} alt={alt} className={className} loading="lazy" />}
    </div>
  );
};

export default function BirthdayHamperPage() {
  const [hampers, setHampers] = useState<BirthdayHamper[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [highlight, setHighlight] = useState("All");
  const [sortOption, setSortOption] = useState("Default sorting");

  // Fetch Birthday Hampers from API (same structure as BraceletPage)
  useEffect(() => {
    const fetchHampers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/products/birthdayhampers");
        const apiData = res.data?.allProducts || [];
        setHampers(
          apiData.map((item: any) => ({
            id: String(item._id || item.id || ""),
            name: item.name || "Birthday Hamper",
            price: item.price || 0,
            discount: item.discount,
            category: item.category,
            image: item.imageUrl || "/placeholder.png",
            description: item.description,
            rating: item.rating,
          }))
        );
      } catch (err) {
        console.error("API ERROR:", err);
        setHampers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchHampers();
  }, []);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const categories = [...new Set(hampers.map((i) => i.category || "Others"))];
  const highlightOptions = ["All", "Best Seller", "Discounted"];

  // Filtering
  const filteredHampers = useMemo(() => {
    return hampers.filter((item) => {
      const categoryMatch =
        selectedCategories.length === 0 || selectedCategories.includes(item.category || "Others");

      let highlightMatch = true;
      switch (highlight) {
        case "Best Seller":
          highlightMatch = (item.rating ?? 0) >= 4.5;
          break;
        case "Discounted":
          highlightMatch = (item.discount ?? 0) > 0;
          break;
        default:
          highlightMatch = true;
      }

      return categoryMatch && highlightMatch;
    });
  }, [hampers, selectedCategories, highlight]);

  // Sorting
  const sortedHampers = useMemo(() => {
    const sorted = [...filteredHampers];
    switch (sortOption) {
      case "Price: Low to High":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "Rating":
        sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      default:
        break;
    }
    return sorted;
  }, [filteredHampers, sortOption]);

  return (
    <section className="min-h-screen">
      <div className="text-center mt-10 mb-8">
        <h2 className="text-3xl md:text-4xl font-[Playfair_Display] font-bold text-gray-900 relative inline-block">
          Birthday Hampers
          <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-28 h-1 bg-gradient-to-r from-[#C45A36] via-[#F7B77A] to-[#C45A36] rounded-full animate-pulse"></span>
        </h2>
        <p className="mt-3 text-gray-600 text-base italic max-w-sm mx-auto">
          Thoughtful hampers to make birthdays extra special.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-8 sm:mt-16 grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-1 bg-white p-4 rounded-lg h-fit shadow mb-6 md:mb-0">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-3">Categories</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={cat}
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="h-4 w-4 text-[#C45A36] border-gray-300 rounded"
                  />
                  <label htmlFor={cat} className="text-gray-700 text-sm cursor-pointer">
                    {cat}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-3">Highlight</h3>
            <ul className="space-y-2">
              {highlightOptions.map((opt) => (
                <li
                  key={opt}
                  onClick={() => setHighlight(opt)}
                  className={`text-sm cursor-pointer transition-colors duration-300 ${
                    highlight === opt
                      ? "text-[#C45A36] font-semibold"
                      : "text-gray-700 hover:text-[#C45A36]"
                  }`}
                >
                  {opt}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
            <p className="text-sm text-gray-600">
              Showing {loading ? "..." : sortedHampers.length} results
            </p>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-300 rounded-md text-sm px-3 py-2 focus:ring-[#C45A36] focus:border-[#C45A36]"
            >
              <option>Default sorting</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating</option>
            </select>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {loading
                ? Array(6)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="bg-gray-200 rounded-3xl h-[380px] animate-pulse"
                      ></div>
                    ))
                : sortedHampers.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 30 }}
                      transition={{ duration: 0.5 }}
                      className="group flex justify-center"
                    >
                      <Link
                        to={`/birthdaydetail/${item.id}`}
                        className="w-full max-w-[360px] flex flex-col"
                      >
                        <div className="relative w-full h-[280px] sm:h-[320px] lg:h-[380px] rounded-3xl overflow-hidden hover:shadow-2xl transition-shadow duration-500 hover:-translate-y-2">
                          <LazyImage
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {item.discount && (
                            <span className="absolute top-3 right-3 bg-[#C45A36] text-white font-semibold px-2 py-1 rounded-md text-sm shadow-sm">
                              {item.discount}% OFF
                            </span>
                          )}
                        </div>

                        <div className="mt-4 text-center">
                          <p className="text-xl text-gray-900 font-playfair leading-snug">{item.name}</p>
                          {item.description && (
                            <p className="text-gray-500 text-xs sm:text-sm mt-1 line-clamp-2">{item.description}</p>
                          )}
                          <div className="mt-2 flex justify-center gap-3 items-baseline">
                            <span className="text-2xl text-[#C45A36] font-cinzel">₹{item.price}</span>
                            {item.discount && (
                              <span className="text-sm text-gray-500 line-through">
                                ₹{Math.round(item.price + (item.price * item.discount) / 100)}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
