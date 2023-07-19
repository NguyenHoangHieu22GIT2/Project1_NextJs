import Image from "next/image";
import { BlurBall } from "../UI/BlurBall";
import { SystemUI } from "../UI/SystemUI";
import Restaurant from "../../assets/E-Commerce & Delivery-01.png";
import ExploreIcon from "../../assets/ExploreIcon.svg";
export function About() {
  return (
    <section id="about" className="text-gray-700">
      <SystemUI>
        <div className="col-span-12 sm:col-span-6 relative ">
          <BlurBall position={{ x: "bottom-20", y: "left-10" }} />
          <Image src={Restaurant} alt="Introduction" />
        </div>
        <div className="col-span-12 sm:col-span-6 grid sm:gap-4 self-center">
          <h1 className="text-heading col-span-6 leading-none font-bold  capitalize before:content[''] before:absolute relative before:w-3 before:h-full before:top-0 before:-left-5 before:bg-primary ">
            About Us
          </h1>
          <p className="text-paragraph col-span-6 leading-relaxed font-bold  capitalize ">
            We are a team of passionate entrepreneurs who believe in providing
            high-quality products at affordable prices. Shop with us today and
            see for yourself why we're the best place to shop online!
          </p>
          <button className="col-span-3 col-start-4 bg-primary text-3xl text-black  capitalize font-bold px-12 rounded-lg py-2 text-attention flex sm:gap-2 hover:shadow-xl hover:shadow-primary/30 hover:translate-y-1 transition shadow-2xl shadow-primary/50 ">
            Explore
            <Image src={ExploreIcon} alt="Explore Icon" />
          </button>
        </div>
      </SystemUI>
    </section>
  );
}
