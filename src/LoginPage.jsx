// frontend/src/LoginPage.jsx
import { useState } from "react";
import { API_BASE } from "./api";
import "./App.css";

export default function LoginPage({ onLogin }) {
  const [tgId, setTgId] = useState("426188469");
  const [username, setUsername] = useState("messiah");
  const [firstName, setFirstName] = useState("Дмитрий");
  const [loading, setLoading] = useState(false);

  const doDevLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/dev-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tg_id: Number(tgId),
          username,
          first_name: firstName,
          role: "superadmin", // ты
        }),
      });

      const data = await res.json();
      console.log("DEV LOGIN RESPONSE =", data);

      if (!data.ok || !data.token) {
        alert("❌ Ошибка входа (dev-login)");
        return;
      }

      // кладём токен и роль туда, откуда читает App.jsx и interceptors
      localStorage.setItem("jwt_token", data.token);
      localStorage.setItem("role", data.role || "superadmin");

      // сообщаем App, что логин успешен
      onLogin(data.role || "superadmin");
    } catch (e) {
      console.error(e);
      alert("Ошибка запроса к серверу");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Вход через Telegram</h1>
        <p className="login-subtitle">
          Авторизуйтесь, чтобы попасть в ProjectGuard
        </p>

        {/* Большая кнопка под Telegram WebApp (на будущее) */}
        <button
          className="btn login-btn"
          type="button"
          onClick={() => alert("Пока используем ручной вход ниже 👇")}
        >
          🚪 Войти через Telegram
        </button>

        <p className="login-divider">или ручной вход (для тестов)</p>

        <label className="login-label">
          Telegram ID
          <input
            className="input"
            value={tgId}
            onChange={(e) => setTgId(e.target.value)}
          />
        </label>

        <label className="login-label">
          Username
          <input
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="@username"
          />
        </label>

        <label className="login-label">
          Имя
          <input
            className="input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>

        <button
          className="btn login-btn"
          type="button"
          onClick={doDevLogin}
          disabled={loading}
        >
          {loading ? "Входим…" : "Войти вручную (superadmin)"}
        </button>
      </div>
    </div>
  );
}
