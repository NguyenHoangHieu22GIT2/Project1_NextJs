import { PropsWithChildren, useEffect, useState } from "react";
import SystemUI from "../UI/SystemUI";
import { Product } from "../UI/Product";
import product1 from "../../assets/product1.jpg";
import { Button } from "../UI/Button";
import user1 from "../../assets/user1.jpg";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useAppSelector } from "@/store";
import { Product as productType } from "@/types/Product";
import { LoadingSpinner } from "../UI/Loading";

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

export function FeaturedProducts(props: PropsWithChildren) {
  const [fetchData, { loading, data, error }] = useLazyQuery(
    QUERY_ALL_PRODUCTS,
    { variables: { input: { skip: 0, limit: 3 } } }
  );
  const [products, setProducts] = useState<productType[]>();
  async function fetchProducts() {
    const result = await fetchData({});
    if (result.data) {
      setProducts(result.data.products);
    }
  }
  useEffect(() => {
    fetchProducts();
  }, []);

  if (error) {
    return <p>We are having a bug, please wait </p>;
  }
  const allProductsElements = products?.map((product, index) => (
    <Product
      key={product._id}
      _id={product._id}
      title={product.title}
      price={product.price}
      description={product.description}
      productImage={product.imageUrl}
      userImage={user1}
    />
  ));

  return (
    <section id="products">
      <h1 className="text-center mx-auto w-fit text-4xl text-white border-b-2 border-dashed border-primary">
        Featured Products
      </h1>
      <SystemUI>
        <div className=" col-span-12 my-16 grid gap-3 xl:justify-center grid-cols-12">
          {loading ? <LoadingSpinner /> : allProductsElements}
        </div>
      </SystemUI>
      <div className="text-center">
        <Button classNames="text-white">More Products...</Button>
      </div>
    </section>
  );
}
