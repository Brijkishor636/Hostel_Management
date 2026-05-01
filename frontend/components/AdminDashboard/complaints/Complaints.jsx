"use client";
import React, { useState } from "react";
import { MessageSquare, Clock, CheckCircle, Send } from "lucide-react";
import Card from "../ui/Cards";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { usePathname } from "next/navigation";
import { useComplaints } from "../../../hooks/useComplaints";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

const Complaints = () => {
  const pathname = usePathname();
  const role = pathname.split("/")[1];

  const [tab, setTab] = useState("PENDING");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { complaints, total, setRefresh } = useComplaints({
    role,
    status: tab,
    page,
    limit,
  });

  const handleResolve = async (id) => {
    try {
      await axios.patch(
        `${url}/api/v1/${role}/complaints/${id}/status`,
        { status: "RESOLVED" },
        { withCredentials: true }
      );

      setRefresh((p) => !p);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] text-white p-6 space-y-8">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <MessageSquare className="text-indigo-400" /> Support Tickets
        </h2>

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {complaints.map((c) => (
          <Card
            key={c.id}
            className="border-l-4 border-indigo-500 flex flex-col h-full bg-white/5 backdrop-blur-md border border-white/10 hover:shadow-[0_0_25px_rgba(99,102,241,0.25)] transition"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <Badge
                  variant={
                    c.priority === "HIGH"
                      ? "error"
                      : c.priority === "MEDIUM"
                      ? "warning"
                      : "success"
                  }
                >
                  {c.priority} Priority
                </Badge>

                <h3 className="text-lg font-bold mt-2 text-gray-100">
                  {c.title}
                </h3>
              </div>

              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Clock size={12} />{" "}
                {new Date(c.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="bg-white/5 p-4 rounded-xl mb-4 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow-md">
                  {c.student?.user?.name?.charAt(0) || "S"}
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-200">
                    {c.student?.user?.name || "Student"}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    Room {c.student?.room?.number || "N/A"}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-400 line-clamp-2">
                {c.message}
              </p>
            </div>

            {tab === "PENDING" && (
              <div className="mt-auto flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Type a reply..."
                    className="w-full bg-[#020617]/80 border border-white/10 rounded-lg py-2 pl-4 pr-10 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-400">
                    <Send size={14} />
                  </button>
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  className="!px-3"
                  onClick={() => handleResolve(c.id)}
                >
                  <CheckCircle size={16} />
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* ✅ PAGINATION */}
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
};

export default Complaints;