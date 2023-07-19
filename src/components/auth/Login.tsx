import { Dispatch, FormEvent, PropsWithChildren, SetStateAction } from "react";
import { Input } from "../UI/Input";
import { useInput } from "@/hooks/useInput";
import { Button } from "../UI/Button";
import { gql, useLazyQuery } from "@apollo/client";
import { useAppDispatch } from "@/store";
import { authActions } from "@/store/auth";
import { notificationActions } from "@/store/notification";
import Link from "next/link";
import { client } from "@/pages/_app";
import { motion } from "framer-motion";

const QUERY_LOGIN_USER = gql`
  query login($input: LoginUserInput!) {
    login(loginUserInput: $input) {
      __typename
      ... on jwtToken {
        access_token
        userId
        email
        username
        avatar
      }
      ... on ErrorHandler {
        message
      }
    }
  }
`;

type props = {
  onHaveToken: (token: string) => void;
};

export const Login: React.FC<props> = (props) => {
  const dispatch = useAppDispatch();
  const emailInput = useInput((data) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data);
  });
  const passwordInput = useInput((data) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`|}{[\]\\:;'<>,.?/])(?=.*[a-zA-Z]).{5,}$/.test(
      data
    );
  });
  // const [login] = useLazyQuery(QUERY_LOGIN_USER);
  const formValid = emailInput.isValid && passwordInput.isValid;
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formValid) {
      client
        .query({
          query: QUERY_LOGIN_USER,
          variables: {
            input: { email: emailInput.value, password: passwordInput.value },
          },
          fetchPolicy: "no-cache",
        })
        .then((result) => {
          if (result.data && result.data.login.message) {
            // console.log(result.data);
            props.onHaveToken(result.data.login.message);
            dispatch(
              notificationActions.createNotification({
                status: "token",
                title: "Enter the token",
                description: "Please enter the Token to be able to continue...",
              })
            );
          } else if (result.data && result.data.login.access_token) {
            props.onHaveToken("");
            sessionStorage.setItem("token", result.data.login.access_token);
            sessionStorage.setItem("userId", result.data.login.userId);
            dispatch(
              authActions.login({
                token: result.data.login.access_token,
                userId: result.data.login.userId,
                avatar: result.data.login.avatar,
                email: result.data.login.email,
                username: result.data.login.username,
              })
            );
            dispatch(
              notificationActions.createNotification({
                status: "success",
                title: "Login successfully",
                description:
                  "Welcome abroad, Hope you have fun using our website.",
              })
            );
          }
        })
        .catch((err) => {
          dispatch(
            notificationActions.createNotification({
              status: "error",
              title: "Validation failed!",
              description: err.message,
            })
          );
        });
    }
  }
  return (
    <motion.form
      initial={{ x: -1000 }}
      animate={{ x: -200, display: "hidden" }}
      exit={{ x: -1200 }}
      onSubmit={submit}
      method="post"
      className="[&>*]:mb-10 left-1/2 bg-white p-5 rounded-lg shadow-xl mx-auto w-[min(30vw,800px)] absolute"
    >
      <h1 className="text-3xl font-bold text-center uppercase">Login</h1>
      <Input label="Email" type="text" input={emailInput} />
      <Input label="Password" type="password" input={passwordInput} />
      <div className="flex items-center justify-between">
        <Button classNames="px-10">Login</Button>
        <Link
          href="auth/forgot-password"
          className="px-2 py-1 text-sm font-bold text-gray-400 rounded-lg w-fit"
        >
          Forgot Password?
        </Link>
      </div>
    </motion.form>
  );
};
