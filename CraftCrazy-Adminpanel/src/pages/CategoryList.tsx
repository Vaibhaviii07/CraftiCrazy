// src/pages/CategoryList.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  Download,
  Edit2,
  Trash2,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type Category = {
  _id?: string;
  id?: string;
  name: string;
  subtitle?: string;
  image?: string;
  totalProducts?: number;
  status: "active" | "deactive";
};
// 🧱 Static Dummy Data (Website-Based)
const STATIC_CATEGORIES: Category[] = [
  {
    id: "1",
    name: "Christmas Specials",
    subtitle: "Festive hampers & decor that bring holiday magic",
    image: "http://localhost:5173/ChristmasHamper1-1.jpg",
    totalProducts: 45,
    status: "active",
  },
  {
    id: "2",
    name: "Wedding Hampers",
    subtitle: "Elegant gifts to celebrate love & togetherness",
    image: "http://localhost:5173/wedding1-3.jpg",
    totalProducts: 62,
    status: "active",
  },
  {
    id: "3",
    name: "Birthday Hampers",
    subtitle: "Curated gifts that make birthdays extra special",
    image: "http://localhost:5173/Birthday4-3.jpg",
    totalProducts: 38,
    status: "active",
  },
  {
    id: "4",
    name: "Haldi Platters",
    subtitle: "Bright and traditional haldi ceremony platters",
    image: "http://localhost:5173/Haldi1-3.jpg",
    totalProducts: 27,
    status: "active",
  },
  {
    id: "5",
    name: "Home Decor",
    subtitle: "Handcrafted decor pieces for elegant living",
    image: "http://localhost:5173/diya.jpeg",
    totalProducts: 54,
    status: "active",
  },
  {
    id: "6",
    name: "Festive Combos",
    subtitle: "Limited-edition combos for Diwali & Christmas",
    image: "http://localhost:5173/diwali1.jpg",
    totalProducts: 33,
    status: "active",
  },
];

const PAGE_SIZE = 6;

const StatusBadge: React.FC<{ status: Category["status"] }> = ({ status }) => {
  return status === "active" ? (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
      Active
    </span>
  ) : (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
      Deactive
    </span>
  );
};

const CategoryList: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>(STATIC_CATEGORIES);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [page, setPage] = useState(1);
  const [exportOpen, setExportOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Try to fetch dynamic data (fallback to static if fails)
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/categories");
        if (!res.ok) throw new Error("API not reachable");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data);
        } else {
          console.warn("No data from API, showing static data instead");
          setCategories(STATIC_CATEGORIES);
        }
      } catch {
        console.warn("Backend not connected, using static fallback data.");
        setCategories(STATIC_CATEGORIES);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // ✅ Search filter
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categories.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.subtitle ?? "").toLowerCase().includes(q)
    );
  }, [categories, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleSelectAll = (val: boolean) => {
    const newSel: Record<string, boolean> = {};
    pageItems.forEach((p) => (newSel[p._id || p.id || ""] = val));
    setSelected((prev) => ({ ...prev, ...newSel }));
  };

  const toggleRow = (id: string) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDelete = (id: string) => {
    const category = categories.find((c) => c._id === id || c.id === id);
    if (!category) return;
    if (
      window.confirm(`Delete category "${category.name}"? This action cannot be undone.`)
    ) {
      setCategories((prev) => prev.filter((c) => c._id !== id && c.id !== id));
    }
  };

  const handleEdit = (id: string) => navigate(`/categories/edit/${id}`);
  const handleAdd = () => navigate("/categories/add");

  const handleExport = (type: "csv" | "xlsx" | "pdf") => {
    setExportOpen(false);
    alert(`Exporting ${filtered.length} categories as ${type.toUpperCase()} (mock).`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-gray-500 text-lg">
        Loading categories...
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Category List</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={16} /> Add Category
          </button>
        </div>
      </div>

      {/* Card */}
      <div className="bg-white rounded-lg shadow border border-gray-100">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium">Category List</h3>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <div className="flex items-center border rounded-lg overflow-hidden">
                <div className="px-3">
                  <Search size={16} className="text-gray-400" />
                </div>
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search Category"
                  className="px-3 py-2 w-64 outline-none text-sm"
                />
              </div>
            </div>

            {/* Export */}
            <div className="relative">
              <button
                onClick={() => setExportOpen((s) => !s)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <Download size={16} /> Export <ChevronDown size={14} />
              </button>

              {exportOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-20">
                  <button
                    onClick={() => handleExport("csv")}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50"
                  >
                    Export CSV
                  </button>
                  <button
                    onClick={() => handleExport("xlsx")}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50"
                  >
                    Export XLSX
                  </button>
                  <button
                    onClick={() => handleExport("pdf")}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50"
                  >
                    Export PDF
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  {/* ✅ Fixed master checkbox */}
                  <input
                    type="checkbox"
                    onChange={(e) => toggleSelectAll(e.target.checked)}
                    checked={
                      pageItems.length > 0 &&
                      pageItems.every((p) => selected[p._id || p.id || ""])
                    }
                  />
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Category Name
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-600">
                  Total Products
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-600">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y">
              {pageItems.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500">
                    No categories found.
                  </td>
                </tr>
              )}

              {pageItems.map((c) => (
                <tr
                  key={c._id || c.id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/categories/${c._id || c.id}`)}
                >
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={!!selected[c._id || c.id || ""]}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleRow(c._id || c.id || "");
                      }}
                    />
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center border">
                        {c.image ? (
                          <img
                            src={c.image}
                            alt={c.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-sm text-gray-400">{c.name[0]}</div>
                        )}
                      </div>

                      <div>
                        <div className="font-medium text-gray-800">{c.name}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {c.subtitle || "—"}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-center text-gray-700">
                    {c.totalProducts ?? "-"}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <StatusBadge status={c.status} />
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(c._id || c.id || "");
                        }}
                        title="Edit"
                        className="p-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(c._id || c.id || "");
                        }}
                        title="Delete"
                        className="p-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100"
                      >
                        <Trash2 size={16} />
                      </button>
                     
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t bg-gray-50 rounded-b-lg">
          <div className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-medium">
              {(page - 1) * PAGE_SIZE + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(page * PAGE_SIZE, filtered.length)}
            </span>{" "}
            of <span className="font-medium">{filtered.length}</span> entries
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={page === 1}
            >
              Prev
            </button>
            <div className="px-3 py-1 border rounded bg-white text-sm">
              Page {page} / {pageCount}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={page === pageCount}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
