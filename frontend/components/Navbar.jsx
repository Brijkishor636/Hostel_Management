"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-[0_8px_20px_rgba(0,0,0,0.12)]
  hover:shadow-[0_10px_30px_rgba(0,0,0,0.16)] transition-shadow duration-300">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        <Link href={"/"} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
            H
          </div>
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            HostelFlow
          </h1>
        </Link>

        <div className="hidden md:flex gap-10 text-gray-700 font-medium">
          {["Dashboard","Rooms","Students","Complaints"].map((item,i)=>(
            <Link
              key={i}
              href={`/${item.toLowerCase()}`}
              className="relative group"
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-gradient-to-r from-pink-500 to-purple-600 transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        <div className="hidden md:flex gap-4">
          <Link href={"/login"} className="px-5 py-2 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow-md hover:scale-105 transition">
            Login
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white/90 backdrop-blur-lg px-6 py-4 space-y-3 shadow-lg">
          {["Dashboard","Rooms","Students","Complaints"].map((item,i)=>(
            <Link
              key={i}
              href={`/${item.toLowerCase()}`}
              className="block text-gray-700 font-medium hover:text-purple-600"
            >
              {item}
            </Link>
          ))}
          <button className="w-full mt-3 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold">
            Login
          </button>
        </div>
      )}
    </nav>
  );
}
