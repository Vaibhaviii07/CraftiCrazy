// src/Components/NewArrival.tsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../AuthContext/CartContext";
import { newArrivalsData } from "../Data/NewArrivalsData";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import axios from "axios";

// Product type definition
interface Product {
  id: number | string;
  name?: string;
  heading?: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  type?: string;
  image: string;
  rating?: number;
  popularity?: number;
  date?: string;
  description?: string;
  link?: string;
}

const NewArrivals: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: number]: boolean }>({});
  const [toast, setToast] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [highlight, setHighlight] = useState("All Products");
  const [sortOption, setSortOption] = useState("Default sorting");
  const [cartQuantities, setCartQuantities] = useState<{ [key: string]: number }>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
  
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    // Show loader
    setTimeout(() => setLoaded(true), 800);
  }, []);
  useEffect(() => {
    const fetchNewArrivals = async () => {
      console.log("API HIT: /api/products/newarrivals");
      try {
        const res = await axios.get("http://localhost:8000/api/products/newarrivals");
        const apiData = Array.isArray(res.data?.data?.allproducts)
          ? res.data.data.allproducts
          : [];

        const localData: Product[] = newArrivalsData.freshPicks || [];

        const merged: Product[] = [
          ...localData,
          ...apiData
            .filter((apiItem: any) => !localData.some((localItem) => localItem.id === apiItem._id))
            .map((item: any) => ({
              id: item.id || item._id,
              name: item.name,
              heading: item.heading,
              price: item.price,
              oldPrice: item.oldPrice,
              discount: item.discount,
              type: item.type,
              image: item.image,
              rating: item.rating,
              popularity: item.popularity,
              date: item.date,
              description: item.description,
              link: item.link,
            })),
        ];

        setProducts(merged);
      } catch (err) {
        console.error("API ERROR:", err);
        setProducts(newArrivalsData.freshPicks || []);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchNewArrivals();
  }, []);

  const handleImageLoad = (index: number) => {
    setImagesLoaded((prev) => ({ ...prev, [index]: true }));
  };

  const handleAddToCart = (item: Product) => {
    const currentQty = cartQuantities[item.id] || 0;
    const newQty = currentQty + 1;

    setCartQuantities((prev) => ({ ...prev, [item.id]: newQty }));

   addToCart({
  id: String(item.id),
  name: item.name || item.heading || "Product",
  image: item.image,
  price: item.price,
  quantity: 1,
});


    setToast(isAuthenticated ? `${item.name || item.heading} added to cart` : "Please login first!");
    setTimeout(() => setToast(null), 2000);
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const categories = [...new Set(products.map((i) => i.type || "Others"))];
  const highlightOptions = ["All Products", "Best Seller", "New Arrivals", "Sale", "Hot Items"];

  const filteredProducts = products.filter((item) => {
    const categoryMatch =
      selectedCategories.length === 0 || selectedCategories.includes(item.type || "Others");

    let highlightMatch = true;

    switch (highlight) {
      case "Sale":
        highlightMatch = (item.discount || 0) > 15;
        break;
      case "Best Seller":
        highlightMatch = (item.price || 0) > 800;
        break;
      case "Hot Items":
        highlightMatch = (item.price || 0) < 500;
        break;
      default:
        highlightMatch = true;
    }

    return categoryMatch && highlightMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "Sort by popularity":
        return (b.popularity || 0) - (a.popularity || 0);
      case "Sort by average rating":
        return (b.rating || 0) - (a.rating || 0);
      case "Sort by latest":
        return new Date(b.date || "").getTime() - new Date(a.date || "").getTime();
      case "Sort by price: low to high":
        return (a.price || 0) - (b.price || 0);
      case "Sort by price: high to low":
        return (b.price || 0) - (a.price || 0);
      default:
        return 0;
    }
  });

 const SidebarContent = () => (
  <div className="space-y-6"> 
    <div>
      <h3 className="text-lg font-semibold text-gray-900 border-b pb-1 mb-2">
        Filter By Categories
      </h3>

      <ul className="space-y-1 m-0 p-0 list-none"> 
        {categories.map((cat) => (
          <li key={cat} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={cat}
              checked={selectedCategories.includes(cat)}
              onChange={() => toggleCategory(cat)}
              className="h-4 w-4 text-[#C45A36] border-gray-300"
            />
            <label htmlFor={cat} className="text-gray-700 text-sm cursor-pointer">
              {cat}
            </label>
          </li>
        ))}
      </ul>
    </div>

    {/* Highlight Section */}
    <div>
      <h3 className="text-lg font-semibold text-gray-900 border-b pb-1 mb-2">
        Highlight
      </h3>

      <ul className="space-y-1 m-0 p-0 list-none">
        {highlightOptions.map((opt) => (
          <li
            key={opt}
            onClick={() => setHighlight(opt)}
            className={`cursor-pointer text-sm ${
              highlight === opt ? "text-[#C45A36] font-semibold" : "text-gray-700"
            }`}
          >
            {opt}
          </li>
        ))}
      </ul>
    </div>
  </div>
);


  return (
    <section className="mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* HEADER */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-[Playfair_Display] font-bold text-gray-900">
          Best Sellers
        </h2>
        <p className="mt-2 text-gray-600 text-lg italic">Discover our most-loved creations</p>
      </div>

      {/* STATIC BEST SELLERS */}
      <section className="py-12 px-6 sm:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {[
            { id: 1, type: "image", image: "/Diya3.jpg" },
            {
              id: 2,
              type: "text",
              title: "Elegant Table Essentials",
              heading: "HANDCRAFTED COASTER",
              button: "Shop Now",
              price: 299,
              link: "/resincoasters",
            },
            { id: 3, type: "image", image: "/ResinPoojaThali.jpeg" },
            {
              id: 4,
              type: "text",
              title: "Beautiful & Elegant",
              heading: "Candles",
              button: "Shop Now",
              price: 399,
              link: "/diwali",
            },
            { id: 5, type: "image", image: "/Coaster.jpeg" },
            {
              id: 6,
              type: "text",
              title: "Traditional Craft",
              heading: "POOJA THALE",
              button: "Shop Now",
              price: 599,
              link: "/resinthale",
            },
          ].map((item) =>
            item.type === "image" ? (
              <div key={item.id} className="overflow-hidden shadow-md aspect-[1/1.1]">
                <img src={item.image} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div
                key={item.id}
                className="flex flex-col justify-center items-center bg-white p-6 shadow-md text-center aspect-[1/1.1]"
              >
                <p className="text-gray-600 italic">{item.title}</p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mt-2">
                  {item.heading}
                </h3>
                <p className="mt-1 text-gray-700">₹{item.price}</p>

                <Link
                  to={item.link || "/"}
                  className="mt-4 px-5 py-2 bg-[#C45A36] hover:bg-[#8c341f] text-white rounded-md"
                >
                  {item.button}
                </Link>
              </div>
            )
          )}
        </div>
      </section>

      {/* LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        {/* SIDEBAR */}
        <aside className="md:col-span-1 hidden md:block bg-white p-4 rounded-lg shadow">
          <SidebarContent />
        </aside>

        {/* PRODUCT GRID */}
        <div className="md:col-span-3">
          {/* SORTING */}
          <div className="flex justify-between items-center mb-6 ml-4">
            <p className="text-sm text-gray-600">Showing {sortedProducts.length} results</p>

            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-700">Sort:</label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border border-gray-300 rounded-md text-sm px-3 py-2 focus:ring-[#C45A36]"
              >
                <option>Default sorting</option>
                <option>Sort by popularity</option>
                <option>Sort by average rating</option>
                <option>Sort by latest</option>
                <option>Sort by price: low to high</option>
                <option>Sort by price: high to low</option>
              </select>
            </div>
          </div>

          {/* PRODUCT CARDS */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 ml-5 mb-8">
            <AnimatePresence>
              {loaded && !loadingProducts
                ? sortedProducts.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md overflow-hidden cursor-pointer"
                    >
                      <Link to={item.link || "/"}>
                        <div>
                          <div className="relative w-full aspect-[1/1.2] bg-gray-100 overflow-hidden group">
                            {item.discount && item.discount > 0 && (
                              <span className="absolute top-2 left-2 text-black bg-white text-xs px-2 py-1 rounded-xl">
                                SALE
                              </span>
                            )}
                            <img
                              src={item.image}
                              alt={item.name || item.heading}
                              className="w-full h-full  object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>

                          <h3 className="mt-3 text-sm md:text-base text-gray-800 font-semibold px-2 line-clamp-2">
                            {item.name || item.heading}
                          </h3>

                          {item.description && (
                            <p className="mt-1 text-xs md:text-sm text-gray-600 px-2 line-clamp-3 italic">
                              {item.description}
                            </p>
                          )}

                          <div className="mt-1 flex items-center gap-2 px-2">
                            <span className="text-lg font-semibold text-black">₹{item.price}</span>

                            {item.oldPrice && item.oldPrice > item.price && (
                              <span className="text-sm text-gray-500 line-through italic">₹{item.oldPrice}</span>
                            )}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))
                : Array(6)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                      >
                        <div className="relative w-full aspect-[1/1.2] bg-gray-200">
                          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
                        </div>
                        <div className="p-4">
                          <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                          <div className="h-3 bg-gray-200 rounded mb-2 animate-pulse w-5/6"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                        </div>
                      </div>
                    ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-[#E8D4B7] text-black px-6 py-3 rounded-lg shadow-lg text-sm"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default NewArrivals;
