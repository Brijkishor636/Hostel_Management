"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", rent: 4000 },
  { month: "Feb", rent: 3500 },
  { month: "Mar", rent: 3000 },
  { month: "Apr", rent: 4500 },
  { month: "May", rent: 4200 },
];

export default function RevenueChart() {
  return (
    <div className="bg-gray-900 p-6 rounded-2xl text-white">
      <h2 className="mb-4 text-lg font-semibold">Rent Payment History</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Line type="monotone" dataKey="rent" stroke="#8b5cf6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
