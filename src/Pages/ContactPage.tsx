import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  X,
  CheckCircle2,
  Send
} from "lucide-react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { supabase } from "../supabaseClient";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  // Form State
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Popup State
  const [showSuccess, setShowSuccess] = useState(false);

  // Animation on Scroll
  useEffect(() => {
    if (!pageRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-anim", 
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-grid", start: "top 85%", once: true },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!form.name || !form.phone || !form.message) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    // 1. SAVE TO SUPABASE
    const { error: dbError } = await supabase.from("enquiries").insert([
      {
        name: form.name,
        phone: form.phone,
        email: form.email,
        enquiry_type: "General Contact",
        message: form.message,
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
    setForm({ name: "", phone: "", email: "", message: "" });
    setLoading(false);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent("Hello Roop Vihar Resorts, I have a general query.");
    window.open(`https://wa.me/919801897235?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const inputClass = "w-full rounded-xl border border-[#D8D0C1] bg-white px-4 py-3.5 text-sm text-[#142522] outline-none transition-all duration-300 placeholder:text-[#A6A093] focus:border-[#B99A65] focus:ring-4 focus:ring-[#B99A65]/15 disabled:opacity-50";

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FBF8F2]">
        
        {/* HERO SECTION */}
        <section className="relative isolate overflow-hidden bg-[#F6F0E5] px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-40 lg:px-12">
          <div className="gold-grid-bg pointer-events-none absolute inset-0 opacity-40" />
          <div className="relative mx-auto max-w-7xl">
            <Link
              to="/"
              className="group mb-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[#8D744A] transition hover:text-[#142522]"
            >
              <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1" /> 
              Back home
            </Link>

            <p className="mb-3 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.35em] text-[#8D744A]">
              <span className="h-px w-8 bg-[#B99A65]" />
              Get In Touch
            </p>

            <h1 className="font-serif text-[clamp(2.4rem,6vw,5rem)] leading-[1.02] tracking-tight text-[#142522]">
              We'd love to <br className="hidden sm:block" />
              <span className="italic text-[#B99A65]">hear from you.</span>
            </h1>
          </div>
        </section>

        {/* MAIN CONTENT GRID */}
        <section ref={pageRef} className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto max-w-7xl">
            
            <div className="contact-grid grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              
              {/* LEFT COLUMN: Info & Map */}
              <div className="space-y-6">
                
                {/* Contact Info Card */}
                <div className="contact-anim rounded-3xl border border-[#B99A65]/30 bg-[#142522] p-8 text-[#F6F0E5] shadow-xl sm:p-10">
                  <h2 className="font-serif text-3xl">Contact Information</h2>
                  <p className="mt-3 text-sm text-white/60">
                    Reach out to our team for reservations, events, or any general queries.
                  </p>

                  <div className="mt-8 space-y-6">
                    <div className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#B99A65]/10 text-[#D5B780]">
                        <MapPin size={20} />
                      </span>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#D5B780]">Address</p>
                        <p className="mt-1 text-sm leading-6 text-white/85">
                          R. H. Lane, Barari,<br/>Bhagalpur, Bihar - 812003
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#B99A65]/10 text-[#D5B780]">
                        <Phone size={20} />
                      </span>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#D5B780]">Phone</p>
                        <a href="tel:+917631005599" className="mt-1 block text-sm text-white/85 hover:text-white">+91 76310 05599</a>
                        <a href="tel:+919801897235" className="mt-1 block text-sm text-white/85 hover:text-white">+91 98018 97235</a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#B99A65]/10 text-[#D5B780]">
                        <Mail size={20} />
                      </span>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#D5B780]">Email</p>
                        <a href="mailto:info@roopviharresorts.com" className="mt-1 block break-all text-sm text-white/85 hover:text-white">
                          info@roopviharresorts.com
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 border-t border-white/10 pt-6">
                    <button
                      onClick={handleWhatsAppDirect}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-[#B99A65] py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-[#142522] transition hover:bg-[#D5B780]"
                    >
                      <MessageCircle size={16} />
                      Chat on WhatsApp
                    </button>
                  </div>
                </div>

                {/* Google Map */}
                <div className="contact-anim relative overflow-hidden rounded-3xl border border-[#B99A65]/30 bg-[#E5DFD3] shadow-lg h-[350px]">
                  <iframe
                    title="Roop Vihar Resort Location"
                    src="https://maps.google.com/maps?q=Roop%20Vihar%20Resort%20Bhagalpur&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale-[20%] transition-all duration-700 hover:grayscale-0"
                  />
                </div>

              </div>

              {/* RIGHT COLUMN: Contact Form */}
              <div className="contact-anim">
                <div className="rounded-3xl border border-[#B99A65]/20 bg-white p-6 shadow-[0_20px_60px_-20px_rgba(20,37,34,0.08)] sm:p-10 lg:p-12">
                  
                  <div className="mb-8">
                    <h2 className="font-serif text-3xl text-[#142522] sm:text-4xl">
                      Send us a message
                    </h2>
                    <p className="mt-3 text-sm text-[#62716D]">
                      Fill out the form below and we will get back to you as soon as possible.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-xs font-medium text-[#314438]">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          disabled={loading}
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Your name"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-xs font-medium text-[#314438]">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          disabled={loading}
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="+91 XXXXX XXXXX"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-medium text-[#314438]">
                        Email Address
                      </label>
                      <input
                        type="email"
                        disabled={loading}
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@example.com"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-medium text-[#314438]">
                        Your Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={5}
                        disabled={loading}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="How can we help you?"
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {error && (
                      <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#142522] py-4 text-xs font-medium uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-[#28483D] disabled:cursor-wait disabled:opacity-70"
                    >
                      {loading ? "Sending..." : "Contact Us"}
                      <Send size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </button>
                  </form>

                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />

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

            <h2 className="font-serif text-3xl text-[#142522]">Message Sent!</h2>
            <p className="mt-3 text-sm text-[#62716D]">
              Thank you for contacting Roop Vihar Resorts. Our team has received your message and will contact you shortly.
            </p>

            <div className="mt-8 space-y-3">
              <button
                onClick={handleWhatsAppDirect}
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
    </>
  );
}