import { useInput } from "@/hooks/useInput";
import { Input } from "../UI/Input";
import { Message } from "./Message";
import { Send } from "../UI/SVG/Send";
import { socket } from "@/pages/_app";
import { message } from "@/types/message";
import { FormEvent, useEffect } from "react";

type props = {
  senderId: string;
  roomId: string;
  history: message[];
};

export function Messages(props: props) {
  //  navigator.mediaDevices.getUserMedia({})
  const chatInput = useInput((data) => data.trim().length > 0);
  async function sendMessage(e: FormEvent) {
    e.preventDefault();
    socket.emit("sendMessage", {
      message: chatInput.value,
      senderId: props.senderId,
      date: new Date(),
      roomId: props.roomId,
    });
    socket.emit("sendNotification", {
      senderId: props.senderId,
      roomId: props.roomId,
    });
  }

  return (
    <div className="flex gap-2 flex-col h-full justify-between">
      <div className="overflow-y-scroll basis-11/12 ">
        <ul className="px-5 py-2 flex gap-3 flex-col items-start  ">
          {props.history.map((message) => {
            if (message.sender === props.senderId) {
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
      <form onClick={sendMessage} className=" basis-1/12 flex ">
        <input
          onChange={(e) => {
            chatInput.changeValue(e.target.value.toString());
          }}
          onBlur={chatInput.changeBlur}
          value={chatInput.value}
          className={`w-full px-5 py-2 rounded-tl-lg rounded-bl-lg outline-none font-bold`}
          type={"text"}
        />
        <button className="basis-1/12 flex justify-center items-center rounded-tr-lg rounded-br-lg bg-blue-800">
          <Send />
        </button>
      </form>
    </div>
  );
}
