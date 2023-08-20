import React, { ReactNode } from "react";

type props = {
  children?: ReactNode;
  onClick?: () => void;
};

export default function SecondaryButton(props: props) {
  return (
    <button
      onClick={props.onClick}
      className="px-5 py-2 border border-gray-300 rounded-lg shadow-xl"
    >
      {props.children}
    </button>
  );
}
