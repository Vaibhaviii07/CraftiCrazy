// src/Pages/CustomizedHamper/CorporateHamperDetails.tsx
import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo, useRef } from "react";
import { corporateHampers, CorporateHamper, Variant } from "../Data/CorporateData";
import { useCart } from "../AuthContext/CartContext";
import { Star, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CustomerReview from "../Components/CustomerReview";
import FloatingCustomerReview from "../Components/FloatingCustomerReview";
import { useAuth } from "../AuthContext/AuthContext";

type Params = { id: string };

function Loader() {
  return (
    <div className="flex items-center justify-center w-full h-64">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-[#b46029] rounded-full animate-spin"></div>
    </div>
  );
}

export default function CorporateHamperDetails() {
  const { id } = useParams<Params>();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  // UI states
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Ratings state (for CustomerReview -> setBackendRating)
  const [backendRating, setBackendRating] = useState<number>(0);
  const [backendReviewsCount, setBackendReviewsCount] = useState<number>(0);
  const [ratingLoading, setRatingLoading] = useState<boolean>(true);

  // static fallback product (immediate render)
  const staticProduct = corporateHampers.find((p) => p.id === id) ?? null;

  // dynamic product state (may replace static with backend product)
  const [currentProduct, setCurrentProduct] = useState<CorporateHamper | null>(staticProduct);

  // loading spinner simulation (keeps UX consistent)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  // if no product found in static and loading finished -> show not found
  if (!staticProduct && !loading) {
    return <p className="text-center mt-20 text-lg text-gray-400">Product not found</p>;
  }

  // default selected variant (safe memo)
  const defaultVariant = useMemo<Variant | null>(() => {
    if (!currentProduct) return null;
    return {
      image: currentProduct.variants?.[1]?.image ?? currentProduct.image,
      price: currentProduct.variants?.[0]?.price ?? currentProduct.price,
      discount: currentProduct.variants?.[0]?.discount ?? currentProduct.discount,
      inStock: currentProduct.inStock ?? true,
    };
  }, [currentProduct]);

  const [currentVariant, setCurrentVariant] = useState<Variant | null>(defaultVariant);

  useEffect(() => {
    setCurrentVariant(defaultVariant);
    setQuantity(1);
    setImgLoaded(false);
  }, [defaultVariant]);

  // Add to cart handler with toast
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
      // auto clear toast
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = setTimeout(() => setToast(null), 3000);
    }
  };

  // fetch product from backend, fallback to static if fails
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/corporate/${id}`);
        if (!res.ok) throw new Error("fetch failed");
        const data = await res.json();
        setCurrentProduct(data?.product ?? staticProduct);
      } catch (err) {
        console.error("Product fetch failed, using static:", err);
        setCurrentProduct(staticProduct);
      }
    };

    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // rating fetch (backend)
  useEffect(() => {
    const productId = currentProduct?.id;
    if (!productId) {
      setRatingLoading(false);
      return;
    }

    const fetchRating = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/reviews/rating/${productId}`);
        const data = await res.json();
        setBackendRating(data.rating ?? 0);
        setBackendReviewsCount(data.totalReviews ?? 0);
      } catch (err) {
        console.log("Rating fetch failed, using static if any.");
      } finally {
        setRatingLoading(false);
      }
    };

    fetchRating();
  }, [currentProduct]);

  // cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  if (loading) return <Loader />;

  if (!currentProduct) {
    return <p className="text-center mt-20 text-lg text-gray-400">Product not found</p>;
  }

  const finalRating = backendRating > 0 ? backendRating : currentProduct.rating ?? 0;

  const customizationOptionsText =
    currentProduct.customization?.available && Array.isArray(currentProduct.customization.options)
      ? currentProduct.customization.options.join(", ")
      : "";

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* IMAGE / THUMBNAILS */}
        <div className="flex-1 relative">
          {!imgLoaded && (
            <div className="w-full h-[400px] sm:h-[500px] rounded-3xl bg-gray-200 animate-pulse" />
          )}

          <motion.img
            src={currentVariant?.image ?? currentProduct.image}
            alt={currentProduct.name}
            className={`w-full rounded-3xl shadow-xl object-cover transition-opacity duration-500 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImgLoaded(true)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.45 }}
          />

          {currentVariant?.discount && (
            <span className="absolute top-3 right-3 bg-[#b46029] text-white font-semibold px-2 py-1 rounded-md text-sm shadow-md">
              {currentVariant.discount}% OFF
            </span>
          )}

          {/* thumbnails */}
          {currentProduct.variants && currentProduct.variants.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto py-1 snap-x snap-mandatory">
              {currentProduct.variants!.map((v, i) => (
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

        {/* DETAILS */}
        <div className="flex-1 flex flex-col gap-4 sm:gap-5">
          <h1 className="text-3xl sm:text-4xl font-serif text-gray-900">{currentProduct.name}</h1>

          {currentProduct.highlight && (
            <span className="inline-block bg-[#b46029] text-white px-2 py-1 text-sm rounded-md">
              {currentProduct.highlight}
            </span>
          )}

          {/* RATING + PRICE */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-1">
              {ratingLoading ? (
                <span className="text-gray-400 text-sm">Loading...</span>
              ) : (
                Array.from({ length: Math.floor(finalRating) }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400" />
                ))
              )}
            </div>

            <span className="text-2xl sm:text-3xl font-semibold text-[#b46029]">
              ₹{currentVariant?.price ?? currentProduct.price}
            </span>

            {currentVariant?.discount && (
              <span className="line-through text-gray-400 text-lg ml-2">₹{currentProduct.price}</span>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-3 text-gray-700">
            {currentProduct.description && <p>{currentProduct.description}</p>}
            {currentProduct.material && (
              <p>
                <span className="font-semibold">Material:</span> {currentProduct.material}
              </p>
            )}
            {currentProduct.dimensions && (
              <p>
                <span className="font-semibold">Dimensions:</span> {currentProduct.dimensions}
              </p>
            )}
            {currentProduct.weight && (
              <p>
                <span className="font-semibold">Weight:</span> {currentProduct.weight}
              </p>
            )}
            {currentProduct.careInstructions && (
              <p>
                <span className="font-semibold">Care Instructions:</span> {currentProduct.careInstructions}
              </p>
            )}
          </div>

          {/* TAGS / STOCK / WARRANTY */}
          <div className="flex flex-wrap gap-3 text-gray-500 text-sm sm:text-base mt-2">
            {currentProduct.tags?.map((tag, idx) => (
              <span key={idx} className="bg-gray-100 px-2 py-1 rounded">
                {tag}
              </span>
            ))}

            <span
              className={`px-2 py-1 rounded ${
                currentProduct.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {currentProduct.inStock ? "In Stock" : "Out of Stock"}
            </span>

            {currentProduct.warranty && <span className="bg-gray-100 px-2 py-1 rounded">{currentProduct.warranty}</span>}
          </div>

          {/* ADD TO CART */}
          <div className="flex flex-wrap gap-3 mt-4 items-center">
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

          {/* CONTENTS / CUSTOMIZATION / DELIVERY */}
          <div className="mt-6 flex flex-col gap-4">
            {currentProduct.contents && (
              <div className="bg-gray-50 p-3 rounded-md">
                <h3 className="font-semibold text-gray-800">Contents</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {currentProduct.contents.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {currentProduct.customization?.available && (
              <div className="bg-gray-50 p-3 rounded-md">
                <h3 className="font-semibold text-gray-800">Customization Options</h3>
                <p className="text-gray-600">{customizationOptionsText || "Contact us for customization"}</p>
              </div>
            )}

            {currentProduct.delivery && (
              <div className="bg-gray-50 p-3 rounded-md">
                <h3 className="font-semibold text-gray-800">Delivery</h3>
                <p className="text-gray-600">
                  {currentProduct.delivery.type}, {currentProduct.delivery.availability}, Estimated{" "}
                  {currentProduct.delivery.estimated}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#E8D4B7] text-black px-6 py-3 rounded-lg shadow-lg text-sm sm:text-base z-50"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* REVIEWS (passes setters so review component can update rating/count) */}
      <CustomerReview
        productId={currentProduct.id}
        setBackendRating={setBackendRating}
        setBackendReviewsCount={setBackendReviewsCount}
      />
      <FloatingCustomerReview productId={currentProduct.id} />
    </div>
  );
}