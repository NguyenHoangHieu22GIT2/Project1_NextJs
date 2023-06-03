import { useAppDispatch } from "@/store";
import { authActions } from "@/store/auth";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCheckAuth } from "@/hooks/useCheckAuth";

export function Logout() {
  const route = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(authActions.logout());
    sessionStorage.removeItem("token");
    route.replace("/");
  });
  return (
    <h1 className="text-heading text-white text-center py-10">
      Logging out...
    </h1>
  );
}
