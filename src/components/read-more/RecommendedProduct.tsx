import { PropsWithChildren, useEffect, useState } from "react";
import { SystemUI } from "../UI/SystemUI";
import { gql, useQuery } from "@apollo/client";
import { LoadingSpinner } from "../UI/Loading";
import { Product } from "../UI/Product";
import { Product as ProductType } from "@/types/Product";
import { BackgroundContainer } from "../UI/BackgroundContainer";
import { ProductSmall } from "../UI/ProductSmall";

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
        <ProductSmall
          key={product._id}
          _id={product._id}
          title={product.title}
          price={product.price}
          description={product.description}
          images={product.images}
        />
      );
    });
  }
  let productsDisplayElement = (
    <div className="col-span-12">
      <LoadingSpinner />
    </div>
  );
  if (products.length == 0) {
    productsDisplayElement = (
      <h1 className="col-span-12 text-center font-bold text-3xl">
        No product found... :{"("}
      </h1>
    );
  } else {
    productsDisplayElement = (
      <div className="col-span-12 [&>*]:col-span-6 gap-5 grid grid-cols-12 [&>*]:mb-5">
        {productElements}
      </div>
    );
  }
  return (
    <section className=" grid-cols-12 col-span-6 grid self-start">
      <BackgroundContainer>
        <h1 className="col-span-12 text-gray-900 font-bold text-2xl">
          Recommended Products:
        </h1>
        {productsDisplayElement}
      </BackgroundContainer>
    </section>
  );
};
