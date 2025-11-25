// src/ProductDetails/ResinCoasterDetailPage.tsx
import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo, useRef } from "react";
import { resinCoasterSets, ResinCoaster, Variant } from "../Data/ResinCoasterSetData";
import { useCart } from "../AuthContext/CartContext";
import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CustomerReview from "../Components/CustomerReview";
import FloatingReviewChat from "../Components/FloatingCustomerReview";
import { useAuth } from "../AuthContext/AuthContext";

type Params = { id: string };

// Extend Variant for local id (like ResinClockDetailPage)
type LocalVariant = Variant & { id: string };

export default function ResinCoasterDetailPage() {
  const { id } = useParams<Params>();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [quantity, setQuantity] = useState<number>(1);
  const [toast, setToast] = useState<string | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [backendRating, setBackendRating] = useState<number>(0);
  const [backendReviewsCount, setBackendReviewsCount] = useState<number>(0);

  const [loading, setLoading] = useState(true);

  // Find product from static data initially
  const productFromParams: ResinCoaster | undefined = resinCoasterSets.find(p => String(p.id) === id);
  const [currentProduct, setCurrentProduct] = useState<ResinCoaster | null>(productFromParams ?? null);

  // Selected variant logic (with local id)
  const selectedVariantDefault = useMemo<LocalVariant | null>(() => {
    if (!currentProduct) return null;
    const firstVariant = currentProduct.variants?.[0];
    const derivedId = (firstVariant && ((firstVariant as any).id ?? `${currentProduct.id}-default`)) || `${currentProduct.id}-default`;
    return {
      ...(firstVariant || {}),
      image: firstVariant?.image ?? currentProduct.image,
      price: firstVariant?.price ?? currentProduct.price,
      discount: firstVariant?.discount ?? currentProduct.discount,
      id: derivedId,
    } as LocalVariant;
  }, [currentProduct]);

  const [currentVariant, setCurrentVariant] = useState<LocalVariant | null>(selectedVariantDefault);

  // Update currentVariant whenever selectedVariantDefault changes
  useEffect(() => {
    setCurrentVariant(selectedVariantDefault);
    setQuantity(1);
    setImgLoaded(false);
    setBackendRating(0);
    setBackendReviewsCount(0);
  }, [selectedVariantDefault]);

  // Fetch product from backend
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/products/${id}`);
        if (!res.ok) throw new Error("Product fetch failed");
        const data = await res.json();
        if (data?.product) setCurrentProduct(data.product);
        else setCurrentProduct(resinCoasterSets.find(p => String(p.id) === id) ?? null);
      } catch (err) {
        setCurrentProduct(resinCoasterSets.find(p => String(p.id) === id) ?? null);
      }
    };

    fetchProduct();
  }, [id]);

  // Fetch reviews for current product + variant
 // Fetch reviews from backend
  useEffect(() => {
    if (!currentProduct) return;

    const fetchReviews = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/reviews/product/${currentProduct.id}?limit=8`
        );
        if (!res.ok) throw new Error("Failed to fetch reviews");
        const data = await res.json();
        setBackendRating(data.averageRating ?? 0);
        setBackendReviewsCount(data.reviewCount ?? 0);
      } catch (err) {
        console.error("Reviews fetch failed", err);
        setBackendRating(0);
        setBackendReviewsCount(0);
      }
    };

    fetchReviews();
  }, [currentProduct]);

  // Loading simulation
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Add to Cart
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
        <div className="w-12 h-12 border-4 border-t-[#C45A36] border-gray-200 rounded-full animate-spin"></div>
      </div>
    );

  if (!currentProduct)
    return <p className="text-center mt-20 text-lg text-gray-400">Product not found</p>;

  const finalRating = backendRating > 0 ? backendRating : currentProduct.rating ?? 0;
  const finalReviewsCount =
    backendReviewsCount > 0 ? backendReviewsCount : currentProduct.reviews ?? 0;

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
              className={`w-full rounded-3xl shadow-xl object-cover transition-opacity duration-500 ${
                imgLoaded ? "opacity-100" : "opacity-0"
              }`}
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

          {currentProduct.variants && currentProduct.variants.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto py-1 snap-x snap-mandatory">
              {currentProduct.variants.map((v, i) => (
                <motion.div
                  key={(v as any).id ?? i}
                  onClick={() => setCurrentVariant({ ...(v as any), id: (v as any).id ?? `${currentProduct.id}-v${i}` })}
                  className={`relative cursor-pointer border-2 rounded-lg overflow-hidden flex-shrink-0 snap-start ${
                    currentVariant?.image === v.image
                      ? "border-[#b46029] ring-2 ring-[#b46029]"
                      : "border-gray-300"
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

        {/* Right: Product Info */}
        <div className="flex-1 flex flex-col gap-4 sm:gap-5">
          <h1 className="text-3xl sm:text-4xl font-serif text-gray-900">{currentProduct.name}</h1>

          {/* Rating & Price */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="text-2xl sm:text-3xl font-semibold text-[#C45A36]">₹{currentVariant?.price}</span>
            {currentVariant?.discount && (
              <span className="line-through text-gray-400 text-lg ml-2">₹{currentProduct.price}</span>
            )}
          </div>

         {/* Description */}
          {currentProduct.description && <p className="text-gray-700 leading-relaxed">{currentProduct.description}</p>}

          {/* Tags / Stock / Brand */}
          <div className="flex flex-wrap gap-3 text-gray-500 text-sm sm:text-base mt-2">
            {currentProduct.brand && <span className="bg-gray-100 px-2 py-1 rounded">{currentProduct.brand}</span>}
            <span className={`px-2 py-1 rounded ${currentProduct.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              {currentProduct.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {/* Additional Details */}
          <div className="mt-4 space-y-2 text-gray-700">
            {currentProduct.material && <p><span className="font-semibold">Material:</span> {currentProduct.material}</p>}
            {currentProduct.dimensions && <p><span className="font-semibold">Dimensions:</span> {currentProduct.dimensions}</p>}
            {currentProduct.weight && <p><span className="font-semibold">Weight:</span> {currentProduct.weight}</p>}
            {currentProduct.careInstructions && <p><span className="font-semibold">Care Instructions:</span> {currentProduct.careInstructions}</p>}
            {currentProduct.delivery && <p><span className="font-semibold">Delivery:</span> {currentProduct.delivery.type}, {currentProduct.delivery.availability}, Estimated {currentProduct.delivery.estimated}</p>}
          </div>

          {/* Add to Cart */}
          <div className="flex flex-wrap gap-3 sm:gap-4 mt-4 items-center">
            <button
              onClick={handleAddToCart}
              disabled={!currentProduct.inStock}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium shadow-lg ${currentProduct.inStock ? "bg-[#b46029] hover:bg-[#8c4a20] text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
            >
              <ShoppingCart className="w-5 h-5 cursor-pointer" /> Add to Cart
            </button>
          </div>

          {/* Extra Sections */}
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

            {currentProduct.specifications && (
              <div className="bg-gray-50 p-3 rounded-md">
                <h3 className="font-semibold text-gray-800">Specifications</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {Object.entries(currentProduct.specifications).map(([key, value], idx) => (
                    <li key={idx}><span className="font-medium">{key}:</span> {value}</li>
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
      {currentProduct && currentVariant && (
        <>
          <CustomerReview
            productId={currentProduct.id}
            variantId={currentVariant.id}
            setBackendRating={setBackendRating}
            setBackendReviewsCount={setBackendReviewsCount}
          />
          <FloatingReviewChat productId={currentProduct.id} variantId={currentVariant.id} />
        </>
      )}
    </div>
  );
}
