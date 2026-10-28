import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { X, Search } from "lucide-react";

export default function AdminBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (!error && data) setBookings(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (id: number, newStatus: string) => {
    const { error } = await supabase.from("bookings").update({ status: newStatus }).eq("id", id);
    if (!error) fetchBookings(); // Refresh list
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    if (!error) fetchBookings();
  };

  const filteredBookings = bookings.filter(b => 
    b.guest_name.toLowerCase().includes(search.toLowerCase()) || 
    b.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-serif text-3xl text-[#142522]">All Bookings</h1>
          <p className="mt-1 text-sm text-[#62716D]">Manage customer reservations.</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#62716D]" size={18} />
          <input 
             type="text" 
             placeholder="Search by name or phone..." 
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             className="w-full rounded-full border border-[#D8D0C1] bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#B99A65]"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#B99A65]/20 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F6F0E5] text-xs uppercase tracking-wider text-[#62716D]">
              <tr>
                <th className="px-6 py-4 font-medium">Guest</th>
                <th className="px-6 py-4 font-medium">Stay Dates</th>
                <th className="px-6 py-4 font-medium">Guests</th>
                <th className="px-6 py-4 font-medium">Room</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#25302E]/10 text-[#142522]">
              {loading ? (
                 <tr><td colSpan={6} className="py-8 text-center text-[#62716D]">Loading...</td></tr>
              ) : filteredBookings.length === 0 ? (
                 <tr><td colSpan={6} className="py-8 text-center text-[#62716D]">No bookings found.</td></tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-[#F6F0E5]/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium">{b.guest_name}</p>
                      <p className="text-xs text-[#62716D]">{b.phone}</p>
                    </td>
                    <td className="px-6 py-4 text-xs">
                      <span className="block">In: {b.check_in}</span>
                      <span className="block text-[#62716D]">Out: {b.check_out}</span>
                    </td>
                    <td className="px-6 py-4 text-xs">
                      {b.adults} Adults, {b.children} Kids
                    </td>
                    <td className="px-6 py-4 capitalize">{b.room_slug?.replace(/-/g, " ")}</td>
                    <td className="px-6 py-4">
                      <select 
                        value={b.status} 
                        onChange={(e) => handleStatusChange(b.id, e.target.value)}
                        className={`rounded-lg border-0 px-2 py-1 text-[10px] font-medium uppercase tracking-wider outline-none ${
                          b.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => handleDelete(b.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                        <X size={16} />
                      </button>
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