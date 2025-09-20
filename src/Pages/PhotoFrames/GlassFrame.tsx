import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { glassFrames } from "../../Data/GlassFramedata";
import { useCart } from "../../AuthContext/CartContext"; 

type Frame = {
  id: number;
  name: string;
  description?: string;
  image: string;
  price: string;
  category: string;
};

type ContentItem =
  | { id: number; type: "image"; image: string }
  | { id: number; type: "video"; video: string }
  | {
      id: number;
      type: "text";
      title: string;
      heading: string;
      price: string;
      button: string;
    };

export default function GlassPhotoFrames() {

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [highlight, setHighlight] = useState("All");
  const [sortOption, setSortOption] = useState("Default sorting");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { cart, addToCart } = useCart(); // Use CartContext



  // Toggle category filter
  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // Add item to cart
  const handleAddToCart = (item: any) => {
    const product = {
      id: item.id,
      name: item.name || item.heading || item.title || "Unnamed Item",
      price: item.price || "0",
      image:
        item.image ||
        (item.type === "video" ? "/video-placeholder.jpg" : "/placeholder.jpg"),
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

  const highlightOptions = ["All", "Best Seller", "Discounted"];
  const categories = [...new Set(glassFrames.map((item) => item.category))];

  // Filter frames
  const filteredFrames = glassFrames.filter((item) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(item.category);

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

  // Sort frames
  const sortedFrames = [...filteredFrames].sort((a, b) => {
    switch (sortOption) {
      case "Price: Low to High":
        return (
          parseInt(a.price.replace(/[₹,]/g, "")) -
          parseInt(b.price.replace(/[₹,]/g, ""))
        );
      case "Price: High to Low":
        return (
          parseInt(b.price.replace(/[₹,]/g, "")) -
          parseInt(a.price.replace(/[₹,]/g, ""))
        );
      default:
        return 0;
    }
  });

  const contentData: ContentItem[] = [
    { id: 1, type: "video", video: "/glassvideo1.mp4" },
    {
      id: 2,
      type: "text",
      title: "Trending Collection",
      heading: "Elegant Glass Frames",
      price: "1,499",
      button: "Shop Now",
    },
    { id: 3, type: "video", video: "/glassvideo2.mp4" },
    {
      id: 4,
      type: "text",
      title: "Trending Collection",
      heading: "Modern Glass Frames",
      price: "1,799",
      button: "Shop Now",
    },
    { id: 5, type: "video", video: "/glassvideo3.mp4" },
    {
      id: 6,
      type: "text",
      title: "Trending Collection",
      heading: "Classic Glass Frames",
      price: "1,299",
      button: "Shop Now",
    },
  ];

  return (
    <div className="min-h-screen relative">
      {/* Hero */}
      <div className="text-center mb-7 mt-12">
        <h2 className="text-3xl md:text-4xl font-[Playfair_Display] font-bold text-gray-900">
          Best Sellers
        </h2>
        <p className="mt-2 text-gray-600 text-lg italic">
          Discover our most-loved creations
        </p>
      </div>

      {/* Featured / Best Sellers */}
      <section className="py-12 px-6 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 ">
          {contentData.map((item) =>
            item.type === "image" ? (
              <div key={item.id} className="overflow-hidden shadow">
                <img
                  src={item.image}
                  alt="product"
                  className="w-full h-64 md:h-72 lg:h-80 object-cover"
                />
              </div>
            ) : item.type === "video" ? (
              <div key={item.id} className="overflow-hidden shadow">
                <video
                  src={item.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-64 md:h-72 lg:h-80 object-cover"
                />
              </div>
            ) : (
              <div
                key={item.id}
                className="flex flex-col justify-center items-center bg-white text-center p-6 shadow-md"
              >
                <p className="text-gray-600 text-base italic">{item.title}</p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mt-2">
                  {item.heading}
                </h3>
                <p className="mt-1 text-gray-700 text-sm">₹{item.price}</p>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="mt-4 px-5 py-2 bg-[#C45A36] text-white text-sm font-medium rounded-full shadow hover:bg-[#a94828] transition"
                >
                  {item.button}
                </button>
              </div>
            )
          )}
        </div>
      </section>

      {/* Sidebar + Products */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 mt-16 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-1 bg-white p-5 rounded-xl h-[350px] shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">
            Categories
          </h3>
          <ul className="space-y-2 mb-6">
            {categories.map((cat) => (
              <li key={cat} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="h-4 w-4 text-[#C45A36] border-gray-300 rounded"
                />
                <label className="text-gray-700 text-sm cursor-pointer">{cat}</label>
              </li>
            ))}
          </ul>

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
                    ? "text-[#C45A36] font-semibold"
                    : "text-gray-700"
                }`}
              >
                {opt}
              </li>
            ))}
          </ul>
        </aside>

        {/* Products Grid */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm text-gray-600">
              Showing {sortedFrames.length} results • Cart:{" "}
              <span className="font-semibold">{cart.length}</span>
            </p>
            <div className="flex items-center gap-2">
              <label
                htmlFor="sorting"
                className="text-sm font-medium text-gray-700"
              >
                Sort:
              </label>
              <select
                id="sorting"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border border-gray-300 rounded-md text-sm px-3 py-2 focus:ring-[#C45A36] focus:border-[#C45A36]"
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
                  <div
                    className="w-full max-w-[360px] flex flex-col"
                  >
                    <div
                      onClick={(e) => e.preventDefault()}
                      className="relative w-full h-[420px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-3 cursor-pointer"
                    >
                      <img
                        src={frame.image}
                        alt={frame.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />



                      {/* Add to Cart */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddToCart(frame);
                        }}
                        className="absolute bottom-4 right-4 px-3 py-1 rounded-md shadow text-sm font-medium flex items-center gap-1 transition bg-[#C45A36] text-white hover:bg-[#a1472c]"
                      >
                        <ShoppingCart className="w-4 h-4" /> Add to Cart
                      </button>
                    </div>

                    <div className="mt-4 text-center">
                      <p className="text-lg text-gray-900 font-playfair">
                        {frame.name}
                      </p>
                      {frame.description && (
                        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                          {frame.description}
                        </p>
                      )}
                      <div className="mt-2 flex justify-center gap-3 items-baseline">
                        <span className="text-xl text-[#5C3A21] font-cinzel">
                          {frame.price}
                        </span>
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
                       bg-[#C45A36]/90 text-white px-6 py-3 rounded-lg shadow-lg text-sm sm:text-base z-50"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
