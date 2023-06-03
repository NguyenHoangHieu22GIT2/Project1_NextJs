import { PropsWithChildren, ReactNode } from "react";

type props = {
  children: ReactNode;
  userOrNot: boolean;
};

export function Message(props: props) {
  return (
    <li
      className={` ${
        props.userOrNot
          ? "self-end bg-green-500 before:bg-green-500 before:-right-1"
          : "bg-blue-500 before:bg-blue-500 before:-left-1"
      }  inline-block px-5 py-1 rounded-lg  before:content-[''] before:w-5 before:aspect-square  before:rounded-full before:absolute relative before:-bottom-1 `}
    >
      {props.children}
    </li>
  );
}
