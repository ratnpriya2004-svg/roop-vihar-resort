import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Sparkles, MapPin } from "lucide-react";

import storyMain from "../../assets/images/resort.webp";
import storyInterior from "../../assets/images/hero.webp";
import storyDetail from "../../assets/images/cor.webp";

gsap.registerPlugin(ScrollTrigger);

export default function OurStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Title line masks
      section.querySelectorAll<HTMLElement>(".story-title-line").forEach((line, i) => {
        gsap.from(line, {
          yPercent: 110, duration: 1.1, ease: "power4.out", delay: i * 0.12,
          scrollTrigger: { trigger: section, start: "top 72%", once: true },
        });
      });

      gsap.from(".story-reveal", {
        y: 40, autoAlpha: 0, duration: 0.9, stagger: 0.1, ease: "power3.out",
        clearProps: "all",
        scrollTrigger: { trigger: section, start: "top 75%", once: true },
      });

      // Image cards — clip reveal + zoom + parallax on hover
      section.querySelectorAll<HTMLElement>(".story-image-card").forEach((card, i) => {
        const img = card.querySelector("img");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: "top 92%", once: true },
        });
        tl.from(card, { y: 60, autoAlpha: 0, duration: 0.9, delay: i * 0.08, ease: "power3.out" });
        if (img) tl.from(img, { scale: 1.25, duration: 1.4, ease: "power3.out" }, "-=0.8");

        card.addEventListener("mousemove", (e) => {
          if (!img) return;
          const r = card.getBoundingClientRect();
          gsap.to(img, {
            x: ((e.clientX - r.left) / r.width - 0.5) * 18,
            y: ((e.clientY - r.top) / r.height - 0.5) * 18,
            duration: 0.6, ease: "power2.out",
          });
        });
        card.addEventListener("mouseleave", () => {
          if (!img) return;
          gsap.to(img, { x: 0, y: 0, duration: 0.8, ease: "power3.out" });
        });
      });

      gsap.from(".story-gold-line", {
        scaleX: 0, transformOrigin: "left center", duration: 1.2, ease: "power3.inOut",
        scrollTrigger: { trigger: section, start: "top 72%", once: true },
      });

      gsap.to(".story-orbit", { rotation: 40, duration: 40, repeat: -1, ease: "none" });
      gsap.to(".story-badge", { y: -12, rotation: 4, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative isolate overflow-hidden py-16 text-[#192824] sm:py-20 lg:py-24"
    >
      <div className="gold-grid-bg pointer-events-none absolute inset-0 opacity-40" />
      <div aria-hidden="true" className="story-orbit pointer-events-none absolute -right-32 top-20 h-[380px] w-[380px] rounded-full border border-[#B99A65]/20 sm:h-[500px] sm:w-[500px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-[#B99A65]/10 blur-[100px]" />

      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-14 xl:px-20">
        {/* HEADER */}
        <div className="mb-12 grid gap-6 md:mb-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <div className="story-reveal mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#B99A65]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#8D744A] sm:text-[11px]">
                Our Story
              </span>
              <Sparkles size={13} className="text-[#B99A65]" />
            </div>

            <h2 className="overflow-hidden font-serif text-[clamp(2.6rem,7vw,7rem)] leading-[0.95] tracking-tight">
              <span className="story-title-line block">A place to</span>
              <span className="story-title-line block italic text-[#B99A65]">slow down.</span>
            </h2>

            <div className="story-gold-line mt-6 h-[2px] w-24 bg-[#B99A65] sm:w-32" />
          </div>
          <p className="story-reveal max-w-md text-sm leading-7 text-[#192824]/70 sm:text-base sm:leading-8 lg:pb-3">
            Where time softens and every detail feels like home.
          </p>
        </div>

        {/* IMAGE GRID */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12 lg:gap-5">
          <div className="story-image-card group relative col-span-2 h-[300px] overflow-hidden sm:h-[400px] lg:col-span-7 lg:row-span-2 lg:h-full lg:min-h-[560px]">
            <img src={storyMain} alt="Roop Vihar Resorts" loading="lazy" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.04]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101E19]/90 via-[#101E19]/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-10">
              <span className="mb-2 block text-[9px] uppercase tracking-[0.32em] text-[#D5B780] sm:text-[10px]">
                The Experience
              </span>
              <h3 className="font-serif text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
                Find your own <span className="italic text-[#D5B780]">stillness.</span>
              </h3>
            </div>
            <div className="story-badge absolute right-4 top-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#D5B780] bg-[#192824] text-white shadow-xl sm:right-6 sm:top-6 sm:h-20 sm:w-20">
              <div className="text-center">
                <span className="block font-serif text-base text-[#D5B780] sm:text-xl">R.V.</span>
                <span className="block text-[7px] uppercase tracking-[0.15em] text-white/70">Stay</span>
              </div>
            </div>
          </div>

          <div className="story-image-card group relative col-span-1 h-[160px] overflow-hidden sm:h-[200px] lg:col-span-5 lg:h-[270px]">
            <img src={storyInterior} alt="Interiors" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#142522]/40 to-transparent" />
          </div>

          <div className="story-image-card group relative col-span-1 h-[160px] overflow-hidden sm:h-[200px] lg:col-span-5 lg:h-[270px]">
            <img src={storyDetail} alt="Room details" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#142522]/40 to-transparent" />
          </div>

          <div className="story-reveal col-span-2 flex flex-col justify-center gap-4 lg:col-span-5 lg:pl-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#B99A65]" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#8D744A]">More Than a Stay</span>
            </div>
            <h3 className="font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
              Made for moments that <span className="italic text-[#B99A65]">matter.</span>
            </h3>
            <a
              href="#rooms"
              className="group mt-2 inline-flex w-fit items-center gap-4 border-b border-[#B99A65] pb-2 text-[11px] font-medium uppercase tracking-[0.22em] transition-colors hover:text-[#8D744A] sm:text-xs"
            >
              Discover Stays
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#B99A65]/60 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:bg-[#192824] group-hover:text-white">
                <ArrowUpRight size={15} />
              </span>
            </a>
          </div>
        </div>

        <div className="story-reveal mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-[#B99A65]/20 pt-6 text-[9px] uppercase tracking-[0.22em] text-[#8D744A]/80 sm:text-[10px]">
          <span className="flex items-center gap-2"><MapPin size={12} /> Roop Vihar Resorts</span>
          <span>Comfort · Connection · Experiences</span>
        </div>
      </div>
    </section>
  );
}