// src/Pages/Bracelets/BraceletPage.tsx
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { bracelets, Bracelet } from "../../Data/BraceletData";
import { Link } from "react-router-dom";

export default function BraceletPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [highlight, setHighlight] = useState("All");
  const [sortOption, setSortOption] = useState("Default sorting");

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const highlightOptions = ["All", "Best Seller", "Discounted"];
  const categories = [...new Set(bracelets.map(item => item.category))];

  const filteredItems = useMemo(() => {
    return bracelets.filter((item: Bracelet) => {
      const categoryMatch =
        selectedCategories.length === 0 || selectedCategories.includes(item.category);

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
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }
    return sorted;
  }, [filteredItems, sortOption]);

  return (
    <div className=" min-h-screen">
      {/* Page Header */}
      <div className="text-center mt-10 mb-8">
        <h2 className="text-3xl md:text-4xl font-[Playfair_Display] font-bold text-gray-900 relative inline-block">
          Bracelets
          <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-28 h-1 bg-gradient-to-r from-[#C45A36] via-[#F7B77A] to-[#C45A36] rounded-full animate-pulse"></span>
        </h2>
        <p className="mt-3 text-gray-600 text-lg italic max-w-md mx-auto">
          Discover our most-loved creations, handcrafted with care and style.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col md:flex-row gap-10">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 bg-white p-5 rounded-xl shadow-md sticky top-6 h-fit">
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
                    className="h-4 w-4 text-[#b46029] border-gray-300 rounded"
                  />
                  <label htmlFor={cat} className="text-gray-700 text-sm cursor-pointer">{cat}</label>
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
                  className={`text-sm cursor-pointer transition-colors duration-300 ${
                    highlight === opt ? "text-[#b46029] font-semibold" : "text-gray-700 hover:text-[#b46029]"
                  }`}
                >
                  {opt}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-600">Showing {sortedItems.length} results</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {sortedItems.map(item => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.5 }}
                  className="group flex justify-center"
                >
                  <Link to={`/braceletdetail/${item.id}`} className="w-full max-w-[360px] flex flex-col">
                    <div className="relative w-full h-[280px] sm:h-[320px] lg:h-[380px] rounded-3xl overflow-hidden hover:shadow-2xl transition-shadow duration-500 hover:-translate-y-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {item.discount && (
                        <span className="absolute top-3 right-3 bg-[#b46029] text-white font-semibold px-2 py-1 rounded-md text-sm shadow-sm">
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
                        <span className="text-2xl text-[#b46029] font-cinzel">₹{item.price}</span>
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
    </div>
  );
}
