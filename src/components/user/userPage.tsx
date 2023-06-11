import Image from "next/image";
import { SystemUI } from "../UI/SystemUI";
import { User } from "@/types/User.Schema";
import { Product } from "@/types/Product";
// import { Product } from "../UI/Product";
import { Products } from "../Products/Products";
import { LoadingSpinner } from "../UI/Loading";

type props = {
  user: User;
  products: Product[];
};

export function UserPage({ user, products }: props) {
  let productsElement = <LoadingSpinner />;
  return (
    <section className="my-10">
      <SystemUI>
        <div className="xl:flex xl:items-center col-span-12">
          <Image
            src={process.env.NEXT_PUBLIC_SERVER_IMAGE_URI + user.avatar}
            alt={user.username}
            width={150}
            height={150}
            className="aspect-square relative object-cover rounded-full border-8 border-white "
          />
          <div>
            <h1 className="font-bold text-3xl capitalize">{user.username}</h1>
            <ul>
              <li>5 products on the deal.</li>
              <li>3.4 Ratings</li>
              <li>Online 4 hours ago</li>
            </ul>
          </div>
        </div>
        <div></div>
      </SystemUI>
    </section>
  );
}
