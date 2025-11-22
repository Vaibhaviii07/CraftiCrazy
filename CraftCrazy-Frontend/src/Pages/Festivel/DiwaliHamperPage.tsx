import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { diwaliHampers, DiwaliHamper } from "../../Data/DiwaliHamperdata";
import { Link } from "react-router-dom";

export default function DiwaliHamperPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [highlight, setHighlight] = useState("All");
  const [sortOption, setSortOption] = useState("Default sorting");
  const [allProducts, setAllProducts] = useState<DiwaliHamper[]>(diwaliHampers);

  // Fetch API and merge with local data
  useEffect(() => {
    async function fetchData() {
      try {
        const url = `http://localhost:8000/api/products?category=${encodeURIComponent(
          "Diwali Hampers"
        )}`;

        const res = await fetch(url);
        const apiResponse = await res.json();
        console.log(apiResponse);

        const apiData: DiwaliHamper[] = apiResponse.map((item: any) => ({
          ...item,
          id: item._id,
          image: item.imageUrl,
          price: Number(item.price),
          rating: Number(item.rating),
          discount: Number(item.discount),
        }));

        const merged = [
          ...apiData,
          ...diwaliHampers.filter((local) => !apiData.some((api) => api.id === local.id)),
        ];


        console.log(`merged data ${merged}`);

        setAllProducts(merged);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    }

    fetchData();
  }, []);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const highlightOptions = ["All", "Best Seller", "Discounted"];
  const categories = [...new Set(allProducts.map((item) => item.category))];

  const filteredItems = useMemo(() => {
    return allProducts.filter((item) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(item.category);

      let highlightMatch = true;

      if (highlight === "Best Seller") {
        const lowerHighlight = (item.highlight || "").toLowerCase();
        const hasBestTag =
          item.tags?.some((tag) => tag.toLowerCase().includes("best")) ?? false;
        highlightMatch = lowerHighlight.includes("best") || hasBestTag;
      } else if (highlight === "Discounted") {
        highlightMatch = (item.discount ?? 0) > 0;
      }

      return categoryMatch && highlightMatch;
    });
  }, [highlight, selectedCategories, allProducts]); // <-- FIXED

  const sortedItems = useMemo(() => {
    const items = [...filteredItems];
    switch (sortOption) {
      case "Price: Low to High":
        return items.sort((a, b) => a.price - b.price);
      case "Price: High to Low":
        return items.sort((a, b) => b.price - a.price);
      case "Rating":
        return items.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      default:
        return items;
    }
  }, [filteredItems, sortOption]);

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="text-center mt-10 mb-8 px-4">
        <h2 className="text-3xl md:text-4xl font-[Playfair_Display] font-bold text-gray-900 relative inline-block">
          Diwali Hampers
          <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-28 h-1 
            bg-gradient-to-r from-[#F7B77A] via-[#C45A36] to-[#F7B77A] rounded-full animate-pulse"></span>
        </h2>
        <p className="mt-3 text-gray-600 text-base italic max-w-sm mx-auto">
          Celebrate the festival of lights with premium festive gift hampers.
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-8 grid grid-cols-1 md:grid-cols-5 gap-6">

        <aside className="md:col-span-1 bg-white p-4 rounded-lg shadow h-fit mb-6 md:mb-0">
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
                  className={`text-sm cursor-pointer transition-colors duration-200 ${highlight === opt
                      ? "text-[#F7B77A] font-semibold"
                      : "text-gray-700 hover:text-[#F7B77A]"
                    }`}
                >
                  {opt}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-gray-600">
              Showing {sortedItems.length} results
            </p>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-300 rounded-md text-sm px-3 py-2 focus:ring-[#F7B77A] focus:border-[#F7B77A]"
            >
              <option>Default sorting</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating</option>
            </select>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
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
                    to={`/DiwaliDetail/${item.id}`}
                    className="w-full max-w-[330px] flex flex-col"
                  >
                    <div className="relative w-full h-[360px] sm:h-[400px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
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
                        <span className="text-lg sm:text-2xl text-[#b46029] font-cinzel">
                          ₹{item.price}
                        </span>
                        {item.discount && (
                          <span className="line-through text-gray-400 text-sm sm:text-lg ml-1">
                            ₹{Math.round(item.price / (1 - item.discount / 100))}
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
    </section>
  );
}
