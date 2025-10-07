// src/Pages/ResinFrames/ResinFramePage.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { resinFrames } from "../../Data/ResinFramedata";
import { Link } from "react-router-dom";

export default function ResinFramePage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [highlight, setHighlight] = useState("All");
  const [sortOption, setSortOption] = useState("Default sorting");

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const highlightOptions = ["All", "Best Seller", "Discounted"];
  const categories = [...new Set(resinFrames.map((i) => i.category))];

  // Filtering
  const filteredFrames = resinFrames.filter((item) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(item.category);

    let highlightMatch = true;
    switch (highlight) {
      case "Best Seller":
        highlightMatch = (item.rating ?? 0) >= 5;
        break;
      case "Discounted":
        highlightMatch = (item.discount ?? 0) > 0;
        break;
      default:
        highlightMatch = true;
    }
    return categoryMatch && highlightMatch;
  });

  // Sorting
 const sortedFrames = [...filteredFrames].sort((a, b) => {
  switch (sortOption) {
    case "Price: Low to High":
      return a.price - b.price;
    case "Price: High to Low":
      return b.price - a.price;
    case "Rating":
      return (b.rating || 0) - (a.rating || 0);
    default:
      return 0;
  }
});


  return (
    <section className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
     <div className="text-center mt-10 mb-8">
      <h2 className="text-3xl md:text-4xl font-[Playfair_Display] font-bold text-gray-900 relative inline-block">
        Resin Frame
        <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-28 h-1 bg-gradient-to-r from-[#C45A36] via-[#F7B77A] to-[#C45A36] rounded-full animate-pulse"></span>
      </h2>
      <p className="mt-3 text-gray-600 text-base italic max-w-sm mx-auto">
        Artistic resin frames that preserve memories with style and charm.  
      </p>
    </div>
      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-8 sm:mt-16 grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-1 bg-white p-4 rounded-lg h-fit shadow mb-6 md:mb-0">
          {/* Categories */}
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
                    className="h-4 w-4 text-[#b46029] border-gray-300 rounded"
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

          {/* Highlight */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-3">
              Highlight
            </h3>
            <ul className="space-y-2">
              {highlightOptions.map((opt) => (
                <li
                  key={opt}
                  onClick={() => setHighlight(opt)}
                  className={`text-sm cursor-pointer ${
                    highlight === opt
                      ? "text-[#b46029] font-semibold"
                      : "text-gray-700"
                  }`}
                >
                  {opt}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="md:col-span-4 flex flex-col gap-6">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
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

          {/* Product Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16">
            <AnimatePresence>
              {sortedFrames.map((item) => (
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
                    <div className="relative w-full h-[240px] sm:h-[320px] lg:h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-2 sm:hover:-translate-y-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                          ₹{item.price}
                        </span>
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
