import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../AuthContext/CartContext";
import { newArrivalsData } from "../Data/NewArrivalsData";
import { Plus, Minus, ShoppingCart } from "lucide-react";

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

  const handleQuantity = (item: any, type: "inc" | "dec") => {
    setCartQuantities((prev) => {
      const current = prev[item.id] || 1;
      const updated = type === "inc" ? current + 1 : Math.max(current - 1, 1);
      return { ...prev, [item.id]: updated };
    });
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
      {/* =================== Best Sellers Section (UNCHANGED) =================== */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-[Playfair_Display] font-bold text-gray-900">
          Best Sellers
        </h2>
        <p className="mt-2 text-gray-600 text-lg italic">Discover our most-loved creations</p>
      </div>
      <section className="py-12 px-6 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { id: 1, type: "image", image: "/Diya3.jpg" },
            { id: 2, type: "text", title: "Elegant Table Essentials", heading: "HANDCRAFTED COASTER", button: "Add to Cart", price: 299 },
            { id: 3, type: "image", image: "/ResinPoojaThali.jpeg" },
            { id: 4, type: "text", title: "Beautiful & Elegant", heading: "Candles", button: "Add to Cart", price: 399 },
            { id: 5, type: "image", image: "/Coaster.jpeg" },
            { id: 6, type: "text", title: "Traditional Craft for Your Rituals", heading: "POOJA THALE", button: "Add to Cart", price: 599 },
          ].map((item) =>
            item.type === "image" ? (
              <div key={item.id} className="overflow-hidden">
                <img
                  src={item.image}
                  alt="product"
                  className="w-full h-64 object-cover md:h-72 lg:h-90"
                />
              </div>
            ) : (
              <div key={item.id} className="flex flex-col justify-center items-center bg-white text-center p-6">
                <p className="text-gray-600 text-base italic">{item.title}</p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mt-2">{item.heading}</h3>
                <p className="mt-1 text-gray-700 text-sm">₹{item.price}</p>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="mt-4 px-5 py-2 bg-[#C45A36] text-white text-sm font-medium"
                >
                  {item.button}
                </button>
              </div>
            )
          )}
        </div>
      </section>

      {/* =================== New Arrivals / Product Grid =================== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-9 mt-12">
        {/* Sidebar */}
        <aside className="md:col-span-1 relative">
          <div className="md:hidden flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-[#C45A36]">
              <motion.span animate={{ rotate: sidebarOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="inline-block text-xl">❯</motion.span>
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
        <div className="md:col-span-3 mb-9">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
            <p className="text-sm text-gray-600">Showing {sortedProducts.length} results</p>
            <div className="flex items-center gap-2">
              <label htmlFor="sorting" className="text-sm font-medium text-gray-700">Sort:</label>
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

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {loaded
                ? sortedProducts.map((item, index) => (
                    <motion.div key={item.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="group flex flex-col bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition"
                    >
                      <div className="relative w-full h-44 sm:h-56">
                        {!imagesLoaded[index] && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                            <div className="w-8 h-8 border-4 border-t-[#C45A36] border-b-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                        <img src={item.image} alt={item.name} className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imagesLoaded[index] ? "opacity-100" : "opacity-0"}`} onLoad={() => handleImageLoad(index)} />
                        {item.discount && <span className="absolute top-2 right-2 bg-[#C45A36] text-white text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-full shadow">{item.discount} OFF</span>}
                      </div>

                      <div className="p-3 flex flex-col flex-1">
                        <p className="text-xs sm:text-sm font-medium text-gray-800 truncate">{item.name}</p>
                        <div className="mt-1 flex items-center gap-2">
                          {item.oldPrice && <span className="text-gray-400 text-[11px] sm:text-xs line-through">₹{item.oldPrice}</span>}
                          <span className="text-sm sm:text-base font-semibold text-[#C45A36]">₹{item.price}</span>
                        </div>

                        {cartQuantities[item.id] ? (
                          <div className="flex items-center justify-center gap-2 mt-2 sm:mt-3">
                            <button onClick={() => handleQuantity(item, "dec")} className="px-2 py-1 bg-gray-200 rounded"><Minus size={16} /></button>
                            <span className="font-medium">{cartQuantities[item.id]}</span>
                            <button onClick={() => handleQuantity(item, "inc")} className="px-2 py-1 bg-gray-200 rounded"><Plus size={16} /></button>
                          </div>
                        ) : (
                          <button onClick={() => handleAddToCart(item)} className="mt-2 sm:mt-3 bg-[#C45A36] hover:bg-[#8c341f] text-white text-[11px] sm:text-sm px-3 py-1.5 rounded-md flex items-center justify-center gap-1">
                            <ShoppingCart size={16} /> Add to Cart
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))
                : Array(8).fill(0).map((_, i) => <div key={i} className="animate-pulse bg-gray-200 rounded-xl h-52 sm:h-60"></div>)}
            </AnimatePresence>
          </div>
        </div>
      </div>

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
