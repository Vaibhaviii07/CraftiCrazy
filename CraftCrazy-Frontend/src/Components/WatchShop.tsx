import React, { useEffect, useRef, useState } from "react";

const reels = [
  { id: 1, src: "/Scrapbook.mp4" },
  { id: 2, src: "/Dad.mp4" },
  { id: 3, src: "/Hishamper.mp4" },
  { id: 4, src: "/liveframe.mp4" },
  { id: 5, src: "/Tray.mp4" },
  { id: 6, src: "/flower.mp4" },
];

const ReelsRow = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const [visibleVideos, setVisibleVideos] = useState<number[]>([]);

  // =============== LAZY LOAD VIDEOS ===============
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setVisibleVideos((prev) =>
              prev.includes(index) ? prev : [...prev, index]
            );
          }
        });
      },
      {
        root: container,
        threshold: 0.2,
      }
    );

    const videos = container.querySelectorAll("video");
    videos.forEach((v) => observerRef.current?.observe(v));

    return () => observerRef.current?.disconnect();
  }, []);

  // =============== SMOOTH AUTO SCROLL ===============
  const startScrolling = () => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollPos = container.scrollLeft;
    const speed =
      window.innerWidth < 640 ? 0.8 :
      window.innerWidth < 1024 ? 1.2 : 1.8;

    const scroll = () => {
      if (!container) return;

      scrollPos += speed;

      if (scrollPos >= container.scrollWidth / 2) {
        scrollPos = 0;
        container.scrollLeft = 0;
      } else {
        container.scrollLeft = scrollPos;
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
    <div className="w-full bg-[#FBFAF7] py-12">
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-[#432818] mb-12">
        Handmade Wonders That Speak Stories
      </h2>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide px-6 cursor-grab"
        onMouseEnter={stopScrolling}
        onMouseLeave={startScrolling}
        onTouchStart={stopScrolling}
        onTouchEnd={startScrolling}
      >
        {[...reels, ...reels].map((reel, index) => {
  const isVisible = visibleVideos.includes(index);

  return (
    <div
      key={index}
      data-index={index}
      className="w-[200px] sm:w-[220px] md:w-[250px] h-[350px] sm:h-[380px] md:h-[400px] 
                 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg
                 hover:scale-105 hover:shadow-2xl transition-transform duration-300"
    >
      {isVisible ? (
        <video
          src={reel.src}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gray-200 animate-pulse rounded-2xl" />
      )}
    </div>
  );
})}

      </div>
    </div>
  );
};

export default ReelsRow;
