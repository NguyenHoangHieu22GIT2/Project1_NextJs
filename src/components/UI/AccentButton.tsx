import { PropsWithChildren, ReactNode } from "react";

type props = {
  children?: ReactNode | undefined;
  classNames?: string;
  onClick?: () => void;
};

export function AccentButton(props: props) {
  return (
    <button
      onClick={props.onClick}
      className={`
    bg-accent-800 border border-accent-500  shadow-2xl ${
      props.classNames ? props.classNames : ""
    } text-accent-500 capitalize font-bold px-5  rounded-lg py-2 sm:text-attention  transition  
    `}
    >
      {props.children}
    </button>
  );
}
