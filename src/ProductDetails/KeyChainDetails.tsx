// src/Pages/Accessories/KeyChainDetails.tsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { keyChains, KeyChain, Variant } from "../Data/KeyChainData";
import { useCart } from "../AuthContext/CartContext";
import { motion } from "framer-motion";

export default function KeyChainDetails() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);
  const [toast, setToast] = useState<string>("");

  const productFromParams = keyChains.find((k) => k.id === id);
  if (!productFromParams) {
    return <p className="text-center mt-10 text-lg">Product not found</p>;
  }

  const [currentProduct, setCurrentProduct] = useState<KeyChain>(productFromParams);

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
      price: selectedVariant.price,
      quantity,
      image: selectedVariant.image,
      rating: currentProduct.rating,
      discount: selectedVariant.discount,
      category: currentProduct.category,
      highlight: currentProduct.highlight,
    });
    setToast("Added to Cart!");
    setTimeout(() => setToast(""), 2000);
  };

  const similar = keyChains.filter(
    (k) => k.category === currentProduct.category && k.id !== currentProduct.id
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Image + Thumbnails */}
        <div className="relative">
          <div className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-500">
            <img
              src={selectedVariant.image}
              alt={currentProduct.name}
              className="w-full h-[500px] object-cover rounded-2xl transform transition-transform duration-500 hover:scale-105"
            />
            {selectedVariant.discount && selectedVariant.discount > 0 && (
              <span className="absolute top-4 right-4 bg-[#b46029] text-white font-semibold px-3 py-1 rounded-md shadow-lg">
                {selectedVariant.discount}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {currentProduct.variants?.length && currentProduct.variants.length > 1 && (
            <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 justify-center">
              {currentProduct.variants.map((v: Variant, i: number) => (
                <div
                  key={i}
                  onClick={() => setSelectedVariant(v)}
                  className={`relative cursor-pointer border-2 rounded-lg overflow-hidden transition-all ${
                    selectedVariant.image === v.image
                      ? "border-[#b46029] ring-2 ring-[#b46029]"
                      : "border-gray-300"
                  }`}
                >
                  <img
                    src={v.image}
                    alt={`thumb-${i}`}
                    className="h-28 w-28 object-cover rounded-lg"
                  />
                  {v.discount && v.discount > 0 && (
                    <span className="absolute top-2 left-2 bg-[#b46029] text-white text-xs font-semibold px-2 py-1 rounded-md">
                      {v.discount}% OFF
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col justify-start">
          <h1 className="text-3xl font-bold text-gray-800">{currentProduct.name}</h1>
          <p className="mt-3 text-2xl font-semibold text-[#b46029]">{selectedVariant.price}</p>

          {/* Quantity Selector */}
          <div className="mt-4 flex items-center gap-3">
            <span className="font-medium text-gray-700">Quantity:</span>
            <div className="flex border rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition"
              >
                -
              </button>
              <span className="px-4 py-1">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="mt-6 px-8 py-3 bg-[#b46029] hover:bg-[#8c4a20] transition text-white rounded-xl shadow-lg font-semibold"
          >
            🛒 Add to Cart
          </button>

          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg w-fit"
            >
              {toast}
            </motion.div>
          )}

          {/* Product Details */}
          <div className="mt-8 space-y-4">
            <p className="text-gray-600 leading-relaxed">{currentProduct.description}</p>

            {currentProduct.contents?.length && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Contents:</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {currentProduct.contents.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {currentProduct.highlight && (
              <p className="text-gray-700 italic">⭐ {currentProduct.highlight}</p>
            )}

            {currentProduct.delivery && (
              <p className="text-gray-600">
                <span className="font-semibold">Delivery:</span> {currentProduct.delivery.type},{" "}
                {currentProduct.delivery.availability}, Estimated {currentProduct.delivery.estimated}
              </p>
            )}

            {currentProduct.customization?.available && (
              <p className="text-gray-600">
                <span className="font-semibold">Customization Options:</span>{" "}
                {currentProduct.customization.options?.join(", ")}
              </p>
            )}

            {currentProduct.occasion?.length && (
              <div className="flex flex-wrap gap-2">
                {currentProduct.occasion.map((o, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm semibold"
                  >
                    {o}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
