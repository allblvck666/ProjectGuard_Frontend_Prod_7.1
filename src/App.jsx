export default function App() {
  console.log("🔥 Минималка загружена", new Date().toISOString());

  return (
    <div
      style={{
        padding: 40,
        textAlign: "center",
        fontSize: 24,
        color: "white",
      }}
    >
      <h1>🔥 TEST BUILD — MINIMAL APP.JSX</h1>
      <p>Если ты видишь этот текст без перезагрузок — фронт работает стабильно.</p>
      <p>
        Если Телеграм перезагружается — проблема вне App.jsx (meta, index.html,
        WebApp init, Render headers).
      </p>
    </div>
  );
}
