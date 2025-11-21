// frontend/src/api.js
import axios from "axios";

// Базовый URL бэка
export const API_BASE =
  import.meta.env.VITE_API_BASE ||
  "https://projectguard-prod-7-1.onrender.com";

console.log("🔥 api.js loaded, API_BASE =", API_BASE);

// Общий инстанс axios
export const api = axios.create({
  baseURL: API_BASE,
  timeout: 80000,
});

// 👉 к каждому запросу приклеиваем заголовок token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt_token");
  if (token) {
    config.headers["token"] = token; // <-- совпадает с get_current_user(token: Header)
  }
  return config;
});

// 👉 обработка ошибок (401 + таймауты)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.warn("⏱ Axios timeout:", error.config?.url);
    }

    if (error.response?.status === 401) {
      console.warn("🚫 401 от API — очищаю токен и перезагружаю страницу");
      localStorage.removeItem("jwt_token");
      localStorage.removeItem("role");

      // чтобы App заново показал LoginPage
      if (!window.__PG_AUTH_RELOADING) {
        window.__PG_AUTH_RELOADING = true;
        setTimeout(() => window.location.reload(), 200);
      }
    }

    return Promise.reject(error);
  }
);
