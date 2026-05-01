"use client";

import React, { useState } from "react";
import Card from "../ui/Cards";
import { UserPlus } from "lucide-react";
import { usePathname } from "next/navigation";
import { useInactiveStudents } from "../../../hooks/useInactiveStudents";
import axios from "axios";
import { toast } from "react-toastify";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function InactiveStudents() {
  const [page, setPage] = useState(1);
  const limit = 15;

  const pathname = usePathname();
  const role = pathname.startsWith("/warden") ? "warden" : "admin";
  const { students, total, loading, setRefresh } = useInactiveStudents({
    role,
    page,
    limit
  });

  const activateStudent = async (id) => {
  try {
    const res = await axios.put(
      `${url}/api/v1/${role}/inactive/${id}`,{},
      { withCredentials: true }
    );
    setRefresh(prev => !prev);
    toast.success(res.data?.msg || "Student activated",{
        position: "top-center"
    });

  } catch (err) {
    console.error(err);
    toast.error(
      err?.response?.data?.msg || "Failed to activate student", {position: "bottom-right"});
  }
};

  if (loading) return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] text-white p-4 space-y-10">

      <div>
        <h2 className="text-xl sm:text-3xl font-bold flex items-center gap-3">
          <UserPlus className="text-indigo-400 w-6 h-6 sm:w-8 sm:h-8" />
          Inactive Students
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          List of all inactive students in the hostel.
        </p>
      </div>

      <Card className="!p-0 overflow-hidden border-white/10 bg-white/5 backdrop-blur-md">

        {/* Desktop */}
        <div className="overflow-x-auto hidden md:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-gray-400 text-[11px]">
              <tr>
                <th className="px-8 py-5">Resident Info</th>
                <th className="px-6 py-5">Email Address</th>
                <th className="px-6 py-5">Reg No</th>
                <th className="px-8 py-5 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="px-8 py-5">{student.name}</td>
                  <td className="px-6 py-5">{student.email}</td>
                  <td className="px-6 py-5">
                    {student.student?.regNo}
                  </td>

                  <td className="px-8 py-5 text-right">
                    <button
                      onClick={() => activateStudent(student.id)}
                      className="px-4 py-2 rounded-lg text-sm 
                      bg-emerald-500/20 text-emerald-400 
                      hover:bg-emerald-500/30 
                      transition cursor-pointer"
                    >
                      Active
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex flex-col divide-y divide-white/5">
          {students.map((student) => (
            <div key={student.id} className="p-4 space-y-2">
              <p className="font-semibold">{student.name}</p>
              <p className="text-sm text-gray-400">{student.email}</p>
              <p className="text-sm text-gray-400">
                Reg No: {student.student?.regNo}
              </p>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => activateStudent(student.id)}
                  className="px-4 py-2 rounded-lg text-sm 
                  bg-emerald-500/20 text-emerald-400 
                  hover:bg-emerald-500/30 
                  transition cursor-pointer"
                >
                  Active
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 flex justify-between text-sm text-gray-400">
          <p>{students.length} / {total}</p>

          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className="px-4 py-2 bg-white/5 rounded-lg"
            >
              Prev
            </button>

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page * limit >= total}
              className="px-4 py-2 bg-white/5 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

      </Card>
    </div>
  );
}