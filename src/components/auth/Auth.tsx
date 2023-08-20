import { useAppDispatch } from "@/store";
import { notificationActions } from "@/store/notification";
import { gql, useLazyQuery } from "@apollo/client";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { NotificationCard } from "../UI/NotificationCard";
import { SystemUI } from "../UI/SystemUI";
import { Login } from "./Login";
import { Register } from "./Register";
import { AnimatePresence } from "framer-motion";

const QUERY_TOKEN_NEW_USER = gql`
  query verifyToken($input: LoginVerifyToken!) {
    verifyToken(loginVerifyToken: $input) {
      email
    }
  }
`;

type props = {
  salt: string;
};

export function Auth(props: props) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const [checkTokenFn, { loading, data, error }] =
    useLazyQuery(QUERY_TOKEN_NEW_USER);
  let isAuth: string | null;
  if (typeof window !== "undefined") {
    isAuth = sessionStorage.getItem("token");
  }
  useEffect(() => {
    if (isAuth) router.replace("/");
  }, []);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  function chooseLogin() {
    setIsLogin(true);
  }
  function chooseRegister() {
    setIsLogin(false);
  }
  function redirect() {
    dispatch(notificationActions.deleteNotification({}));
    router.replace("/");
  }
  function turnOffCard() {
    dispatch(notificationActions.deleteNotification({}));
  }

  async function submitToken(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = await checkTokenFn({
      variables: { input: { token: token } },
    });
    if (result.error) {
      dispatch(
        notificationActions.createNotification({
          status: "error",
          title: "Wrong Token",
          description: "asd",
        })
      );
    } else {
      dispatch(notificationActions.deleteNotification({}));
    }
  }

  function doesHaveToken(token: string) {
    setMessage(token);
  }
  return (
    <section className="py-5 overflow-hidden">
      <SystemUI>
        <NotificationCard
          buttonContent="Go Back"
          onClickFunction={(status) => {
            if (status === "success") {
              redirect();
            } else {
              turnOffCard();
            }
          }}
        >
          {message && (
            <form onSubmit={submitToken} action="">
              <h1>Enter the token:</h1>
              <input
                onChange={(e) => setToken(e.target.value)}
                type="text"
                name=""
                id=""
              />
              <button>Check Token</button>
            </form>
          )}
        </NotificationCard>
        <div className="grid grid-cols-12 col-span-12 gap-2 px-2 py-5 rounded-lg bg-slate-400">
          <button
            onClick={chooseLogin}
            className={`${
              isLogin ? "bg-primary" : "bg-subPrimary hover:bg-primary/80"
            } py-2 text-neutral-800 rounded-lg col-span-6  font-bold transition`}
          >
            Login
          </button>
          <button
            onClick={chooseRegister}
            className={`${
              !isLogin ? "bg-primary" : "bg-subPrimary hover:bg-primary/80"
            } rounded-lg col-span-6 text-slate-900 font-bold transition`}
          >
            Register
          </button>
        </div>
        <div className="col-span-12 pt-10">
          <AnimatePresence mode="wait">
            {isLogin && <Login onHaveToken={doesHaveToken} />}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {!isLogin && <Register salt={props.salt} />}
          </AnimatePresence>
        </div>
      </SystemUI>
    </section>
  );
}
export default dynamic(() => Promise.resolve(Auth), { ssr: false });
