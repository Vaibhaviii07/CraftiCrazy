import React, { useEffect, useRef, useState } from "react";

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
  const rafRef = useRef<number | null>(null);
  const [visibleVideos, setVisibleVideos] = useState<number[]>([]);

  // Lazy load videos with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting && !visibleVideos.includes(index)) {
            setVisibleVideos((prev) => [...prev, index]);
          }
        });
      },
      { root: scrollRef.current, threshold: 0.25 }
    );

    const videos = scrollRef.current?.querySelectorAll("video");
    videos?.forEach((v) => observer.observe(v));

    return () => observer.disconnect();
  }, [visibleVideos]);

  // Smooth infinite auto-scroll using requestAnimationFrame
  const startScrolling = () => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = scrollContainer.scrollLeft;
    const speed = window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 1.5 : 2;

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

  return (
    <div className="w-full bg-[#FBFAF7] py-10">
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-[#432818] mb-10">
        Handmade Wonders That Speak Stories
      </h2>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden no-scrollbar px-6"
        onMouseEnter={stopScrolling}
        onMouseLeave={startScrolling}
        onTouchStart={stopScrolling}
        onTouchEnd={startScrolling}
      >
        {[...reels, ...reels].map((reel, index) => (
          <video
            key={index}
            data-index={index}
            src={visibleVideos.includes(index) ? reel.src : ""}
            autoPlay={visibleVideos.includes(index)}
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
