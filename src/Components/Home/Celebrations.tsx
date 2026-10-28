import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Sparkles, Heart, Users, CalendarDays } from "lucide-react";

import weddingImage from "../../assets/images/marred.webp";
import celebrationImage from "../../assets/images/resort.webp";
import corporateImage from "../../assets/images/cor.webp";

gsap.registerPlugin(ScrollTrigger);

const celebrations = [
  { number: "01", category: "WEDDINGS", title: "A Celebration of Love", image: weddingImage, icon: Heart, label: "Wedding Celebrations", layout: "lg:col-span-7" },
  { number: "02", category: "SPECIAL MOMENTS", title: "Make It Memorable", image: celebrationImage, icon: Sparkles, label: "Private Celebrations", layout: "lg:col-span-5" },
  { number: "03", category: "CORPORATE", title: "Gather With Purpose", image: corporateImage, icon: Users, label: "Corporate Gatherings", layout: "lg:col-span-12" },
];

export default function Celebrations() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(section, { yPercent: 6, scale: 0.98 }, {
        yPercent: 0, scale: 1, ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "top 25%", scrub: 1 },
      });
      gsap.from(".celebration-heading", {
        y: 35, opacity: 0, duration: 0.9, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".celebration-heading-wrap", start: "top 85%", once: true },
      });
      gsap.from(".celebration-card", {
        y: 55, opacity: 0, duration: 0.9, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".celebration-grid", start: "top 82%", once: true },
      });
      gsap.from(".celebration-bottom", {
        y: 25, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".celebration-bottom", start: "top 90%", once: true },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="celebrations" className="relative isolate overflow-hidden py-16 sm:py-20 lg:py-28">
      <div className="gold-grid-bg pointer-events-none absolute inset-0 opacity-50" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-32 h-72 w-72 rounded-full border border-[#B99A5B]/25 sm:h-96 sm:w-96" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 bottom-24 h-72 w-72 rounded-full border border-[#B99A5B]/20" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="celebration-heading-wrap mb-10 flex flex-col gap-5 sm:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="celebration-heading mb-4 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#9A783C] sm:text-xs">
              <span className="h-px w-8 bg-[#B99A5B]" /> Moments Made Special
            </div>
            <h2 className="celebration-heading max-w-3xl font-serif text-[clamp(2.4rem,6vw,5.5rem)] leading-[1.02] text-[#34291E]">
              Your Moments.
              <span className="block italic text-[#A7803F]">Our Spaces.</span>
            </h2>
          </div>
          <p className="celebration-heading max-w-sm text-sm leading-6 text-[#62574A] sm:text-base">
            Weddings, celebrations and gatherings in one beautiful setting.
          </p>
        </div>

        <div className="celebration-grid grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-12">
          {celebrations.map((item, index) => {
            const Icon = item.icon;
            const isWide = index === 2;
            return (
              <article
                key={item.number}
                className={`celebration-card group relative isolate min-w-0 overflow-hidden rounded-2xl bg-[#D8C5A0] shadow-[0_12px_35px_rgba(83,61,29,0.10)] ${item.layout} ${
                  isWide ? "min-h-[350px] sm:min-h-[400px] lg:min-h-[390px]" : "min-h-[350px] sm:min-h-[420px] lg:min-h-[480px]"
                }`}
              >
                <img src={item.image} alt={item.label} loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#21180F]/85 via-[#21180F]/20 to-black/5" />
                <div className="absolute left-4 right-4 top-4 flex items-center justify-between sm:left-6 sm:right-6 sm:top-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-black/15 text-xs text-white backdrop-blur-md sm:h-12 sm:w-12">{item.number}</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/15 text-white backdrop-blur-md transition-all duration-500 group-hover:rotate-12 group-hover:bg-[#D7B879] group-hover:text-[#34291E] sm:h-12 sm:w-12">
                    <Icon size={19} strokeWidth={1.5} />
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 lg:p-9">
                  <span className="inline-block rounded-full border border-[#E8D19B]/60 bg-black/20 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#F2DDAA] backdrop-blur-sm sm:text-[10px]">{item.category}</span>
                  <div className="mt-3 flex items-end justify-between gap-3">
                    <h3 className="max-w-[80%] font-serif text-2xl leading-tight text-white sm:text-3xl lg:text-4xl">{item.title}</h3>
                    <a href="#contact" aria-label={`Enquire about ${item.label}`} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D7B879] text-[#34291E] transition-all duration-300 hover:scale-110 hover:bg-white sm:h-12 sm:w-12">
                      <ArrowUpRight size={20} />
                    </a>
                  </div>
                  <div className="mt-4 h-px w-12 bg-[#D7B879] transition-all duration-500 group-hover:w-24" />
                </div>
              </article>
            );
          })}
        </div>

        <div className="celebration-bottom mt-8 flex flex-col gap-5 rounded-2xl border border-[#B99A5B]/30 bg-[#FFF9ED] px-5 py-7 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-9">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#B99A5B]/40 bg-[#F5EAD2] text-[#9A783C]"><CalendarDays size={19} /></span>
            <div>
              <h3 className="font-serif text-xl text-[#34291E] sm:text-2xl">Planning something special?</h3>
              <p className="mt-1 text-xs leading-5 text-[#62574A] sm:text-sm">Let’s make it unforgettable.</p>
            </div>
          </div>
          <a href="#contact" className="group inline-flex w-fit items-center justify-center gap-3 rounded-full bg-[#D7B879] px-5 py-3.5 text-xs font-semibold text-[#34291E] transition-all hover:bg-[#C5A35E] sm:px-6 sm:text-sm">
            Plan Your Event
            <ArrowUpRight size={17} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>
      </div>
    </section>
  );
}