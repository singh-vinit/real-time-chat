import { useEffect, useState } from "react";

function App() {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [received, setReceived] = useState("");
  const [message, setMessage] = useState("");

  function handler() {
    ws?.send(message);
  }

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      console.log("connection successful!");
      setWs(socket);
    };
    socket.onmessage = (event) => {
      setReceived(event.data);
    };
  }, []);

  return (
    <div>
      <input type="text" onChange={(e) => setMessage(e.target.value)} />
      <button onClick={handler}>send</button>
      <div>{received}</div>
    </div>
  );
}

export default App;
