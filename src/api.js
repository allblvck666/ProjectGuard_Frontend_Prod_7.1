// frontend/src/api.js
import axios from "axios";

export const API_BASE =
  import.meta.env.VITE_API_BASE || "https://projectguard-prod-7-1.onrender.com";

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 60000, // даём до 60 сек на холодный старт Render
});

// === работа с токеном ===

const TOKEN_KEY = "pg_token";

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem(TOKEN_KEY, token);
    console.log("axios token set");
  } else {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem(TOKEN_KEY);
    console.log("axios token cleared");
  }
}

// при загрузке приложения пытаемся подцепить токен из localStorage
const savedToken = localStorage.getItem(TOKEN_KEY);
if (savedToken) {
  setAuthToken(savedToken);
}

// чтобы не было вечных перезагрузок на 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.warn("Timeout / холодный старт Render:", error.config?.url);
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      console.warn("401 от API:", error.config?.url);
      // НИЧЕГО не перезагружаем и не чистим — просто отдаём ошибку дальше
    }

    return Promise.reject(error);
  }
);
