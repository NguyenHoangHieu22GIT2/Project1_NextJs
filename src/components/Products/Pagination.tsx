import { PropsWithChildren } from "react";
import SystemUI from "../UI/SystemUI";
import Link from "next/link";

type props = {
  firstPage: number;
  pageNumber: number;
  nextPage: number;
  previousPage: number;
  lastPage: number;
  valueToFind: string;
};

export const Pagination: React.FC<props> = (props) => {
  const searchParam =
    props.valueToFind.length > 0 ? `search=${props.valueToFind}` : "";
  let firstPage = props.firstPage > 0 &&
    props.pageNumber != 1 &&
    props.pageNumber - 1 != 1 && (
      <>
        <li className="border-2 border-primary">
          <Link
            href={`/products/${props.firstPage}?${searchParam}`}
            className="inline-block px-4 hover:bg-primary transition"
          >
            {props.firstPage}
          </Link>
        </li>
        ...
      </>
    );
  let theCurrentLink = (
    <li className="border-2 border-primary  bg-primary">
      <Link
        href={`/products/${props.pageNumber}?${searchParam}`}
        className="inline-block px-4 hover:bg-primary transition"
      >
        {props.pageNumber}
      </Link>
    </li>
  );

  let nextPage = props.nextPage > 0 && (
    <li className="border-2 border-primary  ">
      <Link
        href={`/products/${props.nextPage}?${searchParam}`}
        className="inline-block px-4 hover:bg-primary transition"
      >
        {props.nextPage}
      </Link>
    </li>
  );
  let previousPage = props.previousPage > 0 && (
    <li className="border-2 border-primary  ">
      <Link
        href={`/products/${props.previousPage}?${searchParam}`}
        className="inline-block px-4 hover:bg-primary transition"
      >
        {props.previousPage}
      </Link>
    </li>
  );
  let lastPage = props.lastPage > 0 && (
    <>
      ...
      <li className="border-2 border-primary  ">
        <Link
          href={`/products/${props.lastPage}?${props.valueToFind}`}
          className="inline-block px-4 hover:bg-primary transition"
        >
          {props.lastPage}
        </Link>
      </li>
    </>
  );

  let nextPageButton = props.nextPage > 0 && (
    <li className="border-2 xl:block hidden border-primary  ">
      <Link
        href={`/products/${props.nextPage}`}
        className="inline-block px-4 hover:bg-primary transition"
      >
        {">"}
      </Link>
    </li>
  );
  let previousPageButton = props.previousPage > 0 && (
    <li className="border-2 xl:block hidden border-primary  ">
      <Link
        href={`/products/${props.previousPage}`}
        className="inline-block px-4 hover:bg-primary transition"
      >
        {"<"}
      </Link>
    </li>
  );
  return (
    <nav className="my-4 text-white">
      <SystemUI>
        <ul className="flex justify-center col-span-12 xl:gap-5 gap-1 text-sm xl:text-2xl ">
          {previousPageButton}
          {firstPage}
          {previousPage}
          {theCurrentLink}
          {nextPage}
          {lastPage}
          {nextPageButton}
        </ul>
      </SystemUI>
    </nav>
  );
};

{
  /* <li className="border-2 border-primary px-4 bg-primary">
            <Link href={`/products/${1}`}>1</Link>
          </li>

          <li className="border-2 border-primary px-4 ">
            <Link href={`/products/${2}`}>2</Link>
          </li>
          <li className="border-2 border-primary px-4 hover:bg-primary/80 transition-all hover:text-primarypx-4">
            <Link href={`/products/${3}`}>3</Link>
          </li> */
}
