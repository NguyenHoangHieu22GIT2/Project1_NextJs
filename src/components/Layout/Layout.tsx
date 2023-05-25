import { PropsWithChildren, useEffect } from "react";
import { GoUp } from "@/components/UI/GoUp";
import { Main } from "./Main";
import { motion } from "framer-motion";
import { useAppDispatch } from "@/store";
import { gql } from "@apollo/client";
import { client } from "@/pages/_app";
import { authActions } from "@/store/auth";
import { getJwtToken, removeAllKey } from "@/utils/sessionInteraction";
const QUERY_CHECK_USER = gql`
  query checkToken($input: String!) {
    CheckJwtToken(token: $input) {
      _id
    }
  }
`;
export function Layout(props: PropsWithChildren) {
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
              })
            );
            sessionStorage.setItem("userId", result.data.CheckJwtToken._id);
          }
          if (result.error) {
            removeAllKey();
          }
        })
        .catch(() => {
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
    </motion.div>
  );
}
