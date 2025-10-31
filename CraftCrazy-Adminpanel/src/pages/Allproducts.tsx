// src/pages/AllProducts.tsx
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Search,
  Filter,
  Edit,
  Trash2,
  Star,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * Product interface — use your exact fields
 */
interface Product {
  _id?: string;
  name: string;
  description?: string;
  price: string; // using string to match your schema; adapt if number
  rating?: string;
  reviews?: string;
  discount?: string;
  highlight?: string;
  category: string;
  tags?: string;
  brand?: string;
  seller?: string;
  inStock: boolean;
  warranty?: string;
  returnPolicy?: string;
  image: string; // backend should provide a URL
  occasion?: string;
  material?: string;
  dimensions?: string;
  weight?: string;
  careInstructions?: string;
  maxOrderQuantity?: string;
  deliveryType?: string;
  deliveryAvailability?: string;
  deliveryEstimated?: string;
  customizationAvailable: boolean;
  customizationOptions?: string;
}

/** UI helpers */
const formatPrice = (p?: string) =>
  p ? `₹${p.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` : "—";

const fallbackImage = "/images/default-product.png"; // put a default image in public/images

const PAGE_SIZE = 12;

const AllProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // UI state
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [brandFilter, setBrandFilter] = useState<string>("All");
  const [stockFilter, setStockFilter] = useState<string>("All"); // All / InStock / OutOfStock
  const [sortBy, setSortBy] = useState<string>("newest"); // newest, price-asc, price-desc, rating
  const [page, setPage] = useState<number>(1);

//   // Fetch products from backend
//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await axios.get<Product[]>("/api/products"); // ensure base URL or proxy is configured
//         setProducts(res.data);
//       } catch (err: any) {
//         console.error(err);
//         setError("Failed to load products.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

  // derive filter lists
  const categories = useMemo(() => {
    const set = new Set<string>(products.map((p) => p.category || "Uncategorized"));
    return ["All", ...Array.from(set)];
  }, [products]);

  const brands = useMemo(() => {
    const set = new Set<string>(products.map((p) => p.brand || "Unknown"));
    return ["All", ...Array.from(set)];
  }, [products]);

  // Filter + search + sort
  const processed = useMemo(() => {
    let list = products.slice();

    // search
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q) ||
          (p.tags || "").toLowerCase().includes(q)
      );
    }

    // category
    if (categoryFilter !== "All") {
      list = list.filter((p) => (p.category || "") === categoryFilter);
    }
    // brand
    if (brandFilter !== "All") {
      list = list.filter((p) => (p.brand || "") === brandFilter);
    }
    // stock
    if (stockFilter === "InStock") list = list.filter((p) => p.inStock === true);
    if (stockFilter === "OutOfStock") list = list.filter((p) => p.inStock === false);

    // sort
    if (sortBy === "price-asc") {
      list.sort((a, b) => (parseFloat(a.price || "0") - parseFloat(b.price || "0")));
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => (parseFloat(b.price || "0") - parseFloat(a.price || "0")));
    } else if (sortBy === "rating") {
      list.sort((a, b) => (parseFloat(b.rating || "0") - parseFloat(a.rating || "0")));
    } else {
      // newest - keep API order (or reverse if needed)
    }

    return list;
  }, [products, query, categoryFilter, brandFilter, stockFilter, sortBy]);

  // pagination
  const totalPages = Math.max(1, Math.ceil(processed.length / PAGE_SIZE));
  const visible = processed.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // actions
  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm("Delete this product? This action cannot be undone.")) return;
    try {
      await axios.delete(`/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert("Failed to delete product.");
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Top bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Product List</h1>
          <p className="text-sm text-gray-500">Manage all store products — edit, delete or view details.</p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-initial">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search product name, description, tags..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 w-full md:w-80 text-sm focus:ring-2 focus:ring-[#C45A36] outline-none bg-white"
            />
          </div>

          <Link
            to="/addproducts"
            className="inline-flex items-center gap-2 bg-[#2a0a4b] hover:bg-[#1f0536] text-white px-4 py-2 rounded-lg text-sm"
          >
            <Plus size={16} /> Add Product
          </Link>
        </div>
      </div>

      {/* Filters + sort */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center justify-between">
          <div className="flex gap-3 items-center flex-wrap">
            <div className="flex items-center gap-2 text-sm">
              <Filter className="text-gray-500" />
              <span className="font-medium text-gray-700">Filters:</span>
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setPage(1);
              }}
              className="text-sm border rounded-md px-3 py-2 bg-white"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              value={brandFilter}
              onChange={(e) => {
                setBrandFilter(e.target.value);
                setPage(1);
              }}
              className="text-sm border rounded-md px-3 py-2 bg-white"
            >
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>

            <select
              value={stockFilter}
              onChange={(e) => {
                setStockFilter(e.target.value);
                setPage(1);
              }}
              className="text-sm border rounded-md px-3 py-2 bg-white"
            >
              <option value="All">All stock</option>
              <option value="InStock">In stock</option>
              <option value="OutOfStock">Out of stock</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-500">Sort</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border rounded-md px-3 py-2 bg-white"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price — Low to high</option>
              <option value="price-desc">Price — High to low</option>
              <option value="rating">Top rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid / List — Ynex product card grid */}
      {loading ? (
        <div className="bg-white rounded-xl p-8 text-center">Loading products…</div>
      ) : error ? (
        <div className="bg-white rounded-xl p-8 text-center text-red-500">{error}</div>
      ) : (
        <>
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {visible.map((p, i) => (
              <motion.div
                key={p._id ?? i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={p.image || fallbackImage}
                    alt={p.name}
                    className="w-full h-44 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = fallbackImage;
                    }}
                  />
                  {p.discount && (
                    <span className="absolute left-3 top-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      {p.discount} OFF
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-800 truncate">{p.name}</h3>
                      <p className="text-xs text-gray-500 line-clamp-2 mt-1">{p.description || ""}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-[#C45A36]">{formatPrice(p.price)}</div>
                      <div className="text-xs text-gray-400">{p.category}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center text-yellow-500">
                        <Star size={14} /> <span className="text-sm ml-1">{p.rating || "N/A"}</span>
                      </div>
                      <div className="text-xs text-gray-500">({p.reviews || 0})</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${p.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {p.inStock ? "In Stock" : "Out of Stock"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 mt-4">
                    <Link to={`/products/view/${p._id}`} className="text-sm text-gray-600 hover:text-gray-800">
                      View Details
                    </Link>

                    <div className="flex gap-2">
                      <Link to={`/products/edit/${p._id}`} className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100">
                        <Edit size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                        title="Delete product"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium">{(page - 1) * PAGE_SIZE + 1}</span> -{" "}
              <span className="font-medium">{Math.min(page * PAGE_SIZE, processed.length)}</span> of{" "}
              <span className="font-medium">{processed.length}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 rounded-md border disabled:opacity-50"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pageNum = idx + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`px-3 py-1 rounded-md ${page === pageNum ? "bg-[#2a0a4b] text-white" : "border"}`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 rounded-md border disabled:opacity-50"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AllProducts;
