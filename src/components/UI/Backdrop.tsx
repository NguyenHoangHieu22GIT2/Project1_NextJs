import { PropsWithChildren } from "react";

type props = {
  onClick: () => void;
};

export function Backdrop(props: props) {
  return (
    <div
      onClick={props.onClick}
      className="fixed z-10 top-0 left-0 w-screen h-screen bg-slate-900/50"
    ></div>
  );
}
