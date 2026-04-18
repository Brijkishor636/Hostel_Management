"use client";

import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import UserContext from "../../../context/UserContext";
import { Users, BedDouble } from "lucide-react";
import StatusDropdown from "./StatusDropdown";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function RoomDetailsPage() {
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const role = user?.role?.toLowerCase();

  useEffect(() => {
    if (!id || !role) return;
    fetchRoom();
  }, [id, role]);

  const fetchRoom = async () => {
    try {
      const res = await axios.get(
        `${url}/api/v1/${role}/rooms/${id}`,
        { withCredentials: true }
      );
      setRoom(res.data.room);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const changeStatus = async (status) => {
    try {
      await axios.put(
        `${url}/api/v1/${role}/rooms/status/${id}`,
        { status },
        { withCredentials: true }
      );
      fetchRoom();
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <p className="text-white p-6 text-lg">Loading user...</p>;
  if (loading) return <p className="text-white p-6 text-lg">Loading room...</p>;
  if (!room) return <p className="text-red-500 p-6 text-lg">Room not found</p>;

  const occupancyPercentage =
    (room.occupancy / room.capacity) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] text-white p-6 space-y-8">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">
            Room {room.number}
          </h1>
          <p className="text-gray-400 text-base">
            {room.status}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() =>
              router.push(`/${role}/rooms/${room.id}/unassigned-students`)
            }
            className="px-5 py-2.5 cursor-pointer rounded-xl bg-indigo-500 hover:bg-indigo-700 text-base font-medium"
          >
            Assign Student
          </button>

          <StatusDropdown value={room.status} onChange={changeStatus} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        <div className="bg-white/5 border border-white/10 p-5 rounded-xl flex items-center gap-4">
          <BedDouble className="text-indigo-400" size={26} />
          <div>
            <p className="text-sm text-gray-400">Capacity</p>
            <p className="text-xl font-semibold">{room.capacity}</p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 p-5 rounded-xl flex items-center gap-4">
          <Users className="text-indigo-400" size={26} />
          <div>
            <p className="text-sm text-gray-400">Occupancy</p>
            <p className="text-xl font-semibold">{room.occupancy}</p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
          <p className="text-sm text-gray-400 mb-2">Utilization</p>

          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 transition-all duration-500"
              style={{ width: `${occupancyPercentage}%` }}
            />
          </div>

          <p className="text-sm text-gray-400 mt-2">
            {Math.round(occupancyPercentage)}%
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">
          Assigned Students
        </h2>

        {room.students.length === 0 ? (
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl text-center text-gray-400 text-base">
            No students assigned
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {room.students.map((student) => (
              <div
                key={student.id}
                className="bg-white/5 border border-white/10 p-5 rounded-xl"
              >
                <p className="text-lg font-semibold text-white">
                  {student.user.name}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {student.user.email}
                </p>
                <p className="text-sm text-indigo-400 mt-2">
                  {student.regNo}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}