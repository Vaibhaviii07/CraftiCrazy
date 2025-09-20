import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import { woodenFrames } from "../../Data/WoodenFramedata";
import { useCart } from "../../AuthContext/CartContext";

export default function WoodenPhotoFrames() {
  const { cart, addToCart } = useCart();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [highlight, setHighlight] = useState("All");
  const [sortOption, setSortOption] = useState("Default sorting");
  const [toastMessage, setToastMessage] = useState<string | null>(null);


  const handleAddToCart = (frame: any) => {
    const product = {
      id: frame.id,
      name: frame.name,
      price: parseInt(frame.price.replace(/[₹,]/g, "")),
      image: frame.image,
      quantity: 1,
    };

    const exists = cart.find((c) => c.id === product.id);
    if (!exists) {
      addToCart(product);
      setToastMessage(`${product.name} added to cart!`);
    } else {
      setToastMessage(`${product.name} is already in the cart`);
    }

    setTimeout(() => setToastMessage(null), 2500);
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const highlightOptions = ["All", "Best Seller", "Discounted"];
  const categories = [...new Set(woodenFrames.map((item) => item.category))];

  // Filtering
  const filteredFrames = woodenFrames.filter((item) => {
    const categoryMatch =
      selectedCategories.length === 0 || selectedCategories.includes(item.category);

    let highlightMatch = true;
    switch (highlight) {
      case "Best Seller":
        highlightMatch = parseInt(item.price.replace(/[₹,]/g, "")) > 1500;
        break;
      case "Discounted":
        highlightMatch = parseInt(item.price.replace(/[₹,]/g, "")) < 1500;
        break;
      default:
        highlightMatch = true;
    }

    return categoryMatch && highlightMatch;
  });

  // Sorting
  const sortedFrames = [...filteredFrames].sort((a, b) => {
    switch (sortOption) {
      case "Price: Low to High":
        return parseInt(a.price.replace(/[₹,]/g, "")) - parseInt(b.price.replace(/[₹,]/g, ""));
      case "Price: High to Low":
        return parseInt(b.price.replace(/[₹,]/g, "")) - parseInt(a.price.replace(/[₹,]/g, ""));
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <div
        className="relative w-full h-[400px] flex flex-col items-center justify-center text-center"
        style={{
          backgroundImage: "url('/woodframes/wood-banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <motion.h1
          className="relative text-4xl md:text-5xl font-serif font-semibold text-white mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Wooden Photo Frames
        </motion.h1>
        <motion.p
          className="relative text-gray-200 text-lg max-w-2xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Elegant, handcrafted wooden frames to cherish your special memories.
        </motion.p>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 mt-16 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-1 bg-white p-4 h-[500px] rounded-lg shadow mt-2">
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
                    className="h-4 w-4 text-[#8B5E3C] border-gray-300 rounded"
                  />
                  <label htmlFor={cat} className="text-gray-700 text-sm cursor-pointer">
                    {cat}
                  </label>
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
                  className={`text-sm cursor-pointer ${
                    highlight === opt ? "text-[#8B5E3C] font-semibold" : "text-gray-700"
                  }`}
                >
                  {opt}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Products */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm text-gray-600">
              Showing {sortedFrames.length} results • Cart:{" "}
              <span className="font-semibold">{cart.reduce((acc, i) => acc + i.quantity, 0)}</span>
            </p>
            <div className="flex items-center gap-2">
              <label htmlFor="sorting" className="text-sm font-medium text-gray-700">Sort:</label>
              <select
                id="sorting"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border border-gray-300 rounded-md text-sm px-3 py-2 focus:ring-[#8B5E3C] focus:border-[#8B5E3C]"
              >
                <option>Default sorting</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
            <AnimatePresence>
              {sortedFrames.map((frame) => (
                <motion.div
                  key={frame.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.5 }}
                  className="group flex justify-center"
                >
                  <div className="w-full max-w-[360px] flex flex-col">
                    <div
                      className="relative w-full h-[420px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-3 cursor-pointer"
                    >
                      <img
                        src={frame.image}
                        alt={frame.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                     
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(frame); }}
                        className="absolute bottom-4 right-4 px-3 py-1 rounded-md shadow text-sm font-medium flex items-center gap-1 transition bg-[#C45A36] text-white hover:bg-[#a1472c]"
                      >
                        <ShoppingCart className="w-4 h-4" /> Add to Cart
                      </button>
                    </div>

                    <div className="mt-4 text-center">
                      <p className="text-xl text-black font-playfair leading-snug">{frame.name}</p>
                      {frame.description && (
                        <p className="text-gray-500 text-sm mt-1 line-clamp-2">{frame.description}</p>
                      )}
                      <div className="mt-2 flex justify-center gap-3 items-baseline">
                        <span className="text-2xl text-[#8B5E3C] font-cinzel">{frame.price}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 
                       bg-[#E8D4B7] text-black px-6 py-3 rounded-lg shadow-lg text-sm sm:text-base z-50"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
