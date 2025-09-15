import React, { useState } from "react";
import { Mail, Phone, Send, Instagram, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type FormState = {
  name: string;
  email: string;
  phone: string;
  comment: string;
};

const initialForm: FormState = { name: "", email: "", phone: "", comment: "" };

const ContactUs: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialForm);
  const [sent, setSent] = useState(false);

  const handleChange =
    (k: keyof FormState) => (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [k]: ev.target.value }));
    };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    await new Promise((res) => setTimeout(res, 1000)); // fake send
    setForm(initialForm);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="relative min-h-screen py-5 px-6">
      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {/* Header */}
    <div className="text-center py-10">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 leading-snug">
            Contact <span className="text-amber-600">Us</span>
            </h2>
            <p className="text-lg text-gray-800 font-medium">
            CraftiCrazy by  Sanika Milmile ✨
            </p>

        <p className="mt-2 text-sm text-gray-500">
            We love hearing from you! Let’s connect and craft some magic together.
        </p>
    </div>


        {/* Main Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Left Info */}
          <div className="space-y-6">
            {/* Get in Touch */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 transition hover:shadow-2xl"
            >
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Phone className="w-5 h-5 text-orange-600" /> Get in Touch
              </h2>
              <p className="mt-3 text-gray-600">
                Phone: +91 7721028815 <br />
                Email:{" "}
                <a href="mailto:crafticrazy@gmail.com" className="text-orange-600 font-medium">
                  crafticrazy@gmail.com
                </a>
              </p>
              <p className="mt-2 text-sm text-gray-500">We’ll respond within 24–48 hours.</p>
              <p className="mt-3 text-gray-600">Location: Chandrapur, Maharashtra, India</p>
            </motion.div>

            {/* Socials */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 transition hover:shadow-2xl"
            >
              <p className="text-xl font-semibold text-gray-800 mb-3">
                ✨ Stay in touch! We love hearing from you
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/crafticrazy_710"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-pink-400 to-pink-600 text-white rounded-full shadow-xl hover:scale-110 transition-transform duration-300"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="https://wa.me/917721028815"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-green-400 to-green-600 text-white rounded-full shadow-xl hover:scale-110 transition-transform duration-300"
                >
                  <MessageCircle className="w-6 h-6" />
                </a>
              </div>
            </motion.div>

            {/* Customer Service */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 transition hover:shadow-2xl"
            >
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Mail className="w-5 h-5 text-orange-600" /> Customer Service
              </h2>
              <p className="mt-3 text-gray-600">
                For order-related questions, contact us at{" "}
                <a href="mailto:crafticrazy@gmail.com" className="text-orange-600 font-medium">
                  crafticrazy@gmail.com
                </a>{" "}
                or +91 7721028815
              </p>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white shadow-2xl rounded-2xl p-8 border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Send className="w-5 h-5 text-orange-600" /> Contact Form
            </h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                value={form.name}
                onChange={handleChange("name")}
                type="text"
                placeholder="Name"
                className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none shadow-sm transition"
                required
              />
              <input
                value={form.email}
                onChange={handleChange("email")}
                type="email"
                placeholder="Email *"
                className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none shadow-sm transition"
                required
              />
              <input
                value={form.phone}
                onChange={handleChange("phone")}
                type="tel"
                placeholder="Phone Number"
                className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none shadow-sm transition"
              />
              <textarea
                value={form.comment}
                onChange={handleChange("comment")}
                rows={4}
                placeholder="Comment"
                className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none shadow-sm transition"
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-orange-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-orange-700 transition"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {sent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 bg-white shadow-xl rounded-xl border border-green-200 px-6 py-4 flex items-center gap-3"
          >
            <div className="text-green-600 font-bold text-lg">✓</div>
            <div>
              <p className="text-sm font-medium text-gray-800">Message sent!</p>
              <p className="text-xs text-gray-500">We’ll get back to you soon.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactUs;
