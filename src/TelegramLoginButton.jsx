// frontend/src/TelegramLoginButton.jsx

export default function TelegramLoginButton() {
  const startTelegramLogin = () => {
    // НОРМАЛЬНЫЙ путь на backend: чистый callback
    window.location.href =
      "https://projectguard-prod-7-1.onrender.com/api/auth/telegram-login";
  };

  return (
    <button
      onClick={startTelegramLogin}
      style={{
        background: "#4d6eeb",
        color: "white",
        padding: "12px 20px",
        borderRadius: 12,
        border: "none",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: 16,
      }}
    >
      🔐 Войти через Telegram
    </button>
  );
}
