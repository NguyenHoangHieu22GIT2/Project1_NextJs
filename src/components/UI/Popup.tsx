import { Fragment, ReactNode } from "react";
import { createPortal } from "react-dom";
import { Backdrop } from "./Backdrop";
import { Modal } from "./Modal";
import dynamic, { noSSR } from "next/dynamic";

type props = {
  children?: ReactNode | undefined;
  onClick: () => void;
  isOpen: boolean;
};

const Popup: React.FC<props> = (props) => {
  return (
    <>
      {createPortal(
        <Modal>{props.children}</Modal>,
        document.getElementById("modal")!
      )}
      {props.isOpen &&
        createPortal(
          <Backdrop onClick={props.onClick}></Backdrop>,
          document.getElementById("backdrop")!
        )}
    </>
  );
};

export default dynamic(() => Promise.resolve(Popup), { ssr: false });
