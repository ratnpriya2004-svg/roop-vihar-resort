import PageShell from "./_PageShell";
import corpImg from "../assets/images/cor.webp";

export default function Events() {
  return (
    <PageShell
      eyebrow="Corporate Events"
      title="Gather With Purpose"
      subtitle="Conference facilities, banquet spaces and tailored event packages for every occasion."
      heroImage={corpImg}
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div>
          <h2 id="banquet" className="font-serif text-3xl text-[#142522] sm:text-4xl">
            Spaces built for meaningful moments
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#25302E]/70 sm:text-base sm:leading-8">
            From boardroom meetings to product launches and banquet
            celebrations, our conference rooms and halls adapt to your needs
            — with attentive service and thoughtful catering options.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { title: "Emerald Convention", detail: "4,000 sq ft · 200+ guests" },
              { title: "Sapphire Conference", detail: "Intimate meetings" },
              { title: "Pearl Party Hall", detail: "Smaller celebrations" },
              { title: "Wedding Lawn", detail: "Open-air events" },
            ].map((v) => (
              <div
                key={v.title}
                className="rounded-xl border border-[#B99A65]/25 bg-white p-5"
              >
                <p className="font-serif text-lg text-[#142522]">{v.title}</p>
                <p className="mt-1 text-xs text-[#62716D]">{v.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#B99A65]/30 bg-white p-6 sm:p-8">
          <h3 className="font-serif text-2xl text-[#142522]">
            Request a proposal
          </h3>
          <p className="mt-3 text-sm text-[#25302E]/70">
            Share your event details — date, guest count, setup — and our
            team will get back with a tailored package.
          </p>
          <div className="mt-6 space-y-3">
            <a
              href={`https://wa.me/919801897235?text=${encodeURIComponent(
                "Hello Roop Vihar Resorts, I'd like a corporate event proposal."
              )}`}
              target="_blank"
              rel="noreferrer"
              className="block rounded-full bg-[#142522] py-3 text-center text-xs uppercase tracking-[0.2em] text-white hover:bg-[#28483D]"
            >
              WhatsApp us
            </a>
            <a
              href="mailto:info@roopviharresorts.com"
              className="block rounded-full border border-[#B99A65] py-3 text-center text-xs uppercase tracking-[0.2em] text-[#142522] hover:bg-[#B99A65]/10"
            >
              Email us
            </a>
            <a
              href="tel:+917631005599"
              className="block rounded-full border border-[#B99A65]/50 py-3 text-center text-xs uppercase tracking-[0.2em] text-[#25302E]/80 hover:bg-[#B99A65]/10"
            >
              Call +91 76310 05599
            </a>
          </div>
        </div>
      </div>
    </PageShell>
  );
}