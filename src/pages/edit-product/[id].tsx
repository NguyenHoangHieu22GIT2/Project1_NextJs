import { Layout } from "@/components/Layout/Layout";
import { EditProduct } from "@/components/edit-product/EditProduct";
import { useToken } from "@/hooks/useToken";
import { randomBytes } from "crypto";
import { useRouter } from "next/router";
import React from "react";

type props = {
  salt: string;
};

export default function EditProductPage(props: props) {
  const router = useRouter();
  const token = useToken();

  const _id = router.query.id as string;
  return (
    <Layout>
      <EditProduct _id={_id} salt={props.salt} token={token} />
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
