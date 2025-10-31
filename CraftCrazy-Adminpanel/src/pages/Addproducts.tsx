import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon } from "lucide-react";

interface Product {
  name: string;
  description?: string;
  price: string;
  rating?: string;
  reviews?: string;
  discount?: string;
  highlight?: string;
  category: string;
  tags?: string;
  brand?: string;
  seller?: string;
  inStock: boolean;
  warranty?: string;
  returnPolicy?: string;
  image: File | null;
  occasion?: string;
  material?: string;
  dimensions?: string;
  weight?: string;
  careInstructions?: string;
  maxOrderQuantity?: string;
  deliveryType?: string;
  deliveryAvailability?: string;
  deliveryEstimated?: string;
  customizationAvailable: boolean;
  customizationOptions?: string;
}

const AddProducts: React.FC = () => {
  const [product, setProduct] = useState<Product>({
    name: "",
    description: "",
    price: "",
    rating: "",
    reviews: "",
    discount: "",
    highlight: "",
    category: "",
    tags: "",
    brand: "",
    seller: "",
    inStock: true,
    warranty: "",
    returnPolicy: "",
    image: null,
    occasion: "",
    material: "",
    dimensions: "",
    weight: "",
    careInstructions: "",
    maxOrderQuantity: "",
    deliveryType: "",
    deliveryAvailability: "",
    deliveryEstimated: "",
    customizationAvailable: false,
    customizationOptions: "",
  });

  const [preview, setPreview] = useState<string | null>(null);

  // handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      setProduct({ ...product, [name]: checkbox.checked });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  // handle image change
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProduct({ ...product, image: file });
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // handle submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("📦 Product submitted:", product);
    alert("✅ Product added successfully!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-8"
    >
      <h1 className="text-2xl font-semibold text-[#2a0a4b] mb-6">
        ➕ Add New Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Left Section */}
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-[#2a0a4b] mb-4">
              Product Information
            </h2>

            <div className="space-y-4">
              {[
                { label: "Name", name: "name", placeholder: "Product Name" },
                {
                  label: "Category",
                  name: "category",
                  placeholder: "Category (e.g., Earrings)",
                },
                { label: "Brand", name: "brand", placeholder: "Brand Name" },
                { label: "Seller", name: "seller", placeholder: "Seller Name" },
                { label: "Tags", name: "tags", placeholder: "tag1, tag2, tag3" },
              ].map(({ label, name, placeholder }) => (
                <div key={name}>
                  <label className="text-gray-600 text-sm">{label}</label>
                  <input
                    type="text"
                    name={name}
                    value={(product as any)[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#C45A36] outline-none"
                  />
                </div>
              ))}

              <div>
                <label className="text-gray-600 text-sm">Description</label>
                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#C45A36]"
                  placeholder="Enter description..."
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-[#2a0a4b] mb-4">
              Pricing & Stock
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Price (₹)", name: "price" },
                { label: "Discount (%)", name: "discount" },
                { label: "Rating", name: "rating" },
                { label: "Reviews", name: "reviews" },
              ].map(({ label, name }) => (
                <div key={name}>
                  <label className="text-gray-600 text-sm">{label}</label>
                  <input
                    type="text"
                    name={name}
                    value={(product as any)[name]}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#C45A36]"
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                name="inStock"
                checked={product.inStock}
                onChange={handleChange}
                className="mr-2 accent-[#C45A36]"
              />
              <label className="text-gray-700 text-sm">Available in Stock</label>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          {/* Specifications */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-[#2a0a4b] mb-4">
              Specifications
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Material", name: "material" },
                { label: "Dimensions", name: "dimensions" },
                { label: "Weight", name: "weight" },
                { label: "Occasion", name: "occasion" },
                { label: "Warranty", name: "warranty" },
                { label: "Return Policy", name: "returnPolicy" },
                { label: "Care Instructions", name: "careInstructions" },
                { label: "Max Order Quantity", name: "maxOrderQuantity" },
              ].map(({ label, name }) => (
                <div key={name}>
                  <label className="text-gray-600 text-sm">{label}</label>
                  <input
                    type="text"
                    name={name}
                    value={(product as any)[name]}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#C45A36]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Customization */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-[#2a0a4b] mb-4">
              Delivery & Customization
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Delivery Type", name: "deliveryType" },
                { label: "Availability", name: "deliveryAvailability" },
                { label: "Estimated", name: "deliveryEstimated" },
              ].map(({ label, name }) => (
                <div key={name}>
                  <label className="text-gray-600 text-sm">{label}</label>
                  <input
                    type="text"
                    name={name}
                    value={(product as any)[name]}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#C45A36]"
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                name="customizationAvailable"
                checked={product.customizationAvailable}
                onChange={handleChange}
                className="mr-2 accent-[#C45A36]"
              />
              <label className="text-gray-700 text-sm">
                Customization Available
              </label>
            </div>

            {product.customizationAvailable && (
              <div className="mt-4">
                <label className="text-gray-600 text-sm">
                  Customization Options
                </label>
                <input
                  type="text"
                  name="customizationOptions"
                  value={product.customizationOptions}
                  onChange={handleChange}
                  placeholder="e.g., Name engraving, Color choice"
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#C45A36]"
                />
              </div>
            )}
          </div>
          {/* Image Upload */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-[#2a0a4b] mb-4">
              Product Image
            </h2>
            <div className="border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-gray-50 transition">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-40 object-cover rounded-md"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-400">
                  <ImageIcon className="w-12 h-12 mb-2" />
                  <p className="text-sm">Click to upload image</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="lg:col-span-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-[#2a0a4b] hover:bg-[#C45A36] text-white rounded-lg font-medium shadow-md transition-all"
          >
            Add Product
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddProducts;
