import { PropsWithChildren, useEffect, useState } from "react";
import { SystemUI } from "../UI/SystemUI";
import { gql, useQuery } from "@apollo/client";
import { LoadingSpinner } from "../UI/Loading";
import { Product } from "../UI/Product";
import { Product as ProductType } from "@/types/Product";

type props = {
  products: ProductType[];
  loading?: boolean;
};

export const RecommendedProducts: React.FC<props> = (props) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    if (props.products) {
      setProducts(props.products);
    }
  }, []);
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
        <h1 className="col-span-12 text-gray-900 font-bold text-2xl">
          Recommended Products:
        </h1>
        {!products ? (
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
