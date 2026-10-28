import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft, Check, ArrowUpRight, UsersRound, ShieldCheck, CalendarDays,
} from "lucide-react";
import PageShell from "./_PageShell";
import { supabase } from "../supabaseClient"; // Import Supabase

export default function RoomDetail() {
  const { slug } = useParams();
  const [room, setRoom] = useState<any>(null);
  const [activeImg, setActiveImg] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch specific room by slug from Supabase
  useEffect(() => {
    const fetchRoom = async () => {
      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .eq("slug", slug)
        .single();
      
      if (error) console.error("Error fetching room:", error);
      else setRoom(data);
      
      setLoading(false);
    };
    fetchRoom();
  }, [slug]);

  if (loading) return <div className="py-20 text-center text-[#62716D]">Loading room...</div>;

  if (!room) {
    return (
      <PageShell eyebrow="Room" title="Room not found">
        <Link to="/rooms" className="inline-flex items-center gap-2 rounded-full bg-[#142522] px-6 py-3 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-[#28483D]">
          <ArrowLeft size={14} /> Back to all rooms
        </Link>
      </PageShell>
    );
  }

  return (
    <PageShell eyebrow="Room Details" title={room.name} subtitle={room.capacity}>
      <div className="relative">
        <Link to="/rooms" className="mb-8 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[#8D744A] transition hover:text-[#142522]">
          <ArrowLeft size={13} /> All rooms
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#E5DFD3] shadow-[0_20px_50px_-20px_rgba(20,37,34,0.2)]">
              <img
                src={room.images[activeImg]}
                alt={`${room.name} - view ${activeImg + 1}`}
                className="h-full w-full object-cover transition-opacity duration-300"
              />
            </div>

            {room.images?.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {room.images.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                      activeImg === i ? "border-[#B99A65] opacity-100" : "border-transparent opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${i + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-10">
              <h2 className="mb-4 font-serif text-3xl text-[#142522]">About this room</h2>
              <p className="mb-8 text-sm leading-7 text-[#25302E]/75 sm:text-base sm:leading-8">
                {room.description}
              </p>

              <h3 className="mb-5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#8D744A]">
                Room Amenities
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {room.amenities?.map((amenity: string) => (
                  <div key={amenity} className="flex items-center gap-3 rounded-xl border border-[#B99A65]/20 bg-white px-4 py-3 text-sm text-[#25302E]">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F6F0E5] text-[#8D744A]">
                      <Check size={13} strokeWidth={2.5} />
                    </span>
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative h-fit lg:sticky lg:top-28">
            <div className="rounded-3xl border border-[#B99A65]/30 bg-white p-6 shadow-[0_20px_60px_-20px_rgba(20,37,34,0.15)] sm:p-8">
              <div className="mb-6 border-b border-[#25302E]/10 pb-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#8D744A]">Starting from</p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-serif text-4xl text-[#142522]">₹{room.price}</span>
                  <span className="text-sm text-[#62716D]">/ night</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 rounded-xl bg-[#F6F0E5] px-4 py-3">
                  <UsersRound size={18} className="text-[#8D744A]" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[#8D744A]">Capacity</p>
                    <p className="text-sm font-medium text-[#142522]">{room.capacity}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 rounded-xl bg-[#F6F0E5] px-4 py-3">
                  <CalendarDays size={18} className="text-[#8D744A]" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[#8D744A]">Check-in / out</p>
                    <p className="text-sm font-medium text-[#142522]">12:00 PM / 11:00 AM</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <Link to="/bookings" className="flex w-full items-center justify-center gap-2 rounded-full bg-[#142522] py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-[#28483D]">
                  Book this room <ArrowUpRight size={15} />
                </Link>
                <a
                  href={`https://wa.me/919801897235?text=${encodeURIComponent(`Hello Roop Vihar Resorts, I'd like to enquire about the ${room.name}.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-[#B99A65] py-4 text-xs uppercase tracking-[0.2em] text-[#142522] transition hover:bg-[#B99A65]/10"
                >
                  WhatsApp Enquiry
                </a>
              </div>

              <div className="mt-6 flex items-start gap-2 text-[11px] leading-5 text-[#62716D]">
                <ShieldCheck size={16} className="shrink-0 text-[#B99A65]" />
                <p>Best rate guaranteed when you book direct with us.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}