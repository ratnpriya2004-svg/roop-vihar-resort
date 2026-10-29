import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";

// Background Image
import bgImg from "../../assets/images/bir.webp"; 

// Aapke saare 10 avatars wapas import kiye gaye hain
import avatar1 from "../../assets/images/mt.webp";
import avatar2 from "../../assets/images/mmmttte.webp";
import avatar3 from "../../assets/images/ffttt.webp";
import avatar4 from "../../assets/images/mate.webp";
import avatar5 from "../../assets/images/ttee.webp";
import avatar6 from "../../assets/images/testin.webp";
import avatar7 from "../../assets/images/mate.webp";
import avatar8 from "../../assets/images/mmmttte.webp";
import avatar9 from "../../assets/images/mt.webp";
import avatar10 from "../../assets/images/fftt.jpg";

gsap.registerPlugin(ScrollTrigger);

type Testimonial = {
  id: number;
  review: string;
  name: string;
  occasion: string;
  rating: number;
  avatar: string;
};

// Aapke 10 Testimonials
const TESTIMONIALS: Testimonial[] = [
  { id: 1, review: "Our wedding at Roop Vihar Resorts was a dream come true. The venue, decor, food and hospitality were absolutely perfect.", name: "Ankita & Rohit", occasion: "WEDDING · GOOGLE REVIEW", rating: 5, avatar: avatar1 },
  { id: 2, review: "The team made our event smooth and stress-free. Everything was beyond our expectations. We couldn't have asked for a better place!", name: "Nunal & Pooja", occasion: "ANNIVERSARY · GOOGLE REVIEW", rating: 5, avatar: avatar2 },
  { id: 3, review: "Beautiful decoration & great food. The ambiance is exactly what you want for a royal Indian celebration. Very nice service.", name: "Naween Kumar", occasion: "BIRTHDAY · GOOGLE REVIEW", rating: 5, avatar: avatar3 },
  { id: 4, review: "It's a nice place... good food, service is superb. We hosted our family function here and everyone was impressed.", name: "Dhiraj Pandey", occasion: "FAMILY FUNCTION · GOOGLE REVIEW", rating: 4, avatar: avatar4 },
  { id: 5, review: "Beautiful place with delicious food. Ambiance is good overall and service staff is attentive. Highly recommended for events.", name: "Bala Jee", occasion: "FRIENDS · GOOGLE REVIEW", rating: 4, avatar: avatar5 },
  { id: 6, review: "Interior is awesome and satisfactory. You will feel good when you visit there. Perfect for any special occasion.", name: "Anjali Textiles", occasion: "VISIT · GOOGLE REVIEW", rating: 4, avatar: avatar6 },
  { id: 7, review: "Thank you for providing us this type of service at home. Very helpful team. Made our celebration truly memorable.", name: "Govind Kumar", occasion: "SERVICE · GOOGLE REVIEW", rating: 5, avatar: avatar7 },
  { id: 8, review: "Best place to visit with your loved ones. The service is fast, the food is also good and the decorations were perfect.", name: "Rahul Singh", occasion: "COUPLE · GOOGLE REVIEW", rating: 5, avatar: avatar8 },
  { id: 9, review: "The location is at a great place. There is a swimming pool to roam around. The food is good and the services are also good.", name: "Rishabh Dev", occasion: "FAMILY · GOOGLE REVIEW", rating: 4, avatar: avatar9 },
  { id: 10, review: "Best in town, especially if you have kids with you. Plenty of space to enjoy, tasty food and fast service.", name: "Priya Mishra", occasion: "FAMILY · GOOGLE REVIEW", rating: 5, avatar: avatar10 },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const total = TESTIMONIALS.length;

  const next = () => setActive((prev) => (prev + 1) % total);
  const prev = () => setActive((prev) => (prev - 1 + total) % total);

  // Entrance Animation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".test-fade-up",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 75%", once: true },
        }
      );
    }, section);
    return () => ctx.revert();
  }, []);

  // Auto-Play Logic (Har 4 second me khud change hoga)
  useEffect(() => {
    if (isHovered) return; 
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered, total]);

  // Calculate 3D positioning for stack effect
  const getCardStyle = (index: number) => {
    let offset = index - active;
    
    // Infinite loop logic (map index to -1, 0, 1 range)
    if (offset < -Math.floor(total / 2)) offset += total;
    if (offset > Math.floor(total / 2)) offset -= total;

    // CENTER CARD (offset 0)
    if (offset === 0) {
      return {
        transform: "translateX(0) translateY(0) scale(1)",
        zIndex: 30,
        opacity: 1,
        pointerEvents: "auto" as const,
      };
    }
    // RIGHT CARD (offset 1)
    if (offset === 1) {
      return {
        transform: "translateX(65%) translateY(20px) scale(0.85)",
        zIndex: 20,
        opacity: 0.6,
        pointerEvents: "none" as const,
      };
    }
    // LEFT CARD (offset -1)
    if (offset === -1) {
      return {
        transform: "translateX(-65%) translateY(20px) scale(0.85)",
        zIndex: 20,
        opacity: 0.6,
        pointerEvents: "none" as const,
      };
    }
    // HIDDEN CARDS (outside the center 3)
    return {
      transform: `translateX(0) translateY(${offset > 0 ? 100 : 100}px) scale(0.6)`,
      zIndex: 10,
      opacity: 0,
      pointerEvents: "none" as const,
    };
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#F6F0E5] py-16 lg:py-24"
    >
      {/* Background Venue Image (Right Side Faded) */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[60%] pointer-events-none opacity-40 lg:opacity-60">
        <img src={bgImg} alt="Venue" className="h-full w-full object-cover object-left" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F6F0E5] via-[#F6F0E5]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F6F0E5] via-transparent to-[#F6F0E5]/40" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* ═══════════════════════════════════════════════════════
              LEFT COLUMN: Heading & Text
          ═══════════════════════════════════════════════════════ */}
          <div className="flex flex-col justify-center lg:col-span-4 lg:pt-10">
            <div className="test-fade-up mb-4 flex items-center gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9B7940] sm:text-xs">
                Guest Experiences
              </span>
              <span className="h-px w-12 bg-[#B99A65]/50" />
            </div>

            <h2 className="test-fade-up font-serif text-[clamp(2.4rem,4.5vw,3.8rem)] leading-[1.05] tracking-tight text-[#142522]">
              Moments That <br />
              <span className="italic text-[#B99A65]">Stay With You</span>
            </h2>

            <p className="test-fade-up mt-5 max-w-md text-[13px] leading-relaxed text-[#62716D] sm:text-[15px]">
              From weddings to family celebrations, hear from our guests who made their special moments unforgettable at Roop Vihar Resorts.
            </p>

            {/* CTA Button */}
            <div className="test-fade-up mt-8">
              <a
                href="#reviews"
                className="group inline-flex items-center gap-3 rounded-full bg-[#142522] py-2 pl-5 pr-2 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#25302E]"
              >
                <span>Explore Reviews</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#B99A65] text-[#142522] transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight size={14} strokeWidth={2.5} />
                </span>
              </a>
            </div>

            {/* Navigation Arrows & Counter */}
            <div className="test-fade-up mt-10 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  aria-label="Previous review"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#142522]/20 bg-transparent text-[#142522] transition-colors hover:bg-[#142522] hover:text-white"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  onClick={next}
                  aria-label="Next review"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#142522]/20 bg-transparent text-[#142522] transition-colors hover:bg-[#142522] hover:text-white"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
              <div className="flex items-center gap-3 text-xs font-medium tracking-widest text-[#142522]">
                <span>{String(active + 1).padStart(2, "0")}</span>
                <span className="h-px w-12 bg-[#142522]/30" />
                <span className="text-[#62716D]">{String(total).padStart(2, "0")}</span>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════
              RIGHT COLUMN: Animated Stacked Cards
          ═══════════════════════════════════════════════════════ */}
          <div 
            className="relative flex h-[500px] items-center justify-center lg:col-span-8 lg:h-[550px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            
            {/* Card Stack Container */}
            <div className="relative w-full max-w-[320px] sm:max-w-[360px] h-[380px]">
              {TESTIMONIALS.map((item, i) => {
                const style = getCardStyle(i);
                const isCenter = i === active;
                
                return (
                  <div
                    key={item.id}
                    onClick={() => setActive(i)}
                    className={`absolute inset-0 cursor-pointer rounded-2xl bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] sm:p-8 ${
                      isCenter ? "border border-[#B99A65]/30" : "border border-transparent"
                    }`}
                    style={style}
                  >
                    {/* Center Avatar */}
                    <div className="absolute -top-8 left-1/2 flex -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-[#F6F0E5] shadow-md">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="h-16 w-16 rounded-full object-cover"
                      />
                    </div>

                    {/* Stars */}
                    <div className="mt-8 flex justify-center gap-1 text-[#B99A65]">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          size={14}
                          fill={starIndex < item.rating ? "currentColor" : "none"}
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="mt-5 text-center font-serif text-[15px] leading-[1.7] text-[#26332B] sm:text-[16px]">
                      “{item.review}”
                    </p>

                    {/* Author Info */}
                    <div className="mt-6 border-t border-[#B99A65]/20 pt-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <img src={item.avatar} alt="" className="h-6 w-6 rounded-full object-cover" />
                        <h4 className="text-[12px] font-bold text-[#142522]">{item.name}</h4>
                      </div>
                      <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.2em] text-[#B99A65]">
                        {item.occasion}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* BOTTOM STATS SECTION */}
        <div className="relative z-20 mt-12 flex w-full flex-col items-center justify-between border-t border-[#142522]/10 pt-8 sm:flex-row">
          <div className="flex w-full justify-around sm:w-auto sm:gap-16">
             <div className="flex flex-col items-center text-center">
                <span className="font-serif text-2xl text-[#142522]">500+</span>
                <span className="mt-1 text-[10px] uppercase tracking-widest text-[#62716D]">Happy Guests</span>
             </div>
             <div className="flex flex-col items-center text-center">
                <span className="font-serif text-2xl text-[#142522]">4.9<span className="text-sm text-[#B99A65]">★</span></span>
                <span className="mt-1 text-[10px] uppercase tracking-widest text-[#62716D]">Avg Rating</span>
             </div>
             <div className="flex flex-col items-center text-center">
                <span className="font-serif text-2xl text-[#142522]">100%</span>
                <span className="mt-1 text-[10px] uppercase tracking-widest text-[#62716D]">Memorable</span>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
}