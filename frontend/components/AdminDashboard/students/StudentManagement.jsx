"use client";
import React, { useState, useEffect } from "react";
import Card from "../ui/Cards";
import axios from "axios";
import Button from "../ui/Button";
import {
  Search,
  Filter,
  Plus,
  UserPlus,
  X as CloseIcon,
  Download,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { useStudents } from "../../../hooks/useStudents";

const StudentManagement = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 15;

  const router = useRouter();
  const pathname = usePathname();

  const role = pathname.startsWith("/warden") ? "warden" : "admin";

  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const { students, total, loading, setRefresh } = useStudents({
    role,
    page,
    limit,
    search: debouncedSearch,
  });

  const clearSearch = () => setSearch("");

  const baseRoute = pathname.startsWith("/warden") ? "/warden" : "/admin";

  const deleteStudent = async (id) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/${role}/student/${id}`,
        { withCredentials: true }
      );
      setRefresh((prev) => !prev);
    } catch (err) {
      console.error("Error deleting student", err);
    }
  };

  if (loading) return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] text-white p-4 space-y-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-xl sm:text-3xl font-bold flex items-center gap-3">
            <UserPlus className="text-indigo-400 w-6 h-6 sm:w-8 sm:h-8" />
            Student Directory
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Manage and monitor all student residents and their status.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <Button
            onClick={() =>
              router.push(`${baseRoute}/students/inactive-students`)
            }
            className="cursor-pointer"
          >
            Inactive Students
          </Button>

          <Button
            onClick={() => router.push(`${baseRoute}/students/create`)}
            size="lg"
            className="shadow-indigo-500/20 cursor-pointer"
          >
            <Plus size={20} /> Add New Student
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col lg:flex-row items-center gap-4 p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500/20 via-purple-300/20 to-indigo-500/20">
        <div className="flex flex-col lg:flex-row items-center gap-4 w-full bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-2">

          <div className="relative flex-1 w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />

            <input
              type="text"
              placeholder="Search students..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full bg-transparent border border-white/10 rounded-xl py-3 pl-10 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/40 placeholder:text-gray-500"
            />

            <div className="absolute inset-y-0 right-3 flex items-center">
              <AnimatePresence>
                {search && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={clearSearch}
                    className="p-1 hover:bg-white/10 rounded-lg text-gray-400"
                  >
                    <CloseIcon size={14} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex w-full lg:w-auto gap-2 md:gap-3">
            <button className="flex-1 md:flex-none flex items-center justify-center px-3 md:px-4 py-2 md:py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300">
              <Filter size={16} />
            </button>

            <button className="flex-1 md:flex-none flex items-center justify-center px-3 md:px-4 py-2 md:py-3 rounded-xl bg-gradient-to-r from-indigo-400 to-gray-400 text-white">
              <Download size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Table + Mobile Cards */}
      <Card className="!p-0 overflow-hidden border-white/10 bg-white/5 backdrop-blur-md">

        {/* Desktop */}
        <div className="overflow-x-auto hidden md:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-gray-400 text-[11px]">
              <tr>
                <th className="px-8 py-5">Resident Info</th>
                <th className="px-6 py-5">Room</th>
                <th className="px-6 py-5">Email Address</th>
                <th className="px-6 py-5">Reg No</th>
                <th className="px-8 py-5 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="px-8 py-5">{student.name}</td>
                  <td className="px-6 py-5">
                    {student.student?.room?.number || "N/A"}
                  </td>
                  <td className="px-6 py-5">{student.email}</td>
                  <td className="px-6 py-5">
                    {student.student?.regNo}
                  </td>

                  <td className="px-8 py-5 text-right">
                    <button
                      onClick={() => deleteStudent(student.id)}
                      className={`px-3 py-1 rounded-lg text-xs cursor-pointer ${
                        student.isActive
                          ? "bg-red-500/20 text-red-400"
                          : "bg-emerald-500/20 text-emerald-400"
                      }`}
                    >
                      {student.isActive ? "Inactive" : "Active"}
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
                Room: {student.student?.room?.number || "N/A"}
              </p>
              <p className="text-sm text-gray-400">
                Reg No: {student.student?.regNo}
              </p>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => deleteStudent(student.id)}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    student.isActive
                      ? "bg-red-500/20 text-red-400"
                      : "bg-emerald-500/20 text-emerald-400"
                  }`}
                >
                  {student.isActive ? "Inactive" : "Active"}
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
};

export default StudentManagement;