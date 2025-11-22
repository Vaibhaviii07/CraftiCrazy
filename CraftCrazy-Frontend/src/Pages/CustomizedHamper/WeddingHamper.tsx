<<<<<<< Updated upstream
import React, { useState, useMemo, useRef, useEffect } from "react";
=======
import React, { useState,useEffect, useMemo } from "react";
>>>>>>> Stashed changes
import { motion, AnimatePresence } from "framer-motion";
import { weddingHampers, WeddingHamper, Variant } from "../../Data/WeddingData";
import { Link } from "react-router-dom";
import { CorporateHamper, corporateHampers } from "../../Data/CorporateData";

// LazyImage component for lazy loading
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

export default function WeddingHamperPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("Default sorting");
<<<<<<< Updated upstream
  const [highlight, setHighlight] = useState("All");
=======
  const [allProducts,setAllProducts] = useState<WeddingHamper[]>(weddingHampers);

  
     // Fetch API data and merge
      useEffect(() => {
        async function fetchData() {
          try {
            const res = await fetch("http://localhost:8000/api/products?category=rakhihits");
            const apiData: CorporateHamper[] = await res.json();
            
            // Merge: API data first, keep local data that API doesn't have
            const merged = [
              ...apiData,
              ...corporateHampers.filter(
                (local) => !apiData.some((api) => api.id === local.id)
              ),
            ];
    
            setAllProducts(merged);
          } catch (error) {
            console.error("Failed to fetch products", error);
          }
        }
    
        fetchData();
      }, []);
  
>>>>>>> Stashed changes

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

<<<<<<< Updated upstream
  const categories = [...new Set(weddingHampers.map((i) => i.category))];
  const highlightOptions = ["All", "Best Seller", "Discounted"];

  const filteredHampers = useMemo(() => {
    return weddingHampers.filter((item) => {
      const categoryMatch =
        selectedCategories.length === 0 || selectedCategories.includes(item.category);

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
=======
  const categories = [...new Set(allProducts.map((i) => i.category))];

  const filteredHampers = useMemo(() => {
    return allProducts.filter((item) => {
      return (
        selectedCategories.length === 0 ||
        selectedCategories.includes(item.category)
      );
>>>>>>> Stashed changes
    });
  }, [selectedCategories, highlight]);

  const sortedHampers = useMemo(() => {
    const sorted = [...filteredHampers];
    switch (sortOption) {
      case "Price: Low to High":
        sorted.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "Price: High to Low":
        sorted.sort((a, b) => Number(b.price) - Number(a.price));
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
      <div className="text-center mt-10 mb-3">
        <h2 className="text-3xl md:text-4xl font-[Playfair_Display] font-bold text-gray-900 relative inline-block">
          Wedding Hamper
          <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-28 h-1 bg-gradient-to-r from-[#C45A36] via-[#F7B77A] to-[#C45A36] rounded-full animate-pulse"></span>
        </h2>
        <p className="mt-3 text-gray-600 text-base italic max-w-sm mx-auto">
          Exquisite hampers designed to celebrate love and togetherness.
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
            <p className="text-sm text-gray-600">Showing {sortedHampers.length} results</p>
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

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16">
            <AnimatePresence>
              {sortedHampers.map((item: WeddingHamper) => {
                const variant: Variant = item.variants?.[0] ?? {
                  image: item.image,
                  price: item.price,
                  discount: item.discount,
                };

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4 }}
                    className="flex justify-center"
                  >
                    <Link
                      to={`/weddingDetail/${item.id}`}
                      className="w-full max-w-[280px] sm:max-w-[320px] flex flex-col"
                    >
                      <div className="relative w-full h-[240px] sm:h-[320px] lg:h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-2 sm:hover:-translate-y-3">
                        <LazyImage
                          src={variant.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {variant.discount && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="absolute top-2 right-2 bg-[#C45A36] text-white text-xs sm:text-sm font-semibold px-2 py-1 rounded-md shadow"
                          >
                            {variant.discount}% OFF
                          </motion.span>
                        )}
                      </div>

                      <div className="mt-2 sm:mt-3 text-center px-1 sm:px-0">
                        <p className="text-sm sm:text-lg text-gray-900 font-playfair leading-snug">
                          {item.name}
                        </p>
                        {item.description && (
                          <p className="text-gray-500 text-xs sm:text-sm mt-1 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                        <div className="mt-1 sm:mt-2 flex justify-center gap-1 sm:gap-2 items-baseline">
                          <span className="text-lg sm:text-2xl text-[#C45A36] font-cinzel">
                            ₹{variant.price}
                          </span>
                          {variant.discount && (
                            <span className="line-through text-gray-400 text-sm sm:text-lg ml-2">
                              ₹{item.price}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
