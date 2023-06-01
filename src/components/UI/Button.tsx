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
    bg-primary  shadow-2xl ${
      props.classNames ? props.classNames : ""
    } text-black capitalize font-bold xl:px-12 px-2  rounded-lg py-2 xl:text-attention  transition  
    `}
    >
      {props.children}
    </button>
  );
}
