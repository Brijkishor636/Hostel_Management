"use client";
export default function StepItem({ icon, title, desc }) {
  return (
    <div className="group relative p-8 rounded-2xl text-center bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:shadow-indigo-500/30 transition hover:-translate-y-2">
      <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-2xl shadow-lg group-hover:scale-110 transition">
        {icon}
      </div>

      <h3 className="mt-6 text-xl font-semibold text-white">{title}</h3>
      <p className="text-gray-400 text-sm mt-2">{desc}</p>
    </div>
  );
}
