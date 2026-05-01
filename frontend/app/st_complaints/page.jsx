"use client";

import { useState } from "react";
import Sidebar from "../../components/StudentDashboard/Sidebar";
import Navbar from "../../components/StudentDashboard/Navbar";

const dummyComplaints = [
  {
    id: 1,
    title: "Water leakage in bathroom",
    date: "2026-02-10",
    status: "Pending",
  },
  {
    id: 2,
    title: "Fan not working",
    date: "2026-02-05",
    status: "Resolved",
  },
  {
    id: 3,
    title: "WiFi connection issue",
    date: "2026-02-01",
    status: "In Progress",
  },
];

export default function ComplaintsPage() {

  const [complaints, setComplaints] = useState(dummyComplaints);
  const [title, setTitle] = useState("");

  // Add Complaint
  const addComplaint = () => {
    if (!title) return;

    const newComplaint = {
      id: Date.now(),
      title: title,
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
    };

    setComplaints([newComplaint, ...complaints]);
    setTitle("");
  };

  // Delete Complaint
  const deleteComplaint = (id) => {
    const updatedComplaints = complaints.filter((c) => c.id !== id);
    setComplaints(updatedComplaints);
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 bg-[#0f172a] min-h-screen text-white">
        <Navbar />

        <h1 className="text-2xl font-bold mb-6">My Complaints</h1>

        {/* Add Complaint Section */}
        <div className="bg-[#1e293b] p-4 rounded-xl mb-6 flex gap-3">
          <input
            type="text"
            placeholder="Enter complaint..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 p-2 rounded bg-[#0f172a] border border-gray-700"
          />

          <button
            onClick={addComplaint}
            className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Add
          </button>
        </div>

        {/* Complaints List */}
        <div className="space-y-4">
          {complaints.map((complaint) => (
            <div
              key={complaint.id}
              className="bg-[#1e293b] p-4 rounded-xl flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">{complaint.title}</h2>

                <p className="text-sm text-gray-400">
                  Date: {complaint.date}
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Status */}
                <span
                  className={`px-4 py-1 rounded-full text-sm font-medium ${
                    complaint.status === "Resolved"
                      ? "bg-green-500/20 text-green-400"
                      : complaint.status === "In Progress"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {complaint.status}
                </span>

                {/* Delete Button */}
                <button
                  onClick={() => deleteComplaint(complaint.id)}
                  className="bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}