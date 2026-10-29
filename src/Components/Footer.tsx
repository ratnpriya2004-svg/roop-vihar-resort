import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUp,
  Home,
  Info,
  BedDouble,
  Heart,
  Utensils,
  Camera,
  PhoneCall,
  Sparkles,
  CalendarHeart,
  PartyPopper,
  Wine,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Original links (No changes)
const quickLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "/about", icon: Info },
  { label: "Rooms", href: "/rooms", icon: BedDouble },
  { label: "Weddings", href: "/weddings", icon: Heart },
  { label: "Dining", href: "/dining", icon: Utensils },
  { label: "Gallery", href: "/gallery", icon: Camera },
  { label: "Contact", href: "/contact", icon: PhoneCall },
];

const experiences = [
  { label: "Luxury Stays", href: "/rooms", icon: Sparkles },
  { label: "Wedding Celebrations", href: "/weddings", icon: CalendarHeart },
  { label: "Banquet & Events", href: "/events", icon: PartyPopper },
  { label: "Fine Dining", href: "/dining", icon: Wine },
];

const legal = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cancellation Policy", href: "/cancellation" },
  { label: "FAQ", href: "/faq" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        footer.querySelectorAll(".footer-reveal"),
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: footer, start: "top 90%", once: true },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-white font-sans"
    >
      {/* Background Decorative Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#142522 1px, transparent 1px), linear-gradient(90deg, #142522 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Decorative Gold Circles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-[#B99A65]/30"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-[#B99A65]/20"
      />

      {/* ========================================================
          TRANSPARENT FULL WIDTH TEXT (Just Text, No BG)
      ======================================================== */}
      <div className="relative z-10 w-full py-16 text-center lg:py-20">
        <div className="mx-auto px-4">
          <h2 className="footer-reveal font-serif text-[clamp(3.5rem,12vw,10rem)] leading-none tracking-[0.05em] text-[#142522]">
            ROOP VIHAR
          </h2>
          <div className="footer-reveal mt-4 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-[#B99A65] sm:w-20" />
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#B99A65] sm:text-xs">
              Resorts
            </p>
            <span className="h-px w-12 bg-[#B99A65] sm:w-20" />
          </div>
        </div>
      </div>

      {/* ========================================================
          MAIN CONTENT
      ======================================================== */}
      <div className="relative z-10 grid grid-cols-1 gap-12 px-6 py-12 sm:px-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:px-16 lg:py-16">
        
        {/* BRAND INFO */}
        <div className="footer-reveal lg:col-span-4">
          <h3 className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[#77766F]">
            About Roop Vihar
          </h3>
          <p className="max-w-xs text-sm leading-7 text-[#77766F]">
            Discover refined comfort, warm hospitality and memorable
            celebrations at Roop Vihar Resorts, Bhagalpur.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-reveal lg:col-span-2 lg:pl-4">
          <h3 className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[#77766F]">
            Explore
          </h3>
          <ul className="space-y-4">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="group flex items-center gap-2.5 text-sm font-medium text-[#142522] transition-colors hover:text-[#B99A65]"
                >
                  <link.icon
                    size={15}
                    className="text-[#B99A65]/70 transition-colors group-hover:text-[#B99A65]"
                    strokeWidth={2}
                  />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* EXPERIENCES */}
        <div className="footer-reveal lg:col-span-3 lg:pl-4">
          <h3 className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[#77766F]">
            Experiences
          </h3>
          <ul className="space-y-4">
            {experiences.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className="group flex items-center gap-2.5 text-sm font-medium text-[#142522] transition-colors hover:text-[#B99A65]"
                >
                  <item.icon
                    size={15}
                    className="text-[#B99A65]/70 transition-colors group-hover:text-[#B99A65]"
                    strokeWidth={2}
                  />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-start gap-3 rounded-lg border border-[#B99A65]/20 bg-[#FBF8F2]/50 p-4">
            <Clock size={16} className="mt-0.5 shrink-0 text-[#B99A65]" strokeWidth={2} />
            <div>
              <p className="text-sm font-bold text-[#142522]">
                Check-in & Check-out
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#77766F]">
                Check-in: 12:00 PM
                <br />
                Check-out: 11:00 AM
              </p>
            </div>
          </div>
        </div>

        {/* CONTACT */}
        <div className="footer-reveal lg:col-span-3 lg:pl-4">
          <h3 className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[#77766F]">
            Get In Touch
          </h3>
          <div className="space-y-5">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Roop+Vihar+Resorts+Barari+Bhagalpur+Bihar"
              target="_blank"
              rel="noreferrer"
              className="group flex items-start gap-3"
            >
              <MapPin size={16} className="mt-0.5 shrink-0 text-[#B99A65]" strokeWidth={2} />
              <span className="text-sm leading-6 text-[#77766F] transition-colors group-hover:text-[#142522]">
                R. H. Lane, Barari,
                <br />
                Bhagalpur, Bihar - 812003
              </span>
            </a>
            <a
              href="tel:+917631005599"
              className="flex items-center gap-3 text-sm text-[#77766F] hover:text-[#142522]"
            >
              <Phone size={16} className="shrink-0 text-[#B99A65]" strokeWidth={2} />
              <span>+91 76310 05599</span>
            </a>
            <a
              href="tel:+919801897235"
              className="flex items-center gap-3 text-sm text-[#77766F] hover:text-[#142522]"
            >
              <Phone size={16} className="shrink-0 text-[#B99A65]" strokeWidth={2} />
              <span>+91 98018 97235</span>
            </a>
            <a
              href="mailto:info@roopviharresorts.com"
              className="flex items-start gap-3 break-all text-sm text-[#77766F] hover:text-[#142522]"
            >
              <Mail size={16} className="mt-0.5 shrink-0 text-[#B99A65]" strokeWidth={2} />
              <span>info@roopviharresorts.com</span>
            </a>
          </div>
          <a
            href="https://wa.me/919801897235"
            target="_blank"
            rel="noreferrer"
            className="group mt-7 inline-flex items-center gap-2 rounded-full bg-[#B99A65] px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-[#142522] transition-colors hover:bg-[#142522] hover:text-white"
          >
            WhatsApp Enquiry <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      {/* ========================================================
          LEGAL + BOTTOM BAR
      ======================================================== */}
      <div className="relative z-10 border-t border-[#142522]/10">
        <div className="flex flex-col gap-4 px-6 py-6 sm:px-10 md:flex-row md:items-center md:justify-between lg:px-16">
          
          <p className="text-[11px] text-[#77766F]">
            © {new Date().getFullYear()} Roop Vihar Resorts. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legal.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#77766F] hover:text-[#142522]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="group flex w-fit items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#77766F] hover:text-[#142522]"
          >
            Back to top
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#142522]/20 transition-all group-hover:border-[#142522] group-hover:bg-[#142522] group-hover:text-white">
              <ArrowUp size={13} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}