import { User } from "@/types/User.Schema";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { typePage } from "./userPage";
type props = {
  user: User;
  productsCount: number;
  changeDataPage: (data: string) => void;
};

export default function UserNavAndInfo({
  user,
  productsCount,
  changeDataPage,
}: props) {
  return (
    <div className="px-5 basis-1/5 text-center bg-sky-700 py-2">
      <Image
        src={process.env.NEXT_PUBLIC_SERVER_IMAGE_URI + user.avatar}
        alt={user.username}
        width={50}
        height={50}
        className="aspect-square mx-auto relative object-cover rounded-full "
      />
      <div className="text-white ">
        <h1 className="font-bold capitalize">{user.username}</h1>
        <h2>{productsCount} products on the deal.</h2>
        <h2>3.4 Ratings</h2>
        <h2>Online 4 hours ago</h2>
      </div>
      <nav className="text-white font-bold mt-10">
        <ul className="flex flex-col gap-2">
          <li>
            {/* <Link href={`/user/${user._id}`}>Profile</Link> */}
            <button onClick={() => changeDataPage("")}>Profile</button>
          </li>
          <li>
            <button onClick={() => changeDataPage(typePage.Dashboard)}>
              Dashboard
            </button>
            {/* <Link href={`/user/${user._id}?page=dashboard`}>Dashboard</Link> */}
          </li>
          <li>
            <button onClick={() => changeDataPage(typePage.products)}>
              Products
            </button>
            {/* <Link href={`/user/${user._id}?page=products`}>Products</Link> */}
          </li>
        </ul>
      </nav>
    </div>
  );
}
