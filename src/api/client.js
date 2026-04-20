import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_URL || "https://olx-server-omega.vercel.app/api";

export const apiClient = axios.create({
  baseURL,
  timeout: 15000,
});
