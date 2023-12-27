import axios from "axios";
const APP_BASE_URL = process.env.NEXTAUTH_URL;
export default axios.create({
  baseURL: APP_BASE_URL,
  headers: { "Content-Type": "application/json" },
});
export const axiosAuth = axios.create({
  baseURL: APP_BASE_URL,
  headers: { "Content-Type": "application/json" },
});
