import { PropsWithChildren, ReactNode } from "react";

type props = {
  className?: string;
  children: ReactNode;
};

export function BackgroundContainer(props: props) {
  return (
    <div
      className={`${props.className}  col-span-12 grid grid-cols-12 shadow-lg  p-5 bg-white rounded-lg`}
    >
      {props.children}
    </div>
  );
}
