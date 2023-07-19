import { Layout } from "@/components/Layout/Layout";
import { SystemUI } from "@/components/UI/SystemUI";
import { gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { client } from "../_app";
import { User } from "@/types/User.Schema";
import { UserPage } from "@/components/user/userPage";
import { Product } from "@/types/Product";
import { useRouter } from "next/router";

const QUERY_ONE_USER = gql`
  query getUserById($input: String!) {
    userFindById(id: $input) {
      _id
      avatar
      email
      isOnline
      username
      reputation
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
      hasSold {
        date
        quantity
        userId
      }
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
const QUERY_PRODUCT_COUNT_OF_USERS = gql`
  query findCountProducts($input: ProductCountInput!) {
    countProducts(productCountInput: $input)
  }
`;
type props = {
  user: User;
  products: Product[];
  productsCount: number;
};
export default function UserProfilePage(props: props) {
  console.log(props);
  return (
    <Layout>
      <UserPage
        user={props.user}
        products={props.products}
        productsCount={props.productsCount}
      />
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
    const productsCountOfUser = await client.query({
      query: QUERY_PRODUCT_COUNT_OF_USERS,
      variables: {
        input: {
          userId: userId,
        },
      },
    });
    props = {
      user: user.data.userFindById,
      products: productsOfUser.data.productsOfUser,
      productsCount: productsCountOfUser.data.countProducts,
    };
  } catch (error) {
    console.log(error);
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
