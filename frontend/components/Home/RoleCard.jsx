"use client";
import Image from "next/image";

export default function RoleCard({ title, desc, img, btnText }) {
  return (
    <div className="
      group relative rounded-3xl overflow-hidden
      bg-white/5 backdrop-blur-md border border-white/10
      shadow-[0_0_25px_rgba(99,102,241,0.15)]
      hover:shadow-[0_0_45px_rgba(139,92,246,0.4)]
      transition duration-300 hover:-translate-y-2
    ">
      <div className="relative h-48 w-full">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover opacity-80 group-hover:opacity-100 transition"
        />
      </div>

      <div className="p-6 text-center">
        <h3 className="text-2xl font-semibold text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-400 text-sm mb-5 leading-relaxed">
          {desc}
        </p>

        <button className="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition">
          {btnText}
        </button>
      </div>

      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 border border-indigo-500/40 transition"/>
    </div>
  );
}
