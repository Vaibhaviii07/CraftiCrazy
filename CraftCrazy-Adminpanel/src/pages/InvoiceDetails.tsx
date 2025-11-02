// src/pages/InvoiceDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Printer, FileDown } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface InvoiceItem {
  brand: string;
  description: string;
  quantity: number;
  price: number;
}

interface InvoiceDetailsData {
  id: string;
  client: string;
  clientEmail: string;
  billingAddress: string;
  dateIssued: string;
  dueDate: string;
  amount: number;
  status: string;
  items: InvoiceItem[];
  paymentMode: string;
  cardHolder: string;
  cardNumber: string;
}

const InvoiceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [invoice, setInvoice] = useState<InvoiceDetailsData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch invoice data
  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/invoices/${id}`);
        setInvoice(res.data);
      } catch (err) {
        console.error("Error fetching invoice:", err);
        // Fallback dummy data with CraftiCrazy products
        setInvoice({
          id: "#CC20251234",
          client: "Vaibhavi Tingane",
          clientEmail: "vaibhavi.tingane@gmail.com",
          billingAddress: "Laxmi Nagar, Nagpur, Maharashtra, India",
          dateIssued: "03 Nov 2025",
          dueDate: "03 Dec 2025",
          amount: 4870,
          status: "Pending",
          paymentMode: "Razorpay - UPI",
          cardHolder: "Vaibhavi Tingane",
          cardNumber: "XXXX XXXX XXXX 7284",
          items: [
            {
              brand: "Floral Encased Resin Frame",
              description: "Handmade resin frame with dried floral art sealed in crystal-clear resin.",
              quantity: 1,
              price: 1100,
            },
            {
              brand: "Luxury Corporate Hamper",
              description: "Premium curated hamper with gourmet snacks, candles, and resin coasters.",
              quantity: 1,
              price: 1850,
            },
            {
              brand: "Ocean Wave Resin Clock",
              description: "Wall clock made with blue resin waves on natural wooden base.",
              quantity: 1,
              price: 1400,
            },
            {
              brand: "Mini Candle Holder Set",
              description: "Set of 2 handmade resin candle holders with gold foil texture.",
              quantity: 1,
              price: 520,
            },
          ],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  const formatRupees = (amount: number) =>
    amount.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    });

  if (loading)
    return <div className="p-10 text-center text-gray-500">Loading...</div>;

  if (!invoice)
    return (
      <div className="p-10 text-center text-red-500 text-lg">
        Invoice not found.
      </div>
    );

  const subtotal = invoice.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discount = subtotal * 0.1;
  const gst = subtotal * 0.18;
  const total = subtotal - discount + gst;

  return (
    <motion.div
      className="p-6 bg-[#fffaf7] min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#b46029]">🧾 CraftiCrazy Invoice</h1>

        <div className="flex gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Printer size={16} /> Print
          </button>

          <button
            onClick={async () => {
              const element = document.getElementById("invoice-pdf-area");
              if (!element) return;
              const canvas = await html2canvas(element, { scale: 2 });
              const imgData = canvas.toDataURL("image/png");
              const pdf = new jsPDF("p", "mm", "a4");
              const pdfWidth = pdf.internal.pageSize.getWidth();
              const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
              pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
              pdf.save(`CraftiCrazy_Invoice_${invoice.id}.pdf`);
            }}
            className="flex items-center gap-2 bg-[#b46029] text-white px-4 py-2 rounded-lg hover:bg-[#8c4a20] transition"
          >
            <FileDown size={16} /> Save as PDF
          </button>
        </div>
      </div>

      {/* INVOICE BODY */}
      <div id="invoice-pdf-area" className="grid lg:grid-cols-3 gap-6">
        {/* LEFT SECTION */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border p-6">
          <div className="flex justify-between flex-wrap mb-4">
            <div>
              <h2 className="text-lg font-semibold text-[#b46029]">
                INVOICE ID: {invoice.id}
              </h2>
              <p className="mt-2 text-sm text-gray-600 leading-6">
                <strong>Billing From:</strong> <br />
                CraftiCrazy Pvt. Ltd. <br />
                Handmade Art Studio, Pune, Maharashtra, India <br />
                contact@crafticrazy.com <br />
                +91 98123 45678
              </p>
            </div>

            <div className="text-sm text-gray-600">
              <strong>Billing To:</strong>
              <p className="mt-1">
                {invoice.client} <br />
                {invoice.billingAddress} <br />
                {invoice.clientEmail}
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 mb-6 text-sm text-gray-700">
            <p><strong>Invoice ID:</strong> {invoice.id}</p>
            <p><strong>Date Issued:</strong> {invoice.dateIssued}</p>
            <p><strong>Due Date:</strong> {invoice.dueDate}</p>
          </div>

          {/* PRODUCT TABLE */}
          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full text-sm text-gray-700">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">PRODUCT</th>
                  <th className="py-3 px-4 text-left">DESCRIPTION</th>
                  <th className="py-3 px-4 text-center">QTY</th>
                  <th className="py-3 px-4 text-right">UNIT PRICE</th>
                  <th className="py-3 px-4 text-right">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="py-3 px-4 font-medium text-gray-900">{item.brand}</td>
                    <td className="py-3 px-4">{item.description}</td>
                    <td className="py-3 px-4 text-center">{item.quantity}</td>
                    <td className="py-3 px-4 text-right">{formatRupees(item.price)}</td>
                    <td className="py-3 px-4 text-right">{formatRupees(item.quantity * item.price)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan={4} className="text-right font-semibold py-2 px-4">
                    Sub Total:
                  </td>
                  <td className="text-right">{formatRupees(subtotal)}</td>
                </tr>
                <tr>
                  <td colSpan={4} className="text-right font-semibold py-2 px-4">
                    Discount (10%):
                  </td>
                  <td className="text-right">{formatRupees(discount)}</td>
                </tr>
                <tr>
                  <td colSpan={4} className="text-right font-semibold py-2 px-4">
                    GST (18%):
                  </td>
                  <td className="text-right">{formatRupees(gst)}</td>
                </tr>
                <tr>
                  <td colSpan={4} className="text-right font-bold py-3 px-4 text-[#b46029]">
                    Total:
                  </td>
                  <td className="text-right font-bold text-[#b46029]">
                    {formatRupees(total)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="mt-6 bg-[#fff7f1] border p-4 rounded-lg text-sm text-gray-600">
            <strong>Note:</strong> Thank you for shopping with CraftiCrazy! Each product is handmade with love. Payments are to be completed within 30 days.
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="bg-white rounded-xl shadow-sm border p-6 h-fit">
          <h2 className="text-lg font-semibold text-[#b46029] mb-4">
            💳 Payment Information
          </h2>
          <div className="text-sm text-gray-700 space-y-2">
            <p><strong>Payment Method:</strong> {invoice.paymentMode}</p>
            <p><strong>Card Holder:</strong> {invoice.cardHolder}</p>
            <p><strong>Card Number:</strong> {invoice.cardNumber}</p>
            <p><strong>Total Amount:</strong> {formatRupees(invoice.amount)}</p>
            <p>
              <strong>Due Date:</strong>{" "}
              <span className="text-red-500">{invoice.dueDate} — 30 days due</span>
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  invoice.status === "Paid"
                    ? "bg-green-100 text-green-700"
                    : invoice.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {invoice.status}
              </span>
            </p>
          </div>

          <div className="mt-5 bg-green-50 text-green-700 text-sm p-3 rounded-lg border border-green-200">
            Please make payment via Razorpay or UPI within 30 days to avoid order delays.
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InvoiceDetails;
