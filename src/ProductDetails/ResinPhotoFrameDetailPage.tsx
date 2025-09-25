// src/ProductDetails/ResinPhotoFrameDetailPage.tsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { resinPhotoFrames, ResinPhotoFrame } from "../Data/ResinPhotoFramesData";
import { useCart } from "../AuthContext/CartContext";

export default function ResinPhotoFrameDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { cart, addToCart } = useCart();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const frame: ResinPhotoFrame | undefined = resinPhotoFrames.find((f) => f.id === id);

  if (!frame) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-600">Product not found.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
  const product = { 
    ...frame, 
    quantity: 1, 
    price: frame.price.toString() // convert number to string
  };
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-lg">
          <img
            src={frame.image}
            alt={frame.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-playfair font-semibold text-gray-900 mb-4">
              {frame.name}
            </h1>
            <p className="text-gray-700 text-lg mb-6">{frame.description}</p>
            <div className="text-2xl font-cinzel text-[#C45A36] mb-6">₹{frame.price}</div>
          </div>

          <button
            onClick={handleAddToCart}
            className="px-6 py-3 bg-[#C45A36] text-white rounded-lg shadow-md flex items-center gap-2 w-fit hover:bg-[#a1472c] transition"
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
