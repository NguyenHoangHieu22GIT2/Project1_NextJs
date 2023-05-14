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
import store from "@/store";
import { AnimatePresence } from "framer-motion";
export default function App({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_SERVER_URI,
    cache: new InMemoryCache(),
  });

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Layout>
          <div key={"1"} id="modal"></div>
          <div key={"2"} id="backdrop"></div>
          <div key={"3"} id="card"></div>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </Provider>
  );
}
