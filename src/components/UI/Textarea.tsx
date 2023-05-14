type props = {
  label: string;
  input: {
    changeValue: (data: string) => void;
    changeBlur: () => any;
    value: string;
    invalid: boolean;
    className?: string;
  };
};
export function TextArea({ input, label }: props) {
  const invalidClassName = input.invalid
    ? "text-red-900 bg-pink-200 border-red-800"
    : "";

  const labelclassNameInvalid = input.invalid ? "text-red-900" : "";
  return (
    <div className="relative col-span-12 text-gray-700">
      <textarea
        onChange={(e) => {
          input.changeValue(e.target.value.toString());
        }}
        onBlur={input.changeBlur}
        value={input.value}
        className={`bg-transparent ${input.className} h-fit  w-full border-b-2 outline-none peer border-primary ${invalidClassName}`}
      ></textarea>
      <label
        className={`absolute ${labelclassNameInvalid} -z-10 left-0 -top-2  transition font-bold text-attention origin-top-left
         ${
           input.value.toString().length > 0
             ? "-translate-y-7 text-primary xl:block scale-75 "
             : "peer-hover:-translate-y-7  peer-hover:text-primary/80 peer-hover:scale-75  "
         } `}
      >
        {label}
      </label>
    </div>
  );
}