import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Printer, FileDown } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import { useParams } from "react-router-dom";

interface InvoiceItem {
  brand: string;
  desc: string;
  qty: number;
  price: number;
}

interface InvoiceData {
  id: string;
  billingFrom: {
    name: string;
    address: string;
    email: string;
    phone: string;
  };
  billingTo: {
    name: string;
    address: string;
    email: string;
    phone: string;
  };
  invoiceId: string;
  issuedDate: string;
  dueDate: string;
  dueAmount: number;
  items: InvoiceItem[];
  subTotal: number;
  discount: number;
  couponDiscount: number;
  vat: number;
  total: number;
  payment: {
    type: string;
    nameOnCard: string;
    cardNumber: string;
    dueDate: string;
    status: string;
  };
}

const InvoiceDetails: React.FC = () => {
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const invoiceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/invoices/${invoiceId}`);
        setInvoice(res.data);
      } catch (error) {
        console.error("Error fetching invoice:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [invoiceId]);

  const handleDownloadPDF = async () => {
    const input = invoiceRef.current;
    if (!input) return;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save(`${invoice?.invoiceId || "invoice"}.pdf`);
  };

  const handlePrint = () => window.print();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading invoice details...
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        Invoice not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f6fa] p-8">
      <motion.div
        ref={invoiceRef}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6"
      >
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 bg-white shadow-md rounded-xl p-8 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                SHOPPING INVOICE : <span className="text-[#845EF7]">{invoice.id}</span>
              </h2>
              <p className="text-sm text-gray-500 mt-1">Billing From:</p>
              <p className="text-gray-700 font-medium">{invoice.billingFrom.name}</p>
              <p className="text-sm text-gray-500">{invoice.billingFrom.address}</p>
              <p className="text-sm text-gray-500">{invoice.billingFrom.email}</p>
              <p className="text-sm text-gray-500">{invoice.billingFrom.phone}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1">Billing To:</p>
              <p className="text-gray-800 font-medium">{invoice.billingTo.name}</p>
              <p className="text-sm text-gray-500">{invoice.billingTo.address}</p>
              <p className="text-sm text-gray-500">{invoice.billingTo.email}</p>
              <p className="text-sm text-gray-500">{invoice.billingTo.phone}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mt-6 text-sm text-gray-700">
            <div>
              <p className="text-gray-500">Invoice ID</p>
              <p className="font-medium">{invoice.invoiceId}</p>
            </div>
            <div>
              <p className="text-gray-500">Date Issued</p>
              <p className="font-medium">{invoice.issuedDate}</p>
            </div>
            <div>
              <p className="text-gray-500">Due Date</p>
              <p className="font-medium">{invoice.dueDate}</p>
            </div>
            <div>
              <p className="text-gray-500">Due Amount</p>
              <p className="font-semibold text-[#845EF7]">${invoice.dueAmount.toFixed(2)}</p>
            </div>
          </div>

          <div className="overflow-x-auto mt-6">
            <table className="w-full border border-gray-200 rounded-lg text-sm">
              <thead className="bg-gray-100 text-gray-700 uppercase">
                <tr>
                  <th className="text-left p-3">Brand Name</th>
                  <th className="text-left p-3">Description</th>
                  <th className="text-center p-3">Quantity</th>
                  <th className="text-center p-3">Price per unit</th>
                  <th className="text-right p-3">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50">
                    <td className="p-3 font-medium">{item.brand}</td>
                    <td className="p-3">{item.desc}</td>
                    <td className="p-3 text-center">{item.qty}</td>
                    <td className="p-3 text-center">${item.price}</td>
                    <td className="p-3 text-right font-medium">
                      ${(item.qty * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mt-6">
            <div className="w-72 text-sm">
              <div className="flex justify-between mb-2 text-gray-600">
                <span>Sub Total:</span>
                <span>${invoice.subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2 text-gray-600">
                <span>Avail Discount:</span>
                <span>${invoice.discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2 text-gray-600">
                <span>Coupon Discount (10%):</span>
                <span>${invoice.couponDiscount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2 text-gray-600">
                <span>VAT (20%):</span>
                <span>${invoice.vat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-semibold text-gray-800">
                <span>Total:</span>
                <span className="text-[#845EF7]">${invoice.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-8 border-t pt-3">
            <strong>Note:</strong> Once the invoice has been verified by the accounts payable team
            and recorded, the only task left is to send it for approval before releasing payment.
          </p>
        </div>

        {/* RIGHT SIDE - PAYMENT DETAILS */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Mode Of Payment</h3>
          <p className="text-sm font-medium text-gray-700 mb-2">{invoice.payment.type}</p>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-gray-500">Name On Card:</span>
              <p className="font-medium">{invoice.payment.nameOnCard}</p>
            </div>
            <div>
              <span className="text-gray-500">Card Number:</span>
              <p className="font-medium">{invoice.payment.cardNumber}</p>
            </div>
            <div>
              <span className="text-gray-500">Total Amount:</span>
              <p className="font-medium text-[#845EF7]">${invoice.total.toFixed(2)}</p>
            </div>
            <div>
              <span className="text-gray-500">Due Date:</span>
              <p className="font-medium text-red-500">
                {invoice.payment.dueDate}{" "}
                <span className="text-xs text-gray-500">– 30 days due</span>
              </p>
            </div>
            <div>
              <span className="text-gray-500">Invoice Status:</span>
              <span className="ml-2 text-yellow-700 bg-yellow-100 px-2 py-1 rounded text-xs font-semibold">
                {invoice.payment.status}
              </span>
            </div>
          </div>

          <p className="text-xs bg-green-50 text-green-700 mt-4 p-2 rounded">
            Please make sure to pay the invoice bill within 30 days.
          </p>

          <div className="flex justify-center gap-3 mt-6">
            <motion.button
              whileHover={{ scale: 1.03 }}
              onClick={handlePrint}
              className="flex items-center gap-2 bg-white border px-4 py-2 rounded text-sm text-gray-700"
            >
              <Printer size={16} /> Print
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 bg-[#845EF7] text-white px-4 py-2 rounded text-sm"
            >
              <FileDown size={16} /> Save as PDF
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InvoiceDetails;
