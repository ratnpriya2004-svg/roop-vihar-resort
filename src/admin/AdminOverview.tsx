import { useEffect, useState } from "react";
import { BedDouble, CalendarDays, Mail, TrendingUp, CheckCircle, Clock } from "lucide-react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function AdminOverview() {
  const [stats, setStats] = useState({ rooms: 0, bookings: 0, enquiries: 0 });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      // 1. Fetch Total Counts (Cards ke liye)
      const { count: roomCount } = await supabase.from("rooms").select("*", { count: "exact", head: true });
      const { count: bookingCount } = await supabase.from("bookings").select("*", { count: "exact", head: true });
      const { count: enquiryCount } = await supabase.from("enquiries").select("*", { count: "exact", head: true });

      setStats({
        rooms: roomCount || 0,
        bookings: bookingCount || 0,
        enquiries: enquiryCount || 0,
      });

      // 2. Fetch Recent Bookings (Table ke liye)
      const { data: bookingsData } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      if (bookingsData) setRecentBookings(bookingsData);

      // 3. REAL CHART DATA: Pichhle 7 din ki actual bookings nikalna
      const { data: allBookings } = await supabase.from("bookings").select("created_at");
      
      const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      
      // Pichhle 7 din ka array banayein (Aaj se 6 din pehle tak)
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i)); // 6 din pehle se lekar aaj tak
        return {
          dateStr: d.toISOString().split("T")[0], // YYYY-MM-DD format
          name: daysOfWeek[d.getDay()],           // Mon, Tue, etc.
          bookings: 0,                            // Start with 0
        };
      });

      // Database ki bookings ko in 7 dinon me count karein
      if (allBookings) {
        allBookings.forEach((b) => {
          const bookingDate = b.created_at.split("T")[0];
          const dayObj = last7Days.find((d) => d.dateStr === bookingDate);
          if (dayObj) dayObj.bookings += 1;
        });
      }

      setChartData(last7Days);
      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  // Top 4 Cards data
  const statCards = [
    { 
      label: "Total Rooms", 
      value: stats.rooms, 
      icon: BedDouble, 
      color: "text-blue-600", 
      bg: "bg-blue-50",
      link: "/admin/dashboard/rooms" 
    },
    { 
      label: "New Bookings", 
      value: stats.bookings, 
      icon: CalendarDays, 
      color: "text-green-600", 
      bg: "bg-green-50",
      link: "/admin/dashboard/bookings" 
    },
    { 
      label: "Enquiries", 
      value: stats.enquiries, 
      icon: Mail, 
      color: "text-yellow-600", 
      bg: "bg-yellow-50",
      link: "/admin/dashboard/enquiries" 
    },
    { 
      label: "Total Revenue", 
      value: "₹ 0", // Isko baad me bookings ke price se calculate kar sakte hain
      icon: TrendingUp, 
      color: "text-purple-600", 
      bg: "bg-purple-50",
      link: "/admin/dashboard/bookings"
    },
  ];

  // Pie Chart data (Abhi ke liye static rakha hai kyunki source tracking database me nahi hai)
  const pieData = [
    { name: "Direct", value: 70, color: "#8b5cf6" },
    { name: "Social", value: 20, color: "#0ea5e9" },
    { name: "Others", value: 10, color: "#f43f5e" },
  ];

  if (loading) return <div className="py-20 text-center text-[#62716D]">Loading dashboard...</div>;

  return (
    <div className="space-y-6">
      
      {/* 4 STATS CARDS */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link 
              key={stat.label} 
              to={stat.link}
              className="group block rounded-2xl border border-[#B99A65]/20 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#B99A65]/50 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg} ${stat.color} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon size={20} />
                </div>
                <span className="flex items-center gap-1 text-[10px] font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <TrendingUp size={12} /> Live
                </span>
              </div>
              <p className="mt-4 text-xs font-medium text-[#62716D]">{stat.label}</p>
              <p className="mt-1 font-serif text-3xl text-[#142522]">{stat.value}</p>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* WEEKLY BOOKINGS CHART (REAL DATA) */}
        <div className="rounded-2xl border border-[#B99A65]/20 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-serif text-xl text-[#142522]">Weekly Bookings</h2>
            <span className="rounded-lg border border-[#D8D0C1] bg-[#FBF8F2] px-3 py-1.5 text-xs text-[#25302E]">
               Last 7 Days
            </span>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#62716D', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#62716D', fontSize: 12}} allowDecimals={false} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="bookings" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorBookings)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BOOKING BY PLATFORM (Donut) */}
        <div className="rounded-2xl border border-[#B99A65]/20 bg-white p-6 shadow-sm">
          <h2 className="mb-6 font-serif text-xl text-[#142522]">Booking Sources</h2>
          <div className="h-[200px] w-full flex justify-center">
             <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[#62716D]">{item.name}</span>
                </div>
                <span className="font-medium text-[#142522]">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RECENT BOOKINGS TABLE */}
      <div className="rounded-2xl border border-[#B99A65]/20 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-xl text-[#142522]">Recent Reservations</h2>
          <Link to="/admin/dashboard/bookings" className="text-xs font-medium text-[#8D744A] hover:underline">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#25302E]/10 text-xs uppercase tracking-wider text-[#62716D]">
              <tr>
                <th className="pb-3 font-medium">Guest Name</th>
                <th className="pb-3 font-medium">Room Type</th>
                <th className="pb-3 font-medium">Dates</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#25302E]/10 text-[#142522]">
              {recentBookings.length === 0 ? (
                <tr><td colSpan={5} className="py-6 text-center text-[#62716D]">No bookings yet.</td></tr>
              ) : (
                recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-[#F6F0E5]/50 transition-colors">
                    <td className="py-4 font-medium">{b.guest_name}</td>
                    <td className="py-4 capitalize">{b.room_slug?.replace(/-/g, " ")}</td>
                    <td className="py-4 text-[#62716D] text-xs">{b.check_in} to {b.check_out}</td>
                    <td className="py-4">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-medium ${
                        b.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                      }`}>
                         {b.status === 'pending' ? <Clock size={10} /> : <CheckCircle size={10} />}
                         {b.status}
                      </span>
                    </td>
                    <td className="py-4">
                       <Link to="/admin/dashboard/bookings" className="text-xs text-[#B99A65] hover:underline">Manage</Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}