import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, ShieldCheck } from "lucide-react";
import brandIcon from "../assets/images/icon.webp";
import { supabase } from "../supabaseClient"; // Supabase import

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Real Supabase Login
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#142522] px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-[#B99A65]/30 bg-[#FBF8F2] p-8 shadow-2xl sm:p-10">
        
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#142522]">
            <img src={brandIcon} alt="Logo" className="h-10 w-10 object-contain" />
          </div>
          <h1 className="font-serif text-3xl text-[#142522]">Admin Portal</h1>
          <p className="mt-2 text-sm text-[#62716D]">Sign in to manage Roop Vihar Resorts</p>
        </div>

        {error && (
          <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#8D744A]">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full rounded-xl border border-[#D8D0C1] bg-white px-4 py-3.5 text-sm outline-none transition-all focus:border-[#B99A65] focus:ring-4 focus:ring-[#B99A65]/15"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#8D744A]">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-[#D8D0C1] bg-white px-4 py-3.5 text-sm outline-none transition-all focus:border-[#B99A65] focus:ring-4 focus:ring-[#B99A65]/15"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#142522] py-4 text-xs font-medium uppercase tracking-[0.2em] text-white transition hover:bg-[#28483D] disabled:opacity-50"
          >
            <Lock size={16} />
            {loading ? "Authenticating..." : "Secure Login"}
          </button>
        </form>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[#62716D]">
          <ShieldCheck size={14} className="text-[#B99A65]" />
          Protected Admin Area
        </div>
      </div>
    </div>
  );
}