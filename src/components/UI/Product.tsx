import { PropsWithChildren } from "react";
import SystemUI from "./SystemUI";
import Image, { StaticImageData } from "next/image";
import product1 from "../../assets/product1.jpg";
import user1 from "../../assets/user1.jpg";
import Link from "next/link";

type props = {
  _id: string;
  title: string;
  price: number;
  description: string;
  productImage: string;
  userImage?: StaticImageData;
};

export function Product(props: props) {
  return (
    <div className="xl:col-span-4  col-span-12 text-white bg-backgroundColor/70 relative rounded-md">
      {/* <Image
        src={props.userImage}
        alt="User"
        className="rounded-full xl:block hidden absolute w-20 -top-10 left-1/2 -translate-x-1/2 border-4 border-primary"
      /> */}
      <img src={props.productImage} />
      <div className="p-4 flex flex-col gap-5">
        <div className="flex  justify-between items-center">
          <h1 className="text-3xl before:content-[''] before:w-full before:h-1 before:absolute relative before:-bottom-2 before:left-0 before:bg-primary">
            {props.title}
          </h1>
          <p className="text-subPrimary text-2xl">
            <span className="text-lg text-subPrimary/80">$</span>
            {props.price}
          </p>
        </div>
        <p>{props.description}</p>
        <div className="flex justify-between">
          <button className="w-32 py-2 rounded-lg border-2 hover:bg-white hover:text-black transition ">
            <Link href={`/products/product/${props._id}`}>Read More</Link>
          </button>
          <button className="w-32 py-2  rounded-lg  bg-primary/80 hover:bg-primary transition ">
            Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}
