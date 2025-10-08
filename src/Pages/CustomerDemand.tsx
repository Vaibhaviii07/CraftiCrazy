// src/Pages/CustomerDemandPremium.tsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FormData = {
  name: string;
  email: string;
  phone: string;
  product: string;
  customization: string;
  image: File | null;
};

const howItWorksSteps = [
  { id: 1, title: "Share Your Idea", description: "Tell us your vision, from trays to keepsakes.", icon: "💡" },
  { id: 2, title: "Select Customization", description: "Choose colors, materials, and design.", icon: "🎨" },
  { id: 3, title: "Crafted with Love", description: "Our artisans handcraft your bespoke piece.", icon: "🛠️" },
  { id: 4, title: "Receive with Elegance", description: "Enjoy your premium creation delivered with care.", icon: "🎁" },
];

const reels = [
  { id: 1, video: "holder.mp4" },
  { id: 2, video: "blood.mp4" },
  { id: 3, video: "mug.mp4" },
  { id: 4, video: "reel1.mp4" },
  { id: 5, video: "reel2.mp4" },
  { id: 6, video: "reel3.mp4" },
];

const CustomerDemandPremium = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "", email: "", phone: "", product: "", customization: "", image: null
  });
  const [submitted, setSubmitted] = useState(false);

  const reelContainerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // 🎞️ Smooth infinite auto-scroll using requestAnimationFrame
  const startScrolling = () => {
    const scrollContainer = reelContainerRef.current;
    if (!scrollContainer) return;

    let scrollAmount = scrollContainer.scrollLeft;
    const speed = window.innerWidth < 740 ? 1 : 2; 

    const scroll = () => {
      if (!scrollContainer) return;
      scrollAmount += speed;
      if (scrollAmount >= scrollContainer.scrollWidth / 2) {
        scrollAmount = 0;
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft = scrollAmount;
      }
      rafRef.current = requestAnimationFrame(scroll);
    };

    rafRef.current = requestAnimationFrame(scroll);
  };

  const stopScrolling = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };

  useEffect(() => {
    startScrolling();
    return () => stopScrolling();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (e.target instanceof HTMLInputElement && e.target.type === "file") {
      const files = e.target.files;
      if (files && files.length > 0) setFormData(prev => ({ ...prev, image: files[0] }));
    } else setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", product: "", customization: "", image: null });
  };

  return (
    <section className="min-h-screen bg-[#FFFDF9] overflow-hidden">
      {/* HERO SECTION */}
      <div className="relative w-full h-[260px] sm:h-[380px] md:h-[500px] flex items-center justify-center text-center">
        <img src="banner.jpg" alt="Crafting" className="w-full h-full object-cover brightness-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-3">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-serif text-white drop-shadow-xl font-bold">
            Customize Your Demand
          </h1>
          <p className="mt-2 text-sm sm:text-lg md:text-2xl italic text-white drop-shadow-md font-light">
            With CraftiCrazy — Crafted With Care
          </p>
        </div>
      </div>

      {/* AUTO-SCROLLING REELS */}
      <motion.div className="relative w-full py-10 sm:py-14 rounded-3xl shadow-lg mt-8 sm:mt-12 border border-gray-200 bg-gradient-to-b from-[#FFF8F1] to-[#FFFDF9]">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#8b5e34] font-serif text-center mb-6 sm:mb-8">
          Sanika&apos;s Creations
        </h2>

        <div
          ref={reelContainerRef}
          className="flex gap-4 sm:gap-6 overflow-x-hidden no-scrollbar px-3 sm:px-6 relative"
          onMouseEnter={stopScrolling}
          onMouseLeave={startScrolling}
          onTouchStart={stopScrolling}
          onTouchEnd={startScrolling}
        >
          {[...reels, ...reels].map((reel, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="min-w-[180px] sm:min-w-[220px] md:min-w-[280px] rounded-2xl shadow-lg overflow-hidden bg-white border border-gray-100 transition-all duration-300"
            >
              <video
                src={reel.video}
                className="w-full h-60 sm:h-62 md:h-74 object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            </motion.div>
          ))}
        </div>

        {/* edge fade effects */}
        <div className="absolute top-0 left-0 h-full w-10 bg-gradient-to-r from-[#FFF8F1] via-[#FFF8F1]/70 to-transparent pointer-events-none rounded-l-3xl"></div>
        <div className="absolute top-0 right-0 h-full w-10 bg-gradient-to-l from-[#FFF8F1] via-[#FFF8F1]/70 to-transparent pointer-events-none rounded-r-3xl"></div>
      </motion.div>

      {/* FORM + WHY WE CREATE SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col lg:flex-row justify-center items-center gap-10 w-full md:w-4/5 mx-auto mb-16 mt-14 px-4 sm:px-6"
      >
        {/* FORM */}
        <div className="w-full lg:w-5/12 bg-white p-5 sm:p-8 rounded-2xl shadow-2xl border border-gray-100 text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#8b5e34] mb-3">
            Share Your Dream
          </h2>
          <p className="text-gray-600 mb-5 sm:mb-7 font-[Playfair_Display] text-sm sm:text-base">
            Your vision, our craftsmanship.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4 w-full">
            {["name", "email", "phone", "product"].map((field) => (
              <input
                key={field}
                type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                name={field}
                value={formData[field as keyof FormData] as string}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#c9a26d] focus:outline-none text-sm sm:text-base"
              />
            ))}

            <textarea
              name="customization"
              value={formData.customization}
              onChange={handleChange}
              placeholder="How do you want to customize it?"
              rows={3}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#c9a26d] resize-none text-sm sm:text-base"
            />

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full py-2 px-3 rounded-xl border border-gray-300 cursor-pointer focus:ring-2 focus:ring-[#c9a26d] text-sm"
            />

            {formData.image && (
              <div className="relative mt-2 w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-lg overflow-hidden shadow-md border border-gray-200">
                <img src={URL.createObjectURL(formData.image)} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, image: null }))}
                  className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs"
                >
                  ✕
                </button>
              </div>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              className="mt-4 py-2 w-full bg-gradient-to-r from-[#c9a26d] to-[#8b5e34] text-white font-medium rounded-xl shadow-md text-sm sm:text-base"
            >
              Submit
            </motion.button>
          </form>

          <AnimatePresence>
            {submitted && (
              <motion.p
                className="mt-3 text-green-600 font-medium text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                ✅ Your request has been recorded!
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* WHY WE CREATE */}
        <div className="w-full lg:w-5/12 bg-[#FFF8F1] p-5 sm:p-8 rounded-2xl shadow-lg border border-gray-100 text-center lg:text-left">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#8b5e34] mb-3">
            Why We Create
          </h3>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg italic font-[Playfair_Display] mb-6 max-w-lg mx-auto">
            Behind every piece we craft lies a story waiting to be told. From delicate keepsakes to stunning wedding
            treasures, each creation is infused with passion, artistry, and a touch of magic.
          </p>

          <div className="flex gap-5 justify-center sm:justify-start mt-3">
            {/* Instagram */}
            <a href="https://www.instagram.com/crafticrazy_710/" target="_blank" rel="noopener noreferrer">
              <svg className="w-8 h-8 text-pink-500 hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2C4.13 2 1.25 4.88 1.25 8.5v7c0 3.62 2.88 6.5 6.5 6.5h7c3.62 0 6.5-2.88 6.5-6.5v-7c0-3.62-2.88-6.5-6.5-6.5h-7zM12 7.25a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5zm0 1.5a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5zm5.25-.25a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
              </svg>
            </a>
            {/* WhatsApp */}
            <a href="https://wa.me/7721028815" target="_blank" rel="noopener noreferrer">
              <svg className="w-8 h-8 text-green-500 hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.04 2C6.55 2 2 6.55 2 12.04c0 2.11.55 4.17 1.59 6L2 22l4.1-1.55a10.04 10.04 0 0 0 5.94 1.9h.01c5.49 0 10.04-4.55 10.04-10.04S17.53 2 12.04 2zm5.92 14.55c-.25.7-1.45 1.34-2 1.43-.51.09-1.17.13-1.89-.12a8.3 8.3 0 0 1-1.86-.89c-3.27-1.95-5.18-5.43-5.34-5.68-.15-.25-1.27-1.7-1.27-3.24 0-1.54.8-2.29 1.09-2.61.29-.32.63-.4.84-.4.21 0 .42.01.6.01.19 0 .45-.07.7.53.25.61.84 2.1.92 2.25.07.15.12.33.02.53-.1.2-.15.32-.29.5-.15.18-.31.4-.45.54-.15.15-.3.31-.13.6.17.29.75 1.23 1.61 2 .99.88 1.83 1.15 2.12 1.3.29.15.46.13.64-.08.18-.21.74-.86.94-1.16.2-.29.4-.25.67-.15.28.09 1.77.84 2.07 1 .3.15.5.25.57.39.07.14.07.79-.18 1.49z"></path>
              </svg>
            </a>
          </div>
        </div>
      </motion.div>

      {/* HOW IT WORKS */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 px-4 sm:px-6 mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {howItWorksSteps.map((step) => (
          <motion.div
            key={step.id}
            whileHover={{ scale: 1.07, y: -5 }}
            className="flex flex-col items-center text-center p-5 sm:p-6 rounded-3xl bg-white shadow-xl border border-gray-100"
          >
            <div className="text-4xl sm:text-5xl mb-3">{step.icon}</div>
            <h3 className="font-semibold text-lg text-[#8b5e34] mb-1">{step.title}</h3>
            <p className="text-gray-700 text-sm sm:text-base">{step.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default CustomerDemandPremium;
