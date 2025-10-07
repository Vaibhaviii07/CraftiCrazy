import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Gift, Star, Play } from "lucide-react";

const AboutUs: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleVideo = () => {
    const video = document.getElementById("aboutVideo") as HTMLVideoElement;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section className="bg-gradient-to-b from-[#fffaf5] to-[#fdf6f0] py-10 px-4 sm:px-6 md:px-12">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-39">
        {/* Video */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="w-full md:w-1/3 flex justify-center md:justify-start relative"
        >
          <video
            id="aboutVideo"
            src="/aboutus.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-60 sm:w-64 md:w-75 h-auto rounded-2xl hover:scale-105 transition-transform duration-500 object-cover"
          />
          <button
            onClick={toggleVideo}
            className="absolute inset-0 flex items-center justify-center text-white bg-black/20 rounded-2xl hover:bg-black/30 transition"
          >
            {!isPlaying && <Play className="w-8 h-8 sm:w-9 sm:h-9" />}
          </button>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            About <span className="text-[#C45A36]">CraftiCrazy</span>
          </h2>

          <p className="text-sm sm:text-base text-gray-700 mb-2 font-serif leading-relaxed">
            At <span className="font-semibold text-gray-900">CraftiCrazy</span>, we craft gifts that speak the language of emotions. From handmade hampers to keepsakes, rakhis, photo frames, and more — every creation celebrates moments and memories.
          </p>

          <p className="text-sm sm:text-base text-gray-700 mb-4 font-serif leading-relaxed">
            Perfect for birthdays, anniversaries, festivals, or any special occasion where love, thoughtfulness, and quality matter.
          </p>

          {/* Values */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 font-serif">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Heart className="text-[#C45A36] w-5 h-5" />
              <span className="text-gray-800 font-medium text-sm">Made with Love</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Gift className="text-[#C45A36] w-5 h-5" />
              <span className="text-gray-800 font-medium text-sm">Unique Gifts</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Star className="text-[#C45A36] w-5 h-5" />
              <span className="text-gray-800 font-medium text-sm">Premium Quality</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
