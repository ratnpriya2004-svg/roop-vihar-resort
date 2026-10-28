import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Edit, Plus, Trash2, X, Upload, CheckCircle2, ImageIcon } from "lucide-react";

// ==========================================
// 1. IMPORT YOUR LOCAL IMAGES HERE
// ==========================================
import roomStd from "../assets/images/img_1 (2).webp";
import roomDlx from "../assets/images/img_1 (3).webp";
import roomSte from "../assets/images/img_1 (4).webp";
import roomExe from "../assets/images/img_3 (2).webp";
import roomRoyal from "../assets/images/img_4.webp"; 

// Mapping slugs to local images (Fallback ke liye)
const localImageMap: Record<string, string> = {
  "standard-room": roomStd,
  "deluxe-room": roomDlx,
  "suite": roomSte,
  "executive-suite": roomExe,
  "maharaja-royal-suite": roomRoyal,
};

// Interface for Room Data
type Room = {
  id: number;
  name: string;
  slug: string;
  price: number;
  capacity: string;
  description: string;
  images: string[];
  amenities: string[];
};

export default function AdminRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [form, setForm] = useState({
    name: "",
    slug: "",
    price: "",
    capacity: "",
    description: "",
    images: [] as string[],
    amenities: "", 
  });

  // 1. READ: Fetch all rooms
  const fetchRooms = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("rooms").select("*").order("price", { ascending: true });
    if (!error && data) setRooms(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // 2. CREATE/UPDATE: Open Modal
  const openModal = (room?: Room) => {
    if (room) {
      setEditingRoom(room);
      // Yahan hum purane galat links ko filter kar rahe hain
      const validImages = (room.images || []).filter(img => !img.includes("your-project.supabase.co"));
      
      setForm({
        name: room.name,
        slug: room.slug,
        price: room.price.toString(),
        capacity: room.capacity,
        description: room.description,
        images: validImages,
        amenities: room.amenities ? room.amenities.join(", ") : "",
      });
    } else {
      setEditingRoom(null);
      setForm({ name: "", slug: "", price: "", capacity: "", description: "", images: [], amenities: "" });
    }
    setIsModalOpen(true);
  };

  // 3. DELETE: Remove room
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;
    const { error } = await supabase.from("rooms").delete().eq("id", id);
    if (error) alert("Error deleting room: " + error.message);
    else fetchRooms();
  };

  // 4. IMAGE UPLOAD: Upload to CLOUDINARY
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    // Console Log for Debugging
    console.log("Cloud Name:", cloudName);
    console.log("Preset:", uploadPreset);

    if (!cloudName || !uploadPreset) {
      alert("Cloudinary keys missing in .env file! Please restart your server.");
      setUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        setForm((prev) => ({ ...prev, images: [...prev.images, data.secure_url] }));
      } else {
        console.error("Cloudinary Error Response:", data);
        alert("Error: " + (data.error?.message || "Unknown error. Check console."));
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Network error while uploading image.");
    } finally {
      setUploading(false);
    }
  };

  // 5. SUBMIT FORM (Create or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    const roomData = {
      name: form.name,
      slug: form.slug || form.name.toLowerCase().replace(/\s+/g, '-'),
      price: parseFloat(form.price),
      capacity: form.capacity,
      description: form.description,
      images: form.images, // Now contains clean Cloudinary URLs only
      amenities: form.amenities.split(",").map(item => item.trim()).filter(Boolean),
    };

    if (editingRoom) {
      const { error } = await supabase.from("rooms").update(roomData).eq("id", editingRoom.id);
      if (error) alert("Error updating room: " + error.message);
    } else {
      const { error } = await supabase.from("rooms").insert([roomData]);
      if (error) alert("Error adding room: " + error.message);
    }

    setFormLoading(false);
    setIsModalOpen(false);
    fetchRooms();
  };

  const removeImage = (index: number) => {
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  // 6. HELPER: Get image (Check Cloudinary URL first, then local fallback)
  const getRoomImage = (room: Room) => {
    // Filter out broken supabase URLs
    const validImages = (room.images || []).filter(img => !img.includes("your-project.supabase.co"));
    
    if (validImages.length > 0 && validImages[0] !== "") {
      return validImages[0];
    }
    return localImageMap[room.slug] || null;
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-serif text-3xl text-[#142522]">Rooms Manager</h1>
          <p className="mt-1 text-sm text-[#62716D]">Manage your property's inventory.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 rounded-full bg-[#142522] px-6 py-3 text-xs font-medium uppercase tracking-widest text-white transition hover:bg-[#28483D]"
        >
          <Plus size={16} /> Add New Room
        </button>
      </div>

      {/* ROOMS GRID */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p className="col-span-full py-10 text-center">Loading rooms...</p>
        ) : rooms.length === 0 ? (
          <p className="col-span-full py-10 text-center">No rooms found. Click "Add New Room" to start.</p>
        ) : (
          rooms.map((room) => {
            const displayImage = getRoomImage(room);
            
            return (
              <div key={room.id} className="overflow-hidden rounded-2xl border border-[#B99A65]/20 bg-white shadow-sm transition hover:shadow-md">
                <div className="relative h-48 w-full bg-[#F6F0E5]">
                  
                  {displayImage ? (
                    <img src={displayImage} alt={room.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center text-[#A6A093]">
                      <ImageIcon size={32} className="mb-2 opacity-50" />
                      <span className="text-xs">No Image Uploaded</span>
                    </div>
                  )}

                  <span className="absolute right-3 top-3 rounded-full bg-[#142522] px-3 py-1 text-[10px] text-white">
                     ₹{room.price} / night
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl text-[#142522]">{room.name}</h3>
                  <p className="mt-1 text-xs text-[#62716D]">{room.capacity}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-[#25302E]/10 pt-4">
                     <span className="text-[10px] uppercase tracking-widest text-[#8D744A]">ID: {room.id}</span>
                     <div className="flex gap-2">
                       <button onClick={() => openModal(room)} className="flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-xs text-blue-600 hover:bg-blue-100">
                         <Edit size={14} /> Edit
                       </button>
                       <button onClick={() => handleDelete(room.id)} className="flex items-center gap-1 rounded-md bg-red-50 px-2 py-1 text-xs text-red-600 hover:bg-red-100">
                         <Trash2 size={14} /> Delete
                       </button>
                     </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* MODAL (ADD / EDIT ROOM) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#142522]/70 p-4 backdrop-blur-sm">
          <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-y-auto rounded-3xl bg-white shadow-2xl">
             
             <div className="sticky top-0 flex items-center justify-between border-b border-[#B99A65]/20 bg-white px-6 py-4">
                <h2 className="font-serif text-2xl text-[#142522]">
                  {editingRoom ? "Edit Room" : "Add New Room"}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-[#62716D] hover:text-red-500">
                  <X size={24} />
                </button>
             </div>

             <form onSubmit={handleSubmit} className="space-y-5 p-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-[#4F5750]">Room Name</label>
                    <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} className="w-full rounded-xl border border-[#D8D0C1] px-4 py-2.5 text-sm outline-none focus:border-[#B99A65]" placeholder="e.g. Standard Room" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-[#4F5750]">Slug (URL)</label>
                    <input required type="text" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="w-full rounded-xl border border-[#D8D0C1] bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-[#B99A65]" placeholder="standard-room" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-[#4F5750]">Price (₹) / Night</label>
                    <input required type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="w-full rounded-xl border border-[#D8D0C1] px-4 py-2.5 text-sm outline-none focus:border-[#B99A65]" placeholder="2499" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-[#4F5750]">Capacity</label>
                    <input required type="text" value={form.capacity} onChange={e => setForm({...form, capacity: e.target.value})} className="w-full rounded-xl border border-[#D8D0C1] px-4 py-2.5 text-sm outline-none focus:border-[#B99A65]" placeholder="Max 2 Guests" />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-[#4F5750]">Description</label>
                  <textarea required rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full rounded-xl border border-[#D8D0C1] px-4 py-2.5 text-sm outline-none focus:border-[#B99A65]" placeholder="A comfortable room..." />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-[#4F5750]">Amenities (Comma separated)</label>
                  <input type="text" value={form.amenities} onChange={e => setForm({...form, amenities: e.target.value})} className="w-full rounded-xl border border-[#D8D0C1] px-4 py-2.5 text-sm outline-none focus:border-[#B99A65]" placeholder="Free Wi-Fi, AC, TV, Mini Bar" />
                </div>

                {/* Image Upload Section */}
                <div className="rounded-xl border border-[#B99A65]/30 bg-[#F6F0E5] p-4">
                   <label className="mb-2 block text-xs font-medium text-[#4F5750]">Room Images (Upload here)</label>
                   
                   <div className="mb-4 flex flex-wrap gap-3">
                     {form.images.map((img, i) => (
                       <div key={i} className="relative h-20 w-28 overflow-hidden rounded-lg border border-[#B99A65]/40">
                         <img src={img} alt="Room" className="h-full w-full object-cover" />
                         <button type="button" onClick={() => removeImage(i)} className="absolute right-1 top-1 rounded-full bg-red-500 p-0.5 text-white hover:bg-red-600">
                           <X size={12} />
                         </button>
                       </div>
                     ))}
                     
                     <label className="flex h-20 w-28 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#B99A65]/50 bg-white text-[#8D744A] hover:bg-[#FBF8F2] transition">
                       <Upload size={20} />
                       <span className="mt-1 text-[10px] font-medium">Upload</span>
                       <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                     </label>
                   </div>
                   {uploading && <p className="text-xs text-blue-600">Uploading to Cloudinary...</p>}
                   <p className="mt-2 text-[10px] text-[#8D744A]">
                     * Images are saved securely to Cloudinary cloud.
                   </p>
                </div>

                <div className="flex justify-end gap-3 border-t border-[#B99A65]/20 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-full px-6 py-2.5 text-xs font-medium text-[#62716D] hover:bg-gray-100">
                    Cancel
                  </button>
                  <button type="submit" disabled={formLoading || uploading} className="flex items-center gap-2 rounded-full bg-[#142522] px-8 py-2.5 text-xs font-medium text-white hover:bg-[#28483D] disabled:opacity-50">
                    {formLoading ? "Saving..." : <><CheckCircle2 size={16} /> Save Room</>}
                  </button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
}