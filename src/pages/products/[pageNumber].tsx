import { Layout } from "@/components/Layout/Layout";
import { Filter } from "@/components/Products/Filter";
import { Finder } from "@/components/Products/Finder";
import { Pagination } from "@/components/Products/Pagination";
import { Products } from "@/components/Products/Products";
import { Product } from "@/types/Product";
import { ApolloError, gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { client } from "../_app";
import Head from "next/head";
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
      imageUrl
      price
      userId
    }
  }
`;
const QUERY_PRODUCTS_COUNT = gql`
  query findCountProducts($input: ProductFindOptions!) {
    countProducts(productFindOptions: $input)
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
      <Finder pageNumber={pageNumber} />
      <Filter />
      <Products valueToFind={search} data={products} loading={loadProducts} />
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
  console.log("Hello");
  let pageNumber: number = +context.query.pageNumber!;
  let search: string = "";
  if (context.query) {
    pageNumber = context.query.pageNumber ? +context.query.pageNumber : 1;
    search = context.query.search ? context.query.search.toString() : "";
  }
  const { data: dataProducts, loading: loadProducts } = await client.query({
    query: QUERY_ALL_PRODUCTS,
    variables: {
      input: {
        limit: LIMIT,
        skip: SKIP * (pageNumber - 1),
      },
    },
  });
  const products = dataProducts.products;
  const { data, loading } = await client.query({
    query: QUERY_PRODUCTS_COUNT,
    variables: {
      input: {
        limit: LIMIT,
        skip: SKIP,
      },
    },
  });
  const productCounts = data.countProducts;

  return {
    props: {
      pageNumber,
      productCounts,
      loading,
      search,
      products,
      loadProducts,
    },
  };
};

export default ProductIndexPage;
