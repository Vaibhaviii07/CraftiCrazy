import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import { birthdayHampers } from "../../Data/BirthdayHampersdata";
import { Link } from "react-router-dom";

export default function BirthdayHamper() {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [highlight, setHighlight] = useState("All");
  const [sortOption, setSortOption] = useState("Default sorting");

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // Sidebar filter options
  const highlightOptions = ["All", "Best Seller", "Discounted"];
  const categories = [...new Set(birthdayHampers.map((item) => item.category))];

  // Filtering logic
  let filteredHampers = birthdayHampers.filter((item) => {
    const categoryMatch =
      selectedCategories.length === 0 || selectedCategories.includes(item.category);

    let highlightMatch = true;
    switch (highlight) {
      case "Best Seller":
        highlightMatch = item.popularity && item.popularity > 80;
        break;
      case "Discounted":
        highlightMatch = item.discount && item.discount > 0;
        break;
      default:
        highlightMatch = true;
    }

    return categoryMatch && highlightMatch;
  });

  // Sorting logic
  const sortedHampers = [...filteredHampers].sort((a, b) => {
    switch (sortOption) {
      case "Price: Low to High":
        return parseInt(a.price.replace(/[₹,]/g, "")) - parseInt(b.price.replace(/[₹,]/g, ""));
      case "Price: High to Low":
        return parseInt(b.price.replace(/[₹,]/g, "")) - parseInt(a.price.replace(/[₹,]/g, ""));
      case "Rating":
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  return (
    <div className="bg-gray-50 ">
      {/* Hero Section */}
      <div
        className="relative w-full h-[400px] flex flex-col items-center justify-center text-center"
        style={{
          backgroundImage: "url('/birthdaybanner3.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <motion.h1
          className="relative text-4xl md:text-5xl font-serif font-semibold text-white mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "tween" }}
        >
          Birthday Hampers
        </motion.h1>

        <motion.p
          className="relative text-gray-200 text-lg max-w-2xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover our most-loved, hand-picked gifts to make birthdays unforgettable!
        </motion.p>
      </div>

      {/* Main Grid with Filters */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 mt-16 grid grid-cols-1 md:grid-cols-5 gap-8 ">
        {/* Left Sidebar */}
        <aside className="md:col-span-1 bg-white p-4 h-[350px] rounded-lg shadow mt-2">
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
                  <label htmlFor={cat} className="text-gray-700 text-sm cursor-pointer">
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
                    highlight === opt ? "text-[#b46029] font-semibold" : "text-gray-700"
                  }`}
                >
                  {opt}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Products + Right Filter */}
        <div className="md:col-span-4 flex flex-col gap-6">
          {/* Top Filter + Sorting */}
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm text-gray-600">
              Showing {sortedHampers.length} results
            </p>
            <div className="flex items-center gap-2">
              <label htmlFor="sorting" className="text-sm font-medium text-gray-700">
                Sort:
              </label>
              <select
                id="sorting"
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
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
            <AnimatePresence>
              {sortedHampers.map((hamper) => (
                <motion.div
                  key={hamper.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.5 }}
                  className="group flex justify-center"
                >
                  <Link to="#" className="w-full max-w-[360px] flex flex-col">
                    <div className="relative w-full h-[420px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-3">
                      <img
                        src={hamper.image}
                        alt={hamper.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {hamper.discount && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="absolute top-4 right-4 bg-[#b46029] text-white text-sm font-semibold px-3 py-1 rounded-md shadow"
                        >
                          {hamper.discount}% OFF
                        </motion.span>
                      )}

                      <button
                        onClick={() => toggleWishlist(hamper.id)}
                        className="absolute top-4 left-4 bg-white rounded-full p-2 shadow hover:scale-110 transition"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            wishlist.includes(hamper.id)
                              ? "text-red-500 fill-red-500"
                              : "text-gray-400"
                          }`}
                        />
                      </button>

                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ scale: 1.05 }}
                        className="absolute bottom-4 right-4 opacity-100"
                      >
                        <ShoppingCart className="w-5 h-5 inline-block mr-1" />
                        <span>Add</span>
                      </motion.div>
                    </div>

                    <div className="mt-4 text-center">
                      <p className="text-xl text-gray-900 font-playfair leading-snug">
                        {hamper.name}
                      </p>
                      {hamper.description && (
                        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                          {hamper.description}
                        </p>
                      )}
                      <div className="mt-2 flex justify-center gap-3 items-baseline">
                        <span className="text-2xl text-[#b46029] font-cinzel">
                          {hamper.price}
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
    </div>
  );
}
