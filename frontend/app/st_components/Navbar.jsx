import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center bg-gray-900 text-white p-4 rounded-xl">
      <input
        type="text"
        placeholder="Search..."
        className="bg-gray-800 p-2 rounded-lg outline-none"
      />
      <div className="flex items-center gap-4">

  <Link
    href="/login"
    className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700"
  >
    Login
  </Link>

  <Link
    href="/signup"
    className="border border-purple-500 px-4 py-2 rounded-lg hover:bg-purple-600"
  >
    Signup
  </Link>

</div>
    </div>
  );
}
