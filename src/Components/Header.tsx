import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowUpRight, Menu, X, ChevronDown } from "lucide-react";
import brandIcon from "../assets/images/icon.webp";

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; desc?: string }[];
};

const navigation: NavItem[] = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  {
    label: "ROOMS",
    href: "/rooms",
    children: [
      { label: "All Rooms", href: "/rooms", desc: "View all categories" },
      { label: "Standard Room", href: "/rooms/standard-room", desc: "From ₹2,499" },
      { label: "Deluxe Room", href: "/rooms/deluxe-room", desc: "From ₹2,799" },
      { label: "Suite", href: "/rooms/suite", desc: "From ₹3,099" },
      { label: "Executive Suite", href: "/rooms/executive-suite", desc: "From ₹3,599" },
      { label: "Maharaja Royal Suite", href: "/rooms/maharaja-royal-suite", desc: "From ₹4,999" },
    ],
  },
  {
    label: "WEDDINGS",
    href: "/weddings",
    children: [
      { label: "Weddings Overview", href: "/weddings", desc: "Love, celebrated beautifully" },
      { label: "Emerald Convention", href: "/venues/emerald", desc: "4,000 sq ft · 200+ guests" },
      { label: "Sapphire Conference", href: "/venues/sapphire", desc: "Intimate meetings" },
      { label: "Pearl Party Hall", href: "/venues/pearl", desc: "Smaller celebrations" },
      { label: "Wedding Lawn", href: "/venues/lawn", desc: "Open-air ceremonies" },
    ],
  },
  {
    label: "EVENTS",
    href: "/events",
    children: [
      { label: "Corporate Events", href: "/events", desc: "Gather with purpose" },
      { label: "Banquet & Functions", href: "/events#banquet", desc: "Custom packages" },
    ],
  },
  {
    label: "DINING",
    href: "/dining",
    children: [
      { label: "Maharaja Restaurant", href: "/dining", desc: "Multi-cuisine" },
      { label: "Mr. Cake Bakery", href: "/dining#bakery", desc: "In-house bakery" },
    ],
  },
  { label: "GALLERY", href: "/gallery" },
  { label: "CONTACT", href: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll detection (throttled)
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ✅ HOME BUTTON LOGIC FIX
  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Default link behavior roko
    setOpen(false); // Mobile menu band karo
    
    if (location.pathname === "/") {
      // Agar pehle se Home page par hain, toh smoothly top par scroll karo
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Agar kisi aur page par hain, toh Home page par navigate karo
      navigate("/");
    }
  };

  const isHome = location.pathname === "/";
  const solid = scrolled || !isHome;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[1000] transition-all duration-500 ${
        solid
          ? "border-b border-[#B99A65]/30 bg-[#FBF8F2]/95 shadow-[0_4px_30px_rgba(20,37,34,0.08)] backdrop-blur-md"
          : "border-b border-transparent bg-gradient-to-b from-[#142522]/70 to-transparent"
      }`}
    >
      <div className="mx-auto flex min-h-[76px] max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-8 lg:px-12">
        {/* ============ BRAND ============ */}
        <Link
          to="/"
          onClick={handleHomeClick} // ✅ Brand Logo click par bhi Home fix
          aria-label="Roop Vihar Resorts home"
          className="group flex shrink-0 items-center gap-3"
        >
          <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-[#B99A65]/60 bg-[#142522] sm:h-12 sm:w-12">
            <img
              src={brandIcon}
              alt=""
              className="h-full w-full object-contain p-1 transition-transform duration-700 group-hover:rotate-[25deg]"
            />
          </span>
          <span className="hidden flex-col text-left xs:flex sm:flex">
            <span
              className={`text-xs tracking-[0.16em] transition-colors sm:text-sm ${
                solid ? "text-[#142522]" : "text-[#F6F0E5]"
              }`}
            >
              ROOP VIHAR RESORTS
            </span>
            <span
              className={`mt-0.5 text-[8px] tracking-[0.22em] sm:text-[9px] ${
                solid ? "text-[#62716D]" : "text-[#F6F0E5]/70"
              }`}
            >
              BHAGALPUR · BIHAR
            </span>
          </span>
        </Link>

        {/* ============ DESKTOP NAV ============ */}
        <nav className="hidden items-center gap-1 lg:flex xl:gap-2">
          {navigation.map((item) => {
            const isActive =
              location.pathname === item.href ||
              (item.children &&
                item.children.some((c) =>
                  location.pathname.startsWith(c.href.split("#")[0])
                ));

            // ✅ Home Nav item ke liye custom onClick
            const isHomeItem = item.label === "HOME";

            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() =>
                  item.children && setActiveDropdown(item.label)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  onClick={isHomeItem ? handleHomeClick : undefined} // ✅ Home fix
                  className={`group relative inline-flex items-center gap-1 whitespace-nowrap px-3 py-2 text-[10px] tracking-[0.18em] transition-colors ${
                    solid
                      ? isActive
                        ? "text-[#8D744A]"
                        : "text-[#25302E]/85 hover:text-[#8D744A]"
                      : isActive
                        ? "text-[#D5B780]"
                        : "text-[#F6F0E5]/85 hover:text-[#D5B780]"
                  }`}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown size={11} className="opacity-60" />
                  )}
                  <span
                    className={`absolute bottom-0 left-3 h-px bg-[#B99A65] transition-all duration-300 ${
                      isActive
                        ? "w-[calc(100%-1.5rem)]"
                        : "w-0 group-hover:w-[calc(100%-1.5rem)]"
                    }`}
                  />
                </Link>

                {/* DROPDOWN */}
                {item.children && activeDropdown === item.label && (
                  <div className="absolute left-0 top-full z-50 w-64 pt-2">
                    <div className="overflow-hidden rounded-xl border border-[#B99A65]/30 bg-[#FBF8F2] shadow-[0_20px_60px_-15px_rgba(20,37,34,0.25)]">
                      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#B99A65] to-transparent" />
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="group/child flex flex-col gap-0.5 border-b border-[#B99A65]/10 px-4 py-3 transition-colors last:border-b-0 hover:bg-[#F6F0E5]"
                        >
                          <span className="flex items-center justify-between text-[11px] font-medium tracking-[0.1em] text-[#142522] group-hover/child:text-[#8D744A]">
                            {child.label}
                            <ArrowUpRight
                              size={12}
                              className="opacity-0 transition-all duration-300 group-hover/child:translate-x-0.5 group-hover/child:opacity-100"
                            />
                          </span>
                          {child.desc && (
                            <span className="text-[10px] text-[#62716D]">
                              {child.desc}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <Link
            to="/bookings"
            className={`ml-2 inline-flex items-center gap-2 whitespace-nowrap border px-4 py-2.5 text-[10px] tracking-[0.16em] transition-all duration-300 ${
              solid
                ? "border-[#B99A65]/70 text-[#142522] hover:bg-[#142522] hover:text-[#F6F0E5]"
                : "border-[#D5B780] text-[#F6F0E5] hover:bg-[#B99A65] hover:text-[#142522]"
            }`}
          >
            BOOK NOW <ArrowUpRight size={13} />
          </Link>
        </nav>

        {/* ============ MOBILE BUTTON ============ */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`flex h-10 w-10 items-center justify-center border transition-colors lg:hidden ${
            solid
              ? "border-[#B99A65]/60 text-[#142522]"
              : "border-white/50 text-white"
          }`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {/* ============ MOBILE NAV ============ */}
      <nav
        className={`overflow-y-auto border-t border-[#B99A65]/30 bg-[#FBF8F2] transition-[max-height] duration-500 lg:hidden ${
          open ? "max-h-[75vh]" : "max-h-0"
        }`}
      >
        <div className="px-6 py-3">
          {navigation.map((item) => {
            const isHomeItem = item.label === "HOME";
            return (
              <div
                key={item.href}
                className="border-b border-[#B99A65]/15 last:border-b-0"
              >
                <Link
                  to={item.href}
                  onClick={isHomeItem ? handleHomeClick : () => setOpen(false)} // ✅ Mobile Home fix
                  className="flex items-center justify-between py-3 text-[11px] tracking-[0.18em] text-[#25302E] hover:text-[#8D744A]"
                >
                  {item.label}
                  <ArrowUpRight size={15} />
                </Link>
                {item.children && (
                  <div className="pb-3 pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between border-l border-[#B99A65]/30 py-2 pl-3 text-[10px] tracking-[0.14em] text-[#62716D] hover:text-[#8D744A]"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <Link
            to="/bookings"
            onClick={() => setOpen(false)}
            className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#142522] py-3 text-[10px] uppercase tracking-[0.18em] text-white"
          >
            BOOK NOW <ArrowUpRight size={13} />
          </Link>
        </div>
      </nav>

      {/* ============ FLOATING MOBILE BOOK BUTTON ============ */}
      {!open && (
        <Link
          to="/bookings"
          className="fixed bottom-6 left-1/2 z-[950] -translate-x-1/2 lg:hidden"
          aria-label="Book your stay"
        >
          <span className="flex items-center gap-2 rounded-full bg-[#142522] px-6 py-3.5 text-[10px] uppercase tracking-[0.22em] text-white shadow-[0_10px_40px_rgba(20,37,34,0.35)] transition-transform active:scale-95">
            Book your stay
            <ArrowUpRight size={14} />
          </span>
        </Link>
      )}
    </header>
  );
}