"use client";

import { useEffect, useRef, useState } from "react";

export default function StatusDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const getStyle = (status) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "FULL":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      case "MAINTENANCE":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      default:
        return "bg-white/10 text-white border-white/20";
    }
  };

  const options = ["AVAILABLE", "FULL", "MAINTENANCE"];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className={`px-4 py-2 rounded-xl text-sm font-medium border transition ${getStyle(
          value
        )}`}
      >
        {value}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-[#0f172a] border border-white/10 rounded-xl shadow-lg overflow-hidden z-50">
          {options.map((status) => (
            <button
              key={status}
              onClick={() => {
                onChange(status);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition ${getStyle(
                status
              )}`}
            >
              {status}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}