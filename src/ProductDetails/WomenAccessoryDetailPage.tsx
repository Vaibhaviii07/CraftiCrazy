// src/ProductDetails/WomenAccessoryDetailPage.tsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { womenAccessories, WomenAccessory, Variant } from "../Data/WomenAccessoriesData";
import { useCart } from "../AuthContext/CartContext";
import { ShoppingCart, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Params = { id: string };

export default function WomenAccessoryDetailPage() {
  const { id } = useParams<Params>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);
  const [toast, setToast] = useState<string | null>(null);

  const productFromParams: WomenAccessory | undefined = womenAccessories.find(
    (p: WomenAccessory) => p.id === id
  );

  if (!productFromParams) {
    return (
      <p className="text-center mt-20 text-lg text-gray-400">
        Product not found
      </p>
    );
  }

  const [currentProduct] = useState<WomenAccessory>(productFromParams);

  const [selectedVariant, setSelectedVariant] = useState<Variant>({
    image: currentProduct.variants?.[0]?.image ?? currentProduct.image,
    price: currentProduct.variants?.[0]?.price ?? currentProduct.price,
    discount: currentProduct.variants?.[0]?.discount ?? currentProduct.discount,
  });

  useEffect(() => {
    setSelectedVariant({
      image: currentProduct.variants?.[0]?.image ?? currentProduct.image,
      price: currentProduct.variants?.[0]?.price ?? currentProduct.price,
      discount: currentProduct.variants?.[0]?.discount ?? currentProduct.discount,
    });
    setQuantity(1);
  }, [currentProduct]);

  const handleAddToCart = () => {
    addToCart({
      id: currentProduct.id,
      name: currentProduct.name,
      price: `₹${selectedVariant.price}`,
      quantity,
      image: selectedVariant.image,
      discount: selectedVariant.discount,
      category: currentProduct.category,
      highlight: currentProduct.highlight,
    });

    setToast(`${currentProduct.name} added to cart`);
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left: Hero Image */}
        <div className="flex-1 relative">
          <motion.img
            src={selectedVariant.image}
            alt={currentProduct.name}
            className="w-full rounded-3xl shadow-xl object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />
          {selectedVariant.discount && (
            <span className="absolute top-3 right-3 bg-[#b46029] text-white font-semibold px-2 py-1 rounded-md text-sm shadow-md">
              {selectedVariant.discount}% OFF
            </span>
          )}

          {/* Thumbnails */}
          {currentProduct.variants && currentProduct.variants.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto py-1">
              {currentProduct.variants.map((v: Variant, i: number) => (
                <motion.div
                  key={i}
                  onClick={() => setSelectedVariant(v)}
                  className={`relative cursor-pointer border-2 rounded-lg overflow-hidden flex-shrink-0 ${
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

        {/* Right: Product Info */}
        <div className="flex-1 flex flex-col gap-4 sm:gap-5">
          <h1 className="text-3xl sm:text-4xl font-serif text-gray-900">
            {currentProduct.name}
          </h1>

          {/* Rating + Price */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.floor(currentProduct.rating || 0) }).map(
                (_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400" />
                )
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

          {/* Description */}
          <p className="text-gray-700 leading-relaxed">{currentProduct.description}</p>

          {/* Structured Product Info */}
          <div className="space-y-3 text-gray-700">
            {currentProduct.material && (
              <p>
                <span className="font-semibold text-gray-900">Material:</span>{" "}
                {currentProduct.material}
              </p>
            )}
            {currentProduct.dimensions && (
              <p>
                <span className="font-semibold text-gray-900">Dimensions:</span>{" "}
                {currentProduct.dimensions}
              </p>
            )}
            {currentProduct.weight && (
              <p>
                <span className="font-semibold text-gray-900">Weight:</span>{" "}
                {currentProduct.weight}
              </p>
            )}
            {currentProduct.careInstructions && (
              <p>
                <span className="font-semibold text-gray-900">Care Instructions:</span>{" "}
                {currentProduct.careInstructions}
              </p>
            )}
            {currentProduct.delivery && (
              <p>
                <span className="font-semibold text-gray-900">Delivery:</span>{" "}
                {currentProduct.delivery.type}, {currentProduct.delivery.availability},{" "}
                Estimated {currentProduct.delivery.estimated}
              </p>
            )}
          </div>

          {/* Tags / Brand / Stock / Warranty */}
          <div className="flex flex-wrap gap-3 text-gray-500 text-sm sm:text-base mt-2">
            {currentProduct.brand && (
              <span className="bg-gray-100 px-2 py-1 rounded">{currentProduct.brand}</span>
            )}
            {currentProduct.seller && (
              <span className="bg-gray-100 px-2 py-1 rounded">{currentProduct.seller}</span>
            )}
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
              <span className="bg-gray-100 px-2 py-1 rounded">{currentProduct.warranty}</span>
            )}
            {currentProduct.returnPolicy && (
              <span className="bg-gray-100 px-2 py-1 rounded">{currentProduct.returnPolicy}</span>
            )}
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex flex-wrap gap-3 mt-4 items-center">
            <div className="flex items-center border rounded-full overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition"
              >
                -
              </button>
              <span className="px-6 py-2">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 px-6 py-3 bg-[#b46029] hover:bg-[#8c4a20] text-white rounded-full font-medium shadow-lg"
            >
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
          </div>

          {/* Structured Sections */}
          <div className="mt-6 flex flex-col gap-4">
            {currentProduct.tags && (
              <div>
                <h3 className="font-semibold text-gray-800">Tags</h3>
                <p className="text-gray-600">{currentProduct.tags.join(", ")}</p>
              </div>
            )}
            {currentProduct.contents && (
              <div>
                <h3 className="font-semibold text-gray-800">Contents</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {currentProduct.contents.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {currentProduct.customization?.available && (
              <div>
                <h3 className="font-semibold text-gray-800">Customization Options</h3>
                <p className="text-gray-600">
                  {currentProduct.customization.options?.join(", ")}
                </p>
              </div>
            )}
            {currentProduct.specifications && (
              <div>
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
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 
                       bg-[#E8D4B7] text-black px-6 py-3 rounded-lg shadow-lg text-sm sm:text-base"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
