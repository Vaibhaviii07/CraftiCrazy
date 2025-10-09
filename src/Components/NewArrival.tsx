import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../AuthContext/CartContext";
import { newArrivalsData } from "../Data/NewArrivalsData";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  const [loaded, setLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: number]: boolean }>({});
  const [toast, setToast] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [highlight, setHighlight] = useState("All Products");
  const [sortOption, setSortOption] = useState("Default sorting");
  const [cartQuantities, setCartQuantities] = useState<{ [key: number]: number }>({});
  const { addToCart } = useCart();

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = (index: number) => {
    setImagesLoaded((prev) => ({ ...prev, [index]: true }));
  };

  const handleAddToCart = (item: any) => {
    const currentQty = cartQuantities[item.id] || 0;
    const newQty = currentQty + 1;

    setCartQuantities((prev) => ({ ...prev, [item.id]: newQty }));

    addToCart({
      id: item.id,
      name: item.name || item.heading,
      image: item.image || "/placeholder.png",
      price: item.price || 499,
      quantity: 1,
    });

    setToast(`${item.name || item.heading} added to cart`);
    setTimeout(() => setToast(null), 2500);
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const categories = [...new Set(newArrivalsData.freshPicks.map((i) => i.type))];
  const highlightOptions = ["All Products", "Best Seller", "New Arrivals", "Sale", "Hot Items"];

  const filteredProducts = newArrivalsData.freshPicks.filter((item) => {
    const categoryMatch =
      selectedCategories.length === 0 || selectedCategories.includes(item.type);

    let highlightMatch = true;
    switch (highlight) {
      case "Sale":
        highlightMatch = item.discount > 15;
        break;
      case "Best Seller":
        highlightMatch = item.price > 800;
        break;
      case "Hot Items":
        highlightMatch = item.price < 500;
        break;
      default:
        highlightMatch = true;
    }

    return categoryMatch && highlightMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "Sort by popularity":
        return (b.popularity || 0) - (a.popularity || 0);
      case "Sort by average rating":
        return (b.rating || 0) - (a.rating || 0);
      case "Sort by latest":
        return new Date(b.date || "").getTime() - new Date(a.date || "").getTime();
      case "Sort by price: low to high":
        return a.price - b.price;
      case "Sort by price: high to low":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const SidebarContent = () => (
    <>
      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-3">
          Filter By Categories
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
              <label htmlFor={cat} className="text-gray-700 text-sm cursor-pointer">
                {cat}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Highlight Filter */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-3">Highlight</h3>
        <ul className="space-y-2">
          {highlightOptions.map((opt) => (
            <li
              key={opt}
              onClick={() => setHighlight(opt)}
              className={`text-sm cursor-pointer ${
                highlight === opt ? "text-[#C45A36] font-semibold" : "text-gray-700"
              }`}
            >
              {opt}
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  return (
    <section className="mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* BEST SELLER SECTION */}
      <div className="text-center mb-">
        <h2 className="text-3xl md:text-4xl font-[Playfair_Display] font-bold text-gray-900">
          Best Sellers
        </h2>
        <p className="mt-2 text-gray-600 text-lg italic">
          Discover our most-loved creations
        </p>
      </div>

      {/* Best Sellers Grid */}
      <section className="py-12 px-6 sm:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[{ id: 2, type: "text", title: "Elegant Table Essentials", heading: "HANDCRAFTED COASTER", button: "Shop Now", price: 299, link: "/resincoasters" },
            { id: 4, type: "text", title: "Beautiful & Elegant", heading: "Candles", button: "Shop Now", price: 399, link: "/diwali" },
            { id: 6, type: "text", title: "Traditional Craft for Your Rituals", heading: "POOJA THALE", button: "Shop Now", price: 599, link: "/resinthale" }].map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-center items-center bg-white text-center p-6 shadow-md w-full aspect-[1/1.1]"
            >
              <p className="text-gray-600 text-base italic">{item.title}</p>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mt-2">{item.heading}</h3>
              <p className="mt-1 text-gray-700 text-sm">₹{item.price}</p>
              <Link
                to={item.link}
                className="mt-4 px-5 py-2 bg-[#C45A36] hover:bg-[#8c341f] text-white text-sm font-medium rounded-md transition-all duration-300"
              >
                {item.button}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        {/* Sidebar */}
        <aside className="md:col-span-1 relative">
          <div className="md:hidden flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-[#C45A36]">
              <motion.span
                animate={{ rotate: sidebarOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="inline-block text-xl"
              >
                ❯
              </motion.span>
            </button>
          </div>
          <div className="hidden md:block bg-white p-4 rounded-lg shadow">
            <SidebarContent />
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSidebarOpen(false)}
                  className="fixed inset-0 bg-black z-40 md:hidden"
                />
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "tween", duration: 0.3 }}
                  className="fixed top-0 left-0 z-50 w-64 h-full bg-white p-4 shadow-lg md:hidden"
                >
                  <SidebarContent />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </aside>

        {/* Product Grid */}
        <div className="md:col-span-3">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-2 ml-4">
            <p className="text-sm text-gray-600">Showing {sortedProducts.length} results</p>
            <div className="flex items-center gap-2">
              <label htmlFor="sorting" className="text-sm font-medium text-gray-700">
                Sort:
              </label>
              <select
                id="sorting"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border border-gray-300 rounded-md text-sm px-3 py-2 focus:ring-[#C45A36] focus:border-[#C45A36]"
              >
                <option>Default sorting</option>
                <option>Sort by popularity</option>
                <option>Sort by average rating</option>
                <option>Sort by latest</option>
                <option>Sort by price: low to high</option>
                <option>Sort by price: high to low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 mb-9 lg:grid-cols-3 ml-5 gap-6">
            <AnimatePresence>
              {loaded
                ? sortedProducts.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                      className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg overflow-hidden flex flex-col transition-all duration-300"
                    >
                      <div className="w-full aspect-[1.3/1] bg-gray-100 relative overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className={`w-full h-full object-cover transition-opacity duration-500 ${
                            imagesLoaded[index] ? "opacity-100" : "opacity-0"
                          }`}
                          onLoad={() => handleImageLoad(index)}
                        />
                      </div>

                      <div className="p-3 sm:p-4 text-center flex flex-col flex-1 justify-between">
                        <h3 className="text-gray-800 font-semibold text-sm sm:text-base mb-1 truncate">
                          {item.name}
                        </h3>
                        <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 mb-2">
                          {item.description || "Beautiful handmade creation"}
                        </p>
                        <span className="text-[#C45A36] font-semibold text-sm sm:text-base mb-2">
                          ₹{item.price}
                        </span>

                        <button
                          onClick={() => handleAddToCart(item)}
                          className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition ${
                            cartQuantities[item.id]
                              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                              : "bg-[#C45A36] text-white hover:bg-[#8c341f]"
                          }`}
                          disabled={!!cartQuantities[item.id]}
                        >
                          {cartQuantities[item.id] ? "Added" : "Add"}
                        </button>
                      </div>
                    </motion.div>
                  ))
                : // Shimmer Loader
                  Array(6)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="w-full bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col"
                      >
                        <div className="relative w-full aspect-[1.3/1] bg-gray-200 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                          <div className="h-3 bg-gray-200 rounded mb-2 animate-pulse w-5/6"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                          <div className="h-8 mt-3 bg-gray-200 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#E8D4B7] text-black px-6 py-3 rounded-lg shadow-lg text-sm sm:text-base"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default NewArrivals;
