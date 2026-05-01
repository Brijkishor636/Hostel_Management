"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const useComplaints = ({ role, status }) => {
  const [complaints, setComplaints] = useState([]);
  const [total, setTotal] = useState(0); 
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const fetchComplaints = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${url}/api/v1/${role}/complaints?status=${status}`,
        { withCredentials: true }
      );

      // console.log("Fetched complaints:", res.data);
      setComplaints(res.data.complaints || []);
      setTotal(res.data.total || 0);

    } catch (e) {
      console.error(e);
      setComplaints([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!role) return;
    fetchComplaints();
  }, [role, status, refresh]);

  return { complaints, total, loading, setRefresh };
};