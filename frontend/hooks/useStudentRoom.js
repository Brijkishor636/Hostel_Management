"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const useStudentRoom = () => {
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRoom = async () => {
    try {
      const res = await axios.get(
        `${url}/api/v1/student/room`,
        { withCredentials: true }
      );

      setRoom(res.data.room);
    } catch (e) {
      console.error(e);
      setRoom(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  return { room, loading };
};