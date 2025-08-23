import React, { useEffect, useRef } from "react";

const reels = [
  { id: 1, src: "/frame.mp4" },
  { id: 2, src: "/engagmeant.mp4" },
  { id: 3, src: "/hamper.mp4" },
  { id: 4, src: "/giftbox.mp4" },
  { id: 5, src: "/Decorativeiteam.mp4" },
  { id: 6, src: "/keychain.mp4" },
];

const ReelsRow = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;

    const scrollStep = () => {
      if (scrollContainer) {
        scrollAmount += 2;
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
        
          scrollAmount = 0;
          scrollContainer.scrollTo({ left: 0, behavior: "auto" });
        } else {
          scrollContainer.scrollTo({ left: scrollAmount, behavior: "smooth" });
        }
      }
    };

    const interval = setInterval(scrollStep, 30); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#FBFAF7] py-10">
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-[#AB420A] mb-10 flex items-center justify-center gap-3">
        Handmade Wonders That Speak Stories
        <img
          className="w-32 md:w-40 object-contain"
          src="/wonderLogo2.png"
          alt="Handmade Wonders Logo"
        />
      </h2>

      <div
        ref={scrollRef}
        className="flex gap-8 overflow-x-hidden no-scrollbar px-6 scroll-smooth"
      >
        {[...reels, ...reels].map((reel, index) => (
          <video
            key={index}
            src={reel.src}
            autoPlay
            muted
            loop
            playsInline
            className="w-[250px] h-[400px] rounded-2xl object-cover flex-shrink-0 shadow-lg hover:scale-105 transition-transform duration-300"
          />
        ))}
      </div>
    </div>
  );
};

export default ReelsRow;
