// frontend/src/api.js
import axios from "axios";

export const API_BASE =
  import.meta.env.VITE_API_BASE || "https://projectguard-prod-7-1.onrender.com";

// ключ, под которым храним токен
const TOKEN_KEY = "pg_token";

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 60000, // до 60 секунд на холодный старт Render
});

// === Работа с токеном ===
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

// при загрузке приложения — пытаемся подцепить токен
// берём либо pg_token, либо старый jwt_token (если вдруг он остался)
const savedToken =
  localStorage.getItem(TOKEN_KEY) || localStorage.getItem("jwt_token");

if (savedToken) {
  setAuthToken(savedToken);
}

// === Перехват ответов ===
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.warn("Timeout / холодный старт Render:", error.config?.url);
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      console.warn("401 от API:", error.config?.url);
      // НЕ делаем reload и не чистим токен — просто отдаём ошибку в компонент
    }

    return Promise.reject(error);
  }
);
