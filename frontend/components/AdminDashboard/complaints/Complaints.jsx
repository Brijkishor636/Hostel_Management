"use client";
import React from "react";
import { MessageSquare, Clock, CheckCircle, Send } from "lucide-react";
import { MOCK_COMPLAINTS } from "../../constants";
import Card from "../ui/Cards";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

const Complaints = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] text-white p-6 space-y-8">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <MessageSquare className="text-indigo-400" /> Support Tickets
        </h2>

        <div className="flex bg-white/5 backdrop-blur-md p-1 rounded-xl border border-white/10">
          <button className="px-4 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md">
            Open
          </button>
          <button className="px-4 py-1.5 rounded-lg text-xs font-medium text-gray-400 hover:text-white transition">
            Resolved
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_COMPLAINTS.map((complaint) => (
          <Card
            key={complaint.id}
            className="border-l-4 border-indigo-500 flex flex-col h-full bg-white/5 backdrop-blur-md border border-white/10 hover:shadow-[0_0_25px_rgba(99,102,241,0.25)] transition"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <Badge variant={complaint.priority === "High" ? "error" : "warning"}>
                  {complaint.priority} Priority
                </Badge>
                <h3 className="text-lg font-bold mt-2 text-gray-100">
                  {complaint.subject}
                </h3>
              </div>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Clock size={12} /> {complaint.date}
              </span>
            </div>

            <div className="bg-white/5 p-4 rounded-xl mb-4 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow-md">
                  {complaint.studentName.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-200">
                    {complaint.studentName}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    Room {complaint.room}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-400 line-clamp-2">
                Student reported an issue regarding{" "}
                {complaint.subject.toLowerCase()} in their room. Immediate
                assistance is requested.
              </p>
            </div>

            <div className="mt-auto flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Type a reply..."
                  className="w-full bg-[#020617]/80 border border-white/10 rounded-lg py-2 pl-4 pr-10 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 transition placeholder:text-gray-600"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-indigo-300 transition">
                  <Send size={14} />
                </button>
              </div>

              <Button variant="secondary" size="sm" className="!px-3">
                <CheckCircle size={16} />
              </Button>
            </div>
          </Card>
        ))}
      </div>

    </div>
  );
};

export default Complaints;
