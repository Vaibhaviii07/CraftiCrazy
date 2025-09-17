import { Parallax } from "react-parallax";
import { motion } from "framer-motion";

const Newsletter = () => {
  return (
    <Parallax
      blur={0}
      bgImage="/bg.jpg" // Replace with your background image
      bgImageAlt="Newsletter Background"
      strength={900}
    >
      <div className="h-[400px] flex flex-col items-center justify-center text-center px-6">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-5xl  text-gray-800 drop-shadow-2xl font-[Playfair_Display]"
        >
          Get Your Latest Update !
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-6 text-lg md:text-xl text-gray-800 max-w-2xl leading-relaxed"
        >
          Be the first to discover <span className="font-semibold text-[#ff8fab]">exclusive offers</span>,  
          <span className="italic text-[#f72585]"> artisanal collections</span>, and festive surprises.
        </motion.p>

        {/* Newsletter Form */}
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-xl"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="px-5 py-3 rounded-xl w-72 sm:w-96 outline-none text-gray-900"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#AB420A] to-[#D98B4A] 
                       text-white font-semibold shadow-lg hover:scale-105 
                       transition-transform duration-300"
          >
            Subscribe
          </button>
        </motion.form>
      </div>
    </Parallax>
  );
};

export default Newsletter;
