import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import brandIcon from "../assets/images/icon.webp";
import Preloader from "./Preloader";
import Header from "./Header";
import OurStory from "./Home/OurStory";
import Stays from "./Home/Stays";
import Celebrations from "./Home/Celebrations";
import Dining from "./Home/Dining";
import Testimonials from "../Components/sections/Testimonials";
import Contact from "./Home/Contact";
import Footer from "../Components/Footer";
import BookingBar from "../Components/Home/BookingBar";

gsap.registerPlugin(ScrollTrigger);

const CLOUDINARY_VIDEO_URL = "https://res.cloudinary.com/vn8ahlyh/video/upload/v1793185644/hotel.mp4";

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollRotation, setScrollRotation] = useState(0);

  const handlePreloaderComplete = useCallback(() => setIsLoading(false), []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrollRotation(window.scrollY * 0.4);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hero entrance Animation
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-eyebrow", { y: 18, autoAlpha: 0, duration: 0.7 })
        .from(".hero-title-line", {
          yPercent: 110, duration: 1.1, stagger: 0.14, ease: "power4.out",
        }, "-=0.35")
        .from(".hero-description", { y: 14, autoAlpha: 0, duration: 0.7 }, "-=0.6")
        .from(".hero-actions > *", { y: 12, autoAlpha: 0, duration: 0.5, stagger: 0.1 }, "-=0.4")
        .from(".hero-bottom", { autoAlpha: 0, duration: 0.6 }, "-=0.2");
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      <Header />

      <main className="relative bg-[#FBF8F2] text-[#142522]">
        
        {/* ====================================================
            HERO SECTION — YAHI EK STICKY RAHEGA
        ==================================================== */}
        <section
          id="home"
          ref={heroRef}
          className="sticky top-0 z-0 flex min-h-[100svh] flex-col justify-center overflow-hidden bg-[#142522] px-5 pb-8 pt-24 text-center text-[#F6F0E5] sm:px-8 sm:pt-28"
        >
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={CLOUDINARY_VIDEO_URL}
            autoPlay muted loop playsInline preload="metadata"
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#142522]/70 via-[#142522]/40 to-[#142522]/90" />
          <div className="pointer-events-none absolute inset-0 gold-glow opacity-30" />

          <div className="relative z-10 mx-auto my-auto max-w-6xl py-14">
            <p className="hero-eyebrow mb-8 flex items-center justify-center gap-3 text-[9px] tracking-[0.35em] text-[#D5B780] sm:text-xs">
              <span className="h-px w-8 bg-[#B99A65]" />
              AN EXCEPTIONAL ADDRESS IN BHAGALPUR
              <span className="h-px w-8 bg-[#B99A65]" />
            </p>

            <h1 className="font-serif text-[clamp(2.2rem,7vw,6.5rem)] leading-[0.98] tracking-tight">
              <span className="hero-title-line block overflow-hidden">
                <span className="block">Where Beautiful Stays</span>
              </span>
              <span className="hero-title-line mt-1 block overflow-hidden">
                <span className="block italic text-[#B99A65]">Meet Unforgettable</span>
              </span>
              <span className="hero-title-line mt-1 block overflow-hidden">
                <span className="block">Celebrations.</span>
              </span>
            </h1>

            <p className="hero-description mx-auto mt-8 max-w-xl text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
              Refined stays, thoughtful dining and memorable gatherings in Bhagalpur.
            </p>

            <div className="hero-actions mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#rooms"
                className="group inline-flex min-h-14 w-full items-center justify-center gap-3 bg-[#B99A65] px-8 py-4 text-[10px] tracking-[0.2em] text-[#142522] transition-all duration-300 hover:bg-[#F6F0E5] sm:w-auto sm:text-xs"
              >
                EXPLORE STAYS
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </a>
              <a
                href="#celebrations"
                className="group inline-flex min-h-14 w-full items-center justify-center gap-3 border border-white/50 px-8 py-4 text-[10px] tracking-[0.2em] text-white transition-all duration-300 hover:border-[#D5B780] hover:text-[#D5B780] sm:w-auto sm:text-xs"
              >
                PLAN A CELEBRATION
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          <div className="hero-bottom absolute bottom-7 left-5 right-5 z-10 flex items-center justify-between text-[8px] tracking-[0.2em] text-white/70 sm:bottom-9 sm:left-10 sm:right-10 sm:text-[10px]">
            <span>HOSPITALITY · ELEVATED</span>
            <span>BHAGALPUR, BIHAR</span>
          </div>

          <a
            href="#booking"
            className="absolute bottom-16 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-[9px] tracking-[0.25em] text-white/70 transition-colors hover:text-[#D5B780] md:flex"
          >
            SCROLL TO DISCOVER
            <ArrowDown size={16} className="animate-bounce text-[#D5B780]" />
          </a>
        </section>

        {/* ====================================================
            NORMAL SECTIONS — Ye sab normal scroll honge
        ==================================================== */}
        <div className="relative z-10">
          <div className="stack-section bg-[#FBF8F2]">
            <BookingBar />
          </div>

          <div className="stack-section bg-[#F6F0E5]">
            <OurStory />
          </div>

          <div className="stack-section bg-[#FBF8F2]">
            <Stays />
          </div>

          <div className="stack-section bg-[#F5EAD2]">
            <Celebrations />
          </div>

          <div className="stack-section bg-[#F6F0E5]">
            <Dining />
          </div>

          <div className="stack-section bg-[#FBF8F2]">
            <Testimonials />
          </div>

          <div className="stack-section bg-[#F5EAD2]">
            <Contact />
          </div>

          <div className="stack-section bg-[#142522] text-white">
            <Footer />
          </div>
        </div>

      </main>

      {/* FLOATING BRAND ICON */}
      <a
        href="#home"
        aria-label="Back to top"
        className="group fixed bottom-20 right-5 z-[900] flex h-16 w-16 items-center justify-center rounded-full border border-[#B99A65]/60 bg-[#142522]/80 shadow-[0_0_35px_rgba(185,154,101,0.25)] backdrop-blur-md transition-all duration-300 hover:border-[#B99A65] hover:bg-[#142522] sm:bottom-24 sm:right-8 sm:h-20 sm:w-20 lg:bottom-28 lg:right-12 lg:h-24 lg:w-24"
      >
        <img
          src={brandIcon}
          alt="Roop Vihar Resorts"
          className="h-full w-full object-contain p-2 drop-shadow-[0_0_18px_rgba(185,154,101,0.4)]"
          style={{ transform: `rotate(${scrollRotation}deg)`, willChange: "transform" }}
        />
      </a>
    </>
  );
}