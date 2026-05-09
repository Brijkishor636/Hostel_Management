import { useEffect, useState } from "react";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export const useRooms = ({ role, page = 1, limit = 8 }) => {
  const [rooms, setRooms] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!role) {
      setLoading(false);
      return;
    }

    const fetchRooms = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${url}/api/v1/${role}/rooms?page=${page}&limit=${limit}`,
          {
            withCredentials: true,
          }
        );

        const data = res.data;

        setRooms(data.rooms || []);
        setTotal(data.total || 0);
      } catch (err) {
        console.error("AXIOS ERROR:", err.response?.data || err.message);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [role, page, limit]);

  return { rooms, total, loading };
};