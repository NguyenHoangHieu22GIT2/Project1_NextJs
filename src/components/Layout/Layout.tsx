import { PropsWithChildren, useEffect } from "react";
import { GoUp } from "@/components/UI/GoUp";
import { Main } from "./Main";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/store";
import { ApolloError, gql } from "@apollo/client";
import { client } from "@/pages/_app";
import { authActions } from "@/store/auth";
import { getJwtToken, removeAllKey } from "@/utils/sessionInteraction";
import { LightNotification } from "../UI/LightNotification";
import { ChatBoxes } from "../chat/ChatBoxes";
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
  const dispatch = useAppDispatch();
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
      <AnimatePresence mode="wait">
        {lightNotification.status && (
          <LightNotification
            state={lightNotification.status}
            title={lightNotification.title}
          />
        )}
        <ChatBoxes />
      </AnimatePresence>
    </motion.div>
  );
}
