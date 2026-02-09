"use client";

export default function GlassCard({ title, children }) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:shadow-indigo-500/10 transition">

      <h3 className="font-semibold mb-4 text-indigo-400">{title}</h3>

      {children}

    </div>
  );
}
