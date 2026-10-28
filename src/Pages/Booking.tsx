import { useState } from "react";
import PageShell from "./_PageShell";
import { supabase } from "../supabaseClient";
import { CheckCircle2, X, MessageCircle } from "lucide-react";

const rooms = [
  "Any available room",
  "Standard Room",
  "Deluxe Room",
  "Suite",
  "Executive Suite",
  "Maharaja Royal Suite",
];

const WHATSAPP_NUMBER = "919801897235";

const getLocalDate = (d = new Date()) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const getNextDay = (date: string) => {
  const n = new Date(`${date}T12:00:00`);
  n.setDate(n.getDate() + 1);
  return getLocalDate(n);
};

export default function Booking() {
  const today = getLocalDate();
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(getNextDay(today));
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [roomType, setRoomType] = useState(rooms[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Popup State
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (checkIn < today) {
      setError("Invalid check-in date.");
      setLoading(false);
      return;
    }
    if (checkOut <= checkIn) {
      setError("Check-out must be after check-in.");
      setLoading(false);
      return;
    }
    if (!name.trim()) {
      setError("Please enter your name.");
      setLoading(false);
      return;
    }
    if (!/^\+?\d{10,15}$/.test(phone.replace(/\s|-/g, ""))) {
      setError("Please enter a valid phone number.");
      setLoading(false);
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email.");
      setLoading(false);
      return;
    }

    // 1. SAVE TO SUPABASE DATABASE
    const { error: dbError } = await supabase.from("bookings").insert([
      {
        guest_name: name,
        phone: phone,
        check_in: checkIn,
        check_out: checkOut,
        adults: parseInt(adults),
        children: parseInt(children),
        room_slug: roomType.toLowerCase().replace(/\s+/g, "-"),
        status: "pending",
      },
    ]);

    if (dbError) {
      console.error("Database error:", dbError);
      setError("Something went wrong while saving your booking. Please try again.");
      setLoading(false);
      return;
    }

    // 2. SHOW SUCCESS POPUP
    setShowSuccess(true);
    setLoading(false);
  };

  const handleWhatsAppConfirm = () => {
    const msg = [
      "Hello Roop Vihar Resorts, I have just submitted a booking request.",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      email ? `Email: ${email}` : "",
      `Check-in: ${checkIn}`,
      `Check-out: ${checkOut}`,
      `Adults: ${adults}`,
      `Children: ${children}`,
      `Room: ${roomType}`,
      notes ? `Notes: ${notes}` : "",
      "",
      "Please confirm my booking.",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer"
    );
    
    // Reset form and close popup
    setShowSuccess(false);
    setName("");
    setPhone("");
    setEmail("");
    setNotes("");
  };

  const fieldClass =
    "w-full rounded-lg border border-[#D8D0C1] bg-white px-4 py-3 text-sm text-[#142522] outline-none transition-all focus:border-[#B99A65] focus:ring-2 focus:ring-[#B99A65]/20 disabled:opacity-50";

  return (
    <PageShell
      eyebrow="Reservations"
      title="Book Your Stay"
      subtitle="Complete your details below. Once submitted, you can confirm via WhatsApp."
    >
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
        
        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-[#B99A65]/25 bg-white p-6 sm:p-8"
        >
          <h2 className="mb-6 font-serif text-2xl text-[#142522]">Stay details</h2>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-[#4F5750]">Check-in</span>
              <input
                type="date"
                value={checkIn}
                min={today}
                required
                disabled={loading}
                onChange={(e) => {
                  const v = e.target.value;
                  setCheckIn(v);
                  if (v >= checkOut) setCheckOut(getNextDay(v));
                }}
                className={fieldClass}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-[#4F5750]">Check-out</span>
              <input
                type="date"
                value={checkOut}
                min={getNextDay(checkIn)}
                required
                disabled={loading}
                onChange={(e) => setCheckOut(e.target.value)}
                className={fieldClass}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-[#4F5750]">Adults</span>
              <select value={adults} disabled={loading} onChange={(e) => setAdults(e.target.value)} className={fieldClass}>
                {[1, 2, 3, 4, 5, 6].map((n) => <option key={n}>{n}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-[#4F5750]">Children</span>
              <select value={children} disabled={loading} onChange={(e) => setChildren(e.target.value)} className={fieldClass}>
                {[0, 1, 2, 3, 4].map((n) => <option key={n}>{n}</option>)}
              </select>
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-xs font-medium text-[#4F5750]">Room preference</span>
              <select value={roomType} disabled={loading} onChange={(e) => setRoomType(e.target.value)} className={fieldClass}>
                {rooms.map((r) => <option key={r}>{r}</option>)}
              </select>
            </label>
          </div>

          <h2 className="mb-6 mt-10 font-serif text-2xl text-[#142522]">Your details</h2>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-xs font-medium text-[#4F5750]">Full name *</span>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required disabled={loading} maxLength={100} className={fieldClass} placeholder="Your name" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-[#4F5750]">Phone *</span>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required disabled={loading} maxLength={20} className={fieldClass} placeholder="+91 XXXXX XXXXX" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-[#4F5750]">Email (optional)</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} maxLength={254} className={fieldClass} placeholder="you@example.com" />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-xs font-medium text-[#4F5750]">Special requests (optional)</span>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} disabled={loading} maxLength={500} className={fieldClass} placeholder="Any special requests?" />
            </label>
          </div>

          {error && (
            <p className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-8 flex w-full items-center justify-center rounded-full bg-[#142522] py-4 text-xs font-medium uppercase tracking-[0.22em] text-white transition hover:bg-[#28483D] disabled:cursor-wait disabled:opacity-70"
          >
            {loading ? "Submitting..." : "Confirm Booking"}
          </button>
          
          <p className="mt-4 text-center text-[10px] leading-5 text-[#8C8A80]">
            Your request will be saved and sent to our team.
          </p>
        </form>

        {/* SIDEBAR */}
        <aside className="h-fit rounded-2xl border border-[#B99A65]/30 bg-[#F6F0E5] p-6 sm:p-8">
          <h3 className="font-serif text-xl text-[#142522]">Why book direct?</h3>
          <ul className="mt-4 space-y-3 text-sm text-[#25302E]/75">
            <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B99A65]" />Best rate enquiry — no middle-man fees.</li>
            <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B99A65]" />Direct conversation with our team.</li>
            <li className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B99A65]" />Flexible response — call or WhatsApp.</li>
          </ul>
          <div className="mt-8 space-y-3 border-t border-[#B99A65]/30 pt-6 text-sm">
            <p className="flex items-center gap-2 text-[#25302E]/75"><span className="font-medium text-[#142522]">Check-in:</span> 12:00 PM</p>
            <p className="flex items-center gap-2 text-[#25302E]/75"><span className="font-medium text-[#142522]">Check-out:</span> 11:00 AM</p>
            <p className="flex items-center gap-2 text-[#25302E]/75"><span className="font-medium text-[#142522]">Call:</span> <a href="tel:+917631005599" className="text-[#8D744A] underline">+91 76310 05599</a></p>
          </div>
        </aside>
      </div>

      {/* =========================================
          SUCCESS POPUP MODAL
      ========================================= */}
      {showSuccess && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#142522]/80 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-[#FBF8F2] p-8 text-center shadow-2xl sm:p-10">
            
            {/* Close Button */}
            <button 
              onClick={() => setShowSuccess(false)}
              className="absolute right-4 top-4 text-[#62716D] hover:text-[#142522]"
            >
              <X size={20} />
            </button>

            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircle2 size={40} />
            </div>

            <h2 className="font-serif text-3xl text-[#142522]">Booking Received!</h2>
            <p className="mt-3 text-sm text-[#62716D]">
              Thank you, <strong className="text-[#142522]">{name}</strong>. Your request for the <strong className="text-[#142522]">{roomType}</strong> has been saved.
            </p>

            <div className="mt-6 rounded-xl bg-[#F6F0E5] p-4 text-sm text-[#25302E]">
              <p className="flex justify-between"><span>Check-in:</span> <strong>{checkIn}</strong></p>
              <p className="mt-1 flex justify-between"><span>Check-out:</span> <strong>{checkOut}</strong></p>
            </div>

            <p className="mt-6 text-xs text-[#62716D]">
              To finalize your reservation and confirm availability, please click below to send us a message on WhatsApp.
            </p>

            <div className="mt-6 space-y-3">
              <button
                onClick={handleWhatsAppConfirm}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-4 text-xs font-medium uppercase tracking-[0.2em] text-white transition hover:bg-[#1EBE5D]"
              >
                <MessageCircle size={18} />
                Confirm via WhatsApp
              </button>
              <button
                onClick={() => setShowSuccess(false)}
                className="text-xs text-[#62716D] underline hover:text-[#142522]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}