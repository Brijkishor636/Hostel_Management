"use client";
import { Menu, Search } from "lucide-react";

export default function Navbar({ setMobileOpen, title }) {
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
          {title}
        </h1>
      </div>

      {/* Centered Search */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex w-[300px] lg:w-[420px] group">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-400 transition"
          size={18}
        />

        <input
          placeholder="Search..."
          className="
            w-full
            bg-white/10
            border border-white/20
            rounded-xl
            pl-10 pr-4 py-2.5
            text-sm text-white
            placeholder-gray-400
            outline-none
            backdrop-blur-md
            transition
            focus:border-indigo-400
            focus:ring-2 focus:ring-indigo-500/30
            hover:bg-white/15
          "
        />
      </div>
    </header>
  );
}