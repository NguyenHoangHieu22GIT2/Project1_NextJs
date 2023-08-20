import React from "react";
import { SystemUI } from "../UI/SystemUI";
import CircleDot from "../UI/SVG/CircleDot";
import { Button } from "../UI/Button";

type props = {
  createOrder: () => void;
};

export default function InShort(props: props) {
  return (
    <section>
      <SystemUI>
        <div className="mt-5 col-span-12">
          <h1 className="text-sm font-bold">In short:</h1>
          <div className="flex gap-5 [&>*]:basis-1/2">
            <table className="border-2 border-gray-400 w-full">
              <tbody>
                <tr className="[&>*]:border-2 [&>*]:border-gray-400">
                  <th className=" w-1/4">Total cost</th>
                  <td className=" w-3/4">1920$</td>
                </tr>
                <tr className="[&>*]:border-2 [&>*]:border-gray-400">
                  <th className="">Quantites</th>
                  <td className="">92 in totals</td>
                </tr>
                <tr className="[&>*]:border-2 [&>*]:border-gray-400">
                  <th className="">Tax</th>
                  <td className="">3.05%</td>
                </tr>
                <tr className="[&>*]:border-2 [&>*]:border-gray-400">
                  <th className="">Shipping</th>
                  <td className="">16$</td>
                </tr>
              </tbody>
            </table>
            <ul className=" flex flex-col gap-2 ">
              <li className="flex gap-2 ">
                <CircleDot />
                Check your totals before Order. We won't be responsible for your
                causes.
              </li>
              <li className="flex gap-2 ">
                <CircleDot />
                Look at the taxes around your area, if this charges higher then
                contact us.
              </li>
              <li className="flex gap-2 ">
                <CircleDot />
                Shipping should be higher if you order multiple things in
                different shops, so no complaining here.
              </li>
              <li className="flex gap-2 ">
                <CircleDot />
                Quantites should be checked here.
              </li>
            </ul>
          </div>
          <Button onClick={props.createOrder} classNames="mt-5">
            Order Now
          </Button>
        </div>
      </SystemUI>
    </section>
  );
}
