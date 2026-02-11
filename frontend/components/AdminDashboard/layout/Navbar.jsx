"use client";
import { Menu, Bell, User, Search } from "lucide-react";

export default function Navbar({ setMobileOpen }) {
  return (
    <header
      className="
        sticky top-0 z-40 h-16
        backdrop-blur-md
        border-b border-white/10
        flex items-center justify-between
        px-4 md:px-6
      "
      style={{
        background:
          "linear-gradient(180deg, #020617 0%, #0f172a 40%, #1e1b4b 100%)",
      }}
    >
      <div className="flex items-center gap-3">

        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition"
        >
          <Menu size={22} />
        </button>

        <h1 className="hidden sm:block text-lg font-semibold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Admin Panel
        </h1>
      </div>

      <div className="relative hidden md:flex w-[300px] lg:w-[420px] group">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-400 transition"
          size={18}
        />

        <input
          placeholder="Search students, rooms, payments..."
          className="
            w-full
            bg-white/5
            border border-white/10
            rounded-xl
            pl-10 pr-4 py-2.5
            text-sm text-gray-200
            placeholder-gray-500
            outline-none
            backdrop-blur-md
            transition
            focus:border-indigo-500/40
            focus:ring-2 focus:ring-indigo-500/20
            hover:bg-white/10
          "
        />
      </div>

      <div className="flex items-center gap-3 md:gap-5">

        <button className="relative p-3 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full shadow-[0_0_5px_rgba(236,72,153,0.8)]"></span>
        </button>

        <button
          className="
            w-9 h-9 cursor-pointer
            flex items-center justify-center
            rounded-full
            bg-gradient-to-br from-indigo-500 to-purple-600
            text-white
            shadow-[0_0_7px_rgba(99,102,241,0.6)]
            hover:scale-105
            transition
          "
        >
          <User size={18} />
        </button>

      </div>
    </header>
  );
}
