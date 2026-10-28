import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, MoveUpRight, UtensilsCrossed } from "lucide-react";

// Local Images
import diningMain from "../../assets/images/resort.webp";
import diningShared from "../../assets/images/hero.webp";

gsap.registerPlugin(ScrollTrigger);

const diningImages = [
  { 
    title: "Flavours to remember.", 
    category: "The Restaurant", 
    image: diningMain, 
    alt: "Elegant restaurant dining with beautifully presented cuisine", 
    className: "md:col-span-7" 
  },
  { 
    title: "Made for sharing.", 
    category: "Beautiful Moments", 
    image: diningShared, 
    alt: "Freshly prepared food served for a shared dining experience", 
    className: "md:col-span-5 md:mt-12" 
  },
];

export default function Dining() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const heading = section.querySelector(".dining-heading");
      const intro = section.querySelector(".dining-intro");
      const cards = section.querySelectorAll(".dining-card");
      const images = section.querySelectorAll(".dining-image");
      const labels = section.querySelectorAll(".dining-label");
      const dividers = section.querySelectorAll(".dining-divider");
      const decoration = section.querySelector(".dining-decoration");
      const grid = section.querySelector(".dining-grid");

      if (heading) {
        gsap.fromTo(heading, { y: 24, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: { trigger: section, start: "top 85%", once: true },
        });
      }

      if (intro) {
        gsap.fromTo(intro, { y: 14, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: 0.65, delay: 0.08, ease: "power2.out",
          clearProps: "transform",
          scrollTrigger: { trigger: section, start: "top 85%", once: true },
        });
      }

      if (grid) {
        gsap.fromTo(cards, { y: 24, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: 0.75, stagger: 0.12, ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: { trigger: grid, start: "top 90%", once: true },
        });

        gsap.fromTo(labels, { y: 10, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.06, ease: "power2.out",
          clearProps: "transform",
          scrollTrigger: { trigger: grid, start: "top 88%", once: true },
        });

        gsap.fromTo(dividers, { scaleX: 0, transformOrigin: "left center" }, {
          scaleX: 1, duration: 0.75, stagger: 0.1, ease: "power2.out",
          clearProps: "transform",
          scrollTrigger: { trigger: grid, start: "top 88%", once: true },
        });
      }

      images.forEach((image) => {
        gsap.fromTo(image, { scale: 1.07 }, {
          scale: 1, duration: 1.2, ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: { trigger: image, start: "top 95%", once: true },
        });
      });

      if (decoration && window.matchMedia("(min-width: 1024px)").matches) {
        gsap.to(decoration, { rotation: 360, duration: 65, repeat: -1, ease: "none", transformOrigin: "center center" });
      }

      if (window.matchMedia("(min-width: 1024px)").matches) {
        images.forEach((image) => {
          gsap.to(image, {
            yPercent: -2, ease: "none",
            scrollTrigger: { trigger: image, start: "top bottom", end: "bottom top", scrub: 0.7 },
          });
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="dining" aria-labelledby="dining-heading" className="relative z-[50] overflow-hidden bg-[#F6F0E5] py-16 text-[#25302E] sm:py-20 lg:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[#B99A65]/20" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full border border-[#B99A65]/15" />
      <div aria-hidden="true" className="dining-decoration pointer-events-none absolute right-[8%] top-[12%] hidden h-16 w-16 rounded-full border border-[#B99A65]/30 lg:block">
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B99A65]" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-14">
        <div className="mb-7 flex flex-col gap-4 md:mb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <UtensilsCrossed size={14} className="shrink-0 text-[#B99A65]" aria-hidden="true" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B7146] sm:text-xs">A taste of something special</span>
            </div>
            <h2 id="dining-heading" className="dining-heading max-w-4xl font-serif text-[clamp(2.6rem,6vw,5.7rem)] leading-[0.94] tracking-[-0.045em]">
              Good food.
              <span className="mt-1 block pl-6 italic text-[#A78650] sm:pl-14">Wonderful company.</span>
            </h2>
          </div>
          <p className="dining-intro max-w-xs text-sm leading-6 text-[#62716D] md:pb-1">Savour the flavours. Stay for the moments.</p>
        </div>

        <div className="dining-grid grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
          {diningImages.map((item, index) => (
            <article key={item.category} className={`dining-card group min-w-0 ${item.className}`}>
              {/* YAHAN LINK KO HATA KAR #contact KAR DIYA HAI */}
              <a href="#contact" aria-label={`Enquire about dining at Roop Vihar Resorts: ${item.category}`} className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B99A65]">
                <div className={`relative overflow-hidden bg-[#DCD4C6] ${index === 0 ? "h-[260px] sm:h-[340px] md:h-[min(42vh,400px)]" : "h-[240px] sm:h-[300px] md:h-[min(36vh,340px)]"}`}>
                  <img src={item.image} alt={item.alt} width={1600} height={1200} loading={index === 0 ? "eager" : "lazy"} decoding="async" className="dining-image h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#142522]/85 via-[#142522]/10 to-transparent transition-opacity duration-500 group-hover:from-[#142522]/75" />
                  <div className="absolute left-4 top-4 flex items-center gap-3 sm:left-6 sm:top-6">
                    <span className="h-px w-6 bg-[#D5B982]" />
                    <span className="dining-label text-[9px] uppercase tracking-[0.2em] text-white sm:text-[10px]">{item.category}</span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 lg:p-7">
                    <div className="dining-label flex items-end justify-between gap-3">
                      <h3 className="max-w-md font-serif text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
                        {item.title}
                        <span className="mt-1 block text-xl italic text-white/80 sm:text-2xl lg:text-3xl">{index === 0 ? "Every bite, an experience." : "Every gathering, a memory."}</span>
                      </h3>
                      <span className="mb-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/60 text-white transition-colors duration-300 group-hover:border-[#B99A65] group-hover:bg-[#B99A65] group-hover:text-[#142522] sm:h-10 sm:w-10">
                        <MoveUpRight size={17} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </div>
              </a>
              <div className="dining-divider mt-3 h-px origin-left bg-[#B99A65]/60 sm:mt-4" />
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 sm:mt-10">
          <p className="text-[9px] uppercase tracking-[0.16em] text-[#62716D] sm:text-[10px]">An experience beyond the plate</p>
          
          {/* YAHAN BHI LINK KO HATA KAR #contact KAR DIYA HAI */}
          <a href="#contact" className="group inline-flex w-fit items-center gap-2 border-b border-[#B99A65] py-1 text-[10px] uppercase tracking-[0.16em] transition-colors duration-300 hover:text-[#967744] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B99A65]">
            Enquire Now
            <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}