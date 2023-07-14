import { Product } from "@/types/Product";
import { SystemUI } from "../UI/SystemUI";
import Image from "next/image";
import Delete from "../UI/SVG/Delete";
import { Minus } from "../UI/SVG/Minus";
import { Plus } from "../UI/SVG/Plus";
import CircleDot from "../UI/SVG/CircleDot";
import { Button } from "../UI/Button";

type props = {
  cartItems: Product[];
};

export function CartTable(props: props) {
  console.log(props);
  return (
    <section className="mt-5">
      <SystemUI>
        <div className="col-span-12">
          <table className="border-2 rounded-full border-gray-400 w-full">
            <thead className="text-left">
              <tr className="[&>*]:px-5 [&>*]:py-2">
                <th>Product</th>
                <th>Name</th>
                <th>Price</th>
                <th>quantities</th>
                <th>Discount</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody className="border-2 rounded-lg border-gray-400">
              {props.cartItems.map((cartItem) => {
                return (
                  <tr
                    key={cartItem._id + cartItem.userId}
                    className="[&>*]:px-5 [&>*]:py-2"
                  >
                    <td>
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_SERVER_IMAGE_URI +
                          cartItem.images[0]
                        }
                        alt={cartItem.title}
                        width={100}
                        height={100}
                      ></Image>
                    </td>
                    <td>{cartItem.title}</td>
                    <td>{cartItem.price}$</td>
                    <td>
                      <div className="flex">
                        <button className="border border-[#f3f3f3] ">
                          <Minus />
                        </button>
                        <input
                          type="number"
                          className="w-10 text-center px-2 outline-none bg-transparent border border-[#f3f3f3]"
                          defaultValue={cartItem.quantity}
                        />
                        <button className="border border-[#f3f3f3] ">
                          <Plus />
                        </button>
                      </div>
                    </td>
                    <td>{cartItem.discount}%</td>
                    <td>
                      <button>
                        <Delete />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SystemUI>
    </section>
  );
}
