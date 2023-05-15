import Link from "next/link";
import { SystemUI } from "../UI/SystemUI";
import { Montserrat, Outfit } from "next/font/google";
import { useState } from "react";
import Popup from "../UI/Popup";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store";
import { AnimatePresence } from "framer-motion";
const outfit = Outfit({ subsets: ["latin"] });

const montserrat = Montserrat({ subsets: ["latin"] });
const links = [
  {
    link: "/",
    name: "Home",
    isAuth: false,
  },
  {
    link: "/products",
    isAuth: false,
    name: "Products",
  },
  {
    link: "/create-product",
    isAuth: true,
    name: "Create Products",
  },
  {
    link: "/auth",
    name: "Auth",
    isAuth: false,
  },
  {
    link: "/auth/logout",
    name: "Logout",
    isAuth: true,
  },
];
function Header() {
  const isAuth = useAppSelector((state) => state.auth.token) ? true : false;
  const [openNav, setOpenNav] = useState<boolean>(false);
  const route = useRouter();
  const auth = useAppSelector((state) => state.auth);
  function toggleOpenNav() {
    setOpenNav(!openNav);
  }
  const navLinkElements = links.map((link) => {
    if (auth.token) {
      return;
    }
  });

  return (
    <header className="text-gray-900 sticky top-0  w-full z-10 backdrop-blur-sm font-primary py-5 shadow-lg ">
      <SystemUI>
        <h1
          className={` col-span-3 text-2xl xl:text-3xl font-bold ${outfit.className} `}
        >
          K-rose
        </h1>
        <button className="col-start-12 xl:hidden" onClick={toggleOpenNav}>
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
                className={`   h-screen w-fit transition $ bg-slate-800 px-2 py-5`}
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
                        route.pathname == "/products" &&
                        "text-primary font-bold"
                      }`}
                      href="/products"
                    >
                      Products
                    </Link>
                  </li>
                  {isAuth && (
                    <>
                      <li className="hover:text-primary transition ">
                        <Link
                          href="products/create-product"
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
                    {isAuth ? (
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
              </nav>
            </Popup>
          )}
        </AnimatePresence>
        {/* For Computer */}
        <nav className="col-span-7 col-start-7 hidden xl:flex justify-center items-center w-full ">
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
                href="/products"
                className={`inline-block   ${
                  route.pathname == "/products" && "text-primary font-bold"
                }`}
              >
                Products
              </Link>
            </li>
            {isAuth && (
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
              {isAuth ? (
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
        </nav>
      </SystemUI>
    </header>
  );
}

export default Header;
