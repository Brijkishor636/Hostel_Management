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
    <>
      {/* Optional Font */}
      <style>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");

          *{
            font-family: "Poppins", sans-serif;
          }
        `}
      </style>

      <section className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center px-4 py-8">

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[500px] md:h-[500px] bg-purple-500/30 rounded-full blur-[150px] pointer-events-none"></div>

        {/* Main Container */}
        <div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row items-center gap-10 lg:gap-20">

          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">

            <div className="inline-flex items-center border border-purple-500/20 rounded-full px-4 py-2 text-sm text-gray-300 bg-white/5 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
              Student Complaint Portal
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-white via-purple-200 to-pink-400 bg-clip-text text-transparent">
              Raise Your Hostel Complaint Easily
            </h1>

            <p className="mt-5 text-gray-400 text-sm sm:text-base max-w-lg mx-auto lg:mx-0 leading-7">
              Submit your complaint directly to the hostel administration.
              Track issues faster and improve hostel management digitally.
            </p>

            {/* Small Features */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">

              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm text-gray-300">
                Fast Response
              </div>

              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm text-gray-300">
                Easy Tracking
              </div>

              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm text-gray-300">
                Secure System
              </div>

            </div>
          </div>

          {/* Form Section */}
          <div className="w-full max-w-xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">

            <h2 className="text-2xl font-semibold text-white text-center mb-8">
              Add Complaint
            </h2>

            <div className="space-y-6">

              {/* Title */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Complaint Title
                </label>

                <input
                  type="text"
                  placeholder="Enter complaint title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#0f172a]/80 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Description
                </label>

                <textarea
                  rows={5}
                  placeholder="Describe your issue..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#0f172a]/80 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition resize-none"
                />
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Priority
                </label>

                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full bg-[#0f172a]/80 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition"
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
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/20"
              >
                {loading ? "Submitting..." : "Submit Complaint"}
              </button>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}