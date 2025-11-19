import { useEffect } from "react";
import { api } from "./api";

export default function APITest() {
  useEffect(() => {
    console.log("🚀 API TEST started");

    api.get("/api/ping")
      .then(res => console.log("🔥 PING OK:", res.data))
      .catch(err => console.log("❌ PING ERROR:", err));
  }, []);

  return (
    <div style={{ padding: 40, fontSize: 30, color: "white" }}>
      API TEST PAGE
    </div>
  );
}
