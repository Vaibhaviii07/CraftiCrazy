import React, { useEffect, useState, useRef } from "react";
import {
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  ShoppingBag,
  Truck,
  DollarSign,
  MoreVertical,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import axios from "axios";
import { Link } from "react-router-dom";

interface Order {
  _id?: string;
  id: string;
  customer: string;
  orderDate: string;
  deliveryDate: string;
  payment: string;
  amount: string;
  status: string;
  showMenu?: boolean;
}

interface ChartData {
  name: string;
  revenue: number;
}

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [activeTab, setActiveTab] = useState("Weekly");
  const menuRef = useRef<HTMLDivElement>(null);

  // ===== Fetch Orders =====
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      if (res.data && res.data.length > 0) {
        setOrders(res.data);
      } else {
        loadStaticOrders();
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      loadStaticOrders();
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/orders/${id}`);
      setOrders((prev) => prev.filter((order) => order.id !== id));
      alert("✅ Order deleted successfully!");
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("❌ Failed to delete order. Please try again.");
    }
  };

  // ===== Static Data =====
  const loadStaticOrders = () => {
    setOrders([
      {
        id: "#1245",
        customer: "John Doe",
        orderDate: "2025-10-24",
        deliveryDate: "2025-10-27",
        payment: "Credit Card",
        amount: "₹2450.00",
        status: "Delivered",
      },
      {
        id: "#1246",
        customer: "Jane Smith",
        orderDate: "2025-10-22",
        deliveryDate: "2025-10-26",
        payment: "UPI",
        amount: "₹5600.00",
        status: "Pending",
      },
      {
        id: "#1247",
        customer: "Michael Brown",
        orderDate: "2025-10-20",
        deliveryDate: "2025-10-23",
        payment: "Cash on Delivery",
        amount: "₹1320.00",
        status: "Cancelled",
      },
      {
        id: "#1248",
        customer: "Emily Wilson",
        orderDate: "2025-10-18",
        deliveryDate: "2025-10-22",
        payment: "Credit Card",
        amount: "₹870.00",
        status: "Delivered",
      },
    ]);
  };

  // ===== Chart Setup =====
  useEffect(() => {
    fetchOrders();
    setChartData([
      { name: "Mon", revenue: 4000 },
      { name: "Tue", revenue: 6000 },
      { name: "Wed", revenue: 5000 },
      { name: "Thu", revenue: 8500 },
      { name: "Fri", revenue: 7000 },
      { name: "Sat", revenue: 10000 },
      { name: "Sun", revenue: 7500 },
    ]);
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "Weekly") {
      setChartData([
        { name: "Mon", revenue: 4000 },
        { name: "Tue", revenue: 6000 },
        { name: "Wed", revenue: 5000 },
        { name: "Thu", revenue: 8500 },
        { name: "Fri", revenue: 7000 },
        { name: "Sat", revenue: 10000 },
        { name: "Sun", revenue: 7500 },
      ]);
    } else if (tab === "Monthly") {
      setChartData([
        { name: "Week 1", revenue: 28000 },
        { name: "Week 2", revenue: 32000 },
        { name: "Week 3", revenue: 29000 },
        { name: "Week 4", revenue: 36000 },
      ]);
    } else {
      setChartData([
        { name: "Jan", revenue: 120000 },
        { name: "Feb", revenue: 150000 },
        { name: "Mar", revenue: 170000 },
        { name: "Apr", revenue: 190000 },
        { name: "May", revenue: 220000 },
        { name: "Jun", revenue: 200000 },
      ]);
    }
  };

  // ===== Toggle Dropdown =====
  const toggleMenu = (index: number) => {
    setOrders((prev) =>
      prev.map((order, i) =>
        i === index ? { ...order, showMenu: !order.showMenu } : { ...order, showMenu: false }
      )
    );
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOrders((prev) => prev.map((o) => ({ ...o, showMenu: false })));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getStatusBadge = (status: string) => {
    const color =
      status === "Delivered"
        ? "bg-green-100 text-green-700"
        : status === "Pending"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-700";
    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${color}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
       <h1 className="text-3xl font-bold text-black">📦 Orders List</h1>
      </div>

      {/* ===== Earnings & Chart Section ===== */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Earning Report</h2>
            <div className="flex space-x-2">
              {["Weekly", "Monthly", "Yearly"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`px-3 py-1 text-sm rounded-full border transition ${
                    activeTab === tab
                      ? "bg-[#C45A36] text-white border-[#C45A36]"
                      : "border-gray-200 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer>
              <BarChart data={chartData} barSize={45}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C45A36" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#C45A36" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="name" stroke="#999" tickLine={false} />
                <YAxis tickLine={false} />
                <Tooltip
                  cursor={{ fill: "rgba(196, 90, 54, 0.1)" }}
                  contentStyle={{
                    borderRadius: "10px",
                    border: "none",
                    background: "#fff",
                    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                  }}
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, "Revenue"]}
                />
                <Bar dataKey="revenue" fill="url(#barGradient)" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#FFF3EE] rounded-xl p-5 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Orders</p>
              <h2 className="text-2xl font-bold text-gray-800">{orders.length}</h2>
            </div>
            <div className="p-3 rounded-full bg-[#C45A36]/10 text-[#C45A36]">
              <ShoppingBag size={26} />
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-5 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Delivered</p>
              <h2 className="text-2xl font-bold text-gray-800">
                {orders.filter((o) => o.status === "Delivered").length}
              </h2>
            </div>
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <Truck size={26} />
            </div>
          </div>

          <div className="bg-yellow-50 rounded-xl p-5 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Pending</p>
              <h2 className="text-2xl font-bold text-gray-800">
                {orders.filter((o) => o.status === "Pending").length}
              </h2>
            </div>
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <TrendingUp size={26} />
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-5 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <h2 className="text-2xl font-bold text-gray-800">₹12,56,000</h2>
            </div>
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <DollarSign size={26} />
            </div>
          </div>
        </div>
      </div>

      {/* ===== Orders Table ===== */}
      <div className="bg-white shadow rounded-lg overflow-x-auto" ref={menuRef}>
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold">
            <tr>
              <th className="py-3 px-4 text-left">Order ID</th>
              <th className="py-3 px-4 text-left">Customer</th>
              <th className="py-3 px-4 text-left">Order Date</th>
              <th className="py-3 px-4 text-left">Delivery Date</th>
              <th className="py-3 px-4 text-left">Payment</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={i} className="border-t hover:bg-gray-50 transition-all duration-200">
                <td className="py-3 px-4 font-semibold text-[#C45A36]">{order.id}</td>
                <td className="py-3 px-4">{order.customer}</td>
                <td className="py-3 px-4">{order.orderDate}</td>
                <td className="py-3 px-4">{order.deliveryDate}</td>
                <td className="py-3 px-4">{order.payment}</td>
                <td className="py-3 px-4 font-semibold">{order.amount}</td>
                <td className="py-3 px-4">{getStatusBadge(order.status)}</td>

                <td className="py-3 px-4 text-center relative">
                  <button
                    onClick={() => toggleMenu(i)}
                    className="p-2 rounded-full hover:bg-gray-100 transition"
                  >
                    <MoreVertical size={18} />
                  </button>

                  {order.showMenu && (
                    <div className="absolute right-6 top-9 bg-white shadow-lg border rounded-lg w-36 text-left z-10 animate-fadeIn">
                      <Link
                        to={`/orders/view/${order.id}`}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-blue-600"
                      >
                        <Eye size={16} /> View
                      </Link>
                      <Link
                        to={`/orders/edit/${order.id}`}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-green-600"
                      >
                        <Edit size={16} /> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-red-600"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500">
          Showing 1 to {orders.length} of {orders.length + 16} entries
        </p>
        <div className="flex items-center gap-2">
          <button className="p-2 border rounded-lg text-gray-600 hover:bg-gray-100">
            <ChevronLeft size={16} />
          </button>
          <button className="px-3 py-1 border rounded-lg bg-[#C45A36] text-white">1</button>
          <button className="px-3 py-1 border rounded-lg hover:bg-gray-100">2</button>
          <button className="p-2 border rounded-lg text-gray-600 hover:bg-gray-100">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
