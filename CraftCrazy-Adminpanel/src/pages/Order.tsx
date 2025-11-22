import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  totalAmount: number;
  createdAt: string;
  orderStatus: string;
  transactionStatus: string;
  items: OrderItem[];
}

const Order: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/order/getOrder`, {
        withCredentials: true,
      });
      const { data } = res.data;
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        console.warn("Unexpected response structure:", data);
        setOrders([]);
      }
    } catch (err: any) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Transform data for bar chart
  const chartData = orders.map((order) => ({
    date: new Date(order.createdAt).toLocaleDateString(),
    totalAmount: order.totalAmount,
  }));

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading orders...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📦 Order Summary</h2>

      {/* Chart Section */}
      <div className="w-full bg-white shadow-md rounded-2xl p-6 border border-gray-100">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Revenue Overview</h3>
        <div className="w-full h-[350px]">
          {/* ✅ Fixed container sizing issue with ResponsiveContainer */}
          <ResponsiveContainer width="100%" height="100%" minWidth={300} minHeight={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fill: "#555" }} />
              <YAxis tick={{ fill: "#555" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                }}
              />
              <Bar dataKey="totalAmount" fill="#4CAF50" barSize={40} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 overflow-x-auto">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">All Orders</h3>
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{order._id}</td>
                  <td className="px-4 py-3">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-semibold text-green-600">
                    ₹{order.totalAmount.toFixed(2)}
                  </td>
                  <td
                    className={`px-4 py-3 font-medium ${
                      order.orderStatus === "Delivered"
                        ? "text-green-600"
                        : order.orderStatus === "Pending"
                        ? "text-yellow-500"
                        : "text-gray-600"
                    }`}
                  >
                    {order.orderStatus}
                  </td>
                  <td
                    className={`px-4 py-3 font-medium ${
                      order.transactionStatus === "Payment Succeed"
                        ? "text-green-600"
                        : order.transactionStatus === "Payment Pending"
                        ? "text-yellow-500"
                        : "text-red-600"
                    }`}
                  >
                    {order.transactionStatus}
                  </td>
                  <td className="px-4 py-3">
                    {order.items && order.items.length > 0 ? (
                      <ul className="list-disc list-inside">
                        {order.items.map((item, i) => (
                          <li key={i}>
                            {item.name} x{item.quantity}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-400 italic">No items</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
