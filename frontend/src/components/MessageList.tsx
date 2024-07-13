interface Messages {
  username: string;
  message: string;
}

interface Props {
  messages: Messages[];
}

const MessageList = ({ messages }: Props) => {
  return (
    <div className="mb-8 border mx-auto w-1/2 h-3/4 overflow-scroll p-4 bg-[#FFE9D0]">
      {messages.map((data) => (
        <div className="flex items-center gap-x-4 mb-2">
          <div className="text-sm font-light text-[#FF204E]">
            {data.username}
          </div>
          <div className="grow text-lg font-semibold p-1 border border-rose-800 rounded text-[#FF204E]">
            {data.message}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
