import { PropsWithChildren } from "react";
import { AnimatePresence, motion } from "framer-motion";
export function Main(props: PropsWithChildren) {
  return (
    <main className="flex-1">
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          window.scrollTo(0, 0);
          console.log("Hello World");
        }}
      >
        {props.children}
      </AnimatePresence>
    </main>
  );
}
