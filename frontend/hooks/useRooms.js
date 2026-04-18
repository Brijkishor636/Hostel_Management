import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const useRooms = ({ role, page = 1, limit = 12 }) => {
  const { user } = useContext(UserContext);

  const [rooms, setRooms] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const finalRole = role || user?.role?.toLowerCase();

  useEffect(() => {
    if (!finalRole) return;

    const fetchRooms = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${url}/api/v1/${finalRole}/rooms?page=${page}&limit=${limit}`,
          {
            withCredentials: true,
          }
        );

        const data = res.data;

        setRooms(data.rooms || []);
        setTotal(data.total || 0);

      } catch (err) {
        console.error("AXIOS ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [finalRole, page, limit, refresh]);

  return { rooms, total, loading, setRefresh };
};