import { PropsWithChildren } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Modal(props: PropsWithChildren) {
  return <div>{props.children}</div>;
}
