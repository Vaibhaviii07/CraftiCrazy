// src/ProductDetails/ResinFrameDetailPage.tsx
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResinFrame, resinFrames } from "../Data/ResinFramedata";
import { useCart } from "../AuthContext/CartContext";
import { ShoppingCart } from "lucide-react";

export default function ResinFrameDetailPage() {
  const { id } = useParams<{ id: string }>();
  const frame: ResinFrame | undefined = resinFrames.find(f => f.id === id);
  const { cart, addToCart } = useCart();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!frame) return <p className="text-center mt-20">Frame not found!</p>;

  const handleAddToCart = () => {
    const product = {
      id: frame.id,
      name: frame.name,
      price: frame.price.toString(), // convert number → string to match CartItem type
      image: frame.image,
      quantity: 1,
    };

    const exists = cart.find(c => c.id === product.id);
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
      {/* Hero */}
      <div
        className="relative w-full h-[400px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${frame.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <motion.h1
          className="relative text-4xl md:text-5xl font-serif font-semibold text-white"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {frame.name}
        </motion.h1>
      </div>

      {/* Details */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 mt-12 flex flex-col md:flex-row gap-10">
        {/* Image */}
        <div className="md:w-1/2 rounded-3xl overflow-hidden shadow-lg">
          <img
            src={frame.image}
            alt={frame.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <h2 className="text-3xl font-playfair font-semibold">{frame.name}</h2>
          {frame.description && (
            <p className="text-gray-600 text-lg">{frame.description}</p>
          )}
          <div className="mt-4 text-2xl text-[#C45A36] font-cinzel">
            ₹{frame.price}
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="mt-6 px-6 py-3 rounded-lg bg-[#C45A36] text-white font-medium flex items-center gap-2 hover:bg-[#a1472c] transition"
          >
            <ShoppingCart className="w-5 h-5" /> Add to Cart
          </button>

          {/* Back link */}
          <Link
            to="/resinframes"
            className="mt-4 text-sm text-[#C45A36] hover:underline"
          >
            ← Back to Resin Frames
          </Link>
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
