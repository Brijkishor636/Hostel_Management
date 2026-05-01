import { useEffect, useState } from "react";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const useInactiveWardens = ({ role }) => {
  const [wardens, setWardens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchWardens = async () => {
      try {
        const res = await axios.get(
          `${url}/api/v1/${role}/inactive-wardens`,
          { withCredentials: true }
        );

        setWardens(res.data?.wardens || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWardens();
  }, [role, refresh]);

  return {
    wardens,
    loading,
    setRefresh
  };
};