"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

export default function RevenueChart({ transactions = [] }) {

  const data = transactions.map((t) => ({
    date: new Date(t.paidAt).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    }),
    amount: t.amount,
  }));

  return (
    <div className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-6">

      {/* Glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/20 blur-3xl rounded-full"></div>

      <div className="relative z-10">

        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-white">
              Payment Analytics
            </h2>

            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Overview of recent payments
            </p>
          </div>

          <div className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300">
            Live Data
          </div>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1f2937"
              vertical={false}
            />

            <XAxis
              dataKey="date"
              stroke="#9ca3af"
              tick={{ fontSize: 12 }}
            />

            <YAxis
              stroke="#9ca3af"
              tick={{ fontSize: 12 }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#020617",
                border: "1px solid #8b5cf6",
                borderRadius: "14px",
                color: "#fff",
                backdropFilter: "blur(10px)",
              }}
            />

            <Area
              type="monotone"
              dataKey="amount"
              stroke="#8b5cf6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorAmount)"
            />

            <Line
              type="monotone"
              dataKey="amount"
              stroke="#c084fc"
              strokeWidth={3}
              dot={{
                r: 4,
                strokeWidth: 2,
                fill: "#fff",
              }}
              activeDot={{
                r: 7,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}