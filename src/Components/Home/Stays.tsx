import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight, ArrowUpRight, BedDouble, UsersRound, Sparkles } from "lucide-react";

// Your exact imports
import luxuryRoom from "../../assets/images/img_1 (2).webp";
import dulexyRoom from "../../assets/images/img_1 (3).webp";
import corporateroom from "../../assets/images/img_3 (2).webp";

gsap.registerPlugin(ScrollTrigger);

const rooms = [
  { 
    name: "Standard Room", 
    tag: "Comfort", 
    rate: "₹2,499", 
    guests: "Up to 2 guests", 
    image: luxuryRoom, 
    alt: "Standard room", 
    note: "Comfort-led interiors.", 
    number: "01" 
  },
  { 
    name: "Deluxe Room", 
    tag: "A Little More", 
    rate: "₹2,799", 
    guests: "Up to 2 guests", 
    image: dulexyRoom, 
    alt: "Deluxe room", 
    note: "Refined details.", 
    number: "02" 
  },
  { 
    name: "Suite", 
    tag: "Space to Settle", 
    rate: "₹3,099", 
    guests: "Up to 3 guests", 
    image: corporateroom, 
    alt: "Suite", 
    note: "Extra space, extra calm.", 
    number: "03" 
  },
];

export default function Stays() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(section, 
        { yPercent: 6, scale: 0.98 }, 
        {
          yPercent: 0, scale: 1, ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "top 25%", scrub: 1 },
        }
      );

      gsap.fromTo(".stays-reveal", 
        { y: 35, opacity: 0 }, 
        {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%", once: true },
        }
      );

      gsap.fromTo(".stay-card", 
        { y: 55, opacity: 0 }, 
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.16, ease: "power3.out",
          scrollTrigger: { trigger: trackRef.current, start: "top 85%", once: true },
        }
      );

      gsap.fromTo(".stays-gold-line", 
        { scaleX: 0, transformOrigin: "left center" }, 
        {
          scaleX: 1, duration: 1.2, ease: "power3.inOut",
          scrollTrigger: { trigger: section, start: "top 75%", once: true },
        }
      );

      section.querySelectorAll<HTMLImageElement>(".stay-image").forEach((img) => {
        gsap.fromTo(img, 
          { scale: 1.15 }, 
          {
            scale: 1, duration: 1.4, ease: "power3.out",
            scrollTrigger: { trigger: img, start: "top 90%", once: true },
          }
        );
      });

      gsap.to(".stays-orbit", { rotation: 25, duration: 25, repeat: -1, ease: "none" });
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollCards = (dir: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.querySelector<HTMLElement>(".stay-card");
    const dist = first ? first.getBoundingClientRect().width + 24 : track.clientWidth;
    track.scrollBy({ left: dir === "right" ? dist : -dist, behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} id="rooms" className="relative isolate overflow-hidden py-20 text-[#25302E] sm:py-24 lg:py-28">
      <div className="gold-grid-bg pointer-events-none absolute inset-0 opacity-30" />
      <div aria-hidden="true" className="stays-orbit pointer-events-none absolute -right-40 top-10 h-[380px] w-[380px] rounded-full border border-[#B99A65]/20 sm:h-[520px] sm:w-[520px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-[#B99A65]/10 blur-[100px]" />

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-14 xl:px-20">
        <div className="mb-10 grid gap-6 sm:mb-14 lg:mb-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <div>
            <div className="stays-reveal mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#B99A65] sm:w-12" />
              <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-[#8D744A] sm:text-xs">Discover Your Stay</span>
              <Sparkles size={14} className="text-[#B99A65]" />
            </div>
            <h2 className="stays-reveal max-w-4xl font-serif text-[clamp(2.6rem,6.5vw,6rem)] leading-[1.02] tracking-tight">
              Rooms for <br /><span className="italic text-[#B99A65]">every moment.</span>
            </h2>
            <div className="stays-gold-line mt-6 h-[2px] w-24 bg-[#B99A65] sm:mt-8 sm:w-32" />
          </div>
        </div>

        <div className="stays-reveal mb-6 flex items-end justify-between gap-4 sm:mb-8">
          <p className="font-serif text-2xl sm:text-3xl">Our accommodation</p>
          <div className="flex shrink-0 gap-2">
            <button type="button" onClick={() => scrollCards("left")} aria-label="Previous" className="flex h-10 w-10 items-center justify-center border border-[#B99A65]/50 transition-all hover:border-[#192824] hover:bg-[#192824] hover:text-white sm:h-12 sm:w-12">
              <ArrowLeft size={18} />
            </button>
            <button type="button" onClick={() => scrollCards("right")} aria-label="Next" className="flex h-10 w-10 items-center justify-center border border-[#B99A65]/50 transition-all hover:border-[#192824] hover:bg-[#192824] hover:text-white sm:h-12 sm:w-12">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div ref={trackRef} className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-6 sm:gap-6 lg:gap-7" style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
          {rooms.map((room) => (
            <article key={room.number} className="stay-card group flex w-[88%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-[#B99A65]/25 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-[#B99A65]/80 hover:shadow-[0_20px_55px_rgba(37,48,46,0.10)] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-19px)]">
              
              {/* FIXED IMAGE SECTION: Using aspect-[4/3] to remove blank space */}
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
                <img src={room.image} alt={room.alt} loading="lazy" className="stay-image h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#142522]/65 via-transparent to-transparent opacity-80" />
                <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-[#142522]/80 px-3 py-1.5 text-[9px] uppercase tracking-[0.16em] text-white backdrop-blur-md sm:text-[10px]">{room.tag}</span>
                <span className="absolute bottom-3 right-4 font-serif text-5xl text-white/90 sm:text-6xl drop-shadow-md">{room.number}</span>
              </div>

              {/* CONTENT SECTION */}
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-serif text-2xl leading-tight sm:text-3xl">{room.name}</h3>
                    <p className="mt-2 text-xs leading-6 text-[#25302E]/65 sm:text-sm">{room.note}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="block font-serif text-xl text-[#8D744A] sm:text-2xl">{room.rate}</span>
                    <span className="mt-1 block text-[9px] uppercase tracking-[0.12em] text-[#25302E]/55 sm:text-[10px]">Per night*</span>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[#25302E]/10 pt-4 text-xs text-[#25302E]/70 sm:text-sm">
                  <span className="inline-flex items-center gap-2"><BedDouble size={16} strokeWidth={1.5} className="shrink-0 text-[#A18451]" /> Comfortable stay</span>
                  <span className="inline-flex items-center gap-2"><UsersRound size={16} strokeWidth={1.5} className="shrink-0 text-[#A18451]" /> {room.guests}</span>
                </div>
                <Link to="/rooms" className="group/link mt-6 flex min-h-12 items-center justify-between rounded-lg border border-[#B99A65]/45 px-4 py-3 text-[10px] font-medium uppercase tracking-[0.18em] transition-all duration-300 hover:border-[#192824] hover:bg-[#192824] hover:text-white sm:mt-7 sm:px-5 sm:text-xs">
                  <span>View Rooms</span>
                  <ArrowUpRight size={18} className="transition-transform duration-300 group-hover/link:-translate-y-1 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}