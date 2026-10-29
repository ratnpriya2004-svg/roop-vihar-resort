import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, Users, Baby, ArrowUpRight, Sparkles } from "lucide-react";
import { gsap } from "gsap";

const getLocalDate = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getNextDay = (date: string) => {
  const next = new Date(`${date}T12:00:00`);
  next.setDate(next.getDate() + 1);
  return getLocalDate(next);
};

export default function BookingBar() {
  const today = getLocalDate();
  const navigate = useNavigate();

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(getNextDay(today));
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [roomType, setRoomType] = useState("Any available room");
  const [error, setError] = useState("");

  const formRef = useRef<HTMLFormElement>(null);
  const fieldsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const form = formRef.current;
    const fields = fieldsRef.current;
    if (!form || !fields) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        form,
        { y: 40, autoAlpha: 0, scale: 0.98 },
        {
          y: 0, autoAlpha: 1, scale: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: form, start: "top 92%", once: true },
        }
      );
      gsap.from(fields.querySelectorAll(".booking-field"), {
        y: 14, autoAlpha: 0, duration: 0.5, stagger: 0.07, ease: "power2.out",
        scrollTrigger: { trigger: form, start: "top 90%", once: true },
      });
      gsap.to(".booking-sparkle", { rotation: 360, duration: 20, repeat: -1, ease: "none" });
    }, form);

    return () => ctx.revert();
  }, []);

  const handleButtonEnter = () => {
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, { scale: 1.02, duration: 0.3, ease: "power2.out" });
  };
  const handleButtonLeave = () => {
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, { scale: 1, duration: 0.3, ease: "power2.out" });
  };

  const handleCheck = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (checkIn < today) return setError("Please select a valid check-in date.");
    if (checkOut <= checkIn) return setError("Check-out must be after check-in.");

    const queryParams = new URLSearchParams({
      checkIn,
      checkOut,
      adults,
      children,
      room: roomType,
    }).toString();

    navigate(`/bookings?${queryParams}`);
  };

  const fieldClass =
    "h-11 w-full min-w-0 rounded-full border border-[#D8D0C1] bg-[#FBF8F2] px-4 text-sm text-[#142522] outline-none transition-all duration-300 placeholder:text-[#A6A093] hover:border-[#B99A65]/50 focus:border-[#B99A65] focus:bg-white focus:ring-4 focus:ring-[#B99A65]/15";

  const iconLabelClass =
    "mb-1.5 flex items-center gap-1.5 text-[9px] font-medium uppercase tracking-[0.18em] text-[#8C7042]";

  return (
    // SECTION BACKGROUND WHITE
    <section
      id="booking"
      aria-label="Stay enquiry"
      className="relative z-20 mx-auto w-full max-w-[1400px] scroll-mt-24 bg-[#FBF8F2] px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-8 top-1/2 -z-10 h-32 -translate-y-1/2 rounded-full bg-[#B99A65]/10 blur-[80px]" />

      <form
        ref={formRef}
        onSubmit={handleCheck}
        // FORM BACKGROUND PURE WHITE with Shadow
        className="relative overflow-hidden rounded-2xl border border-[#B99A65]/30 #F5EAD2 p-4 shadow-[0_20px_60px_-15px_rgba(20,37,34,0.08)] sm:rounded-3xl sm:p-5 lg:p-6"
      >
        <div className="booking-gold-line absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#B99A65] to-transparent" />
        <Sparkles size={16} className="booking-sparkle pointer-events-none absolute right-3 top-3 text-[#B99A65]/40" aria-hidden="true" />

        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#142522] text-[#D5B780]">
              <CalendarDays size={15} />
            </span>
            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-[#8C7042]">Your Stay · Your Way</p>
              <h2 className="font-serif text-lg leading-tight text-[#142522] sm:text-xl">Plan your escape</h2>
            </div>
          </div>
          <span className="hidden items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-[#5D625A] sm:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" /> Direct enquiry
          </span>
        </div>

        <div ref={fieldsRef} className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-[1fr_1fr_0.7fr_0.7fr_1.2fr_1.2fr] lg:gap-2.5">
          <div className="booking-field min-w-0">
            <label className={iconLabelClass}><CalendarDays size={11} /> Check-in</label>
            <input
              type="date"
              value={checkIn}
              min={today}
              required
              onChange={(event) => {
                const value = event.target.value;
                setCheckIn(value);
                if (value >= checkOut) setCheckOut(getNextDay(value));
                setError("");
              }}
              className={fieldClass}
            />
          </div>

          <div className="booking-field min-w-0">
            <label className={iconLabelClass}><CalendarDays size={11} /> Check-out</label>
            <input
              type="date"
              value={checkOut}
              min={getNextDay(checkIn)}
              required
              onChange={(event) => { setCheckOut(event.target.value); setError(""); }}
              className={fieldClass}
            />
          </div>

          <div className="booking-field min-w-0">
            <label className={iconLabelClass}><Users size={11} /> Adults</label>
            <select value={adults} onChange={(e) => setAdults(e.target.value)} className={fieldClass}>
              {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          <div className="booking-field min-w-0">
            <label className={iconLabelClass}><Baby size={11} /> Children</label>
            <select value={children} onChange={(e) => setChildren(e.target.value)} className={fieldClass}>
              {[0, 1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          <div className="booking-field col-span-2 min-w-0 sm:col-span-1">
            <label className={iconLabelClass}>Room preference</label>
            <select value={roomType} onChange={(e) => setRoomType(e.target.value)} className={fieldClass}>
              <option>Any available room</option>
              <option>Standard Room</option>
              <option>Deluxe Room</option>
              <option>Suite</option>
              <option>Executive Suite</option>
              <option>Maharaja Royal Suite</option>
            </select>
          </div>

          <div className="booking-field col-span-2 flex items-end sm:col-span-1">
            <button
              ref={buttonRef}
              type="submit"
              onMouseEnter={handleButtonEnter}
              onMouseLeave={handleButtonLeave}
              className="group relative flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[#142522] px-5 text-[10px] font-medium uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-[#28483D]"
            >
              <span aria-hidden="true" className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#D5B780]/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Check availability</span>
              <ArrowUpRight size={15} className="relative transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {error && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>}
      </form>
    </section>
  );
}