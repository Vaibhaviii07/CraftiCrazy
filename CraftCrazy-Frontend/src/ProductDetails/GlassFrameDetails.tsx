// src/ProductDetails/GlassFrameDetailPage.tsx
import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo, useRef } from "react";
import { glassFrames, GlassFrame, Variant } from "../Data/GlassFramedata";
import { useCart } from "../AuthContext/CartContext";
import { ShoppingCart, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CustomerReview from "../Components/CustomerReview";
import FloatingReviewChat from "../Components/FloatingCustomerReview";
import { useAuth } from "../AuthContext/AuthContext";

type Params = { id: string };

export default function GlassFrameDetailPage() {
  const { id } = useParams<Params>();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [quantity, setQuantity] = useState<number>(1);
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);

  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Backend rating & reviews
  const [backendRating, setBackendRating] = useState<number>(0);
  const [backendReviewsCount, setBackendReviewsCount] = useState<number>(0);

  // Initial product from static data
  const productFromParams: GlassFrame | undefined = glassFrames.find((p) => p.id === id);
  const [currentProduct, setCurrentProduct] = useState<GlassFrame | null>(productFromParams ?? null);

  // Variant selection
  const selectedVariant = useMemo(() => {
    if (!currentProduct) return null;
    return {
      image: currentProduct.variants?.[0]?.image ?? currentProduct.image,
      price: currentProduct.variants?.[0]?.price ?? currentProduct.price,
      discount: currentProduct.variants?.[0]?.discount ?? currentProduct.discount,
    } as Variant;
  }, [currentProduct]);

  const [currentVariant, setCurrentVariant] = useState<Variant | null>(selectedVariant);

  // Loading spinner simulation
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Fetch product from backend
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/glass-frames/${id}`);
        if (!res.ok) throw new Error("Product fetch failed");
        const data = await res.json();
        if (data?.product) setCurrentProduct(data.product);
        else setCurrentProduct(productFromParams ?? null);
      } catch (err) {
        setCurrentProduct(productFromParams ?? null);
      }
    };

    fetchProduct();
  }, [id, productFromParams]);

  // Fetch backend reviews & rating
  useEffect(() => {
    if (!id) return;

    const fetchReviews = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/reviews/product/${id}`);
        if (!res.ok) throw new Error("Reviews fetch failed");
        const data = await res.json();
        if (typeof data.averageRating === "number") setBackendRating(data.averageRating);
        if (typeof data.totalReviews === "number") setBackendReviewsCount(data.totalReviews);
      } catch (err) {
        setBackendRating(0);
        setBackendReviewsCount(0);
      }
    };

    fetchReviews();
  }, [id]);

  // Use backend rating if available, else static
  const finalRating = backendRating > 0 ? backendRating : currentProduct?.rating ?? 0;
  const finalReviewsCount =
    backendReviewsCount > 0 ? backendReviewsCount : currentProduct?.reviews ?? 0;

  // Reset variant & quantity when product changes
  useEffect(() => {
    setCurrentVariant(selectedVariant);
    setQuantity(1);
    setImgLoaded(false);
  }, [selectedVariant]);

  const handleAddToCart = () => {
    if (!currentProduct || !currentVariant) return;

    addToCart({
      id: currentProduct.id,
      name: currentProduct.name,
      price: currentVariant.price,
      quantity,
      image: currentVariant.image,
    });

    if (isAuthenticated) {
      setToast(`${currentProduct.name} added to cart`);
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = setTimeout(() => setToast(null), 3000);
    }
  };

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-96">
        <div className="w-12 h-12 border-4 border-t-[#b46029] border-gray-200 rounded-full animate-spin"></div>
      </div>
    );

  if (!currentProduct)
    return <p className="text-center mt-20 text-lg text-gray-400">Product not found</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left: Image */}
        <div className="flex-1 relative">
          {!imgLoaded && (
            <div className="absolute inset-0 flex justify-center items-center bg-gray-100 rounded-3xl">
              <div className="w-10 h-10 border-4 border-t-[#b46029] border-gray-200 rounded-full animate-spin"></div>
            </div>
          )}

          {currentVariant && (
            <motion.img
              src={currentVariant.image}
              alt={currentProduct.name}
              className={`w-full rounded-3xl shadow-xl object-cover transition-opacity duration-500 ${
                imgLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImgLoaded(true)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
          )}

          {currentVariant?.discount && (
            <span className="absolute top-3 right-3 bg-[#b46029] text-white font-semibold px-2 py-1 rounded-md text-sm shadow-md">
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
                  className={`relative cursor-pointer border-2 rounded-lg overflow-hidden flex-shrink-0 snap-start ${
                    currentVariant?.image === v.image ? "border-[#b46029] ring-2 ring-[#b46029]" : "border-gray-300"
                  }`}
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

        {/* Right: Info */}
        <div className="flex-1 flex flex-col gap-4 sm:gap-5">
          <h1 className="text-3xl sm:text-4xl font-serif text-gray-900">{currentProduct.name}</h1>

          {/* Rating & Price */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.floor(finalRating) }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400" />
              ))}
              <span className="ml-1 text-gray-600 text-sm">({finalRating.toFixed(1)} | {finalReviewsCount} reviews)</span>
            </div>

            <span className="text-2xl sm:text-3xl font-semibold text-[#b46029]">₹{currentVariant?.price}</span>

            {currentVariant?.discount && (
              <span className="line-through text-gray-400 text-lg ml-2">₹{currentProduct.price}</span>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed">{currentProduct.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 text-gray-500 text-sm sm:text-base">
            {currentProduct.brand && <span className="bg-gray-100 px-2 py-1 rounded">{currentProduct.brand}</span>}
            {currentProduct.seller && <span className="bg-gray-100 px-2 py-1 rounded">{currentProduct.seller}</span>}
            <span className={`px-2 py-1 rounded ${currentProduct.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              {currentProduct.inStock ? "In Stock" : "Out of Stock"}
            </span>
            {currentProduct.warranty && <span className="bg-gray-100 px-2 py-1 rounded">{currentProduct.warranty}</span>}
          </div>

          {/* Add to Cart */}
          <div className="flex flex-wrap gap-3 sm:gap-4 mt-4 items-center">
            <button
              onClick={handleAddToCart}
              disabled={!currentProduct.inStock}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium shadow-lg ${
                currentProduct.inStock ? "bg-[#b46029] hover:bg-[#8c4a20] text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              <ShoppingCart className="w-5 h-5 cursor-pointer" /> Add to Cart
            </button>
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
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#E8D4B7] text-black px-6 py-3 rounded-lg shadow-lg text-sm sm:text-base"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reviews */}
      {currentProduct && (
        <>
          <CustomerReview
            productId={currentProduct.id}
            setBackendRating={setBackendRating as any}
            setBackendReviewsCount={setBackendReviewsCount as any}
          />
          <FloatingReviewChat productId={currentProduct.id} />
        </>
      )}
    </div>
  );
}
