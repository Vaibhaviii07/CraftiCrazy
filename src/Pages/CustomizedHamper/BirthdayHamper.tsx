// src/Pages/CustomizedHamper/BirthdayHamper.tsx
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayHampers, Variant } from "../../Data/BirthdayHampersdata";
import { Link } from "react-router-dom";

export default function BirthdayHamperPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("Default sorting");

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const categories = [...new Set(birthdayHampers.map((i) => i.category))];

  // Filtered Hampers
  const filteredHampers = useMemo(() => {
    return birthdayHampers.filter((item) => {
      return (
        selectedCategories.length === 0 ||
        selectedCategories.includes(item.category)
      );
    });
  }, [selectedCategories]);

   // Sorted Hampers
   const sortedHampers = useMemo(() => {
     const sorted = [...filteredHampers];
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
   }, [filteredHampers, sortOption]);
 

  return (
    <section className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div
        className="relative w-full h-[300px] sm:h-[400px] flex flex-col items-center justify-center text-center"
        style={{
          backgroundImage: "url('/birthdaybanner3.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <motion.h1
          className="relative text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-white mb-2 sm:mb-4 px-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Birthday Hampers
        </motion.h1>
        <motion.p
          className="relative text-gray-200 text-sm sm:text-lg max-w-md sm:max-w-2xl px-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover our most-loved, hand-picked gifts to make birthdays unforgettable!
        </motion.p>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-8 sm:mt-16 grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8">
        {/* Sidebar */}
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
                  <label htmlFor={cat} className="text-gray-700 text-sm cursor-pointer">
                    {cat}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Cards */}
        <div className="md:col-span-4 flex flex-col gap-6">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
            <p className="text-sm text-gray-600">
              Showing {sortedHampers.length} results
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
              {sortedHampers.map((item) => {
                const variant: Variant = item.variants?.[0] ?? {
                  image: item.image,
                  price: item.price,
                  discount: item.discount,
                };
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
                      to={`/birthdaydetail/${item.id}`}
                      className="w-full max-w-[280px] sm:max-w-[320px] flex flex-col"
                    >
                      <div className="relative w-full h-[240px] sm:h-[320px] lg:h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-2 sm:hover:-translate-y-3">
                        <img
                          src={variant.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
    </section>
  );
}
