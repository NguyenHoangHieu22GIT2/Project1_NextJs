import { FormEvent } from "react";
import { Input } from "../UI/Input";
import { SystemUI } from "../UI/SystemUI";
import { useInput } from "@/hooks/useInput";
import { Button } from "../UI/Button";
export function Contact() {
  const emailInput = useInput((data) => {
    return data.length < 5;
  });
  const nameInput = useInput((data) => {
    return data.length < 5;
  });
  const phoneNumberInput = useInput((data) => {
    return data.toString().length < 10;
  });
  const formValid = emailInput.isValid;
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formValid) {
    }
  }

  return (
    <section id="contact" className="text-gray-700 my-5">
      <SystemUI>
        <div className="sm:col-span-6 col-span-12">
          <h1 className="text-heading font-bold before:content-[''] before:w-2 before:h-full before:bg-primary before:top-0 before:-left-5 before:absolute relative">
            Contact Us
          </h1>
          <p className="text-attention">
            You have some problems that want us to answer ? Fill out your
            information in all the fields that we have for you. We will get in
            touch with you as soon as possible.
          </p>
        </div>
        <form
          method="post"
          onSubmit={submit}
          className="sm:col-span-6 col-span-12 grid [&>*]:my-5 sm:gap-10"
        >
          <Input label="Email" type="email" input={emailInput} />
          <Input label="Name" type="text" input={nameInput} />
          <Input label="Phone Number" type="text" input={phoneNumberInput} />
          <Button classNames="col-span-6">Submit Now</Button>
        </form>
      </SystemUI>
    </section>
  );
}
