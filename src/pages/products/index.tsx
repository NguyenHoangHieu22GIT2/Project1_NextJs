import { Filter } from "@/components/Products/Filter";
import { Finder } from "@/components/Products/Finder";
import { Products } from "@/components/Products/Products";
import { useRouter } from "next/router";
import { PropsWithChildren, useState } from "react";

const ProductPage: React.FC<PropsWithChildren> = (props) => {
  const [valueToFind, setValueToFind] = useState<string>("");
  function takeFinderValue(value: string) {
    setValueToFind(value);
  }

  return (
    <>
      <Finder onFinderValue={takeFinderValue} />
      <Filter />
      <Products pageNumber={1} valueToFind={valueToFind} />
    </>
  );
};

export default ProductPage;
