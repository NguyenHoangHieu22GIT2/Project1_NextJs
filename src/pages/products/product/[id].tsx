import { Layout } from "@/components/Layout/Layout";
import { Comment } from "@/components/read-more/Comment";
import { ReadMore } from "@/components/read-more/ReadMore";
import { RecommendedProducts } from "@/components/read-more/RecommendedProduct";
import { useToken } from "@/hooks/useToken";
import { client } from "@/pages/_app";
import { useAppSelector } from "@/store";
import { Product } from "@/types/Product";
import { ApolloError, gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

const QUERY_ONE_PRODUCT = gql`
  query findProductById($input: String!) {
    findProductById(id: $input) {
      _id
      title
      price
      description
      imageUrl
      discount
      stock
    }
  }
`;

const QUERY_PRODUCT_RECOMMENDED = gql`
  query findRecommendedProducts($input: ProductFindOptions!) {
    findRecommendedProducts(productFindOptions: $input) {
      _id
      description
      imageUrl
      price
      quantity
      userId
      title
    }
  }
`;

type props = {
  notFound?: boolean;
  product: Product;
  error?: ApolloError;
  productsRecommended: Product[];
  loadingProduct: boolean;
  loadingProducts: boolean;
};
const ProductPage: React.FC<props> = (props) => {
  const csrfToken = useToken();
  return (
    <Layout>
      <ReadMore csrfToken={csrfToken} product={props.product} />
      <Comment />
      <RecommendedProducts products={props.productsRecommended} />
    </Layout>
  );
};
export default ProductPage;
export const getServerSideProps: GetServerSideProps = async (context) => {
  let props;
  try {
    const productId = context.query.id;
    const resultProduct = await client.query({
      query: QUERY_ONE_PRODUCT,
      variables: { input: productId },
    });
    const resultProductRecommend = await client.query({
      query: QUERY_PRODUCT_RECOMMENDED,
      variables: { input: { productId, limit: 4, skip: 0 } },
    });

    props = {
      product: resultProduct.data.findProductById,
      loadingProduct: resultProduct.loading,
      productsRecommended: resultProductRecommend.data.findRecommendedProducts,
      loadingProducts: resultProductRecommend.loading,
    };
  } catch (error: any) {
    props = {
      notFound: true,
    };
  }
  if (props.notFound) {
    return {
      notFound: true,
    };
  }
  return {
    props: props,
  };
};
