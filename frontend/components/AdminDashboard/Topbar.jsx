"use client";

import { FaBell, FaUserCircle } from "react-icons/fa";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur-md bg-[#020617]/80 border-b border-indigo-500/20 px-6 py-4 flex justify-between items-center">

      <input
        placeholder="Search..."
        className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg outline-none focus:border-indigo-400 transition w-64"
      />

      <div className="flex gap-4 text-xl">
        <div className="p-2 rounded-full bg-white/5 hover:bg-indigo-500/20 cursor-pointer">
          <FaBell />
        </div>
        <div className="p-2 rounded-full bg-white/5 hover:bg-indigo-500/20 cursor-pointer">
          <FaUserCircle />
        </div>
      </div>

    </header>
  );
}
