// src/ProductDetails/DiwaliHamperDetailPage.tsx
import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { diwaliHampers, DiwaliHamper, Variant } from "../Data/DiwaliHamperdata";
import { useCart } from "../AuthContext/CartContext";
import { ShoppingCart, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CustomerReview from "../Components/CustomerReview";
import FloatingReviewChat from "../Components/FloatingCustomerReview";
import { useAuth } from "../AuthContext/AuthContext";

type Params = { id: string };

// Loader Component
function Loader() {
  return (
    <div className="flex items-center justify-center w-full h-64">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-[#b46029] rounded-full animate-spin"></div>
    </div>
  );
}

export default function DiwaliHamperDetailPage() {
  const { id } = useParams<Params>();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [quantity, setQuantity] = useState<number>(1);
  const [toast, setToast] = useState<string | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  const productFromParams: DiwaliHamper | undefined = diwaliHampers.find(
    (p) => String(p.id) === id
  );

  const [currentProduct, setCurrentProduct] = useState<DiwaliHamper | null>(
    productFromParams ?? null
  );

  const [currentVariant, setCurrentVariant] = useState<Variant | null>(null);

  const [backendRating, setBackendRating] = useState(0);
  const [backendReviewsCount, setBackendReviewsCount] = useState(0);
  const [ratingLoading, setRatingLoading] = useState(true);

  // Loader simulation
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Set default variant
  useEffect(() => {
    if (currentProduct) {
      setCurrentVariant({
        image:
          currentProduct.variants?.[0]?.image ?? currentProduct.image,
        price:
          currentProduct.variants?.[0]?.price ?? currentProduct.price,
        discount:
          currentProduct.variants?.[0]?.discount ??
          currentProduct.discount,
      });
    }
  }, [currentProduct]);

  // Fetch product from backend → backtracking fallback to static
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/corporate/${id}`
        );
        const data = await res.json();

        if (data?.product) {
          setCurrentProduct(data.product);
        } else {
          setCurrentProduct(productFromParams ?? null);
        }
      } catch (err) {
        console.error("Backend fetch failed → using static", err);
        setCurrentProduct(productFromParams ?? null);
      }
    };

    fetchProduct();
  }, [id, productFromParams]);

  const productId = currentProduct?.id;

  // Fetch backend rating
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
        console.log("Rating fetch failed, using static.");
      } finally {
        setRatingLoading(false);
      }
    };

    fetchRating();
  }, [productId]);

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
      setTimeout(() => setToast(null), 1800);
    }
  };

  if (loading) return <Loader />;
  if (!currentProduct)
    return (
      <p className="text-center mt-20 text-lg text-gray-400">
        Hamper not found
      </p>
    );

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
          {currentProduct.variants &&
            currentProduct.variants.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto py-1 snap-x">
                {currentProduct.variants.map((v, i) => (
                  <motion.div
                    key={i}
                    onClick={() => setCurrentVariant(v)}
                    className={`relative cursor-pointer border-2 rounded-lg overflow-hidden flex-shrink-0 ${
                      currentVariant?.image === v.image
                        ? "border-[#b46029] ring-2 ring-[#b46029]"
                        : "border-gray-300"
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={v.image}
                      className="h-20 w-20 object-cover rounded-lg"
                    />
                  </motion.div>
                ))}
              </div>
            )}
        </div>

        {/* Right: Product Info */}
        <div className="flex-1 flex flex-col gap-4 sm:gap-5">
          <h1 className="text-3xl sm:text-4xl font-serif text-gray-900">
            {currentProduct.name}
          </h1>

          {/* Highlight */}
          {currentProduct.highlight && (
            <span className="inline-block bg-[#b46029] text-white px-2 py-1 text-sm rounded-md">
              {currentProduct.highlight}
            </span>
          )}

          {/* Rating + Price */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.floor(backendRating) }).map(
                (_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                  />
                )
              )}
            </div>

            <span className="text-2xl sm:text-3xl font-semibold text-[#b46029]">
              ₹{currentVariant?.price}
            </span>

            {currentVariant?.discount && (
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

          {/* Add to Cart */}
          <div className="mt-4">
            <button
              onClick={handleAddToCart}
              disabled={!currentProduct.inStock}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium shadow-lg ${
                currentProduct.inStock
                  ? "bg-[#b46029] hover:bg-[#8c4a20] text-white"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              <ShoppingCart className="w-5 h-5" /> Add to Cart
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
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-[#E8D4B7] text-black px-6 py-3 rounded-lg shadow-lg z-50"
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
            setBackendRating={setBackendRating}
            setBackendReviewsCount={setBackendReviewsCount}
          />

          <FloatingReviewChat productId={currentProduct.id} />
        </>
      )}
    </div>
  );
}