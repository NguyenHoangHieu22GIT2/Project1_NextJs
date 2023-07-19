import { PropsWithChildren } from "react";
import { SystemUI } from "../UI/SystemUI";
import Image from "next/image";
import introductionImage from "../../assets/E-Commerce & Delivery-19.png";
import { BlurBall } from "../UI/BlurBall";
import { Montserrat, Outfit } from "next/font/google";
const outfit = Outfit({ subsets: ["latin"] });

export function Introduction(props: PropsWithChildren) {
  return (
    <section id="home " className="mt-5 sm:mt-0 text-black">
      <SystemUI>
        <div className="sm:col-span-6 col-span-12 grid sm:gap-4 self-center">
          <h1
            className={`text-3xl text-center sm:text-left sm:text-heading ${outfit.className} col-span-12 leading-none font-bold bg-gradient-to-r from-gray-700  to-primary capitalize bg-clip-text text-transparent`}
          >
            Get the best deals on the hottest products
          </h1>
          <p className="text-paragraph text-center sm:text-left col-span-12 leading-relaxed font-bold bg-gradient-to-r from-gray-700  to-primary capitalize bg-clip-text text-transparent">
            Get Ready to Fall in Love with Our Top-Selling Items. With all the
            quality products on sale, you will have a better life at shopping
            without needing to think!
          </p>
          <button className="sm:col-span-6 col-span-12 px-12 uppercase font-bold rounded-lg py-2 border-2 text-attention border-gray-700 hover:bg-gray-800 hover:text-white transition">
            About us
          </button>
          <button className="sm:col-span-6 col-span-12 sm:mt-0 mt-5 bg-gradient-to-r from-gray-300  to-primary uppercase font-bold px-12 rounded-lg py-2 text-attention  ">
            Shop now
          </button>
        </div>
        <div className="col-span-12 sm:col-span-6 relative ">
          <BlurBall position={{ x: "bottom-32", y: "left-20" }} />
          <Image src={introductionImage} alt="Introduction" />
        </div>
      </SystemUI>
    </section>
  );
}
