import { Layout } from "@/components/Layout/Layout";
import { CreateProduct } from "@/components/create-product/Create-Product";
import { useCheckAuth } from "@/hooks/useCheckAuth";
import { useToken } from "@/hooks/useToken";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function CreateProductPage() {
  const router = useRouter();
  const token = useToken();
  const isAuth = useCheckAuth();
  useEffect(() => {
    if (typeof window !== undefined && isAuth != undefined) {
      !isAuth && router.push("/auth");console.log("Helloauth")}
  }, []);
  return (
    <Layout>
      <Head>
        <title>Create Products</title>
      </Head>
      <CreateProduct token={token} />
    </Layout>
  );
}
