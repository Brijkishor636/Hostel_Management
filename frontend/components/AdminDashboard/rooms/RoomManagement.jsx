"use client";
import React, { useContext, useState, useEffect } from "react";
import Button from "../ui/Button";
import { DoorOpen } from "lucide-react";
import { useRooms } from "../../../hooks/useRooms";
import { RoomCard } from "./RoomCard";
import { useRouter } from "next/navigation";
import UserContext from "../../../context/UserContext";

const RoomManagement = () => {
  const [page, setPage] = useState(1);
  const [roomsState, setRooms] = useState([]);

  const { user } = useContext(UserContext);
  const router = useRouter();
  const role = user?.role?.toLowerCase();

  const { rooms, total, loading } = useRooms({
    role,
    page,
    limit: 8,
  });

  useEffect(() => {
  if (Array.isArray(rooms) && rooms.length > 0) {
    setRooms(rooms);
  }
}, [rooms]);

  if (!role) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] text-white p-6 space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <DoorOpen className="text-indigo-400" /> Room Allocation
        </h2>

        <div className="flex gap-3">
          <Button
            onClick={() => router.push(`/${role}/rooms/create`)}
            variant="secondary"
            size="sm"
            className="cursor-pointer"
          >
            Create room
          </Button>

          <Button size="sm" className="cursor-pointer">
            Configure Rooms
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-40 bg-white/5 animate-pulse rounded-xl"
            />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {roomsState
              ?.filter(Boolean)
              .map((room) => (
                <RoomCard
                  key={room.id}  
                  room={room}
                  role={role}
                  setRooms={setRooms}
                />
              ))}
          </div>

          <div className="px-6 py-4 border-t border-white/10 flex justify-between text-sm text-gray-400">
            <p>{roomsState?.filter(Boolean).length} / {total}</p>

            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className="px-4 py-2 bg-white/5 rounded-lg cursor-pointer"
              >
                Prev
              </button>

              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page * 8 >= total}
                className="px-4 py-2 bg-white/5 rounded-lg disabled:opacity-50 cursor-pointer"
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