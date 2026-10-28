import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Heart, Sparkles, Users, CalendarDays } from "lucide-react";
import PageShell from "./_PageShell";

// Your exact image names
import wedCatering from "../assets/images/bu.webp";
import wedMandap from "../assets/images/gate.webp";
import wedChairs from "../assets/images/merr.webp";
import wedPool from "../assets/images/merred.webp";
import wedLawn from "../assets/images/mm.webp";
import wedSetup from "../assets/images/marred.webp";
import wedFireworks from "../assets/images/mmm.webp";

gsap.registerPlugin(ScrollTrigger);

const venues = [
  {
    slug: "emerald",
    name: "Emerald Convention Centre",
    capacity: "4,000 sq ft · 200+ guests",
    desc: "Our grandest hall — ideal for weddings and large celebrations with stunning décor.",
  },
  {
    slug: "sapphire",
    name: "Sapphire Conference Room",
    capacity: "Intimate meetings",
    desc: "Perfect for corporate gatherings and small ceremonies.",
  },
  {
    slug: "pearl",
    name: "Pearl Party Hall",
    capacity: "Smaller celebrations",
    desc: "A refined space for birthdays and close-knit gatherings.",
  },
  {
    slug: "lawn",
    name: "Wedding Lawn",
    capacity: "Open-air ceremonies",
    desc: "Ceremonies under the open sky, in the heart of the resort.",
  },
];

export default function Weddings() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Image reveal animation
      gsap.utils.toArray<HTMLElement>(".wed-img-card").forEach((card) => {
        const img = card.querySelector("img");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: "top 92%", once: true },
        });
        
        tl.fromTo(card, 
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: "power4.inOut" }
        );
        
        if (img) {
          tl.fromTo(img, 
            { scale: 1.15 }, 
            { scale: 1, duration: 1.3, ease: "power3.out" }, 
            "-=0.9"
          );
        }
      });

      // Venue cards reveal animation
      gsap.utils.toArray<HTMLElement>(".venue-card").forEach((card, index) => {
        gsap.fromTo(card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: index * 0.1,
            scrollTrigger: { trigger: ".venue-grid", start: "top 85%", once: true },
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageShell
      eyebrow="Celebrations"
      title="Your Wedding, Beautifully Held"
      subtitle="From grand banquets to open-air lawns — experience unforgettable celebrations at Roop Vihar."
    >
      <div ref={pageRef}>
        
        {/* 1. INTRO */}
        <div className="mb-12 max-w-3xl">
          <h2 className="font-serif text-3xl leading-tight text-[#142522] sm:text-4xl">
            One beautiful setting.{" "}
            <span className="italic text-[#B99A65]">Unforgettable moments.</span>
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#25302E]/70 sm:text-base sm:leading-8">
            Our team handles everything from décor and catering to seating
            layouts and coordination — so you can be fully present for the
            moments that matter.
          </p>
        </div>

        {/* =========================================
            2. BIGGER MASONRY GALLERY
            Using aspect ratios for perfectly sized boxes
        ========================================= */}
        <div className="mb-20 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
          
          {/* Mandap - Large Hero (Takes up 2 columns and 2 rows on desktop) */}
          <div className="wed-img-card group relative col-span-1 sm:col-span-2 lg:row-span-2 overflow-hidden rounded-3xl bg-[#E5DFD3] aspect-[16/9] lg:aspect-auto">
            <img src={wedMandap} alt="Grand Mandap" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />
          </div>
          
          {/* Fireworks (Takes up 2 columns) */}
          <div className="wed-img-card group relative col-span-1 sm:col-span-2 overflow-hidden rounded-3xl bg-[#E5DFD3] aspect-[16/9]">
            <img src={wedFireworks} alt="Fireworks" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          </div>

          {/* Pool (Takes up 1 column) */}
          <div className="wed-img-card group relative col-span-1 overflow-hidden rounded-3xl bg-[#E5DFD3] aspect-[4/3]">
            <img src={wedPool} alt="Poolside" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          </div>

          {/* Chairs (Takes up 1 column) */}
          <div className="wed-img-card group relative col-span-1 overflow-hidden rounded-3xl bg-[#E5DFD3] aspect-[4/3]">
            <img src={wedChairs} alt="Chairs" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          </div>

          {/* Catering (Takes up 2 columns) */}
          <div className="wed-img-card group relative col-span-1 sm:col-span-2 overflow-hidden rounded-3xl bg-[#E5DFD3] aspect-[16/9]">
            <img src={wedCatering} alt="Catering" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          </div>

          {/* Setup (Takes up 2 columns) */}
          <div className="wed-img-card group relative col-span-1 sm:col-span-2 overflow-hidden rounded-3xl bg-[#E5DFD3] aspect-[16/9]">
            <img src={wedSetup} alt="Setup" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          </div>

          {/* Lawn - Full Width (4 columns) */}
          <div className="wed-img-card group relative col-span-1 sm:col-span-2 lg:col-span-4 overflow-hidden rounded-3xl bg-[#E5DFD3] aspect-[21/9]">
            <img src={wedLawn} alt="Lawn" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          </div>
        </div>

        {/* =========================================
            3. VENUES GRID
        ========================================= */}
        <div className="mb-20">
          <div className="mb-8">
            <h2 className="font-serif text-3xl text-[#142522]">Our Venues</h2>
            <p className="mt-2 text-sm text-[#62716D]">
              Select a space that fits your vision.
            </p>
          </div>

          <div className="venue-grid grid gap-5 md:grid-cols-2">
            {venues.map((v) => (
              <Link
                key={v.slug}
                to={`/venues/${v.slug}`}
                className="venue-card group flex flex-col justify-between rounded-2xl border border-[#B99A65]/30 bg-white p-6 opacity-100 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#B99A65]/70 hover:shadow-[0_20px_40px_-15px_rgba(20,37,34,0.1)] sm:p-8"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <Heart size={20} className="text-[#B99A65] transition-transform duration-500 group-hover:scale-110 group-hover:fill-[#B99A65]/20" />
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#8D744A]">
                      Venue
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-[#142522]">
                    {v.name}
                  </h3>
                  <p className="mt-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-[#8D744A]">
                    <Users size={12} />
                    {v.capacity}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-[#25302E]/70">
                    {v.desc}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-[#25302E]/10 pt-5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#8D744A]">
                  Enquire Now
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F6F0E5] transition-colors duration-300 group-hover:bg-[#142522] group-hover:text-white">
                    <ArrowUpRight size={15} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* =========================================
            4. CALL TO ACTION
        ========================================= */}
        <div className="relative overflow-hidden rounded-3xl bg-[#142522] px-6 py-16 text-center text-white sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#B99A65]/10 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#B99A65]/10 blur-[80px]" />
          
          <div className="relative z-10 mx-auto max-w-2xl">
            <Sparkles className="mx-auto mb-6 text-[#D5B780]" size={28} />
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl">
              Planning your big day?
            </h3>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-white/70 sm:text-base">
              Share your date and guest count — our team will get back to you
              with tailored packages, menus, and availability.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 rounded-full bg-[#B99A65] px-8 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-[#142522] transition hover:bg-[#D5B780]"
              >
                <CalendarDays size={16} />
                Plan with us
              </Link>
              <a
                href="https://wa.me/919801897235"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-white transition hover:bg-white/10"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>

      </div>
    </PageShell>
  );
}