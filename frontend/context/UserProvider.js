"use client"
import { useEffect, useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
export default function UserProvider({children}){

    const [user, setUser] = useState(null);

    useEffect(()=>{

        async function done(){
        try {
            const newUser = await axios.get(`${url}/api/v1/user/current`, {
                withCredentials: true
            });
            // console.log(newUser);
            setUser(newUser.data.user);
        } catch (error) {
            console.log(error);
            // toast.error("Error in fetching user");
            setUser(undefined);
        }
    }
    done();
    },[])

    return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
}