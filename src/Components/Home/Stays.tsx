import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ArrowRight, 
  Users, 
  Maximize, 
  BedDouble, 
  Eye, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Coffee,
  Trees,
  Heart
} from "lucide-react";

// ==========================================
// YAHAN APNI IMAGES IMPORT KAREIN (Total 12 Images)
// ==========================================

// Standard Room Images (4)
import stdImg1 from "../../assets/images/img_1 (4).webp";
import stdImg2 from "../../assets/images/normal.webp";
import stdImg3 from "../../assets/images/normal2.webp";
import stdImg4 from "../../assets/images/normal3.webp";

// Deluxe Room Images (4)
import dlxImg1 from "../../assets/images/room10.webp";
import dlxImg2 from "../../assets/images/room11.webp";
import dlxImg3 from "../../assets/images/room12.webp";
import dlxImg4 from "../../assets/images/room13.webp";

// Suite Room Images (4)
import steImg1 from "../../assets/images/suit.webp";
import steImg2 from "../../assets/images/suit.webp";
import steImg3 from "../../assets/images/suit2.webp";
import steImg4 from "../../assets/images/suit.webp";

gsap.registerPlugin(ScrollTrigger);

const roomsData = [
  {
    id: "standard",
    name: "Standard Room",
    rate: "₹2,499",
    guests: "2 Guests",
    size: "30 ft",
    bed: "King Bed",
    view: "Garden View",
    desc: "A comfortable and well-furnished room ideal for short stays and budget-conscious travellers.",
    images: [stdImg1, stdImg2, stdImg3, stdImg4],
  },
  {
    id: "deluxe",
    name: "Deluxe Room",
    rate: "₹2,799",
    guests: "2 Guests",
    size: "35 ft",
    bed: "King Bed",
    view: "City View",
    desc: "Enhanced space, elegant interiors, and modern comforts perfect for leisure or business travel.",
    images: [dlxImg1, dlxImg2, dlxImg3, dlxImg4],
  },
  {
    id: "suite",
    name: "Suite",
    rate: "₹3,099",
    guests: "3 Guests",
    size: "40 ft",
    bed: "King Bed",
    view: "Lawn View",
    desc: "Spacious and serene family suite with a separate living area, ideal for guests travelling with family.",
    images: [steImg1, steImg2, steImg3, steImg4],
  },
];

const amenities = [
  { icon: Sparkles, label: "Modern Amenities" },
  { icon: Coffee, label: "Relaxing Ambience" },
  { icon: Trees, label: "Scenic Surroundings" },
  { icon: Heart, label: "Perfect for Families" },
];

