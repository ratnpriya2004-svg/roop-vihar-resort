import PageShell from "./_PageShell";

export default function Privacy() {
  return (
    <PageShell
      eyebrow="Policies"
      title="Privacy Policy"
      subtitle="Last updated: October 2026"
    >
      <div className="mx-auto max-w-3xl space-y-6 text-sm leading-7 text-[#25302E]/75">
        <p>
          Roop Vihar Resorts respects your privacy. This policy explains how
          we collect, use and protect personal information shared through
          our website, enquiry forms and WhatsApp.
        </p>
        <h2 className="font-serif text-xl text-[#142522]">Information we collect</h2>
        <p>
          When you submit an enquiry, we may collect your name, phone number,
          email, preferred stay dates, and any notes you provide.
        </p>
        <h2 className="font-serif text-xl text-[#142522]">How we use it</h2>
        <p>
          Information is used solely to respond to your enquiry, confirm
          availability, and improve our services. We do not sell or share
          your data with third parties for marketing.
        </p>
        <h2 className="font-serif text-xl text-[#142522]">Contact</h2>
        <p>
          For privacy requests, email{" "}
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