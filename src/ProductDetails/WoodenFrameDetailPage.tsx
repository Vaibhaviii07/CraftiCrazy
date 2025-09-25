// src/Pages/Accessories/WoodenFrameDetailPage.tsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import { woodenFrames } from "../Data/WoodenFramedata";
import { useCart } from "../AuthContext/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";

export default function WoodenFrameDetailPage() {
  const { id } = useParams();
  const frame = woodenFrames.find((item) => item.id.toString() === id);
  const { cart, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!frame) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">Frame not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    const product = {
      id: frame.id.toString(),   // ensure id is string
      name: frame.name,
      price: frame.price,        // keep price as string like "₹1,200"
      image: frame.image,
      quantity,
    };

    const exists = cart.find((c) => c.id === product.id);
    if (!exists) {
      addToCart(product);
      setToastMessage(`${product.name} added to cart!`);
    } else {
      setToastMessage(`${product.name} is already in the cart`);
    }

    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-lg">
          <img
            src={frame.image}
            alt={frame.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-start gap-4">
          <h1 className="text-3xl font-playfair font-semibold text-gray-900">
            {frame.name}
          </h1>
          {frame.description && (
            <p className="text-gray-700 text-lg">{frame.description}</p>
          )}
          <div className="flex items-center gap-4 mt-2">
            <span className="text-2xl text-[#C45A36] font-cinzel">{frame.price}</span>
            {frame.rating && (
              <span className="text-yellow-500 font-medium">{`⭐ ${frame.rating}`}</span>
            )}
          </div>
          {frame.highlight && (
            <p className="text-sm text-gray-500">Highlight: {frame.highlight}</p>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-4 mt-4">
            <label className="text-gray-700 font-medium">Quantity:</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-20 px-2 py-1 border border-gray-300 rounded-md"
            />
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="mt-6 w-40 px-4 py-2 rounded-md bg-[#C45A36] text-white font-medium flex items-center justify-center gap-2 hover:bg-[#a1472c] transition"
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
