import { PropsWithChildren, useEffect } from "react";
import { GoUp } from "@/components/UI/GoUp";
import { Footer } from "./Footer";
import Header from "./Header";
import { useAppDispatch } from "@/store";
import { authActions } from "@/store/auth";
import { Main } from "./Main";

export function Layout(props: PropsWithChildren) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (sessionStorage.getItem("token"))
      dispatch(
        authActions.login({ token: sessionStorage.getItem("token") || "" })
      );
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Main>{props.children}</Main>
      <Footer />
      <GoUp />
    </div>
  );
}
