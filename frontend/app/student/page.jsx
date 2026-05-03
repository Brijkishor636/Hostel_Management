"use client";

import React from "react";
import {
  User,
  Fingerprint,
  BookOpen,
  Calendar,
  Phone,
  Mail,
  DoorClosed,
  IndianRupee,
  Wallet,
  AlertCircle,
} from "lucide-react";

export default function Overview() {
  const student = {
    name: "Nishant Kumar",
    studentId: "STU1021",
    course: "B.Tech CSE",
    year: "3rd Year",
    phone: "+91 9876543210",
    email: "nishant@gmail.com",
    room: "A-101",
    rent: "₹4,000",
    dues: "₹1,500",
    complaints: 2,
  };

  const InfoRow = ({
    icon: Icon,
    label,
    value,
    valueClass = "text-gray-100",
  }) => (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition">
      <div className="p-2 bg-indigo-500/10 rounded-md text-indigo-400">
        <Icon size={16} />
      </div>
      <div className="leading-tight">
        <p className="text-xs text-gray-400">{label}</p>
        <p className={`text-sm font-semibold ${valueClass}`}>{value}</p>
      </div>
    </div>
  );

  const Card = ({ title, children }) => (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl hover:shadow-[0_0_20px_rgba(99,102,241,0.25)] transition">
      <h2 className="text-sm font-semibold mb-3 text-gray-300 border-b border-white/10 pb-2">
        {title}
      </h2>
      <div className="space-y-2">{children}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] text-white p-4 md:p-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Student Overview
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage student details and hostel info
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Personal */}
        <Card title="Personal Info">
          <InfoRow icon={User} label="Name" value={student.name} />
          <InfoRow icon={Fingerprint} label="ID" value={student.studentId} />
          <InfoRow icon={BookOpen} label="Course" value={student.course} />
          <InfoRow icon={Calendar} label="Year" value={student.year} />
        </Card>

        {/* Contact */}
        <Card title="Contact">
          <InfoRow icon={Phone} label="Phone" value={student.phone} />
          <InfoRow icon={Mail} label="Email" value={student.email} />
        </Card>

        {/* Hostel */}
        <Card title="Hostel">
          <InfoRow icon={DoorClosed} label="Room" value={student.room} />
          <InfoRow icon={IndianRupee} label="Rent" value={student.rent} />
        </Card>

        {/* Status */}
        <Card title="Status">
          <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/10 rounded-md text-red-400">
                <Wallet size={16} />
              </div>
              <div>
                <p className="text-xs text-gray-400">Dues</p>
                <p className="text-sm font-semibold">{student.dues}</p>
              </div>
            </div>

            {student.dues !== "₹0" && (
              <span className="text-[10px] px-2 py-1 bg-red-500/10 text-red-400 rounded-full">
                Action
              </span>
            )}
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/10 rounded-md text-yellow-400">
                <AlertCircle size={16} />
              </div>
              <div>
                <p className="text-xs text-gray-400">Complaints</p>
                <p className="text-sm font-semibold">
                  {student.complaints}
                </p>
              </div>
            </div>

            {student.complaints > 0 && (
              <span className="text-[10px] px-2 py-1 bg-yellow-500/10 text-yellow-400 rounded-full">
                Pending
              </span>
            )}
          </div>
        </Card>

      </div>
    </div>
  );
}