"use client";

import { useState } from "react";
import {
  Search,
  BedDouble,
  IndianRupee,
  Building2,
  Users,
  MapPin,
  Filter,
  Eye,
  CheckCircle,
  Star,
} from "lucide-react";

import Sidebar from "../../../components/StudentDashboard/layout/Sidebar";
import Navbar from "../../../components/StudentDashboard/layout/Navbar";
import { useRooms } from "../../../hooks/useRooms";

export default function RoomsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { rooms, total, loading } = useRooms({
    role: "student",
    page,
    limit: 8,
  });

  const filteredRooms = rooms.filter(
    (room) =>
      room.roomNumber.toLowerCase().includes(search.toLowerCase()) ||
      room.block.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#050816]">
        <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#111827] text-white">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 space-y-8 overflow-y-auto">
        
        {/* Navbar */}
        <Navbar />

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div>
            <h1 className="text-4xl font-extrabold">
              Available Rooms 
            </h1>

            <p className="text-gray-400 mt-2 text-lg">
              Browse hostel rooms and choose your preferred stay.
            </p>
          </div>

          <button className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg">
            + Request Room
          </button>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          
          {/* Search */}
          <div className="flex items-center bg-white/10 border border-white/10 rounded-2xl px-4 py-3 flex-1 backdrop-blur-md">
            <Search className="text-gray-400" size={20} />

            <input
              type="text"
              placeholder="Search by room number or block..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none px-3 w-full text-white placeholder-gray-400"
            />
          </div>

          {/* Filter Button */}
          <button className="flex items-center justify-center gap-2 bg-white/10 border border-white/10 px-5 py-3 rounded-2xl hover:bg-white/20 transition-all">
            <Filter size={18} />
            Filters
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl border border-white/10 shadow-xl">
            <div className="flex justify-between items-center">
              <BedDouble className="text-pink-400" size={30} />
              <span className="text-sm bg-pink-500/20 px-3 py-1 rounded-full">
                Total
              </span>
            </div>

            <h2 className="text-gray-400 mt-4">Available Rooms</h2>

            <p className="text-4xl font-bold mt-2">{total}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl border border-white/10 shadow-xl">
            <div className="flex justify-between items-center">
              <Building2 className="text-cyan-400" size={30} />
              <span className="text-sm bg-cyan-500/20 px-3 py-1 rounded-full">
                Blocks
              </span>
            </div>

            <h2 className="text-gray-400 mt-4">Hostel Blocks</h2>

            <p className="text-4xl font-bold mt-2">4</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl border border-white/10 shadow-xl">
            <div className="flex justify-between items-center">
              <IndianRupee className="text-green-400" size={30} />
              <span className="text-sm bg-green-500/20 px-3 py-1 rounded-full">
                Rent
              </span>
            </div>

            <h2 className="text-gray-400 mt-4">Starting Rent</h2>

            <p className="text-4xl font-bold mt-2">₹4000</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl border border-white/10 shadow-xl">
            <div className="flex justify-between items-center">
              <CheckCircle className="text-yellow-400" size={30} />
              <span className="text-sm bg-yellow-500/20 px-3 py-1 rounded-full">
                Status
              </span>
            </div>

            <h2 className="text-gray-400 mt-4">Vacancy Rate</h2>

            <p className="text-4xl font-bold mt-2">85%</p>
          </div>
        </div>

        {/* Room Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredRooms.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <h2 className="text-3xl font-bold text-gray-300">
                No Rooms Found 
              </h2>

              <p className="text-gray-500 mt-2">
                Try searching with another room number or block.
              </p>
            </div>
          ) : (
            filteredRooms.map((room) => (
              <div
                key={room.id}
                className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:scale-[1.02] transition-all duration-300"
              >
                
                {/* Card Top */}
                <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold">
                      {room.roomNumber}
                    </h2>

                    <span className="bg-white/20 px-4 py-1 rounded-full text-sm">
                      Available
                    </span>
                  </div>

                  <p className="mt-2 text-purple-100">
                    Premium Student Room
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-5">
                  
                  <div className="flex items-center gap-3">
                    <Building2 className="text-pink-400" />
                    <p>
                      <span className="font-semibold">Block:</span>{" "}
                      {room.block}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="text-cyan-400" />
                    <p>
                      <span className="font-semibold">Floor:</span>{" "}
                      {room.floor}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="text-yellow-400" />
                    <p>
                      <span className="font-semibold">Capacity:</span>{" "}
                      {room.capacity} Students
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <IndianRupee className="text-green-400" />
                    <p>
                      <span className="font-semibold">Rent:</span> ₹
                      {room.rent}/month
                    </p>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {[
                      "WiFi",
                      "Attached Bathroom",
                      "Laundry",
                    ].map((feature, index) => (
                      <span
                        key={index}
                        className="bg-white/10 px-3 py-1 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 text-yellow-400">
                    <Star size={18} fill="currentColor" />
                    <Star size={18} fill="currentColor" />
                    <Star size={18} fill="currentColor" />
                    <Star size={18} fill="currentColor" />
                    <Star size={18} />
                    <span className="text-gray-300 ml-2">
                      4.0 Rating
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 py-3 rounded-2xl font-semibold hover:scale-105 transition-all duration-300">
                      Book Now
                    </button>

                    <button className="flex items-center justify-center gap-2 bg-white/10 border border-white/10 px-5 rounded-2xl hover:bg-white/20 transition-all">
                      <Eye size={18} />
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-5 pt-8">
          
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="bg-white/10 border border-white/10 px-6 py-3 rounded-2xl hover:bg-white/20 transition-all"
          >
            ← Previous
          </button>

          <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 rounded-2xl font-bold shadow-lg">
            Page {page}
          </div>

          <button
            onClick={() => setPage((p) => p + 1)}
            className="bg-white/10 border border-white/10 px-6 py-3 rounded-2xl hover:bg-white/20 transition-all"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}