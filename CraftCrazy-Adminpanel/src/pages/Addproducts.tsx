import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ProductForm {
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
  image: File | null;
}

const categories = [
  "resin",
  "hamper",
  "home decor",
  "cake topper",
  "birthday special",
  "engagement tray",
  "anniversary special",
  "rakhi hits",
  "haldi platter",
  "valentine special",
  "christmas special",
  "holi hamper",
];

const AddProducts = () => {
  const [form, setForm] = useState<ProductForm>({
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
    image: null,
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  // 🎨 image preview
  useEffect(() => {
    if (!form.image) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(form.image);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [form.image]);

  // auto hide success
  useEffect(() => {
    if(successMsg){
      setTimeout(()=> setSuccessMsg(false), 2500);
    }
  }, [successMsg]);

  // Form handler
  const handleChange = (e: any) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setForm(prev => ({ ...prev, [name]: e.target.checked }));
    } 
    else if (type === "file") {
      const file = e.target.files?.[0];
      setForm(prev => ({ ...prev, image: file || null }));
    }
    else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  // Submit Product
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if(submitting) return;

    if (!form.image) {
      toast.error("Product image is required");
      return;
    }

    if (!form.name || !form.price || !form.category) {
      toast.error("Please fill required fields (*)");
      return;
    }

    setSubmitting(true);

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === "image") {
          if (value) fd.append("image", value);
        } else {
          fd.append(key, value as string);
        }
      });

      const res = await axios.post(
        "http://localhost:8000/api/products/add",
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.status === 201) {
<<<<<<< Updated upstream
        toast.success("Product created successfully!");
        setSuccessMsg(true);

=======
>>>>>>> Stashed changes
        setForm({
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
          image: null,
        });
        setPreview(null);
        toast.success("Product Created Successfully!");
      }

    } catch (error) {
      console.error(error);
      toast.error("Failed to create product!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
<<<<<<< Updated upstream
    <section className="min-h-screen bg-[#FFFDF9] p-6 sm:p-10">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto bg-white p-6 sm:p-10 shadow-2xl rounded-3xl border border-gray-200"
      >
        <h1 className="text-3xl sm:text-4xl font-serif text-[#8b5e34] font-bold text-center mb-6">
          Add New Product
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* TEXT FIELDS */}
          {[
            "name", "description", "price", "rating", "reviews", "discount", "highlight",
            "category", "tags", "brand", "seller", "warranty", "returnPolicy",
            "occasion", "material", "dimensions", "weight", "careInstructions",
            "maxOrderQuantity", "deliveryType", "deliveryAvailability", "deliveryEstimated",
            "customizationOptions"
          ].map((field) => (
            <input
              key={field}
              name={field}
              type="text"
              value={form[field as keyof ProductForm] as string}
              onChange={handleChange}
              placeholder={field.replace(/([A-Z])/g, " $1").toUpperCase()}
              className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#c9a26d] text-sm"
            />
          ))}

          {/* STOCK */}
          <label className="flex items-center gap-3 col-span-1">
            <input
              type="checkbox"
              name="inStock"
              checked={form.inStock}
              onChange={handleChange}
            />
            In Stock
          </label>

          {/* CUSTOMIZATION AVAILABLE */}
          <label className="flex items-center gap-3 col-span-1">
            <input
              type="checkbox"
              name="customizationAvailable"
              checked={form.customizationAvailable}
              onChange={handleChange}
            />
            Customization Available
          </label>

          {/* IMAGE */}
          <div className="col-span-2">
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="p-3 rounded-xl border border-gray-300 w-full"
            />

            {preview && (
              <div className="mt-3 w-32 h-32 rounded-xl overflow-hidden shadow">
                <img src={preview} className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            disabled={submitting}
            className={`col-span-2 py-3 mt-4 bg-gradient-to-r from-[#c9a26d] to-[#8b5e34] text-white font-medium rounded-xl ${
              submitting ? "opacity-60 cursor-not-allowed" : ""
            }`}
=======
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-7xl mx-auto bg-white shadow-xl p-10 rounded-3xl border">
        <h1 className="text-gray-800 text-4xl font-extrabold mb-10 text-center">
          Add New Product
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-10">
            {/* LEFT */}
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-2xl shadow-md border">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  General Information
                </h2>

                {/* CATEGORY DROPDOWN */}
                <label className="block text-gray-700 font-medium mb-2">
                  Category *
                </label>

                <select
                  name="category"
                  value={form.category}
                  required
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      category: e.target.value.toLowerCase(),
                    }))
                  }
                  className="w-full p-3 bg-gray-50 border border-blue-400 rounded-xl mb-4"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat.toLowerCase()}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>

                {[
                  "name",
                  "description",
                  "price",
                  "brand",
                  "tags",
                  "highlight",
                  "rating",
                  "reviews",
                  "discount"
                ].map((field) => (
                  <input
                    key={field}
                    name={field}
                    type="text"
                    value={form[field as keyof ProductForm] as string}
                    onChange={handleChange}
                    placeholder={field.replace(/([A-Z])/g, " $1")}
                    className="w-full mb-3 p-3 bg-gray-50 border rounded-xl"
                  />
                ))}
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md border">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Inventory
                </h2>

                <div className="flex items-center gap-3 mb-3">
                  <input
                    type="checkbox"
                    checked={form.inStock}
                    name="inStock"
                    onChange={handleChange}
                  />
                  <label className="text-gray-700">In Stock</label>
                </div>

                {["seller", "maxOrderQuantity", "weight", "dimensions"].map(
                  (field) => (
                    <input
                      key={field}
                      name={field}
                      type="text"
                      value={form[field as keyof ProductForm] as string}
                      onChange={handleChange}
                      placeholder={field.replace(/([A-Z])/g, " $1")}
                      className="w-full mb-3 p-3 bg-gray-50 border rounded-xl"
                    />
                  )
                )}
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-2xl shadow-md border">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Delivery Details
                </h2>

                {[
                  "deliveryType",
                  "deliveryAvailability",
                  "deliveryEstimated",
                ].map((field) => (
                  <input
                    key={field}
                    name={field}
                    type="text"
                    value={form[field as keyof ProductForm] as string}
                    onChange={handleChange}
                    placeholder={field.replace(/([A-Z])/g, " $1")}
                    className="w-full mb-3 p-3 bg-gray-50 border rounded-xl"
                  />
                ))}
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md border">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Customization
                </h2>

                <div className="flex items-center gap-3 mb-3">
                  <input
                    type="checkbox"
                    name="customizationAvailable"
                    checked={form.customizationAvailable}
                    onChange={handleChange}
                  />
                  <label className="text-gray-700">
                    Customization Available
                  </label>
                </div>

                <input
                  name="customizationOptions"
                  type="text"
                  value={form.customizationOptions}
                  onChange={handleChange}
                  placeholder="Customization Options"
                  className="w-full mb-3 p-3 bg-gray-50 border rounded-xl"
                />
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md border">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Product Image *
                </h2>

                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="w-full mb-4 p-3 bg-gray-50 border rounded-xl"
                  required
                />

                {preview && (
                  <div className="w-full h-64 rounded-2xl overflow-hidden border shadow-md">
                    <img src={preview} className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-10 w-full py-4 text-xl font-semibold rounded-xl 
            bg-blue-600 text-white shadow-lg cursor-pointer hover:bg-blue-700 transition"
>>>>>>> Stashed changes
          >
            {submitting ? "Uploading..." : "Add Product"}
          </motion.button>
        </form>

        {/* SUCCESS MESSAGE */}
        <AnimatePresence>
          {successMsg && (
            <motion.p
              className="text-green-600 text-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              ✅ Product added successfully!
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default AddProducts;
