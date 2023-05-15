import { PropsWithChildren, useEffect, useState } from "react";
import { SystemUI } from "../UI/SystemUI";
import Image from "next/image";
import { Button } from "../UI/Button";
import { gql, useQuery } from "@apollo/client";
import { LoadingSpinner } from "../UI/Loading";
import { Product } from "@/types/Product";
const QUERY_ONE_PRODUCT = gql`
  query findProductById($input: String!) {
    findProductById(id: $input) {
      title
      price
      description
      imageUrl
    }
  }
`;
type props = {
  productId: string;
};
export const ReadMore: React.FC<props> = (props) => {
  const [product, setProduct] = useState<Product>();
  const { loading, data, error } = useQuery(QUERY_ONE_PRODUCT, {
    variables: { input: props.productId },
  });
  useEffect(() => {
    if (data) setProduct(data.findProductById);
  }, [data]);
  let pageContent;
  if (loading) {
    pageContent = <LoadingSpinner />;
  } else if (product) {
    pageContent = (
      <div className="col-span-12 gap-3 grid grid-cols-12 ">
        <div className="w-full   aspect-square relative xl:col-span-6 col-span-12">
          <Image
            fill
            sizes="100vw"
            className="col-span-12"
            src={product.imageUrl}
            alt={product.title}
          />
        </div>
        <div className="col-span-12 xl:col-span-6 lex flex-col justify-between">
          <div className="flex xl:block my-5 justify-between col-span-12">
            <h1 className=" font-bold text-xl xl:text-7xl">{product.title}</h1>
            <p className=" font-semibold text-xl">
              <span className="text-sm">$</span>
              {product.price}
            </p>
          </div>
          <p className="col-span-12 text-gray-700">{product.description}</p>
          <div className="py-5">
            <label className="block" htmlFor="quantity">
              quantity:
            </label>
            <input
              type="number"
              className="outline-none border-2 w-full border-slate-900  px-2 py-1"
            />
          </div>
          <Button classNames="col-span-12">Add To Cart</Button>
        </div>
      </div>
    );
  }
  return (
    <section className="my-5 text-gray-900">
      <SystemUI>{pageContent}</SystemUI>
    </section>
  );
};
