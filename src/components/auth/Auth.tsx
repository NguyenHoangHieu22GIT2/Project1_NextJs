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

const QUERY_TOKEN_NEW_USER = gql`
  query verifyToken($input: LoginVerifyToken!) {
    verifyToken(loginVerifyToken: $input) {
      email
    }
  }
`;

export function Auth() {
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
    }
  }

  function doesHaveToken(token: string) {
    console.log(token);
    setMessage(token);
  }

  return (
    <section className="py-5">
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
          {!message && (
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
        <div className="col-span-12 bg-slate-400 py-5 px-2 rounded-lg grid grid-cols-12 gap-2">
          <button
            onClick={chooseLogin}
            className={`${isLogin ? "bg-primary" : "bg-subPrimary hover:bg-primary/80"
              } py-2 text-neutral-800 rounded-lg col-span-6  font-bold transition`}
          >
            Login
          </button>
          <button
            onClick={chooseRegister}
            className={`${!isLogin ? "bg-primary" : "bg-subPrimary hover:bg-primary/80"
              } rounded-lg col-span-6 text-slate-900 font-bold transition`}
          >
            Register
          </button>
        </div>
        <div className="col-span-12 pt-5 grid grid-cols-12">
          <div className="xl:col-span-6 text-gray-800 font-bold col-span-12  ">
            {isLogin ? (
              <>
                <h1 className="text-heading ">Rules</h1>
                <ol className="list-decimal ">
                  <li>
                    <p>You have to register first to login!</p>
                  </li>
                  <li>
                    <p>
                      The password has to match with the password that you have
                      registered
                    </p>
                  </li>
                  <li>
                    <p>Try not to DDOS us, thank you :D</p>
                  </li>
                </ol>
              </>
            ) : (
              <>
                <h1 className="text-heading ">Rules</h1>
                <ol className="list-decimal">
                  <li>
                    <p>
                      Email should contain <code>@</code> Of course!
                    </p>
                  </li>
                  <li>
                    <p>
                      The password should have at least 1 lowercase, 1
                      uppercase, 1 symbol and 1 number, also it should be at
                      least 5 characters long
                    </p>
                  </li>
                  <li>
                    <p>
                      A username for a cool guy like you is neccessary as well
                      :D
                    </p>
                  </li>
                </ol>
              </>
            )}
          </div>
          <div className="xl:col-span-6  pt-10 col-span-12">
            {isLogin ? <Login onHaveToken={doesHaveToken} /> : <Register />}
          </div>
        </div>
      </SystemUI>
    </section>
  );
}
export default dynamic(() => Promise.resolve(Auth), { ssr: false });
