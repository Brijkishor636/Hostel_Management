import API from "./api";

export const getDashboardData = async () => {
  const res = await API.get("/student/dashboard");
  return res.data;
};