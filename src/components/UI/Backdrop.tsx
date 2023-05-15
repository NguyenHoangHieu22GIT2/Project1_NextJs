import { PropsWithChildren } from "react";
import { motion } from "framer-motion";
type props = {
  onClick: () => void;
};

export function Backdrop(props: props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={props.onClick}
      className="fixed z-10 top-0 left-0 w-screen h-screen bg-slate-900/50"
    ></motion.div>
  );
}
