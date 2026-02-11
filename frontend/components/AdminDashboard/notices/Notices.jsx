"use client";
import React from "react";
import Card from "../ui/Cards";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { Bell, Calendar, Edit3, Trash2, Plus } from "lucide-react";
import { MOCK_NOTICES } from "../../constants";

const Notices = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] text-white p-6 space-y-8">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Bell className="text-indigo-400" /> Notice Board
        </h2>

        <Button size="sm" className="shadow-[0_0_20px_rgba(99,102,241,0.25)]">
          <Plus size={18} /> New Notice
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {MOCK_NOTICES.map((notice) => (
          <Card
            key={notice.id}
            className="relative group overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 hover:shadow-[0_0_25px_rgba(99,102,241,0.25)] transition"
          >
            {notice.category === "Urgent" && (
              <div className="absolute top-0 right-0 p-1 bg-rose-500 text-white text-[8px] font-bold uppercase tracking-widest -rotate-45 translate-x-4 translate-y-2 w-20 text-center">
                Urgent
              </div>
            )}

            <div className="flex gap-6">
              <div className="hidden sm:flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10">
                <Calendar size={24} className="text-indigo-400 mb-1" />
                <span className="text-[10px] font-bold uppercase text-gray-500">
                  JUN 05
                </span>
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-100">
                    {notice.title}
                  </h3>

                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                    <button className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-indigo-400 transition">
                      <Edit3 size={16} />
                    </button>
                    <button className="p-1.5 hover:bg-rose-500/10 rounded-lg text-gray-400 hover:text-rose-400 transition">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-gray-400 mb-4">
                  {notice.content}
                </p>

                <div className="flex items-center gap-4 text-xs">
                  <Badge variant={notice.category === "Urgent" ? "error" : "info"}>
                    {notice.category}
                  </Badge>
                  <span className="text-gray-500">
                    Expires: {notice.expires}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="bg-white/5 backdrop-blur-md border border-indigo-500/20 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 text-center md:text-left shadow-[0_0_30px_rgba(99,102,241,0.15)]">
        <div className="p-4 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-full">
          <Bell size={48} className="text-indigo-400 animate-pulse" />
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2 text-gray-100">
            Need to reach everyone?
          </h3>
          <p className="text-gray-400 text-sm max-w-md">
            Send a bulk notification via email and SMS to all registered
            students in just one click.
          </p>
        </div>

        <Button
          size="lg"
          className="w-full md:w-auto whitespace-nowrap shadow-[0_0_20px_rgba(99,102,241,0.25)]"
        >
          Broadcast Update
        </Button>
      </div>

    </div>
  );
};

export default Notices;
