import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import img1 from "../../assets/images/bir.webp";       
import img2 from "../../assets/images/cceli.webp";   
import img3 from "../../assets/images/sadi.webp";   

gsap.registerPlugin(ScrollTrigger);

type SlideData = {
  id: number;
  tagline: string;
  headingTop: string;
  headingItalic: string;
  description: string;
  cardTitle: string;
  cardDesc: string;
  image: string;
};

const SLIDES: SlideData[] = [
  {
    id: 1,
    tagline: "CELEBRATE LIFE'S SPECIAL MOMENTS",
    headingTop: "Celebrations.",
    headingItalic: "Crafted to Perfection.",
    description: "Beautiful venues, personalized setups and a warm ambience to make your special moments truly unforgettable.",
    cardTitle: "Birthday Celebration",
    cardDesc: "Joyful spaces for your little one's big moments.",
    image: img1,
  },
  {
    id: 2,
    tagline: "TIMELESS ELEGANCE",
    headingTop: "Weddings.",
    headingItalic: "Written in Gold.",
    description: "Exchange vows beneath chandeliers and open skies — a setting as timeless as the promise you make.",
    cardTitle: "Royal Weddings",
    cardDesc: "Grand ballrooms & lush lawns for your perfect day.",
    image: img2,
  },
  {
    id: 3,
    tagline: "SOPHISTICATED GATHERINGS",
    headingTop: "Occasions.",
    headingItalic: "Kept Intimate.",
    description: "Milestone anniversaries, corporate galas and family gatherings hosted with quiet luxury and effortless care.",
    cardTitle: "Corporate Gala",
    cardDesc: "Premium banquet spaces for your business events.",
    image: img3,
  },
];

export default function Celebrations() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const total = SLIDES.length;
  const slide = SLIDES[active];

  const goTo = useCallback(
    (idx: number) => setActive(((idx % total) + total) % total),
    [total]
  );
  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  // GSAP Entrance Animation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 75%", once: true },
      });

      tl.fromTo(
        ".cel-text-elem",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      )
      .fromTo(
        ".cel-card",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(
        ".cel-thumb",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
        "-=0.6"
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Auto-Play Logic
  useEffect(() => {
    if (isHovered) return; 
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, total]);

  return (
    <section
      ref={sectionRef}
      id="celebrations"
      className="relative w-full overflow-hidden bg-[#0B1513]"
    >
      <div 
        className="relative h-[85vh] min-h-[650px] w-full lg:h-screen lg:max-h-[900px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        {/* ═══════════════════════════════════════════════════════
            BACKGROUND IMAGES (z-0, abs positioned)
        ═══════════════════════════════════════════════════════ */}
        <div className="absolute inset-0 z-0">
          {SLIDES.map((s, i) => (
            <img
              key={s.id}
              src={s.image}
              alt={`Roop Vihar ${s.cardTitle}`}
              aria-hidden={i !== active}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "low"}
              draggable={false}
            />
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════
            CINEMATIC OVERLAYS (z-10, pointer-events-none)
        ═══════════════════════════════════════════════════════ */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-[#0B1513]/95 via-[#0B1513]/50 to-transparent lg:w-[70%]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/2 bg-gradient-to-t from-[#0B1513]/90 via-[#0B1513]/30 to-transparent" />

        {/* ═══════════════════════════════════════════════════════
            CONTENT LAYER (z-20)
        ═══════════════════════════════════════════════════════ */}
        <div className="relative z-20 flex h-full w-full flex-col justify-between p-6 pt-24 sm:p-10 sm:pt-28 lg:p-16 lg:pt-32 xl:px-24">
          
          {/* TOP SECTION */}
          <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start">
            
            {/* LEFT TEXT */}
            <div className="max-w-2xl lg:max-w-[55%]">
              <div className="cel-text-elem mb-4 flex items-center gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B99A65] sm:text-xs">
                  {slide.tagline}
                </span>
              </div>

              <h2 className="font-serif text-[clamp(2.8rem,6vw,5.5rem)] leading-[1.05] tracking-tight text-[#F6F0E5] drop-shadow-xl">
                <span className="cel-text-elem block overflow-hidden">
                  <span className="block">{slide.headingTop}</span>
                </span>
                <span className="cel-text-elem block overflow-hidden">
                  <span className="block italic text-[#B99A65]">
                    {slide.headingItalic}
                  </span>
                </span>
              </h2>

              <p className="cel-text-elem mt-6 max-w-lg text-[14px] leading-[1.7] text-[#F6F0E5]/90 sm:text-base sm:leading-8 drop-shadow-md">
                {slide.description}
              </p>

              <div className="cel-text-elem mt-8">
                <a
                  href="#venues"
                  className="group inline-flex items-center gap-4 rounded-full bg-[#B99A65] py-2 pl-6 pr-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[#142522] transition-all duration-300 hover:bg-[#F6F0E5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1513] sm:text-xs"
                >
                  <span>Explore Venues</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#142522] text-[#F6F0E5] transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight size={14} strokeWidth={2.5} />
                  </span>
                </a>
              </div>
            </div>

            {/* RIGHT SIDE: FLOATING CARD */}
            <div className="cel-card relative mt-auto flex w-full flex-col items-start justify-end lg:mt-0 lg:w-auto lg:items-end">
              <div className="relative w-full max-w-[340px] rounded-2xl border border-white/20 bg-black/40 p-6 pr-20 shadow-2xl backdrop-blur-lg sm:max-w-[380px]">
                
                <div className="flex items-center gap-2 text-[10px] font-medium tracking-widest text-[#B99A65]">
                  <span>{String(active + 1).padStart(2, '0')}</span>
                  <span className="h-px w-6 bg-[#B99A65]/50"></span>
                  <span className="text-white/60">{String(total).padStart(2, '0')}</span>
                </div>
                
                <h3 className="mt-3 font-serif text-xl text-[#F6F0E5] sm:text-2xl">
                  {slide.cardTitle}
                </h3>
                
                <p className="mt-2 text-[12px] leading-relaxed text-[#F6F0E5]/70 sm:text-[13px]">
                  {slide.cardDesc}
                </p>

                <a
                  href="#venues"
                  aria-label="View Venue Details"
                  className="group absolute -right-6 top-1/2 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#142522] bg-[#F6F0E5] text-[#142522] shadow-[0_0_20px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-110 hover:bg-[#B99A65] sm:h-20 sm:w-20"
                >
                  <ArrowUpRight size={28} strokeWidth={1.5} className="transition-transform duration-300 group-hover:rotate-45" />
                </a>
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION: Thumbnails & Arrows */}
          <div className="mt-12 flex w-full items-end justify-between lg:mt-0">
            
            <div className="flex items-center gap-3 sm:gap-4">
              {SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`View ${s.cardTitle}`}
                  aria-current={i === active}
                  className={`cel-thumb group relative overflow-hidden rounded-lg border-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B99A65] ${
                    i === active
                      ? "h-16 w-24 border-[#B99A65] opacity-100 shadow-lg sm:h-20 sm:w-32"
                      : "h-14 w-20 border-transparent opacity-60 hover:opacity-100 sm:h-16 sm:w-24"
                  }`}
                >
                  <img
                    src={s.image}
                    alt={s.cardTitle}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-black/40 transition-opacity ${i === active ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'}`} />
                </button>
              ))}
            </div>

            {/* Arrows (Mobile/Tablet) */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={prev}
                type="button"
                aria-label="Previous slide"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-white/20"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={next}
                type="button"
                aria-label="Next slide"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-white/20"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}