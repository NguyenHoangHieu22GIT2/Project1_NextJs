import { FormEvent, PropsWithChildren } from "react";
import { SystemUI } from "./SystemUI";
import Image, { StaticImageData } from "next/image";
import product1 from "../../assets/product1.jpg";
import user1 from "../../assets/user1.jpg";
import Link from "next/link";
import { useCheckAuth } from "@/hooks/useCheckAuth";
import { useAppSelector } from "@/store";
import { useRouter } from "next/router";

type props = {
  _id: string;
  title: string;
  price: number;
  description: string;
  images: string[];
  userImage?: StaticImageData;
};

export function Product(props: props) {
  const router = useRouter();
  const title = props.title.replace(/(.{14})..+/, "$1...");
  const isAuth = useAppSelector((state) => state.auth.token).length > 0;
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  return (
    <Link
      href={`/products/product/${props._id}`}
      className="xl:col-span-4 shadow-2xl flex flex-col justify-between col-span-12 text-gray-900 bg-gray-200 relative rounded-md"
    >
      {/* <Image
        src={props.userImage}
        alt="User"
        className="rounded-full xl:block hidden absolute w-20 -top-10 left-1/2 -translate-x-1/2 border-4 border-primary"
      /> */}
      <div className="w-full aspect-square relative overflow-hidden xl:col-span-6 col-span-12">
        <Image
          className="hover:scale-125  transition"
          src={process.env.NEXT_PUBLIC_SERVER_IMAGE_URI + props.images[0]}
          sizes="100wh"
          fill
          alt={props.title}
        />
      </div>
      <div className="p-4 flex flex-col gap-5">
        <div className="flex  justify-between items-center">
          <h1 className="text-3xl before:content-[''] before:w-full before:h-1 before:absolute relative before:-bottom-2 before:left-0 before:bg-primary">
            {title}
          </h1>
          <p className="text-primary text-2xl">
            <span className="text-lg text-primary/90">$</span>
            {props.price}
          </p>
        </div>
        {/* <p>{props.description}</p> */}
      </div>
      <form className="p-4 flex justify-between gap-5">
        <button
          // onClick={isAuth ?  :router.push("/auth")}
          className="w-32 py-2  rounded-lg  bg-primary/80 hover:bg-primary transition "
        >
          Wishlist
        </button>
      </form>
    </Link>
  );
}
