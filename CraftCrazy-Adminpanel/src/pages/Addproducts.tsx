import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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

  useEffect(() => {
    if (!form.image) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(form.image);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [form.image]);

  const handleChange = (e: any) => {
    const { name, type, value } = e.target;

    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: e.target.checked }));
    } else if (type === "file") {
      const file = e.target.files?.[0];
      setForm((prev) => ({ ...prev, image: file || null }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (submitting) return;

    if (!form.image) {
      toast.error("Product image required");
      return;
    }

    setSubmitting(true);

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (k === "image") {
          if (v) fd.append("image", v);
        } else {
          fd.append(k, v as string);
        }
      });

      const res = await axios.post(
        "http://localhost:8000/api/products/add",
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.status === 201) {
        toast.success("Product Created Successfully!");

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
      }
    } catch (error) {
      toast.error("Failed to create");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      {/* MAIN CARD */}
      <div className="max-w-7xl mx-auto bg-white shadow-xl p-10 rounded-3xl border">

        <h1 className="text-gray-800 text-4xl font-extrabold mb-10 text-center">
          Add New Product
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-10">

            {/* LEFT SIDE */}
            <div className="space-y-8">

              {/* GENERAL INFO */}
              <div className="bg-white p-6 rounded-2xl shadow-md border">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  General Information
                </h2>

                {[
                  "name", "description", "price", "brand", "category",
                  "tags", "highlight", "rating", "reviews", "discount"
                ].map((field) => (
                  <input
                    key={field}
                    name={field}
                    type="text"
                    value={form[field as keyof ProductForm] as string}
                    onChange={handleChange}
                    placeholder={field.replace(/([A-Z])/g, " $1")}
                    className="w-full mb-3 p-3 bg-gray-50 border 
                    rounded-xl focus:ring-2 focus:ring-blue-300 outline-none"
                  />
                ))}
              </div>

              {/* INVENTORY */}
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

                {[
                  "seller", "maxOrderQuantity", "weight", "dimensions"
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
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-8">

              {/* DELIVERY */}
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

              {/* CUSTOMIZATION */}
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

              {/* IMAGE UPLOAD */}
              <div className="bg-white p-6 rounded-2xl shadow-md border">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Product Image
                </h2>

                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="w-full mb-4 p-3 bg-gray-50 border rounded-xl"
                />

                {preview && (
                  <div className="w-full h-64 rounded-2xl overflow-hidden border shadow-md">
                    <img
                      src={preview}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="mt-10 w-full py-4 text-xl font-semibold rounded-xl 
            bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition"
          >
            {submitting ? "Uploading..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
