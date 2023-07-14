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
  changeProducts: (id: string) => void;
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
    <div className="xl:col-span-4 shadow-2xl flex flex-col justify-between col-span-12 text-gray-900 bg-gray-200 relative z-10 rounded-md">
      {/* <Image
        src={props.userImage}
        alt="User"
        className="rounded-full xl:block hidden absolute w-20 -top-10 left-1/2 -translate-x-1/2 border-4 border-primary"
      /> */}
      <Link
        href={`/products/product/${props._id}`}
        className="w-full aspect-square relative overflow-hidden xl:col-span-6 col-span-12"
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
        <div className="flex  justify-between items-center">
          <h1 className="text-xl before:content-[''] before:w-full before:h-1 before:absolute relative before:-bottom-2 before:left-0 before:bg-primary">
            {title}
          </h1>
          <p className="text-primary text-2xl">
            <span className="text-lg text-primary/90">$</span>
            {props.price}
          </p>
        </div>
        {/* <p>{props.description}</p> */}
      </div>
      <div className="p-4 flex relative z-20 justify-between gap-5">
        {props.isInUserPage ? (
          <>
            <button
              // onClick={isAuth ?  :router.push("/auth")}
              className="w-32 py-2  rounded-lg  bg-primary/80 hover:bg-primary transition "
            >
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
                  if (result.data) {
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
          <button
            // onClick={isAuth ?  :router.push("/auth")}
            className="w-32 py-2  rounded-lg  bg-primary/80 hover:bg-primary transition "
          >
            Wishlist
          </button>
        )}
      </div>
    </div>
  );
}
