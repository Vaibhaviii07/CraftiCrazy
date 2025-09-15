import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { GlobeHemisphereWest, FlagBanner, ShieldCheck, Truck, Chats, Gift } from "@phosphor-icons/react";

const newArrivalsData = {
  freshPicks: [
    { name: "Wedding Varmala Preservation", price: 499, oldPrice: 699, discount: "10%", type: "Resin", image: "/Wedding.jpeg" },
    { name: "Personalized Hamper Box", price: 999, oldPrice: 1199, discount: "15%", type: "Hamper", image: "/Hamper.jpeg" },
    { name: "Custom Photo Frame", price: 599, oldPrice: 799, discount: "10%", type: "Frame", image: "/ResinArtifi.jpeg" },
    { name: "Handmade Accessory Set", price: 399, oldPrice: 499, discount: "20%", type: "Accessory", image: "/Acess.jpeg" },
    { name: "Engagement Tray", price: 899, oldPrice: 1099, discount: "15%", type: "Resin", image: "/EngagementRingTray.jpeg" },
    { name: "KeyChain", price: 749, oldPrice: 999, discount: "25%", type: "Frame", image: "/chain.jpeg" },
    { name: "Custom Photo Frame", price: 599, oldPrice: 799, discount: "10%", type: "Frame", image: "/ResinArtifi.jpeg" },
    { name: "Handmade Accessory Set", price: 399, oldPrice: 499, discount: "20%", type: "Accessory", image: "/Acess.jpeg" },
    { name: "Engagement Tray", price: 899, oldPrice: 1099, discount: "15%", type: "Resin", image: "/EngagementRingTray.jpeg" },
    { name: "KeyChain", price: 749, oldPrice: 999, discount: "25%", type: "Frame", image: "/chain.jpeg" },
    { name: "Wedding Varmala Preservation", price: 499, oldPrice: 699, discount: "10%", type: "Resin", image: "/Wedding.jpeg" },
    { name: "Personalized Hamper Box", price: 999, oldPrice: 1199, discount: "15%", type: "Hamper", image: "/Hamper.jpeg" },
    { name: "Custom Photo Frame", price: 599, oldPrice: 799, discount: "10%", type: "Frame", image: "/ResinArtifi.jpeg" },
    { name: "Handmade Accessory Set", price: 399, oldPrice: 499, discount: "20%", type: "Accessory", image: "/Acess.jpeg" },
    { name: "Engagement Tray", price: 899, oldPrice: 1099, discount: "15%", type: "Resin", image: "/EngagementRingTray.jpeg" },
    { name: "KeyChain", price: 749, oldPrice: 999, discount: "25%", type: "Frame", image: "/chain.jpeg" },
    { name: "Custom Photo Frame", price: 599, oldPrice: 799, discount: "10%", type: "Frame", image: "/ResinArtifi.jpeg" },
    { name: "Handmade Accessory Set", price: 399, oldPrice: 499, discount: "20%", type: "Accessory", image: "/Acess.jpeg" },
    { name: "Engagement Tray", price: 899, oldPrice: 1099, discount: "15%", type: "Resin", image: "/EngagementRingTray.jpeg" },
    { name: "KeyChain", price: 749, oldPrice: 999, discount: "25%", type: "Frame", image: "/chain.jpeg" },
   
  ],
};

const services = [
  { icon: <GlobeHemisphereWest size={40} weight="duotone" className="text-pink-500" />, title: "Worldwide Delivery", description: "We deliver gifts to over 194 countries" },
  { icon: <FlagBanner size={40} weight="duotone" className="text-yellow-500" />, title: "Made in India", description: "All our products are proudly made in India" },
  { icon: <ShieldCheck size={40} weight="duotone" className="text-green-500" />, title: "100% Safe & Secure Payments", description: "Pay using secure payment methods" },
  { icon: <Truck size={40} weight="duotone" className="text-blue-500" />, title: "Same Day Dispatch", description: "Dispatched today, delivered fast!" },
  { icon: <Chats size={40} weight="duotone" className="text-green-500" />, title: "Expert Assistance", description: "Chat with us on WhatsApp for instant help" },
  { icon: <Gift size={40} weight="duotone" className="text-red-500" />, title: "Personalized Gifting", description: "Custom-made gifts for your special moments" },
];

const NewArrivals = () => {
  const [email, setEmail] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: number]: boolean }>({});
  const sectionRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribed with:", email);
    setEmail("");
  };

  const handleImageLoad = (index: number) => {
    setImagesLoaded((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <section className="bg-[#FBFAF7]" ref={sectionRef}>
      {/* Banner */}
      <div className="relative h-[50vh] w-full">
        <img src="/NewArr1.jpg" alt="Banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">Discover New Arrivals</h2>
        </div>
      </div>

      {/* Intro Text */}
      <div className="max-w-4xl mx-auto px-6 bg-[#faf5f0] py-12 text-center shadow-md hover:shadow-xl transition">
        <h3 className="text-2xl md:text-3xl font-semibold text-[#AB420A] mb-6">Where Every Gift Tells a Story</h3>
        <p className="text-gray-800 leading-relaxed mb-4">
          Every gift tells a story — a memory, an emotion, a bond. At <span className="font-semibold text-[#b46029]">CraftiCrazy</span>, we craft keepsakes that hold meaning.
        </p>
        <p className="text-gray-800 leading-relaxed mb-4">
          From personalized hampers to timeless resin treasures, each creation is designed with love to make your celebrations unforgettable.
        </p>
        <p className="text-gray-800 leading-relaxed font-medium italic">
          A handmade gift isn’t just given — it’s felt, cherished, and remembered forever. 💝
        </p>
      </div>

      {/* Heading */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-6 border-b border-gray-200">
        <h3 className="text-2xl font-bold text-[#AB420A] flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-[#b46029]" />
          <span className="tracking-wide">Discover Fresh Picks</span>
        </h3>
      </div>

      {/* Product Grid */}
      {/* Product Grid */}
<div className="max-w-7xl mx-auto px-6 py-12">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-center">
    <AnimatePresence>
      {loaded
        ? newArrivalsData.freshPicks.map((item, index) => (
            <motion.div
              key={item.name + index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              exit={{ opacity: 0, y: 30 }}
              className="group flex flex-col items-center"
            >
              {/* Card */}
              <div className="relative w-72 h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 duration-500 bg-white">
                {!imagesLoaded[index] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                    <div className="w-10 h-10 border-4 border-t-[#b46029] border-b-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <img
                  src={item.image}
                  alt={item.name}
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                    imagesLoaded[index] ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => handleImageLoad(index)}
                />
                <span className="absolute top-3 right-3 bg-[#b46029] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  {item.discount} OFF
                </span>
              </div>

              {/* Info */}
              <div className="mt-4 text-center">
                <p className="text-lg font-semibold text-gray-900 font-playfair">{item.name}</p>
                <div className="mt-2 flex justify-center gap-2 items-baseline">
                  <span className="text-gray-400 text-sm line-through">₹{item.oldPrice}</span>
                  <span className="text-xl font-bold text-[#b46029] font-cinzel">₹{item.price}</span>
                </div>
              </div>
            </motion.div>
          ))
        : // Loading Skeletons
          Array(8)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center animate-pulse w-72 h-80 rounded-2xl bg-gray-200"
              ></div>
            ))}
    </AnimatePresence>
  </div>
</div>

    </section>
  );
};

export default NewArrivals;
