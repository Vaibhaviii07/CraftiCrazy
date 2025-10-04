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
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);


  const startScrolling = () => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    let scrollAmount = scrollContainer.scrollLeft;

    intervalRef.current = setInterval(() => {
      if (!scrollContainer) return;
      scrollAmount += 3; // slightly faster
      if (scrollAmount >= scrollContainer.scrollWidth / 2) {
        scrollAmount = 0;
        scrollContainer.scrollTo({ left: 0, behavior: "auto" });
      } else {
        scrollContainer.scrollTo({ left: scrollAmount, behavior: "smooth" });
      }
    }, 30); // smaller interval for smoothness
  };

  useEffect(() => {
    startScrolling();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    startScrolling();
  };

  return (
    <div className="w-full bg-[#FBFAF7] py-10">
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-[#432818] mb-10">
        Handmade Wonders That Speak Stories
      </h2>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden no-scrollbar px-6 scroll-smooth"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {[...reels, ...reels].map((reel, index) => (
          <video
            key={index}
            src={reel.src}
            autoPlay
            muted
            loop
            playsInline
            className="w-[200px] sm:w-[220px] md:w-[250px] h-[350px] sm:h-[380px] md:h-[400px] rounded-2xl object-cover flex-shrink-0 shadow-lg hover:scale-105 transition-transform duration-300"
          />
        ))}
      </div>
    </div>
  );
};

export default ReelsRow;
