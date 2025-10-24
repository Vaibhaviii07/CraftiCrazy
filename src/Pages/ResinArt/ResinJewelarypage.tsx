// src/Pages/ResinArt/ResinJewelryPage.tsx
import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { resinJewelry, ResinJewelry } from "../../Data/ResinJewelryData";

export default function ResinJewelryPage() {
  const [items, setItems] = useState<ResinJewelry[]>(resinJewelry); // fallback
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [highlight, setHighlight] = useState("All");
  const [sortOption, setSortOption] = useState("Default sorting");
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    const fetchJewelry = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/resinjewelry");
        if (!res.ok) throw new Error(`API fetch failed: ${res.statusText}`);
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          const mapped: ResinJewelry[] = data.map((item: any) => ({
            id: item._id || item.id,
             sku: item.sku || `SKU-${item._id || item.id}`,
            name: item.name,
            description: item.description,
            price: item.price,
            rating: item.rating ?? 0,
            discount: item.discount ?? 0,
            category: item.category,
            highlight: item.highlight ?? "Normal",
            image: item.image,
            inStock: item.inStock ?? true,
          }));
          setItems(mapped);
        }
      } catch (err: any) {
        console.error("Resin Jewelry API fetch failed:", err.message);
        console.log("Using static fallback...");
      } finally {
        setLoading(false);
      }
    };

    fetchJewelry();
  }, []);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const highlightOptions = ["All", "Best Seller", "Discounted"];
  const categories = [...new Set(items.map((i) => i.category))];

  // Filtered items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
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
  }, [items, selectedCategories, highlight]);

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

  // Child Card Component
  const ResinJewelryCard = ({ item }: { item: ResinJewelry }) => {
    const [loaded, setLoaded] = useState(false);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4 }}
        className="flex justify-center"
      >
        <Link
          to={`/jewelarydetail/${item.id}`}
          className="w-full max-w-[330px] flex flex-col"
        >
          <div className="relative w-full h-[360px] sm:h-[400px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1">
            <motion.img
              src={item.image}
              alt={item.name}
              loading="lazy"
              initial={{ opacity: 0 }}
              animate={{ opacity: loaded ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              onLoad={() => setLoaded(true)}
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
              {item.discount && (
                <span className="line-through text-gray-400 text-sm sm:text-lg ml-1">
                  ₹{Math.round(item.price / (1 - item.discount / 100))}
                </span>
              )}
            </div>
          </div>
        </Link>
      </motion.div>
    );
  };

  return (
    <section className="min-h-screen">
      {/* Hero Section */}
      <div className="text-center mt-10 mb-8 px-4">
        <h2 className="text-3xl md:text-4xl font-[Playfair_Display] font-bold text-gray-900 relative inline-block">
          Resin Jewelry
          <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-28 h-1 
            bg-gradient-to-r from-[#C45A36] via-[#F7B77A] to-[#C45A36] rounded-full animate-pulse"></span>
        </h2>
        <p className="mt-3 text-gray-600 text-base italic max-w-sm mx-auto">
          Handcrafted resin jewelry pieces designed to add elegance and charm to your style.
        </p>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-8 grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Sidebar */}
        <aside className="md:col-span-1 bg-white p-4 rounded-lg shadow h-fit mb-6 md:mb-0">
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
                    className="h-4 w-4 text-[#C45A36] border-gray-300 rounded"
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
                  className={`text-sm cursor-pointer ${highlight === opt ? "text-[#C45A36] font-semibold" : "text-gray-700 hover:text-[#C45A36]"}`}
                >
                  {opt}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Products */}
        <div className="md:col-span-4 flex flex-col gap-6">
          {!loading && (
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

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-[#C45A36] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              <AnimatePresence>
                {sortedItems.map((item) => (
                  <ResinJewelryCard key={item.id} item={item} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
