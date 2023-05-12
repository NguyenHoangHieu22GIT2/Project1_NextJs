import { PropsWithChildren, ReactNode } from "react";

type props = {
  children?: ReactNode | undefined;
  classNames?: string;
  onClick?: () => void;
};

export function Button(props: props) {
  return (
    <button
      onClick={props.onClick}
      className={`
    bg-primary  ${
      props.classNames ? props.classNames : ""
    } text-black   capitalize font-bold px-12 rounded-lg py-2 text-attention  transition  
    `}
    >
      {props.children}
    </button>
  );
}
