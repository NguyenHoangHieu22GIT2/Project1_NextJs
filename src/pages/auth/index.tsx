import { Auth } from "@/components/auth/Auth";
import { PropsWithChildren } from "react";

export default function AuthPage(props: PropsWithChildren) {
  return (
    <section className="py-5">
      <Auth />
    </section>
  );
}
