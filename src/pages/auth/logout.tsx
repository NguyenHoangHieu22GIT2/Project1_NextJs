import { Logout } from "@/components/auth/Logout";
import { useEffect } from "react";
import { socket } from "../_app";

export default function LogoutPage() {
  useEffect(() => {
    socket.disconnect();
  }, []);
  return <Logout />;
}
