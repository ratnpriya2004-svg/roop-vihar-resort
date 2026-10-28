import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  X,
  CheckCircle2,
} from "lucide-react";
import { supabase } from "../../supabaseClient"; // Supabase import

gsap.registerPlugin(ScrollTrigger);

type ContactForm = {
  name: string;
  phone: string;
  email: string;
  enquiryType: string;
  message: string;
};

const initialForm: ContactForm = {
  name: "",
  phone: "",
  email: "",
  enquiryType: "Room Reservation",
  message: "",
};

const enquiryTypes = [
  "Room Reservation",
  "Wedding & Celebrations",
  "Banquet & Events",
  "Restaurant Enquiry",
  "Corporate Enquiry",
  "General Enquiry",
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  const [form, setForm] = useState<ContactForm>(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Popup State
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll(".contact-reveal"),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true,
          },
        }
      );
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

    const name = form.name.trim();
    const phone = form.phone.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !phone || !message) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    const normalizedPhone = phone.replace(/[\s()-]/g, "");
    if (!/^\+?\d{10,15}$/.test(normalizedPhone)) {
      setError("Please enter a valid phone number.");
      setLoading(false);
      return;
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address.");
        setLoading(false);
        return;
      }
    }

    // 1. SAVE TO SUPABASE
    const { error: dbError } = await supabase.from("enquiries").insert([
      {
        name: name,
        phone: phone,
        email: email,
        enquiry_type: form.enquiryType,
        message: message,
      },
    ]);

    if (dbError) {
      console.error("Database error:", dbError);
      setError("Something went wrong while saving your message. Please try again.");
      setLoading(false);
      return;
    }

    // 2. SHOW SUCCESS POPUP
    setShowSuccess(true);
    setForm(initialForm); // Reset form
    setLoading(false);
  };

  // Optional WhatsApp click from popup
  const handleWhatsAppOptional = () => {
    const text = encodeURIComponent(
      `Hello Roop Vihar Resorts,\n\nName: ${form.name || "A guest"}\nI just submitted a contact form on your website.`
    );
    window.open(`https://wa.me/919801897235?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const inputClass =
    "w-full rounded-xl border border-[#DED8CB] bg-white px-4 py-3.5 text-sm text-[#203A30] outline-none transition-all duration-300 placeholder:text-[#A6A093] focus:border-[#B99A5B] focus:ring-2 focus:ring-[#B99A5B]/15 disabled:opacity-50";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#F6F2E9] py-20 sm:py-24 lg:py-32"
    >
      {/* Background Decorations */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full border border-[#B99A5B]/15" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-32 h-56 w-56 rounded-full border border-[#B99A5B]/15" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <div className="contact-reveal mx-auto mb-14 max-w-3xl text-center lg:mb-20">
          <span className="mb-4 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#9C7D43]">
            <span className="h-px w-8 bg-[#B99A5B]" />
            Get in Touch
            <span className="h-px w-8 bg-[#B99A5B]" />
          </span>

          <h2 className="font-serif text-4xl leading-tight text-[#183D30] sm:text-5xl lg:text-6xl">
            Let Us Make Your
            <br />
            <span className="italic text-[#9C7D43]">Moments Special</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#6E7067] sm:text-base">
            Planning a relaxing stay, a grand celebration or a memorable
            dining experience? We would love to hear from you.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          
          {/* Left Information Panel */}
          <div className="contact-reveal">
            <div className="rounded-3xl bg-[#183D30] p-7 text-[#F7F2E8] sm:p-9 lg:p-10">
              <span className="text-xs uppercase tracking-[0.25em] text-[#D7B879]">
                We Are Here For You
              </span>

              <h3 className="mt-4 font-serif text-3xl leading-snug sm:text-4xl">
                Let&apos;s Start
                <br />
                a Conversation.
              </h3>

              <p className="mt-5 text-sm leading-7 text-white/65">
                Our team is ready to help you with room enquiries, event
                planning, celebrations and restaurant information.
              </p>

              <div className="my-8 h-px bg-white/15" />

              {/* Address */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=Roop+Vihar+Resorts+Barari+Bhagalpur+Bihar"
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-4"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D7B879]/40 text-[#D7B879] transition-colors group-hover:bg-[#D7B879] group-hover:text-[#183D30]">
                  <MapPin size={19} />
                </span>

                <span>
                  <span className="block text-sm font-medium">Our Location</span>
                  <span className="mt-2 block text-sm leading-6 text-white/60">
                    R. H. Lane, Barari,
                    <br />
                    Bhagalpur, Bihar - 812003
                  </span>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs text-[#D7B879]">
                    Get Directions
                    <ArrowUpRight size={13} />
                  </span>
                </span>
              </a>

              {/* Phone */}
              <div className="mt-7 flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D7B879]/40 text-[#D7B879]">
                  <Phone size={18} />
                </span>
                <div>
                  <p className="text-sm font-medium">Call Us</p>
                  <a href="tel:+917631005599" className="mt-2 block text-sm text-white/65 transition-colors hover:text-[#D7B879]">
                    +91 76310 05599
                  </a>
                  <a href="tel:+919801897235" className="mt-1 block text-sm text-white/65 transition-colors hover:text-[#D7B879]">
                    +91 98018 97235
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="mt-7 flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D7B879]/40 text-[#D7B879]">
                  <Mail size={18} />
                </span>
                <div>
                  <p className="text-sm font-medium">Email Us</p>
                  <a href="mailto:info@roopviharresorts.com" className="mt-2 block break-all text-sm text-white/65 transition-colors hover:text-[#D7B879]">
                    info@roopviharresorts.com
                  </a>
                </div>
              </div>

              {/* Timings */}
              <div className="mt-7 flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D7B879]/40 text-[#D7B879]">
                  <Clock size={18} />
                </span>
                <div>
                  <p className="text-sm font-medium">Stay Timings</p>
                  <p className="mt-2 text-sm leading-6 text-white/65">
                    Check-in: 12:00 PM
                    <br />
                    Check-out: 11:00 AM
                  </p>
                </div>
              </div>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/919801897235?text=Hello%20Roop%20Vihar%20Resorts%2C%20I%20would%20like%20to%20make%20an%20enquiry."
                target="_blank"
                rel="noreferrer"
                className="mt-9 flex w-full items-center justify-center gap-3 rounded-full bg-[#D7B879] px-6 py-4 text-sm font-semibold text-[#183D30] transition-all duration-300 hover:bg-[#E9D4A6]"
              >
                <MessageCircle size={19} />
                Chat on WhatsApp
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="contact-reveal rounded-3xl border border-[#E5DFD3] bg-white p-6 shadow-[0_20px_70px_rgba(24,61,48,0.06)] sm:p-9 lg:p-10">
            <div className="mb-8">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9C7D43]">
                Send an Enquiry
              </span>
              <h3 className="mt-3 font-serif text-3xl text-[#183D30] sm:text-4xl">
                How Can We Help?
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#77786F]">
                Fill in your details below. Our team will get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name + Phone */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-[#314438]">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    disabled={loading}
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="mb-2 block text-sm font-medium text-[#314438]">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    required
                    disabled={loading}
                    placeholder="+91 XXXXX XXXXX"
                    value={form.phone}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-[#314438]">
                  Email Address (Optional)
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  disabled={loading}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              {/* Enquiry Type */}
              <div>
                <label htmlFor="contact-enquiry-type" className="mb-2 block text-sm font-medium text-[#314438]">
                  What Are You Interested In?
                </label>
                <select
                  id="contact-enquiry-type"
                  name="enquiryType"
                  disabled={loading}
                  value={form.enquiryType}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {enquiryTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-[#314438]">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  disabled={loading}
                  placeholder="Tell us about your plans..."
                  value={form.message}
                  onChange={handleChange}
                  className={`${inputClass} resize-y`}
                />
              </div>

              {error && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#183D30] px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#245542] disabled:cursor-wait disabled:opacity-70"
              >
                {loading ? "Sending..." : "Contact Us"}
                <Send size={17} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* =========================================
          SUCCESS POPUP MODAL
      ========================================= */}
      {showSuccess && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#142522]/80 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-[#FBF8F2] p-8 text-center shadow-2xl sm:p-10">
            
            <button 
              onClick={() => setShowSuccess(false)}
              className="absolute right-4 top-4 text-[#62716D] hover:text-[#142522]"
            >
              <X size={20} />
            </button>

            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircle2 size={40} />
            </div>

            <h2 className="font-serif text-3xl text-[#142522]">Message Sent!</h2>
            <p className="mt-3 text-sm leading-7 text-[#62716D]">
              Thank you for reaching out to Roop Vihar Resorts. Our team has received your enquiry and will contact you shortly.
            </p>

            <div className="mt-8 space-y-3">
              <button
                onClick={handleWhatsAppOptional}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-4 text-xs font-medium uppercase tracking-[0.2em] text-white transition hover:bg-[#1EBE5D]"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp (Optional)
              </button>
              <button
                onClick={() => setShowSuccess(false)}
                className="w-full rounded-full border border-[#D8D0C1] py-3.5 text-xs font-medium text-[#62716D] transition hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}