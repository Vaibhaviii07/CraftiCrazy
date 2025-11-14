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
      setOrders(Array.isArray(data) ? data : []);
    } catch {
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      await axios.patch(
        `http://localhost:8000/api/order/updateStatus/${orderId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      fetchOrders();
    } catch {
      console.log("Status update failed");
    }
  };

  const chartData = orders.map((order) => ({
    date: new Date(order.createdAt).toLocaleDateString(),
    totalAmount: order.totalAmount,
  }));

  if (loading) return <div className="text-center mt-10 text-lg">Loading orders...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  // badge classes
  const statusClass = (status: string) =>
    status === "Delivered"
      ? "bg-green-100 text-green-700 border-green-300"
      : status === "Shipped"
      ? "bg-yellow-100 text-yellow-700 border-yellow-300"
      : status === "Cancelled"
      ? "bg-red-100 text-red-700 border-red-300"
      : "bg-gray-100 text-gray-700 border-gray-300";

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col gap-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">📦 Orders Dashboard</h2>
      <p className="text-gray-600 text-sm mb-4">Monitor sales, status & update progress.</p>

      {/* Chart */}
      <div className="w-full bg-white shadow rounded-2xl p-6 border border-gray-100">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Revenue Overview</h3>
        <div className="w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fill: "#555" }} />
              <YAxis tick={{ fill: "#555" }} />
              <Tooltip />
              <Bar dataKey="totalAmount" fill="#16a34a" barSize={45} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow rounded-2xl p-6 border border-gray-100 overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">All Orders</h3>

        <table className="w-full text-sm border-separate border-spacing-y-1">
          <thead className="text-gray-600 uppercase text-xs tracking-wide">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Payment</th>
              <th className="px-4 py-2">Items</th>
              <th className="px-4 py-2">Update</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr
                  key={order._id}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-700">{order._id}</td>
                  <td className="px-4 py-3">{new Date(order.createdAt).toLocaleString()}</td>

                  <td className="px-4 py-3 font-semibold text-green-600">
                    ₹{order.totalAmount.toFixed(2)}
                  </td>

                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${statusClass(order.orderStatus)}`}>
                      {order.orderStatus}
                    </span>
                  </td>

                  <td className="px-4 py-3">{order.transactionStatus}</td>

                  <td className="px-4 py-3 text-gray-700">
                    {order.items?.length > 0 ? (
                      <ul className="list-disc list-inside">
                        {order.items.map((item, i) => (
                          <li key={i}>{item.name} x{item.quantity}</li>
                        ))}
                      </ul>
                    ) : "No items"}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex gap-1 flex-wrap">
                      {["Pending", "Shipped", "Delivered", "Cancelled"].map((status) => (
                        <button
                          key={status}
                          onClick={() => updateOrderStatus(order._id, status)}
                          className={`text-xs px-2 py-1 rounded border hover:scale-105 transition
                          ${statusClass(status)}`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500">
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
