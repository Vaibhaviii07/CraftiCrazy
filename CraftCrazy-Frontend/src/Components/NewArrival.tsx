// src/Components/NewArrivals.tsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../AuthContext/CartContext";
import { newArrivalsData } from "../Data/NewArrivalsData";
import { useAuth } from "../AuthContext/AuthContext";
import axios from "axios";

interface Product {
  id: string;             // normalized id (string)
  _id?: string;           // original mongo id when available
  name: string;
  description?: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  type?: string;
  image?: string;
  rating?: number;
  popularity?: number;
  date?: string;
}

const NewArrivals: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: number]: boolean }>({});
  const [toast, setToast] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [highlight, setHighlight] = useState("All Products");
  const [sortOption, setSortOption] = useState("Default sorting");
  const [cartQuantities, setCartQuantities] = useState<{ [key: string]: number }>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  // small fade-in
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      setLoadingProducts(true);
      try {
        const res = await axios.get("http://localhost:8000/api/products/newarrivals");
        console.log("API response object:", res);

        // Try multiple possible paths (defensive)
        const maybe =
          res.data?.allProducts ??
          res.data?.allProudcts ??
          res.data?.data?.allProducts ??
          res.data?.data?.allProudcts ??
          res.data ??
          [];

        const apiRaw: any[] = Array.isArray(maybe) ? maybe : [];

        // Normalize API items
        const apiData: Product[] = apiRaw.map((p: any) => ({
          ...p,
          _id: p._id ?? p.id ?? undefined,
          id: String(p._id ?? p.id ?? Math.random().toString(36).slice(2)), // fallback id
          name: String(p.name ?? p.title ?? p.heading ?? "Untitled"),
          description: p.description ?? p.desc ?? "",
          price: Number(p.price ?? p.amount ?? 0) || 0,
          oldPrice: p.oldPrice ? Number(p.oldPrice) : undefined,
          discount: p.discount ? Number(p.discount) : undefined,
          type: p.category ?? p.type ?? undefined,
          image: p.imageUrl ?? p.image ?? p.img ?? "",
          rating: p.rating ? Number(p.rating) : undefined,
          popularity: p.popularity ? Number(p.popularity) : undefined,
          date: p.date ?? p.createdAt ?? undefined,
        }));

        // Normalize local data (ensure strings for id and numbers for price)
        const localRaw: any[] = (newArrivalsData as any)?.freshPicks ?? [];
        const localData: Product[] = Array.isArray(localRaw)
          ? localRaw.map((p: any) => ({
              ...p,
              id: String(p.id ?? p._id ?? Math.random().toString(36).slice(2)),
              _id: p._id ?? undefined,
              name: String(p.name ?? p.title ?? "Untitled"),
              description: p.description ?? "",
              price: Number(p.price ?? 0) || 0,
              oldPrice: p.oldPrice ? Number(p.oldPrice) : undefined,
              discount: p.discount ? Number(p.discount) : undefined,
              type: p.category ?? p.type ?? undefined,
              image: p.imageUrl ?? p.image ?? "",
              rating: p.rating ? Number(p.rating) : undefined,
              popularity: p.popularity ? Number(p.popularity) : undefined,
              date: p.date ?? undefined,
            }))
          : [];

        // Merge without duplicates (by id)
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
    // increment local disabled state so user can't spam the button
    setCartQuantities((prev) => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }));

    // call addToCart from your context (CartContext expects {id,name,price,quantity,...})
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
      customization: { available: false, userInput: "" },
    } as any); // cast to any if your CartItem TS differs

    setToast(isAuthenticated ? `${item.name} added to cart` : "Please login first");
    setTimeout(() => setToast(null), 2000);
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]));
  };

  // categories, filter and sort
  const categories = [...new Set(products.map((i) => i.type ?? "Others"))];
  const highlightOptions = ["All Products", "Best Seller", "New Arrivals", "Sale", "Hot Items"];

  const filteredProducts = products.filter((item) => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(item.type ?? "");
    let highlightMatch = true;
    switch (highlight) {
      case "Sale":
        highlightMatch = (item.discount ?? 0) > 15;
        break;
      case "Best Seller":
        highlightMatch = (item.popularity ?? 0) > 50 || item.price > 800;
        break;
      case "Hot Items":
        highlightMatch = item.price < 500;
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
        return a.price - b.price;
      case "Sort by price: high to low":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <section className="mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl md:text-4xl font-bold">New Arrivals</h2>
        <p className="text-gray-600">Discover our latest products</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="md:col-span-1 hidden md:block bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Categories</h3>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat} className="flex items-center gap-2">
                <input type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => toggleCategory(cat)} />
                <span>{cat}</span>
              </li>
            ))}
          </ul>

          <h3 className="font-semibold mt-4 mb-2">Highlight</h3>
          <ul className="space-y-2">
            {highlightOptions.map((opt) => (
              <li key={opt} className={`cursor-pointer ${highlight === opt ? "font-bold text-orange-600" : ""}`} onClick={() => setHighlight(opt)}>
                {opt}
              </li>
            ))}
          </ul>
        </aside>

        {/* Products */}
        <div className="md:col-span-3">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-600">Showing {sortedProducts.length} results</p>
            <div>
              <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="border rounded px-2 py-1">
                <option>Default sorting</option>
                <option>Sort by popularity</option>
                <option>Sort by average rating</option>
                <option>Sort by latest</option>
                <option>Sort by price: low to high</option>
                <option>Sort by price: high to low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <AnimatePresence>
              {!loadingProducts && loaded
                ? sortedProducts.map((item, idx) => (
                    <motion.div key={item.id} className="bg-white rounded shadow overflow-hidden" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}>
                      <div className="aspect-[1.3/1] bg-gray-100">
                        <img src={item.image || "/placeholder.png"} alt={item.name} className={`w-full h-full object-cover ${imagesLoaded[idx] ? "opacity-100" : "opacity-0"}`} onLoad={() => handleImageLoad(idx)} />
                      </div>
                      <div className="p-3 text-center">
                        <h3 className="font-semibold text-sm truncate">{item.name}</h3>
                        <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
                        <div className="mt-2">
                          <span className="font-bold text-[#C45A36]">₹{item.price}</span>
                        </div>
                        <button className={`mt-3 px-4 py-2 rounded-full text-sm ${cartQuantities[item.id] ? "bg-gray-300" : "bg-[#C45A36] text-white"}`} onClick={() => handleAddToCart(item)} disabled={!!cartQuantities[item.id]}>
                          {cartQuantities[item.id] ? "Added" : "Add"}
                        </button>
                      </div>
                    </motion.div>
                  ))
                : // skeletons
                  Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-white rounded shadow p-4">
                      <div className="w-full aspect-[1.3/1] bg-gray-200 animate-pulse" />
                      <div className="mt-3 space-y-2">
                        <div className="h-4 bg-gray-200 rounded animate-pulse" />
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
                      </div>
                    </div>
                  ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-yellow-100 px-5 py-2 rounded shadow">
          {toast}
        </div>
      )}
    </section>
  );
};

export default NewArrivals;
