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
  Heart,
  ArrowUp,
} from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Rooms", href: "/rooms" },
  { label: "Weddings", href: "/weddings" },
  { label: "Dining", href: "/dining" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const experiences = [
  { label: "Luxury Stays", href: "/rooms" },
  { label: "Wedding Celebrations", href: "/weddings" },
  { label: "Banquet & Events", href: "/events" },
  { label: "Fine Dining", href: "/dining" },
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
          scrollTrigger: { trigger: footer, start: "top 88%", once: true },
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
      className="relative overflow-hidden bg-[#142522] text-[#F6F0E5]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-[#D7B879]/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-[#D7B879]/10"
      />

      {/* TOP CTA */}
      <div className="relative border-b border-[#B99A5A]/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <div className="footer-reveal max-w-2xl">
            <span className="mb-3 block text-xs uppercase tracking-[0.3em] text-[#D7B879]">
              Your next beautiful escape
            </span>
            <h2 className="font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
              Every stay deserves
              <br className="hidden sm:block" /> a beautiful story.
            </h2>
          </div>
          <Link
            to="/bookings"
            className="footer-reveal group inline-flex w-fit items-center gap-3 rounded-full border border-[#D7B879] px-6 py-4 text-sm font-medium text-[#F6F0E5] transition-all hover:bg-[#D7B879] hover:text-[#142522]"
          >
            Plan Your Stay
            <ArrowUpRight
              size={18}
              className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>

      {/* MAIN */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:px-12 lg:py-20">
        {/* BRAND */}
        <div className="footer-reveal">
          <Link to="/" className="inline-block">
            <span className="block font-serif text-3xl tracking-wide">
              ROOP VIHAR
            </span>
            <span className="mt-1 block text-[10px] uppercase tracking-[0.42em] text-[#D7B879]">
              Resorts
            </span>
          </Link>
          <div className="my-6 h-px w-16 bg-[#D7B879]" />
          <p className="max-w-xs text-sm leading-7 text-[#F6F0E5]/70">
            Discover refined comfort, warm hospitality and memorable
            celebrations at Roop Vihar Resorts, Bhagalpur.
          </p>
          <div className="mt-7 flex items-center gap-3">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B99A5A]/35 transition-all hover:border-[#D7B879] hover:bg-[#D7B879] hover:text-[#142522]"
            >
              <FaInstagram size={17} />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B99A5A]/35 transition-all hover:border-[#D7B879] hover:bg-[#D7B879] hover:text-[#142522]"
            >
              <FaFacebookF size={17} />
            </a>
          </div>
        </div>

        {/* QUICK */}
        <div className="footer-reveal">
          <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#D7B879]">
            Explore
          </h3>
          <ul className="space-y-4">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="group inline-flex items-center gap-2 text-sm text-[#F6F0E5]/80 transition-colors hover:text-[#D7B879]"
                >
                  {link.label}
                  <ArrowUpRight
                    size={13}
                    className="opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* EXPERIENCES */}
        <div className="footer-reveal">
          <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#D7B879]">
            Experiences
          </h3>
          <ul className="space-y-4">
            {experiences.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className="text-sm text-[#F6F0E5]/80 transition-colors hover:text-[#D7B879]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-start gap-3">
            <Clock size={17} className="mt-1 shrink-0 text-[#D7B879]" />
            <div>
              <p className="text-sm font-medium">Check-in & Check-out</p>
              <p className="mt-2 text-xs leading-6 text-[#F6F0E5]/70">
                Check-in: 12:00 PM
                <br />
                Check-out: 11:00 AM
              </p>
            </div>
          </div>
        </div>

        {/* CONTACT */}
        <div className="footer-reveal">
          <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#D7B879]">
            Get in Touch
          </h3>
          <div className="space-y-5">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Roop+Vihar+Resorts+Barari+Bhagalpur+Bihar"
              target="_blank"
              rel="noreferrer"
              className="group flex items-start gap-3"
            >
              <MapPin size={18} className="mt-1 shrink-0 text-[#D7B879]" />
              <span className="text-sm leading-6 text-[#F6F0E5]/80 transition-colors group-hover:text-[#D7B879]">
                R. H. Lane, Barari,
                <br />
                Bhagalpur, Bihar - 812003
              </span>
            </a>
            <a
              href="tel:+917631005599"
              className="flex items-center gap-3 text-sm text-[#F6F0E5]/80 hover:text-[#D7B879]"
            >
              <Phone size={17} className="shrink-0 text-[#D7B879]" />
              <span>+91 76310 05599</span>
            </a>
            <a
              href="tel:+919801897235"
              className="flex items-center gap-3 text-sm text-[#F6F0E5]/80 hover:text-[#D7B879]"
            >
              <Phone size={17} className="shrink-0 text-[#D7B879]" />
              <span>+91 98018 97235</span>
            </a>
            <a
              href="mailto:info@roopviharresorts.com"
              className="flex items-start gap-3 break-all text-sm text-[#F6F0E5]/80 hover:text-[#D7B879]"
            >
              <Mail size={17} className="mt-0.5 shrink-0 text-[#D7B879]" />
              <span>info@roopviharresorts.com</span>
            </a>
          </div>
          <a
            href="https://wa.me/919801897235"
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#D7B879] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#142522] transition-colors hover:bg-[#E7D2A5]"
          >
            WhatsApp Enquiry <ArrowUpRight size={15} />
          </a>
        </div>
      </div>

      {/* LEGAL + BOTTOM */}
      <div className="border-t border-[#B99A5A]/20">
        <div className="mx-auto max-w-7xl px-5 pt-4 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pb-4">
            {legal.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-[10px] uppercase tracking-[0.2em] text-[#F6F0E5]/50 hover:text-[#D7B879]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-[#B99A5A]/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <p className="text-xs leading-6 text-[#F6F0E5]/55">
            © {new Date().getFullYear()} Roop Vihar Resorts. All rights
            reserved.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-[#F6F0E5]/55">
            Crafted with
            <Heart size={12} className="fill-[#D7B879] text-[#D7B879]" />
            for memorable experiences.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="group flex w-fit items-center gap-2 text-xs uppercase tracking-widest text-[#F6F0E5]/70 hover:text-[#D7B879]"
          >
            Back to top
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#B99A5A]/40 transition-all group-hover:border-[#D7B879] group-hover:bg-[#D7B879] group-hover:text-[#142522]">
              <ArrowUp size={15} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}