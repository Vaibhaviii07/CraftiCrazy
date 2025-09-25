// src/ProductDetails/WeddingHamperDetailPage.tsx
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { weddingHampers } from "../Data/WeddingData";
import { useCart } from "../AuthContext/CartContext";
import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WeddingHamperDetailPage() {
  const { id } = useParams();
  const hamper = weddingHampers.find((item) => item.id === id);

  const { cart, addToCart } = useCart();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!hamper) return <p className="text-center mt-10 text-lg">Hamper not found!</p>;

  const handleAddToCart = () => {
    const exists = cart.find((c) => c.id === hamper.id);
    if (!exists) {
      // Ensure discount is a number (replace null with undefined)
      const discountValue = hamper.discount ?? undefined;
      addToCart({ ...hamper, discount: discountValue, quantity: 1 });
      setToastMessage(`${hamper.name} added to cart!`);
      setTimeout(() => setToastMessage(null), 2500);
    } else {
      setToastMessage(`${hamper.name} is already in the cart`);
      setTimeout(() => setToastMessage(null), 2500);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6 sm:px-10">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link to="/wedding" className="text-[#b46029] font-medium hover:underline">
          Wedding Hampers
        </Link>{" "}
        / <span className="text-gray-700">{hamper.name}</span>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-lg">
          <img
            src={hamper.image}
            alt={hamper.name}
            className="w-full h-full object-cover"
          />
          {hamper.discount && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute top-4 right-4 bg-[#b46029] text-white text-sm font-semibold px-3 py-1 rounded-md shadow"
            >
              {hamper.discount}% OFF
            </motion.span>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col justify-start gap-4">
          <h1 className="text-3xl font-playfair font-semibold text-gray-900">
            {hamper.name}
          </h1>
          <p className="text-gray-700 text-lg">{hamper.description}</p>
          <p className="text-2xl text-[#b46029] font-cinzel font-semibold">
            {hamper.price}
          </p>

          <button
            onClick={handleAddToCart}
            className="mt-4 px-5 py-3 w-max bg-[#b46029] text-white font-medium rounded-md shadow flex items-center gap-2 hover:bg-[#944a20] transition"
          >
            <ShoppingCart className="w-5 h-5" /> Add to Cart
          </button>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 
                       bg-[#E8D4B7] text-black px-6 py-3 rounded-lg shadow-lg text-sm sm:text-base z-50"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
