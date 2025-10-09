import axios from "axios"
import { AUTH_TOKEN } from "@/common/constants/constants.ts"

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "API-KEY": import.meta.env.VITE_API_KEY,
  },
})

instance.interceptors.request.use((config) => {
  const authToken = localStorage.getItem(AUTH_TOKEN)
  config.headers.authorization = `Bearer ${authToken}`;
  return config
})
