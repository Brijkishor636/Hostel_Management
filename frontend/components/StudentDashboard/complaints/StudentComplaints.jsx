"use client";

import { useState } from "react";
import { Clock, MessageSquare } from "lucide-react";
import { useComplaints } from "../../../hooks/useComplaints";

export default function StudentComplaints() {
  const [tab, setTab] = useState("PENDING");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { complaints, total } = useComplaints({
    role: "student",
    status: tab,
    page,
    limit,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] text-white p-6 space-y-8">
    
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <MessageSquare className="text-indigo-400" /> All Complaints
        </h2>

        {/* Tabs */}
        <div className="flex bg-white/5 backdrop-blur-md p-1 rounded-xl border border-white/10">
          <button
            onClick={() => {
              setTab("PENDING");
              setPage(1);
            }}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium ${
              tab === "PENDING"
                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Open
          </button>

          <button
            onClick={() => {
              setTab("RESOLVED");
              setPage(1);
            }}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium ${
              tab === "RESOLVED"
                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Resolved
          </button>
        </div>
      </div>

      {/* Complaints Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {complaints.map((c) => (
          <div
            key={c.id}
            className="border-l-4 border-indigo-500 flex flex-col bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 hover:shadow-[0_0_25px_rgba(99,102,241,0.25)] transition"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${
                    c.priority === "HIGH"
                      ? "bg-red-500/20 text-red-400"
                      : c.priority === "LOW"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {c.priority} Priority
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

            {/* Content */}
            <div className="bg-white/5 p-4 rounded-xl mb-4 border border-white/10">
              <p className="text-sm text-gray-400">{c.message}</p>
            </div>

            {/* Footer */}
            <div className="mt-auto flex justify-between items-center">
              <span className="text-xs text-gray-500">
                Room {c.student?.room?.number || "N/A"}
              </span>

              <span className="text-xs text-gray-400">
                {c.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-white/10 flex justify-between text-sm text-gray-400">
        <p>{complaints.length} / {total}</p>

        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="px-4 py-2 bg-white/5 rounded-lg"
          >
            Prev
          </button>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page * limit >= total}
            className="px-4 py-2 bg-white/5 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

    </div>
  );
}