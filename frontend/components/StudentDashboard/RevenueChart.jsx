"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RevenueChart({ data }) {
  const formattedData = data.map((item) => ({
    month: item.month,
    amount: item.amount,
  }));

  return (
    <div className="bg-gray-900 p-6 rounded-xl">
      <h2 className="text-white mb-4">Rent Payment History</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <XAxis dataKey="month" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#a855f7" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}