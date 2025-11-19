import axios from "axios";

export const API_BASE = "https://projectguard-prod-7-1.onrender.com";

export const api = axios.create({
  baseURL: API_BASE,
});

// 🔥 Главный фикс — токен ВСЕГДА идет в headers.token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt_token");
  if (token) {
    config.headers.token = token;
  }
  return config;
});
