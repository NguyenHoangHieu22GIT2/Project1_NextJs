import { FormEvent, PropsWithChildren, useEffect, useState } from "react";
import { SystemUI } from "./SystemUI";
import Image, { StaticImageData } from "next/image";
import product1 from "../../assets/product1.jpg";
import user1 from "../../assets/user1.jpg";
import Link from "next/link";
import { useCheckAuth } from "@/hooks/useCheckAuth";
import { useAppSelector } from "@/store";
import { useRouter } from "next/router";
import { gql, useMutation } from "@apollo/client";

type props = {
  _id: string;
  title: string;
  price: number;
  description: string;
  images: string[];
  userImage?: StaticImageData;
  isInUserPage?: boolean;
  changeProducts?: (id: string) => void;
  discount: number;
};

const MUTATION_DELETE_PRODUCT = gql`
  mutation removeProduct($input: RemoveProductInput!) {
    removeProduct(removeProductInput: $input) {
      _id
    }
  }
`;

const MUTATION_CREATE_CSRF = gql`
  mutation createCsrfToken($input: String!) {
    createCsrfToken(userId: $input) {
      token
    }
  }
`;

export function Product(props: props) {
  const router = useRouter();
  const title = props.title.replace(/(.{14})..+/, "$1...");
  const auth = useAppSelector((state) => state.auth);
  const [token, setToken] = useState<any>();
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  const [createCsrfGraphqlFn] = useMutation(MUTATION_CREATE_CSRF, {
    variables: {
      input: auth.userId,
    },
  });

  useEffect(() => {
    if (auth.userId) {
      createCsrfGraphqlFn().then((result) => {
        setToken(result.data.createCsrfToken);
      });
    }
  }, [auth]);
  const [removeProductGraphqlFn] = useMutation(MUTATION_DELETE_PRODUCT);
  return (
    <div className="sm:col-span-4 shadow-2xl flex flex-col justify-between col-span-12 text-gray-900 bg-gray-200 relative  rounded-md">
      <Link
        href={`/products/product/${props._id}`}
        className="w-full aspect-square relative overflow-hidden sm:col-span-6 col-span-12"
      >
        <Image
          className="hover:scale-125  transition"
          src={process.env.NEXT_PUBLIC_SERVER_IMAGE_URI + props.images[0]}
          sizes="100wh"
          fill
          alt={props.title}
        />
      </Link>
      <div className="p-4 flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <h1 className="text-xl before:content-[''] before:w-full before:h-1 before:absolute relative before:-bottom-2 before:left-0 before:bg-primary">
            {title}
          </h1>
          <div className="text-primary text-2xl flex justify-between">
            <div>
              <span className="text-lg text-gray-600">$</span>
              <s className="text-gray-600 text-sm">{props.price}</s>
            </div>
            <div>
              <span>
                ${+props.price - (+props.price * +props.discount) / 100}
              </span>
              <span className="ml-2 px-3 py-1 bg-[#e72312] text-white">
                {props.discount}%
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 flex relative z-20 justify-between gap-5">
        {props.isInUserPage ? (
          <>
            <button className="w-32 py-2  rounded-lg  bg-primary/80 hover:bg-primary transition ">
              <Link href={`/edit-product/${props._id}`}>Edit</Link>
            </button>
            <button
              onClick={() => {
                removeProductGraphqlFn({
                  variables: {
                    input: {
                      productId: props._id,
                      userId: auth.userId,
                      token: token.token!,
                    },
                  },
                  context: {
                    headers: {
                      authorization: `bearer ${auth.token}`,
                    },
                  },
                }).then((result) => {
                  if (result.data && props.changeProducts) {
                    props.changeProducts(props._id);
                  }
                });
              }}
              // onClick={isAuth ?  :router.push("/auth")}
              className="w-32 py-2  rounded-lg  bg-primary/80 hover:bg-primary transition "
            >
              Delete
            </button>
          </>
        ) : (
          <>
            <button
              // onClick={isAuth ?  :router.push("/auth")}
              className="w-32 py-2  rounded-lg  bg-primary/80 hover:bg-primary transition "
            >
              Wishlist
            </button>
          </>
        )}
      </div>
    </div>
  );
}
