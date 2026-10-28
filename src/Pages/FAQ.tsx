import PageShell from "./_PageShell";

const faqs = [
  { q: "What are the check-in and check-out times?", a: "Check-in is 12:00 PM and check-out is 11:00 AM. Early check-in or late check-out may be arranged on request, subject to availability." },
  { q: "Do you allow pets?", a: "Pets are not permitted at the resort." },
  { q: "Is parking available?", a: "Yes, complimentary parking is available for in-house guests." },
  { q: "Is there a swimming pool?", a: "Yes, the pool is available to in-house guests. Access times may vary." },
  { q: "Do you host weddings and events?", a: "Yes — we host weddings, receptions, corporate events and private celebrations. Contact our team to discuss venue, catering and packages." },
  { q: "How do I book a room?", a: "You can submit an enquiry through our booking form or contact us via WhatsApp or phone. Our team will confirm availability and rates." },
  { q: "What documents are required at check-in?", a: "A valid government-issued photo ID is required for all guests as per hotel policy." },
  { q: "What is the cancellation policy?", a: "Cancellation terms depend on the rate plan and date of booking. Please refer to our cancellation policy page or contact us for details." },
];

export default function FAQ() {
  return (
    <PageShell
      eyebrow="FAQ"
      title="Frequently Asked Questions"
      subtitle="Answers to common questions about your stay, dining and events."
    >
      <div className="mx-auto max-w-3xl space-y-3">
        {faqs.map((f) => (
          <details
            key={f.q}
            className="group rounded-2xl border border-[#B99A65]/25 bg-white p-5 open:border-[#B99A65]/60"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-medium text-[#142522]">
              {f.q}
              <span className="shrink-0 text-lg text-[#B99A65] transition group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-7 text-[#25302E]/70">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </PageShell>
  );
}