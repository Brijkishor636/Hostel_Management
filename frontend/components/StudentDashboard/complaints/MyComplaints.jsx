"use client";

import { Clock } from "lucide-react";
import { useStudentComplaints } from "../../../hooks/useStudentComplaints";

export default function MyComplaints() {
  const { complaints, loading } = useStudentComplaints();

  if (loading) {
    return <p className="text-gray-400">Loading complaints...</p>;
  }

  if (complaints.length === 0) {
    return <p className="text-gray-400">No complaints found</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {complaints.map((c) => (
        <div
          key={c.id}
          className="border-l-4 border-indigo-500 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 hover:shadow-[0_0_25px_rgba(99,102,241,0.25)] transition"
        >
          {/* Header */}
          <div className="flex justify-between mb-4">
            <div>
              <span className="px-3 py-1 text-xs rounded-full font-medium bg-yellow-500/20 text-yellow-400">
                {c.priority || "MEDIUM"} Priority
              </span>

              <h3 className="text-lg font-bold mt-2 text-gray-100">
                {c.title}
              </h3>
            </div>

            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Clock size={12} />
              {new Date(c.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Message */}
          <div className="bg-white/5 p-4 rounded-xl mb-4 border border-white/10">
            <p className="text-sm text-gray-400">{c.message}</p>
          </div>

          {/* Footer */}
          <div className="flex justify-between text-xs text-gray-400">
            <span>Status: {c.status}</span>
            <span>Room: {c.student?.room?.number || "N/A"}</span>
          </div>
        </div>
      ))}
    </div>
  );
}