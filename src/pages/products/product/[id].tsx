import { ReadMore } from "@/components/read-more/ReadMore";
import { RecommendedProducts } from "@/components/read-more/RecommendedProduct";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

const ProductPage: React.FC<PropsWithChildren> = (props) => {
  const router = useRouter();
  const productId: string = router.query.id as string;
  if (productId?.length <= 0) {
    router.replace("/");
  }

  return (
    <>
      <ReadMore productId={productId} />
      <RecommendedProducts productId={productId} />
    </>
  );
};
export default ProductPage;
