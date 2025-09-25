// src/ProductDetails/ResinNameplateDetailPage.tsx
import { useParams } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { resinNameplates, ResinNameplate } from "../Data/ResinNameplateData";
import { useCart } from "../AuthContext/CartContext";
import { ShoppingCart } from "lucide-react";

export default function ResinNameplateDetailPage() {
  const { id } = useParams<{ id: string }>();
  const nameplate: ResinNameplate | undefined = resinNameplates.find(
    (n) => n.id === String(id)
  );

  const { cart, addToCart } = useCart();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!nameplate) return <p className="text-center mt-20">Nameplate not found!</p>;

  const handleAddToCart = () => {
  if (!nameplate) return;

  const product = {
    ...nameplate,
    quantity: 1,
    price: nameplate.price.toString(), // convert number to string
  };

  const exists = cart.find((c) => c.id === nameplate.id);
  if (!exists) {
    addToCart(product);
    setToastMessage(`${nameplate.name} added to cart ✅`);
  } else {
    setToastMessage(`${nameplate.name} is already in your cart 🛒`);
  }

  setTimeout(() => setToastMessage(null), 2500);
};


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div
        className="relative w-full h-[400px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${nameplate.image})`,
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
          {nameplate.name}
        </motion.h1>
      </div>

      {/* Details */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 mt-12 flex flex-col md:flex-row gap-10">
        {/* Image */}
        <div className="md:w-1/2 rounded-3xl overflow-hidden shadow-lg">
          <img
            src={nameplate.image}
            alt={nameplate.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <h2 className="text-3xl font-playfair font-semibold">{nameplate.name}</h2>
          {nameplate.description && (
            <p className="text-gray-600 text-lg">{nameplate.description}</p>
          )}
          <div className="mt-4 text-2xl text-[#C45A36] font-cinzel">
            ₹{nameplate.price}
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="mt-6 px-6 py-3 rounded-lg bg-[#C45A36] text-white font-medium flex items-center gap-2 hover:bg-[#a1472c] transition"
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
