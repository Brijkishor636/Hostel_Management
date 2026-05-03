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
    return <div className="text-white p-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] text-white p-4 md:p-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Payments
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Overview of your hostel and payment details
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <StatCard
            title="Room"
            value={room?.number || "Not Assigned"}
          />

          <StatCard
            title="Total Paid"
            value={`₹${totalPaid}`}
          />

          <StatCard
            title="Dues"
            value={`₹${totalDue}`}
          />

          <StatCard
            title="Transactions"
            value={totalTransactions}
          />
        </div>

        <RevenueChart transactions={transactions} />

        <StudentTransactions/>
      </div>
    </div>
  );
}