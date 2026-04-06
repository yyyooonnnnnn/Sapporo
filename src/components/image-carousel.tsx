"use client";

import { useRef, useState, useEffect } from "react";

interface ImageCarouselProps {
  photos?: string[];
  alt?: string;
  className?: string;
}

export function ImageCarousel({ photos, alt = "photo", className = "" }: ImageCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !photos || photos.length <= 1) return;

    function onScroll() {
      if (!el) return;
      const index = Math.round(el.scrollLeft / el.offsetWidth);
      setActiveIndex(index);
    }

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [photos]);

  if (!photos || photos.length === 0) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center ${className}`}
        style={{
          background: "linear-gradient(135deg, #F8F4FF 0%, #EEF7FD 60%, #FDF0E8 100%)",
        }}
      />
    );
  }

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      {/* Scrollable image strip */}
      <div
        ref={scrollRef}
        className="flex h-full w-full snap-x snap-mandatory overflow-x-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {photos.map((src, i) => (
          <div key={i} className="relative h-full w-full shrink-0 snap-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${alt} ${i + 1}`}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      {photos.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
          {photos.map((_, i) => (
            <span
              key={i}
              className="block rounded-full transition-all duration-200"
              style={{
                width: i === activeIndex ? 16 : 6,
                height: 6,
                background: i === activeIndex ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.5)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
