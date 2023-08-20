import React from "react";
import { SystemUI } from "../UI/SystemUI";
import Image from "next/image";
import { Button } from "../UI/Button";
import { useRouter } from "next/router";

export function NoItemFromCart() {
  const router = useRouter();
  return (
    <section>
      <SystemUI>
        <div className="col-span-12 h-screen flex justify-center items-center">
          <div className="text-center">
            <Image
              src="/NoItemFromCart.png"
              width={300}
              height={300}
              alt="No Cart Item"
              className="mx-auto"
            ></Image>
            <h1 className="font-semibold text-3xl">
              You haven't put anything to cart, let's go and do it :3
            </h1>
            <Button
              onClick={() => {
                router.replace("/products/1");
              }}
            >
              Go Back!
            </Button>
          </div>
        </div>
      </SystemUI>
    </section>
  );
}
