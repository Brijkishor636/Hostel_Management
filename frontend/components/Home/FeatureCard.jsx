"use client";

export default function FeatureCard({ icon, title, desc }) {
  return (
    <div className="
      group relative p-6 rounded-2xl
      bg-white/5 backdrop-blur-md
      border border-white/10
      shadow-[0_0_20px_rgba(99,102,241,0.1)]
      hover:shadow-[0_0_40px_rgba(99,102,241,0.35)]
      transition duration-300
      hover:-translate-y-2
    ">
      
      <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-2xl shadow-lg">
        {icon}
      </div>

      <h3 className="text-xl font-semibold text-white mb-2">
        {title}
      </h3>

      <p className="text-gray-400 text-sm leading-relaxed">
        {desc}
      </p>

      <div className="
        absolute inset-0 rounded-2xl
        opacity-0 group-hover:opacity-100
        transition
        border border-indigo-500/40
      " />
    </div>
  );
}
