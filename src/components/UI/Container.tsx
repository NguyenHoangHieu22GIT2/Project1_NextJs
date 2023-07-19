import { PropsWithChildren } from "react";

const Container: React.FC<PropsWithChildren> = (props) => {
  return (
    <div className="container   px-2 sm:p-0 sm:max-w-[1050px] mx-auto">
      {props.children}
    </div>
  );
};

export default Container;
