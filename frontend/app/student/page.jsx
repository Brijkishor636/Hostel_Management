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

  return (
    <div className="flex bg-gray-950 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8 space-y-8">
        <Navbar />

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard title="Room Number" value={data?.roomNumber} />
          <StatCard title="Monthly Rent" value={`₹${data?.rent}`} />
          <StatCard title="Pending Dues" value={`₹${data?.pendingDues}`} />
          <StatCard title="Open Complaints" value={data?.complaints} />
        </div>

        {/* Chart */}
        <RevenueChart data={data?.paymentHistory || []} />
      </div>
    </div>
  );
}