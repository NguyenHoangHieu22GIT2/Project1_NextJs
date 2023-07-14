import Link from "next/link";
import { SystemUI } from "../UI/SystemUI";
import { Montserrat, Outfit } from "next/font/google";
import { ReactElement, useState } from "react";
import Popup from "../UI/Popup";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/store";
import { AnimatePresence } from "framer-motion";
import { Modal } from "../UI/Modal";
import Card from "../UI/Card";
import Image from "next/image";
import { ApolloError, gql, useQuery } from "@apollo/client";
import { LoadingSpinner } from "../UI/Loading";
import { Product } from "@/types/Product";
import { motion } from "framer-motion";
import { lightNotificationActions } from "@/store/lightNotification";
import { socket } from "@/pages/_app";
import { User } from "@/types/User.Schema";
import Bar from "../UI/SVG/Bar";
const outfit = Outfit({ subsets: ["latin"] });

const montserrat = Montserrat({ subsets: ["latin"] });

const QUERY_CART_ITEMS = gql`
  {
    getCartItems {
      title
      price
      description
      images
      userId
      quantity
    }
  }
`;
const QUERY_ALL_USERS_MESSAGES = gql`
  {
    getAllMessages {
      _id
      username
      avatar
    }
  }
`;

type responseCartItems = {
  getCartItems: Product[];
};

