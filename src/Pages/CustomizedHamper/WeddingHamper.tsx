// src/Pages/CustomizedHamper/WeddingHamperPage.tsx
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingHampers as staticWeddingHampers, WeddingHamper } from "../../Data/WeddingData";
import { Link } from "react-router-dom";

export default function WeddingHamperPage() {
  const [products, setProducts] = useState<WeddingHamper[]>(staticWeddingHampers);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [highlight, setHighlight] = useState("All");
  const [sortOption, setSortOption] = useState("Default sorting");
  const [loading, setLoading] = useState(true);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/weddinghampers");
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((item: any) => ({
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
          setProducts(mapped);
        }
      } catch (err) {
        console.error("Fetch failed, using static data fallback", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const highlightOptions = ["All", "Best Seller", "Discounted"];
  const categories = [...new Set(products.map((p) => p.category))];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(p.category);
      let highlightMatch = true;
      if (highlight === "Best Seller") highlightMatch = (p.rating ?? 0) >= 4.5;
      if (highlight === "Discounted") highlightMatch = (p.discount ?? 0) > 0;
      return categoryMatch && highlightMatch;
    });
  }, [products, selectedCategories, highlight]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    if (sortOption === "Price: Low to High") sorted.sort((a, b) => a.price - b.price);
    if (sortOption === "Price: High to Low") sorted.sort((a, b) => b.price - a.price);
    if (sortOption === "Rating") sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    return sorted;
  }, [filteredProducts, sortOption]);

  // Single Card Component
  const ProductCard: React.FC<{ item: WeddingHamper }> = ({ item }) => {
    const [loaded, setLoaded] = useState(false);
    const finalPrice = item.discount ? Math.round(item.price * (1 - item.discount / 100)) : item.price;

    return (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4 }}
        className="flex justify-center"
      >
        <Link to={`/weddingDetail/${item.id}`} className="w-full max-w-[280px] sm:max-w-[320px] flex flex-col">
          <div className="relative w-full h-[240px] sm:h-[320px] lg:h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-2 sm:hover:-translate-y-3">
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
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
              <span className="text-lg sm:text-2xl text-[#C45A36] font-cinzel">₹{finalPrice}</span>
              {item.discount && (
                <span className="line-through text-gray-400 text-sm sm:text-lg ml-2">₹{item.price}</span>
              )}
            </div>
          </div>
        </Link>
      </motion.div>
    );
  };

  return (
    <section className="min-h-screen">
      {/* Hero */}
      <div className="text-center mt-10 mb-8">
        <h2 className="text-3xl md:text-4xl font-[Playfair_Display] font-bold text-gray-900 relative inline-block">
          Wedding Hampers
          <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-28 h-1 bg-gradient-to-r from-[#C45A36] via-[#F7B77A] to-[#C45A36] rounded-full animate-pulse"></span>
        </h2>
        <p className="mt-3 text-gray-600 text-sm sm:text-base italic max-w-sm mx-auto">
          Exquisite hampers designed to celebrate love and togetherness.
        </p>
      </div>

      {/* Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-6 sm:mt-12 grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-1 bg-white p-4 rounded-lg h-fit shadow mb-6 md:mb-0">
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

          <div>
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-3">Highlight</h3>
            <ul className="space-y-2">
              {highlightOptions.map((opt) => (
                <li
                  key={opt}
                  onClick={() => setHighlight(opt)}
                  className={`text-sm cursor-pointer ${highlight === opt ? "text-[#b46029] font-semibold" : "text-gray-700"}`}
                >
                  {opt}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Products */}
        <div className="md:col-span-4 flex flex-col gap-4">
          {!loading && (
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
              <p className="text-sm text-gray-600">Showing {sortedProducts.length} results</p>
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
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
              <AnimatePresence>
                {sortedProducts.map((item) => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
