"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, usePathname } from "next/navigation";
import { toast } from "react-toastify";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function WardenProfile() {
  const { id } = useParams();
  const pathname = usePathname();

  const role = pathname.split("/")[1];
  const router = useRouter();

  const [warden, setWarden] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || !role) return;

    const fetchWarden = async () => {
      try {
        const res = await axios.get(
          `${url}/api/v1/${role}/warden/${id}`,
          { withCredentials: true }
        );

        setWarden(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch warden");
      } finally {
        setLoading(false);
      }
    };

    fetchWarden();
  }, [id, role]);

  if (loading) return <p className="text-white p-6">Loading...</p>;
  if (!warden) return <p className="text-red-500 p-6">Warden not found</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] text-white p-6">
        <div className="flex justify-between items-center">
              <Button size="sm" className="bg-indigo-300 hover:bg-indigo-700 text-white" onClick={() => router.back()}>
                ← Back
              </Button>
          </div>

      <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-6">
          
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold">{warden.name}</h2>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div>
            <p className="text-gray-400 text-sm">Email</p>
            <p className="break-all">{warden.email || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Mobile</p>
            <p>{warden.mobNo || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Hostel</p>
            <p>{warden.hostel?.name || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Status</p>
            <p className={warden.isActive ? "text-green-400" : "text-red-400"}>
              {warden.isActive ? "Active" : "Inactive"}
            </p>
          </div>

        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-white/10">
          <button className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600">
            Edit
          </button>

          <button className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600">
            Remove
          </button>
        </div>

      </div>
    </div>
  );
}