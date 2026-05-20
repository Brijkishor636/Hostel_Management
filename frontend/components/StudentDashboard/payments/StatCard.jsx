export default function StatCard({ title, value }) {
  return (
    <div className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:scale-[1.02] hover:border-purple-500/30 hover:shadow-[0_0_10px_rgba(139,92,246,0.15)]">

      {/* Glow */}
      <div className="absolute -top-8 -right-8 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"></div>

      <div className="relative z-10">
        <h3 className="text-[11px] sm:text-xs uppercase tracking-widest text-gray-400">
          {title}
        </h3>

        <p className="text-xl sm:text-2xl font-bold mt-3 text-white break-words">
          {value}
        </p>
      </div>
    </div>
  );
}