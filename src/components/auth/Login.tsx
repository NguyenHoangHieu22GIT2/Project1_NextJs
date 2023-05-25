import { Dispatch, FormEvent, PropsWithChildren, SetStateAction } from "react";
import { Input } from "../UI/Input";
import { useInput } from "@/hooks/useInput";
import { Button } from "../UI/Button";
import { gql, useLazyQuery } from "@apollo/client";
import { useAppDispatch } from "@/store";
import { authActions } from "@/store/auth";
import { notificationActions } from "@/store/notification";
import Link from "next/link";

const QUERY_LOGIN_USER = gql`
  query login($input: LoginUserInput!) {
    login(loginUserInput: $input) {
      __typename
      ... on jwtToken {
        access_token
        userId
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
  const [login] = useLazyQuery(QUERY_LOGIN_USER);
  const formValid = emailInput.isValid && passwordInput.isValid;
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formValid) {
      login({
        variables: {
          input: { email: emailInput.value, password: passwordInput.value },
        },
      }).then((result) => {
        console.log(result);
        if (result.data && result.data.login.message)
          dispatch(
            notificationActions.createNotification({
              status: "token",
              title: "Enter the token",
              description: "Please enter the Token to be able to continue...",
            })
          );
        else if (result.data && result.data.login.access_token) {
          props.onHaveToken(result.data.login.access_token);
          sessionStorage.setItem("token", result.data.login.access_token);
          sessionStorage.setItem("userId", result.data.login.userId);
          dispatch(
            authActions.login({
              token: result.data.login.access_token,
              userId: result.data.login.userId,
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
        } else if (result.error) {
          props.onHaveToken(result.error.name);
          dispatch(
            notificationActions.createNotification({
              status: "error",
              title: "Login Failed",
              description: "Please check your credentials again! :(",
            })
          );
        }
      });
    }
  }
  return (
    <form onSubmit={submit} method="post" className="[&>*]:mb-10 ">
      <Input label="Email" type="text" input={emailInput} />
      <Input label="Password" type="password" input={passwordInput} />
      <Link
        href="auth/forgot-password"
        className=" w-fit px-2 py-1  text-blue-800 font-bold rounded-lg"
      >
        Forgot Password?
      </Link>
      <Button classNames="px-10">Login</Button>
    </form>
  );
};
