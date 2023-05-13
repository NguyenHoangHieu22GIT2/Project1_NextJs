import { PropsWithChildren, useEffect, useState } from "react";
import SystemUI from "../UI/SystemUI";
import { gql, useQuery } from "@apollo/client";
import { LoadingSpinner } from "../UI/Loading";
import { Product } from "../UI/Product";
import { Product as ProductType } from "@/types/Product";

type props = {
  productId: string;
};

const QUERY_PRODUCT_RECOMMENDED = gql`
  query findRecommendedProducts($input: ProductFindOptions!) {
    findRecommendedProducts(productFindOptions: $input) {
      _id
      description
      imageUrl
      price
      quantity
      userId
      title
    }
  }
`;

export const RecommendedProducts: React.FC<props> = (props) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const { loading, data, error } = useQuery(QUERY_PRODUCT_RECOMMENDED, {
    variables: { input: { productId: props.productId, limit: 4, skip: 0 } },
  });
  useEffect(() => {
    if (data) {
      setProducts(data.findRecommendedProducts);
    }
  }, [data]);
  let productElements;
  if (products.length > 0) {
    productElements = products.map((product) => {
      return (
        <Product
          key={product._id}
          _id={product._id}
          title={product.title}
          price={product.price}
          description={product.description}
          productImage={product.imageUrl}
        />
      );
    });
  }

  return (
    <section className="py-5">
      <SystemUI>
        <h1 className="col-span-12 text-white font-bold text-2xl">
          Recommended Products:
        </h1>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="col-span-12 gap-5 grid grid-cols-12 [&>*]:mb-5">
            {productElements}
          </div>
        )}
      </SystemUI>
    </section>
  );
};
