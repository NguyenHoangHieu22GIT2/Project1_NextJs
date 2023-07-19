import { User } from "@/types/User.Schema";
import { Product } from "@/types/Product";
import { LoadingSpinner } from "../UI/Loading";
import { useRouter } from "next/router";
import UserProducts from "./UserProducts";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import UserNavAndInfo from "./UserNavAndInfo";
import { useState } from "react";

type props = {
  user: User;
  products: Product[];
  productsCount: number;
};

export const typePage = {
  products: "products",
  Dashboard: "dashboard",
};

export function UserPage({ user, products, productsCount }: props) {
  const [data, setData] = useState("");
  const router = useRouter();
  let dataPage;
  if (data && data === typePage.products) {
    dataPage = <UserProducts />;
  } else if (data === typePage.Dashboard) {
    dataPage = <Dashboard user={user} />;
  } else {
    dataPage = <Profile />;
  }
  let productsElement = <LoadingSpinner />;
  function changeDataPage(typePageArg: string) {
    setData(typePageArg);
  }
  console.log(user);
  return (
    <section className="my-10 flex gap-5 ">
      <UserNavAndInfo
        user={user}
        productsCount={productsCount}
        changeDataPage={changeDataPage}
      />
      <div className="basis-4/5">{dataPage}</div>
    </section>
  );
}
