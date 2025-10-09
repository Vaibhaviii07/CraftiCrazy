// src/Pages/CheckoutPage.tsx
import React, { useState, useEffect } from "react";
import { useCart } from "../AuthContext/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const CheckoutPage = () => {
  const { cart, clearCart, updateCartItem } = useCart();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    customization: "",
    paymentMethod: "cod",
  });

  const [toast, setToast] = useState<string | null>(null);

  // Prefill customization with cart items' customization if available
  useEffect(() => {
    if (cart.length > 0) {
      setFormData((prev) => ({
        ...prev,
        customization: cart.map((item) => item.customization?.userInput || "").join("; "),
      }));
    }
  }, [cart]);

  // Lock scroll while on checkout page
  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Auto-focus email input
    const firstInput = document.querySelector<HTMLInputElement>(
      'input[name="email"]'
    );
    firstInput?.focus();

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const totalPrice = cart.reduce(
    (total, item) => total + Number(item.price) * Number(item.quantity),
    0
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Update cart items with latest customization
    cart.forEach((item) => {
      updateCartItem(item.id, {
        ...item,
        customization: {
          available: !!formData.customization,
          userInput: formData.customization,
        },
      });
    });

    setToast("Order placed successfully!");
    clearCart();
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#fffdf7] py-6 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Left Form Section */}
        <form
          onSubmit={handleSubmit}
          className="w-full lg:w-2/3 bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-4"
        >
          {/* Contact */}
          <h2 className="text-lg sm:text-xl font-semibold text-[#5b2232] mb-2">Contact</h2>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email or mobile number"
            className="w-full border border-gray-300 rounded-md p-3 text-sm mb-4 focus:ring-2 focus:ring-[#5b2232] outline-none"
          />

          {/* Delivery Section */}
          <h2 className="text-lg sm:text-xl font-semibold text-[#5b2232] mb-2">Delivery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="First name"
              className="border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-[#5b2232] outline-none"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Last name"
              className="border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-[#5b2232] outline-none"
            />
          </div>

          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="Address"
            className="w-full border border-gray-300 rounded-md p-3 text-sm mb-4 focus:ring-2 focus:ring-[#5b2232] outline-none"
          />

          <input
            type="text"
            name="apartment"
            value={formData.apartment}
            onChange={handleChange}
            placeholder="Apartment, suite, etc."
            className="w-full border border-gray-300 rounded-md p-3 text-sm mb-4 focus:ring-2 focus:ring-[#5b2232] outline-none"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              placeholder="City"
              className="border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-[#5b2232] outline-none"
            />
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              placeholder="State"
              className="border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-[#5b2232] outline-none"
            />
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
              placeholder="PIN code"
              className="border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-[#5b2232] outline-none"
            />
          </div>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Phone number"
            className="w-full border border-gray-300 rounded-md p-3 text-sm mb-4 focus:ring-2 focus:ring-[#5b2232] outline-none"
          />

          {/* Customization */}
          <h2 className="text-lg sm:text-xl font-semibold text-[#5b2232] mb-2">Customization</h2>
          <textarea
            name="customization"
            value={formData.customization}
            onChange={handleChange}
            placeholder="Write if you want to customize your hamper or product..."
            className="w-full border border-gray-300 rounded-md p-3 text-sm mb-4 focus:ring-2 focus:ring-[#5b2232] outline-none"
            rows={3}
          ></textarea>

          {/* Payment */}
          <h2 className="text-lg sm:text-xl font-semibold text-[#5b2232] mb-2">Payment</h2>
          <div className="border border-gray-300 rounded-md p-4 mb-4 space-y-2">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={formData.paymentMethod === "cod"}
                onChange={handleChange}
                className="text-[#5b2232]"
              />
              <span className="text-sm text-gray-700">Cash on Delivery (COD)</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={formData.paymentMethod === "card"}
                onChange={handleChange}
                className="text-[#5b2232]"
              />
              <span className="text-sm text-gray-700">Card / UPI / Netbanking</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#5b2232] text-white font-semibold rounded-md hover:bg-[#451a27] transition"
          >
            Pay Now
          </button>
        </form>

        {/* Right Order Summary */}
        <div className="w-full lg:w-1/3 bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200 mt-6 lg:mt-0">
          <h2 className="text-lg sm:text-xl font-semibold text-[#5b2232] mb-4">Order Summary</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {cart.map((item) => (
              <div key={item.id} className="flex flex-col gap-1 border-b pb-2">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-md border"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#3c1f2c]">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                  <p className="font-semibold text-[#5b2232]">
                    ₹{Number(item.price) * Number(item.quantity)}
                  </p>
                </div>

                {/* Customization */}
                {item.customization?.userInput && (
                  <p className="text-xs text-gray-600 italic ml-17">
                    💡 Customization: {item.customization.userInput}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 border-t pt-3 space-y-1 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹60</span>
            </div>
            <div className="flex justify-between font-semibold text-[#5b2232] text-base">
              <span>Total</span>
              <span>₹{totalPrice + 60}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 
                       bg-[#E8D4B7] text-black px-6 py-3 rounded-lg shadow-lg text-sm sm:text-base"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CheckoutPage;
