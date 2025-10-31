// src/pages/OrderDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  CheckCircle,
  Package,
  Truck,
  Home,
  CreditCard,
  Download,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// ================== Interfaces ==================
interface OrderItem {
  name: string;
  size: string;
  quantity: number;
  price: number;
  tax: number;
  status: string;
  image: string;
}

interface Customer {
  name: string;
  customerId: string;
  email: string;
  phone: string;
  paymentMode: string;
  shippingAddress: string;
  billingAddress: string;
  paymentCard: string;
  profileImage: string;
}

interface TimelineStep {
  title: string;
  description: string;
  date: string;
  time: string;
  icon: string;
  status: string;
}

interface Order {
  orderNumber: string;
  subtotal: number;
  discount: number;
  salesTax: number;
  total: number;
  items: OrderItem[];
  customer: Customer;
  timeline: TimelineStep[];
}

// ================== Component ==================
const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [orderData, setOrderData] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Download Invoice PDF
  const handleDownloadInvoice = () => {
    if (!orderData) return;

    const doc = new jsPDF();

    // CraftiCrazy Logo (optional — place logo in public folder)
    // const logoUrl = "/crafticrazy-logo.png";
    // doc.addImage(logoUrl, "PNG", 160, 10, 40, 20);

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("CraftiCrazy - Invoice", 14, 20);
    doc.setFont("helvetica", "normal");

    // Order Info
    doc.setFontSize(12);
    doc.text(`Order Number: ${orderData.orderNumber}`, 14, 30);
    doc.text(`Customer Name: ${orderData.customer.name}`, 14, 38);
    doc.text(`Email: ${orderData.customer.email}`, 14, 46);
    doc.text(`Phone: ${orderData.customer.phone}`, 14, 54);
    doc.text(`Date: ${orderData.timeline[0].date}`, 14, 62);

    // Table
    const tableColumn = ["Product", "Size", "Qty", "Price", "Tax", "Total"];
    const tableRows = orderData.items.map((item) => {
      const total = item.price * item.quantity + item.tax;
      return [
        item.name,
        item.size,
        item.quantity.toString(),
        `₹${item.price}`,
        `₹${item.tax}`,
        `₹${total.toFixed(2)}`,
      ];
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 70,
      theme: "grid",
      headStyles: { fillColor: [132, 94, 247] },
      styles: { fontSize: 10 },
    });

    // Totals Section
    let finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFont("helvetica", "normal");
    doc.text(`Subtotal: ₹${orderData.subtotal}`, 14, finalY);
    doc.text(`Discount: ₹${orderData.discount}`, 14, finalY + 8);
    doc.text(`Sales Tax: ₹${orderData.salesTax}`, 14, finalY + 16);
    doc.setFont("helvetica", "bold");
    doc.text(`Total: ₹${orderData.total}`, 14, finalY + 26);

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(130, 130, 130);
    doc.text(
      "Thank you for shopping with CraftiCrazy! Visit us again 💜",
      14,
      finalY + 40
    );

    // Save PDF
    doc.save(`Invoice_${orderData.orderNumber}.pdf`);
  };

  // ✅ Fallback Static Data
  const staticData: Order = {
    orderNumber: id || "#CRFT-24561",
    subtotal: 4580,
    discount: 320,
    salesTax: 220,
    total: 4480,
    items: [
      {
        name: "Handcrafted Bracelet",
        size: "Medium",
        quantity: 1,
        price: 1890,
        tax: 50,
        status: "Ready",
        image: "http://localhost:5173/bracelet10-6.jpg",
      },
      {
        name: "Resin Wall Clock",
        size: "Large",
        quantity: 1,
        price: 2450,
        tax: 90,
        status: "Packaging",
        image: "http://localhost:5173/clock2-2.jpg",
      },
      {
        name: "Keychain",
        size: "Standard",
        quantity: 2,
        price: 720,
        tax: 20,
        status: "Ready",
        image: "http://localhost:5173/keychain1-1.jpg",
      },
    ],
    customer: {
      name: "Vaibhavi Tingane",
      customerId: "#CRAFT1007",
      email: "vaibhavitingane07@gmail.com",
      phone: "+91 9322824718",
      paymentMode: "Online (Razorpay)",
      shippingAddress:
        "Plot 23, Shivaji Nagar, Nagpur, Maharashtra, India - 440010",
      billingAddress:
        "Plot 23, Shivaji Nagar, Nagpur, Maharashtra, India - 440010",
      paymentCard: "UPI - vaibhavitingane07@oksbi",
      profileImage: "http://localhost:5173/logo.png",
    },
    timeline: [
      {
        title: "Order Placed",
        description: "Order received successfully.",
        date: "Oct 12, 2025",
        time: "10:15 AM",
        icon: "CheckCircle",
        status: "completed",
      },
      {
        title: "Payment Confirmed",
        description: "Paid via Razorpay (Online)",
        date: "Oct 12, 2025",
        time: "10:18 AM",
        icon: "CreditCard",
        status: "completed",
      },
      {
        title: "Craft Preparation Started",
        description: "Artisan started working on your custom design.",
        date: "Oct 13, 2025",
        time: "09:00 AM",
        icon: "Package",
        status: "completed",
      },
      {
        title: "Quality Check & Packing",
        description: "Product carefully checked and packed.",
        date: "Oct 14, 2025",
        time: "11:30 AM",
        icon: "Package",
        status: "completed",
      },
      {
        title: "Dispatched for Delivery",
        description: "Shipped via Delhivery Express",
        date: "Oct 14, 2025",
        time: "05:45 PM",
        icon: "Truck",
        status: "completed",
      },
      {
        title: "Delivered Successfully",
        description: "Delivered to customer’s address",
        date: "Oct 16, 2025",
        time: "04:20 PM",
        icon: "Home",
        status: "pending",
      },
    ],
  };

  // 🔹 Fetch Order or Use Fallback
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/orders/${id}`);
        if (!res.ok) throw new Error("Failed to fetch order");
        const data = await res.json();
        setOrderData(data);
      } catch (error) {
        console.warn("⚠️ Using fallback static data:", error);
        setOrderData(staticData);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading)
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  if (!orderData)
    return (
      <div className="text-center py-10 text-red-500">No order found.</div>
    );

  // ================== UI RENDER ==================
  return (
    <div className="max-w-7xl mx-auto p-8 bg-white rounded-2xl shadow border border-gray-200">
      {/* ---------- Header ---------- */}
      <div className="flex justify-between items-center border-b pb-5 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Order Number{" "}
          <span className="text-gray-500">{orderData.orderNumber}</span>
        </h2>
        <button
          onClick={handleDownloadInvoice}
          className="flex items-center gap-2 bg-gradient-to-r from-[#845EF7] to-[#B197FC] text-white text-sm px-5 py-2.5 rounded-lg shadow-md hover:shadow-[0_0_15px_#A78BFA] transition-all duration-300"
        >
          <Download className="w-4 h-4" />
          Download Invoice
        </button>
      </div>

      {/* ---------- Main Layout ---------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-8">
          {/* ✅ Order Items Table */}
          <div className="overflow-x-auto border rounded-lg shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="p-4 text-left">Product Name & Size</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Quantity</th>
                  <th className="p-4 text-center">Price</th>
                  <th className="p-4 text-center">Tax</th>
                  <th className="p-4 text-center">Amount</th>
                </tr>
              </thead>
              <tbody>
                {orderData.items.map((item, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50 transition">
                    <td className="p-4">
                      <Link
                        to={`/products/${encodeURIComponent(item.name)}`}
                        className="flex items-center gap-3 group"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-md object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div>
                          <p className="font-medium text-gray-800 group-hover:text-indigo-600 transition">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Size: {item.size}
                          </p>
                        </div>
                      </Link>
                    </td>
                    <td className="text-center p-4">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          item.status === "Ready"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Shipped"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="text-center p-4">{item.quantity}</td>
                    <td className="text-center p-4">₹{item.price}</td>
                    <td className="text-center p-4">₹{item.tax}</td>
                    <td className="text-center p-4 font-semibold text-gray-800">
                      ₹{(item.price * item.quantity + item.tax).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ✅ Timeline */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Order Status
            </h3>
            <div className="space-y-3">
              {orderData.timeline.map((step, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-gray-50 border rounded-lg p-4"
                >
                  {step.icon === "CheckCircle" && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  {step.icon === "CreditCard" && (
                    <CreditCard className="w-5 h-5 text-blue-500" />
                  )}
                  {step.icon === "Package" && (
                    <Package className="w-5 h-5 text-yellow-500" />
                  )}
                  {step.icon === "Truck" && (
                    <Truck className="w-5 h-5 text-purple-500" />
                  )}
                  {step.icon === "Home" && (
                    <Home className="w-5 h-5 text-pink-500" />
                  )}
                  <div>
                    <p className="font-semibold text-gray-800">{step.title}</p>
                    <p className="text-sm text-gray-600">{step.description}</p>
                    <p className="text-xs text-gray-400">
                      {step.date}, {step.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          {/* ✅ Customer Details */}
          <div className="border rounded-lg p-5 bg-gray-50 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4 text-lg">
              Customer Details
            </h3>

            <div className="flex items-center gap-4 mb-5">
              <img
                src={orderData.customer.profileImage}
                alt={orderData.customer.name}
                className="w-16 h-16 rounded-full object-cover border"
              />
              <div>
                <p className="font-semibold text-gray-800 text-base">
                  {orderData.customer.name}
                </p>
                <p className="text-xs text-gray-500">
                  Customer ID: {orderData.customer.customerId}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong className="text-gray-800 w-32 inline-block">
                  Payment Mode:
                </strong>
                {orderData.customer.paymentMode}
              </p>
              <p>
                <strong className="text-gray-800 w-32 inline-block">
                  Phone:
                </strong>
                {orderData.customer.phone}
              </p>
              <p>
                <strong className="text-gray-800 w-32 inline-block">
                  Email:
                </strong>
                {orderData.customer.email}
              </p>
            </div>
          </div>

          {/* ✅ Checkout Summary */}
          <div className="border rounded-lg p-5 bg-gray-50 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-3">
              Checkout Summary
            </h3>
            <div className="text-sm text-gray-700 mb-3 space-y-1">
              {orderData.items.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between border-b border-dashed border-gray-200 pb-1"
                >
                  <span>{item.name}</span>
                  <span>
                    ₹{(item.price * item.quantity + item.tax).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>Subtotal:</span>
              <span>₹{orderData.subtotal}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>Discount:</span>
              <span>-₹{orderData.discount}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>Sales Tax:</span>
              <span>₹{orderData.salesTax}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-semibold text-base">
              <span>Total:</span>
              <span>₹{orderData.total}</span>
            </div>
          </div>

          {/* ✅ Shipping Address */}
          <div className="border rounded-lg p-5 bg-gray-50 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-2">
              Shipping Address
            </h3>
            <p className="text-sm text-gray-700">
              {orderData.customer.shippingAddress}
            </p>
          </div>

          {/* ✅ Billing Details */}
          <div className="border rounded-lg p-5 bg-gray-50 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-2">Billing Details</h3>
            <p className="text-sm text-gray-700 mb-1">
              {orderData.customer.billingAddress}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Payment:</strong> {orderData.customer.paymentCard}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
