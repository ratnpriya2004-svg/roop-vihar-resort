import PageShell from "./_PageShell";

export default function Terms() {
  return (
    <PageShell
      eyebrow="Policies"
      title="Terms of Service"
      subtitle="Last updated: October 2026"
    >
      <div className="mx-auto max-w-3xl space-y-6 text-sm leading-7 text-[#25302E]/75">
        <p>
          By using this website, you agree to the following terms. Please
          read them carefully.
        </p>
        <h2 className="font-serif text-xl text-[#142522]">Website content</h2>
        <p>
          Room rates, amenities and venue details are indicative and subject
          to confirmation at the time of enquiry. We reserve the right to
          update information without notice.
        </p>
        <h2 className="font-serif text-xl text-[#142522]">Bookings</h2>
        <p>
          Enquiries submitted through this website are not confirmed
          reservations. Confirmation is provided by our team via WhatsApp,
          phone or email.
        </p>
        <h2 className="font-serif text-xl text-[#142522]">Liability</h2>
        <p>
          While we take care to keep information accurate, Roop Vihar
          Resorts is not liable for errors, omissions or changes to
          published details.
        </p>
      </div>
    </PageShell>
  );
}