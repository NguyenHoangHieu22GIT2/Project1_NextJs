import { Introduction } from "@/components/Home/Introduction";
import { Wave } from "@/components/UI/Wave";
import { About } from "@/components/Home/About";
import { FeaturedProducts } from "@/components/Home/FeaturedProducts";
import { Testimonial } from "@/components/Home/Testimonial";
import { Contact } from "@/components/Home/Contact";
import { Layout } from "@/components/Layout/Layout";
import { GetStaticProps } from "next";
import { gql } from "@apollo/client";
import { client } from "./_app";
import { Product } from "@/types/Product";
import Head from "next/head";
import { Suspense } from "react";
import LoadingHomePage from "./loading";

const QUERY_ALL_PRODUCTS = gql`
  query getProducts($input: ProductFindOptions!) {
    products(productFindOptions: $input) {
      _id
      title
      description
      images
      price
      userId
      discount
    }
  }
`;
type props = {
  products: Product[];
  loading: boolean;
};
export default function Home(props: props) {
  return (
    <>
      <Head>
        <title>K-rose</title>
        <meta property="og:title" content="K-rose" key="title" />
      </Head>
      <Layout>
        <Suspense fallback={<LoadingHomePage />}>
          <Introduction />
          <Wave />
          <About />
          <Wave />
          <FeaturedProducts loading={props.loading} products={props.products} />
          <Wave />
          <Testimonial />
          <Wave />
          <Contact />
        </Suspense>
      </Layout>
    </>
  );
}
//@ts-ignore
export const getStaticProps: GetStaticProps = async (context) => {
  let props;
  try {
    const { data, loading } = await client.query({
      query: QUERY_ALL_PRODUCTS,
      variables: {
        input: { skip: 0, limit: 3 },
      },
      fetchPolicy: "no-cache",
    });
    if (data) {
      props = {
        products: data.products,
        loading,
      };
    }
  } catch (error) {
    console.log(error);
    props = {
      notFound: true,
    };
  }
  return {
    props,
  };
};
