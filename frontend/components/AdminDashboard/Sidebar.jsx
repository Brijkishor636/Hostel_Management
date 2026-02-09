"use client";

import { FaHome, FaBed, FaUsers, FaMoneyBill } from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-gradient-to-b from-[#020617] to-[#0f172a] border-r border-white/10 sticky top-0 h-screen shadow-xl z-20">

      <h1 className="text-2xl font-bold text-indigo-400 px-6 py-6">
        HostelFlow
      </h1>

      <nav className="px-4 space-y-3">
        <Item icon={<FaHome />} label="Dashboard" />
        <Item icon={<FaBed />} label="Rooms" />
        <Item icon={<FaUsers />} label="Students" />
        <Item icon={<FaMoneyBill />} label="Payments" />
      </nav>

    </aside>
  );
}

function Item({ icon, label }) {
  return (
    <div className="group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition hover:bg-indigo-600/20 hover:shadow-lg hover:shadow-indigo-500/10">
      {icon}
      <span className="group-hover:text-indigo-400">{label}</span>
    </div>
  );
}
