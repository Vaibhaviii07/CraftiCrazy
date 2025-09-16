import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../AuthContext/CartContext"; 
import { newArrivalsData } from "../Data/NewArrivalsData";


const NewArrivals = () => {
  const [loaded, setLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: number]: boolean }>({});
  const [toast, setToast] = useState<string | null>(null);

  const { addToCart } = useCart();

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = (index: number) => {
    setImagesLoaded((prev) => ({ ...prev, [index]: true }));
  };

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: 1,
    });

    setToast(`${item.name} added to cart`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <section className="bg-[#FBFAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          <AnimatePresence>
            {loaded
              ? newArrivalsData.freshPicks.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    exit={{ opacity: 0, y: 30 }}
                    className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
                  >
                    <div className="relative w-full h-44 sm:h-56">
                      {!imagesLoaded[index] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                          <div className="w-8 h-8 border-4 border-t-[#b46029] border-b-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                      <img
                        src={item.image}
                        alt={item.name}
                        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                          imagesLoaded[index] ? "opacity-100" : "opacity-0"
                        }`}
                        onLoad={() => handleImageLoad(index)}
                      />

                      <span className="absolute top-2 right-2 bg-[#b46029] text-white text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-full shadow">
                        {item.discount} OFF
                      </span>
                    </div>

                    <div className="p-2 sm:p-3 flex flex-col flex-1">
                      <p className="text-xs sm:text-sm font-medium text-gray-800 truncate">
                        {item.name}
                      </p>

                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-gray-400 text-[11px] sm:text-xs line-through">
                          ₹{item.oldPrice}
                        </span>
                        <span className="text-sm sm:text-base font-semibold text-[#b46029]">
                          ₹{item.price}
                        </span>
                      </div>

                      {/* ✅ Add to Cart Button */}
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="mt-2 sm:mt-3 bg-[#C1856D] hover:bg-[#8c341f] text-white 
                          text-[11px] sm:text-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-md transition"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </motion.div>
                ))
              : Array(8)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="animate-pulse bg-gray-200 rounded-xl h-52 sm:h-60"
                    ></div>
                  ))}
          </AnimatePresence>
        </div>
      </div>

      {/* ✅ Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 
               bg-[#E8D4B7] text-black 
               px-4 sm:px-6 py-2 sm:py-3 
               rounded-lg sm:rounded-xl shadow-lg 
               text-sm sm:text-base 
               max-w-[90%] sm:max-w-md w-auto text-center"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default NewArrivals;
