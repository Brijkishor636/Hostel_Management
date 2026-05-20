"use client";

import StatCard from "./StatCard";
import RevenueChart from "./RevenueChart";
import { usePaymentDashboard } from "../../../hooks/usePaymentDashboard";
import { useStudentRoom } from "../../../hooks/useStudentRoom";
import StudentTransactions from "./StudentTransactions";

export default function StudentPayment() {

  const {
    totalPaid,
    totalDue,
    totalTransactions,
    transactions,
    loading,
  } = usePaymentDashboard();

  const { room, loading: roomLoading } = useStudentRoom();

  if (loading || roomLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] text-white px-4 py-6 sm:px-6 lg:px-8">

      {/* Background Glow */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-[120px]"></div>

      <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-500/20 rounded-full blur-[120px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-6">

        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              Payment Dashboard
            </h1>

            <p className="text-gray-400 text-sm mt-2">
              Track your hostel payments and dues
            </p>
          </div>

          <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 backdrop-blur-md w-fit">
            Student Panel
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">

          <StatCard
            title="Room Number"
            value={room?.number || "Not Assigned"}
          />

          <StatCard
            title="Total Paid"
            value={`₹${totalPaid}`}
          />

          <StatCard
            title="Pending Dues"
            value={`₹${totalDue}`}
          />

          <StatCard
            title="Transactions"
            value={totalTransactions}
          />
        </div>

        {/* Chart */}
        <RevenueChart transactions={transactions} />

        {/* Transactions */}
        <StudentTransactions />
      </div>
    </section>
  );
}