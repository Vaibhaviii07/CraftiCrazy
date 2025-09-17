import { useState } from "react";
import { motion } from "framer-motion";

type FormData = {
  name: string;
  email: string;
  phone: string;
  demand: string;
  image: File | null;
};

const creations = [
  { id: 1, name: "Knitting", image: "craft.jpeg" },
  { id: 2, name: "Engagement Tray", image: "tray.jpeg" },
  { id: 3, name: "Memories Preservation", image: "rose.jpeg" },
];
// Add this array above your component
const howItWorksSteps = [
  {
    id: 1,
    title: "Share Your Idea",
    description: "Tell us what you want – any special requests or creative ideas.",
    icon: "💡",
  },
  {
    id: 2,
    title: "Choose Customization",
    description: "Select colors, materials, and design options to match your vision.",
    icon: "🎨",
  },
  {
    id: 3,
    title: "We Craft It",
    description: "Our skilled artisans carefully craft your unique creation.",
    icon: "🛠️",
  },
  {
    id: 4,
    title: "Enjoy Your Gift",
    description: "Receive your personalized creation and enjoy your special gift!",
    icon: "🎁",
  },
];


const CustomerDemand = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    demand: "",
    image: null,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target;
    if (name === "image" && files?.length) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Customer Demand submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", demand: "", image: null });
  };

  return (
    <section className="min-h-screen flex flex-col items-center px-6 md:px-20 py-2 gap-12 ">
       {/* How It Works Section */}
        <motion.div
          className="w-full py-12 bg-white rounded-2xl px-6 md:px-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#583101] text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {howItWorksSteps.map((step) => (
              <motion.div
                key={step.id}
                className="flex flex-col items-center text-center p-4 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-5xl mb-4">{step.icon}</div>
                <h3 className="font-semibold text-lg text-gray-700 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      {/* Customer Demand Section */}
      <div className="flex flex-col md:flex-row items-center gap-12 w-full ">
        {/* Form */}
        <motion.div 
          className="w-full md:w-1/2 bg-white p-6 rounded-2xl shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#583101] text-center mb-4">
            Customer Demands
          </h1>
          <p className="text-center text-gray-600 text-base md:text-lg mb-10 font-[Playfair_Display]">
            Share your ideas or requests! We love crafting something special for you.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mb-7 px-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-orange-300 focus:outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 mb-7 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-orange-300 focus:outline-none"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mb-7 rounded-lg border border-gray-300 focus:ring-1 focus:ring-orange-300 focus:outline-none"
            />
            <textarea
              name="demand"
              placeholder="Describe your demand"
              value={formData.demand}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 mb-7 rounded-lg border border-gray-300 focus:ring-1 focus:ring-orange-300 focus:outline-none resize-none"
            />
            <input
              key={formData.image ? formData.image.name : "file-input"}
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full py-2 px-4 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:ring-1 focus:ring-orange-300"
            />

            {formData.image && (
              <div className="relative mt-1 -mb-5 w-30 h-30 mx-auto">
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg shadow"
                />
                {/* Cross Button */}
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, image: null }))}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-red-600 transition"
                >
                  ✕
                </button>
              </div>
            )}


            <motion.button
              type="submit"
              className="w-40 py-2 mb-7 mt-8 bg-[#8b5e34] text-white font-medium rounded-lg hover:bg-orange-600 transition"
              whileHover={{ scale: 1.03 }}
            >
              Submit
            </motion.button>
          </form>

          {submitted && (
            <motion.p
              className="mt-4 text-center text-green-600 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              ✅ Your demand has been recorded!
            </motion.p>
          )}
        </motion.div>

        {/* Image */}
        <motion.div 
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="customer_bg.jpg"
            alt="Crafting"
            className="rounded-2xl object-cover w-full max-w-sm"
          />
        </motion.div>
      </div>

      {/* Our Creations Section */}
      <motion.div
        className="w-full mt-16 py-12  rounded-2xl px-6 md:px-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
      <h2 className="text-3xl md:text-4xl font-bold text-[#8b5e34] text-center mb-8">
          Our Creations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {creations.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative rounded-2xl shadow-lg overflow-hidden cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-80 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
              />
              
            </motion.div>
          ))}
        </div>
        
      </motion.div>
    </section>
  );
};

export default CustomerDemand;
