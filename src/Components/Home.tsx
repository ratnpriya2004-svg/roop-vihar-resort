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
import FAQSection from "./Home/FAQSection";
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

          <div className="stack-section relative z-50 bg-white">
            <FAQSection />
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

      {/* ====================================================
          FLOATING BUTTONS (WhatsApp & Brand Icon)
      ==================================================== */}
      
      {/* WhatsApp Floating Button (Just Above Brand Icon) */}
      <a
        href="https://wa.me/919801897235"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group fixed bottom-[9.5rem] right-5 z-[900] flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 hover:bg-[#20bd5a] sm:bottom-[11.5rem] sm:right-8 sm:h-14 sm:w-14 lg:bottom-[14rem] lg:right-12 lg:h-16 lg:w-16"
      >
        {/* Custom WhatsApp SVG Icon */}
        <svg 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className="h-6 w-6 text-white sm:h-7 sm:w-7 lg:h-8 lg:w-8"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>

      {/* Brand Floating Icon (Roop Vihar) */}
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