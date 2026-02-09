"use client";

import DashboardLayout from "./DashboardLayout";
import StatCard from "./StatCard";
import GlassCard from "./GlassCard";

export default function AdminDashboard() {
  return (
    <DashboardLayout>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Students" value="240" />
        <StatCard title="Available Rooms" value="18" />
        <StatCard title="Pending Complaints" value="5" />
        <StatCard title="Monthly Revenue" value="₹45K" />
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mt-6">

        <GlassCard title="Recent Complaints">
          <ul className="space-y-2 text-gray-400">
            <li>Room AC not working</li>
            <li>Water leakage</li>
            <li>WiFi issue</li>
          </ul>
        </GlassCard>

        <GlassCard title="Visitor Logs">
          <ul className="space-y-2 text-gray-400">
            <li>Rahul visited Room 201</li>
            <li>Parents visited Room 105</li>
          </ul>
        </GlassCard>

      </div>

    </DashboardLayout>
  );
}
