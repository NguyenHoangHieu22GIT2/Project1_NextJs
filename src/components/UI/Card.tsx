import dynamic from "next/dynamic";
import { PropsWithChildren, ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion"

type AnyObject = {
  [key: string]: any
}

type props = {
  status?: string;
  children?: ReactNode | undefined;
  animation?: AnyObject;
  class?: string
};

function Card(props: props) {
  let borderColor = "border-2 border-gray";
  if (props.status === "success") {
    borderColor = "border-2 border-primary";
  } else if (props.status === "error") {
    borderColor = "border-2 border-buttonOutLineRed";
  }
  return (
    <motion.div
      {...props.animation}
      className={` ${props.class} ${borderColor} shadow-2xl gap-5  text-center    h-fit px-5 py-10 rounded-lg z-20`}
    >
      {props.children}
    </motion.div>
  );
}
export default dynamic(() => Promise.resolve(Card), { ssr: false });
