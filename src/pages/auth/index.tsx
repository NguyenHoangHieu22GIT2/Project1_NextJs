import { Layout } from "@/components/Layout/Layout";
import { Auth } from "@/components/auth/Auth";
import { PropsWithChildren } from "react";

export default function AuthPage(props: PropsWithChildren) {
  return (
    <Layout>
      <Auth />
    </Layout>
  );
}
