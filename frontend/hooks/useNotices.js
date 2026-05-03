"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const useStudentNotices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotices = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${BASE_URL}/api/v1/student/notices`,
        { withCredentials: true }
      );
      console.log(res.data);
      setNotices(res.data);
    } catch (err) {
      console.error("Error fetching notices:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return {
    notices,
    loading,
    refresh: fetchNotices,
  };
};