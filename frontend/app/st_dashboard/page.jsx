"use client";

import Sidebar from "../../components/StudentDashboard/Sidebar";
import Navbar from "../../components/StudentDashboard/Navbar";
import StatCard from "../../components/StudentDashboard/StatCard";
import RevenueChart from "../../components/StudentDashboard/RevenueChart";

import { useDashboard } from "../../hooks/useDashboard";

export default function StDashboard() {
  const { data, loading } = useDashboard();

  
  if (loading) {
    return <p className="text-white p-10">Loading...</p>;
  }


  if (!data) {
    return <p className="text-red-500 p-10">Failed to load dashboard</p>;
  }

  return (
    <div className="flex bg-gray-950 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8 space-y-8">
        <Navbar />

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard title="Room Number" value={data.roomNumber || "N/A"} />
          <StatCard title="Monthly Rent" value={`₹${data.rent || 0}`} />
          <StatCard title="Pending Dues" value={`₹${data.pendingDues || 0}`} />
          <StatCard title="Open Complaints" value={data.complaints || 0} />
        </div>

        {/* Chart */}
        <RevenueChart data={data.paymentHistory || []} />
      </div>
    </div>
  );
}