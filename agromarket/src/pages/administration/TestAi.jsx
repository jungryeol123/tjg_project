import { useEffect, useState } from "react";
import axios from "axios";

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
