import { Filter } from "@/components/Products/Filter";
import { Finder } from "@/components/Products/Finder";
import { Pagination } from "@/components/Products/Pagination";
import { Products } from "@/components/Products/Products";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect, useState } from "react";

const QUERY_PRODUCTS_COUNT = gql`
  query findCountProducts($input: ProductFindOptions!) {
    countProducts(productFindOptions: $input)
  }
`;

const ProductIndexPage: React.FC<PropsWithChildren> = (props) => {
  const router = useRouter();
  const valueToFind = (router.query.search as string) || "";
  const LIMIT = 1;
  const SKIP = 1;
  const { data, loading } = useQuery(QUERY_PRODUCTS_COUNT, {
    variables: {
      input: {
        limit: LIMIT,
        skip: SKIP,
        words: valueToFind,
      },
    },
  });
  const [countProducts, setCountProducts] = useState<number>(0);
  useEffect(() => {
    if (data) {
      setCountProducts(data.countProducts);
    }
  }, [valueToFind, data]);
  let pageNumber = +router.query.pageNumber!;

  if (pageNumber !== pageNumber) {
    pageNumber = 1;
  }

  if (loading) {
    return <h1>Waiting</h1>;
  }
  return (
    <>
      <Finder pageNumber={pageNumber} />
      <Filter />
      <Products
        limit={LIMIT}
        skip={SKIP}
        valueToFind={valueToFind}
        pageNumber={pageNumber}
      />
      <Pagination
        valueToFind={valueToFind}
        firstPage={pageNumber != 1 ? 1 : 0}
        pageNumber={pageNumber}
        lastPage={
          pageNumber + 1 >= Math.ceil(countProducts / LIMIT)
            ? 0
            : Math.ceil(countProducts / LIMIT)
        }
        nextPage={pageNumber * LIMIT < countProducts ? pageNumber + 1 : 0}
        previousPage={pageNumber * LIMIT > LIMIT ? pageNumber - 1 : 0}
      />
    </>
  );
};

export default ProductIndexPage;
