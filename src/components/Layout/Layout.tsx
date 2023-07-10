import { PropsWithChildren, useEffect } from "react";
import { GoUp } from "@/components/UI/GoUp";
import { Main } from "./Main";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/store";
import { ApolloError, gql } from "@apollo/client";
import { client, socket } from "@/pages/_app";
import { authActions } from "@/store/auth";
import { getJwtToken, removeAllKey } from "@/utils/sessionInteraction";
import { LightNotification } from "../UI/LightNotification";
import { ChatBoxes } from "../chat/ChatBoxes";
import { User } from "@/types/User.Schema";
import { chatboxActions } from "@/store/chatbox";
import { lightNotificationActions } from "@/store/lightNotification";
const QUERY_CHECK_USER = gql`
  query checkToken($input: String!) {
    CheckJwtToken(token: $input) {
      _id
      avatar
      email
      username
    }
  }
`;
export function Layout(props: PropsWithChildren) {
  const lightNotification = useAppSelector((state) => state.lightNotification);
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (auth.token) {
      socket.connect();
    }
    socket.on("sendRoomLite", (data) => {
      // if (
      //   data.notification.userId &&
      //   data.notification.userId.toString() === auth.userId.toString()
      // ) {
      //   dispatch(
      //     lightNotificationActions.createNotification({
      //       status: "messages",
      //       title: "You receivied a message",
      //     })
      //   );
      // }
      let thatUser = data.users.filter((user: User) => {
        return user._id.toString() !== auth.userId.toString();
      });
      dispatch(
        chatboxActions.joinRoom({
          history: data.history,
          roomId: data.roomId,
          user: thatUser[0],
        })
      );
    });
  }, [socket]);
  useEffect(() => {
    if (typeof window !== undefined && getJwtToken())
      client
        .query({
          query: QUERY_CHECK_USER,
          variables: {
            input: getJwtToken() || "",
          },
        })
        .then((result) => {
          if (result.data) {
            dispatch(
              authActions.login({
                token: getJwtToken()!,
                userId: result.data.CheckJwtToken._id,
                avatar: result.data.CheckJwtToken.avatar,
                email: result.data.CheckJwtToken.email,
                username: result.data.CheckJwtToken.username,
              })
            );
            sessionStorage.setItem("userId", result.data.CheckJwtToken._id);
          }
          if (result.error) {
            console.log(result.error);
            removeAllKey();
          }
        })
        .catch((error: ApolloError) => {
          console.log(error);
          removeAllKey();
        });
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen"
    >
      <Main>{props.children}</Main>
      <GoUp />
      <AnimatePresence>
        {lightNotification.status && (
          <LightNotification
            key={Math.random()}
            state={lightNotification.status}
            title={lightNotification.title}
          />
        )}
        <ChatBoxes />
      </AnimatePresence>
    </motion.div>
  );
}
