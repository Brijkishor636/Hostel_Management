import { useEffect, useState } from "react";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const useDashboardData = (role = "admin") => {
  const [students, setStudents] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!role) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const [studentRes, roomRes] = await Promise.all([
              fetch(`${url}/api/v1/${role}/allstudents`, {
                credentials: "include",
              }),
              fetch(`${url}/api/v1/${role}/allrooms`, {
                credentials: "include",
              }),
            ]);

        const studentData = await studentRes.json();
        const roomData = await roomRes.json();

        setStudents(studentData.students || []);
        setRooms(roomData.rooms || []);
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
  const occupiedRooms = rooms.filter(r => r.occupancy > 0).length;

  return {
    students,
    rooms,
    totalStudents,
    totalRooms,
    occupiedRooms,
    loading,
    error,
  };
};