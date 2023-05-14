import { PropsWithChildren, ReactNode } from "react";
import Card from "./Card";
import { Button } from "./Button";
import { useAppSelector } from "@/store";
import Popup from "./Popup";
import { AnimatePresence, motion } from "framer-motion";

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
  return (
    <>
      <AnimatePresence mode="wait">
        {notificationState.status && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
          >
            <Popup
              isOpen={notificationState.status.length > 0}
              onClick={onClickFunction.bind(null, notificationState.status)}
            >
              <Card status={notificationState.status}>
                <h1 className="xl:text-4xl text-center font-bold text-2xl text-primary">
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
