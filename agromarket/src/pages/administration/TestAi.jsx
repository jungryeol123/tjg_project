import axios from "axios";
import { useEffect, useState } from "react";

export default function TestAi() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    axios.get("/api/ai/test")
      .then((res) => setMsg(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>AI Test</h2>
      <p>{msg}</p>
    </div>
  );
}
