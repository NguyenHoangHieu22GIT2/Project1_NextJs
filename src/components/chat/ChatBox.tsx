import { useInput } from "@/hooks/useInput";
import { TextArea } from "../UI/Textarea";
import { Input } from "../UI/Input";
import { Message } from "./Message";
import { socket } from "@/pages/_app";
import { useEffect, useState } from "react";
import { room } from "@/types/Room";
import { message } from "@/types/message";
import { useAppDispatch } from "@/store";
import { chatboxActions } from "@/store/chatbox";
type props = {
  receiverUsername: string;
  receiverId: string;
  senderId: string;
  roomId: string;
  history: message[];
};
export function ChatBox(props: props) {
  console.log(props.history);
  const dispatch = useAppDispatch();
  const [history, setHistory] = useState<message[]>([]);
  const chatInput = useInput((data) => data.trim().length > 0);
  function closeChatBox() {
    console.log("Hello World");
    dispatch(chatboxActions.exitRoom({ roomId: props.roomId }));
  }
  async function sendMessage() {
    //  message: string;
    // sender: string;
    // date: Date;
    // roomId: string;
    socket.emit("sendMessage", {
      message: chatInput.value,
      sender: props.senderId,
      date: new Date(),
      roomId: props.roomId,
    });
  }
  useEffect(() => {
    setHistory(props.history);
  }, []);
  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setHistory((prevHistory) => [...prevHistory, data]);
    });
    return () => {
      socket.off("sendMessage");
    };
  }, [socket]);
  return (
    <div className="w-80 h-[30rem] block bg-slate-200   ">
      <div className="flex justify-between bg-slate-700 text-white px-5 py-2 ">
        <h3>{props.receiverUsername}</h3>
        <button onClick={closeChatBox} className="cursor-pointer">
          X
        </button>
      </div>
      <div className="overflow-y-scroll h-[80%]">
        <ul className="px-5 py-2 flex gap-3 flex-col items-start  ">
          {history.map((message) => {
            if (message.sender === props.senderId) {
              console.log("I'm here");
              return (
                <Message
                  key={message.date.toString() + Math.random().toString()}
                  userOrNot={true}
                >
                  {message.message}
                </Message>
              );
            } else {
              return (
                <Message
                  key={message.date.toString() + Math.random().toString()}
                  userOrNot={false}
                >
                  {message.message}
                </Message>
              );
            }
          })}
        </ul>
      </div>
      <div className="mx-5 my-2 flex ">
        <Input input={chatInput} label="" type="text" />
        <button onClick={sendMessage} className="basis-1/4">
          Send
        </button>
      </div>
    </div>
  );
}
