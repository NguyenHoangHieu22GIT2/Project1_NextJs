import { useAppSelector } from "@/store";
import { ChatBox } from "./ChatBox";
export function ChatBoxes() {
  const chatboxes = useAppSelector((state) => state.chatbox);
  const auth = useAppSelector((state) => state.auth);
  console.log(chatboxes);
  return (
    <section className="fixed bottom-0 right-0">
      {chatboxes.map((room) => (
        <ChatBox
          roomId={room.roomId}
          key={room.roomId}
          receiverUsername={room.user.username}
          receiverId={room.user._id}
          history={room.history}
          senderId={auth.userId}
        />
      ))}
    </section>
  );
}
