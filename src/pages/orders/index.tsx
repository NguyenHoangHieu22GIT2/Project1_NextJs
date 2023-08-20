import { Layout } from "@/components/Layout/Layout";
import { OrderTable } from "@/components/Orders/OrderTable";
import { useAppSelector } from "@/store";
import { Order } from "@/types/Order";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";

const QUERY_ORDERS = gql`
  {
    orders {
      _id
      userId
      date
      products {
        description
        discount
        images
        price
        quantity
        title
      }
    }
  }
`;

export default function index() {
  const auth = useAppSelector((state) => state.auth);
  const [orders, setOrders] = useState<Order[]>([]);
  const [getOrdersGraphqlFn] = useLazyQuery(QUERY_ORDERS, {});
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      getOrdersGraphqlFn({
        context: {
          headers: {
            authorization: `bearer ${sessionStorage.getItem("token")}`,
          },
        },
        fetchPolicy: "no-cache",
      }).then((result) => {
        if (result.data) {
          console.log(result.data);
          setOrders(result.data.orders);
        }
      });
    }
  }, []);
  console.log("auth store");
  return (
    <Layout>
      <OrderTable orders={orders} />
    </Layout>
  );
}
