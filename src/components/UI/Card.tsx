import dynamic from "next/dynamic";
import { PropsWithChildren, ReactNode } from "react";
import { createPortal } from "react-dom";

type props = {
  status: string;
  children?: ReactNode | undefined;
};

function Card(props: props) {
  let borderColor = "border-2 border-gray";
  if (props.status === "success") {
    borderColor = "border-2 border-primary";
  } else if (props.status === "error") {
    borderColor = "border-2 border-buttonOutLineRed";
  } else {
  }
  return (
    <div
      className={`  ${borderColor} shadow-2xl gap-5  text-center bg-slate-200  w-full h-fit px-5 py-10 rounded-lg z-20`}
    >
      {props.children}
    </div>
  );
}
export default dynamic(() => Promise.resolve(Card), { ssr: false });
