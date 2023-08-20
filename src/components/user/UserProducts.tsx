import { useAppSelector } from "@/store";
import { Product } from "@/types/Product";
import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Products } from "../Products/Products";

const QUERY_USER_PRODUCTS = gql`
  query findProductsOfUser($input: String!) {
    productsOfUser(userId: $input) {
      images
      title
      price
      description
      _id
      discount
    }
  }
`;

export default function UserProducts() {
  const auth = useAppSelector((state) => state.auth);
  const [products, setProducts] = useState<Product[]>([]);
  const { loading, data, error } = useQuery(QUERY_USER_PRODUCTS, {
    variables: {
      input: auth.userId,
    },
    fetchPolicy: "no-cache",
  });
  useEffect(() => {
    if (data) {
      setProducts(data.productsOfUser);
    }
  }, [data]);
  return (
    <Products
      loading={loading}
      data={products}
      valueToFind=""
      error={error}
      isInUserPage={true}
    />
  );
}
