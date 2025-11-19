import axios from "axios";

// ================================
// ✨ ЕДИНСТВЕННЫЙ API_BASE
// ================================
export const API_BASE = "https://projectguard-prod-7-1.onrender.com";

console.log("🔥 api.js loaded, API_BASE =", API_BASE);

// ================================
// ✨ axios instance
// ================================
export const api = axios.create({
  baseURL: API_BASE,
});

// ================================
// ✨ Перехватчик — подставлять токен в headers.token
// ================================
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt_token");
  if (token) {
    config.headers.token = token; // ← главный фикс
  }
  return config;
});
