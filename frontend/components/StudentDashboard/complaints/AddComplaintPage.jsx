"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddComplaintPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [loading, setLoading] = useState(false);

  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const handleSubmit = async () => {
    if (!title || !message) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        `${url}/api/v1/student/complaints`,
        {
          title,
          message,
          priority,
        },
        {
          withCredentials: true,
        }
      );

      toast.success("Complaint submitted successfully");
      router.push("/student/complaints");
    } catch (error) {
      toast.error(
        error?.response?.data?.msg || "Failed to submit complaint"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] text-white px-4">

      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 space-y-6 shadow-xl">

        <h1 className="text-2xl font-bold text-center">
          Add Complaint
        </h1>

        {/* Title */}
        <div>
          <label className="text-sm text-gray-200">Title</label>
          <input
            type="text"
            placeholder="Enter complaint title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-2 bg-[#020617]/80 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
          />
        </div>

        {/* Message */}
        <div>
          <label className="text-sm text-gray-200">Description</label>
          <textarea
            rows={5}
            placeholder="Describe your issue..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full mt-2 bg-[#020617]/80 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
          />
        </div>

        {/* Priority */}
        <div>
          <label className="text-sm text-gray-200">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full mt-2 bg-[#020617]/80 border border-white/10 rounded-lg px-4 py-3 text-sm"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 cursor-pointer rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium hover:scale-[1.01] transition duration-200 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Complaint"}
        </button>

      </div>
    </div>
  );
}