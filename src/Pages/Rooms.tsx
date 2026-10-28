import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, BedDouble, UsersRound, Sparkles } from "lucide-react";
import PageShell from "./_PageShell";
import { supabase } from "../supabaseClient";

gsap.registerPlugin(ScrollTrigger);

export default function Rooms() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Real Data from Supabase
  useEffect(() => {
    const fetchRooms = async () => {
      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .order("price", { ascending: true });
      
      if (error) {
        console.error("Error fetching rooms:", error);
      } else {
        setRooms(data || []);
      }
      setLoading(false);
    };
    fetchRooms();
  }, []);

  // Animation
  useEffect(() => {
    if (!gridRef.current || loading) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".room-card", {
        start: "top 90%",
        once: true,
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out", overwrite: true }
          );
        },
      });
    }, gridRef);

    return () => ctx.revert();
  }, [loading]);

  if (loading) return <div className="py-20 text-center text-[#62716D]">Loading rooms...</div>;

  return (
    <PageShell
      eyebrow="Signature Accommodation"
      title="Rooms & Suites"
      subtitle="Five thoughtfully designed stays — from comfortable standards to the Maharaja Royal Suite."
    >
      <div ref={gridRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <Link
            key={room.slug}
            to={`/rooms/${room.slug}`}
            className="room-card group flex flex-col overflow-hidden rounded-2xl border border-[#B99A65]/25 bg-white opacity-100 transition-all duration-500 hover:-translate-y-2 hover:border-[#B99A65]/70 hover:shadow-[0_25px_60px_-15px_rgba(37,48,46,0.15)]"
          >
            {/* 
              YAHAN FIX KIYA HAI:
              `aspect-[4/3]` hata diya hai. Ab image apni natural height (h-auto) legi. 
              Bas card ke top corners se match karne ke liye `rounded-t-2xl` laga diya hai.
            */}
            <div className="relative w-full shrink-0 overflow-hidden">
              <img
                src={room.images && room.images.length > 0 ? room.images[0] : "/fallback.jpg"}
                alt={room.name}
                loading="lazy"
                className="h-auto w-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#142522]/50 via-transparent to-transparent opacity-60" />
              
              {/* Tag */}
              <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-white/20 bg-[#142522]/80 px-3 py-1.5 text-[9px] uppercase tracking-[0.16em] text-white backdrop-blur-md">
                <Sparkles size={12} className="text-[#D5B780]" />
                Room
              </span>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <div className="mb-4 flex items-start justify-between gap-3">
                <h3 className="font-serif text-2xl leading-tight text-[#142522]">
                  {room.name}
                </h3>
                <div className="shrink-0 text-right">
                  <span className="block font-serif text-xl font-medium text-[#8D744A]">
                    ₹{room.price}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.15em] text-[#25302E]/50">
                    / night
                  </span>
                </div>
              </div>
              
              <div className="mb-6 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#25302E]/65">
                <span className="flex items-center gap-1.5">
                  <BedDouble size={14} className="text-[#A18451]" />
                  Comfortable
                </span>
                <span className="flex items-center gap-1.5">
                  <UsersRound size={14} className="text-[#A18451]" />
                  {room.capacity}
                </span>
              </div>

              <div className="mt-auto flex items-center justify-between border-t border-[#25302E]/10 pt-5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#8D744A]">
                View details
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F6F0E5] transition-colors duration-300 group-hover:bg-[#142522] group-hover:text-white">
                  <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}