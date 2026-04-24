"use client";
import { useEffect, useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    async function done() {
      try {
        const res = await axios.get(`${url}/api/v1/user/current`, {
          withCredentials: true,
        });

        setUser(res.data.user);
      } catch (error) {
        console.log(error);
        setUser(null);
      } finally {
        setLoading(false); 
      }
    }

    done();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}