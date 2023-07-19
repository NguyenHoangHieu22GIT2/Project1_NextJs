import { RefObject, useEffect, useRef, useState } from "react";
import autosize from "autosize";
import useAutosizeTextArea from "@/hooks/useAutoSizeTextArea";
type props = {
  label: string;
  input: {
    changeValue: (data: string) => void;
    changeBlur: () => any;
    value: string;
    invalid: boolean;
    className?: string;
  };
  placeholder?: string;
  className?: string;
};
export function TextArea({ input, label, placeholder, className }: props) {
  const invalidClassName = input.invalid
    ? "text-red-900 bg-pink-200 border-red-800"
    : "";

  const [value, setValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;
    input.changeValue(evt.target.value.toString());

    setValue(val);
  };
  const labelclassNameInvalid = input.invalid ? "text-red-900" : "";
  return (
    <div className="relative col-span-12 text-gray-700">
      <textarea
        placeholder={placeholder}
        ref={textAreaRef}
        rows={3}
        onChange={handleChange}
        onBlur={input.changeBlur}
        value={input.value}
        className={`bg-transparent overflow-y-hidden ${input.className} h-fit  w-full border-b-2 outline-none peer border-primary ${invalidClassName} ${className}`}
      ></textarea>
      <label
        className={`absolute ${labelclassNameInvalid}  left-0 -top-2  transition font-bold hover:-translate-y-7 hover:text-primary/80 hover:scale-75      text-attention origin-top-left
         ${
           input.value.toString().length > 0
             ? "-translate-y-7 text-primary sm:block scale-75 "
             : "peer-hover:-translate-y-7  peer-hover:text-primary/80 peer-hover:scale-75  "
         } `}
      >
        {label}
      </label>
    </div>
  );
}
