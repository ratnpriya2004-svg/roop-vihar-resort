import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  MapPin,
  Waves,
  Car,
  Accessibility,
  Shield,
  Plane,
  UtensilsCrossed,
  Cake,
  Building2,
  Users,
  CalendarCheck,
  Sparkles,
} from "lucide-react";

import PageShell from "./_PageShell";
import resortImg from "../assets/images/resort.webp";
import heroImg from "../assets/images/hero.webp";
import roomImg from "../assets/images/luxery room.webp";
import weddingImg from "../assets/images/marred.webp";
import directorImg from "../assets/images/director.webp";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 20, suffix: "+", label: "Luxury Rooms" },
  { value: 24, suffix: "/7", label: "Guest Service" },
  { value: 100, suffix: "%", label: "Satisfaction" },
];

const venues = [
  { icon: Building2, title: "Emerald Convention Centre", tag: "4,000 sq ft · 200+ guests", desc: "A pillar-less banquet hall for grand weddings, receptions and large events." },
  { icon: Users, title: "Sapphire Conference Room", tag: "Corporate meetings", desc: "Business-ready with modern AV, seating and catering support." },
  { icon: Sparkles, title: "Pearl Party Hall", tag: "Intimate gatherings", desc: "A refined hall for smaller celebrations and close-knit events." },
  { icon: UtensilsCrossed, title: "Maharaja Restaurant", tag: "Multi-cuisine dining", desc: "From comforting Indian classics to continental favourites." },
  { icon: Cake, title: "Mr. Cake Bakery", tag: "In-house confectionery", desc: "Fresh bakes and custom cakes for every occasion." },
  { icon: CalendarCheck, title: "Wedding Lawn", tag: "Open-air ceremonies", desc: "Ceremonies under the open sky, in the heart of the resort." },
];

const facilities = [
  { icon: Waves, label: "Swimming pool" },
  { icon: Car, label: "Car & bike parking" },
  { icon: Accessibility, label: "Wheelchair access" },
  { icon: Shield, label: "24-hour security" },
  { icon: Plane, label: "Travel desk" },
];

const attractions = [
  { name: "Kupaghat Ashram", distance: "2 km", drive: "10 mins" },
  { name: "Vikramshila Gangetic Dolphin Sanctuary", distance: "1.4 km", drive: "5 mins" },
  { name: "Colgong Rock Cut Temples", distance: "12.4 km", drive: "35 mins" },
  { name: "Ajgaivinath Temple", distance: "30.6 km", drive: "66 mins" },
  { name: "Vikramshila University Ruins", distance: "40 km", drive: "60 mins" },
  { name: "Mandar Hill", distance: "54 km", drive: "107 mins" },
];

const cancellations = [
  "Refund on or before 7 days of arrival — 75%.",
  "Refund on or before 3 days of arrival — 50%.",
  "No refund within 3 days of arrival.",
];

const terms = [
  "Valid photo ID required for guests above 18 (Aadhaar, DL, Voter, Passport). PAN Cards not accepted.",
  "Unmarried couples are not allowed.",
  "Alcohol is strictly prohibited (Bihar is a dry state).",
  "Check-in 12:00 Noon · Check-out 11:00 AM.",
  "Pets are not allowed.",
  "Refunds take at least 14 working days.",
  "Gambling and illegal activities are strictly prohibited.",
];

