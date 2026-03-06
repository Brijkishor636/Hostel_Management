export default function StatCard({ title, value }) {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg">
      <h3 className="text-gray-400">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
