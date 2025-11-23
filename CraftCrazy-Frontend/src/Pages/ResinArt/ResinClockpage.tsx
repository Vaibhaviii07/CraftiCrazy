import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { resinClocks, ResinClock } from "../../Data/ResinWallClockdata";
import { Link } from "react-router-dom";
import { useCart } from "../../AuthContext/CartContext";
import { useAuth } from "../../AuthContext/AuthContext";
import { ToastContainer, toast } from "react-toastify";

export default function ResinClockPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [highlight, setHighlight] = useState("All");
  const [sortOption, setSortOption] = useState("Default sorting");

  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  // Add to Cart
  const handleAddToCart = (item: ResinClock) => {
    const token = localStorage.getItem("token");
    if (!token && !isAuthenticated) {
      return;
    }

    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    };

    addToCart(cartItem);
  };

  // Scroll to top (from HEAD)
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Category toggle
  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const highlightOptions = ["All", "Best Seller", "Discounted"];
  const categories = [...new Set(resinClocks.map((item) => item.category))];

  // Filters
  const filteredItems = resinClocks.filter((item: ResinClock) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(item.category);

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

  // Sorting
  const sortedItems = useMemo(() => {
    const sorted = [...filteredItems];
    switch (sortOption) {
      case "Price: Low to High":
        sorted.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "Price: High to Low":
        sorted.sort((a, b) => Number(b.price) - Number(a.price));
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
    <section className="min-h-screen bg-gray-50 pb-12">
      <ToastContainer />

      {/* Hero Section */}
      <div className="text-center mt-10 mb-8">
        <h2 className="text-3xl md:text-4xl font-[Playfair_Display] font-bold text-gray-900 relative inline-block">
          Resin Clocks
          <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-28 h-1 bg-gradient-to-r from-[#C45A36] via-[#F7B77A] to-[#C45A36] rounded-full animate-pulse"></span>
        </h2>
        <p className="mt-3 text-gray-600 text-base italic max-w-sm mx-auto">
          Elegant resin clocks to brighten up your space with style.
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

        {/* Product Grid */}
        <div className="md:col-span-4 flex flex-col gap-6">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
            <p className="text-sm text-gray-600">
              Showing {sortedItems.length} results
            </p>

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-300 rounded-md text-sm px-3 py-2 focus:ring-[#b46029] focus:border-[#b46029]"
            >
              <option>Default sorting</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating</option>
            </select>
          </div>

          {/* Products */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16">
            <AnimatePresence>
              {sortedItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                  className="flex justify-center"
                >
                  <div className="w-full max-w-[280px] sm:max-w-[320px] flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-2 sm:hover:-translate-y-3 overflow-hidden">
                    <Link to={`/clockdetail/${item.id}`} className="relative">
                      <motion.img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-[240px] sm:h-[320px] lg:h-[380px] object-cover transition-transform duration-500 hover:scale-105"
                      />

                      {item.discount && (
                        <motion.span
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                          className="absolute top-2 right-2 bg-[#b46029] text-white text-xs sm:text-sm font-semibold px-2 py-1 rounded-md shadow"
                        >
                          {item.discount}% OFF
                        </motion.span>
                      )}
                    </Link>

                    <div className="p-4 text-center flex flex-col flex-grow">
                      <p className="text-base sm:text-lg text-gray-900 font-playfair leading-snug">
                        {item.name}
                      </p>

                      {item.description && (
                        <p className="text-gray-500 text-xs sm:text-sm mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      )}

                      <div className="mt-2 flex justify-center gap-2 items-baseline">
                        <span className="text-lg sm:text-2xl text-[#b46029] font-cinzel">
                          ₹{item.price}
                        </span>

                        {item.discount && (
                          <span className="line-through text-gray-400 text-sm sm:text-lg ml-2">
                            ₹
                            {Math.round(
                              item.price / (1 - (item.discount || 0) / 100)
                            )}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleAddToCart(item)}
                        className="mt-auto bg-[#b46029] text-white text-sm sm:text-base px-4 py-2 rounded-md hover:bg-[#944d21] transition-all duration-300 mt-4"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
