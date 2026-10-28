import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageShell from "./_PageShell";

const venues: Record<string, {
  name: string;
  capacity: string;
  desc: string;
  size: string;
}> = {
  emerald: {
    name: "Emerald Convention Centre",
    capacity: "200+ guests",
    size: "4,000 sq ft",
    desc: "Our grandest venue — ideal for weddings, receptions and large celebrations. Flexible layouts, professional lighting, and dedicated coordination.",
  },
  sapphire: {
    name: "Sapphire Conference Room",
    capacity: "Up to 60 guests",
    size: "1,200 sq ft",
    desc: "Designed for corporate meetings, workshops and intimate events — with AV support and refreshments on request.",
  },
  pearl: {
    name: "Pearl Party Hall",
    capacity: "Up to 80 guests",
    size: "1,600 sq ft",
    desc: "Perfect for birthdays, anniversaries and close-knit gatherings — a warm, elegant space for smaller celebrations.",
  },
  lawn: {
    name: "Wedding Lawn",
    capacity: "Up to 300 guests",
    size: "Open-air",
    desc: "Ceremonies under the open sky — a beautifully landscaped lawn for weddings, sangeet nights and outdoor receptions.",
  },
};

export default function VenueDetail() {
  const { slug } = useParams();
  const venue = slug ? venues[slug] : null;

  if (!venue) {
    return (
      <PageShell eyebrow="Venue" title="Venue not found">
        <Link
          to="/weddings"
          className="inline-flex items-center gap-2 rounded-full bg-[#142522] px-6 py-3 text-xs uppercase tracking-[0.2em] text-white"
        >
          <ArrowLeft size={14} /> Back to weddings
        </Link>
      </PageShell>
    );
  }

  return (
    <PageShell eyebrow="Venue" title={venue.name} subtitle={venue.desc}>
      <Link
        to="/weddings"
        className="mb-8 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[#8D744A] hover:text-[#142522]"
      >
        <ArrowLeft size={13} /> All venues
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-2xl border border-[#B99A65]/25 bg-white p-6 sm:p-8">
          <h2 className="mb-6 font-serif text-2xl text-[#142522]">
            Venue details
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between border-b border-[#25302E]/10 pb-3">
              <span className="text-sm text-[#62716D]">Capacity</span>
              <span className="text-sm font-medium text-[#142522]">
                {venue.capacity}
              </span>
            </div>
            <div className="flex justify-between border-b border-[#25302E]/10 pb-3">
              <span className="text-sm text-[#62716D]">Size</span>
              <span className="text-sm font-medium text-[#142522]">
                {venue.size}
              </span>
            </div>
            <div className="flex justify-between border-b border-[#25302E]/10 pb-3">
              <span className="text-sm text-[#62716D]">Catering</span>
              <span className="text-sm font-medium text-[#142522]">
                In-house (custom menus)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[#62716D]">Parking</span>
              <span className="text-sm font-medium text-[#142522]">
                Available
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#B99A65]/30 bg-[#F5EAD2] p-6 sm:p-8">
          <h3 className="font-serif text-2xl text-[#142522]">Enquire</h3>
          <p className="mt-3 text-sm text-[#25302E]/70">
            Let us know your preferred date and guest count — we'll confirm
            availability and share package details.
          </p>
          <div className="mt-6 space-y-3">
            <a
              href={`https://wa.me/919801897235?text=${encodeURIComponent(
                `Hello Roop Vihar Resorts, I'd like to enquire about the ${venue.name}.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="block rounded-full bg-[#142522] py-3 text-center text-xs uppercase tracking-[0.2em] text-white hover:bg-[#28483D]"
            >
              WhatsApp
            </a>
            <a
              href="tel:+917631005599"
              className="block rounded-full border border-[#B99A65] py-3 text-center text-xs uppercase tracking-[0.2em] text-[#142522] hover:bg-white"
            >
              Call
            </a>
          </div>
        </div>
      </div>
    </PageShell>
  );
}