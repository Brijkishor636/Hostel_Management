"use client";
import React from "react";
import Card from "../AdminDashboard/ui/Cards";
import Badge from "../AdminDashboard/ui/Badge";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AlertCircle, Activity } from "lucide-react";
import { MOCK_COMPLAINTS } from "../constants";
import { usePathname } from "next/navigation";
import { useDashboardData } from "../../hooks/useDashboardData";
import StatCardWrapper from "./common/StatCardWrapper"

const chartData = [
  { name: "Mon", checkins: 60 },
  { name: "Tue", checkins: 75 },
  { name: "Wed", checkins: 68 },
  { name: "Thu", checkins: 82 },
  { name: "Fri", checkins: 77 },
  { name: "Sat", checkins: 64 },
];

const WardenDashboard = () => {
  const pathname = usePathname();
  const role = pathname.split("/")[1];

  const {
    totalStudents,
    totalRooms,
    occupiedRooms,
    loading,
  } = useDashboardData(role);

  if (!role || loading) {
    return <p className="text-white p-6">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] text-white p-6 space-y-8">

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCardWrapper
          totalStudents={totalStudents}
          totalRooms={totalRooms}
          occupiedRooms={occupiedRooms}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <Card className="lg:col-span-2 bg-white/5 backdrop-blur-md border border-white/10 hover:shadow-[0_0_10px_rgba(99,102,241,0.25)] transition duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
              <Activity className="text-indigo-400" size={20} />
              Weekly Attendance
            </h3>

            <select className="bg-white/5 border border-white/10 rounded-xl text-sm px-3 py-2 text-gray-300 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-indigo-500/30">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" axisLine={false} tickLine={false} />
                <YAxis stroke="#9ca3af" axisLine={false} tickLine={false} />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#020617",
                    border: "1px solid #1f2937",
                    borderRadius: "14px",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="checkins"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorAttendance)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="bg-white/5 backdrop-blur-md border border-white/10 hover:shadow-[0_0_35px_rgba(244,63,94,0.15)] transition duration-300">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-white">
            <AlertCircle className="text-rose-400" size={20} />
            Student Complaints
          </h3>

          <div className="space-y-4">
            {MOCK_COMPLAINTS.map((complaint) => (
              <div
                key={complaint.id}
                className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-sm text-gray-200">
                    {complaint.subject}
                  </h4>

                  <Badge
                    variant={
                      complaint.priority === "High" ? "error" : "warning"
                    }
                  >
                    {complaint.priority}
                  </Badge>
                </div>

                <p className="text-xs text-gray-400 mb-3">
                  From: {complaint.studentName} (Room {complaint.room})
                </p>

                <div className="flex justify-between items-center text-[11px] text-gray-500">
                  <span>{complaint.date}</span>

                  <button className="text-indigo-400 hover:text-indigo-300 transition">
                    Resolve →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 text-center text-sm text-gray-400 hover:text-white transition">
            View All Complaints
          </button>
        </Card>

      </div>
    </div>
  );
};

export default WardenDashboard;