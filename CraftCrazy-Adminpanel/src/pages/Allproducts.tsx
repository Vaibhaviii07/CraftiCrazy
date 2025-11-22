// src/pages/AllProducts.tsx
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Plus,
} from "lucide-react";

interface Product {
  _id?: string;
  name: string;
  description?: string;
  price: string;
  rating?: string;
  reviews?: string;
  discount?: string;
  category: string;
  tags?: string;
  brand?: string;
  seller?: string;
  inStock: boolean;
  image?: string;
}

const PAGE_SIZE = 12;
const fallbackImage = "/images/default-product.png";
const categoryCover = "/images/category-cover.png"; // temporary image for category

const formatPrice = (p?: string) =>
  p ? `₹${p.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` : "—";

const AllProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [brandFilter, setBrandFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  // Fetch products initially
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:8000/api/products");
        setProducts(res.data);
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Listen for new products added via window event
  useEffect(() => {
    const handleNewProduct = (e: CustomEvent<Product>) => {
      setProducts((prev) => [e.detail, ...prev]);
    };
    window.addEventListener("new-product", handleNewProduct as EventListener);
    return () => window.removeEventListener("new-product", handleNewProduct as EventListener);
  }, []);

  // Filtered & sorted list
  const processed = useMemo(() => {
    let list = [...products];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q) ||
          (p.tags || "").toLowerCase().includes(q)
      );
    }

    if (categoryFilter !== "All") list = list.filter((p) => p.category === categoryFilter);
    if (brandFilter !== "All") list = list.filter((p) => p.brand === brandFilter);

    if (stockFilter === "InStock") list = list.filter((p) => p.inStock);
    if (stockFilter === "OutOfStock") list = list.filter((p) => !p.inStock);

    if (sortBy === "price-asc") list.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    else if (sortBy === "price-desc") list.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    else if (sortBy === "rating") list.sort((a, b) => parseFloat(b.rating || "0") - parseFloat(a.rating || "0"));

    return list;
  }, [products, query, categoryFilter, brandFilter, stockFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(processed.length / PAGE_SIZE));

  const grouped = useMemo(() => {
    const map = new Map<string, Product[]>();
    for (const p of processed) {
      const cat = p.category || "Uncategorized";
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(p);
    }
    return Array.from(map.entries()).map(([category, items]) => ({ category, items }));
  }, [processed]);

  const toggleExpand = (category: string) =>
    setExpanded((prev) => ({ ...prev, [category]: !prev[category] }));

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch {
      alert("Failed to delete product!");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#2a0a4b]">🛍️ Product List</h1>
          <p className="text-sm text-gray-500">Manage all store products.</p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              placeholder="Search by name, description, tags..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-80 bg-white text-sm"
            />
          </div>

          <Link
            to="/addproducts"
            className="flex items-center gap-2 bg-[#2a0a4b] text-white px-4 py-2 rounded-lg"
          >
            <Plus size={16} /> Add Product
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border mb-6">
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex items-center gap-3">
            <Filter size={18} className="text-gray-600" />
            <span className="text-sm font-medium text-gray-600">Filters:</span>

            <select
              value={categoryFilter}
              onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
              className="border px-3 py-2 rounded-md text-sm"
            >
              {["All", ...Array.from(new Set(products.map((p) => p.category)))].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <select
              value={brandFilter}
              onChange={(e) => { setBrandFilter(e.target.value); setPage(1); }}
              className="border px-3 py-2 rounded-md text-sm"
            >
              {["All", "Generic"].map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>

            <select
              value={stockFilter}
              onChange={(e) => { setStockFilter(e.target.value); setPage(1); }}
              className="border px-3 py-2 rounded-md text-sm"
            >
              <option value="All">All stock</option>
              <option value="InStock">In stock</option>
              <option value="OutOfStock">Out of stock</option>
            </select>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border px-3 py-2 rounded-md text-sm"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Low → High</option>
            <option value="price-desc">High → Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Loading / Error */}
      {loading && <div className="bg-white rounded-xl p-8 text-center">Loading products…</div>}
      {error && <div className="bg-white rounded-xl p-8 text-center text-red-500">{error}</div>}

      {/* Products */}
      {!loading && !error && (
        <div className="space-y-6">
          {grouped.length === 0 ? (
            <div className="bg-white rounded-xl p-6 text-center text-gray-500">
              No products found.
            </div>
          ) : (
            grouped.map((grp) => {
              const isExpanded = expanded[grp.category];
              return (
                <div key={grp.category} className="bg-white border rounded-xl shadow-sm overflow-hidden">
                  <button
                    onClick={() => toggleExpand(grp.category)}
                    className="w-full flex items-center gap-4 p-4 text-left"
                  >
                    <img src={categoryCover} className="w-28 h-16 rounded-lg object-cover" />
                    <div className="flex-1 flex justify-between items-center">
                      <div>
                        <h2 className="text-lg font-bold">{grp.category}</h2>
                        <p className="text-sm text-gray-500">{grp.items.length} products</p>
                      </div>
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="p-4 border-t"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {grp.items.map((p) => (
                            <motion.div
                              key={p._id}
                              className="bg-white border rounded-xl shadow-sm overflow-hidden"
                            >
                              <img src={p.image || fallbackImage} className="w-full h-44 object-cover" />
                              <div className="p-4">
                                <h3 className="font-semibold">{p.name}</h3>
                                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{p.description}</p>
                                <div className="flex justify-between items-center mt-3">
                                  <div className="text-lg font-semibold text-[#C45A36]">{formatPrice(p.price)}</div>
                                  <span className={`text-xs px-2 py-1 rounded-full ${p.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                    {p.inStock ? "In Stock" : "Out of Stock"}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center mt-3">
                                  <Link to={`/products/view/${p._id}`} className="text-sm text-gray-600 hover:text-gray-800">View</Link>
                                  <div className="flex gap-2">
                                    <Link to={`/products/edit/${p._id}`} className="p-2 rounded bg-indigo-50 text-indigo-600"><Edit size={16} /></Link>
                                    <button onClick={() => handleDelete(p._id)} className="p-2 rounded bg-red-50 text-red-600"><Trash2 size={16} /></button>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6 text-sm">
            <div>
              Showing <b>{(page - 1) * PAGE_SIZE + 1}</b> - <b>{Math.min(page * PAGE_SIZE, processed.length)}</b> of <b>{processed.length}</b>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="border px-3 py-1 rounded disabled:opacity-40"><ChevronLeft size={16} /></button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button key={n} onClick={() => setPage(n)} className={`px-3 py-1 rounded ${page === n ? "bg-[#2a0a4b] text-white" : "border"}`}>{n}</button>
              ))}
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="border px-3 py-1 rounded disabled:opacity-40"><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
