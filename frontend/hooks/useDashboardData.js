"use client";
import { useEffect, useState } from "react";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const useDashboardData = (role) => {
  const [students, setStudents] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [summary, setSummary] = useState({});
  const [complaints, setComplaints] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!role) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const [studentRes, roomRes, summaryRes, complaintRes] =
          await Promise.all([
            fetch(`${url}/api/v1/${role}/allstudents`, {
              credentials: "include",
            }),
            fetch(`${url}/api/v1/${role}/allrooms`, {
              credentials: "include",
            }),
            fetch(`${url}/api/v1/${role}/summary`, {
              credentials: "include",
            }),
            fetch(`${url}/api/v1/${role}/complaints`, {
              credentials: "include",
            }),
          ]);

        const studentData = await studentRes.json();
        const roomData = await roomRes.json();
        const summaryData = await summaryRes.json();
        const complaintData = await complaintRes.json();

        setStudents(studentData.students || []);
        setRooms(roomData.rooms || []);
        setSummary(summaryData || {});
        setComplaints(complaintData.complaints || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [role]);

  const totalStudents = students.length;
  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter((r) => r.occupancy > 0).length;
  const totalRevenue = summary.paid || 0;

  const openComplaints = complaints.filter(
    (c) => c.status !== "RESOLVED"
  ).length;

  const recentComplaints = complaints.slice(0, 3);

  return {
    totalStudents,
    totalRooms,
    occupiedRooms,
    totalRevenue,
    openComplaints,
    recentComplaints,
    loading,
    error,
  };
};