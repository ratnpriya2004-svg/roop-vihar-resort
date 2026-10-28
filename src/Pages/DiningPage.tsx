import { useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom"; // Added useLocation
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Phone, 
  MessageCircle, 
  Clock, 
  UtensilsCrossed, 
  Cake, 
  CalendarDays,
  ArrowUpRight,
  Sparkles
} from "lucide-react";
import PageShell from "./_PageShell";

// Import your dining & bakery images
import heroImg from "../assets/images/dd.webp";
import interior1 from "../assets/images/ddd.webp";
import interior2 from "../assets/images/ddi.webp";
import familyDining from "../assets/images/ddining.webp";
import cakeChocolate from "../assets/images/cake.webp";
import cakeBirthday from "../assets/images/ccak.webp";

gsap.registerPlugin(ScrollTrigger);

export default function DiningPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const location = useLocation(); // Get the current URL hash

  // --- SCROLL TO HASH LOGIC ---
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        // Small delay to ensure the page has rendered before scrolling
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
      }
    }
  }, [location]);

  // --- ANIMATIONS ---
  useEffect(() => {
    if (!pageRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".img-reveal").forEach((card) => {
        const img = card.querySelector("img");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: "top 90%", once: true },
        });
        
        tl.fromTo(card, 
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 1, ease: "power3.out" }
        );
        
        if (img) {
          tl.fromTo(img, { scale: 1.15 }, { scale: 1, duration: 1.2, ease: "power3.out" }, "-=0.8");
        }
      });

      gsap.utils.toArray<HTMLElement>(".fade-up").forEach((el) => {
        gsap.fromTo(el,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageShell
      eyebrow="Maharaja Restaurant"
      title="A Table Worth Gathering Around"
      subtitle="Multi-cuisine dining, warm service and an atmosphere made for shared moments."
      heroImage={heroImg}
    >
      <div ref={pageRef}>
        
        {/* 1. INTRO & FEATURES */}
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] mb-20">
          <div className="fade-up">
            <h2 className="font-serif text-3xl text-[#142522] sm:text-4xl">
              Flavours to remember
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#25302E]/70 sm:text-base sm:leading-8">
              Maharaja Restaurant serves a thoughtful multi-cuisine menu — from
              comforting Indian classics to continental favourites. Dine
              indoors or beside the pool for a more relaxed setting.
            </p>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { icon: Clock, title: "Hours", detail: "7:00 AM – 11:00 PM" },
                { icon: UtensilsCrossed, title: "Cuisine", detail: "Multi-cuisine" },
                { icon: Sparkles, title: "Seating", detail: "Indoor & poolside" },
                { icon: CalendarDays, title: "Private dining", detail: "On request" },
              ].map((v) => {
                const Icon = v.icon;
                return (
                  <div
                    key={v.title}
                    className="group rounded-2xl border border-[#B99A65]/20 bg-white p-5 transition-colors hover:border-[#B99A65]/60"
                  >
                    <Icon size={20} className="mb-3 text-[#B99A65] transition-transform group-hover:scale-110" />
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#8D744A]">
                      {v.title}
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#142522]">
                      {v.detail}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sticky Action Card */}
          <div className="fade-up relative h-fit">
            <div className="rounded-3xl border border-[#B99A65]/30 bg-[#F5EAD2] p-6 shadow-[0_20px_50px_-20px_rgba(185,154,101,0.3)] sm:p-8">
              <h3 className="font-serif text-2xl text-[#142522]">
                Reserve a table
              </h3>
              <p className="mt-2 text-sm text-[#25302E]/70">
                Call or WhatsApp to secure your spot for lunch or dinner.
              </p>
              <div className="mt-6 space-y-3">
                <a
                  href="tel:+917631005599"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#142522] py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-[#28483D]"
                >
                  <Phone size={16} />
                  Call +91 76310 05599
                </a>
                <a
                  href="https://wa.me/919801897235"
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-[#B99A65] bg-white/50 py-4 text-xs uppercase tracking-[0.2em] text-[#142522] transition hover:bg-white"
                >
                  <MessageCircle size={16} />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 2. RESTAURANT GALLERY */}
        <div className="mb-24">
          <div className="mb-8 fade-up">
            <h2 className="font-serif text-2xl text-[#142522]">The Atmosphere</h2>
            <p className="mt-1 text-sm text-[#62716D]">Warm lighting, comfortable seating, and space to breathe.</p>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
            <div className="img-reveal group relative col-span-1 sm:col-span-2 md:col-span-2 overflow-hidden rounded-3xl aspect-[4/3] sm:aspect-[16/9] md:aspect-auto md:h-full bg-[#E5DFD3]">
              <img src={interior1} alt="Restaurant long table" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            </div>
            <div className="flex flex-col gap-4 md:gap-5">
              <div className="img-reveal group relative aspect-[4/3] md:aspect-auto md:flex-1 overflow-hidden rounded-3xl bg-[#E5DFD3]">
                <img src={interior2} alt="Restaurant interior" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <div className="img-reveal group relative aspect-[4/3] md:aspect-auto md:flex-1 overflow-hidden rounded-3xl bg-[#E5DFD3]">
                <img src={familyDining} alt="Family dining" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
            </div>
          </div>
        </div>

        {/* 3. MR. CAKE BAKERY SECTION */}
        {/* The id="bakery" is what the header link scrolls to */}
        <div id="bakery" className="scroll-mt-28 rounded-[3rem] bg-[#142522] px-6 py-16 text-[#F6F0E5] sm:px-12 sm:py-20 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#B99A65]/20 blur-[80px]" />
          
          <div className="relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="fade-up">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D5B780]/30 bg-[#D5B780]/10 text-[#D5B780]">
                  <Cake size={18} />
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#D5B780]">
                  In-house Bakery
                </span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl">
                Mr. Cake
              </h2>
              <p className="mt-6 text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
                From custom birthday cakes to fresh daily pastries, our in-house 
                confectionery crafts delightful treats for every occasion. 
                Pre-order your celebration cake or grab a sweet bite on the go.
              </p>
              
              <a
                href="https://wa.me/919801897235?text=Hello%2C%20I'd%20like%20to%20enquire%20about%20Mr.%20Cake%20Bakery."
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#B99A65] px-8 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-[#142522] transition hover:bg-[#D5B780]"
              >
                Order a Cake
                <ArrowUpRight size={16} />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              <div className="img-reveal group relative aspect-[3/4] overflow-hidden rounded-2xl">
                <img src={cakeChocolate} alt="Chocolate Cake" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="img-reveal group relative aspect-[3/4] mt-8 sm:mt-12 overflow-hidden rounded-2xl">
                <img src={cakeBirthday} alt="Birthday Cake" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </PageShell>
  );
}