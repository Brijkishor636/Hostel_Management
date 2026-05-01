export default function StatCard({ title, value }) {
  return (
    <div className="bg-gray-900 p-6 rounded-xl">
      <p className="text-gray-400">{title}</p>
      <h2 className="text-white text-2xl font-bold">{value}</h2>
    </div>
  );
}