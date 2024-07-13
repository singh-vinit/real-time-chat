import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Info {
  action: string;
  success: boolean;
  message: string;
}

export function Home({ socket }: { socket: WebSocket | null }) {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");

  const navigate = useNavigate();

  function createHandler() {
    const data = JSON.stringify({ action: "create", username, roomId });
    socket?.send(data);
    response();
  }

  function joinHandler() {
    const data = JSON.stringify({ action: "join", username, roomId });
    socket?.send(data);
    console.log("join room")
    response();
  }

  function response() {
    if (socket) {
      socket.onmessage = (event) => {
        const data: Info = JSON.parse(event.data);
        console.log(data);
        if (data.action === "info") {
          alert(data.message);
        }
        if (data.success) {
          navigate(`/room/${roomId}`);
        }
      };
    }
  }

  return (
    <>
      <div className="text-2xl font-bold capitalize border-2 text-center p-5 mb-20">
        chat room
      </div>
      <div className="flex justify-center">
        <div className="border p-5 rounded-md ring-1 ring-rose-400">
          <div className="flex gap-x-10 p-2">
            <label htmlFor="username" className="text-xl font-medium uppercase">
              username
            </label>
            <input
              id="username"
              type="text"
              placeholder="#legendsx"
              className="border border-gray-600 rounded p-1 focus:outline-rose-500"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex gap-x-14 p-2">
            <label htmlFor="room" className="text-xl font-medium uppercase">
              room id
            </label>
            <input
              id="room"
              type="text"
              placeholder="#4456"
              className="border border-gray-600 rounded p-1 focus:outline-rose-500"
              onChange={(e) => setRoomId(e.target.value)}
            />
          </div>
          <div className="flex gap-x-5 mt-4">
            <button
              className="bg-rose-500 font-medium text-white rounded-md py-2 px-3 hover:scale-95"
              onClick={createHandler}
            >
              create
            </button>
            <button
              className="bg-rose-500 font-medium text-white rounded-md py-2 px-3 hover:scale-95"
              onClick={joinHandler}
            >
              join
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
