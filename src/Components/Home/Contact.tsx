import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  X,
  CheckCircle2,
  ArrowRight,
  User,
  Mail,
  Phone,
  CalendarDays,
  Users,
  MessageSquare,
  MapPin,
  ChevronDown,
  Sparkles,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { supabase } from "../../supabaseClient";

import sideImage from "../../assets/images/look2.webp"; 

gsap.registerPlugin(ScrollTrigger);

type ContactForm = {
  name: string;
  phone: string;
  email: string;
  enquiryType: string;
  date: string;
  guests: string;
  message: string;
};

const initialForm: ContactForm = {
  name: "",
  phone: "",
  email: "",
  enquiryType: "Room Reservation",
  date: "",
  guests: "2 Adults",
  message: "",
};

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  const [form, setForm] = useState<ContactForm>(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-anim-left",
        { x: -50, opacity: 0, rotateY: 10 },
        {
          x: 0, opacity: 1, rotateY: 0, duration: 1.2, ease: "power4.out",
          scrollTrigger: { trigger: section, start: "top 75%", once: true },
        }
      );
      
      gsap.fromTo(".contact-anim-right",
        { x: 50, opacity: 0, rotateY: -10 },
        {
          x: 0, opacity: 1, rotateY: 0, duration: 1.2, ease: "power4.out",
          scrollTrigger: { trigger: section, start: "top 75%", once: true },
        }
      );

      gsap.to(".parallax-img", {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    setError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    if (!form.name || !form.phone || !form.message) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    const { error: dbError } = await supabase.from("enquiries").insert([
      {
        name: form.name,
        phone: form.phone,
        email: form.email,
        enquiry_type: form.enquiryType,
        message: `Date: ${form.date}, Guests: ${form.guests}. ${form.message}`,
      },
    ]);

    if (dbError) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    setShowSuccess(true);
    setForm(initialForm);
    setLoading(false);
  };

  const inputClass =
    "w-full rounded-xl border border-[#EAE5DC] bg-[#FBF8F2] py-4 pl-12 pr-4 text-[14px] text-[#142522] outline-none transition-all placeholder:text-[#A0A0A0] hover:border-[#B99A65]/50 focus:border-[#B99A65] focus:bg-white focus:ring-4 focus:ring-[#B99A65]/10 shadow-sm";
  const labelClass = "mb-2 block text-[11px] font-bold uppercase tracking-wider text-[#77766F]";
  const iconClass = "absolute left-4 top-[44px] text-[#B99A65]";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#F6F0E5] py-20 lg:py-28 [perspective:1000px]"
    >
      <div className="pointer-events-none absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B99A65]/10 blur-[100px]" />
      
      <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8">
        
        {/* HEADER */}
        <div className="mb-14 flex flex-col items-center text-center">
          <div className="contact-anim-left mb-5 inline-flex items-center gap-2 rounded-full border border-[#B99A65]/30 bg-white/50 px-4 py-1.5 backdrop-blur-md">
            <Sparkles size={12} className="text-[#B99A65]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B99A65]">
              Get In Touch
            </span>
          </div>
          
          <h2 className="contact-anim-left font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] tracking-tight text-[#142522]">
            Plan Your <span className="italic text-[#B99A65]">Perfect Escape</span>
          </h2>
          
          <p className="contact-anim-left mt-4 max-w-xl text-sm leading-relaxed text-[#77766F]">
            Whether it's a relaxing getaway or a grand celebration, our team is here to ensure every detail is taken care of.
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          
          {/* LEFT: CONTACT FORM CARD */}
          <div className="contact-anim-left rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-[0_20px_60px_-15px_rgba(20,37,34,0.1)] backdrop-blur-xl sm:p-10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="relative">
                  <label className={labelClass} htmlFor="name">Full Name</label>
                  <User size={18} className={iconClass} />
                  <input id="name" type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" className={inputClass} required />
                </div>
                <div className="relative">
                  <label className={labelClass} htmlFor="email">Email Address</label>
                  <Mail size={18} className={iconClass} />
                  <input id="email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className={inputClass} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="relative">
                  <label className={labelClass} htmlFor="phone">Phone Number</label>
                  <Phone size={18} className={iconClass} />
                  <input id="phone" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 90000 00000" className={inputClass} required />
                </div>
                <div className="relative">
                  <label className={labelClass} htmlFor="enquiryType">Select Your Tour</label>
                  <Users size={18} className={iconClass} />
                  <select id="enquiryType" name="enquiryType" value={form.enquiryType} onChange={handleChange} className={`${inputClass} appearance-none cursor-pointer`}>
                    <option>Room Reservation</option>
                    <option>Wedding Celebration</option>
                    <option>Banquet Hall</option>
                    <option>Birthday Celebration</option>
                    <option>Corporate Event</option>
                    <option>Restaurant Enquiry</option>
                    <option>General Enquiry</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-[44px] text-[#A0A0A0] pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="relative">
                  <label className={labelClass} htmlFor="date">Preferred Date</label>
                  <CalendarDays size={18} className={iconClass} />
                  <input id="date" type="date" name="date" value={form.date} onChange={handleChange} className={`${inputClass} text-[#77766F]`} />
                </div>
                <div className="relative">
                  <label className={labelClass} htmlFor="guests">Number of Travellers</label>
                  <Users size={18} className={iconClass} />
                  <select id="guests" name="guests" value={form.guests} onChange={handleChange} className={`${inputClass} appearance-none cursor-pointer`}>
                    <option>1 Adult</option>
                    <option>2 Adults</option>
                    <option>3 Adults</option>
                    <option>4 Adults</option>
                    <option>5+ Adults</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-[44px] text-[#A0A0A0] pointer-events-none" />
                </div>
              </div>

              <div className="relative">
                <label className={labelClass} htmlFor="message">Special Requests</label>
                <MessageSquare size={18} className="absolute left-4 top-12 text-[#B99A65]" />
                <textarea id="message" name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Anything else we should know?" className={`${inputClass} resize-none pt-4`} required />
              </div>

              {error && <p className="text-xs font-semibold text-red-600">{error}</p>}

              <div className="mt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative flex w-full items-center justify-between overflow-hidden rounded-xl bg-[#142522] py-4 pl-6 pr-3 text-[12px] font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-[#25302E] disabled:opacity-70"
                >
                  <span className="relative z-10">{loading ? "Sending..." : "Reserve Your Spot"}</span>
                  <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-lg bg-[#B99A65] text-[#142522] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT: CREATIVE IMAGE + INFO PANEL (No external links) */}
          <div className="contact-anim-right relative group flex flex-col overflow-hidden rounded-[2rem] border border-white/60 bg-white/50 shadow-[0_20px_60px_-15px_rgba(20,37,34,0.1)]">
            
            {/* Image Section */}
            <div className="relative h-[280px] w-full overflow-hidden sm:h-[350px]">
              <img 
                src={sideImage} 
                alt="Roop Vihar Resort" 
                className="parallax-img absolute inset-0 h-[120%] w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#142522]/80 via-[#142522]/20 to-transparent" />
              
              {/* Glass Badge */}
              <div className="absolute left-6 top-6 z-10 flex items-center gap-2 rounded-full border border-white/40 bg-black/40 px-4 py-2 backdrop-blur-md">
                <ShieldCheck size={14} className="text-[#B99A65]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white">Verified Location</span>
              </div>

              {/* Overlay Text */}
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <h3 className="font-serif text-3xl text-white">Roop Vihar Resorts</h3>
                <p className="mt-1 text-sm text-white/80">Bhagalpur, Bihar, India</p>
              </div>
            </div>

            {/* Info Section */}
            <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FBF8F2] text-[#B99A65]">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#142522]">Our Address</h4>
                    <p className="mt-1 text-xs leading-relaxed text-[#77766F]">R. H. Lane, Barari, Bhagalpur, Bihar - 812003</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FBF8F2] text-[#B99A65]">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#142522]">Front Desk Hours</h4>
                    <p className="mt-1 text-xs leading-relaxed text-[#77766F]">Open 24/7 for our esteemed guests.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FBF8F2] text-[#B99A65]">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#142522]">Call Us</h4>
                    <p className="mt-1 text-xs leading-relaxed text-[#77766F]">+91 76310 05599</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {showSuccess && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl">
            <button onClick={() => setShowSuccess(false)} className="absolute right-4 top-4 text-gray-400 hover:text-black">
              <X size={20} />
            </button>

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-500">
              <CheckCircle2 size={32} />
            </div>

            <h2 className="font-serif text-2xl text-[#142522]">Message Sent!</h2>
            <p className="mt-3 text-[13px] leading-relaxed text-[#77766F]">
              Thank you for reaching out. Our team will contact you shortly.
            </p>

            <button onClick={() => setShowSuccess(false)} className="mt-8 w-full rounded-xl bg-[#142522] py-3 text-[11px] font-bold uppercase tracking-widest text-white transition hover:bg-black">
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}