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
import store, { useAppDispatch, useAppSelector } from "@/store";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { useEffect } from "react";
import { authActions } from "@/store/auth";
import { ErrorBoundary } from "@/components/Layout/ErrorBoundary";
import createUploadLink from "apollo-upload-client/public/createUploadLink.js";
import { LightNotification } from "@/components/UI/LightNotification";
import { Socket, io } from "socket.io-client";
import { ChatBoxes } from "@/components/chat/ChatBoxes";

let socket: Socket;

if (typeof window !== "undefined") {
  socket = io(process.env.NEXT_PUBLIC_SERVER_URI!, {
    query: {
      userId: sessionStorage.getItem("userId"),
    },
  }).connect();
}
export { socket };
export const client = new ApolloClient({
  link: createUploadLink({ uri: process.env.NEXT_PUBLIC_SERVER_URI + "graphql" }),
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps, router }: AppProps) {
  // const lightNotification = useAppSelector((state) => state.lightNotification);
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ErrorBoundary>
          <Header />
          <AnimatePresence
            mode="wait"
            onExitComplete={() => window.scrollTo(0, 0)}
          >
            <Component {...pageProps} key={router.asPath} />
          </AnimatePresence>

          <Footer />
        </ErrorBoundary>
      </ApolloProvider>
    </Provider>
  );
}
