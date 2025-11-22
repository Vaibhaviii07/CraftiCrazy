// src/Pages/Accessories/KeyChainPage.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { keyChains,KeyChain } from "../../Data/KeyChainData";
import { Link } from "react-router-dom";

export default function KeyChainPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [highlight, setHighlight] = useState("All");
  const [sortOption, setSortOption] = useState("Default sorting");
  const [loading, setLoading] = useState(true);
  const [allProducts,setAllProducts]= useState<KeyChain[]>(keyChains);

  
     // Fetch API data and merge
      useEffect(() => {
        async function fetchData() {
          try {
            const res = await fetch("http://localhost:8000/api/products?category=keychains");
            const apiData: KeyChain[] = await res.json();
            
            // Merge: API data first, keep local data that API doesn't have
            const merged = [
              ...apiData,
              ...keyChains.filter(
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
  

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // simulate loading
    return () => clearTimeout(timer);
  }, []);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const highlightOptions = ["All", "Best Seller", "Discounted"];
  const categories = [...new Set(allProducts.map((i) => i.category))];

  const filteredKeyChains = allProducts.filter((item) => {
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

  const sortedKeyChains = [...filteredKeyChains].sort((a, b) => {
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
    <section className="min-h-screen">
      <div className="text-center mt-10 mb-8">
        <h2 className="text-3xl md:text-4xl font-[Playfair_Display] font-bold text-gray-900 relative inline-block">
          KeyChains
          <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-28 h-1 bg-gradient-to-r from-[#C45A36] via-[#F7B77A] to-[#C45A36] rounded-full animate-pulse"></span>
        </h2>
        <p className="mt-3 text-gray-600 text-base italic max-w-sm mx-auto">
          Handcrafted creations made with care and style.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-8 sm:mt-16 grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8">
        <aside className="md:col-span-1 bg-white p-4 rounded-lg h-fit shadow mb-6 md:mb-0">
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

        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
            <p className="text-sm text-gray-600">
              Showing {sortedKeyChains.length} results
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

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16">
            <AnimatePresence>
              {loading
                ?
                  Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex justify-center"
                    >
                      <div className="w-full max-w-[330px] bg-gray-200 animate-pulse rounded-2xl h-[320px] sm:h-[360px]"></div>
                    </motion.div>
                  ))
                : 
                  sortedKeyChains.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.4 }}
                      className="flex justify-center"
                    >
                      <Link
                        to={`/keydetail/${item.id}`}
                        className="w-full max-w-[330px] flex flex-col"
                      >
                        <div className="relative w-full h-[280px] sm:h-[320px] lg:h-[380px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-2 sm:hover:-translate-y-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            loading="lazy"
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