function Header() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const authStore = useAppSelector((state) => state.auth);
  const [openNav, setOpenNav] = useState<boolean>(false);
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [openMessage, setOpenMessage] = useState<boolean>(false);
  const route = useRouter();
  const {
    data: dataUserMessages,
    loading: loadingUserMessages,
    error: errorUserMessages,
  } = useQuery(QUERY_ALL_USERS_MESSAGES, {
    context: {
      headers: {
        authorization: `bearer ${auth.token}`,
      },
    },
  });
  const {
    data: dataCartItems,
    loading: loadingCartItems,
    error: errorLoadingCartItems,
  } = useQuery(QUERY_CART_ITEMS, {
    context: {
      headers: {
        authorization: `bearer ${authStore.token}`,
      },
    },
  });
  let cartItemElements: ReactElement | ReactElement[] = <LoadingSpinner />;
  if (dataCartItems) {
    const cartItems = dataCartItems.getCartItems as Product[];
    cartItemElements = cartItems.map((cartItem) => (
      <li className="flex justify-between" key={cartItem._id}>
        <div>
          <Image
            src={cartItem.images[0]}
            width={150}
            height={150}
            alt={cartItem.title}
          />
          <h1>{cartItem.title}</h1>
        </div>
        <div>
          <p>{cartItem.price}$</p>
          <p>{cartItem.quantity} in cart.</p>
          {/* <button className="border-[#e8e8e8] text-[#999999] px-2 border-[1px]">-</button>
          <input className="w-10 text-center" type="number" />
          <button className="border-[#e8e8e8] text-[#999999] px-2 border-[1px]">+</button> */}
        </div>
      </li>
    ));
  }
  function toggleOpenNav() {
    setOpenNav(!openNav);
  }
  function toggleOpenCart() {
    setOpenCart(!openCart);
  }
  function joinRoom(otherUserId: string) {
    console.log(otherUserId);
    if (!auth.userId) {
      dispatch(
        lightNotificationActions.createNotification({
          status: "error",
          title: "You have to login first!!!",
        })
      );
      return;
    }
    socket.emit("joinRoomLite", {
      users: [otherUserId, auth.userId],
      joinerId: auth.userId,
    });
  }
  return (
    <header className="text-gray-900 sticky top-0  w-full z-10 backdrop-blur-sm font-primary shadow-lg ">
      <SystemUI>
        <div className="flex w-full col-span-12 items-center justify-between">
          <h1
            className={` whitespace-nowrap text-2xl xl:text-3xl font-bold ${outfit.className} `}
          >
            K-rose
          </h1>
          <div className=" flex gap-2 xl:hidden">
            <button onClick={toggleOpenNav}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
            <button onClick={toggleOpenCart}>
              <Bar />
            </button>
          </div>
          <AnimatePresence mode="wait">
            {openCart && (
              <Card
                class="fixed top-full right-5 w-fit bg-white"
                animation={{
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                }}
              >
                <ul className="flex flex-col gap-5 overflow-y-scroll">
                  {cartItemElements}
                </ul>
              </Card>
            )}
          </AnimatePresence>
          {/* For Phone */}
          <AnimatePresence mode="wait">
            {openNav && (
              <Popup
                isHeader={true}
                animation={{
                  initial: { x: -200 },
                  animate: { x: 0 },
                  exit: { x: -200 },
                  transition: { bounce: 0 },
                }}
                isOpen={openNav}
                onClick={toggleOpenNav}
              >
                <nav
                  className={`h-screen w-fit transition $ bg-slate-800 px-2 py-5`}
                >
                  <ul
                    className={`${montserrat.className} flex flex-col gap-5 text-gray-300 text-lg font-bold justify-between`}
                  >
                    <li className="hover:text-primary transition ">
                      <Link
                        className={`inline-block   ${
                          route.pathname == "/" && "text-primary font-bold"
                        }`}
                        href="/"
                      >
                        Home
                      </Link>
                    </li>
                    <li className="hover:text-primary transition ">
                      <Link
                        className={`inline-block   ${
                          route.pathname == "/products/1" &&
                          "text-primary font-bold"
                        }`}
                        href="/products/1"
                      >
                        Products
                      </Link>
                    </li>
                    {authStore.token && (
                      <>
                        <li className="hover:text-primary transition ">
                          <Link
                            href="/products/create-product"
                            className={`inline-block   ${
                              route.pathname == "/create-product" &&
                              "text-primary font-bold"
                            }`}
                          >
                            Create Products
                          </Link>
                        </li>
                        <li className="hover:text-primary transition ">
                          <Link
                            href="/messages"
                            className={`inline-block   ${
                              route.pathname == "/create-product" &&
                              "text-primary font-bold"
                            }`}
                          >
                            Messages
                          </Link>
                        </li>
                        <li className="hover:text-primary transition ">
                          <Link href={`/user/${auth.userId}`}>
                            <Image
                              className="rounded-full object-cover aspect-square"
                              src={
                                process.env.NEXT_PUBLIC_SERVER_IMAGE_URI +
                                authStore.avatar
                              }
                              width={50}
                              height={50}
                              alt="user avatar"
                            />
                          </Link>
                        </li>
                      </>
                    )}
                    <li className="hover:text-primary transition ">
                      {authStore.token ? (
                        <Link href="/auth/logout">Log out</Link>
                      ) : (
                        <Link
                          href="/auth"
                          className={`inline-block   ${
                            route.pathname == "/auth" &&
                            "text-primary font-bold"
                          }`}
                        >
                          Auth
                        </Link>
                      )}
                    </li>
                  </ul>
                </nav>
              </Popup>
            )}
          </AnimatePresence>
          {/* For Computer */}
          <button onClick={toggleOpenNav} className="">
            <Bar />
          </button>
          {/* <nav className=" hidden xl:flex xl:gap-5 justify-center items-center  ">
            <ul
              className={`${montserrat.className} flex gap-9 [&>li]:py-5  text-gray-900 text-lg font-bold justify-between`}
            >
              <li className="hover:text-primary transition ">
                <Link
                  className={`inline-block   ${
                    route.pathname == "/" && "text-primary font-bold"
                  }`}
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li className="hover:text-primary transition ">
                <Link
                  href="/products/1"
                  className={`inline-block   ${
                    route.pathname == "/products" && "text-primary font-bold"
                  }`}
                >
                  Products
                </Link>
              </li>
              {authStore.token && (
                <>
                  <li className="hover:text-primary transition ">
                    <Link
                      href="/products/create-product"
                      className={`inline-block   ${
                        route.pathname == "/create-product" &&
                        "text-primary font-bold"
                      }`}
                    >
                      Create Products
                    </Link>
                  </li>
                  <li className="hover:text-primary transition ">
                    <Link
                      href="/cart"
                      className={`inline-block   ${
                        route.pathname == "/create-product" &&
                        "text-primary font-bold"
                      }`}
                    >
                      Cart
                    </Link>
                  </li>
                  <li className="hover:text-primary transition ">
                    <Link
                      href="/orders"
                      className={`inline-block   ${
                        route.pathname == "/create-product" &&
                        "text-primary font-bold"
                      }`}
                    >
                      Orders
                    </Link>
                  </li>
                  <li className="hover:text-primary relative transition ">
                    <button onClick={() => setOpenMessage(!openMessage)}>
                      Messages
                    </button>
                    <AnimatePresence mode="wait">
                      {openMessage && (
                        <motion.ul
                          initial={{ opacity: 0, y: 100 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 100 }}
                          className="absolute flex flex-col w-fit text-black bg-slate-100 shadow-2xl p-5 top-full left-0"
                        >
                          {dataUserMessages.getAllMessages.map((user: User) => {
                            return (
                              <li key={user._id} className="">
                                <button
                                  className="flex cursor-pointer items-center gap-5 w-full"
                                  onClick={joinRoom.bind(null, user._id)}
                                >
                                  <div className="w-12">
                                    <Image
                                      width={50}
                                      height={50}
                                      className="rounded-full aspect-square object-cover"
                                      src={
                                        process.env
                                          .NEXT_PUBLIC_SERVER_IMAGE_URI +
                                        user.avatar
                                      }
                                      alt={user.username}
                                    ></Image>
                                  </div>
                                  <div>{user.username}</div>
                                </button>
                              </li>
                            );
                          })}
                          <li>
                            <Link
                              href="/messages"
                              className="text-left text-sm"
                            >
                              All messages...
                            </Link>
                          </li>
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                </>
              )}
              <li className="hover:text-primary transition ">
                {authStore.token ? (
                  <Link href="/auth/logout">Log out</Link>
                ) : (
                  <Link
                    href="/auth"
                    className={`inline-block   ${
                      route.pathname == "/auth" && "text-primary font-bold"
                    }`}
                  >
                    Auth
                  </Link>
                )}
              </li>
            </ul>
            {authStore.token && (
              <Link href={`/user/${auth.userId}`}>
                <Image
                  className="rounded-full object-cover aspect-square"
                  src={
                    process.env.NEXT_PUBLIC_SERVER_IMAGE_URI + authStore.avatar
                  }
                  width={50}
                  height={50}
                  alt="user avatar"
                />
              </Link>
            )}
          </nav> */}
        </div>
      </SystemUI>
    </header>
  );
}

export default Header;
