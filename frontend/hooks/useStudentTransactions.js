"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const useStudentTransactions = (page = 1) => {
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${url}/api/v1/student/transactions?page=${page}`,
        { withCredentials: true }
      );

      setTransactions(res.data.transactions || []);
      setTotal(res.data.total || 0);
    } catch (e) {
      console.error(e);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [page]);

  return { transactions, total, loading };
};