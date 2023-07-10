import { PropsWithChildren } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppSelector } from "@/store";
export function Main(props: PropsWithChildren) {
  const auth = useAppSelector((state) => state.auth);
  return <main className="flex-1">{props.children}</main>;
}
