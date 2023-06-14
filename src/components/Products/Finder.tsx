import {
  ChangeEvent,
  FormEvent,
  LegacyRef,
  PropsWithChildren,
  useState,
} from "react";
import { SystemUI } from "../UI/SystemUI";
import Image from "next/image";
import search from "../../assets/search-line.svg";
import { useRef } from "react";
import { useRouter } from "next/router";
import { BackgroundContainer } from "../UI/BackgroundContainer";

type props = {
  pageNumber: number;
};

export function Finder(props: props) {
  const [value, setValue] = useState("");
  const router = useRouter();
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`/products/1?search=${value}`);
  }
  return (
    <div className="my-5">
      <SystemUI>
        <BackgroundContainer>
          <form
            onSubmit={submit}
            className="col-span-12 grid grid-cols-12 py-5"
          >
            <input
              onChange={(e) => setValue(e.target.value)}
              className="col-span-10 bg-gray-300 px-3 py-5 text-2xl outline-none rounded-bl-lg rounded-tl-lg"
              placeholder="Find Products..."
            />
            <button className="bg-slate-900 col-span-2 flex justify-center items-center rounded-br-lg rounded-tr-lg ">
              <Image src={search} className="invert" alt="Find button" />
            </button>
          </form>
        </BackgroundContainer>
      </SystemUI>
    </div>
  );
}
