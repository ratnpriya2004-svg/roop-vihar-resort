import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageShell from "./_PageShell";
import { supabase } from "../supabaseClient";
import { 
  CheckCircle2, 
  X, 
  MessageCircle, 
  CalendarDays, 
  Users, 
  BedDouble, 
  ShieldCheck,
  MapPin,
  Wifi,
  Coffee,
  Utensils
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLDivElement>(null);

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
  
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".booking-anim",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out"
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (checkIn < today) { setError("Invalid check-in date."); setLoading(false); return; }
    if (checkOut <= checkIn) { setError("Check-out must be after check-in."); setLoading(false); return; }
    if (!name.trim()) { setError("Please enter your name."); setLoading(false); return; }
    if (!/^\+?\d{10,15}$/.test(phone.replace(/\s|-/g, ""))) { setError("Please enter a valid phone number."); setLoading(false); return; }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Please enter a valid email."); setLoading(false); return; }

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
      setError("Something went wrong while saving your booking. Please try again.");
      setLoading(false);
      return;
    }

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
    ].filter(Boolean).join("\n");

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    
    setShowSuccess(false);
    setName(""); setPhone(""); setEmail(""); setNotes("");
  };

  const inputClass =
    "w-full rounded-lg border border-[#E5DFD3] bg-[#FBF8F2] py-3 pl-10 pr-3 text-sm text-[#142522] outline-none transition-all placeholder:text-black/30 focus:border-[#B99A65] focus:bg-white focus:ring-2 focus:ring-[#B99A65]/20 disabled:opacity-50";

  const labelClass = "mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-[#62716D]";

  return (
    <PageShell
      eyebrow="Reservations"
      title="Book Your Stay"
      subtitle="Complete your details below to secure your reservation. Our team will confirm availability."
    >
      {/* -mt-8 se upar ka extra space kam kiya hai */}
      <div ref={sectionRef} className="relative -mt-8 pb-10">
        
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start lg:gap-16">
          
          {/* =========================================
              LEFT SIDE: HOTEL INFO & FEATURES
          ========================================= */}
          <div className="booking-anim space-y-8">
            
            {/* Title */}
            <div>
              <h1 className="font-serif text-3xl text-[#142522] sm:text-4xl">Roop Vihar Resorts</h1>
              <p className="mt-2 flex items-center gap-2 text-sm text-[#62716D]">
                <MapPin size={16} className="text-[#B99A65]" />
                R. H. Lane, Barari, Bhagalpur, Bihar - 812003
              </p>
            </div>

            {/* Description */}
            <p className="text-sm leading-7 text-[#62716D]">
              Experience the ultimate comfort in our rooms, designed to cater to all your needs with luxury and convenience. Whether you're traveling for business or leisure, our rooms offer a perfect blend of elegance and relaxation.
            </p>

            {/* Hotel Features */}
            <div className="border-t border-[#E5DFD3] pt-6">
              <h3 className="mb-4 font-serif text-xl text-[#142522]">Hotel Features</h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { icon: Wifi, label: "Free Wi-Fi" },
                  { icon: BedDouble, label: "King Bed" },
                  { icon: Coffee, label: "Breakfast" },
                  { icon: Utensils, label: "Restaurant" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center justify-center rounded-xl border border-[#E5DFD3] bg-[#FBF8F2] p-4 text-center">
                    <item.icon size={20} className="mb-2 text-[#B99A65]" />
                    <span className="text-xs font-medium text-[#142522]">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="border-t border-[#E5DFD3] pt-6">
              <h3 className="mb-4 font-serif text-xl text-[#142522]">Location</h3>
              <div className="overflow-hidden rounded-2xl border border-[#E5DFD3] h-64 w-full">
                <iframe
                  title="Map"
                  src="https://maps.google.com/maps?q=Roop%20Vihar%20Resort%20Bhagalpur&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  className="grayscale-[30%] hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>

          </div>

          {/* =========================================
              RIGHT SIDE: BOOKING FORM (STATIC / STICKY)
          ========================================= */}
          <aside className="booking-anim relative rounded-2xl border border-[#E5DFD3] bg-white p-6 shadow-[0_20px_50px_-15px_rgba(20,37,34,0.08)] sm:p-8 lg:sticky lg:top-28">
            
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* PRICE */}
              <div className="mb-6 flex items-end justify-between border-b border-[#E5DFD3] pb-4">
                <div>
                  <span className="font-serif text-3xl text-[#142522]">₹2,499</span>
                  <span className="text-sm text-[#62716D]"> / night</span>
                </div>
                <span className="rounded-md bg-[#B99A65] px-2 py-1 text-[10px] font-bold text-white">BEST RATE</span>
              </div>

              {/* DATES */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Check In</label>
                  <div className="relative">
                    <CalendarDays size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B99A65]" />
                    <input type="date" value={checkIn} min={today} required disabled={loading} onChange={(e) => { const v = e.target.value; setCheckIn(v); if (v >= checkOut) setCheckOut(getNextDay(v)); }} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Check Out</label>
                  <div className="relative">
                    <CalendarDays size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B99A65]" />
                    <input type="date" value={checkOut} min={getNextDay(checkIn)} required disabled={loading} onChange={(e) => setCheckOut(e.target.value)} className={inputClass} />
                  </div>
                </div>
              </div>

              {/* GUESTS */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Adults</label>
                  <div className="relative">
                    <Users size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B99A65]" />
                    <select value={adults} disabled={loading} onChange={(e) => setAdults(e.target.value)} className={inputClass}>
                      {[1, 2, 3, 4, 5, 6].map((n) => <option key={n}>{n}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Children</label>
                  <div className="relative">
                    <Users size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B99A65]" />
                    <select value={children} disabled={loading} onChange={(e) => setChildren(e.target.value)} className={inputClass}>
                      {[0, 1, 2, 3, 4].map((n) => <option key={n}>{n}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* ROOM TYPE */}
              <div>
                <label className={labelClass}>Room preference</label>
                <div className="relative">
                  <BedDouble size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B99A65]" />
                  <select value={roomType} disabled={loading} onChange={(e) => setRoomType(e.target.value)} className={inputClass}>
                    {rooms.map((r) => <option key={r}>{r}</option>)}
                  </select>
                </div>
              </div>

              <div className="my-4 h-px w-full bg-[#E5DFD3]" />

              {/* PERSONAL DETAILS */}
              <div>
                <label className={labelClass}>Full Name *</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required disabled={loading} className={inputClass} placeholder="Your name" />
              </div>
              <div>
                <label className={labelClass}>Phone *</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required disabled={loading} className={inputClass} placeholder="+91 XXXXX XXXXX" />
              </div>
              <div>
                <label className={labelClass}>Email (Optional)</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} className={inputClass} placeholder="you@example.com" />
              </div>

              <div className="my-4 h-px w-full bg-[#E5DFD3]" />

              {/* TOTAL */}
              <div className="flex items-center justify-between font-bold text-[#142522]">
                <span>Total Cost</span>
                <span>₹2,499</span>
              </div>

              {error && (<p className="text-xs text-red-600 bg-red-50 p-2 rounded">{error}</p>)}

              {/* SUBMIT */}
              <button type="submit" disabled={loading} className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#142522] py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-[#28483D] disabled:opacity-70">
                {loading ? "Processing..." : "BOOK NOW"}
              </button>
              
              <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-[#62716D]">
                <ShieldCheck size={14} className="text-green-600" /> Secure booking
              </div>
            </form>
          </aside>
        </div>
      </div>

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-8 text-center shadow-2xl sm:p-10">
            <button onClick={() => setShowSuccess(false)} className="absolute right-4 top-4 text-black/40 hover:text-black">
              <X size={20} />
            </button>
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-600">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="font-serif text-3xl text-[#142522]">Booking Received!</h2>
            <p className="mt-3 text-sm text-[#62716D]">
              Thank you, <strong className="text-[#142522]">{name}</strong>. Your request for the <strong className="text-[#142522]">{roomType}</strong> has been saved.
            </p>
            <div className="mt-6 rounded-xl bg-[#FBF8F2] p-4 text-sm text-black/80">
              <p className="flex justify-between"><span>Check-in:</span> <strong>{checkIn}</strong></p>
              <p className="mt-1 flex justify-between"><span>Check-out:</span> <strong>{checkOut}</strong></p>
            </div>
            <div className="mt-6 space-y-3">
              <button onClick={handleWhatsAppConfirm} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-[#1EBE5D]">
                <MessageCircle size={18} /> Confirm on WhatsApp
              </button>
              <button onClick={() => setShowSuccess(false)} className="text-xs text-black/40 underline hover:text-black">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}