import { PropsWithChildren } from "react";
import { AnimatePresence, motion } from "framer-motion";
export function Main(props: PropsWithChildren) {
  return <main className="flex-1">{props.children}</main>;
}
