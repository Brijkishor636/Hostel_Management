"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const useStudentComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${BASE_URL}/api/v1/student/complaints`,
        { withCredentials: true }
      );

      setComplaints(res.data);
    } catch (err) {
      console.error("Error fetching complaints:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return {
    complaints,
    loading,
    refresh: fetchComplaints,
  };
};