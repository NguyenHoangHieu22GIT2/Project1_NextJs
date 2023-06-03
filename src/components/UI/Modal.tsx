import { PropsWithChildren, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
type props = {
  animation: AnyObject;
  children?: ReactNode | undefined;
  isHeader?: boolean;
};
type AnyObject = {
  [key: string]: any;
};
export function Modal(props: props) {
  return (
    <motion.div
      {...props.animation}
      className={`fixed z-50
        ${
          !props.isHeader &&
          " top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 "
        }
        `}
    >
      {props.children}
    </motion.div>
  );
}
