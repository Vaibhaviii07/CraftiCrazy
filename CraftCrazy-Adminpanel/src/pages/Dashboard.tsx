// src/pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Users,
  DollarSign,
  ShoppingBag,
  Activity,
  Clock,
  CalendarDays,
  CheckCircle,
  XCircle,
  TrendingUp,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// -------------------- Types --------------------
type Product = {
  name: string;
  price: string;
  quantity: number;
  category: string;
  image: string;
  stock: "In Stock" | "Out Of Stock" | "Limited Stock";
  totalSales: number;
};

type LineData = { name: string; sales: number; revenue: number };

type Deal = {
  id: number;
  title: string;
  value: string;
  status: string;
};

type ActivityItem = {
  title: string;
  details: string;
  time: string;
};

type Order = { name: string; price: string; deliveryDate: string };
type KPIs = { customers: number; revenue: number; sales: number };

// -------------------- Dashboard Component --------------------
const Dashboard: React.FC = () => {
  // Static Mock Data
  const staticKPIs: KPIs = { customers: 1250, revenue: 75230, sales: 320 };

  const staticProducts: Product[] = [
    {
      name: "Blue Ocean Resin Clock",
      price: "₹250",
      quantity: 12,
      category: "Resin Clocks",
      image: "http://localhost:5173/clock2-1.jpg",
      stock: "In Stock",
      totalSales: 130,
    },
    {
      name: "Marble Swirl Resin Coaster Set",
      price: "₹45",
      quantity: 25,
      category: "Resin Coasters",
      image: "http://localhost:5173/coaster1.jpg",
      stock: "In Stock",
      totalSales: 90,
    },
    {
      name: "Golden Leaf Resin Tray",
      price: "₹85",
      quantity: 8,
      category: "Resin Trays",
      image: "http://localhost:5173/tray1.jpg",
      stock: "Limited Stock",
      totalSales: 70,
    },
    {
      name: "Galaxy Bookmark Set",
      price: "₹30",
      quantity: 30,
      category: "Bookmarks",
      image: "http://localhost:5173/jewell11-1.jpg",
      stock: "In Stock",
      totalSales: 110,
    },
    {
      name: "Custom Resin Name Keychain",
      price: "₹20",
      quantity: 50,
      category: "Keychains",
      image: "http://localhost:5173/keychain1.jpg",
      stock: "In Stock",
      totalSales: 150,
    },
  ];

  const staticDeals: Deal[] = [
    {
      id: 1,
      title: "Diwali Special Discount",
      value: "20% OFF on all Resin Products",
      status: "Active",
    },
    {
      id: 2,
      title: "Festive Hamper Offer",
      value: "Buy 2 Hampers, Get 1 Free",
      status: "Upcoming",
    },
    {
      id: 3,
      title: "New Year Mega Sale",
      value: "Flat 30% OFF on Clocks & Frames",
      status: "Scheduled",
    },
  ];

  const staticActivities: ActivityItem[] = [
    {
      title: "New Order Placed",
      details: "Customer ordered a Blue Ocean Resin Clock.",
      time: "2 mins ago",
    },
    {
      title: "Order Status Updated",
      details: "Order #1243 marked as Delivered.",
      time: "1 hour ago",
    },
    {
      title: "New Contact Message",
      details: "User sent a query via Contact page.",
      time: "2 hours ago",
    },
  ];

  const staticOrders: Order[] = [
    { name: "Blue Ocean Resin Clock", price: "₹250", deliveryDate: "2025-10-29" },
    { name: "Golden Leaf Resin Tray", price: "₹85", deliveryDate: "2025-10-30" },
    { name: "Marble Swirl Coaster Set", price: "₹45", deliveryDate: "2025-10-31" },
    { name: "Custom Resin Name Keychain", price: "₹20", deliveryDate: "2025-11-01" },
    { name: "Floral Resin Wall Frame", price: "₹180", deliveryDate: "2025-11-03" },
  ];

  const staticLine: LineData[] = [
    { name: "Mon", sales: 40, revenue: 2000 },
    { name: "Tue", sales: 30, revenue: 1800 },
    { name: "Wed", sales: 50, revenue: 2500 },
    { name: "Thu", sales: 70, revenue: 3000 },
    { name: "Fri", sales: 60, revenue: 2800 },
    { name: "Sat", sales: 90, revenue: 4000 },
    { name: "Sun", sales: 100, revenue: 4500 },
  ];

  // -------------------- State --------------------
  const [kpis, setKpis] = useState(staticKPIs);
  const [topProducts, setTopProducts] = useState(staticProducts);
  const [recentDeals, setRecentDeals] = useState(staticDeals);
  const [activities, setActivities] = useState(staticActivities);
  const [activeOrders, setActiveOrders] = useState(staticOrders);
  const [lineData, setLineData] = useState(staticLine);
  const [lastUpdated, setLastUpdated] = useState("");
  const [nextReport, setNextReport] = useState("");

  // -------------------- Time Info --------------------
  useEffect(() => {
    const now = new Date();
    setLastUpdated(`${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")} updated`);
    const tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);
    setNextReport(
      tomorrow.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    );
  }, []);

  // -------------------- Color Map --------------------
  const colorClasses: Record<string, string> = {
    green: "bg-green-50 border-green-100",
    yellow: "bg-yellow-50 border-yellow-100",
    red: "bg-red-50 border-red-100",
    blue: "bg-blue-50 border-blue-100",
  };

  // -------------------- UI --------------------
  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 transition-all duration-300">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-white rounded-xl p-6 shadow-sm flex items-center justify-between mb-6"
      >
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Welcome back!</h2>
          <p className="text-sm text-gray-500 mt-1">
            Here’s what's happening with CraftiCrazy today.
          </p>
          <div className="mt-4 flex items-center text-xs text-gray-600 space-x-3">
            <div className="flex items-center gap-2">
              <Clock size={14} /> <span>{lastUpdated}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays size={14} /> <span>Next report: {nextReport}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="text-right">
            <p className="text-sm text-gray-500">Revenue (this month)</p>
            <p className="text-xl font-semibold text-gray-800">
              ₹{kpis.revenue.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow">
            <Activity size={28} />
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Customers", value: kpis.customers, icon: <Users />, link: "/customers" },
          { label: "Total Revenue", value: `₹${kpis.revenue.toLocaleString("en-IN")}`, icon: <DollarSign />, link: "/revenue" },
          { label: "Total Sales", value: kpis.sales, icon: <ShoppingBag />, link: "/sales" },
          { label: "Performance Rate", value: "97%", icon: <Activity />, link: "/performance" },
        ].map((kpi, idx) => (
          <Link key={idx} to={kpi.link}>
            <motion.div
              className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between h-[120px] border border-gray-100 hover:bg-gray-50 cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <div>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  {kpi.label} <span className="ml-1 text-indigo-600 font-bold text-sm">→</span>
                </p>
                <p className="text-xl font-semibold text-gray-800">{kpi.value}</p>
              </div>
              <div className="p-3 rounded-md bg-indigo-50 text-indigo-600">{kpi.icon}</div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Chart + Products + Deals */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          {/* Sales Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Sales & Revenue Trend
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#4ade80" strokeWidth={2} />
                <Line type="monotone" dataKey="revenue" stroke="#60a5fa" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top Products Table */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Top Selling Products
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full table-auto text-sm text-gray-600">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-left">#</th>
                    <th className="py-3 px-4 text-left">Product</th>
                    <th className="py-3 px-4 text-left">Category</th>
                    <th className="py-3 px-4 text-left">Stock</th>
                    <th className="py-3 px-4 text-left">Total Sales</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((p, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="py-3 px-4">{idx + 1}</td>
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                        <span className="font-medium text-gray-800">{p.name}</span>
                      </td>
                      <td className="py-3 px-4">{p.category}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-full font-semibold ${
                            p.stock === "In Stock"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {p.stock}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-800">
                        {p.totalSales.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Deals Table */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Deals Status
            </h3>
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-4">Deal Title</th>
                  <th className="py-2 px-4">Value</th>
                  <th className="py-2 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentDeals.map((deal) => (
                  <tr key={deal.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4">{deal.title}</td>
                    <td className="py-2 px-4">{deal.value}</td>
                    <td className="py-2 px-4">{deal.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Deals Summary */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-6 space-y-6"
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Deals Summary</h2>
              <p className="text-sm text-gray-500">4,289 total deals</p>
              <div className="flex items-center mt-1 text-green-600 text-sm font-medium">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>1.02% up from last week</span>
              </div>
            </div>

            {[
              {
                icon: <CheckCircle className="text-green-600 w-6 h-6" />,
                color: "green",
                label: "Successful Deals",
                count: "987",
              },
              {
                icon: <Clock className="text-yellow-600 w-6 h-6" />,
                color: "yellow",
                label: "Pending Deals",
                count: "1,073",
              },
              {
                icon: <XCircle className="text-red-600 w-6 h-6" />,
                color: "red",
                label: "Rejected Deals",
                count: "1,674",
              },
              {
                icon: <Activity className="text-blue-600 w-6 h-6" />,
                color: "blue",
                label: "Active Deals",
                count: "553",
              },
            ].map((d, i) => (
              <div
                key={i}
                className={`flex items-center justify-between border-l-4 p-3 rounded-lg shadow-sm ${colorClasses[d.color]}`}
              >
                <div className="flex items-center space-x-3">
                  {d.icon}
                  <div>
                    <p className="font-semibold text-gray-800">{d.label}</p>
                    <p className="text-sm text-gray-500">{d.count} deals</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Recent Activities
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              {activities.map((act, idx) => (
                <li
                  key={idx}
                  className="border-b pb-2 flex flex-col gap-0.5 hover:bg-gray-50 rounded-md px-2 py-1 transition"
                >
                  <span className="font-medium text-gray-800">{act.title}</span>
                  <span className="text-gray-500">{act.details}</span>
                  <span className="text-gray-400 text-xs mt-0.5">{act.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Active Orders */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Active Orders
            </h3>
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Price</th>
                  <th className="py-2 px-4">Delivery Date</th>
                </tr>
              </thead>
              <tbody>
                {activeOrders.map((order, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="py-2 px-4">{order.name}</td>
                    <td className="py-2 px-4">{order.price}</td>
                    <td className="py-2 px-4">{order.deliveryDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
