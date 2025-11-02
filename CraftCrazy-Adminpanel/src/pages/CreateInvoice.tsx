import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Trash2,
  CreditCard,
  QrCode,
  Eye,
  Share2,
} from "lucide-react";

interface Product {
  name: string;
  description: string;
  quantity: number;
  price: number;
}

const CreateInvoice: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    { name: "", description: "", quantity: 1, price: 0 },
  ]);

  const [billingFrom, setBillingFrom] = useState({
    name: "CraftiCrazy Technologies",
    address: "",
    email: "",
    phone: "",
  });

  const [billingTo, setBillingTo] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    currency: "₹",
  });

  const [invoiceDetails, setInvoiceDetails] = useState({
    invoiceId: `#INV${Date.now().toString().slice(-6)}`,
    issueDate: new Date().toISOString().split("T")[0],
    dueDate: "",
  });

  const [paymentMode, setPaymentMode] = useState<"upi" | "card">("upi");
  const [cardDetails, setCardDetails] = useState({
    holder: "",
    number: "",
    otp: "",
  });

  const [showShareMenu, setShowShareMenu] = useState(false);

  // 🧮 Totals calculation
  const { subtotal, discount, vat, total } = useMemo(() => {
    const subtotal = products.reduce((acc, p) => acc + p.price * p.quantity, 0);
    const discount = subtotal * 0.1;
    const vat = subtotal * 0.05;
    const total = subtotal - discount + vat;
    return { subtotal, discount, vat, total };
  }, [products]);

  //  Add product
  const addProduct = () => {
    setProducts((prev) => [
      ...prev,
      { name: "", description: "", quantity: 1, price: 0 },
    ]);
  };

  // Remove product
  const removeProduct = (index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  //  Update product
  const updateProduct = (
    index: number,
    field: keyof Product,
    value: string | number
  ) => {
    setProducts((prev) =>
      prev.map((p, i) =>
        i === index
          ? {
              ...p,
              [field]:
                field === "quantity" || field === "price" ? Number(value) : value,
            }
          : p
      )
    );
  };

  //  Preview invoice
  const handlePreviewInvoice = () => {
    const invoiceData = {
      products,
      billingFrom,
      billingTo,
      invoiceDetails,
      total,
    };
    localStorage.setItem("invoicePreview", JSON.stringify(invoiceData));
    window.open("/invoice-preview", "_blank");
  };

  // Share invoice (multi-platform)
  const handleShareOption = (platform: string) => {
    const shareUrl = window.location.href;
    const shareText = "🧾 Check out this invoice from CraftiCrazy!";

    switch (platform) {
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
          "_blank"
        );
        break;
      case "email":
        window.open(
          `mailto:?subject=Invoice%20from%20CraftiCrazy&body=${encodeURIComponent(
            shareText + " " + shareUrl
          )}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            shareUrl
          )}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            shareText
          )}&url=${encodeURIComponent(shareUrl)}`,
          "_blank"
        );
        break;
      case "copy":
        navigator.clipboard.writeText(shareUrl);
        alert("🔗 Invoice link copied to clipboard!");
        break;
    }

    setShowShareMenu(false);
  };

  return (
    <motion.div
      className="p-6 bg-gray-50 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#2a0a4b]">🧾 Create Invoice</h1>
        <button className="bg-[#845EF7] text-white px-4 py-2 rounded-lg hover:bg-[#6f4ad8]">
          Save as PDF
        </button>
      </div>

      {/* MAIN LAYOUT */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          {/* Billing Info */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Billing From */}
            <div className="bg-white p-5 rounded-xl border shadow-sm">
              <h2 className="font-semibold text-gray-700 mb-3">Billing From</h2>
              {["name", "address", "email", "phone"].map((field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={(billingFrom as any)[field]}
                  onChange={(e) =>
                    setBillingFrom({ ...billingFrom, [field]: e.target.value })
                  }
                  className="w-full mb-2 p-2 border rounded-lg text-sm"
                />
              ))}
            </div>

            {/* Billing To */}
            <div className="bg-white p-5 rounded-xl border shadow-sm">
              <h2 className="font-semibold text-gray-700 mb-3">Billing To</h2>
              {["name", "address", "email", "phone"].map((field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={(billingTo as any)[field]}
                  onChange={(e) =>
                    setBillingTo({ ...billingTo, [field]: e.target.value })
                  }
                  className="w-full mb-2 p-2 border rounded-lg text-sm"
                />
              ))}
              <select
                value={billingTo.currency}
                onChange={(e) =>
                  setBillingTo({ ...billingTo, currency: e.target.value })
                }
                className="w-full p-2 border rounded-lg text-sm"
              >
                <option value="₹">INR (₹)</option>
                <option value="$">USD ($)</option>
                <option value="€">EUR (€)</option>
              </select>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="bg-white p-5 rounded-xl border shadow-sm grid md:grid-cols-3 gap-6">
            <div>
              <label className="text-sm text-gray-500">Invoice ID</label>
              <input
                type="text"
                value={invoiceDetails.invoiceId}
                readOnly
                className="w-full p-2 border rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500">Issue Date</label>
              <input
                type="date"
                value={invoiceDetails.issueDate}
                onChange={(e) =>
                  setInvoiceDetails({
                    ...invoiceDetails,
                    issueDate: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500">Due Date</label>
              <input
                type="date"
                value={invoiceDetails.dueDate}
                onChange={(e) =>
                  setInvoiceDetails({
                    ...invoiceDetails,
                    dueDate: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-lg text-sm"
              />
            </div>
          </div>

          {/* Product Table */}
          <div className="bg-white p-5 rounded-xl border shadow-sm overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-gray-600 border-b">
                <tr>
                  <th className="text-left py-2">Product Name</th>
                  <th className="text-left py-2">Description</th>
                  <th className="text-center py-2">Qty</th>
                  <th className="text-center py-2">Price</th>
                  <th className="text-center py-2">Total</th>
                  <th className="text-center py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={i} className="border-b">
                    <td>
                      <input
                        type="text"
                        value={p.name}
                        onChange={(e) => updateProduct(i, "name", e.target.value)}
                        placeholder="Product name"
                        className="w-full p-2 border rounded-lg text-sm"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={p.description}
                        onChange={(e) =>
                          updateProduct(i, "description", e.target.value)
                        }
                        placeholder="Description"
                        className="w-full p-2 border rounded-lg text-sm"
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="number"
                        value={p.quantity}
                        min={1}
                        onChange={(e) =>
                          updateProduct(i, "quantity", e.target.value)
                        }
                        className="w-16 p-2 border rounded-lg text-center text-sm"
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="number"
                        value={p.price}
                        min={0}
                        onChange={(e) =>
                          updateProduct(i, "price", e.target.value)
                        }
                        className="w-24 p-2 border rounded-lg text-center text-sm"
                      />
                    </td>
                    <td className="text-center font-medium">
                      {billingTo.currency}
                      {(p.price * p.quantity).toFixed(2)}
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => removeProduct(i)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              onClick={addProduct}
              className="mt-3 flex items-center gap-2 text-[#845EF7] hover:underline"
            >
              <Plus size={16} /> Add Product
            </button>
          </div>

          {/* Notes */}
          <div className="bg-white p-5 rounded-xl border shadow-sm">
            <h2 className="font-semibold text-gray-700 mb-3">Notes</h2>
            <textarea
              rows={4}
              placeholder="Add any important invoice note..."
              className="w-full p-3 border rounded-lg text-sm"
            ></textarea>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          {/* Payment Mode */}
          <div className="bg-white p-5 rounded-xl border shadow-sm">
            <h2 className="font-semibold text-gray-700 mb-3">Mode of Payment</h2>
            <div className="flex gap-3 mb-3">
              <button
                onClick={() => setPaymentMode("upi")}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg border ${
                  paymentMode === "upi"
                    ? "bg-[#845EF7] text-white border-[#845EF7]"
                    : "bg-white text-gray-600"
                }`}
              >
                <QrCode size={16} /> UPI
              </button>
              <button
                onClick={() => setPaymentMode("card")}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg border ${
                  paymentMode === "card"
                    ? "bg-[#845EF7] text-white border-[#845EF7]"
                    : "bg-white text-gray-600"
                }`}
              >
                <CreditCard size={16} /> Credit/Debit Card
              </button>
            </div>

            {paymentMode === "card" ? (
              <>
                <input
                  type="text"
                  placeholder="Card Holder Name"
                  value={cardDetails.holder}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, holder: e.target.value })
                  }
                  className="w-full mb-2 p-2 border rounded-lg text-sm"
                />
                <input
                  type="text"
                  placeholder="1234 5678 9087 XXXX"
                  value={cardDetails.number}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, number: e.target.value })
                  }
                  className="w-full mb-2 p-2 border rounded-lg text-sm"
                />
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={cardDetails.otp}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, otp: e.target.value })
                  }
                  className="w-full mb-2 p-2 border rounded-lg text-sm"
                />
              </>
            ) : (
              <p className="text-sm text-gray-500">
                Please scan UPI QR or pay via registered UPI ID.
              </p>
            )}

            <p className="text-xs bg-green-50 text-green-700 p-2 mt-2 rounded">
              Please make sure to pay the invoice bill within 30 days.
            </p>
          </div>

          {/* Bill Summary */}
          <div className="bg-white p-5 rounded-xl border shadow-sm">
            <h2 className="font-semibold text-gray-700 mb-3">Bill Summary</h2>
            <div className="text-sm text-gray-700 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{billingTo.currency + subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount (10%):</span>
                <span>-{billingTo.currency + discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>VAT (5%):</span>
                <span>{billingTo.currency + vat.toFixed(2)}</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold text-[#4b0082]">
                <span>Total Due:</span>
                <span>{billingTo.currency + total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER BUTTONS */}
      <div className="flex justify-end gap-4 mt-8">
        {/* Preview Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePreviewInvoice}
          className="flex items-center gap-2 bg-gray-100 border border-gray-300 text-gray-800 px-5 py-2.5 rounded-lg shadow-sm hover:bg-gray-200 hover:border-gray-400 transition-all duration-200 active:scale-95"
        >
          <Eye size={18} />
          Preview
        </motion.button>

        {/* Share Invoice Button with dropdown */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="flex items-center gap-2 bg-gradient-to-r from-[#845EF7] to-[#6f4ad8] text-white px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg hover:from-[#7d52f5] hover:to-[#5b3dd0] transition-all duration-200 active:scale-95"
          >
            <Share2 size={18} />
            Share Invoice
          </motion.button>

          {showShareMenu && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-48 p-2"
            >
              <button
                onClick={() => handleShareOption("copy")}
                className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md gap-2 text-sm"
              >
                🔗 Copy Link
              </button>
              <button
                onClick={() => handleShareOption("whatsapp")}
                className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-green-50 rounded-md gap-2 text-sm"
              >
                💬 WhatsApp
              </button>
              <button
                onClick={() => handleShareOption("email")}
                className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md gap-2 text-sm"
              >
                📧 Email
              </button>
              <button
                onClick={() => handleShareOption("linkedin")}
                className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-sky-50 rounded-md gap-2 text-sm"
              >
                💼 LinkedIn
              </button>
              <button
                onClick={() => handleShareOption("twitter")}
                className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-indigo-50 rounded-md gap-2 text-sm"
              >
                🐦 Twitter (X)
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CreateInvoice;
