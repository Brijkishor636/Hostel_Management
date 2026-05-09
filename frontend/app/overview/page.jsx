"use client";

import {
  User,
  CreditCard,
  Bell,
  BookOpen,
  BedDouble,
  AlertCircle,
} from "lucide-react";

export default function OverviewPage() {
  return (
    <div className="min-h-screen bg-[#050816] text-white p-6">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            Welcome Back, Nishant 
          </h1>
          <p className="text-gray-400 mt-2">
            Manage your hostel activities easily.
          </p>
        </div>

        <button className="mt-4 md:mt-0 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-105 transition duration-300 shadow-lg">
          Edit Profile
        </button>
      </div>

      {/* Student Profile Card */}
      <div className="bg-gradient-to-r from-[#111827] to-[#1f2937] rounded-3xl p-6 shadow-2xl mb-8 border border-gray-700">
        <div className="flex flex-col md:flex-row items-center gap-6">
          
          <img
            src="/avatar1.jpg"
            alt="profile"
            className="w-28 h-28 rounded-full border-4 border-pink-500 object-cover"
          />

          <div className="flex-1">
            <h2 className="text-3xl font-bold">Nishant Kumar</h2>
            <p className="text-gray-400 mt-1">B.Tech CSE • 3rd Year</p>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#0f172a] p-3 rounded-xl">
                <p className="text-gray-400 text-sm">Student ID</p>
                <h3 className="font-bold">STU021</h3>
              </div>

              <div className="bg-[#0f172a] p-3 rounded-xl">
                <p className="text-gray-400 text-sm">Room</p>
                <h3 className="font-bold">A-101</h3>
              </div>

              <div className="bg-[#0f172a] p-3 rounded-xl">
                <p className="text-gray-400 text-sm">Rent</p>
                <h3 className="font-bold">₹4,000</h3>
              </div>

              <div className="bg-[#0f172a] p-3 rounded-xl">
                <p className="text-gray-400 text-sm">Status</p>
                <h3 className="text-green-400 font-bold">
                  Active
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1 */}
        <div className="bg-[#111827] hover:bg-[#1f2937] transition duration-300 p-6 rounded-3xl shadow-lg border border-gray-700 hover:scale-105">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400">Pending Dues</p>
              <h2 className="text-3xl font-bold mt-2">₹1,500</h2>
            </div>

            <div className="bg-pink-500/20 p-4 rounded-2xl">
              <CreditCard className="text-pink-400" size={30} />
            </div>
          </div>

          <button className="mt-5 w-full py-2 rounded-xl bg-pink-500 hover:bg-pink-600 transition">
            Pay Now
          </button>
        </div>

        {/* Card 2 */}
        <div className="bg-[#111827] hover:bg-[#1f2937] transition duration-300 p-6 rounded-3xl shadow-lg border border-gray-700 hover:scale-105">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400">Complaints</p>
              <h2 className="text-3xl font-bold mt-2">2</h2>
            </div>

            <div className="bg-yellow-500/20 p-4 rounded-2xl">
              <AlertCircle className="text-yellow-400" size={30} />
            </div>
          </div>

          <button className="mt-5 w-full py-2 rounded-xl bg-yellow-500 hover:bg-yellow-600 transition">
            View Complaints
          </button>
        </div>

        {/* Card 3 */}
        <div className="bg-[#111827] hover:bg-[#1f2937] transition duration-300 p-6 rounded-3xl shadow-lg border border-gray-700 hover:scale-105">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400">Room Status</p>
              <h2 className="text-2xl font-bold mt-2">Clean</h2>
            </div>

            <div className="bg-green-500/20 p-4 rounded-2xl">
              <BedDouble className="text-green-400" size={30} />
            </div>
          </div>

          <button className="mt-5 w-full py-2 rounded-xl bg-green-500 hover:bg-green-600 transition">
            Room Details
          </button>
        </div>

        {/* Card 4 */}
        <div className="bg-[#111827] hover:bg-[#1f2937] transition duration-300 p-6 rounded-3xl shadow-lg border border-gray-700 hover:scale-105">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400">Notifications</p>
              <h2 className="text-3xl font-bold mt-2">5</h2>
            </div>

            <div className="bg-blue-500/20 p-4 rounded-2xl">
              <Bell className="text-blue-400" size={30} />
            </div>
          </div>

          <button className="mt-5 w-full py-2 rounded-xl bg-blue-500 hover:bg-blue-600 transition">
            Open
          </button>
        </div>
      </div>

      {/* Progress Section */}
      <div className="mt-10 bg-[#111827] rounded-3xl p-6 border border-gray-700">
        <h2 className="text-2xl font-bold mb-6">
          Hostel Activity Progress
        </h2>

        {/* Attendance */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span>Attendance</span>
            <span>85%</span>
          </div>

          <div className="w-full bg-gray-700 rounded-full h-3">
            <div className="bg-pink-500 h-3 rounded-full w-[85%]"></div>
          </div>
        </div>

        {/* Payment */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span>Fee Payment</span>
            <span>70%</span>
          </div>

          <div className="w-full bg-gray-700 rounded-full h-3">
            <div className="bg-green-500 h-3 rounded-full w-[70%]"></div>
          </div>
        </div>

        {/* Discipline */}
        <div>
          <div className="flex justify-between mb-2">
            <span>Discipline Score</span>
            <span>92%</span>
          </div>

          <div className="w-full bg-gray-700 rounded-full h-3">
            <div className="bg-blue-500 h-3 rounded-full w-[92%]"></div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-5">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">
          <button className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 transition">
            Add Complaint
          </button>

          <button className="px-6 py-3 rounded-2xl bg-pink-600 hover:bg-pink-700 transition">
            Pay Hostel Fee
          </button>

          <button className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 transition">
            View Notices
          </button>

          <button className="px-6 py-3 rounded-2xl bg-green-600 hover:bg-green-700 transition">
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
}