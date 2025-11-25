// src/ProductDetails/ChristmasSpecialDetailPage.tsx
import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo, useRef } from "react";
import { useCart } from "../AuthContext/CartContext";
import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CustomerReview from "../Components/CustomerReview";
import FloatingReviewChat from "../Components/FloatingCustomerReview";
import { useAuth } from "../AuthContext/AuthContext";

// Static fallback
import { christmasSpecials as staticChristmasSpecials } from "../Data/ChristmasSpecialdata";

type Variant = {
  image?: string;
  price?: number;
  discount?: number;
  inStock?: boolean;
  [k: string]: any;
};

type ChristmasSpecial = {
  id: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  rating?: number;
  reviews?: number;
  variants?: Variant[];
  inStock?: boolean;
  tags?: string[];
  contents?: string[];
  customization?: { available: boolean; options?: string[] };
  specifications?: Record<string, string>;
  material?: string;
  dimensions?: string;
  weight?: string;
  careInstructions?: string;
  brand?: string;
  seller?: string;
  warranty?: string;
  returnPolicy?: string;
};

type Params = { id: string };

// Local variant type that guarantees an `id`
type LocalVariant = Variant & { id: string; image: string; price: number; discount?: number; inStock?: boolean };

export default function ChristmasSpecialDetailPage() {
  const { id } = useParams<Params>();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [currentProduct, setCurrentProduct] = useState<ChristmasSpecial | null>(null);
  const [currentVariant, setCurrentVariant] = useState<LocalVariant | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [backendRating, setBackendRating] = useState<number>(0);
  const [backendReviewsCount, setBackendReviewsCount] = useState<number>(0);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Static fallback
  const staticProduct = staticChristmasSpecials.find((p) => p.id === id) ?? null;

  // small loading delay
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  // Fetch product from backend
  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/products/${id}`);
        if (!res.ok) throw new Error("Product fetch failed");
        const data = await res.json();
        setCurrentProduct((data?.product as ChristmasSpecial) ?? staticProduct);
      } catch {
        setCurrentProduct(staticProduct);
      }
    };
    fetchProduct();
  }, [id, staticProduct]);

  // Derive selected variant
  const selectedVariant = useMemo<LocalVariant | null>(() => {
    if (!currentProduct) return null;
    const first = currentProduct.variants?.[0];
    const derivedId =
      (first && ((first as any).id ?? (first as any).variantId)) ??
      `${currentProduct.id}-default`;

    return {
      ...(first ?? {}),
      image: (first && ((first as any).image ?? currentProduct.image)) ?? currentProduct.image,
      price: (first && ((first as any).price ?? currentProduct.price)) ?? currentProduct.price,
      discount: (first && (first as any).discount) ?? (currentProduct as any).discount,
      inStock: (first && (first as any).inStock) ?? currentProduct.inStock ?? true,
      id: String(derivedId),
    } as LocalVariant;
  }, [currentProduct]);

  useEffect(() => {
    setCurrentVariant(selectedVariant);
    setQuantity(1);
    setBackendRating(0);
    setBackendReviewsCount(0);
    setImgLoaded(false);
  }, [selectedVariant]);

  // Fetch backend reviews
  useEffect(() => {
    if (!currentVariant || !currentProduct) return;
    const fetchReviews = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/reviews/product/${currentProduct.id}?limit=8`
        );
        if (!res.ok) throw new Error("Reviews fetch failed");
        const data = await res.json();
        setBackendRating(data.averageRating ?? 0);
        setBackendReviewsCount(data.reviewCount ?? 0);
      } catch {
        setBackendRating(0);
        setBackendReviewsCount(0);
      }
    };
    fetchReviews();
  }, [currentVariant, currentProduct]);

  const finalRating = backendRating > 0 ? backendRating : currentProduct?.rating ?? 0;
  const finalReviewsCount = backendReviewsCount > 0 ? backendReviewsCount : currentProduct?.reviews ?? 0;

  // Add to cart
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

  const CustomerReviewAny = CustomerReview as any;
  const FloatingReviewChatAny = FloatingReviewChat as any;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* LEFT: Image */}
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

          {/* Variant thumbnails */}
          {currentProduct.variants && currentProduct.variants.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto py-1 snap-x snap-mandatory">
              {currentProduct.variants.map((v, i) => {
                const derivedId = (v as any).id ?? (v as any).variantId ?? `${currentProduct.id}-v${i}`;
                const localV: LocalVariant = {
                  ...(v as Variant),
                  image: (v as any).image ?? currentProduct.image,
                  price: (v as any).price ?? currentProduct.price,
                  discount: (v as any).discount ?? (currentProduct as any).discount,
                  inStock: (v as any).inStock ?? currentProduct.inStock ?? true,
                  id: String(derivedId),
                };
                return (
                  <motion.div
                    key={i}
                    onClick={() => setCurrentVariant(localV)}
                    className={`relative cursor-pointer border-2 rounded-lg overflow-hidden flex-shrink-0 snap-start ${
                      currentVariant?.id === localV.id
                        ? "border-[#b46029] ring-2 ring-[#b46029]"
                        : "border-gray-300"
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <img src={localV.image} alt={`thumb-${i}`} className="h-20 w-20 object-cover rounded-lg" />
                    {localV.discount && (
                      <span className="absolute top-1 left-1 bg-[#b46029] text-white text-xs font-semibold px-1 py-0.5 rounded-md">
                        {localV.discount}% OFF
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* RIGHT: Product info */}
        <div className="flex-1 flex flex-col gap-4 sm:gap-5">
          <h1 className="text-3xl sm:text-4xl font-serif text-gray-900">{currentProduct.name}</h1>

          {/* Price & discount */}
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-2xl sm:text-3xl font-semibold text-[#b46029]">₹{currentVariant?.price}</span>
            {currentVariant?.discount && (
              <span className="line-through text-gray-400 text-lg ml-2">₹{currentProduct.price}</span>
            )}
          </div>

          {/* Description */}
          {currentProduct.description && <p className="text-gray-700 leading-relaxed">{currentProduct.description}</p>}

          {/* Structured info */}
          <div className="mt-2 space-y-2 text-gray-700">
            {currentProduct.material && <p><span className="font-semibold">Material:</span> {currentProduct.material}</p>}
            {currentProduct.dimensions && <p><span className="font-semibold">Dimensions:</span> {currentProduct.dimensions}</p>}
            {currentProduct.weight && <p><span className="font-semibold">Weight:</span> {currentProduct.weight}</p>}
            {currentProduct.careInstructions && <p><span className="font-semibold">Care Instructions:</span> {currentProduct.careInstructions}</p>}
          </div>

          {/* Tags / Stock / Warranty */}
          <div className="flex flex-wrap gap-3 text-gray-500 text-sm sm:text-base mt-2">
            {currentProduct.tags?.map((tag, idx) => (
              <span key={idx} className="bg-gray-100 px-2 py-1 rounded">{tag}</span>
            ))}
            <span
              className={`px-2 py-1 rounded ${
                currentVariant?.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {currentVariant?.inStock ? "In Stock" : "Out of Stock"}
            </span>
            {currentProduct.warranty && <span className="bg-gray-100 px-2 py-1 rounded">{currentProduct.warranty}</span>}
          </div>

          {/* Add to cart */}
          <div className="flex flex-wrap gap-3 sm:gap-4 mt-4 items-center">
            <button
              onClick={handleAddToCart}
              disabled={!currentVariant?.inStock}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium shadow-lg ${
                currentVariant?.inStock ? "bg-[#b46029] hover:bg-[#8c4a20] text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
          </div>

          {/* Extra sections */}
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
                    <li key={idx}><span className="font-medium">{key}:</span> {String(value)}</li>
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
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#E8D4B7] text-black px-6 py-3 rounded-lg shadow-lg text-sm sm:text-base"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reviews + Floating Chat */}
      {currentProduct && currentVariant && (
        <>
          <CustomerReviewAny
            productId={currentProduct.id}
            variantId={currentVariant.id}
            setBackendRating={setBackendRating}
            setBackendReviewsCount={setBackendReviewsCount}
          />
          <FloatingReviewChatAny productId={currentProduct.id} variantId={currentVariant.id} />
        </>
      )}
    </div>
  );
}
