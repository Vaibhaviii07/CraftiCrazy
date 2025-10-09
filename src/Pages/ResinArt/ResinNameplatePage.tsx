// src/Pages/ResinArt/ResinNameplatePage.tsx
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { resinNameplates, ResinNameplate, Variant } from "../../Data/ResinNameplateData";
import { Link } from "react-router-dom";

export default function ResinNameplatePage() {
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
  const categories = [...new Set(resinNameplates.map(item => item.category))];

  const filteredItems = useMemo(() => {
    return resinNameplates.filter(item => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(item.category);

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
    <section className="min-h-screen relative bg-gray-50">
      {/* Hero */}
      <div className="text-center mt-10 mb-8 px-4">
        <h2 className="text-3xl md:text-4xl font-[Playfair_Display] font-bold text-gray-900 relative inline-block">
          Resin Nameplates
          <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-28 h-1 
            bg-gradient-to-r from-[#C45A36] via-[#F7B77A] to-[#C45A36] rounded-full animate-pulse"></span>
        </h2>
        <p className="mt-3 text-gray-600 text-base italic max-w-sm mx-auto">
          Personalized resin nameplates, crafted to add elegance and charm to your space.
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 mt-4 grid md:grid-cols-5 gap-6">
        {/* Sidebar */}
        <AnimatePresence>
          {(showFilters || isDesktop) && (
            <motion.aside
              initial={{ x: isDesktop ? 0 : -300, opacity: isDesktop ? 1 : 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: isDesktop ? 0 : -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="md:col-span-1 bg-white p-4 h-fit rounded-lg shadow mb-4 md:mb-0 z-50 relative"
            >
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-3">
                  Categories
                </h3>
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

              <div>
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-3">
                  Highlight
                </h3>
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

              {!isDesktop && (
                <button
                  onClick={() => setShowFilters(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              )}
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Product Cards */}
        <div className="md:col-span-4 flex flex-col gap-6 relative">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <AnimatePresence>
              {sortedItems.map(item => {
                const variant: Variant = item.variants?.[0] ?? {
                  image: item.image,
                  price: item.price,
                  discount: item.discount,
                };
                const [loaded, setLoaded] = useState(false); // lazy load state

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
                      to={`/nameplatedetail/${item.id}`}
                      className="w-full max-w-[280px] sm:max-w-[320px] flex flex-col"
                    >
                      <div className="relative w-full h-[280px] sm:h-[320px] lg:h-[360px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-2 sm:hover:-translate-y-3">
                        <motion.img
                          src={variant.image}
                          alt={item.name}
                          loading="lazy"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: loaded ? 1 : 0 }}
                          transition={{ duration: 0.5 }}
                          onLoad={() => setLoaded(true)}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
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

      {/* Mobile overlay */}
      {!isDesktop && showFilters && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setShowFilters(false)}
        />
      )}
    </section>
  );
}
