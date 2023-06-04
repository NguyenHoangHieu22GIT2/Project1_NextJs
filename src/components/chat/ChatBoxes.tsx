import { useAppSelector } from "@/store";
import { ChatBox } from "./ChatBox";
import { motion } from "framer-motion";
export function ChatBoxes() {
  const chatboxes = useAppSelector((state) => state.chatbox);
  const auth = useAppSelector((state) => state.auth);
  return (
    <motion.section className="fixed flex flex-row-reverse gap-5 bottom-0 right-0">
      {chatboxes.map((room, index) => {
        if (index < 3)
          return (
            <ChatBox
              roomId={room.roomId}
              key={room.roomId}
              receiverUsername={room.user.username}
              receiverId={room.user._id}
              history={room.history}
              senderId={auth.userId}
            />
          );
      })}
    </motion.section>
  );
}
