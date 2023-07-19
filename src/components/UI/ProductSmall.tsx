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

export function ProductSmall(props: props) {
  const router = useRouter();
  const title = props.title.replace(/(.{14})..+/, "$1...");
  const isAuth = useAppSelector((state) => state.auth.token).length > 0;
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  return (
    <Link
      href={`/products/product/${props._id}`}
      className="sm:col-span-4 shadow-2xl  col-span-12 text-gray-900 bg-gray-200 relative rounded-md"
    >
      <div className="w-full aspect-square relative overflow-hidden sm:col-span-6 col-span-12">
        <Image
          className="hover:scale-125  transition"
          src={process.env.NEXT_PUBLIC_SERVER_IMAGE_URI + props.images[0]}
          sizes="100wh"
          fill
          alt={props.title}
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <div className="">
          <h1 className="text-xl ">{title}</h1>
          <p className="text-primary ">
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
