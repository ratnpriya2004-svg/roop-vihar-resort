import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, BedDouble, Mail, LogOut, Menu, X, CalendarDays, Settings, Shield } from "lucide-react";
import brandIcon from "../assets/images/icon.webp";
import { supabase } from "../supabaseClient";

const navItems = [
  { label: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Bookings", href: "/admin/dashboard/bookings", icon: CalendarDays },
  { label: "Enquiries", href: "/admin/dashboard/enquiries", icon: Mail },
  { label: "Rooms Manager", href: "/admin/dashboard/rooms", icon: BedDouble },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  return (
    // h-screen overflow-hidden pura page ko fix karta hai
    <div className="flex h-screen overflow-hidden bg-[#F6F0E5] font-sans">
      
      {/* MOBILE HEADER (Fixed) */}
      <div className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between bg-[#142522] px-4 text-white lg:hidden">
        <div className="flex items-center gap-2">
          <img src={brandIcon} alt="Logo" className="h-8 w-8" />
          <span className="font-serif text-lg">Admin</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* SIDEBAR (Static on Desktop, Slide-over on Mobile) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-[#B99A65]/20 bg-[#FBF8F2] text-[#142522] transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center gap-3 border-b border-[#B99A65]/20 px-6">
          <img src={brandIcon} alt="Logo" className="h-10 w-10" />
          <div>
            <p className="font-serif text-lg font-bold leading-tight text-[#142522]">Roop Vihar</p>
            <p className="text-[9px] uppercase tracking-[0.2em] text-[#8D744A]">Admin Dashboard</p>
          </div>
        </div>

        {/* Scrollable Sidebar Content (agar menu lamba ho) */}
        <div className="h-[calc(100vh-80px-80px)] overflow-y-auto pb-4">
          <div className="px-4 py-6">
            <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-wider text-[#62716D]">Daily Operation</p>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all duration-300 ${
                      isActive 
                        ? "bg-[#142522] font-medium text-white shadow-md" 
                        : "text-[#25302E]/70 hover:bg-[#142522]/5 hover:text-[#142522]"
                    }`}
                  >
                    <Icon size={18} className={isActive ? "text-[#D5B780]" : ""} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="px-4 py-2">
            <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-wider text-[#62716D]">System</p>
            <div className="space-y-1">
               <div className="flex cursor-not-allowed items-center gap-3 rounded-xl px-4 py-3 text-sm text-[#25302E]/40">
                 <Settings size={18} /> Settings (Soon)
               </div>
            </div>
          </div>
        </div>

        {/* Logout Fixed at Bottom */}
        <div className="absolute bottom-0 w-full border-t border-[#B99A65]/20 bg-[#FBF8F2] p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* MAIN CONTENT (Scrollable Area) */}
      <main className="flex flex-1 flex-col overflow-hidden pt-16 lg:pt-0">
        
        {/* TOP HEADER (Sticky within main content) */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-[#B99A65]/20 bg-white/50 px-4 backdrop-blur-md sm:px-8">
            <h2 className="font-serif text-2xl text-[#142522]">Dashboard</h2>
            <div className="flex items-center gap-4 text-sm text-[#62716D]">
               <span className="hidden sm:inline">Welcome, Admin</span>
               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#142522] text-white">
                 <Shield size={18} />
               </div>
            </div>
        </div>

        {/* SCROLLABLE PAGE CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}