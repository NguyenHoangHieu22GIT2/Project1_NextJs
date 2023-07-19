import Image from "next/image";
import React from "react";

export function LoadingSpinner() {
  return (
    <Image
      src="/logo.png"
      alt="Logo"
      width={500}
      height={500}
      className="invert animate-blinking"
    />
    // <div className="text-center flex justify-center col-span-12 ">
    //   <div className="w-[50px] sm:w-80 aspect-square border-8 sm:border-[16px]   border-gray-500 border-t-gray-300 rounded-full animate-spin"></div>
    // </div>
  );
}
