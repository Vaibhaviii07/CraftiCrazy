// src/Pages/ResinArt/ResinKeychainPage.tsx
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { resinKeychains, ResinKeychain } from "../../Data/ResinKeychainData";
import { Link } from "react-router-dom";

export default function ResinKeychainPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [highlight, setHighlight] = useState("All");
  const [sortOption, setSortOption] = useState("Default sorting");
  const [showFilters, setShowFilters] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const highlightOptions = ["All", "Best Seller", "Discounted"];
  const categories = [...new Set(resinKeychains.map(item => item.category))];

  const filteredItems = useMemo(() => {
    return resinKeychains.filter((item: ResinKeychain) => {
      const categoryMatch =
        selectedCategories.length === 0 || selectedCategories.includes(item.category);

      let highlightMatch = true;
      switch (highlight) {
        case "Best Seller":
          highlightMatch = item.highlight === "Best Seller";
          break;
        case "Discounted":
          highlightMatch = (item.discount ?? 0) > 0;
          break;
        default:
          highlightMatch = true;
      }
      return categoryMatch && highlightMatch;
    });
  }, [selectedCategories, highlight]);

  const sortedItems = useMemo(() => {
    const sorted = [...filteredItems];
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
  }, [filteredItems, sortOption]);

  return (
    <section className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="text-center mt-10 mb-8 px-4">
        <h2 className="text-3xl md:text-4xl font-[Playfair_Display] font-bold text-gray-900 relative inline-block">
          Resin KeyChains
          <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-28 h-1 
            bg-gradient-to-r from-[#C45A36] via-[#F7B77A] to-[#C45A36] rounded-full animate-pulse"></span>
        </h2>
        <p className="mt-3 text-gray-600 text-base italic max-w-sm mx-auto">
          Stylish resin keychains to accessorize and add a touch of elegance.
        </p>
      </div>

      {/* Mobile Filter Toggle */}
      {!isDesktop && (
        <div className="px-4 flex justify-between items-center mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-[#C45A36] text-white rounded-md font-medium"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 rounded-md text-sm px-2 py-1 focus:ring-[#C45A36] focus:border-[#C45A36]"
          >
            <option>Default sorting</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating</option>
          </select>
        </div>
      )}

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 mt-12 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Sidebar */}
        {(showFilters || isDesktop) && (
          <aside className="md:col-span-1 bg-white p-4 h-fit rounded-lg shadow">
            {/* Categories */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-3">Categories</h3>
              <ul className="space-y-2">
                {categories.map(cat => (
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

            {/* Highlight */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-3">Highlight</h3>
              <ul className="space-y-2">
                {highlightOptions.map(opt => (
                  <li
                    key={opt}
                    onClick={() => setHighlight(opt)}
                    className={`text-sm cursor-pointer ${highlight === opt ? "text-[#C45A36] font-semibold" : "text-gray-700"}`}
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}

        {/* Products */}
        <div className="md:col-span-4 flex flex-col gap-6">
          {/* Top Bar */}
          {isDesktop && (
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-600">Showing {sortedItems.length} results</p>
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
          )}

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <AnimatePresence>
              {sortedItems.map(item => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                  className="flex justify-center"
                >
                  <Link
                    to={`/keychaindetail/${item.id}`}
                    className="w-full max-w-[280px] sm:max-w-[320px] flex flex-col"
                  >
                    <div className="relative w-full h-[320px] sm:h-[360px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {item.discount && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="absolute top-2 right-2 bg-[#C45A36] text-white text-xs sm:text-sm font-semibold px-2 py-1 rounded-md shadow"
                        >
                          {item.discount}% OFF
                        </motion.span>
                      )}
                    </div>

                    <div className="mt-3 text-center">
                      <p className="text-lg sm:text-xl text-gray-900 font-playfair leading-snug">
                        {item.name}
                      </p>
                      <div className="mt-2 flex justify-center gap-2 items-baseline">
                        <span className="text-2xl text-[#C45A36] font-cinzel">₹{item.price}</span>
                        {item.discount && (
                          <span className="line-through text-gray-400 text-sm sm:text-base">
                            ₹{Math.round(item.price / (1 - item.discount / 100))}
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
