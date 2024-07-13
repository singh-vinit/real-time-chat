import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MessageList from "../components/MessageList";
interface Props {
  socket: WebSocket | null;
}
interface Response {
  action: string;
  username: string;
  message: string;
}

interface Messages {
  username: string;
  message: string;
}

export function ChatRoom({ socket }: Props) {
  const [messages, setMessages] = useState<Messages[]>([]);
  const [send, setSend] = useState("");
  const { id } = useParams();

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const data: Response = JSON.parse(event.data);
        if (data.action === "message") {
          setMessages((curr) => [
            ...curr,
            { username: data.username, message: data.message },
          ]);
        }
      };
    }
    console.log(messages)
  }, [send]);

  function sendHandler() {
    const data = { action: "message", roomId: id, message: send };
    socket?.send(JSON.stringify(data));
  }

  console.log(messages);

  return (
    <div className="border p-4 h-screen flex flex-col justify-center items-center">
      <MessageList messages={messages} />
      <div className="w-full flex justify-center gap-x-4">
        <input
          type="text"
          className="border border-gray-500 w-1/2 text-lg p-[4px]  focus:outline-rose-500"
          onChange={(e) => setSend(e.target.value)}
        />
        <button
          className="bg-rose-600 font-medium text-white rounded-sm py-2 px-3 hover:scale-95"
          onClick={sendHandler}
        >
          send
        </button>
      </div>
    </div>
  );
}
