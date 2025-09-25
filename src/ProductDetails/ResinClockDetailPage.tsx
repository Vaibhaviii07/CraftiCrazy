// src/ProductDetails/ResinClockDetailPage.tsx
import { useParams } from "react-router-dom";
import { useCart } from "../AuthContext/CartContext";
import { resinClocks, ResinClock } from "../Data/ResinWallClockdata";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";

export default function ResinClockDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { cart, addToCart } = useCart();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const product: ResinClock | undefined = resinClocks.find(
    (item) => item.id.toString() === id
  );

  if (!product) return <p className="text-center mt-20">Product not found.</p>;

  const handleAddToCart = () => {
  const exists = cart.find((c) => c.id === product.id);
  if (!exists) {
    addToCart({ ...product, price: product.price.toString(), quantity: 1 });
    setToastMessage(`${product.name} added to cart ✅`);
  } else {
    setToastMessage(`${product.name} is already in your cart 🛒`);
  }
  setTimeout(() => setToastMessage(null), 2500);
};


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative w-full h-[400px] flex items-center justify-center text-center"
        style={{
          backgroundImage: `url(${product.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <motion.h1
          className="relative text-4xl md:text-5xl font-serif font-semibold text-white"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {product.name}
        </motion.h1>
      </div>

      {/* Product Details */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="w-full h-[450px] rounded-3xl overflow-hidden shadow-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-playfair font-semibold text-gray-900 mb-4">
              {product.name}
            </h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="text-2xl text-[#C45A36] font-cinzel font-semibold mb-6">
              ₹{product.price}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-2 bg-[#C45A36] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#a1472c] transition"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
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
