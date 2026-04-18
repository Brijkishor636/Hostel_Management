export default function UpdatePopup({
  capacity,
  setCapacity,
  onClose,
  onUpdate,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-[#0f172a] p-6 rounded-lg w-80 border border-white/10">
        <h3 className="text-white mb-4 font-semibold">
          Update Capacity
        </h3>

        <input
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          className="w-full p-2 rounded-lg bg-white/10 text-white outline-none mb-4"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-rose-500 hover:bg-rose-600 text-white transition"
          >
            Cancel
          </button>

          <button
            onClick={onUpdate}
            className="bg-indigo-500 px-3 py-1 rounded-lg text-white hover:bg-indigo-600 transition"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}