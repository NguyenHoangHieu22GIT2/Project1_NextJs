import { useAppDispatch, useAppSelector } from "@/store";
import { lightNotificationActions } from "@/store/lightNotification";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
type props = {
  state: "sucess" | "error" | "warning" | string;
  title: string;
};

export function LightNotification(props: props) {
  let isGood = "";
  if (props.state === "sucess") {
    isGood = "before:bg-green-500";
  }
  if (props.state === "error") {
    isGood = "before:bg-red-500";
  } else if (props.state === "warning") {
    isGood = "before:bg-yellow-500";
  } else {
    isGood = "before:bg-gray-500";
  }
  const dispatch = useAppDispatch();
  return createPortal(
    <motion.div
      initial={{ x: 0, y: -100 }}
      animate={{ x: 0, y: 0 }}
      exit={{ x: 0, y: 100, transition: { duration: 4, delay: 4 } }}
      onAnimationComplete={() => {
        dispatch(lightNotificationActions.deleteNotification({}));
      }}
      className={`fixed z-50 bottom-5 right-5  px-5 py-2 drop-shadow-2xl shadow-cyan-900  bg-white
      before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-[100%] before:transition-all before:animate-runOutOfTime before:h-2 ${isGood}    
      `}
    >
      {props.title}
    </motion.div>,
    document.querySelector("#lightNotification")!
  );
}
