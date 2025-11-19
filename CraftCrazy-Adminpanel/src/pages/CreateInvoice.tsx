// src/components/CreateInvoiceYNEX.tsx
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Trash2,
  Save,
  Share2,
  Eye,
  QrCode,
  CreditCard,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import toast from "react-hot-toast";

interface Product {
  name: string;
  description: string;
  quantity: number;
  price: number;
}

const YNEX_PURPLE = "#6259ca";
const YNEX_MUTED = "#5e76a6";
const BG = "#f5f7fa";

const CreateInvoice: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    { name: "Item 1", description: "Description", quantity: 1, price: 0 },
    { name: "Item 2", description: "Description", quantity: 1, price: 0 },
  ]);

  const [billingFrom, setBillingFrom] = useState({
    name: "",
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
    title: "INVOICE",
    invoiceId: `#YNX${Date.now().toString().slice(-6)}`,
    issueDate: new Date().toISOString().split("T")[0],
    dueDate: "",
  });

  const [paymentMode, setPaymentMode] = useState<"upi" | "card">("upi");
  const [showShareMenu, setShowShareMenu] = useState(false);

  const { subtotal, discount, vat, total } = useMemo(() => {
    const subtotal = products.reduce((acc, p) => acc + p.price * p.quantity, 0);
    const discount = subtotal * 0.1;
    const vat = subtotal * 0.05;
    const total = subtotal - discount + vat;
    return { subtotal, discount, vat, total };
  }, [products]);

  const addProduct = () =>
    setProducts((p) => [...p, { name: "", description: "", quantity: 1, price: 0 }]);

  const removeProduct = (index: number) =>
    setProducts((p) => p.filter((_, i) => i !== index));

  const updateProduct = (index: number, field: keyof Product, value: string | number) =>
    setProducts((prev) =>
      prev.map((r, i) =>
        i === index ? { ...r, [field]: field === "quantity" || field === "price" ? Number(value) : value } : r
      )
    );

  const inc = (i: number) => updateProduct(i, "quantity", products[i].quantity + 1);
  const dec = (i: number) => updateProduct(i, "quantity", Math.max(1, products[i].quantity - 1));

  const handlePreviewInvoice = () => {
    const invoiceData = { products, billingFrom, billingTo, invoiceDetails, total };
    localStorage.setItem("invoicePreview", JSON.stringify(invoiceData));
    window.open("/invoice-preview", "_blank");
  };

  const handleShareOption = (platform: string) => {
    const shareUrl = window.location.href;
    const shareText = `Invoice from ${billingFrom.name}`;
    switch (platform) {
      case "whatsapp":
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`, "_blank");
        break;
      case "email":
        window.open(`mailto:?subject=Invoice&body=${encodeURIComponent(shareText + " " + shareUrl)}`, "_blank");
        break;
      case "copy":
        navigator.clipboard.writeText(shareUrl);
        toast.success("🔗 Link copied to clipboard!", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
          icon: "📋",
        });
        break;
      default:
        window.open(shareUrl, "_blank");
    }
    setShowShareMenu(false);
  };

  const saveAsPDF = () => {
    const printContent = document.getElementById("print-area")?.innerHTML;
    const originalContent = document.body.innerHTML;

    if (printContent) {
      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload();
    }
  };


  return (
    <motion.div
      className="p-8 min-h-screen font-sans"
      style={{ background: BG }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-md px-3 py-1 border flex items-center gap-2">
              <input
                value={invoiceDetails.title}
                onChange={(e) => setInvoiceDetails({ ...invoiceDetails, title: e.target.value })}
                className="text-sm font-semibold outline-none"
              />
              <span className="text-xs text-gray-400">|</span>
              <input
                value={invoiceDetails.invoiceId}
                onChange={(e) => setInvoiceDetails({ ...invoiceDetails, invoiceId: e.target.value })}
                className="text-sm outline-none text-gray-600"
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold mt-4" style={{ color: YNEX_MUTED }}>
            Create Invoice
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={saveAsPDF}
            className="bg-white border px-3 py-1 rounded text-sm flex items-center gap-2 shadow-sm hover:bg-gray-50"
            style={{ color: YNEX_PURPLE }}
          >
            <Save size={14} />
            Save As PDF
          </button>
          <button className="bg-gradient-to-r from-[#845EF7] to-[#6f4ad8] text-white px-3 py-1 rounded shadow-md text-sm flex items-center gap-2">
            Save
          </button>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Billing cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-xl border shadow-sm">
              <h2 className="font-semibold text-gray-700 mb-3">Billing From</h2>
              <input className="w-full mb-2 p-2 border rounded-lg text-sm" placeholder="Name" value={billingFrom.name} onChange={(e) => setBillingFrom({ ...billingFrom, name: e.target.value })} />
              <input className="w-full mb-2 p-2 border rounded-lg text-sm" placeholder="Address" value={billingFrom.address} onChange={(e) => setBillingFrom({ ...billingFrom, address: e.target.value })} />
              <div className="flex gap-2">
                <input className="w-1/2 p-2 border rounded-lg text-sm" placeholder="Email" value={billingFrom.email} onChange={(e) => setBillingFrom({ ...billingFrom, email: e.target.value })} />
                <input className="w-1/2 p-2 border rounded-lg text-sm" placeholder="Phone" value={billingFrom.phone} onChange={(e) => setBillingFrom({ ...billingFrom, phone: e.target.value })} />
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border shadow-sm">
              <h2 className="font-semibold text-gray-700 mb-3">Billing To</h2>
              <input className="w-full mb-2 p-2 border rounded-lg text-sm" placeholder="Name" value={billingTo.name} onChange={(e) => setBillingTo({ ...billingTo, name: e.target.value })} />
              <input className="w-full mb-2 p-2 border rounded-lg text-sm" placeholder="Address" value={billingTo.address} onChange={(e) => setBillingTo({ ...billingTo, address: e.target.value })} />
              <div className="flex gap-2">
                <input className="w-1/2 p-2 border rounded-lg text-sm" placeholder="Email" value={billingTo.email} onChange={(e) => setBillingTo({ ...billingTo, email: e.target.value })} />
                <input className="w-1/2 p-2 border rounded-lg text-sm" placeholder="Phone" value={billingTo.phone} onChange={(e) => setBillingTo({ ...billingTo, phone: e.target.value })} />
              </div>
              <select value={billingTo.currency} onChange={(e) => setBillingTo({ ...billingTo, currency: e.target.value })} className="w-full p-2 border rounded-lg text-sm">
                <option value="₹">INR (₹)</option>
                <option value="$">USD ($)</option>
                <option value="€">EUR (€)</option>
              </select>
            </div>
          </div>

          {/* Invoice details */}
          <div className="bg-white p-4 rounded-xl border shadow-sm grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-gray-500">Invoice ID</label>
              <input className="w-full p-2 border rounded text-sm" value={invoiceDetails.invoiceId} onChange={(e) => setInvoiceDetails({ ...invoiceDetails, invoiceId: e.target.value })} />
            </div>
            <div>
              <label className="text-xs text-gray-500">Issue Date</label>
              <input type="date" className="w-full p-2 border rounded text-sm" value={invoiceDetails.issueDate} onChange={(e) => setInvoiceDetails({ ...invoiceDetails, issueDate: e.target.value })} />
            </div>
            <div>
              <label className="text-xs text-gray-500">Due Date</label>
              <input type="date" className="w-full p-2 border rounded text-sm" value={invoiceDetails.dueDate} onChange={(e) => setInvoiceDetails({ ...invoiceDetails, dueDate: e.target.value })} />
            </div>
          </div>

          {/* Product table */}
          <div className="bg-white p-5 rounded-xl border shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium text-gray-600">Products</h3>
              <button onClick={addProduct} className="text-[#845EF7] flex items-center gap-2 text-sm">
                <Plus size={14} /> Add Product
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-gray-500 border-b">
                  <tr>
                    <th className="text-left py-2">Product</th>
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
                      <td className="py-2">
                        <input value={p.name} onChange={(e) => updateProduct(i, "name", e.target.value)} placeholder="Product name" className="w-full p-2 border rounded text-sm" />
                      </td>
                      <td className="py-2">
                        <input value={p.description} onChange={(e) => updateProduct(i, "description", e.target.value)} placeholder="Description" className="w-full p-2 border rounded text-sm" />
                      </td>
                      <td className="py-2 text-center">
                        <div className="inline-flex items-center border rounded overflow-hidden">
                          <button onClick={() => dec(i)} className="px-2 py-1">
                            <ChevronDown size={14} />
                          </button>
                          <input type="number" value={p.quantity} min={1} onChange={(e) => updateProduct(i, "quantity", e.target.value)} className="w-16 text-center p-1 text-sm outline-none" />
                          <button onClick={() => inc(i)} className="px-2 py-1">
                            <ChevronUp size={14} />
                          </button>
                        </div>
                      </td>
                      <td className="py-2 text-center">
                        <input type="number" value={p.price} min={0} onChange={(e) => updateProduct(i, "price", e.target.value)} className="w-24 p-2 border rounded text-center text-sm" />
                      </td>
                      <td className="py-2 text-center font-medium">
                        {billingTo.currency}
                        {(p.price * p.quantity).toFixed(2)}
                      </td>
                      <td className="py-2 text-center">
                        <button onClick={() => removeProduct(i)} className="p-2 text-red-500 hover:bg-red-50 rounded-full">
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4">
              <label className="text-sm text-gray-500">Notes</label>
              <textarea className="w-full p-3 mt-2 border rounded text-sm" rows={3} placeholder="Add any important invoice notes..." />
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <aside className="space-y-6">
          <div className="bg-white p-4 rounded-xl border shadow-sm w-full">
            <h3 className="text-sm font-medium text-gray-600 mb-3">Mode Of Payment</h3>
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setPaymentMode("upi")}
                className={`flex-1 px-3 py-1 rounded text-sm border ${paymentMode === "upi" ? "bg-[#845EF7] text-white border-[#845EF7]" : "bg-white text-gray-600"
                  }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <QrCode size={14} /> UPI
                </div>
              </button>
              <button
                onClick={() => setPaymentMode("card")}
                className={`flex-1 px-3 py-1 rounded text-sm border ${paymentMode === "card" ? "bg-[#845EF7] text-white border-[#845EF7]" : "bg-white text-gray-600"
                  }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <CreditCard size={14} /> Card
                </div>
              </button>
            </div>

            {paymentMode === "card" ? (
              <div className="space-y-2">
                <input className="w-full p-2 border rounded text-sm" placeholder="Card Holder Name" />
                <input className="w-full p-2 border rounded text-sm" placeholder="1234 5678 9087 XXXX" />
                <input className="w-full p-2 border rounded text-sm" placeholder="Enter OTP" />
              </div>
            ) : (
              <p className="text-sm text-gray-500">Please scan UPI QR or pay via registered UPI ID.</p>
            )}

            <p className="text-xs bg-green-50 text-green-700 p-2 mt-3 rounded">
              Please make sure to pay the invoice bill within 30 days.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border shadow-sm w-full">
            <h3 className="text-sm font-medium text-gray-600 mb-3">Bill Summary</h3>
            <div className="text-sm text-gray-700 space-y-2">
              <div className="flex justify-between">
                <span>Sub Total</span>
                <span className="px-3 py-1 bg-gray-50 rounded text-sm">{billingTo.currency + subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Avail Discount (10%)</span>
                <span className="px-3 py-1 bg-gray-50 rounded text-sm">-{billingTo.currency + discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Coupon Discount</span>
                <span className="px-3 py-1 bg-gray-50 rounded text-sm">{billingTo.currency + "0.00"}</span>
              </div>
              <div className="flex justify-between">
                <span>Vat (5%)</span>
                <span className="px-3 py-1 bg-gray-50 rounded text-sm">{billingTo.currency + vat.toFixed(2)}</span>
              </div>

              <div className="flex justify-between font-semibold text-[#4b0082] mt-3">
                <span>Total Due</span>
                <span className="px-3 py-1 bg-[#f3eaff] rounded">{billingTo.currency + total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Footer actions */}
      <div className="flex justify-end gap-4 mt-8">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handlePreviewInvoice}
          className="flex items-center gap-2 bg-gradient-to-r from-[#845EF7] to-[#6f4ad8] text-white px-4 py-2 rounded-lg text-sm shadow-md"
        >
          <Eye size={14} /> Preview Invoice
        </motion.button>

        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="flex items-center gap-2 bg-white border text-gray-600 px-4 py-2 rounded-lg text-sm shadow-sm"
          >
            <Share2 size={14} /> Share
          </motion.button>

          {showShareMenu && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg text-sm"
            >
              <button onClick={() => handleShareOption("whatsapp")} className="block px-4 py-2 hover:bg-gray-100 w-full text-left">
                WhatsApp
              </button>
              <button onClick={() => handleShareOption("email")} className="block px-4 py-2 hover:bg-gray-100 w-full text-left">
                Email
              </button>
              <button onClick={() => handleShareOption("copy")} className="block px-4 py-2 hover:bg-gray-100 w-full text-left">
                Copy Link
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* PRINTABLE INVOICE VIEW */}
      <div
        id="print-area"
        className="hidden print:block px-12 py-10 text-black font-sans text-[14px]"
      >

        {/* HEADER BRANDING */}
        <div className="flex justify-between items-center border-b-2 pb-3 mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-wide">{billingFrom.name}</h1>
            <p className="text-sm text-gray-600">{billingFrom.address}</p>
            <p className="text-sm text-gray-600">{billingFrom.email}</p>
            <p className="text-sm text-gray-600">{billingFrom.phone}</p>
          </div>

          <div className="text-right">
            <h2 className="text-3xl font-semibold">INVOICE</h2>
            <p className="text-sm mt-1">Invoice ID: <strong>{invoiceDetails.invoiceId}</strong></p>
            <p className="text-sm">Issue Date: {invoiceDetails.issueDate}</p>
            <p className="text-sm">Due Date: {invoiceDetails.dueDate || "-"}</p>
          </div>
        </div>

        {/* CUSTOMER DETAILS */}
        <div className="flex justify-between mb-8">
          <div className="w-1/2">
            <h3 className="font-semibold text-gray-700 mb-1">Bill To:</h3>
            <p>{billingTo.name}</p>
            <p>{billingTo.address}</p>
            <p>{billingTo.email}</p>
            <p>{billingTo.phone}</p>
          </div>

          <div className="w-1/2 text-right">
            <h3 className="font-semibold text-gray-700 mb-1">Payment Method:</h3>
            <p>{billingTo.currency ? "Online / UPI" : "Cash"}</p>
          </div>
        </div>

        {/* PRODUCTS TABLE */}
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-y bg-gray-100 font-medium">
              <th className="text-left py-2 px-2">Product</th>
              <th className="text-left py-2 px-2">Description</th>
              <th className="text-center py-2 px-2">Qty</th>
              <th className="text-center py-2 px-2">Price</th>
              <th className="text-center py-2 px-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={i} className="border-b">
                <td className="py-2 px-2">{p.name}</td>
                <td className="py-2 px-2 text-gray-600">{p.description}</td>
                <td className="py-2 px-2 text-center">{p.quantity}</td>
                <td className="py-2 px-2 text-center">{billingTo.currency}{p.price.toFixed(2)}</td>
                <td className="py-2 px-2 text-center font-medium">
                  {billingTo.currency}{(p.price * p.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* TOTAL SUMMARY BOX */}
        <div className="flex justify-end mt-8">
          <div className="w-64 border rounded-md p-4 text-sm space-y-1 bg-gray-50">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{billingTo.currency}{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Discount (10%)</span>
              <span>-{billingTo.currency}{discount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>VAT (5%)</span>
              <span>{billingTo.currency}{vat.toFixed(2)}</span>
            </div>

            <hr className="my-2" />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{billingTo.currency}{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-12 text-center text-gray-500 text-[12px] italic border-t pt-4">
          Thank you for your business. We appreciate your trust in us.
        </div>

      </div>



    </motion.div>
  );
};

export default CreateInvoice;
