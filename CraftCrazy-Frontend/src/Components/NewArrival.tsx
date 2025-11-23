// src/Components/NewArrivals.tsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../AuthContext/CartContext";
import { newArrivalsData } from "../Data/NewArrivalsData";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import axios from "axios";

// Product type (broad to accommodate both local & API shapes)
interface Product {
  id: string;
  _id?: string;
  name?: string;
  heading?: string;
  description?: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  type?: string;
  image?: string;
  rating?: number;
  popularity?: number;
  date?: string;
  link?: string;
}

const NewArrivals: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: number]: boolean }>({});
  const [toast, setToast] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); // kept from HEAD
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [highlight, setHighlight] = useState("All Products");
  const [sortOption, setSortOption] = useState("Default sorting");
  const [cartQuantities, setCartQuantities] = useState<{ [key: string]: number }>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  // small fade loader (keeps HEAD behavior of smooth scroll + slight delay)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const t = setTimeout(() => setLoaded(true), 700);
    return () => clearTimeout(t);
  }, []);

  // fetch + normalize + merge API & local data (defensive)
  useEffect(() => {
    const fetchNewArrivals = async () => {
      setLoadingProducts(true);
      try {
        const res = await axios.get("http://localhost:8000/api/products/newarrivals");

        // Defensive possible locations for array
        const maybe =
          res.data?.allProducts ??
          res.data?.allProudcts ??
          res.data?.data?.allproducts ??
          res.data?.data?.allProducts ??
          res.data ??
          [];

        const apiRaw: any[] = Array.isArray(maybe) ? maybe : [];

        const apiData: Product[] = apiRaw.map((p: any) => ({
          ...p,
          _id: p._id ?? p.id,
          id: String(p._id ?? p.id ?? Math.random().toString(36).slice(2)),
          name: String(p.name ?? p.title ?? p.heading ?? "Untitled"),
          heading: p.heading ?? p.name,
          description: p.description ?? p.desc ?? "",
          price: Number(p.price ?? p.amount ?? 0) || 0,
          oldPrice: p.oldPrice ? Number(p.oldPrice) : undefined,
          discount: p.discount ? Number(p.discount) : undefined,
          type: p.category ?? p.type ?? "Others",
          image: p.imageUrl ?? p.image ?? p.img ?? "",
          rating: p.rating ? Number(p.rating) : undefined,
          popularity: p.popularity ? Number(p.popularity) : undefined,
          date: p.date ?? p.createdAt ?? undefined,
          link: p.link ?? undefined,
        }));

        const localRaw: any[] = (newArrivalsData as any)?.freshPicks ?? [];
        const localData: Product[] = Array.isArray(localRaw)
          ? localRaw.map((p: any) => ({
              ...p,
              id: String(p.id ?? p._id ?? Math.random().toString(36).slice(2)),
              _id: p._id ?? undefined,
              name: String(p.name ?? p.title ?? "Untitled"),
              heading: p.heading ?? p.name,
              description: p.description ?? "",
              price: Number(p.price ?? 0) || 0,
              oldPrice: p.oldPrice ? Number(p.oldPrice) : undefined,
              discount: p.discount ? Number(p.discount) : undefined,
              type: p.type ?? p.category ?? "Others",
              image: p.imageUrl ?? p.image ?? "",
              rating: p.rating ? Number(p.rating) : undefined,
              popularity: p.popularity ? Number(p.popularity) : undefined,
              date: p.date ?? undefined,
              link: p.link ?? undefined,
            }))
          : [];

        const merged: Product[] = [
          ...localData,
          ...apiData.filter((apiItem) => !localData.some((loc) => loc.id === apiItem.id)),
        ];

        setProducts(merged);
      } catch (err) {
        console.error("Error fetching new arrivals:", err);
        // fallback to local data (normalized)
        const localRaw: any[] = (newArrivalsData as any)?.freshPicks ?? [];
        const localData: Product[] = Array.isArray(localRaw)
          ? localRaw.map((p: any) => ({
              ...p,
              id: String(p.id ?? p._id ?? Math.random().toString(36).slice(2)),
              name: String(p.name ?? p.title ?? "Untitled"),
              heading: p.heading ?? p.name,
              description: p.description ?? "",
              price: Number(p.price ?? 0) || 0,
              image: p.imageUrl ?? p.image ?? "",
            }))
          : [];
        setProducts(localData);
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
    // prevent spam by toggling local 'added' state
    setCartQuantities((prev) => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }));

    addToCart({
      id: String(item.id),
      name: item.name ?? item.heading ?? "Product",
      price: item.price,
      image: item.image,
      quantity: 1,
    } as any);

    setToast(isAuthenticated ? `${item.name ?? item.heading} added to cart` : "Please login first!");
    setTimeout(() => setToast(null), 2000);
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]));
  };

  // categories & filters
  const categories = [...new Set(products.map((i) => i.type ?? "Others"))];
  const highlightOptions = ["All Products", "Best Seller", "New Arrivals", "Sale", "Hot Items"];

  const filteredProducts = products.filter((item) => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(item.type ?? "Others");
    let highlightMatch = true;
    switch (highlight) {
      case "Sale":
        highlightMatch = (item.discount ?? 0) > 15;
        break;
      case "Best Seller":
        highlightMatch = (item.popularity ?? 0) > 50 || (item.price ?? 0) > 800;
        break;
      case "Hot Items":
        highlightMatch = (item.price ?? 0) < 500;
        break;
      default:
        highlightMatch = true;
    }
    return categoryMatch && highlightMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "Sort by popularity":
        return (b.popularity ?? 0) - (a.popularity ?? 0);
      case "Sort by average rating":
        return (b.rating ?? 0) - (a.rating ?? 0);
      case "Sort by latest":
        return (new Date(b.date ?? 0).getTime() || 0) - (new Date(a.date ?? 0).getTime() || 0);
      case "Sort by price: low to high":
        return (a.price ?? 0) - (b.price ?? 0);
      case "Sort by price: high to low":
        return (b.price ?? 0) - (a.price ?? 0);
      default:
        return 0;
    }
  });

  // Sidebar content (kept from HEAD)
  const SidebarContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-1 mb-2">Filter By Categories</h3>
        <ul className="space-y-1">
          {categories.map((cat) => (
            <li key={cat} className="flex items-center gap-2">
              <input type="checkbox" id={cat} checked={selectedCategories.includes(cat)} onChange={() => toggleCategory(cat)} />
              <label htmlFor={cat} className="text-sm text-gray-700 cursor-pointer">{cat}</label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-1 mb-2">Highlight</h3>
        <ul className="space-y-1">
          {highlightOptions.map((opt) => (
            <li key={opt} onClick={() => setHighlight(opt)} className={`cursor-pointer text-sm ${highlight === opt ? "text-[#C45A36] font-semibold" : "text-gray-700"}`}>
              {opt}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <section className="mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* HEADER - Best Sellers title (kept) */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-[Playfair_Display] font-bold text-gray-900">Best Sellers</h2>
        <p className="mt-2 text-gray-600 text-lg italic">Discover our most-loved creations</p>
      </div>

      {/* STATIC BEST SELLERS (kept from HEAD) */}
      <section className="py-12 px-6 sm:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
              <div key={item.id} className="overflow-hidden shadow-md aspect-[1/1.1] rounded-lg">
                <img src={item.image} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div key={item.id} className="flex flex-col justify-center items-center bg-white p-6 shadow-md text-center aspect-[1/1.1] rounded-lg">
                <p className="text-gray-600 italic">{item.title}</p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mt-2">{item.heading}</h3>
                <p className="mt-1 text-gray-700">₹{item.price}</p>
                <Link to={item.link || "/"} className="mt-4 px-5 py-2 bg-[#C45A36] hover:bg-[#8c341f] text-white rounded-md">
                  {item.button}
                </Link>
              </div>
            )
          )}
        </div>
      </section>

      {/* LAYOUT with Sidebar + Products */}
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
              <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="border border-gray-300 rounded-md text-sm px-3 py-2 focus:ring-[#C45A36]">
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
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.35 }}
                      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md overflow-hidden"
                    >
                      <div className="relative w-full aspect-[1/1.2] bg-gray-100 overflow-hidden group">
                        {item.discount && item.discount > 0 && (
                          <span className="absolute top-2 left-2 text-black bg-white text-xs px-2 py-1 rounded-xl">SALE</span>
                        )}
                        <img
                          src={item.image ?? "/placeholder.png"}
                          alt={item.name ?? item.heading}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>

                      <div className="p-3">
                        <h3 className="mt-1 text-sm md:text-base text-gray-800 font-semibold line-clamp-2">
                          {item.name ?? item.heading}
                        </h3>

                        {item.description && (
                          <p className="mt-1 text-xs md:text-sm text-gray-600 line-clamp-3 italic">{item.description}</p>
                        )}

                        <div className="mt-3 flex items-center justify-between gap-2">
                          <div>
                            <span className="text-lg font-semibold text-black">₹{item.price}</span>
                            {item.oldPrice && item.oldPrice > item.price && (
                              <span className="text-sm text-gray-500 line-through italic ml-2">₹{item.oldPrice}</span>
                            )}
                          </div>

                          <div>
                            <button
                              onClick={() => handleAddToCart(item)}
                              disabled={!!cartQuantities[item.id]}
                              className={`px-4 py-2 rounded-md text-sm ${
                                cartQuantities[item.id] ? "bg-gray-300 text-gray-600" : "bg-[#C45A36] text-white"
                              }`}
                            >
                              {cartQuantities[item.id] ? "Added" : "Add"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                : // skeletons
                  Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <div className="relative w-full aspect-[1/1.2] bg-gray-200">
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-[#E8D4B7] text-black px-6 py-3 rounded-lg shadow-lg text-sm z-50"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default NewArrivals;
