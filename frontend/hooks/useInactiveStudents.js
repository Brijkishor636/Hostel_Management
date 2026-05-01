import { useEffect, useState } from "react";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const useInactiveStudents = ({ role, page = 1, limit = 15 }) => {
  const [students, setStudents] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false); 

  useEffect(() => {
    if (!role) return;

    const fetchStudents = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${url}/api/v1/${role}/inactive-students?page=${page}&limit=${limit}`, 
          { withCredentials: true }
        );

        setStudents(res.data.students || []);
        setTotal(res.data.total || 0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [role, page, limit, refresh]); 

  return { students, total, loading, setRefresh }; 
};