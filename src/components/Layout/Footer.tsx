import Image from "next/image";
import { SystemUI } from "../UI/SystemUI";
import ross from "../../assets/ross.svg";
import rulerfoods from "../../assets/rulerfoods.svg";
import synnex from "../../assets/synnex.svg";
import instacart from "../../assets/instacart.svg";
export function Footer() {
  return (
    <footer className="bg-[#252F47] py-5 w-full">
      <SystemUI>
        <div className="sm:col-span-5 col-span-12 text-white">
          <h1 className="text-heading">K-rose</h1>
          <ul className="text-[#D4C4C4]/60 flex flex-col sm:gap-2">
            <li>+0917077967</li>
            <li>+hoanghieufro@gmail.com</li>
            <li>+Laws by Vietnam</li>
          </ul>
        </div>
        <div className="col-span-7">
          <h1 className="text-white text-attention sm:text-heading ">
            Trusted By:
          </h1>
          <ul className="flex sm:gap-5">
            <li>
              <Image src={ross} alt="brang1" />
            </li>
            <li>
              <Image src={synnex} alt="brang1" />
            </li>
            <li>
              <Image src={instacart} alt="brang1" />
            </li>
            <li>
              <Image src={rulerfoods} alt="brang1" />
            </li>
          </ul>
        </div>
      </SystemUI>
    </footer>
  );
}
