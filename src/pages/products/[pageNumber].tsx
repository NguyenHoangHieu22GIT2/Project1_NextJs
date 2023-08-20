import { Layout } from "@/components/Layout/Layout";
import { Filter } from "@/components/Products/Filter";
import { Finder } from "@/components/Products/Finder";
import { Pagination } from "@/components/Products/Pagination";
import { Products } from "@/components/Products/Products";
import { Product } from "@/types/Product";
import { ApolloError, gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Suspense, useEffect, useState } from "react";
import { client } from "../_app";
import Head from "next/head";
import { SystemUI } from "@/components/UI/SystemUI";
import { BackgroundContainer } from "@/components/UI/BackgroundContainer";
import LoadingPageNumber from "./loadingPageNumber";
type props = {
  pageNumber: number;
  productCounts: number;
  loading: boolean;
  search: string;
  products: Product[];
  loadProducts: boolean;
};

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
const QUERY_PRODUCTS_COUNT = gql`
  query findCountProducts($input: ProductCountInput!) {
    countProducts(productCountInput: $input)
  }
`;
const LIMIT = 2;
const SKIP = 2;

const ProductIndexPage: React.FC<props> = ({
  productCounts,
  loading,
  search,
  loadProducts,
  products,
}) => {
  const router = useRouter();

  let pageNumber = +router.query.pageNumber!;
  if (pageNumber !== pageNumber) {
    pageNumber = 1;
  }
  return (
    <Layout>
      <Head>
        <title>Products</title>
      </Head>
      {/* <Finder pageNumber={pageNumber} /> */}
      {/* <Filter /> */}
      <section className="py-5 sm:py-12">
        <SystemUI>
          <Suspense fallback={<LoadingPageNumber />}>
            <BackgroundContainer>
              <Products
                valueToFind={search}
                data={products}
                loading={loadProducts}
              />
            </BackgroundContainer>
          </Suspense>
        </SystemUI>
      </section>
      <Pagination
        valueToFind={search}
        firstPage={pageNumber != 1 ? 1 : 0}
        pageNumber={pageNumber}
        lastPage={
          pageNumber + 1 >= Math.ceil(productCounts / LIMIT)
            ? 0
            : Math.ceil(productCounts / LIMIT)
        }
        nextPage={pageNumber * LIMIT < productCounts ? pageNumber + 1 : 0}
        previousPage={pageNumber * LIMIT > LIMIT ? pageNumber - 1 : 0}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let props;
  let pageNumber: number = +context.query.pageNumber!;
  let search: string = "";
  if (context.query) {
    pageNumber = context.query.pageNumber ? +context.query.pageNumber : 1;
    search = context.query.search ? context.query.search.toString() : "";
  }
  console.log(search);
  try {
    const { data: dataProducts, loading: loadProducts } = await client.query({
      query: QUERY_ALL_PRODUCTS,
      variables: {
        input: {
          limit: LIMIT,
          skip: SKIP * (pageNumber - 1),
          words: search,
        },
      },
    });
    const products = dataProducts.products;
    const { data, loading } = await client.query({
      query: QUERY_PRODUCTS_COUNT,
      variables: {
        input: {
          words: search,
        },
      },
    });
    const productCounts = data.countProducts;
    props = {
      pageNumber,
      productCounts,
      loading,
      search,
      products,
      loadProducts,
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

export default ProductIndexPage;