export default function About() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // ===== FLOATING BACKGROUND ORBS =====
      gsap.to(".bg-orb-1", { x: 60, y: -40, duration: 12, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".bg-orb-2", { x: -80, y: 60, duration: 16, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".bg-orb-3", { x: 40, y: 80, duration: 20, repeat: -1, yoyo: true, ease: "sine.inOut" });

      // ===== SLOW GRID ROTATE =====
      gsap.to(".bg-grid-rotate", {
        rotation: 8,
        duration: 30,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "center",
      });

      // ===== TITLE MASK REVEAL =====
      root.querySelectorAll<HTMLElement>(".about-title-line").forEach((line, i) => {
        gsap.from(line, {
          yPercent: 110,
          duration: 1.1,
          ease: "power4.out",
          delay: i * 0.1,
          scrollTrigger: { trigger: line, start: "top 90%", once: true },
        });
      });

      // ===== FADE UP =====
      gsap.utils.toArray<HTMLElement>(".about-reveal").forEach((el) => {
        gsap.from(el, {
          y: 45,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });

      // ===== IMAGE CLIP REVEAL =====
      root.querySelectorAll<HTMLElement>(".about-img").forEach((card) => {
        const img = card.querySelector("img");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: "top 90%", once: true },
        });
        tl.from(card, { clipPath: "inset(0 0 100% 0)", duration: 1.2, ease: "power4.inOut" });
        if (img) {
          tl.from(img, { scale: 1.2, duration: 1.4, ease: "power3.out" }, "-=1.0");
        }
      });

      // ===== STAT COUNTERS =====
      root.querySelectorAll<HTMLElement>(".about-stat-value").forEach((el) => {
        const target = parseFloat(el.dataset.value || "0");
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toString();
          },
        });
      });

      // ===== PARALLAX =====
      if (window.matchMedia("(min-width: 1024px)").matches) {
        root.querySelectorAll<HTMLElement>(".about-parallax").forEach((img) => {
          gsap.to(img, {
            yPercent: -6,
            ease: "none",
            scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: 1.2 },
          });
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <PageShell eyebrow="Our Story" title="A Legacy of Warm Hospitality">
      <div ref={rootRef} className="relative">

        {/* ==========================================================
            ANIMATED BACKGROUND LAYER (behind everything)
        ========================================================== */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {/* Soft glowing orbs */}
          <div className="bg-orb-1 absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#B99A65]/10 blur-[100px]" />
          <div className="bg-orb-2 absolute -right-40 top-[30%] h-96 w-96 rounded-full bg-[#D5B780]/10 blur-[120px]" />
          <div className="bg-orb-3 absolute -left-20 bottom-[20%] h-80 w-80 rounded-full bg-[#B99A65]/8 blur-[100px]" />

          {/* Slow rotating grid (subtle) */}
          <div className="bg-grid-rotate absolute inset-0 opacity-30">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="about-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                  <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(185,154,101,0.12)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#about-grid)" />
            </svg>
          </div>

          {/* Thin rotating ring */}
          <div
            className="about-orbit absolute -right-40 top-20 h-[400px] w-[400px] rounded-full border border-[#B99A65]/15 sm:h-[560px] sm:w-[560px]"
            style={{ animation: "spin 60s linear infinite" }}
          />
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>

        {/* ==========================================================
            1. WELCOME — text + image (NO white gap)
        ========================================================== */}
        <section className="relative mb-20 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div>
            <p className="about-reveal mb-4 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.35em] text-[#8D744A]">
              <span className="h-px w-10 bg-[#B99A65]" />
              Welcome
            </p>

            <h2 className="overflow-hidden font-serif text-[clamp(2.6rem,5.8vw,4.75rem)] leading-[1.02] text-[#142522]">
              <span className="about-title-line block">Experience luxury,</span>
              <span className="about-title-line block italic text-[#B99A65]">
                comfort & serenity.
              </span>
            </h2>

            <div className="about-reveal mt-8 space-y-4 text-sm leading-7 text-[#25302E]/75 sm:text-base sm:leading-8">
              <p>
                Located just <strong className="text-[#142522]">3 km from the main market</strong> and{" "}
                <strong className="text-[#142522]">5 km from the Railway Junction</strong>, Roop
                Vihar Resorts offers a tranquil escape for corporate stays,
                business events, family functions, weddings, or a family getaway.
              </p>
              <p>
                We blend world-class hospitality with the urban essence of
                Bhagalpur — eco-friendly practices, luxurious accommodations,
                and dedicated service, all in one place.
              </p>
            </div>

            <div className="about-reveal mt-8 flex flex-wrap gap-3">
              <Link
                to="/rooms"
                className="group inline-flex items-center gap-2 rounded-full bg-[#142522] px-6 py-3 text-[10px] uppercase tracking-[0.22em] text-white transition hover:bg-[#28483D]"
              >
                Explore Rooms
                <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <a
                href="https://wa.me/919801897235"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#B99A65] px-6 py-3 text-[10px] uppercase tracking-[0.22em] text-[#142522] transition hover:bg-[#B99A65]/10"
              >
                WhatsApp Enquiry
              </a>
            </div>
          </div>

          {/* FIXED IMAGE — no white gap, natural aspect ratio */}
          <div className="about-img relative overflow-hidden rounded-3xl shadow-[0_25px_60px_-20px_rgba(20,37,34,0.25)]">
            <img
              src={resortImg}
              alt="Roop Vihar Resorts"
              loading="lazy"
              className="about-parallax h-full w-full object-cover"
            />
            {/* Small corner chip — no dark bar */}
            <div className="absolute bottom-4 right-4 rounded-full bg-[#FBF8F2]/95 px-4 py-2 shadow-lg backdrop-blur-sm">
              <p className="text-[9px] uppercase tracking-[0.22em] text-[#8D744A]">
                Barari · Bhagalpur
              </p>
            </div>
          </div>
        </section>

        {/* ==========================================================
            2. STATS — dark break
        ========================================================== */}
        <section className="about-reveal mb-20 overflow-hidden rounded-3xl bg-[#142522] text-[#F6F0E5] shadow-[0_25px_60px_-25px_rgba(20,37,34,0.4)]">
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col items-center justify-center py-10 text-center ${
                  i < stats.length - 1 ? "border-b border-white/10 sm:border-b-0 sm:border-r" : ""
                }`}
              >
                <p className="font-serif text-[clamp(2.8rem,6vw,4.75rem)] leading-none text-[#D5B780]">
                  <span className="about-stat-value" data-value={s.value}>0</span>
                  {s.suffix}
                </p>
                <p className="mt-3 text-[10px] uppercase tracking-[0.28em] text-white/60">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================================
            3. IMAGES — clean editorial grid
        ========================================================== */}
        <section className="mb-20 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          <div className="about-img col-span-2 aspect-[16/10] overflow-hidden rounded-2xl shadow-lg">
            <img src={heroImg} alt="Interiors" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="about-img col-span-2 aspect-[4/3] overflow-hidden rounded-2xl shadow-lg sm:col-span-1">
            <img src={roomImg} alt="Room" loading="lazy" className="h-full w-full object-cover" />
          </div>
        </section>

        {/* ==========================================================
            4. VENUES
        ========================================================== */}
        <section className="mb-20">
          <div className="about-reveal mb-10 max-w-3xl">
            <p className="mb-3 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.35em] text-[#8D744A]">
              <span className="h-px w-10 bg-[#B99A65]" />
              Experiences
            </p>
            <h2 className="font-serif text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.02] text-[#142522]">
              Dining, celebrations & <span className="italic text-[#B99A65]">crafted moments.</span>
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {venues.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="about-reveal group flex flex-col justify-between rounded-2xl border border-[#B99A65]/25 bg-white p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#B99A65]/70 hover:shadow-[0_20px_50px_rgba(37,48,46,0.10)] sm:p-7"
                >
                  <div>
                    <div className="mb-5 flex items-start justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F6F0E5] text-[#8D744A] transition-colors duration-300 group-hover:bg-[#B99A65] group-hover:text-white">
                        <Icon size={19} strokeWidth={1.6} />
                      </span>
                      <span className="text-right text-[9px] uppercase tracking-[0.18em] text-[#8D744A]">{v.tag}</span>
                    </div>
                    <h3 className="font-serif text-2xl leading-tight text-[#142522]">{v.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#25302E]/70">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="about-img mt-6 aspect-[16/7] overflow-hidden rounded-2xl shadow-lg">
            <img src={weddingImg} alt="Celebrations" loading="lazy" className="h-full w-full object-cover" />
          </div>
        </section>

        {/* ==========================================================
            5. FACILITIES — dark break
        ========================================================== */}
        <section className="about-reveal mb-20 rounded-3xl bg-[#142522] p-6 text-[#F6F0E5] sm:p-10">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-[#D5B780]">Facilities</p>
              <h2 className="font-serif text-2xl sm:text-3xl">Everything you need.</h2>
            </div>
            <p className="max-w-md text-sm text-white/60">Thoughtful amenities for a comfortable, effortless stay.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {facilities.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.label}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-white/85 transition hover:border-[#D5B780]/40 hover:bg-white/[0.06]"
                >
                  <Icon size={17} className="shrink-0 text-[#D5B780]" />
                  <span>{f.label}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* ==========================================================
            6. EXPLORE BHAGALPUR
        ========================================================== */}
        <section className="mb-20">
          <div className="about-reveal mb-10 max-w-3xl">
            <p className="mb-3 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.35em] text-[#8D744A]">
              <span className="h-px w-10 bg-[#B99A65]" />
              Explore Bhagalpur
            </p>
            <h2 className="font-serif text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.02] text-[#142522]">
              Tourist attractions <span className="italic text-[#B99A65]">nearby.</span>
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {attractions.map((a) => (
              <div
                key={a.name}
                className="about-reveal group rounded-2xl border border-[#B99A65]/25 bg-white p-5 transition hover:-translate-y-1 hover:border-[#B99A65]/60 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif text-lg leading-snug text-[#142522]">{a.name}</h3>
                  <MapPin size={16} className="mt-1 shrink-0 text-[#B99A65] transition-transform group-hover:scale-110" />
                </div>
                <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-[#8D744A]">
                  {a.distance} · {a.drive} drive
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================================
            7. POLICY CARDS
        ========================================================== */}
        <section className="mb-20 grid gap-6 lg:grid-cols-2">
          <div className="about-reveal rounded-2xl border border-[#B99A65]/25 bg-white p-6 sm:p-8">
            <h2 className="font-serif text-2xl text-[#142522]">Cancellation Policy</h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-[#25302E]/75">
              {cancellations.map((c) => (
                <li key={c} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B99A65]" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="about-reveal rounded-2xl border border-[#B99A65]/25 bg-white p-6 sm:p-8">
            <h2 className="font-serif text-2xl text-[#142522]">Terms & Conditions</h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-[#25302E]/75">
              {terms.map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B99A65]" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ==========================================================
            8. TEAM
        ========================================================== */}
        <section className="mb-8">
          <div className="about-reveal mb-10 max-w-3xl">
            <p className="mb-3 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.35em] text-[#8D744A]">
              <span className="h-px w-10 bg-[#B99A65]" />
              Our Team
            </p>
            <h2 className="font-serif text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.02] text-[#142522]">
              Meet our <span className="italic text-[#B99A65]">management.</span>
            </h2>
          </div>

          <div className="about-reveal grid gap-8 rounded-3xl border border-[#B99A65]/25 bg-[#FBF8F2] p-6 sm:grid-cols-[auto_1fr] sm:items-center sm:p-10">
            <div className="about-img relative mx-auto aspect-[4/5] w-full max-w-[260px] overflow-hidden rounded-2xl shadow-lg sm:mx-0">
              <img src={directorImg} alt="Dr. Sanjay Kumar Singh" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-[10px] uppercase tracking-[0.32em] text-[#8D744A]">Managing Director</p>
              <h3 className="mt-2 font-serif text-3xl text-[#142522] sm:text-4xl">Dr. Sanjay Kumar Singh</h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[#25302E]/70 sm:text-base sm:leading-8">
                Under Dr. Singh's leadership, Roop Vihar has grown into one of Bhagalpur's most
                trusted destinations for stays, celebrations, and dining — built on warmth,
                care, and attention to every detail.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <p className="about-reveal mt-16 border-t border-[#B99A65]/20 pt-6 text-center text-[10px] uppercase tracking-[0.22em] text-[#8D744A]/70">
          Roop Vihar Resorts · Barari, Bhagalpur
        </p>
      </div>
    </PageShell>
  );
}