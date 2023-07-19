import Link from "next/link";
import { SystemUI } from "../UI/SystemUI";
import { Montserrat, Outfit } from "next/font/google";
import { FormEvent, ReactElement, useEffect, useState } from "react";
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
import Cart from "../UI/SVG/Cart";
import Search from "../UI/SVG/Search";
import Trash from "../UI/SVG/Trash";
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
  const [searchs, setSearchs] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [openNav, setOpenNav] = useState<boolean>(false);
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [openMessage, setOpenMessage] = useState<boolean>(false);
  const route = useRouter();
  useEffect(() => {
    if (localStorage) {
      setSearchs(JSON.parse(localStorage.getItem("searchInput") || "[]") || []);
    }
  }, []);
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
  function saveInLocalStorage() {
    const searchs =
      JSON.parse(localStorage.getItem("searchInput") || "[]") || [];
    searchs.unshift(searchText);
    if (searchs.length > 5) {
      searchs.pop();
    }
    localStorage.setItem("searchInput", JSON.stringify(searchs));
    setSearchs(searchs);
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
  function search(e: FormEvent) {
    e.preventDefault();
    saveInLocalStorage();
    setOpenSearch(false);
    route.push(`/products/1?search=${searchText.replaceAll(" ", "+")}`);
  }
  return (
    <header className="text-gray-900 sticky top-0   w-full z-10 backdrop-blur-sm font-primary shadow-lg ">
      <SystemUI>
        <div className="flex gap-5 [&>*]:py-3 w-full col-span-12 items-center justify-between">
          <h1
            className={` whitespace-nowrap text-2xl sm:text-3xl font-bold ${outfit.className} `}
          >
            K-rose
          </h1>

          <form onSubmit={search} className="w-full relative basis-2/3 flex">
            <input
              type="text"
              className="w-full py-1 px-2 rounded-tl-lg rounded-bl-lg font-semibold bg-white  outline-none"
              value={searchText || ""}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search any product you want..."
              onBlur={() => {
                setOpenSearch(false);
              }}
              onFocus={() => {
                setOpenSearch(true);
              }}
            />
            <button
              onBlur={() => {
                setOpenSearch(false);
              }}
              className="bg-white rounded-tr-lg rounded-br-lg px-3 border-l-2"
            >
              <Search />
            </button>
            <AnimatePresence mode="wait">
              {openSearch && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-full rounded-bl-lg rounded-br-lg left-0 py-5 px-5 bg-slate-100 w-full"
                >
                  <div className="flex justify-between ">
                    <h1>Search History</h1>
                    <span
                      className="cursor-pointer"
                      onClick={() => {
                        localStorage.setItem("searchInput", JSON.stringify([]));
                        setSearchs([]);
                      }}
                    >
                      <Trash />
                    </span>
                  </div>
                  <div className="flex text-white gap-3 flex-wrap">
                    {searchs.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSearchText(search);
                        }}
                        className="px-2 py-1 cursor-pointer bg-[#4333f4] rounded-xl"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
          <div className="relative gap-2  flex items-center h-full">
            <button onClick={toggleOpenNav} className="">
              <Bar />
            </button>
            <button onClick={toggleOpenCart}>
              <Cart />
            </button>
            <AnimatePresence mode="wait">
              {openCart && (
                <Card
                  class="absolute  right:0 top-full right-5 w-fit bg-white"
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
            <AnimatePresence mode="wait">
              <motion.nav
                animate={
                  openNav
                    ? {
                        height: "auto",
                      }
                    : {
                        height: 0,
                        opacity: 0,
                        transitionEnd: {
                          display: "none",
                        },
                      }
                }
                className=" absolute top-[100%] overflow-hidden right-0 backdrop-blur-3xl bg-slate-50/20 shadow-lg w-fit transition border-2 border-slate-800 rounded-lg text-right px-2 py-5"
              >
                <ul
                  className={`${montserrat.className} flex flex-col gap-5  whitespace-nowrap font-bold justify-between`}
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
                        route.pathname == "/products" &&
                        "text-primary font-bold"
                      }`}
                    >
                      Products
                    </Link>
                  </li>
                  <li className="hover:text-primary transition ">
                    <Link
                      href="/auctions/1"
                      className={`inline-block   ${
                        route.pathname.includes("/auctions", 0) &&
                        "text-primary font-bold"
                      }`}
                    >
                      Auctions
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
                              {dataUserMessages.getAllMessages.map(
                                (user: User) => {
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
                                }
                              )}
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
                  <Link
                    className="float-right mt-2 flex gap-2 items-center"
                    href={`/user/${auth.userId}`}
                  >
                    {auth.username}
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
                )}
              </motion.nav>
            </AnimatePresence>
          </div>

          {/* <nav className=" hidden sm:flex sm:gap-5 justify-center items-center  ">
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
