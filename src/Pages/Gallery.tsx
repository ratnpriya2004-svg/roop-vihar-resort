import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import PageShell from "./_PageShell";

// Your exact image imports (Do not change)
import wedMandap from "../assets/images/mmm.webp";
import wedLawn from "../assets/images/merr.webp";
import wedPool from "../assets/images/merred.webp";
import wedChairs from "../assets/images/ma.webp";
import dining1 from "../assets/images/ddi.webp";
import dining2 from "../assets/images/dd.webp";
import dining3 from "../assets/images/ddd.webp";
import dining4 from "../assets/images/ddining.webp";
import room1 from "../assets/images/img_1 (2).webp";
import room2 from "../assets/images/img_1 (4).webp";
import conf1 from "../assets/images/cor.webp";
import conf2 from "../assets/images/cop.webp";

gsap.registerPlugin(ScrollTrigger);

const images = [
  { src: wedMandap, alt: "Grand Wedding Stage" },
  { src: dining1, alt: "The Restaurant" },
  { src: room1, alt: "Standard Room" },
  { src: conf1, alt: "Conference Hall" },
  { src: dining3, alt: "Family Dining" },
  { src: wedPool, alt: "Poolside Celebration" },
  { src: room2, alt: "Luxury Suite" },
  { src: wedLawn, alt: "Lawn Setup" },
  { src: dining2, alt: "Restaurant Interior" },
  { src: conf2, alt: "Corporate Event" },
  { src: wedChairs, alt: "Wedding Decor" },
  { src: dining4, alt: "Dining Area" },
];

export default function Gallery() {
  const pageRef = useRef<HTMLDivElement>(null);
  
  // Lightbox State
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Animation on Scroll
  useEffect(() => {
    if (!pageRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".gallery-item", 
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".gallery-grid", start: "top 85%", once: true },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [selectedIndex]);

  // Handle keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % images.length));
  };
  
  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + images.length) % images.length));
  };

  return (
    <PageShell
      eyebrow="Gallery"
      title="A Glimpse of Roop Vihar"
      subtitle="Rooms, celebrations, dining and the grounds — captured in moments."
    >
      <div ref={pageRef}>
        {/* 
          TRUE MASONRY GRID (CSS Columns)
          This completely eliminates blank spaces because the images 
          determine their own height. 
        */}
        <div className="gallery-grid columns-1 gap-4 sm:columns-2 lg:columns-3 space-y-4">
          {images.map((img, i) => (
            <div
              key={i}
              onClick={() => setSelectedIndex(i)}
              className="gallery-item group relative cursor-pointer overflow-hidden rounded-2xl break-inside-avoid shadow-sm"
            >
              {/* 
                h-auto w-full ensures the image keeps its natural aspect ratio 
                and there is NO grey box or blank space behind it.
              */}
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-auto w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#142522]/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <p className="absolute bottom-4 left-4 translate-y-4 text-[10px] font-medium uppercase tracking-[0.2em] text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {img.alt}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================
          LIGHTBOX MODAL (Image Popup)
      ========================================= */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#142522]/95 backdrop-blur-md">
          
          {/* Close Button */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute right-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 sm:right-8 sm:top-8"
          >
            <X size={24} />
          </button>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 sm:left-8 sm:h-16 sm:w-16"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Main Image */}
          <div className="relative flex max-h-[90vh] max-w-[90vw] items-center justify-center">
            <img
              src={images[selectedIndex].src}
              alt={images[selectedIndex].alt}
              className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl animate-in fade-in zoom-in-95 duration-300"
            />
            <div className="absolute -bottom-10 left-0 right-0 text-center">
              <p className="text-sm font-medium tracking-widest text-white/80 uppercase">
                {images[selectedIndex].alt}
              </p>
              <p className="mt-1 text-[10px] text-white/50">
                {selectedIndex + 1} / {images.length}
              </p>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 sm:right-8 sm:h-16 sm:w-16"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </PageShell>
  );
}