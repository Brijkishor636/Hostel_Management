"use client";

import { useState } from "react";
import Card from "../../AdminDashboard/ui/Cards";
import Badge from "../../AdminDashboard/ui/Badge";
import { useStudentTransactions } from "../../../hooks/useStudentTransactions";

export default function StudentTransactions() {

  const [page, setPage] = useState(1);

  const limit = 10;

  const {
    transactions,
    total,
    loading,
  } = useStudentTransactions(page);

  if (loading) {
    return (
      <div className="text-gray-400">
        Loading transactions...
      </div>
    );
  }

  return (
    <div className="space-y-5">

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-xl font-semibold text-white">
            Recent Transactions
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Your latest payment history
          </p>
        </div>

        <div className="hidden sm:flex px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-xs text-green-300">
          Payment Success
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">

        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            <thead className="bg-white/5 text-gray-400">
              <tr>
                <th className="px-6 py-4 text-left">Type</th>
                <th className="px-6 py-4 text-left">Amount</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10">

              {transactions.map((t) => (
                <tr
                  key={t.id}
                  className="hover:bg-white/5 transition"
                >
                  <td className="px-6 py-4 font-medium">
                    Hostel Payment
                  </td>

                  <td className="px-6 py-4 font-bold text-purple-300">
                    ₹{t.amount}
                  </td>

                  <td className="px-6 py-4">
                    <Badge
                      className="w-[90px] justify-center"
                      variant="success"
                    >
                      Success
                    </Badge>
                  </td>

                  <td className="px-6 py-4 text-gray-400">
                    {new Date(t.paidAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-4 md:hidden">

        {transactions.map((t) => (
          <div
            key={t.id}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4"
          >

            <div className="flex items-start justify-between">

              <div>
                <p className="font-semibold text-white">
                  Hostel Payment
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {new Date(t.paidAt).toLocaleDateString()}
                </p>
              </div>

              <Badge
                className="w-[85px] justify-center"
                variant="success"
              >
                Success
              </Badge>
            </div>

            <div className="mt-4 text-2xl font-bold text-purple-300">
              ₹{t.amount}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between pt-2">

        <p className="text-sm text-gray-400">
          Page {page} • {transactions.length} / {total}
        </p>

        <div className="flex gap-3">

          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
          >
            Prev
          </button>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page * limit >= total}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}