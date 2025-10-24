// src/Pages/CustomizedHamper/CorporateHamper.tsx
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { corporateHampers as staticCorporateHampers, CorporateHamper as StaticCorporateHamper } from "../../Data/CorporateData";
import { Link } from "react-router-dom";

export default function CorporateHamperPage() {
  const [corporateHampers, setCorporateHampers] = useState<StaticCorporateHamper[]>(staticCorporateHampers);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [highlight, setHighlight] = useState("All");
  const [sortOption, setSortOption] = useState("Default sorting");
  const [loading, setLoading] = useState(true);

  // Fetch Corporate Hampers from backend
  useEffect(() => {
    const fetchHampers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/corporatehampers");
        if (!res.ok) throw new Error(`API fetch failed: ${res.statusText}`);
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          const apiMapped: StaticCorporateHamper[] = data.map((item: any) => ({
            id: item._id || item.id,
            sku: item.sku || `SKU-${item._id || item.id}`,
            name: item.name,
            description: item.description,
            price: item.price,
            rating: item.rating,
            discount: item.discount,
            category: item.category,
            image: item.image,
            inStock: item.inStock ?? true,
          }));
          setCorporateHampers(apiMapped);
        } else {
          console.warn("API returned empty data, using static fallback.");
        }
      } catch (err: any) {
        console.error("CorporateHampers API fetch failed:", err.message);
        console.log("Using static data fallback...");
      } finally {
        setLoading(false);
      }
    };

    fetchHampers();
  }, []);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const highlightOptions = ["All", "Best Seller", "Discounted"];
  const categories = [...new Set(corporateHampers.map((i) => i.category))];

  // Filtered items
  const filteredItems = useMemo(() => {
    return corporateHampers.filter((item) => {
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
    });
  }, [corporateHampers, selectedCategories, highlight]);

  // Sorted items
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
    <section className="min-h-screen">
      {/* Hero */}
      <div className="text-center mt-10 mb-8">
        <h2 className="text-3xl md:text-4xl font-[Playfair_Display] font-bold text-gray-900 relative inline-block">
          Corporate Hampers
          <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-24 h-1 bg-gradient-to-r from-[#C45A36] via-[#F7B77A] to-[#C45A36] rounded-full animate-pulse"></span>
        </h2>
        <p className="mt-3 text-gray-600 text-sm sm:text-base italic max-w-sm mx-auto">
          Elegant hampers perfect for gifting and corporate occasions.
        </p>
      </div>

      {/* Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-6 sm:mt-12 grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-1 bg-white p-4 rounded-lg h-fit shadow mb-6 md:mb-0">
          {/* Categories */}
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
              {highlightOptions.map((opt) => (
                <li
                  key={opt}
                  onClick={() => setHighlight(opt)}
                  className={`text-sm cursor-pointer ${
                    highlight === opt ? "text-[#b46029] font-semibold" : "text-gray-700"
                  }`}
                >
                  {opt}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Products */}
        <div className="md:col-span-4 flex flex-col gap-4">
          {/* Top bar */}
          {!loading && (
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
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

          {/* Cards / Loader */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-[#C45A36] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
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
                    <Link
                      to={`/corporatedetail/${item.id}`}
                      className="w-full max-w-[280px] sm:max-w-[320px] flex flex-col"
                    >
                      <div className="relative w-full h-[220px] sm:h-[280px] md:h-[320px] lg:h-[360px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-2 sm:hover:-translate-y-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
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

                      <div className="mt-2 sm:mt-3 text-center px-1 sm:px-0">
                        <p className="text-sm sm:text-lg text-gray-900 font-playfair leading-snug">{item.name}</p>
                        {item.description && (
                          <p className="text-gray-500 text-xs sm:text-sm mt-1 line-clamp-2">{item.description}</p>
                        )}
                        <div className="mt-1 sm:mt-2 flex justify-center gap-1 sm:gap-2 items-baseline">
                          <span className="text-lg sm:text-2xl text-[#C45A36] font-cinzel">₹{item.price}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
