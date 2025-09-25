// src/ProductDetails/WalletDetailPage.tsx
import { useParams } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wallets, Wallet } from "../Data/WalletData";
import { useCart } from "../AuthContext/CartContext";
import { ShoppingCart } from "lucide-react";

export default function WalletDetailPage() {
  const { id } = useParams<{ id: string }>();
  const wallet: Wallet | undefined = wallets.find((w) => w.id === String(id));
  const { cart, addToCart } = useCart();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!wallet) return <p className="text-center mt-20">Wallet not found!</p>;

  const handleAddToCart = () => {
  if (!wallet) return;

  const product = {
    ...wallet,
    quantity: 1,
    price: wallet.price.toString(), // convert number to string
  };

  const exists = cart.find((c) => c.id === wallet.id);

  if (!exists) {
    addToCart(product);
    setToastMessage(`${wallet.name} added to cart ✅`);
  } else {
    setToastMessage(`${wallet.name} is already in your cart 🛒`);
  }

  setTimeout(() => setToastMessage(null), 2500);
};


  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div
        className="relative w-full h-[400px] flex flex-col items-center justify-center text-center"
        style={{
          backgroundImage: `url(${wallet.image})`,
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
          {wallet.name}
        </motion.h1>
      </div>

      {/* Product Details */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl overflow-hidden shadow-lg"
        >
          <img
            src={wallet.image}
            alt={wallet.name}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
          <h2 className="text-3xl font-playfair font-semibold">{wallet.name}</h2>
          {wallet.description && <p className="text-gray-600 text-lg">{wallet.description}</p>}
          <div className="mt-4 text-2xl text-[#C45A36] font-cinzel">₹{wallet.price}</div>

          <button
            onClick={handleAddToCart}
            className="mt-6 px-6 py-3 rounded-lg bg-[#C45A36] text-white font-medium flex items-center gap-2 hover:bg-[#a1472c] transition"
          >
            <ShoppingCart className="w-5 h-5" /> Add to Cart
          </button>
        </motion.div>
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
