"use client";
import { useState } from "react";

export default function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-300 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex justify-between items-center font-semibold text-gray-800"
      >
        {question}
        <span className="text-xl">{open ? "-" : "+"}</span>
      </button>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          open ? "max-h-40 mt-2" : "max-h-0"
        }`}
      >
        <p className="text-sm text-gray-600">{answer}</p>
      </div>
    </div>
  );
}
