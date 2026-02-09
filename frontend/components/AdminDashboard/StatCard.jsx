"use client";

export default function StatCard({ title, value }) {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0f172a] to-[#020617] border border-white/10 shadow-xl hover:shadow-indigo-500/20 transition hover:-translate-y-1">

      <p className="text-gray-400 text-sm">{title}</p>

      <h2 className="text-3xl font-bold mt-2 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
        {value}
      </h2>

    </div>
  );
}
