"use client";
import { useState } from "react";
import Card from "../../AdminDashboard/ui/Cards";
import Badge from "../../AdminDashboard/ui/Badge";
import { useStudentTransactions } from "../../../hooks/useStudentTransactions";

export default function StudentTransactions() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { transactions, total, loading } = useStudentTransactions(page);

  const getStatus = () => "Success"; 

  if (loading) {
    return <p className="text-gray-400">Loading transactions...</p>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-md sm:text-lg font-semibold">
        Recent Transactions
      </h3>

      <Card className="hidden sm:block !p-0 bg-white/5 border border-white/10">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/5 text-gray-400 text-[11px]">
            <tr>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/10">
            {transactions.map((t) => (
              <tr key={t.id}>
                <td className="px-6 py-4">Payment</td>

                <td className="px-6 py-4 font-bold">
                  ₹{t.amount}
                </td>

                <td className="px-6 py-4">
                  <Badge
                    className="w-[90px] justify-center"
                    variant="success"
                  >
                    {getStatus()}
                  </Badge>
                </td>

                <td className="px-6 py-4 text-gray-400">
                  {new Date(t.paidAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div className="sm:hidden space-y-2">
        {transactions.map((t) => (
          <Card key={t.id} className="p-3 bg-white/5 border border-white/10">
            <div className="flex justify-between items-center">
              <p className="font-semibold">Payment</p>
              <p className="font-bold">₹{t.amount}</p>
            </div>

            <div className="flex justify-between items-center mt-1">
              <Badge
                className="w-[90px] justify-center"
                variant="success"
              >
                Success
              </Badge>

              <p className="text-xs text-gray-400">
                {new Date(t.paidAt).toLocaleDateString()}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center text-sm text-gray-400 pt-4">
        <p>
          Page {page} • {transactions.length} / {total}
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="px-4 py-2 bg-white/5 rounded-lg"
          >
            Prev
          </button>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page * limit >= total}
            className="px-4 py-2 bg-white/5 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}