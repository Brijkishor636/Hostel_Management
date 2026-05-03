"use client";

import { Bell, Clock } from "lucide-react";
import { useStudentNotices } from "../../../hooks/useNotices";

export default function StudentNotices() {
  const { notices, loading } = useStudentNotices();

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] text-white">

      {loading && (
        <p className="text-gray-400">Loading notices...</p>
      )}

      {!loading && notices.length === 0 && (
        <p className="text-gray-400">No active notices</p>
      )}

      {!loading && notices.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notices.map((n) => (
            <div
              key={n.id}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 hover:shadow-[0_0_25px_rgba(99,102,241,0.25)] transition"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <Bell className="text-indigo-400" size={18} />
                  <h3 className="text-lg font-bold text-gray-100">
                    {n.title}
                  </h3>
                </div>

                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock size={12} />
                  {new Date(n.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* Type Badge */}
              <span
                className={`inline-block mb-3 px-3 py-1 text-xs rounded-full ${
                  n.type?.toUpperCase() === "URGENT"
                    ? "bg-red-500/20 text-red-400"
                    : "bg-indigo-500/20 text-indigo-400"
                }`}
              >
                {n.type}
              </span>

              {/* Content */}
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <p className="text-sm text-gray-300 whitespace-pre-line">
                  {n.description}
                </p>
              </div>

              {/* Footer */}
              {n.expiresAt && (
                <p className="text-xs text-gray-500 mt-3">
                  Expires: {new Date(n.expiresAt).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}