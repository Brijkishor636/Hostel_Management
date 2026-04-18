import { useEffect, useState } from "react";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const useStudents = ({ role, page, limit, search }) => {
  const [students, setStudents] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${url}/api/v1/${role}/students?page=${page}&limit=${limit}&search=${search}`,
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        setStudents(data.students || []);
        setTotal(data.total || 0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [role, page, limit, search, refresh]);

  return { students, total, loading, setRefresh };
};