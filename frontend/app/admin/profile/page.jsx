"use client";

import { useContext } from "react";
import UserContext from "../../../context/UserContext";
import { Mail, Phone, Building } from "lucide-react";

export default function Page() {
  const { user } = useContext(UserContext);

  if (!user) return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] text-white p-6">

      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-6 space-y-6">

        {/* Avatar */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-2xl font-bold">
            {user.name.charAt(0)}
          </div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-400">{user.role}</p>
        </div>

        {/* Info */}
        <div className="space-y-4 text-sm">

          <div className="flex items-center gap-3">
            <Mail className="text-indigo-400" size={18} />
            <span>{user.email}</span>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="text-indigo-400" size={18} />
            <span>{user.mobNo}</span>
          </div>

          <div className="flex items-center gap-3">
            <Building className="text-indigo-400" size={18} />
            <span>{user.hostelName || "Hostel Name"}</span>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span>Status</span>
            <span
              className={`px-3 py-1 rounded-full text-xs ${
                user.isActive
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {user.isActive ? "Active" : "Inactive"}
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}