export default function Stays() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const currentRoom = roomsData[activeTab];

  useEffect(() => {
    setActiveImgIndex(0);
  }, [activeTab]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".stays-reveal",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%", once: true },
        }
      );

      gsap.fromTo(".stays-image-reveal",
        { clipPath: "inset(0 0 100% 0)", scale: 1.05 },
        {
          clipPath: "inset(0 0 0% 0)", scale: 1, duration: 1.2, ease: "power4.inOut",
          scrollTrigger: { trigger: section, start: "top 75%", once: true },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleTabChange = (index: number) => {
    if (index === activeTab) return;
    gsap.to(".tab-content-anim", {
      y: 10, opacity: 0, duration: 0.2, ease: "power2.in",
      onComplete: () => {
        setActiveTab(index);
        gsap.fromTo(".tab-content-anim", 
          { y: -10, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
        );
      }
    });
  };

  const handlePrevImage = () => setActiveImgIndex((prev) => (prev === 0 ? currentRoom.images.length - 1 : prev - 1));
  const handleNextImage = () => setActiveImgIndex((prev) => (prev === currentRoom.images.length - 1 ? 0 : prev + 1));

  return (
    <section ref={sectionRef} id="rooms" className="relative flex min-h-[100vh] w-full flex-col justify-center overflow-hidden bg-[#F6F0E5] py-20 lg:py-24">
      
      <div className="relative mx-auto w-full max-w-[1300px] px-6 sm:px-8 lg:px-12">
        
        {/* HEADER */}
        <div className="stays-reveal mb-10 flex flex-col justify-between gap-6 lg:mb-14 lg:flex-row lg:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#142522] text-[10px] text-white">01</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B99A65]">Interactive Tabs</span>
            </div>
            <h2 className="font-serif text-[clamp(2.8rem,4.5vw,5rem)] leading-[1.1] text-[#142522]">
              Find Your <br className="hidden lg:block"/> 
              <span className="italic text-[#B99A65]">Perfect Stay</span>
            </h2>
          </div>
          <p className="max-w-[280px] text-[13px] leading-6 text-[#62716D] lg:pb-3">
            Discover our thoughtfully designed rooms, crafted for comfort, relaxation, and unforgettable moments.
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          
          {/* LEFT SIDE: INFO */}
          <div className="flex flex-col justify-center">
            
            {/* Tabs */}
            <div className="stays-reveal mb-8 flex flex-wrap gap-2 sm:gap-3">
              {roomsData.map((room, idx) => (
                <button
                  key={room.id}
                  onClick={() => handleTabChange(idx)}
                  className={`rounded-full px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-300 sm:text-[11px] ${
                    activeTab === idx 
                      ? "bg-[#B99A65] text-white shadow-sm" 
                      : "border border-[#B99A65]/30 text-[#62716D] hover:bg-[#B99A65]/10"
                  }`}
                >
                  {room.name}
                </button>
              ))}
            </div>

            {/* Room Details */}
            <div className="tab-content-anim">
              <h3 className="mb-3 font-serif text-2xl leading-normal text-[#142522] sm:text-3xl">{currentRoom.name}</h3>
              <p className="mb-6 text-sm leading-7 text-[#62716D]">{currentRoom.desc}</p>

              {/* Info Grid */}
              <div className="mb-8 grid grid-cols-2 gap-y-4 border-b border-[#B99A65]/20 pb-8 text-[13px] text-[#25302E]">
                <div className="flex items-center gap-2.5"><Users size={16} className="text-[#B99A65]" /> {currentRoom.guests}</div>
                <div className="flex items-center gap-2.5"><Maximize size={16} className="text-[#B99A65]" /> {currentRoom.size}</div>
                <div className="flex items-center gap-2.5"><BedDouble size={16} className="text-[#B99A65]" /> {currentRoom.bed}</div>
                <div className="flex items-center gap-2.5"><Eye size={16} className="text-[#B99A65]" /> {currentRoom.view}</div>
              </div>

              {/* Price & Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="font-serif text-3xl text-[#142522] sm:text-4xl">{currentRoom.rate}</span>
                  <span className="text-xs text-[#62716D] sm:text-sm"> / night</span>
                </div>
                <div className="flex gap-3">
                  <Link 
                    to="/rooms" 
                    className="rounded-full border border-[#142522]/20 px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider text-[#142522] transition hover:bg-[#142522] hover:text-white"
                  >
                    Details
                  </Link>
                  <Link 
                    to="/bookings" 
                    className="group flex items-center gap-2 rounded-full bg-[#142522] px-6 py-2.5 text-[10px] font-bold uppercase tracking-wider text-white transition hover:bg-[#B99A65]"
                  >
                    Book Now
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: IMAGE & GALLERY */}
          <div className="flex flex-col gap-3">
            {/* Main Image */}
            <div className="stays-image-reveal group relative h-[320px] w-full overflow-hidden rounded-2xl sm:h-[400px] lg:h-[450px]">
              <img 
                src={currentRoom.images[activeImgIndex]} 
                alt={currentRoom.name} 
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              
              <button onClick={handlePrevImage} aria-label="Previous" className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#142522] backdrop-blur-md transition hover:bg-white">
                <ChevronLeft size={20} />
              </button>
              <button onClick={handleNextImage} aria-label="Next" className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#142522] backdrop-blur-md transition hover:bg-white">
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Thumbnails - Image ke thik neeche aur bade size me */}
            <div className="stays-reveal mt-1 flex justify-center gap-3 overflow-x-auto pb-2">
              {currentRoom.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIndex(idx)}
                  aria-label={`View ${idx + 1}`}
                  className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-300 sm:h-24 sm:w-32 ${
                    activeImgIndex === idx 
                      ? "border-[#B99A65] opacity-100 shadow-md" 
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="Thumb" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* AMENITIES & CTA */}
        <div className="stays-reveal mt-12 flex flex-col items-center justify-between gap-8 border-t border-[#B99A65]/20 pt-8 lg:flex-row">
          
          <div className="grid w-full grid-cols-2 gap-4 lg:flex lg:w-auto lg:gap-8">
            {amenities.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#B99A65]/30 text-[#B99A65]">
                    <Icon size={15} strokeWidth={1.5} />
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#62716D]">{item.label}</span>
                </div>
              );
            })}
          </div>

          <Link
            to="/rooms"
            className="group flex shrink-0 items-center gap-3 rounded-full bg-[#142522] px-7 py-3 text-[10px] font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-[#B99A65]"
          >
            Explore All Rooms
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
}