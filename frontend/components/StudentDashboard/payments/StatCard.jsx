export default function StatCard({ title, value }) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl hover:shadow-[0_0_10px_rgba(99,102,241,0.25)] transition">

      <h3 className="text-xs text-gray-400 uppercase tracking-wide">
        {title}
      </h3>

      <p className="text-md md:text-xl font-bold mt-2 text-white">
        {value}
      </p>

    </div>
  );
}