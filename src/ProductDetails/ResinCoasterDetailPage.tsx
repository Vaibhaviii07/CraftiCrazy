// src/Pages/ResinCoaster/ResinCoasterDetailPage.tsx
import { useParams, useNavigate, Link } from "react-router-dom";
import { resinCoasterSets, ResinCoaster } from "../Data/ResinCoasterSetData";
import { useCart } from "../AuthContext/CartContext";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ResinCoasterDetailPage() {
  const { id } = useParams<{ id: string }>();
  const coaster = resinCoasterSets.find((c) => c.id === id);
  const { cart, addToCart } = useCart();
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!coaster) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-700">Coaster not found.</p>
      </div>
    );
  }

  const handleAddToCart = (item: ResinCoaster) => {
  const product = { ...item, quantity: 1, price: item.price.toString() }; // convert price
  const exists = cart.find((c) => c.id === product.id);
  if (!exists) {
    addToCart(product);
    setToastMessage(`${product.name} added to cart ✅`);
  } else {
    setToastMessage(`${product.name} is already in your cart 🛒`);
  }
  setTimeout(() => setToastMessage(null), 2500);
};


  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 sm:px-10">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-[#b46029] font-medium mb-6 hover:underline"
      >
        ← Back to Coasters
      </button>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Image */}
        <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-lg">
          <img
            src={coaster.image}
            alt={coaster.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-playfair font-semibold text-gray-900">
            {coaster.name}
          </h1>
          <p className="text-gray-600 text-lg">{coaster.description}</p>
          <div className="text-3xl text-[#b46029] font-cinzel">
            ₹{coaster.price}
          </div>

          <button
            onClick={() => handleAddToCart(coaster)}
            className="flex items-center gap-2 w-fit px-5 py-3 bg-[#b46029] text-white font-medium rounded-md shadow hover:bg-[#a1472c] transition"
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
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#E8D4B7] text-black px-6 py-3 rounded-lg shadow-lg text-sm sm:text-base z-50"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
