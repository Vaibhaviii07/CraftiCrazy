
import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import {
  christmasSpecials as staticChristmasSpecials,
  ChristmasSpecial,
  Variant,
} from "../Data/ChristmasSpecialdata";
import { useCart } from "../AuthContext/CartContext";
import { ShoppingCart, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CustomerReview from "../Components/CustomerReview";
import FloatingReviewChat from "../Components/FloatingCustomerReview";
import { useAuth } from "../AuthContext/AuthContext";

type Params = { id: string };

function Loader() {
  return (
    <div className="flex items-center justify-center w-full h-64">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-[#b46029] rounded-full animate-spin"></div>
    </div>
  );
}

export default function ChristmasSpecialDetailPage() {
  const { id } = useParams<Params>();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState<string | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  const staticProduct =
    staticChristmasSpecials.find((p) => p.id === id) || null;

  const [currentProduct, setCurrentProduct] =
    useState<ChristmasSpecial | null>(staticProduct);

  const productId = currentProduct?.id;

  if (!currentProduct) {
    return (
      <p className="text-center mt-20 text-lg text-gray-400">
        Product not found
      </p>
    );
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/christmas/${id}`
        );
        const data = await res.json();

        if (data?.product) {
          setCurrentProduct(data.product);
        } else {
          setCurrentProduct(staticProduct);
        }
      } catch (err) {
        console.error("Failed to fetch product, using static fallback:", err);
        setCurrentProduct(staticProduct);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  
  const [backendRating, setBackendRating] = useState(0);
  const [backendReviewsCount, setBackendReviewsCount] = useState(0);
  const [ratingLoading, setRatingLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    const fetchRating = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/reviews/rating/${productId}`
        );
        const data = await res.json();

        setBackendRating(data.rating || 0);
        setBackendReviewsCount(data.count || 0);
      } catch (err) {
        console.log("Rating fetch failed. Using static rating.");
      } finally {
        setRatingLoading(false);
      }
    };

    fetchRating();
  }, [productId]);

  const finalRating =
    backendRating > 0 ? backendRating : currentProduct.rating ?? 0;

 
  const selectedVariantDefault = useMemo(
    () => ({
      image: currentProduct.variants?.[1]?.image ?? currentProduct.image,
      price: currentProduct.variants?.[0]?.price ?? currentProduct.price,
      discount:
        currentProduct.variants?.[0]?.discount ?? currentProduct.discount,
    }),
    [currentProduct]
  );

  const [selectedVariant, setSelectedVariant] =
    useState<Variant>(selectedVariantDefault);

  useEffect(() => {
    setSelectedVariant(selectedVariantDefault);
    setQuantity(1);
    setImgLoaded(false);
  }, [selectedVariantDefault]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // --------------------------
  // ADD TO CART
  // --------------------------
  const handleAddToCart = () => {
    if (!currentProduct || !selectedVariant || !currentProduct.inStock) return;

    addToCart({
      id: currentProduct.id,
      name: currentProduct.name,
      price: selectedVariant.price,
      quantity,
      image: selectedVariant.image,
    });

    if (isAuthenticated) {
      setToast(`${currentProduct.name} added to cart`);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
 
        <div className="flex-1 relative">
          {!imgLoaded && (
            <div className="w-full h-[400px] sm:h-[500px] rounded-3xl bg-gray-200 animate-pulse"></div>
          )}

          <motion.img
            src={selectedVariant.image}
            alt={currentProduct.name}
            className={`w-full rounded-3xl shadow-xl object-cover transition-opacity duration-500 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImgLoaded(true)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />

          {selectedVariant.discount && (
            <span className="absolute top-3 right-3 bg-[#b46029] text-white font-semibold px-2 py-1 rounded-md text-sm shadow-md">
              {selectedVariant.discount}% OFF
            </span>
          )}

          {/* VARIANT THUMBNAILS */}
          {currentProduct.variants && currentProduct.variants.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto py-1 snap-x snap-mandatory">
              {currentProduct.variants.map((v, i) => (
                <motion.div
                  key={i}
                  onClick={() => setSelectedVariant(v)}
                  className={`relative cursor-pointer border-2 rounded-lg overflow-hidden flex-shrink-0 snap-start ${
                    selectedVariant.image === v.image
                      ? "border-[#b46029] ring-2 ring-[#b46029]"
                      : "border-gray-300"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={v.image}
                    alt={`thumb-${i}`}
                    className="h-20 w-20 object-cover rounded-lg"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col gap-4 sm:gap-5">
          <h1 className="text-3xl sm:text-4xl font-serif text-gray-900">
            {currentProduct.name}
          </h1>

          {currentProduct.highlight && (
            <span className="inline-block bg-[#b46029] text-white px-2 py-1 text-sm rounded-md">
              {currentProduct.highlight}
            </span>
          )}

          {/* ⭐ RATING + PRICE */}
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
              ₹{selectedVariant.price}
            </span>

            {selectedVariant.discount && (
              <span className="line-through text-gray-400 text-lg ml-2">
                ₹{currentProduct.price}
              </span>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-3 text-gray-700">
            {currentProduct.description && <p>{currentProduct.description}</p>}
            {currentProduct.material && (
              <p>
                <span className="font-semibold">Material:</span>{" "}
                {currentProduct.material}
              </p>
            )}
            {currentProduct.dimensions && (
              <p>
                <span className="font-semibold">Dimensions:</span>{" "}
                {currentProduct.dimensions}
              </p>
            )}
            {currentProduct.weight && (
              <p>
                <span className="font-semibold">Weight:</span>{" "}
                {currentProduct.weight}
              </p>
            )}
            {currentProduct.careInstructions && (
              <p>
                <span className="font-semibold">Care Instructions:</span>{" "}
                {currentProduct.careInstructions}
              </p>
            )}
          </div>

          {/* TAGS */}
          <div className="flex flex-wrap gap-3 text-gray-500 text-sm sm:text-base mt-2">
            {currentProduct.tags?.map((tag, idx) => (
              <span key={idx} className="bg-gray-100 px-2 py-1 rounded">
                {tag}
              </span>
            ))}

            <span
              className={`px-2 py-1 rounded ${
                currentProduct.inStock
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {currentProduct.inStock ? "In Stock" : "Out of Stock"}
            </span>

            {currentProduct.warranty && (
              <span className="bg-gray-100 px-2 py-1 rounded">
                {currentProduct.warranty}
              </span>
            )}
          </div>

          {/* ADD TO CART */}
          <div className="flex flex-wrap gap-3 mt-4 items-center">
            <button
              onClick={handleAddToCart}
              disabled={!currentProduct.inStock}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium shadow-lg ${
                currentProduct.inStock
                  ? "bg-[#b46029] hover:bg-[#8c4a20] text-white"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              <ShoppingCart className="w-5 h-5 cursor-pointer" /> Add to Cart
            </button>
          </div>

          {/* CONTENTS */}
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

            {/* CUSTOMIZATION */}
            {currentProduct.customization?.available && (
              <div className="bg-gray-50 p-3 rounded-md">
                <h3 className="font-semibold text-gray-800">
                  Customization Options
                </h3>
                <p className="text-gray-600">
                  {currentProduct.customization.options?.join(", ")}
                </p>
              </div>
            )}

            {/* DELIVERY */}
            {currentProduct.delivery && (
              <div className="bg-gray-50 p-3 rounded-md">
                <h3 className="font-semibold text-gray-800">Delivery</h3>
                <p className="text-gray-600">
                  {currentProduct.delivery.type},{" "}
                  {currentProduct.delivery.availability}, Estimated{" "}
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
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#E8D4B7] text-black px-6 py-3 rounded-lg shadow-lg text-sm sm:text-base z-50"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      
      {currentProduct && (
        <>
          <CustomerReview
            productId={currentProduct.id}
            setBackendRating={setBackendRating}
            setBackendReviewsCount={setBackendReviewsCount}
          />
          <FloatingReviewChat productId={currentProduct.id} />
        </>
      )}
    </div>
  );
}
