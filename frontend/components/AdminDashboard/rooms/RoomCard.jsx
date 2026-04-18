import React from "react";
import Card from "../ui/Cards";
import Badge from "../ui/Badge";
import { DoorOpen, Wrench, Users, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export const RoomCard = ({ room, role }) => {
  const occupancyPercentage = (room.occupancy / room.capacity) * 100;
    const router = useRouter();
  return (
    <Card onClick={()=>{
        router.push(`/${role}/rooms/${room.id}`)
    }} className="flex flex-col gap-4 bg-white/5 backdrop-blur-md border border-white/10 hover:shadow-[0_0_10px_rgba(99,102,241,0.25)] transition duration-300">
      
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">

          <div
            className={`p-2 rounded-lg ${
              room.status === "MAINTENANCE"
                ? "bg-amber-500/10 text-amber-400"
                : "bg-indigo-500/10 text-indigo-400"
            }`}
          >
            {room.status === "MAINTENANCE" ? (
              <Wrench size={20} />
            ) : (
              <DoorOpen size={20} />
            )}
          </div>

          <div>
            <h4 className="font-bold text-lg leading-none text-white">
              Room {room.number}
            </h4>
            <span className="text-xs text-gray-400">
              Standard Room
            </span>
          </div>
        </div>

        <Badge
          variant={
            room.status === "FULL"
              ? "error"
              : room.status === "MAINTENANCE"
              ? "warning"
              : "success"
          }
        >
          {room.status}
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs font-medium">
          <span className="text-gray-400">Occupancy</span>
          <span
            className={
              occupancyPercentage === 100
                ? "text-rose-400"
                : "text-gray-300"
            }
          >
            {room.occupancy} / {room.capacity} beds
          </span>
        </div>

        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              occupancyPercentage === 100
                ? "bg-rose-500"
                : "bg-indigo-500"
            }`}
            style={{ width: `${occupancyPercentage}%` }}
          />
        </div>
      </div>

      <div className="pt-4 flex items-center justify-between mt-auto">
        <div className="flex -space-x-2">
          {[...Array(room.occupancy)].map((_, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full border-2 border-[#020617] bg-white/10 flex items-center justify-center text-[10px] text-white"
            >
              <Users size={12} />
            </div>
          ))}

          {room.occupancy === 0 && (
            <span className="text-xs text-gray-500 italic">
              Empty
            </span>
          )}
        </div>

        <button className="text-gray-500 hover:text-indigo-400 transition-colors">
          <Settings size={18} />
        </button>
      </div>
    </Card>
  );
};
