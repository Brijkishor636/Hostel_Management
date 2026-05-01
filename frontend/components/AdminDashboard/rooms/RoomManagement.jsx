"use client";
import React, { useState, useEffect } from "react";
import Button from "../ui/Button";
import { DoorOpen } from "lucide-react";
import { useRooms } from "../../../hooks/useRooms";
import { RoomCard } from "./RoomCard";
import { useRouter, usePathname } from "next/navigation";

const RoomManagement = () => {
  const [page, setPage] = useState(1);
  const [roomsState, setRooms] = useState([]);

  const router = useRouter();
  const pathname = usePathname();

  const role = pathname.split("/")[1];
  const baseRoute = `/${role}`;

  const { rooms, total, loading } = useRooms({
    role,
    page,
    limit: 8,
  });

  useEffect(() => {
    setRooms(rooms || []);
  }, [rooms]);

  if (!role || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] text-white p-6 space-y-8">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <DoorOpen className="text-indigo-400" /> Room Allocation
        </h2>

        <div className="flex gap-3">
          <Button
            onClick={() => router.push(`${baseRoute}/rooms/create`)}
            variant="secondary"
            size="sm"
          >
            Create room
          </Button>

          <Button size="sm">
            Configure Rooms
          </Button>
        </div>
      </div>

      {roomsState.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">
          No rooms available
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {roomsState.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                role={role}
                setRooms={setRooms}
              />
            ))}
          </div>

          <div className="px-6 py-4 border-t border-white/10 flex justify-between text-sm text-gray-400">
            <p>{roomsState.length} / {total}</p>

            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className="px-4 py-2 bg-white/5 rounded-lg"
              >
                Prev
              </button>

              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page * 8 >= total}
                className="px-4 py-2 bg-white/5 rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RoomManagement;