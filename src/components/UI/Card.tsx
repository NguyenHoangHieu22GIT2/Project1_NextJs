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
    <>
      {createPortal(
        <div
          className={`fixed ${borderColor} shadow-2xl gap-5 flex flex-col justify-center items-center top-1/2 bg-slate-200 xl:w-5/12 w-full h-fit px-5 py-10 rounded-lg  left-1/2 -translate-x-1/2 -translate-y-1/2 z-20`}
        >
          {props.children}
        </div>,
        document.querySelector("#card")!
      )}
    </>
  );
}
export default dynamic(() => Promise.resolve(Card), { ssr: false });
