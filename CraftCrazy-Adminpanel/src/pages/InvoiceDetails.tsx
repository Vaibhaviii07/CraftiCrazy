import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { useReactToPrint } from "react-to-print";

interface InvoiceItem {
  name: string;
  price: number;
  quantity: number;
}

interface Invoice {
  _id?: string;
  invoiceId: string;
  client: string;
  email: string;
  dateIssued: string;
  dueDate: string;
  amount: number;
  status: string;
  items: InvoiceItem[];
}

const InvoiceDetail: React.FC = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/invoice/${id}`);
        setInvoice(res.data);
      } catch (err) {
        console.error("Error:", err);
      }
    };
    fetchInvoice();
  }, [id]);
const handlePrint = useReactToPrint({
  documentTitle: `Invoice-${invoice?.invoiceId}`,
  contentRef: printRef,
});


  if (!invoice) return <div className="p-6 text-center">Loading Invoice...</div>;

  const formatRupees = (amount: number) =>
    amount.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    });

  return (
    <motion.div
      className="p-6 bg-gray-50 min-h-screen flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* PRINTABLE AREA */}
      <div
        ref={printRef}
        className="bg-white shadow-xl w-full max-w-4xl p-10 rounded-lg border"
      >
        {/* Header */}
        <div className="flex justify-between border-b pb-4">
          <div>
            <h1 className="text-3xl font-bold text-[#2a0a4b]">CraftiCrazy</h1>
            <p className="text-sm text-gray-600 mt-1">
              Chandrapur, Maharashtra, India <br />
              Phone: +91 XXXXXXXXXX | Email: craftCrazy@gmail.com
            </p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-semibold">Invoice</h2>
            <p className="text-sm text-gray-600">
              Invoice ID: {invoice.invoiceId}
            </p>
          </div>
        </div>

        {/* Client Details */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <div>
            <h3 className="font-medium text-gray-700">Bill To:</h3>
            <p className="text-gray-900 font-semibold">{invoice.client}</p>
            <p className="text-gray-600 text-sm">{invoice.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">
              Issued Date: {invoice.dateIssued}
            </p>
            <p className="text-sm text-gray-600">Due Date: {invoice.dueDate}</p>
            <p className="text-sm font-medium mt-1">
              Status: <span className="text-[#845EF7]">{invoice.status}</span>
            </p>
          </div>
        </div>

        {/* Items */}
        <div className="mt-10">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border">
              <tr>
                <th className="text-left p-3">Item</th>
                <th className="text-center p-3">Qty</th>
                <th className="text-right p-3">Total</th>
              </tr>
            </thead>

            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3 font-medium text-gray-700">{item.name}</td>
                  <td className="p-3 text-center text-gray-700">
                    {item.quantity}
                  </td>
                  <td className="p-3 text-right font-semibold">
                    {formatRupees(item.price * item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total */}
          <div className="flex justify-end mt-4">
            <div className="text-right">
              <p className="text-gray-600 text-sm">Total Amount</p>
              <p className="text-2xl font-bold">{formatRupees(invoice.amount)}</p>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-10 border-t pt-4">
          Thank you for your business. This invoice is system generated and requires no signature.
        </p>
      </div>

      {/* PRINT BUTTON */}
      <button
        onClick={handlePrint}
        className="mt-6 bg-[#845EF7] text-white px-6 py-2 rounded-lg hover:bg-[#6f4ad8] transition"
      >
        Print Invoice
      </button>
    </motion.div>
  );
};

export default InvoiceDetail;