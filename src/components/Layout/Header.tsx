import Link from "next/link";
import { SystemUI } from "../UI/SystemUI";
import { Montserrat, Outfit } from "next/font/google";
import { ReactElement, useState } from "react";
import Popup from "../UI/Popup";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store";
import { AnimatePresence } from "framer-motion";
import { Modal } from "../UI/Modal";
import Card from "../UI/Card";
import Image from "next/image";
import { ApolloError, gql, useQuery } from "@apollo/client";
import { LoadingSpinner } from "../UI/Loading";
import { Product } from "@/types/Product";
import { JsxElement } from "typescript";
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

type responseCartItems = {
  getCartItems: Product[];
};

function Header() {
  const authStore = useAppSelector((state) => state.auth);
  const [openNav, setOpenNav] = useState<boolean>(false);
  const [openCart, setOpenCart] = useState<boolean>(false);
  const route = useRouter();
  const { data, loading, error } = useQuery(QUERY_CART_ITEMS, {
    context: {
      headers: {
        authorization: `bearer ${authStore.token}`,
      },
    },
  });
  let cartItemElements: ReactElement | ReactElement[] = <LoadingSpinner />;
  if (data) {
    const cartItems = data.getCartItems as Product[];
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
  return (
    <header className="text-gray-900 sticky top-0  w-full z-10 backdrop-blur-sm font-primary py-5 shadow-lg ">
      <SystemUI>
        <div className="flex w-full col-span-12 justify-between">
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
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
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
          <nav className=" hidden xl:flex xl:gap-5 justify-center items-center  ">
            <ul
              className={`${montserrat.className} flex gap-9  text-gray-900 text-lg font-bold justify-between`}
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
                    <button>Messages</button>
                    {/* <Link
                      href="/messages"
                      className={`inline-block   ${
                        route.pathname == "/create-product" &&
                        "text-primary font-bold"
                      }`}
                    >
                      Messages
                    </Link> */}
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
              <Image
                className="rounded-full object-cover aspect-square"
                src={
                  process.env.NEXT_PUBLIC_SERVER_IMAGE_URI + authStore.avatar
                }
                width={50}
                height={50}
                alt="user avatar"
              />
            )}
          </nav>
        </div>
      </SystemUI>
    </header>
  );
}

export default Header;
