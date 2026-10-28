import { useEffect, useRef } from "react";
import gsap from "gsap";
import PageShell from "./_PageShell";
import { Building2, Users, MapPin, ArrowUpRight, MessageCircle, Phone, Mail } from "lucide-react";

// ==========================================
// SAME PATHS AS PROVIDED
// ==========================================
import corpImg from "../assets/images/cor.webp";
import eventMeeting from "../assets/images/cor.webp";
import eventSeminar from "../assets/images/cop.webp";
import eventAudience from "../assets/images/ccc.webp";
import eventConference from "../assets/images/cccor.webp";

const eventImages = [
  { src: eventMeeting, alt: "Private meeting setup", span: "col-span-2 aspect-[16/9]" },
  { src: eventSeminar, alt: "Seminar hall with projector", span: "col-span-1 aspect-square" },
  { src: eventAudience, alt: "Conference presentation", span: "col-span-1 aspect-square" },
  { src: eventConference, alt: "Executive boardroom", span: "col-span-2 aspect-[16/9]" },
];

const venues = [
  { title: "Emerald Convention", detail: "4,000 sq ft · 200+ guests", icon: Building2 },
  { title: "Sapphire Conference", detail: "Intimate meetings", icon: Users },
  { title: "Pearl Party Hall", detail: "Smaller celebrations", icon: MapPin },
  { title: "Wedding Lawn", detail: "Open-air events", icon: ArrowUpRight },
];

export default function Events() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Smooth fade up for the entire content
      gsap.from(".event-anim", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Image entrance with slight scale
      gsap.from(".event-img", {
        scale: 1.1,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageShell
      eyebrow="Corporate Events"
      title="Gather With Purpose"
      subtitle="Conference facilities, banquet spaces and tailored event packages for every occasion."
      heroImage={corpImg}
    >
      <div ref={containerRef} className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-16">
        
        {/* LEFT COLUMN: Content & Images */}
        <div>
          <div className="event-anim">
            <h2 id="banquet" className="font-serif text-3xl leading-tight text-[#142522] sm:text-4xl">
              Spaces built for meaningful moments
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#25302E]/70 sm:text-base sm:leading-8">
              From boardroom meetings to product launches and banquet
              celebrations, our conference rooms and halls adapt to your needs
              — with attentive service and thoughtful catering options.
            </p>
          </div>

          {/* PERFECT IMAGE GALLERY (No Blank Spaces) */}
          <div className="mt-10 grid grid-cols-2 gap-4">
            {eventImages.map((img, i) => (
              <div
                key={i}
                className={`event-img group relative overflow-hidden rounded-2xl bg-[#E5DFD3] ${img.span}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-0" />
              </div>
            ))}
          </div>

          {/* VENUES GRID */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {venues.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="event-anim group flex items-start gap-4 rounded-2xl border border-[#B99A65]/25 bg-white p-5 transition-all duration-300 hover:border-[#B99A65]/70 hover:shadow-md"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F6F0E5] text-[#8D744A] transition-colors group-hover:bg-[#142522] group-hover:text-white">
                    <Icon size={18} />
                  </span>
                  <div>
                    <p className="font-serif text-lg leading-tight text-[#142522]">{v.title}</p>
                    <p className="mt-1 text-xs text-[#62716D]">{v.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Sticky Proposal Card */}
        <div className="event-anim lg:sticky lg:top-28">
          <div className="overflow-hidden rounded-3xl border border-[#B99A65]/30 bg-white shadow-[0_20px_50px_-15px_rgba(20,37,34,0.1)]">
            {/* Header with gradient */}
            <div className="bg-[#142522] p-6 text-white sm:p-8">
              <h3 className="font-serif text-2xl">Request a proposal</h3>
              <p className="mt-2 text-sm leading-6 text-white/70">
                Share your event details — date, guest count, and setup requirements — and our team will get back with a tailored package.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3 p-6 sm:p-8">
              <a
                href={`https://wa.me/919801897235?text=${encodeURIComponent("Hello Roop Vihar Resorts, I'd like a corporate event proposal.")}`}
                target="_blank"
                rel="noreferrer"
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-white transition hover:bg-[#1EBE5D]"
              >
                <MessageCircle size={16} /> WhatsApp us
              </a>
              <a
                href="mailto:info@roopviharresorts.com"
                className="group flex w-full items-center justify-center gap-2 rounded-full border border-[#B99A65] py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-[#142522] transition hover:bg-[#B99A65]/10"
              >
                <Mail size={16} /> Email us
              </a>
              <a
                href="tel:+917631005599"
                className="group flex w-full items-center justify-center gap-2 rounded-full border border-[#B99A65]/50 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-[#25302E]/80 transition hover:bg-[#B99A65]/10"
              >
                <Phone size={16} /> Call us
              </a>
            </div>
          </div>
        </div>
        
      </div>
    </PageShell>
  );
}