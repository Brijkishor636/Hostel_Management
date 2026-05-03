"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function RevenueChart({ transactions = [] }) {

  const data = transactions.map((t) => ({
    date: new Date(t.paidAt).toLocaleDateString(),
    amount: t.amount,
  }));

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-xl text-white">

      <h2 className="mb-4 text-sm font-semibold text-gray-300">
        Recent Payment History
      </h2>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />

          <XAxis dataKey="date" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />

          <Tooltip
            contentStyle={{
              backgroundColor: "#020617",
              border: "1px solid #4f46e5",
              borderRadius: "8px",
              color: "#fff",
            }}
          />

          <Line
            type="monotone"
            dataKey="amount"
            stroke="#8b5cf6"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}