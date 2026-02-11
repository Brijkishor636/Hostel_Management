"use client";
import React from "react";
import Card from "../ui/Cards";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { DoorOpen, Users, Settings, Wrench } from "lucide-react";
import { MOCK_ROOMS } from "../../constants";

const RoomCard = ({ room }) => {
  const occupancyPercentage = (room.occupied / room.capacity) * 100;

  return (
    <Card className="flex flex-col gap-4 bg-white/5 backdrop-blur-md border border-white/10 hover:shadow-[0_0_30px_rgba(99,102,241,0.25)] transition duration-300">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${room.status === "Maintenance" ? "bg-amber-500/10 text-amber-400" : "bg-indigo-500/10 text-indigo-400"}`}>
            {room.status === "Maintenance" ? <Wrench size={20} /> : <DoorOpen size={20} />}
          </div>
          <div>
            <h4 className="font-bold text-lg leading-none text-white">Room {room.number}</h4>
            <span className="text-xs text-gray-400">{room.type} Room</span>
          </div>
        </div>
        <Badge variant={room.status === "Full" ? "error" : room.status === "Maintenance" ? "warning" : "success"}>
          {room.status}
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs font-medium">
          <span className="text-gray-400">Occupancy</span>
          <span className={occupancyPercentage === 100 ? "text-rose-400" : "text-gray-300"}>
            {room.occupied} / {room.capacity} beds
          </span>
        </div>
        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
          <div className={`h-full transition-all duration-500 ${occupancyPercentage === 100 ? "bg-rose-500" : "bg-indigo-500"}`} style={{ width: `${occupancyPercentage}%` }} />
        </div>
      </div>

      <div className="pt-4 flex items-center justify-between mt-auto">
        <div className="flex -space-x-2">
          {[...Array(room.occupied)].map((_, i) => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-[#020617] bg-white/10 flex items-center justify-center text-[10px] text-white">
              <Users size={12} />
            </div>
          ))}
          {room.occupied === 0 && <span className="text-xs text-gray-500 italic">Empty</span>}
        </div>
        <button className="text-gray-500 hover:text-indigo-400 transition-colors">
          <Settings size={18} />
        </button>
      </div>
    </Card>
  );
};

const RoomManagement = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] text-white p-6 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <DoorOpen className="text-indigo-400" /> Room Allocation
        </h2>
        <div className="flex gap-3">
          <Button variant="secondary" size="sm">Manage Types</Button>
          <Button size="sm">Configure Rooms</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_ROOMS.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default RoomManagement;
