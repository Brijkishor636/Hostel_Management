"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, usePathname, useRouter } from "next/navigation";
import Button from "../ui/Button";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function StudentProfile() {
  const { id } = useParams();
  const pathname = usePathname();
  const role = pathname.split("/")[1];
  const router = useRouter();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || !role) return;

    const fetchStudent = async () => {
      try {
        const res = await axios.get(
          `${url}/api/v1/${role}/student/${id}`,
          { withCredentials: true }
        );
        setStudent(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id, role]);

  if (loading) return <p className="text-white p-6">Loading...</p>;
  if (!student) return <p className="text-white p-6">No student found</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] text-white p-6">
      <div className="flex justify-between items-center mb-2">
              <Button size="sm" className="bg-indigo-300 hover:bg-indigo-700 text-white" onClick={() => router.back()}>
                ← Back
              </Button>
          </div>
      <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-6">

        <h2 className="text-2xl font-bold">
          {student.name}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div>
            <p className="text-gray-400 text-sm">Email</p>
            <p>{student.email}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Mobile</p>
            <p>{student.mobNo || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Registration No</p>
            <p>{student.student?.regNo}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Room</p>
            <p>
              {student.student?.room?.number || "Not Assigned"}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Hostel</p>
            <p>{student.hostel?.name}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Status</p>
            <p className={student.isActive ? "text-green-400" : "text-red-400"}>
              {student.isActive ? "Active" : "Inactive"}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}