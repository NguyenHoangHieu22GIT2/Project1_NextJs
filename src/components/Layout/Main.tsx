import { PropsWithChildren } from "react";

export function Main(props: PropsWithChildren) {
  return <main className="flex-1">{props.children}</main>;
}
