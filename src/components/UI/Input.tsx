type props = {
  label: string;
  type: string;
  input: {
    changeValue: (data: string) => void;
    changeBlur: () => any;
    value: string;
    invalid: boolean;
    className?: string;
  };
};
export function Input({ input, label, type }: props) {
  const invalidClassName = input.invalid
    ? "text-red-900 bg-pink-200 border-red-800"
    : "";

  const labelclassNameInvalid = input.invalid ? "text-red-900" : "";
  return (
    <div className="relative col-span-12 text-gray-700">
      <input
        onChange={(e) => {
          input.changeValue(e.target.value.toString());
        }}
        onBlur={input.changeBlur}
        value={input.value}
        className={`bg-transparent ${input.className}  w-full border-b-2 outline-none peer border-primary ${invalidClassName}`}
        type={type}
      />
      <label
        className={`absolute ${labelclassNameInvalid}  left-0 -top-2  transition font-bold text-attention origin-top-left hover:-translate-y-7 hover:text-primary/80 hover:scale-75 
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
