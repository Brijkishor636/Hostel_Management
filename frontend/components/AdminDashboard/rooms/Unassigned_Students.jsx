"use client";

import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import UserContext from "../../../context/UserContext";
import { toast } from "react-toastify";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Unassigned_Students() {
  const { user } = useContext(UserContext);
  const { id: roomId } = useParams();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const role = user?.role?.toLowerCase();

  useEffect(() => {
    if (!role) return;

    const fetchStudents = async () => {
      try {
        const res = await axios.get(
          `${url}/api/v1/${role}/unassigned-student`,
          { withCredentials: true }
        );
        setStudents(res.data.students || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [role]);

  const assignStudent = async (studentId) => {
    try {
      const res = await axios.post(
        `${url}/api/v1/${role}/rooms/allocate`,
        { studentId, roomId },
        { withCredentials: true }
      );

      toast.success(res.data.msg);

      setStudents((prev) =>
        prev.filter((s) => s.id !== studentId)
      );

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.msg || "Error assigning room");
    }
  };

  if (!user) return <p className="text-white p-6">Loading user...</p>;
  if (loading) return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] text-white p-4 md:p-8">

      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Unassigned Students
      </h1>

      <div className="max-w-7xl mx-auto bg-gradient-to-r from-[#0f172a] to-[#1e293b] border border-white/10 rounded-2xl overflow-hidden shadow-lg">

        <div className="hidden md:grid grid-cols-4 px-8 py-5 text-gray-400 text-sm font-semibold border-b border-white/10">
          <p>Resident Info</p>
          <p>Email Address</p>
          <p>Mobile No</p>
          <p className="text-right">Action</p>
        </div>

        {students.length === 0 ? (
          <p className="p-10 text-center text-gray-400">
            No unassigned students found.
          </p>
        ) : (
          students.map((student) => (
            <div
              key={student.id}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 px-8 py-6 items-center border-b border-white/5 hover:bg-white/[0.03] transition"
            >
              <div>
                <p className="font-medium text-gray-200">
                  {student.user.name}
                </p>
              </div>

              <div>
                <p className="text-gray-300 break-all">
                  {student.user.email}
                </p>
              </div>

              <div>
                <p className="text-gray-300">
                  {student.user.mobNo || "N/A"}
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => assignStudent(student.id)}
                  className="px-5 py-2 rounded-lg text-sm cursor-pointer font-medium 
                  bg-green-500/20 text-green-400 
                  hover:bg-green-500/40 hover:text-green-300 
                  transition-all duration-300"
                >
                  Assign
                </button>
              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}