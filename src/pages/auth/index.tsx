import { Layout } from "@/components/Layout/Layout";
import { Auth } from "@/components/auth/Auth";
import { randomBytes } from "crypto";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { PropsWithChildren } from "react";

type props = {
  salt: string;
};

export default function AuthPage(props: props) {
  return (
    <Layout>
      <Auth salt={props.salt} />
    </Layout>
  );
}
export function getServerSideProps(context: GetServerSidePropsContext) {
  const salt = randomBytes(12).toString("hex");
  return {
    props: {
      salt,
    },
  };
}
