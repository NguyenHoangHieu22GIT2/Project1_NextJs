import { Context, PropsWithChildren, useEffect, useState } from "react";
import { SystemUI } from "../UI/SystemUI";
import { Product } from "../UI/Product";
import product1 from "../../assets/product1.jpg";
import user1 from "../../assets/user1.jpg";
import { ApolloError, gql, useQuery } from "@apollo/client";
import { Product as ProductType } from "@/types/Product";
import { LoadingSpinner } from "../UI/Loading";
import { GetServerSidePropsContext } from "next";
import { ProductSmall } from "../UI/ProductSmall";

type props = {
  valueToFind: string;
  data: ProductType[];
  loading: boolean;
  error?: ApolloError | undefined;
};
export function Products({ loading, data, valueToFind, error }: props) {
  const [products, setProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    if (data) setProducts(data);
  }, [data]);
  if (error) {
    return (
      <h1 className="text-center text-heading font-bold text-white">Error</h1>
    );
  }
  return (
    <section className="py-5 xl:py-12">
      <SystemUI>
        <div className=" col-span-12  grid gap-3  grid-cols-12">
          {products.map((product) => {
            return (
              <ProductSmall
                key={product._id}
                _id={product._id}
                title={product.title}
                price={product.price}
                description={product.description}
                images={product.images}
                userImage={user1}
              />
            );
          })}
        </div>
      </SystemUI>
    </section>
  );
}
