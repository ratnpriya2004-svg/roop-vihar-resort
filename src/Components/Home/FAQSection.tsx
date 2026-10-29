import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus, Mail } from "lucide-react";
import faqImg from "../../assets/images/building.webp"; // Apni image ka path check kar lein

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "What's included in the room reservation?",
    answer: "Our rooms include complimentary Wi-Fi, air conditioning, LED TV, tea/coffee maker, and 24x7 room service. Breakfast can be added at an additional charge. Check-in is at 12:00 PM and check-out is at 11:00 AM.",
  },
  {
    question: "Do you host weddings and corporate events?",
    answer: "Yes! Roop Vihar Resorts features the Emerald Convention Centre (200+ guests), Sapphire Conference Room, Pearl Party Hall, and a spacious Wedding Lawn. We provide in-house catering and customizable packages.",
  },
  {
    question: "What are the dining options available?",
    answer: "We have Maharaja Restaurant serving multi-cuisine dishes for lunch and dinner. We also have Mr. Cake, our in-house bakery, for fresh pastries and custom cakes.",
  },
  {
    question: "Is parking available at the resort?",
    answer: "Yes, we offer ample free parking space for cars and bikes. The resort is also equipped with 24-hour security and wheelchair access.",
  },
  {
    question: "What is the cancellation policy?",
    answer: "Cancellations made 7 days or more before arrival will receive a 75% refund. Cancellations within 3-7 days receive a 50% refund. No refunds are provided for cancellations within 3 days of arrival.",
  },
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".faq-reveal",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%", once: true },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} id="faq" className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7x1 pl-0 pr-5 sm:pl-0 sm:pr-8 lg:pl-8 lg:pr-22">
        
        {/* ============ HEADER SECTION ============ */}
        <div className="faq-reveal mx-auto mb-14 max-w-3xl text-center sm:mb-20">
          <span className="mb-4 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#8B7146] sm:text-xs">
            <span className="h-px w-8 bg-[#B99A65]" /> FAQ <span className="h-px w-8 bg-[#B99A65]" />
          </span>
          <h2 className="font-serif text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1.05] text-[#142522]">
            Frequently Asked <span className="italic text-[#B99A65]">Questions</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#62716D] sm:text-base">
            Find answers to common questions about your stay, events, and dining at Roop Vihar Resorts.
          </p>
        </div>

        {/* ============ MAIN GRID ============ */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-26">
          
          {/* LEFT COLUMN: IMAGE */}
          <div className="faq-reveal relative h-[400px] overflow-hidden rounded-3xl shadow-xl sm:h-[500px] lg:h-auto lg:min-h-[650px]">
            <img
              src={faqImg}
              alt="Conference and Events at Roop Vihar Resorts"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Floating tag on image */}
            <div className="absolute bottom-6 left-6 rounded-full bg-white/20 px-4 py-2 text-xs font-medium text-white backdrop-blur-md">
              @RoopVihar_Resorts
            </div>
          </div>

          {/* RIGHT COLUMN: FAQ ACCORDION */}
          <div className="faq-reveal flex flex-col justify-center">
            
            {/* Top Bar (Email & Get in touch) */}
            <div className="mb-8 flex items-center justify-between rounded-2xl bg-[#F5EAD2] p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-black/60">Email</p>
                  <p className="text-sm font-semibold text-black">info@roopviharresorts.com</p>
                </div>
              </div>
              <a href="#contact" className="rounded-full bg-black px-4 py-2 text-[10px] font-medium uppercase tracking-widest text-white transition hover:bg-black/80">
                Get in touch
              </a>
            </div>

            {/* Questions List */}
            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className={`overflow-hidden rounded-xl border transition-all duration-300 ${
                      isOpen ? "border-black/20 bg-[#F5EAD2]" : "border-black/10 bg-white hover:border-black/30"
                    }`}
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="flex w-full items-center justify-between p-5 text-left"
                    >
                      <span className={`text-sm font-medium sm:text-base ${isOpen ? "text-black" : "text-black/80"}`}>
                        {faq.question}
                      </span>
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                        isOpen ? "bg-black text-white" : "bg-black/5 text-black"
                      }`}>
                        {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                      </span>
                    </button>
                    
                    {/* Animated Answer */}
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-5 text-sm leading-7 text-black/60">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}