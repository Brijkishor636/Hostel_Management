import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001/api",
   withCredentials: true  
});


API.interceptors.request.use((req) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = token;
    }
  }
  return req;
});

export default API;