"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const usePaymentDashboard = () => {
  const [data, setData] = useState({
    totalPaid: 0,
    totalDue: 0,
    totalTransactions: 0,
    transactions: [],
  });

  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [dashboardRes, transactionsRes] = await Promise.all([
        axios.get(`${url}/api/v1/student/dashboard`, {
          withCredentials: true,
        }),
        axios.get(`${url}/api/v1/student/transactions?page=1`, {
          withCredentials: true,
        }),
      ]);

      setData({
        totalPaid: dashboardRes.data.totalPaid || 0,
        totalDue: dashboardRes.data.totalDue || 0,
        totalTransactions: dashboardRes.data.totalTransactions || 0,
        transactions: transactionsRes.data.transactions || [],
      });

    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { ...data, loading };
};