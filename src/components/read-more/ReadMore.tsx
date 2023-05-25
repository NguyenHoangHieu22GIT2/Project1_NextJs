import { FormEvent, PropsWithChildren, useEffect, useState } from "react";
import { SystemUI } from "../UI/SystemUI";
import Image from "next/image";
import { Button } from "../UI/Button";
import { gql, useMutation, useQuery } from "@apollo/client";
import { LoadingSpinner } from "../UI/Loading";
import { Product } from "@/types/Product";
import { useAppSelector } from "@/store";

type props = {
  product: Product;
  csrfToken: string;
};

const MUTATION_ADD_TO_CART = gql`
  mutation addToCart($input: AddToCartInput!) {
    addToCart(addToCartInput: $input) {
      title
    }
  }
`;

export const ReadMore: React.FC<props> = (props) => {
  const authToken = useAppSelector((state) => {
    return state.auth.token;
  });
  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState(0);
  const [addToCartFn, { loading, data, error }] =
    useMutation(MUTATION_ADD_TO_CART);
  useEffect(() => {
    setProduct(props.product);
  }, [props.product]);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (quantity > 0 && product) {
      addToCartFn({
        variables: {
          input: { token: props.csrfToken, productId: product._id },
        },
        context: {
          headers: {
            authorization: `bearer ${authToken}`,
          },
        },
      });
    }
  }
  let pageContent = <LoadingSpinner />;
  if (product) {
    pageContent = (
      <div className="col-span-12 gap-3 grid grid-cols-12 ">
        <div className="w-full aspect-square relative xl:col-span-6 col-span-12">
          <Image
            fill
            sizes="80vw"
            className="col-span-12"
            src={process.env.NEXT_PUBLIC_SERVER_IMAGE_URI + product.imageUrl}
            alt={product.title}
          />
        </div>
        <form
          onSubmit={submit}
          className="col-span-12 xl:col-span-6 lex flex-col justify-between"
        >
          <h1 className=" font-bold text-xl xl:text-2xl">{product.title}</h1>
          <div className="flex gap-2">
            <div>
              <h6 className="text-[#ee4d2d] inline-block relative before:content-[''] before:w-full before:h-[1px] before:bg-[#ee4d2d] before:absolute before:bottom-0 before:left-0">
                4.7
              </h6>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#ee4d2d"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#ee4d2d"
                className="w-6 h-6 inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#ee4d2d"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#ee4d2d"
                className="w-6 h-6 inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#ee4d2d"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#ee4d2d"
                className="w-6 h-6 inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#ee4d2d"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#ee4d2d"
                className="w-6 h-6 inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#ee4d2d"
                className="w-6 h-6 inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            </div>
            <span className="text-gray-500/80">|</span>
            <div>
              <span className="relative before:content-[''] before:w-full before:h-[1px] before:bg-[#000] before:absolute before:bottom-0 before:left-0">
                2,2k
              </span>
              &nbsp;
              <span>Ratings</span>
            </div>
            <span className="text-gray-500/80">|</span>
            <div>
              <span>6,7k</span>
              &nbsp;
              <span>Buys</span>
            </div>
          </div>
          <div className=" bg-gray-200 mt-5 flex flex-row items-center gap-2 px-5 py-2 text-xl">
            <p className="relative text-[#6b737f] before:content-[''] before:w-10 before:h-[2px] before:bg-[#6b737f] before:absolute before:bottom-1/2 before:left-0">
              <span className="text-sm">$</span>
              {product.price}
            </p>
            <p className="text-3xl text-[#ee4d2d]">
              <span className="text-sm">$</span>
              {product.discount > 0
                ? (+product.price * +product.discount) / 100
                : product.price}
            </p>
            <p className="bg-[#ee4d2d] text-white px-4 py-2">
              {+product.discount}% off
            </p>
          </div>
          <div className="flex gap-10 my-5 items-center">
            <h1>Màu Sắc</h1>
            <div>
              <ul className="flex gap-5 text-sm">
                <li>
                  <button className="border-2 px-5 py-2">Sóc Ghi</button>
                </li>
                <li>
                  <button className="border-2 px-5 py-2">Sóc Ghi</button>
                </li>
              </ul>
            </div>
          </div>
          <p className="col-span-12 text-gray-700">{product.description}</p>
          <div className="py-5">
            <label className="block" htmlFor="quantity">
              quantity:
            </label>
            <input
              onChange={(e) => setQuantity(+e.target.value)}
              value={quantity}
              type="number"
              className="outline-none border-2 w-full border-slate-900  px-2 py-1"
            />
          </div>
          <Button classNames="col-span-12">Add To Cart</Button>
        </form>
      </div>
    );
  }
  return (
    <section className="my-5 text-gray-900">
      <SystemUI>{pageContent}</SystemUI>
    </section>
  );
};
