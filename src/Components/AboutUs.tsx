import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Gift, Star, Play } from "lucide-react";
import { useInView } from "react-intersection-observer";

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

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="py-12 px-4 sm:px-6 md:px-12">
      <div
        ref={ref}
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-9 md:gap-20"
      >
        {/* Video */}
       <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="w-full md:w-1/3 flex justify-center md:justify-start relative"
        >
          <div className="relative w-60 sm:w-64 md:w-80 lg:w-96">
            <video
              id="aboutVideo"
              src="/aboutus.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto rounded-2xl shadow-xl object-cover transition-transform duration-500 hover:scale-105"
            />
            <button
              onClick={toggleVideo}
              className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-2xl hover:bg-black/30 transition-colors"
            >
              {!isPlaying && <Play className="w-10 h-5 sm:w-12 sm:h-10 text-white" />}
            </button>
          </div>
        </motion.div>


        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="w-full md:w-2/3 flex flex-col justify-center text-center md:text-left"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About <span className="text-[#C45A36]">CraftiCrazy</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-3 font-serif leading-relaxed">
            At <span className="font-semibold text-gray-900">CraftiCrazy</span>, we craft gifts that speak the language of emotions. From handmade hampers to keepsakes, rakhis, photo frames, and more every creation celebrates moments and memories.
          </p>

          <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-5 font-serif leading-relaxed">
            Perfect for birthdays, anniversaries, festivals, or any special occasion where love, thoughtfulness, and quality matter.
          </p>

          {/* Values */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 font-serif">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Heart className="text-[#C45A36] w-6 h-6" />
              <span className="text-gray-800 font-medium text-base sm:text-sm md:text-base">Made with Love</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Gift className="text-[#C45A36] w-6 h-6" />
              <span className="text-gray-800 font-medium text-base sm:text-sm md:text-base">Unique Gifts</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Star className="text-[#C45A36] w-6 h-6" />
              <span className="text-gray-800 font-medium text-base sm:text-sm md:text-base">Premium Quality</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
