import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { ChatRoom } from "./pages/ChatRoom";
import { useState, useEffect } from "react";

function App() {
  const [ws, setWs] = useState<WebSocket | null>(null);
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:4000");
    socket.onopen = () => {
      console.log("connection successful");
      setWs(socket);
      console.log(ws)
    };
  });

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home socket={ws} />} />
          <Route path="room/:id" element={<ChatRoom />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
