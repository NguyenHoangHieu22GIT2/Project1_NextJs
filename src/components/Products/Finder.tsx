import { ChangeEvent, PropsWithChildren, useState } from "react";
import SystemUI from "../UI/SystemUI";
import Image from "next/image";
import search from "../../assets/search-line.svg";

type props = {
  onFinderValue: (value: string) => void;
};

export function Finder(props: props) {
  function changeValue(e: ChangeEvent<HTMLInputElement>) {
    props.onFinderValue(e.target.value);
  }
  return (
    <div className="">
      <SystemUI>
        <div className="col-span-12 grid grid-cols-12 py-5">
          <input
            onChange={changeValue}
            className="col-span-10 px-3 py-1 outline-none rounded-bl-lg rounded-tl-lg"
            placeholder="Find Products..."
          />
          <button className="bg-slate-900 col-span-2 flex justify-center items-center rounded-br-lg rounded-tr-lg ">
            <Image src={search} className="invert" alt="Find button" />
          </button>
        </div>
      </SystemUI>
    </div>
  );
}
