import { Layout } from "@/components/Layout/Layout";
import { CreateProduct } from "@/components/create-product/Create-Product";
import { useCheckAuth } from "@/hooks/useCheckAuth";
import { useToken } from "@/hooks/useToken";
import { randomBytes } from "crypto";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

type props = {
  salt: string;
};

export default function CreateProductPage(props: props) {
  const router = useRouter();
  const token = useToken();
  const isAuth = useCheckAuth();
  useEffect(() => {
    if (typeof window !== undefined && isAuth != undefined) {
      !isAuth && router.push("/auth");
    }
  }, []);
  return (
    <Layout>
      <Head>
        <title>Create Products</title>
      </Head>
      <CreateProduct salt={props.salt} token={token} />
    </Layout>
  );
}
//@ts-ignore
export const getServerSideProps: GetServerSideProps = (context) => {
  const salt = randomBytes(12).toString("hex");
  return {
    props: {
      salt,
    },
  };
};
