import Link from "next/link";
import SystemUI from "../UI/SystemUI";
import { Montserrat, Outfit } from "next/font/google";
import { useState } from "react";
import Popup from "../UI/Popup";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store";
const outfit = Outfit({ subsets: ["latin"] });

const montserrat = Montserrat({ subsets: ["latin"] });

function Header() {
  const isAuth = useAppSelector((state) => state.auth.token) ? true : false;
  const [openNav, setOpenNav] = useState<boolean>(false);
  const route = useRouter();

  function toggleOpenNav() {
    setOpenNav(!openNav);
  }

  const navbarClasses = openNav ? "translate-x-0" : "-translate-x-52";
  return (
    <header className="text-white sticky top-0  w-full z-10 backdrop-blur-sm font-primary py-5 bg-[#8184A0]/50 ">
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

        <Popup isOpen={openNav} onClick={toggleOpenNav}>
          <nav
            className={`fixed xl:hidden z-20 top-0 h-screen w-fit left-0 transition ${navbarClasses} bg-slate-800 px-2 py-5`}
          >
            <ul
              className={`${montserrat.className} flex flex-col gap-5 text-slate-200 text-lg font-normal justify-between`}
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
                    route.pathname == "/products" && "text-primary font-bold"
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
        {/* For Computer */}
        <nav className="col-span-7 col-start-7 hidden xl:flex justify-center items-center w-full ">
          <ul
            className={`${montserrat.className} flex gap-9  text-slate-200 text-lg font-normal justify-between`}
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
      </SystemUI>
    </header>
  );
}

export default Header;
