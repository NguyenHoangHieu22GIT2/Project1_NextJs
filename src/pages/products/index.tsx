import { Filter } from "@/components/Products/Filter";
import { Finder } from "@/components/Products/Finder";
import { Pagination } from "@/components/Products/Pagination";
import { Products } from "@/components/Products/Products";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect, useState } from "react";
const QUERY_PRODUCTS_COUNT = gql`
  {
    findNumberOfAllProducts
  }
`;

const ProductPage: React.FC<PropsWithChildren> = (props) => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/products/1");
  }, []);

  return <></>;
};

export default ProductPage;
