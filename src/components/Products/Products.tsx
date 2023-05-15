import { PropsWithChildren, useEffect, useState } from "react";
import { SystemUI } from "../UI/SystemUI";
import { Product } from "../UI/Product";
import product1 from "../../assets/product1.jpg";
import user1 from "../../assets/user1.jpg";
import { gql, useQuery } from "@apollo/client";
import { Product as ProductType } from "@/types/Product";
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
type props = {
  valueToFind: string;
  pageNumber: number;
  limit: number;
  skip: number;
};
export function Products(props: props) {
  const [products, setProducts] = useState<ProductType[]>([]);
  const { data, loading, error } = useQuery(QUERY_ALL_PRODUCTS, {
    variables: {
      input: {
        limit: props.limit,
        skip: (props.pageNumber - 1) * props.skip,
        words: props.valueToFind,
      },
    },
  });
  useEffect(() => {
    if (data) setProducts(data.products);
  }, [data]);
  let productElements;
  if (error) {
    return (
      <h1 className="text-center text-heading font-bold text-white">Error</h1>
    );
  }
  if (products.length > 0) {
    productElements = products.map((product) => {
      if (
        props.valueToFind.length > 0 &&
        product.title.match(new RegExp(".*" + props.valueToFind + ".*", "i"))
      ) {
        return (
          <Product
            key={product._id}
            _id={product._id}
            title={product.title}
            price={product.price}
            description={product.description}
            productImage={product.imageUrl}
            userImage={user1}
          />
        );
      } else if (props.valueToFind.length == 0)
        return (
          <Product
            key={product._id}
            _id={product._id}
            title={product.title}
            price={product.price}
            description={product.description}
            productImage={product.imageUrl}
            userImage={user1}
          />
        );
    });
  } else if (products.length <= 0) {
    productElements = (
      <h1 className="col-span-12 text-white text-4xl text-center">
        No Product Found...
      </h1>
    );
  }
  return (
    <section className="py-5 xl:py-12">
      <SystemUI>
        {loading || !data ? (
          <LoadingSpinner />
        ) : (
          <div className=" col-span-12  grid gap-3  grid-cols-12">
            {productElements}
          </div>
        )}
      </SystemUI>
    </section>
  );
}
