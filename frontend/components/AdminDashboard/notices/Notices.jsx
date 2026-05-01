"use client";
import React, { useEffect, useState } from "react";
import Card from "../ui/Cards";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Swal from "sweetalert2";
import { Bell, Calendar, Edit3, Trash2, Plus } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

const Notices = () => {
  const router = useRouter();
  const pathname = usePathname();
  const role = pathname.split("/")[1];

  const [notices, setNotices] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [editType, setEditType] = useState("GENERAL");

  const fetchNotices = async () => {
    try {
      const res = await axios.get(
        `${url}/api/v1/${role}/notices?t=${Date.now()}`,
        { withCredentials: true }
      );
      setNotices(res.data || []);
    } catch (e) {
      console.error(e);
      setNotices([]);
    }
  };

  useEffect(() => {
    if (!role) return;
    fetchNotices();
  }, [role]);

  const handleDelete = async (id) => {
    try {
    const result = await Swal.fire({
      title: "Delete notice?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6366f1",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      background: "#020617",
      color: "#fff",
    });

    if (!result.isConfirmed) return;

      await axios.delete(
        `${url}/api/v1/${role}/notices/${id}`,
        { withCredentials: true }
      );

      toast.success("Notice deleted");
      fetchNotices();
    } catch (e) {
      console.error(e);
      toast.error("Delete failed");
    }
  };

  const handleUpdateType = async () => {
    try {
      await axios.patch(
        `${url}/api/v1/${role}/notices/${selectedNotice.id}`,
        { type: editType },
        { withCredentials: true }
      );

      toast.success("Notice updated successfully");
      setShowEditModal(false);
      fetchNotices();
    } catch (e) {
      console.error(e);
      toast.error("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] text-white p-6 space-y-8">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Bell className="text-indigo-400" /> Notice Board
        </h2>

        <Button
          onClick={() => router.push(`/${role}/notices/create`)}
          size="sm"
          className="shadow-[0_0_20px_rgba(99,102,241,0.25)]"
        >
          <Plus size={18} /> New Notice
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {notices.map((notice) => (
          <Card
            key={notice.id}
            onClick={() => router.push(`/${role}/notices/${notice.id}`)}
            className="relative group overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 hover:shadow-[0_0_15px_rgba(99,102,241,0.25)] transition"
          >
            {notice.type === "URGENT" && (
              <div className="absolute bottom-6 right-0 p-1 bg-rose-500 text-white text-[8px] font-bold uppercase tracking-widest -rotate-45 translate-x-4 translate-y-2 w-20 text-center">
                Urgent
              </div>
            )}

            <div className="flex gap-6">
              <div className="hidden sm:flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10">
                <Calendar size={24} className="text-indigo-400 mb-1" />
                <span className="text-[10px] font-bold uppercase text-gray-500">
                  {new Date(notice.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                  })}
                </span>
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-100">
                    {notice.title}
                  </h3>

                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedNotice(notice);
                        setEditType(notice.type);
                        setShowEditModal(true);
                      }}
                      className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-indigo-400 transition"
                    >
                      <Edit3 size={16} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(notice.id);
                      }}
                      className="p-1.5 hover:bg-rose-500/10 rounded-lg text-gray-400 hover:text-rose-400 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-gray-400 mb-4">
                  {notice.description}
                </p>

                <div className="flex items-center gap-4 text-xs">
                  <Badge variant={notice.type === "URGENT" ? "error" : "info"}>
                    {notice.type}
                  </Badge>

                  {notice.expiresAt && (
                    <span className="text-gray-500">
                      Expires: {new Date(notice.expiresAt).toLocaleDateString()}
                    </span>
                  )}
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

      {showEditModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#020617] border border-white/10 rounded-2xl p-6 w-[90%] max-w-sm space-y-5">
            <h3 className="text-lg font-bold">Update Notice Type</h3>

            <select
              value={editType}
              onChange={(e) => setEditType(e.target.value)}
              className="w-full bg-[#020617]/80 border border-white/10 rounded-lg px-4 py-2 text-sm"
            >
              <option value="GENERAL">General</option>
              <option value="URGENT">Urgent</option>
            </select>

            <div className="flex justify-end gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </Button>

              <Button size="sm" onClick={handleUpdateType}>
                Update
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Notices;