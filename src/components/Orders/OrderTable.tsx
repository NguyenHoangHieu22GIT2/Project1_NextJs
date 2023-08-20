import React from "react";
import { SystemUI } from "../UI/SystemUI";
import { Order } from "@/types/Order";
import Image from "next/image";

type props = {
  orders: Order[];
};

export function OrderTable(props: props) {
  console.log(props);
  return (
    <section className="mt-10">
      <SystemUI>
        <div className="col-span-12">
          {props.orders.map((order) => {
            let subTotal = 0;
            const date = new Date(order.date);
            console.log(date.getMonth());
            order.products.map((product) => {
              subTotal += product.price * product.quantity!;
            });
            console.log(order._id);
            return (
              <details key={order._id}>
                <summary className="font-bold">
                  {`${date.getDate()}/${
                    date.getMonth() + 1
                  }/${date.getFullYear()}`}{" "}
                  - id#{order._id}
                </summary>
                <div className="flex flex-col gap-5">
                  <table className="w-full text-left rounded-lg">
                    <thead>
                      <tr className="[&>*]:px-5 [&>*]:border-2  [&>*]:border-black bg-primary  [&>*]:py-2">
                        <th>Product</th>
                        <th>Product Name</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody className="[&>*:nth-child(even)]:bg-slate-300">
                      {order.products.map((product) => {
                        return (
                          <tr
                            key={product._id}
                            className="[&>*]:px-5 [&>*]:border-2 [&>*]:border-black [&>*]:border-t-0 [&>*]:py-2"
                          >
                            <td>
                              <Image
                                src={
                                  process.env.NEXT_PUBLIC_SERVER_IMAGE_URI +
                                  product.images[0]
                                }
                                alt={product.title}
                                width={300}
                                height={300}
                              ></Image>
                            </td>
                            <td>{product.title}</td>
                            <td>{product.price}$</td>
                            <td>{product.quantity} in total</td>
                            <td>{product.price * product.quantity!}$</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="flex gap-10 [&>*]:basis-1/2">
                    <table>
                      <tbody className=" ">
                        <tr className="[&>*]:border [&>*]:border-black [&>*]:px-5 [&>*]:py-2">
                          <td className="bg-subPrimary">Order Subtotal</td>
                          <td className="bg-primary">${subTotal}</td>
                        </tr>
                        <tr className="[&>*]:border [&>*]:border-black [&>*]:px-5 [&>*]:py-2">
                          <td className="bg-primary">Shipping</td>
                          <td className="bg-subPrimary">Free Shipping</td>
                        </tr>
                        <tr className="[&>*]:border [&>*]:border-black [&>*]:px-5 [&>*]:py-2">
                          <td className="bg-subPrimary">Coupon</td>
                          <td className="bg-primary">$28.00</td>
                        </tr>
                        <tr className="[&>*]:border [&>*]:border-black [&>*]:px-5 [&>*]:py-2">
                          <td className="bg-primary">Total</td>
                          <td className="bg-subPrimary">${subTotal - 28}</td>
                        </tr>
                      </tbody>
                    </table>
                    <ul className="list-disc flex flex-col gap-5 justify-center">
                      <li>
                        Check out the Order Subtotal, we don't want any of
                        shipper has to lose money because you don't have enough!
                        :{")"}
                      </li>
                      <li>Check the Coupon, save money for you and for us.</li>
                      <li>
                        See if you need the product from outside your country,
                        it can be expensive.
                      </li>
                      <li>Total is important!</li>
                    </ul>
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      </SystemUI>
    </section>
  );
}
