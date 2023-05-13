import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "@/components/Layout/Layout";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { Provider } from "react-redux";
import store, { useAppDispatch } from "@/store";
import { useEffect } from "react";
import { authActions } from "@/store/auth";
import Card from "@/components/UI/Card";
import { LoadingSpinner } from "@/components/UI/Loading";
export default function App({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_SERVER_URI,
    cache: new InMemoryCache(),
  });

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </Provider>
  );
}
