import { Layout } from "@/components/Layout/Layout";
import { CartTable } from "@/components/cart/CartTable";
import InShort from "@/components/cart/InShort";
import { NoItemFromCart } from "@/components/cart/NoItemFromCart";
import { useAppDispatch, useAppSelector } from "@/store";
import { lightNotificationActions } from "@/store/lightNotification";
import { Product } from "@/types/Product";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const QUERY_CART_ITEMS = gql`
  {
    getCartItems {
      description
      discount
      images
      price
      quantity
      stock
      title
      userId
    }
  }
`;
const MUTATION_CREATE_ORDER = gql`
  mutation createOrder {
    createOrder {
      userId
    }
  }
`;

export default function CartPage() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const auth = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const [createOrderGraphqlMutation, { loading, data, error }] = useMutation(
    MUTATION_CREATE_ORDER,
    {
      variables: { input: new Date() },
      context: {
        headers: {
          authorization: `bearer ${auth.token}`,
        },
      },
    }
  );
  async function createOrder() {
    try {
      const result = await createOrderGraphqlMutation();

      if (result.data) {
        setCartItems([]);
        dispatch(
          lightNotificationActions.createNotification({
            status: "success",
            title: "Order Successfully!",
          })
        );
      }
    } catch (error: any) {
      dispatch(
        lightNotificationActions.createNotification({
          status: "error",
          title: error.message,
        })
      );
    }
  }
  const [getCartItemsGraphqlFn] = useLazyQuery(QUERY_CART_ITEMS, {
    context: {
      headers: {
        authorization: `bearer ${auth.token}`,
      },
    },
    fetchPolicy: "no-cache",
  });

  async function getCartItemsFn() {
    const result = await getCartItemsGraphqlFn();
    if (result.data) setCartItems(result.data.getCartItems);
  }
  useEffect(() => {
    if (auth.token) {
      getCartItemsFn();
    }
  }, [auth]);
  console.log(cartItems);
  return (
    <Layout>
      {cartItems.length > 0 ? (
        <>
          <CartTable cartItems={cartItems} />
          <InShort createOrder={createOrder} />
        </>
      ) : (
        <NoItemFromCart />
      )}
    </Layout>
  );
}
