"use client";
import React, { useEffect, useState } from "react";
import Card from "../ui/Cards";
import Badge from "../ui/Badge";
import axios from "axios";
import { usePathname } from "next/navigation";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function RecentTransactions({ studentId, refresh }) {
  const pathname = usePathname();
  const role = pathname.split("/")[1];

  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(
        `${url}/api/v1/${role}/student-transactions/${studentId}`,
        { withCredentials: true }
      );
      setTransactions(res.data || []);
    } catch (e) {
      console.error(e);
      setTransactions([]);
    }
  };

  useEffect(() => {
    if (!role) return;
    fetchTransactions();
  }, [role, refresh]);

  const getStatus = (status) => {
    return status === "PAID" || status === "PARTIAL"
      ? "Success"
      : "Failed";
  };

  return (
    <div className="space-y-4">
      <h3 className="text-md sm:text-lg font-semibold">Recent Transactions</h3>

      <Card className="hidden sm:block !p-0 bg-white/5 border border-white/10">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/5 text-gray-400 text-[11px]">
            <tr>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/10">
            {transactions.slice(0, 7).map((t) => (
              <tr key={t.id}>
                <td className="px-6 py-3">{t.type}</td>
                <td className="px-6 py-3 font-bold">₹{t.amount}</td>
                <td className="px-6 py-3">
                  <Badge
                    className="w-[90px] justify-center"
                    variant={
                      t.status === "PAID" || t.status === "PARTIAL"
                        ? "success"
                        : "warning"
                    }
                  >
                    {getStatus(t.status)}
                  </Badge>
                </td>
                <td className="px-6 py-3 text-gray-400">
                  {new Date(t.paidAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div className="sm:hidden space-y-2">
        {transactions.slice(0, 7).map((t) => (
          <Card key={t.id} className="p-3 bg-white/5 border border-white/10">
            <div className="flex justify-between items-center">
              <p className="font-semibold">{t.type}</p>
              <p className="font-bold">₹{t.amount}</p>
            </div>

            <div className="flex justify-between items-center mt-1">
              <Badge
                className="w-[90px] justify-center"
                variant={
                  t.status === "PAID" || t.status === "PARTIAL"
                    ? "success"
                    : "warning"
                }
              >
                {getStatus(t.status)}
              </Badge>
              <p className="text-xs text-gray-400">
                {new Date(t.paidAt).toLocaleDateString()}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}