import PageShell from "./_PageShell";

export default function Cancellation() {
  return (
    <PageShell
      eyebrow="Policies"
      title="Cancellation Policy"
      subtitle="Last updated: October 2026"
    >
      <div className="mx-auto max-w-3xl space-y-6 text-sm leading-7 text-[#25302E]/75">
        <p>
          Cancellation terms depend on the rate plan, season and event
          type. Please confirm terms with our reservations team before
          booking.
        </p>
        <h2 className="font-serif text-xl text-[#142522]">Rooms</h2>
        <p>
          Standard bookings may be cancelled up to 48 hours before arrival
          without charge unless otherwise specified. Non-refundable rates
          are not eligible for cancellation refunds.
        </p>
        <h2 className="font-serif text-xl text-[#142522]">Events & Weddings</h2>
        <p>
          Event cancellation terms are governed by the signed agreement
          between the client and Roop Vihar Resorts.
        </p>
        <h2 className="font-serif text-xl text-[#142522]">Contact</h2>
        <p>
          For cancellations, call{" "}
          <a href="tel:+917631005599" className="text-[#8D744A] underline">
            +91 76310 05599
          </a>{" "}
          or email{" "}
          <a
            href="mailto:info@roopviharresorts.com"
            className="text-[#8D744A] underline"
          >
            info@roopviharresorts.com
          </a>
          .
        </p>
      </div>
    </PageShell>
  );
}