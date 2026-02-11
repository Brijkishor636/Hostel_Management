"use client";
import React from "react";
import Card from "../ui/Cards";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { Download, CreditCard, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { MOCK_PAYMENTS } from "../../constants";

const Payments = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] text-white p-6 space-y-8">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <CreditCard className="text-indigo-400" /> Transaction History
        </h2>
        <Button size="sm">
          <Download size={18} /> Download Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] transition">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
            <ArrowUpRight size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Received this Month</p>
            <h4 className="text-2xl font-bold text-emerald-400">$12,450.00</h4>
          </div>
        </Card>

        <Card className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 hover:shadow-[0_0_25px_rgba(251,191,36,0.25)] transition">
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl">
            <CreditCard size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Pending Payments</p>
            <h4 className="text-2xl font-bold text-amber-400">$2,100.00</h4>
          </div>
        </Card>

        <Card className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 hover:shadow-[0_0_25px_rgba(244,63,94,0.25)] transition">
          <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl">
            <ArrowDownLeft size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Overdue Dues</p>
            <h4 className="text-2xl font-bold text-rose-400">$850.00</h4>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden !p-0 bg-white/5 backdrop-blur-md border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-gray-400 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {MOCK_PAYMENTS.map((payment) => (
                <tr key={payment.id} className="hover:bg-indigo-500/[0.04] transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">{payment.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-200">{payment.studentName}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-white/10 rounded-md text-xs text-gray-300 border border-white/10">
                      {payment.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{payment.date}</td>
                  <td className="px-6 py-4 font-bold text-gray-200">
                    ${payment.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={payment.status === "Completed" ? "success" : "warning"}>
                      {payment.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

    </div>
  );
};

export default Payments;
