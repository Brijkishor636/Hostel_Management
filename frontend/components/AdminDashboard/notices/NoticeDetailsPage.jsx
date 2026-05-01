"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, usePathname, useRouter } from "next/navigation";
import Card from "../ui/Cards";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { Calendar, Bell } from "lucide-react";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function NoticeDetailsPage() {
  const { id } = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const role = pathname.split("/")[1];

  const [notice, setNotice] = useState(null);

  const fetchNotice = async () => {
    try {
      const res = await axios.get(
        `${url}/api/v1/${role}/notices/${id}`,
        { withCredentials: true }
      );
      setNotice(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchNotice();
  }, [id]);

  if (!notice) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] text-white p-4 sm:p-6 space-y-6">

      <div className="flex justify-between items-center">
        <Button size="sm" className="bg-indigo-300 hover:bg-indigo-700 text-white" onClick={() => router.back()}>
          ← Back
        </Button>
      </div>

      <Card className="bg-white/5 backdrop-blur-md border border-white/10 p-6 space-y-6">

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-100">
              {notice.title}
            </h1>

            <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
              <Calendar size={14} />
              <span>
                {new Date(notice.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <Badge variant={notice.type === "URGENT" ? "error" : "info"}>
            {notice.type}
          </Badge>
        </div>

        <div className="border-t border-white/10 pt-4">
          <p className="text-gray-300 text-sm leading-relaxed">
            {notice.description}
          </p>
        </div>

        {notice.expiresAt && (
          <div className="border-t border-white/10 pt-4 text-sm text-gray-400">
            Expires on:{" "}
            <span className="text-gray-200">
              {new Date(notice.expiresAt).toLocaleDateString()}
            </span>
          </div>
        )}

      </Card>

      <div className="bg-white/5 backdrop-blur-md border border-indigo-500/20 rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left shadow-[0_0_30px_rgba(99,102,241,0.15)]">
        <div className="p-4 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-full">
          <Bell size={36} className="text-indigo-400 animate-pulse" />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-100">
            Stay Updated
          </h3>
          <p className="text-gray-400 text-sm">
            Keep checking notices regularly to stay informed about hostel updates.
          </p>
        </div>
      </div>

    </div>
  );
}