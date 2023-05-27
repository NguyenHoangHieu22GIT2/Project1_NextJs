import { Layout } from "@/components/Layout/Layout";
import { Auth } from "@/components/auth/Auth";
import { randomBytes } from "crypto";
import { GetServerSideProps } from "next";
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

export const getServerSideProps: GetServerSideProps = () => {
  const salt = randomBytes(12).toString("hex");
  return {
    props: {
      salt,
    },
  };
};
