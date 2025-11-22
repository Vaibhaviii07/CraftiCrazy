import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { rakhiKits, RakhiKit } from "../../Data/RakhiData";

export default function RakhiPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [highlight, setHighlight] = useState("All");
  const [sortOption, setSortOption] = useState("Default sorting");
  const [allProducts, setAllProducts] = useState<RakhiKit[]>(rakhiKits);
  const [imageLoaded, setImageLoaded] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    async function fetchData() {
      try {
        const encodedCategory = encodeURIComponent("rakhi hits");
        const res = await fetch(`http://localhost:8000/api/products?category=${encodedCategory}`);
        const apiResponse = await res.json();

        const apiData: RakhiKit[] = apiResponse.map((item: any) => ({
          ...item,
          id: item._id,
          image: item.imageUrl,
          price: Number(item.price),
          rating: Number(item.rating),
          discount: Number(item.discount),
        }));

        const merged = [
          ...apiData,
          ...rakhiKits.filter((local) => !apiData.some((api) => api.id === local.id)),
        ];

        setAllProducts(merged);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    }

    fetchData();
  }, []);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const highlightOptions = ["All", "Best Seller", "Discounted", "Luxury Edition"];
  const categories = [...new Set(allProducts.map((i: RakhiKit) => i.category))];

  const filteredItems = useMemo(() => {
    return allProducts.filter(item => {
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
        case "Luxury Edition":
          highlightMatch = item.highlight === "Luxury Edition";
          break;
        default:
          highlightMatch = true;
      }
      return categoryMatch && highlightMatch;
    });
  }, [selectedCategories, highlight, allProducts]);

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

<<<<<<< Updated upstream
  const LazyImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
    const [loaded, setLoaded] = useState(false);
    return (
      <div className={`w-full h-full ${!loaded ? "bg-gray-200 animate-pulse" : ""}`}>
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          onLoad={() => setLoaded(true)}
          className={className}
        />
      </div>
    );
  };
=======
>>>>>>> Stashed changes

  return (
    <section className="min-h-screen bg-[#fffdfc]">
      {/* Hero */}
      <div className="text-center mt-10 mb-8 px-4">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 relative inline-block">
          Rakhi Collection
          <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-28 h-1 bg-gradient-to-r from-[#b46029] via-[#F7B77A] to-[#b46029] rounded-full animate-pulse"></span>
        </h2>
        <p className="mt-3 text-gray-600 text-sm sm:text-base italic max-w-sm mx-auto">
          Handcrafted rakhis for every sibling, made with love and care.
        </p>
      </div>

      {/* Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-8 sm:mt-16 grid grid-cols-1 md:grid-cols-5 gap-6">
<<<<<<< Updated upstream
=======
        
>>>>>>> Stashed changes
        {/* Sidebar */}
        <aside className="md:col-span-1 bg-white p-4 rounded-lg h-fit shadow mb-6 md:mb-0">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-3">Categories</h3>
            <ul className="space-y-2">
              {categories.map(cat => (
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
              {highlightOptions.map(opt => (
                <li
                  key={opt}
                  onClick={() => setHighlight(opt)}
<<<<<<< Updated upstream
                  className={`text-sm cursor-pointer ${highlight === opt ? "text-[#b46029] font-semibold" : "text-gray-700"}`}
=======
                  className={`text-sm cursor-pointer ${highlight === opt ? "text-[#b46029] font-semibold" : "text-gray-700"
                    }`}
>>>>>>> Stashed changes
                >
                  {opt}
                </li>
              ))}
            </ul>
          </div>
        </aside>

<<<<<<< Updated upstream
        {/* Products Grid */}
=======
        {/* Product Grid */}
>>>>>>> Stashed changes
        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
            <p className="text-sm text-gray-600">Showing {sortedItems.length} results</p>
            <select
              value={sortOption}
              onChange={e => setSortOption(e.target.value)}
              className="border border-gray-300 rounded-md text-sm px-3 py-2 focus:ring-[#b46029] focus:border-[#b46029]"
            >
              <option>Default sorting</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating</option>
            </select>
          </div>

<<<<<<< Updated upstream
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
=======
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16">
>>>>>>> Stashed changes
            <AnimatePresence>
              {sortedItems.map(item => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                  className="flex justify-center"
                >
                  <Link
                    to={`/RakhiDetail/${item.id}`}
                    className="w-full max-w-[280px] sm:max-w-[320px] flex flex-col"
                  >
                    <div className="relative w-full h-[240px] sm:h-[320px] lg:h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-2 sm:hover:-translate-y-3">
<<<<<<< Updated upstream
                      <LazyImage
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      {item.discount && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="absolute top-2 right-2 bg-[#b46029] text-white text-xs sm:text-sm font-semibold px-2 py-1 rounded-md shadow"
                        >
                          {item.discount}% OFF
                        </motion.span>
                      )}
                    </div>

=======
                      <motion.img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: imageLoaded[item.id] ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                        onLoad={() =>
                          setImageLoaded(prev => ({ ...prev, [item.id]: true }))
                        }
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />

                      {item.discount && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="absolute top-2 right-2 bg-[#b46029] text-white text-xs sm:text-sm font-semibold px-2 py-1 rounded-md shadow"
                        >
                          {item.discount}% OFF
                        </motion.span>
                      )}
                    </div>

>>>>>>> Stashed changes
                    <div className="mt-2 sm:mt-3 text-center px-1 sm:px-0">
                      <p className="text-sm sm:text-lg text-gray-900 font-playfair leading-snug">{item.name}</p>
                      {item.description && (
                        <p className="text-gray-500 text-xs sm:text-sm mt-1 line-clamp-2">{item.description}</p>
                      )}
                      <div className="mt-1 sm:mt-2 flex justify-center gap-1 sm:gap-2 items-baseline">
                        <span className="text-lg sm:text-2xl text-[#b46029] font-cinzel">₹{item.price}</span>
                        {item.discount && (
                          <span className="line-through text-gray-400 text-sm sm:text-lg ml-2">
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
