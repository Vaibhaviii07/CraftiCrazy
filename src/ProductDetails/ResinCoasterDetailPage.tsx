// src/ProductDetails/ResinCoasterDetailPage.tsx
import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { resinCoasterSets, ResinCoaster, Variant } from "../Data/ResinCoasterSetData";
import { useCart } from "../AuthContext/CartContext";
import { ShoppingCart, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
<<<<<<< HEAD
import CustomerReview from "../Components/CustomerReview";
import FloatingReviewChat from "../Components/FloatingCustomerReview";

=======
import { useAuth } from "../AuthContext/AuthContext";
>>>>>>> origin/master

type Params = { id: string };

export default function ResinCoasterDetailPage() {
  const { id } = useParams<Params>();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);

  const productFromParams: ResinCoaster | undefined = resinCoasterSets.find(p => String(p.id) === id);
  const [currentProduct, setCurrentProduct] = useState<ResinCoaster | null>(productFromParams ?? null);


  const selectedVariant = useMemo(() => {
    if (!currentProduct) return null;
    return {
      image: currentProduct.variants?.[0]?.image ?? currentProduct.image,
      price: currentProduct.variants?.[0]?.price ?? currentProduct.price,
      discount: currentProduct.variants?.[0]?.discount ?? currentProduct.discount,
    };
  }, [currentProduct]);

  const [currentVariant, setCurrentVariant] = useState<Variant | null>(selectedVariant);

  useEffect(() => {
    setCurrentVariant(selectedVariant);
    setQuantity(1);
    setImgLoaded(false);
  }, [selectedVariant]);

  useEffect(() => {
    setImgLoaded(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentVariant]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = () => {
    if (!currentProduct || !currentVariant || !currentProduct.inStock) return;

    addToCart({
      id: currentProduct.id,
      name: currentProduct.name,
      price: currentVariant.price,
      quantity,
      image: currentVariant.image,
    });

    if (isAuthenticated) {
      setToast(`${currentProduct.name} added to cart`);
    } else {
      return;
    }


  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="w-12 h-12 border-4 border-t-[#C45A36] border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!currentProduct) {
    return <p className="text-center mt-20 text-lg text-gray-400">Product not found</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left: Image + Thumbnails */}
        <div className="flex-1 relative">
          {!imgLoaded && (
            <div className="absolute inset-0 flex justify-center items-center bg-gray-100 rounded-3xl">
              <div className="w-10 h-10 border-4 border-t-[#C45A36] border-gray-200 rounded-full animate-spin"></div>
            </div>
          )}
          {currentVariant && (
            <motion.img
              src={currentVariant.image}
              alt={currentProduct.name}
              className={`w-full rounded-3xl shadow-xl object-cover transition-opacity duration-500 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setImgLoaded(true)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
          )}
          {currentVariant?.discount && (
            <span className="absolute top-3 right-3 bg-[#C45A36] text-white font-semibold px-2 py-1 rounded-md text-sm shadow-md">
              {currentVariant.discount}% OFF
            </span>
          )}

          {/* Thumbnails */}
          {currentProduct.variants && currentProduct.variants.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto py-1 snap-x snap-mandatory">
              {currentProduct.variants.map((v, i) => (
                <motion.div
                  key={i}
                  onClick={() => setCurrentVariant(v)}
                  className={`relative cursor-pointer border-2 rounded-lg overflow-hidden flex-shrink-0 snap-start ${currentVariant?.image === v.image ? "border-[#b46029] ring-2 ring-[#b46029]" : "border-gray-300"
                    }`}
                  whileHover={{ scale: 1.05 }}
                  aria-label={`Select variant ${i + 1}`}
                >
                  <img src={v.image} alt={`thumb-${i}`} className="h-20 w-20 object-cover rounded-lg" />
                  {v.discount && (
                    <span className="absolute top-1 left-1 bg-[#b46029] text-white text-xs font-semibold px-1 py-0.5 rounded-md">
                      {v.discount}% OFF
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div className="flex-1 flex flex-col gap-4 sm:gap-5">
          <h1 className="text-3xl sm:text-4xl font-serif text-gray-900">{currentProduct.name}</h1>

          {/* Rating & Price */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.floor(currentProduct.rating || 0) }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400" />
              ))}
            </div>
            <span className="text-2xl sm:text-3xl font-semibold text-[#C45A36]">₹{currentVariant?.price}</span>
            {currentVariant?.discount && <span className="line-through text-gray-400 text-lg ml-2">₹{currentProduct.price}</span>}
          </div>

          {/* Description */}
          {currentProduct.description && <p className="text-gray-600 leading-relaxed">{currentProduct.description}</p>}

          {/* Info Tags */}
          <div className="flex flex-wrap gap-3 text-gray-500 text-sm sm:text-base mt-2">
            {currentProduct.tags?.map((tag, idx) => <span key={idx} className="bg-gray-100 px-2 py-1 rounded">{tag}</span>)}
            <span className={`px-2 py-1 rounded ${currentProduct.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              {currentProduct.inStock ? "In Stock" : "Out of Stock"}
            </span>
            {currentProduct.warranty && <span className="bg-gray-100 px-2 py-1 rounded">{currentProduct.warranty}</span>}
            {currentProduct.returnPolicy && <span className="bg-gray-100 px-2 py-1 rounded">{currentProduct.returnPolicy}</span>}
          </div>

          {/* Additional Details */}
          <div className="mt-4 space-y-2 text-gray-700">
            {currentProduct.material && <p><span className="font-semibold">Material:</span> {currentProduct.material}</p>}
            {currentProduct.dimensions && <p><span className="font-semibold">Dimensions:</span> {currentProduct.dimensions}</p>}
            {currentProduct.weight && <p><span className="font-semibold">Weight:</span> {currentProduct.weight}</p>}
            {currentProduct.careInstructions && <p><span className="font-semibold">Care Instructions:</span> {currentProduct.careInstructions}</p>}
            {currentProduct.delivery && <p><span className="font-semibold">Delivery:</span> {currentProduct.delivery.type}, {currentProduct.delivery.availability}, Estimated {currentProduct.delivery.estimated}</p>}
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex flex-wrap gap-3 mt-4 items-center">
            <div className="flex items-center border rounded-full overflow-hidden">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition">-</button>
              <span className="px-6 py-2">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition">+</button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!currentProduct.inStock}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium shadow-lg ${currentProduct.inStock ? "bg-[#C45A36] hover:bg-[#8c4a20] text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
            >
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
          </div>

          {/* Contents / Customization */}
          <div className="mt-6 flex flex-col gap-4">
            {currentProduct.contents && (
              <div className="bg-gray-50 p-3 rounded-md">
                <h3 className="font-semibold text-gray-800">Contents</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {currentProduct.contents.map((item, idx) => <li key={idx}>{item}</li>)}
                </ul>
              </div>
            )}
            {currentProduct.customization?.available && (
              <div className="bg-gray-50 p-3 rounded-md">
                <h3 className="font-semibold text-gray-800">Customization Options</h3>
                <p className="text-gray-600">{currentProduct.customization.options?.join(", ")}</p>
              </div>
            )}
          </div>

          {/* Specifications */}
          {currentProduct.specifications && (
            <div className="mt-4 bg-gray-50 p-3 rounded-md">
              <h3 className="font-semibold text-gray-800">Specifications</h3>
              <ul className="text-gray-600">
                {Object.entries(currentProduct.specifications).map(([key, value], idx) => (
                  <li key={idx}><span className="font-medium">{key}:</span> {value}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#E8D4B7] text-black px-6 py-3 rounded-lg shadow-lg text-sm sm:text-base z-50"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
       {/* Reviews Section */}
      <CustomerReview productId={currentProduct.id} />
      <FloatingReviewChat productId={currentProduct.id} />
    </div>
  );
}
