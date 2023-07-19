import { PropsWithChildren, ReactNode } from "react";
import Card from "./Card";
import { Button } from "./Button";
import { useAppSelector } from "@/store";
import Popup from "./Popup";
import { AnimatePresence } from "framer-motion";
type AnyObject = {
  [key: string]: any;
};
type props = {
  onClickFunction: (status?: string) => void;
  buttonContent: string;
  children?: ReactNode | undefined;
};

export function NotificationCard({
  buttonContent,
  onClickFunction,
  children,
}: props) {
  const notificationState = useAppSelector((state) => state.notification);
  const animation = {
    initial: { y: 100, opacity: 0, x: "-50%" },
    animate: { y: "-50%", opacity: 1 },
    exit: { y: -300, opacity: 0 },
  };
  return (
    <AnimatePresence mode="wait">
      {notificationState.status && (
        <Popup
          animation={animation}
          isOpen={notificationState.status.length > 0}
          onClick={onClickFunction.bind(null, notificationState.status)}
        >
          <Card class="bg-white" status={notificationState.status}>
            <h1 className="sm:text-4xl text-center font-bold text-2xl text-primary">
              {notificationState.title}
            </h1>
            <p className="text-2xl">{notificationState.description}</p>
            {children}
            <Button
              onClick={onClickFunction.bind(null, notificationState.status)}
            >
              {buttonContent}
            </Button>
          </Card>
        </Popup>
      )}
    </AnimatePresence>
  );
}
