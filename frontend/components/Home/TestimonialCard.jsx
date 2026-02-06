"use client";

export default function TestimonialCard({ name, role, quote, avatar }) {
  return (
    <div className="
      group relative p-6 rounded-2xl
      bg-white/5 backdrop-blur-md border border-white/10
      shadow-[0_0_20px_rgba(99,102,241,0.15)]
      hover:shadow-[0_0_40px_rgba(139,92,246,0.4)]
      transition duration-300 hover:-translate-y-2
    ">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-full overflow-hidden border border-indigo-500/40">
          <img src={avatar} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="text-white font-semibold">{name}</h4>
          <p className="text-gray-400 text-sm">{role}</p>
        </div>
      </div>

      <p className="text-gray-300 text-sm leading-relaxed">
        “{quote}”
      </p>

      <div className="
        absolute inset-0 rounded-2xl
        opacity-0 group-hover:opacity-100
        border border-indigo-500/40 transition
      " />
    </div>
  );
}
