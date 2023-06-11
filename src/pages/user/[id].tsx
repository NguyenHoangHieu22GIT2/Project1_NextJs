import { Layout } from "@/components/Layout/Layout";
import { SystemUI } from "@/components/UI/SystemUI";
import { gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { client } from "../_app";
import { User } from "@/types/User.Schema";
import { UserPage } from "@/components/user/userPage";
import { Product } from "@/types/Product";

const QUERY_ONE_USER = gql`
  query getUserById($input: String!) {
    userFindById(id: $input) {
      avatar
      email
      isOnline
      username
    }
  }
`;

const QUERY_USER_PRODUCTS = gql`
  query findAllProductsOfUser($input: String!) {
    productsOfUser(userId: $input) {
      title
      description
      discount
      _id
      hasSold
      images
      price
      ratings {
        userId
        stars
      }
      stock
    }
  }
`;

type props = {
  user: User;
  products: Product[];
};
export default function UserProfilePage(props: props) {
  console.log(props.user);
  return (
    <Layout>
      <UserPage user={props.user} products={props.products} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = context.query.id;
  let props;
  try {
    const user = await client.query({
      query: QUERY_ONE_USER,
      variables: { input: userId },
    });
    const productsOfUser = await client.query({
      query: QUERY_USER_PRODUCTS,
      variables: { input: userId },
    });
    props = {
      user: user.data.userFindById,
      products: productsOfUser.data.productsOfUser,
    };
  } catch (error) {
    props = {
      notFound: true,
    };
  }
  if (props.notFound) {
    return {
      notFound: true,
    };
  }
  return {
    props,
  };
};
