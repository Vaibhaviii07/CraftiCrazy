import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  ShoppingCart,
  Share2,
  Truck,
  Package,
  Shield,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Link as LinkIcon,
  X as Close,
  MessageCircle,
} from "lucide-react";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: string;
  rating: string;
  reviews: string;
  discount: string;
  highlight: string;
  category: string;
  tags: string;
  brand: string;
  seller: string;
  inStock: boolean;
  warranty: string;
  returnPolicy: string;
  image: string | null;
  occasion: string;
  material: string;
  dimensions: string;
  weight: string;
  careInstructions: string;
  maxOrderQuantity: string;
  deliveryType: string;
  deliveryAvailability: string;
  deliveryEstimated: string;
  customizationAvailable: boolean;
  customizationOptions: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  // 🧩 Dummy Data
  const dummyProduct: Product = {
    _id: "1",
    name: "Handcrafted Resin Wall Clock – Galaxy Swirl Edition",
    description:
      "This exclusive handcrafted resin wall clock brings cosmic elegance to your home with its mesmerizing galaxy swirl and gold accents.",
    price: "1999",
    rating: "4.7",
    reviews: "124",
    discount: "18%",
    highlight: "Premium handmade resin clock with gold leaf finish",
    category: "Home Decor",
    tags: "Resin, Wall Clock, Luxury, Handmade",
    brand: "CraftiCrazy Originals",
    seller: "Sanika's Creations",
    inStock: true,
    warranty: "1 Year Replacement Warranty",
    returnPolicy: "10 Days Easy Return",
    image: "http://localhost:5173/clock2-1.jpg",
    occasion: "Housewarming, Festive Gift",
    material: "Epoxy Resin + Gold Leaf",
    dimensions: "Diameter: 12 inch, Depth: 2 inch",
    weight: "1.2 kg",
    careInstructions:
      "Clean with a soft dry cloth. Avoid water and direct sunlight exposure.",
    maxOrderQuantity: "3",
    deliveryType: "Express & Standard",
    deliveryAvailability: "PAN India",
    deliveryEstimated: "3 - 5 Business Days",
    customizationAvailable: true,
    customizationOptions: "Name engraving, color customization",
  };

  // ✅ Fetch from backend or use dummy
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) throw new Error("No product ID");
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch {
        console.warn("⚠️ Using dummy product for display");
        setProduct(dummyProduct);
      }
    };
    fetchProduct();
  }, [id]);

  // ✅ Close share popup on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) {
        setShowShareMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Share Handler
  const handleShareClick = (platform: string) => {
    const shareUrl = window.location.href;
    const shareText = `Check out this ${product?.name} on CraftiCrazy!`;

    switch (platform) {
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
          "_blank"
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            shareText
          )}&url=${encodeURIComponent(shareUrl)}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
            shareUrl
          )}&title=${encodeURIComponent(shareText)}`,
          "_blank"
        );
        break;
      case "email":
        window.location.href = `mailto:?subject=${encodeURIComponent(
          shareText
        )}&body=${encodeURIComponent(shareUrl)}`;
        break;
      case "copy":
        navigator.clipboard.writeText(shareUrl);
        alert("🔗 Product link copied to clipboard!");
        break;
      default:
        break;
    }
    setShowShareMenu(false);
  };

  if (!product)
    return (
      <div className="text-center py-20 text-gray-500">
        Loading product details...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* 🖼️ Left Section */}
        <div className="flex flex-col items-center" ref={shareRef}>
          <img
            src={product.image || ""}
            alt={product.name}
            className="rounded-2xl w-full object-cover shadow-md"
          />
        </div>

        {/* 📄 Right Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mb-4 text-sm">
            <div className="flex items-center text-yellow-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={
                    i < Math.floor(Number(product.rating)) ? "#FBBF24" : "none"
                  }
                />
              ))}
            </div>
            <span className="text-gray-600">
              {product.rating} ({product.reviews} reviews)
            </span>
            <span className="text-green-600 font-medium">
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-3xl font-bold text-purple-700">
              ₹{product.price}
            </span>
            {product.discount && (
              <span className="text-sm text-red-500 font-semibold">
                {product.discount} OFF
              </span>
            )}
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            {product.description}
          </p>

          <div className="mb-5">
            <h3 className="font-semibold text-gray-800 mb-2">Highlights:</h3>
            <p className="text-gray-600">{product.highlight}</p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm text-gray-700 mb-6">
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Brand:</strong> {product.brand}
            </p>
            <p>
              <strong>Seller:</strong> {product.seller}
            </p>
            <p>
              <strong>Material:</strong> {product.material}
            </p>
            <p>
              <strong>Dimensions:</strong> {product.dimensions}
            </p>
            <p>
              <strong>Weight:</strong> {product.weight}
            </p>
            <p>
              <strong>Occasion:</strong> {product.occasion}
            </p>
            <p>
              <strong>Warranty:</strong> {product.warranty}
            </p>
            <p>
              <strong>Return Policy:</strong> {product.returnPolicy}
            </p>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <input
              type="number"
              min="1"
              max={Number(product.maxOrderQuantity) || 5}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-16 border border-gray-300 rounded-md px-2 py-1 text-center"
            />
            <button className="flex items-center gap-2 bg-purple-700 text-white px-6 py-2 rounded-md hover:bg-purple-800 transition">
              <ShoppingCart size={18} /> Add to Cart
            </button>
             <div className="flex mt-5 gap-3 relative">
            <button
              className="p-2 bg-gray-100 rounded-full mb-5 hover:bg-gray-200 transition-all"
              onClick={() => setShowShareMenu((prev) => !prev)}
              title="Share this product"
            >
              <Share2 size={20} />
            </button>

            {/* Share Menu */}
            {showShareMenu && (
              <div className="absolute top-12 right-0 bg-white shadow-lg rounded-xl p-3 w-52 z-50 border border-gray-100 animate-fadeIn ">
                <div className="flex justify-between items-center mb-2 ">
                  <span className="font-medium text-sm">Share via</span>
                  <button onClick={() => setShowShareMenu(false)}>
                    <Close size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3 text-gray-700 text-center">
                  <button
                    onClick={() => handleShareClick("whatsapp")}
                    className="hover:text-[#25D366]"
                  >
                    <MessageCircle size={20} />
                    <p className="text-[10px] mt-1">WhatsApp</p>
                  </button>
                  <button
                    onClick={() => handleShareClick("facebook")}
                    className="hover:text-[#1877F2]"
                  >
                    <Facebook size={20} />
                    <p className="text-[10px] mt-1">Facebook</p>
                  </button>
                  <button
                    onClick={() => handleShareClick("twitter")}
                    className="hover:text-[#1DA1F2]"
                  >
                    <Twitter size={20} />
                    <p className="text-[10px] mt-1">Twitter</p>
                  </button>
                  <button
                    onClick={() => handleShareClick("linkedin")}
                    className="hover:text-[#0A66C2]"
                  >
                    <Linkedin size={20} />
                    <p className="text-[10px] mt-1">LinkedIn</p>
                  </button>
                  <button
                    onClick={() => handleShareClick("email")}
                    className="hover:text-[#C45A36]"
                  >
                    <Mail size={20} />
                    <p className="text-[10px] mt-1">Email</p>
                  </button>
                  <button
                    onClick={() => handleShareClick("copy")}
                    className="hover:text-gray-600"
                  >
                    <LinkIcon size={20} />
                    <p className="text-[10px] mt-1">Copy</p>
                  </button>
                </div>
              </div>
            )}
          </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-md border">
              <Truck size={18} className="text-purple-600" />
              <span>Fast Delivery</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-md border">
              <Package size={18} className="text-purple-600" />
              <span>Secure Packaging</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-md border">
              <Shield size={18} className="text-purple-600" />
              <span>Warranty Included</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
