import axios from "axios";
const BASE_APP_URL = process.env.NEXT_PUBLIC_BASE_APP_URL;

export default axios.create({
  baseURL: `${BASE_APP_URL}api/`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
export const axiosAuth = axios.create({
  baseURL: `${BASE_APP_URL}api/`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
