import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Sparkles, MapPin } from "lucide-react";

// Real Resort Images (Paths kept same as requested)
import storyMain from "../../assets/images/hh.webp";
import storyInterior from "../../assets/images/merred.webp";
import storyDetail from "../../assets/images/cop.webp";

gsap.registerPlugin(ScrollTrigger);

export default function OurStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".story-reveal", {
        y: 30, autoAlpha: 0, duration: 0.9, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 75%", once: true },
      });

      gsap.from(".story-gold-line", {
        scaleX: 0, transformOrigin: "left center", duration: 1.2, ease: "power3.inOut",
        scrollTrigger: { trigger: section, start: "top 75%", once: true },
      });

      // Main Image Clip Path Reveal
      gsap.fromTo(".story-main-image", 
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)", duration: 1.4, ease: "power4.inOut",
          scrollTrigger: { trigger: section, start: "top 70%", once: true },
        }
      );

      // Right Side Stagger (Ab ye left me hain)
      gsap.from(".story-side-img", {
        x: -30, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 65%", once: true },
      });
      
      // Badge Float
      gsap.to(".story-badge", {
        y: -6, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative isolate overflow-hidden bg-[#F6F0E5] py-16 text-[#192824] sm:py-20 lg:py-24"
    >
      <div className="relative mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-12">
        
        {/* Grid Layout: Images first (Left), Text second (Right) */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
          
          {/* =========================================
              LEFT COLUMN: IMAGES GRID
          ========================================= */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-12 lg:h-[500px]">
            
            {/* Main Tall Image (Curved) */}
            <div className="group relative col-span-1 h-[350px] w-full overflow-hidden rounded-tl-[100px] rounded-bl-[100px] rounded-tr-2xl rounded-br-2xl sm:col-span-7 sm:h-full">
              <img
                src={storyMain}
                alt="Roop Vihar Resorts"
                className="story-main-image h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              
              {/* Halka Gradient (Taaki image clear dikhe) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#101E19]/60 via-transparent to-transparent" />
              
              {/* Text Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <span className="mb-1 block text-[9px] font-bold uppercase tracking-[0.3em] text-[#D5B780]">
                  The Experience
                </span>
                <h3 className="font-serif text-2xl leading-tight text-white sm:text-3xl">
                  Find your own <span className="italic text-[#D5B780]">stillness.</span>
                </h3>
              </div>

              {/* Circular Badge */}
              <div className="story-badge absolute right-4 top-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#D5B780]/40 bg-[#142522]/60 text-white backdrop-blur-md">
                <div className="text-center">
                  <span className="block font-serif text-base text-[#D5B780]">R.V.</span>
                  <span className="block text-[6px] uppercase tracking-[0.15em] text-white/70">Stay</span>
                </div>
              </div>
            </div>

            {/* 2 Stacked Images */}
            <div className="col-span-1 flex flex-col gap-4 sm:col-span-5 sm:h-full">
              
              {/* Image 1 */}
              <div className="story-side-img group relative h-[180px] w-full flex-1 overflow-hidden rounded-2xl">
                <img
                  src={storyInterior}
                  alt="Resort Interior"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#142522]/70 via-transparent to-transparent" />
                
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#D5B780]">
                    01 The Resort
                  </span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    <ArrowUpRight size={12} />
                  </span>
                </div>
              </div>

              {/* Image 2 */}
              <div className="story-side-img group relative h-[180px] w-full flex-1 overflow-hidden rounded-2xl">
                <img
                  src={storyDetail}
                  alt="Celebrations"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#142522]/70 via-transparent to-transparent" />
                
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#D5B780]">
                    02 Celebrations
                  </span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    <ArrowUpRight size={12} />
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* =========================================
              RIGHT COLUMN: TEXT
          ========================================= */}
          <div className="flex flex-col justify-center lg:pl-6">
            
            <div className="story-reveal mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#B99A65]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#8D744A]">
                Our Story
              </span>
              <Sparkles size={12} className="text-[#B99A65]" />
            </div>

            <h2 className="story-reveal overflow-hidden font-serif text-[clamp(2.8rem,5vw,4.5rem)] leading-[1.05] tracking-tight text-[#142522]">
              A place to <br />
              <span className="italic text-[#B99A65]">slow down.</span>
            </h2>

            <div className="story-gold-line mt-5 h-[2px] w-16 bg-[#B99A65]" />

            <p className="story-reveal mt-6 max-w-[300px] text-[13px] leading-6 text-[#62716D]">
              Where time slows down, moments become memories, and every stay feels like coming home.
            </p>

            <div className="story-reveal mt-8 hidden lg:block">
              <Link to="/about" className="group flex h-11 w-11 items-center justify-center rounded-full border border-[#B99A65]/40 text-[#B99A65] transition-colors hover:bg-[#B99A65] hover:text-white">
                <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* =========================================
            BOTTOM TAGLINE & METADATA
        ========================================= */}
        <div className="story-reveal mt-12 flex flex-col items-start justify-between gap-6 border-t border-[#B99A65]/20 pt-8 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <span className="h-px w-8 bg-[#B99A65]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#8D744A]">More Than a Stay</span>
            </div>
            <h3 className="font-serif text-2xl leading-tight text-[#142522] sm:text-3xl">
              Made for moments that <span className="italic text-[#B99A65]">matter.</span>
            </h3>
          </div>
          
          <Link 
            to="/rooms" 
            className="group inline-flex w-fit items-center gap-3 rounded-full border border-[#B99A65]/40 px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#142522] transition-colors hover:bg-[#B99A65] hover:text-white"
          >
            Discover Stays
            <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Bottom Metadata */}
        <div className="story-reveal mt-6 flex flex-wrap items-center justify-between gap-3 text-[8px] font-semibold uppercase tracking-[0.2em] text-[#8D744A]/60 sm:text-[9px]">
          <span className="flex items-center gap-1.5">
            <MapPin size={10} /> © Roop Vihar Resorts
          </span>
          <span>Comfort · Connection · Experiences</span>
        </div>

      </div>
    </section>
  );
}