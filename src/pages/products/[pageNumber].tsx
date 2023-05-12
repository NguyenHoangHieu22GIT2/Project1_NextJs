import { Filter } from "@/components/Products/Filter";
import { Finder } from "@/components/Products/Finder";
import { Products } from "@/components/Products/Products";
import { useRouter } from "next/router";
import { PropsWithChildren, useState } from "react";

const ProductIndexPage: React.FC<PropsWithChildren> = (props) => {
  const [valueToFind, setValueToFind] = useState<string>("");
  const router = useRouter();
  function takeFinderValue(value: string) {
    setValueToFind(value);
  }

  let pageNumber = +router.query.pageNumber!;

  if (pageNumber !== pageNumber) {
    pageNumber = 1;
  }

  console.log(pageNumber);

  return (
    <>
      <Finder onFinderValue={takeFinderValue} />
      <Filter />
      <Products valueToFind={valueToFind} pageNumber={pageNumber} />
    </>
  );
};

export default ProductIndexPage;
