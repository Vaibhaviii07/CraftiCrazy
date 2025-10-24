// src/ProductDetails/ResinFrameDetailPage.tsx
import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { resinFrames, ResinFrame, Variant } from "../Data/ResinFramedata";
import { useCart } from "../AuthContext/CartContext";
import { ShoppingCart, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CustomerReview from "../Components/CustomerReview";
import FloatingCustomerReview from "../Components/FloatingCustomerReview";
import { useAuth } from "../AuthContext/AuthContext";

type Params = { id: string };

// Loader Component
function Loader() {
  return (
    <div className="flex items-center justify-center w-full h-64">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-[#C45A36] rounded-full animate-spin"></div>
    </div>
  );
}

export default function ResinFrameDetailPage() {
  const { id } = useParams<Params>();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [loading, setLoading] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const [currentProduct, setCurrentProduct] = useState<ResinFrame | null>(null);

  // Reviews state
  const [averageRating, setAverageRating] = useState(0);

  // Fetch product from API with fallback to static data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/resinFrames/${id}`);
        if (!res.ok) throw new Error(`API responded with status ${res.status}`);
        const data: ResinFrame = await res.json();
        setCurrentProduct(data);
      } catch (error) {
        console.error("Error fetching product from API, using static fallback:", error);
        const fallback = resinFrames.find(p => String(p.id) === id) ?? null;
        setCurrentProduct(fallback);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Default selected variant
  const selectedVariantDefault = useMemo<Variant | null>(() => {
    if (!currentProduct) return null;
    return {
      image: currentProduct.variants?.[0]?.image ?? currentProduct.image,
      price: currentProduct.variants?.[0]?.price ?? currentProduct.price,
      discount: currentProduct.variants?.[0]?.discount ?? currentProduct.discount,
    };
  }, [currentProduct]);

  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(selectedVariantDefault);

  useEffect(() => {
    setSelectedVariant(selectedVariantDefault);
    setQuantity(1);
    setImgLoaded(false);
  }, [selectedVariantDefault]);

  const handleAddToCart = () => {
    if (!currentProduct || !selectedVariant) return;

    addToCart({
      id: currentProduct.id,
      name: currentProduct.name,
      price: selectedVariant.price,
      quantity,
      image: selectedVariant.image,
    });

    if (isAuthenticated) {
      setToast(`${currentProduct.name} added to cart`);
      setTimeout(() => setToast(null), 2000);
    }
  };

  if (loading) return <Loader />;
  if (!currentProduct) return <p className="text-center mt-20 text-lg text-gray-400">Product not found</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left: Image + Thumbnails */}
        <div className="flex-1 relative">
          {!imgLoaded && (
            <div className="w-full h-[400px] sm:h-[500px] rounded-3xl bg-gray-200 animate-pulse"></div>
          )}
          {selectedVariant?.image && (
            <motion.img
              src={selectedVariant.image}
              alt={currentProduct.name}
              className={`w-full rounded-3xl shadow-xl object-cover transition-opacity duration-500 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setImgLoaded(true)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
          )}
          {selectedVariant?.discount && (
            <span className="absolute top-3 right-3 bg-[#C45A36] text-white font-semibold px-2 py-1 rounded-md text-sm shadow-md">
              {selectedVariant.discount}% OFF
            </span>
          )}

          {/* Thumbnails */}
          {currentProduct.variants && currentProduct.variants.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto py-1 snap-x snap-mandatory">
              {currentProduct.variants.map((v, i) => (
                <motion.div
                  key={i}
                  onClick={() => setSelectedVariant(v)}
                  className={`relative cursor-pointer border-2 rounded-lg overflow-hidden flex-shrink-0 snap-start ${selectedVariant?.image === v.image ? "border-[#b46029] ring-2 ring-[#b46029]" : "border-gray-300"}`}
                  whileHover={{ scale: 1.05 }}
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
              {Array.from({ length: averageRating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400" />
              ))}
            </div>
            <span className="text-2xl sm:text-3xl font-semibold text-[#C45A36]">₹{selectedVariant?.price}</span>
            {selectedVariant?.discount && (
              <span className="line-through text-gray-400 text-lg ml-2">₹{currentProduct.price}</span>
            )}
          </div>

          {/* Description / Details */}
          <div className="space-y-3 text-gray-700">
            {currentProduct.description && <p>{currentProduct.description}</p>}
            {currentProduct.material && <p><span className="font-semibold">Material:</span> {currentProduct.material}</p>}
            {currentProduct.dimensions && <p><span className="font-semibold">Dimensions:</span> {currentProduct.dimensions}</p>}
            {currentProduct.weight && <p><span className="font-semibold">Weight:</span> {currentProduct.weight}</p>}
            {currentProduct.careInstructions && <p><span className="font-semibold">Care Instructions:</span> {currentProduct.careInstructions}</p>}
          </div>

          {/* Tags / Stock / Warranty */}
          <div className="flex flex-wrap gap-3 text-gray-500 text-sm sm:text-base mt-2">
            {currentProduct.tags?.map((tag, idx) => <span key={idx} className="bg-gray-100 px-2 py-1 rounded">{tag}</span>)}
            <span className={`px-2 py-1 rounded ${currentProduct.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              {currentProduct.inStock ? "In Stock" : "Out of Stock"}
            </span>
            {currentProduct.warranty && <span className="bg-gray-100 px-2 py-1 rounded">{currentProduct.warranty}</span>}
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex flex-wrap gap-3 mt-4 items-center">
            <div className="flex items-center border rounded-full overflow-hidden">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition">-</button>
              <span className="px-6 py-2">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition">+</button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!currentProduct.inStock}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium shadow-lg ${
                currentProduct.inStock ? "bg-[#C45A36] hover:bg-[#8c4a20] text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
          </div>

          {/* Contents / Customization / Delivery */}
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
            {currentProduct.delivery && (
              <div className="bg-gray-50 p-3 rounded-md">
                <h3 className="font-semibold text-gray-800">Delivery</h3>
                <p className="text-gray-600">
                  {currentProduct.delivery.type}, {currentProduct.delivery.availability}, Estimated {currentProduct.delivery.estimated}
                </p>
              </div>
            )}
             {currentProduct.specifications && (
              <div className="bg-gray-50 p-3 rounded-md">
                <h3 className="font-semibold text-gray-800">Specifications</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {Object.entries(currentProduct.specifications).map(([key, value], idx) => (
                    <li key={idx}>
                      <span className="font-medium">{key}:</span> {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
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

      {/* Reviews */}
      <CustomerReview productId={currentProduct.id} />
      <FloatingCustomerReview productId={currentProduct.id} />
    </div>
  );
}
