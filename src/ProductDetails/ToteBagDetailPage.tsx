// src/ProductDetails/ToteBagDetailPage.tsx
import { useParams } from "react-router-dom";
import { toteBags, ToteBag } from "../Data/ToteBagData";
import { motion } from "framer-motion";
import { useCart } from "../AuthContext/CartContext";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function ToteBagDetailPage() {
  const { id } = useParams();
  const { addToCart, cart } = useCart();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const bag: ToteBag | undefined = toteBags.find((b) => b.id.toString() === id);

  if (!bag) {
    return <p className="text-center mt-20 text-gray-700">Tote Bag not found.</p>;
  }

  const handleAddToCart = () => {
  const exists = cart.find((c) => c.id === bag.id);
  if (!exists) {
    addToCart({ ...bag, price: bag.price.toString(), quantity: 1 });
    setToastMessage(`${bag.name} added to cart ✅`);
  } else {
    setToastMessage(`${bag.name} is already in your cart 🛒`);
  }
  setTimeout(() => setToastMessage(null), 2500);
};

  return (
    <div className="bg-gray-50 min-h-screen px-6 sm:px-10 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full h-[500px] rounded-3xl overflow-hidden shadow-lg"
        >
          <img
            src={bag.image}
            alt={bag.name}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-start"
        >
          <h1 className="text-4xl font-playfair font-semibold text-gray-900 mb-4">
            {bag.name}
          </h1>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-2xl text-[#C45A36] font-cinzel">
              ₹{bag.price}
            </span>
            <span className="text-sm text-gray-600">Category: {bag.category}</span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm text-gray-700">
              Rating: {bag.rating} ⭐
            </span>
            <span className="text-sm text-gray-700">
              Popularity: {bag.popularity}%
            </span>
          </div>

          <p className="text-gray-700 mb-6">{bag.description}</p>

          <button
            onClick={handleAddToCart}
            className="w-max flex items-center gap-2 px-6 py-3 bg-[#C45A36] text-white font-medium rounded-md shadow hover:bg-[#a1472c] transition"
          >
            <ShoppingCart className="w-5 h-5" /> Add to Cart
          </button>
        </motion.div>
      </div>

      {/* Toast */}
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
    </div>
  );
}
