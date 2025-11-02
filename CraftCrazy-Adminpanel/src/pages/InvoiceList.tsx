import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  FileText,
  Plus,
  Search,
  Eye,
  Trash2,
  Wallet,
  Clock,
  AlertCircle,
} from "lucide-react";

interface Invoice {
  _id?: string;
  id: string;
  client: string;
  email: string;
  date: string;
  amount: number;
  status: "Paid" | "Pending" | "Overdue" | "Due Soon";
  dueDate: string;
}

const InvoiceList: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // 🔗 Fetch invoices from backend
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/invoices");
        setInvoices(res.data);
      } catch (err) {
        console.error("API Error, using fallback data", err);
        setInvoices([
          {
            id: "#SPK12032901",
            client: "Json Taylor",
            email: "jsontaylor2416@gmail.com",
            date: "25, Nov 2022",
            amount: 17600,
            status: "Paid",
            dueDate: "25, Dec 2022",
          },
          {
            id: "#SPK12032912",
            client: "Suzika Stallone",
            email: "suzikastallone2314@gmail.com",
            date: "13, Nov 2022",
            amount: 42500,
            status: "Pending",
            dueDate: "13, Dec 2022",
          },
          {
            id: "#SPK12032945",
            client: "Roman Killon",
            email: "romankillon4413@gmail.com",
            date: "30, Nov 2022",
            amount: 182000,
            status: "Overdue",
            dueDate: "30, Dec 2022",
          },
          {
            id: "#SPK12032922",
            client: "Charlie Davison",
            email: "charliedavison85@gmail.com",
            date: "18, Nov 2022",
            amount: 130000,
            status: "Paid",
            dueDate: "18, Dec 2022",
          },
          {
            id: "#SPK12032932",
            client: "Selena Deoyl",
            email: "selenadeoyl114@gmail.com",
            date: "18, Nov 2022",
            amount: 405000,
            status: "Due Soon",
            dueDate: "18, Dec 2022",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  // 🎨 Status badge colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Overdue":
        return "bg-red-100 text-red-700";
      case "Due Soon":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // 💰 Format in Rupees
  const formatRupees = (amount: number) =>
    amount.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    });

  // 🔍 Filter invoices
  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      className="p-6 bg-gray-50 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#2a0a4b]">📜 Invoice List</h1>
        <button
          onClick={() => (window.location.href = "/create-invoice")}
          className="flex items-center gap-2 bg-[#845EF7] text-white px-4 py-2 rounded-lg hover:bg-[#6f4ad8] transition"
        >
          <Plus size={16} /> Create Invoice
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Table Section */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-semibold text-gray-700">Manage Invoices</h2>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#845EF7]"
              />
            </div>
          </div>

          {/* Loader */}
          {loading ? (
            <div className="p-10 text-center text-gray-500">Loading invoices...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-gray-700">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="text-left py-3 px-4">Client</th>
                    <th className="text-left py-3 px-4">Invoice ID</th>
                    <th className="text-left py-3 px-4">Issued Date</th>
                    <th className="text-left py-3 px-4">Amount</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Due Date</th>
                    <th className="text-center py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map((invoice, i) => (
                    <tr
                      key={i}
                      className="border-b hover:bg-gray-50 transition duration-150 cursor-pointer"
                      onClick={() =>
                        (window.location.href = `/InvoiceDetail/${invoice._id || invoice.id}`)
                      }
                    >
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{invoice.client}</p>
                          <p className="text-xs text-gray-500">{invoice.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[#845EF7] font-semibold">
                        {invoice.id}
                      </td>
                      <td className="py-3 px-4">{invoice.date}</td>
                      <td className="py-3 px-4">{formatRupees(invoice.amount)}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            invoice.status
                          )}`}
                        >
                          {invoice.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{invoice.dueDate}</td>
                      <td
                        className="py-3 px-4 text-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex justify-center gap-2">
                          {/* 👁 View */}
                          <button
                            onClick={() =>
                              (window.location.href = `/invoice-details/${invoice._id || invoice.id}`)
                            }
                            className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-full"
                            title="View Invoice"
                          >
                            <Eye size={16} />
                          </button>

                          {/* 🗑 Delete */}
                          <button
                            onClick={async () => {
                              const confirmDelete = window.confirm(
                                `Are you sure you want to delete invoice ${invoice.id}?`
                              );
                              if (!confirmDelete) return;

                              try {
                                await axios.delete(
                                  `http://localhost:5000/api/invoices/${invoice._id || invoice.id}`
                                );
                                setInvoices((prev) =>
                                  prev.filter(
                                    (inv) =>
                                      inv._id !== invoice._id && inv.id !== invoice.id
                                  )
                                );
                                alert("🗑 Invoice deleted successfully!");
                              } catch (err) {
                                console.error("Delete failed:", err);
                                alert("❌ Failed to delete invoice. Please try again.");
                              }
                            }}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-full"
                            title="Delete Invoice"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredInvoices.length === 0 && (
                <div className="text-center text-gray-500 py-6">
                  No invoices found.
                </div>
              )}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-between items-center p-4 border-t">
            <p className="text-sm text-gray-500">Showing 1 to 5 of 10 entries</p>
            <div className="flex gap-2">
              <button className="px-3 py-1 border rounded-md text-sm text-gray-600 hover:bg-gray-100">
                Previous
              </button>
              <button className="px-3 py-1 border rounded-md bg-[#845EF7] text-white text-sm">
                1
              </button>
              <button className="px-3 py-1 border rounded-md text-sm text-gray-600 hover:bg-gray-100">
                2
              </button>
              <button className="px-3 py-1 border rounded-md text-sm text-gray-600 hover:bg-gray-100">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Right: Summary Cards */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl shadow-sm border flex items-center gap-4">
            <div className="bg-[#845EF7]/10 p-3 rounded-lg">
              <FileText className="text-[#845EF7]" size={22} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Invoices Amount</p>
              <h3 className="text-xl font-semibold">{formatRupees(192870)}</h3>
              <p className="text-green-600 text-xs">↑ 3.25% this month</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Wallet className="text-green-600" size={22} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Paid Invoices</p>
              <h3 className="text-xl font-semibold">{formatRupees(68830)}</h3>
              <p className="text-red-600 text-xs">↓ 1.86% this month</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border flex items-center gap-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="text-yellow-600" size={22} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending Invoices</p>
              <h3 className="text-xl font-semibold">{formatRupees(81570)}</h3>
              <p className="text-green-600 text-xs">↑ 0.25% this month</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertCircle className="text-red-600" size={22} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Overdue Invoices</p>
              <h3 className="text-xl font-semibold">{formatRupees(32470)}</h3>
              <p className="text-green-600 text-xs">↑ 0.46% this month</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InvoiceList;
