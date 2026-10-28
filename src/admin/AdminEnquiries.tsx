import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { X, Search, Mail, Phone, Clock, ExternalLink, Download } from "lucide-react";

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchEnquiries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (!error && data) setEnquiries(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  // Update Lead Status (New -> Contacted -> Won/Lost)
  const handleStatusChange = async (id: number, newStatus: string) => {
    const { error } = await supabase
      .from("enquiries")
      .update({ status: newStatus })
      .eq("id", id);
    
    if (!error) fetchEnquiries();
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this enquiry permanently?")) return;
    const { error } = await supabase.from("enquiries").delete().eq("id", id);
    if (!error) fetchEnquiries();
  };

  // Export to CSV (Doc Requirement)
  const exportToCSV = () => {
    const headers = ["Name", "Phone", "Email", "Type", "Message", "Status", "Date"];
    const rows = enquiries.map(e => [
      e.name, e.phone, e.email || "", e.enquiry_type || "General", 
      `"${e.message}"`, e.status || "new", new Date(e.created_at).toLocaleDateString()
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "roop_vihar_enquiries.csv");
    document.body.appendChild(link);
    link.click();
  };

  const filtered = enquiries.filter(e => 
    e.name.toLowerCase().includes(search.toLowerCase()) || 
    e.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-serif text-3xl text-[#142522]">Enquiries & Leads</h1>
          <p className="mt-1 text-sm text-[#62716D]">Manage and track customer enquiries (Pipeline).</p>
        </div>
        
        <div className="flex gap-3">
          <button onClick={exportToCSV} className="flex items-center gap-2 rounded-full border border-[#B99A65] bg-white px-4 py-2 text-xs font-medium text-[#8D744A] hover:bg-[#F6F0E5]">
            <Download size={14} /> Export CSV
          </button>
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#62716D]" size={16} />
            <input 
              type="text" 
              placeholder="Search name or phone..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-[#D8D0C1] bg-white py-2 pl-9 pr-4 text-sm outline-none focus:border-[#B99A65]"
            />
          </div>
        </div>
      </div>

      {/* LEADS TABLE VIEW (More professional than cards) */}
      <div className="overflow-hidden rounded-2xl border border-[#B99A65]/20 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F6F0E5] text-xs uppercase tracking-wider text-[#62716D]">
              <tr>
                <th className="px-6 py-4 font-medium">Lead Details</th>
                <th className="px-6 py-4 font-medium">Type / Message</th>
                <th className="px-6 py-4 font-medium">Status Pipeline</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#25302E]/10 text-[#142522]">
              {loading ? (
                <tr><td colSpan={4} className="py-8 text-center text-[#62716D]">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={4} className="py-8 text-center text-[#62716D]">No enquiries found.</td></tr>
              ) : (
                filtered.map((e) => (
                  <tr key={e.id} className="hover:bg-[#F6F0E5]/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-base">{e.name}</p>
                      <div className="mt-1 space-y-1 text-xs text-[#62716D]">
                        <p className="flex items-center gap-1"><Phone size={12} /> {e.phone}</p>
                        {e.email && <p className="flex items-center gap-1"><Mail size={12} /> {e.email}</p>}
                        <p className="flex items-center gap-1"><Clock size={12} /> {new Date(e.created_at).toLocaleString()}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <span className="inline-block rounded bg-[#F6F0E5] px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-[#8D744A] mb-2">
                        {e.enquiry_type || "General"}
                      </span>
                      <p className="text-sm italic text-[#25302E]/80">"{e.message}"</p>
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        value={e.status || "new"} 
                        onChange={(evt) => handleStatusChange(e.id, evt.target.value)}
                        className={`rounded-lg border-0 px-3 py-1.5 text-xs font-medium outline-none ${
                          e.status === 'won' ? 'bg-green-100 text-green-800' :
                          e.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                          e.status === 'lost' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        <option value="new">🔴 New</option>
                        <option value="contacted">🔵 Contacted</option>
                        <option value="won">🟢 Won (Booked)</option>
                        <option value="lost">⚫ Lost</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <a 
                          href={`https://wa.me/${e.phone.replace(/[^0-9]/g, '')}?text=Hello ${e.name}, thanks for contacting Roop Vihar Resorts. How can we assist you?`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition"
                          title="Reply on WhatsApp"
                        >
                          <ExternalLink size={14} />
                        </a>
                        <button 
                          onClick={() => handleDelete(e.id)} 
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition"
                          title="Delete Lead"
                        >
                          <X size={14} />
                        </button>
                      </div>
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