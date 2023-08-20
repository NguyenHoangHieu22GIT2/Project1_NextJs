import { PropsWithChildren, useEffect, useState } from "react";
import { SystemUI } from "../UI/SystemUI";
import { Product } from "../UI/Product";
import product1 from "../../assets/product1.jpg";
import { Button } from "../UI/Button";
import user1 from "../../assets/user1.jpg";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useAppSelector } from "@/store";
import { Product as productType } from "@/types/Product";
import { LoadingSpinner } from "../UI/Loading";

type props = {
  products: productType[];
  loading: boolean;
};

export function FeaturedProducts({ products, loading }: props) {
  const allProductsElements = products?.map((product) => (
    <Product
      discount={product.discount}
      key={product._id}
      _id={product._id}
      title={product.title}
      price={product.price}
      description={product.description}
      images={product.images}
      userImage={user1}
    />
  ));

  return (
    <section className="text-gray-700" id="products">
      <h1 className="text-center mx-auto w-fit text-4xl  border-b-8 border-dashed border-primary">
        Featured Products
      </h1>
      <SystemUI>
        <div className=" col-span-12 my-16 grid gap-3 sm:justify-center grid-cols-12">
          {loading ? <LoadingSpinner /> : allProductsElements}
        </div>
      </SystemUI>
      <div className="text-center">
        <Button classNames="text-white">More Products...</Button>
      </div>
    </section>
  );
}
