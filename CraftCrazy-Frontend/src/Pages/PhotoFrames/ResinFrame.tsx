import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { resinFrames, ResinFrame } from "../../Data/ResinFramedata";
import { Link } from "react-router-dom";

/* -------------------------------------------
   Lazy Image Loader (Keep from HEAD)
----------------------------------------------*/
const LazyImage = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
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
    <div
      ref={imgRef}
      className={`w-full h-full ${
        !isVisible ? "bg-gray-200 animate-pulse" : ""
      }`}
    >
      {isVisible && (
        <img src={src} alt={alt} className={className} loading="lazy" />
      )}
    </div>
  );
};

/* ----------------------------------------------
   MAIN PAGE
----------------------------------------------*/
export default function ResinFramePage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [highlight, setHighlight] = useState("All");
  const [sortOption, setSortOption] = useState("Default sorting");

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat)
        ? prev.filter((c) => c !== cat)
        : [...prev, cat]
    );
  };

  const highlightOptions = ["All", "Best Seller", "Discounted"];
  const categories = [...new Set(resinFrames.map((item) => item.category))];

  /* ----------------------------------------------
      FILTERED DATA
  ----------------------------------------------*/
  const filteredFrames = useMemo(() => {
    return resinFrames.filter((item) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(item.category);

      let highlightMatch = true;

      if (highlight === "Best Seller") {
        highlightMatch = (item.rating ?? 0) >= 4.5; // keeping HEAD logic
      } else if (highlight === "Discounted") {
        highlightMatch = (item.discount ?? 0) > 0;
      }

      return categoryMatch && highlightMatch;
    });
  }, [selectedCategories, highlight]);

  /* ----------------------------------------------
      SORTED DATA
  ----------------------------------------------*/
  const sortedFrames = useMemo(() => {
    const sorted = [...filteredFrames];

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
  }, [filteredFrames, sortOption]);

  /* ----------------------------------------------
      PAGE UI
  ----------------------------------------------*/
  return (
    <section className="min-h-screen bg-gray-50">
      {/* Title */}
      <div className="text-center mt-10 mb-8">
        <h2 className="text-3xl md:text-4xl font-[Playfair_Display] font-bold text-gray-900 relative inline-block">
          Resin Frames
          <span className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-28 h-1 bg-gradient-to-r from-[#C45A36] via-[#F7B77A] to-[#C45A36] rounded-full animate-pulse"></span>
        </h2>
        <p className="mt-3 text-gray-600 text-base italic max-w-sm mx-auto">
          Artistic resin frames that preserve memories with style and charm.
        </p>
      </div>

      {/* MAIN LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-8 sm:mt-16 flex flex-col md:flex-row gap-6 md:gap-8">
        
        {/* SIDEBAR */}
        <aside className="w-full md:w-1/4 bg-white p-4 rounded-lg h-fit shadow">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-3">
              Categories
            </h3>
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
                  <label
                    htmlFor={cat}
                    className="text-gray-700 text-sm cursor-pointer"
                  >
                    {cat}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-3">
              Highlight
            </h3>
            <ul className="space-y-2">
              {highlightOptions.map((opt) => (
                <li
                  key={opt}
                  onClick={() => setHighlight(opt)}
                  className={`text-sm cursor-pointer transition-colors ${
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

        {/* PRODUCT GRID */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* TOP BAR */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <p className="text-sm text-gray-600">
              Showing {sortedFrames.length} results
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

          {/* PRODUCT CARDS */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16">
            <AnimatePresence>
              {sortedFrames.map((item: ResinFrame) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                  className="flex justify-center"
                >
                  <Link
                    to={`/Framedetail/${item.id}`}
                    className="w-full max-w-[280px] sm:max-w-[320px] flex flex-col"
                  >
                    <div className="relative w-full h-[240px] sm:h-[320px] lg:h-[380px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-2">
                      
                      {/* Keep Lazy Loader */}
                      <LazyImage
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />

                      {item.discount && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                          className="absolute top-2 right-2 bg-[#C45A36] text-white text-xs sm:text-sm font-semibold px-2 py-1 rounded-md shadow"
                        >
                          {item.discount}% OFF
                        </motion.span>
                      )}
                    </div>

                    <div className="mt-2 sm:mt-3 text-center">
                      <p className="text-sm sm:text-lg text-gray-900 font-playfair">
                        {item.name}
                      </p>

                      {item.description && (
                        <p className="text-gray-500 text-xs sm:text-sm mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      )}

                      <div className="mt-1 sm:mt-2 flex justify-center gap-2 items-baseline">
                        <span className="text-lg sm:text-2xl text-[#C45A36] font-cinzel">
                          ₹{item.price}
                        </span>

                        {item.discount && (
                          <span className="line-through text-gray-400 text-sm sm:text-lg">
                            ₹{Math.round(
                              item.price / (1 - (item.discount ?? 0) / 100)
                            )}
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
