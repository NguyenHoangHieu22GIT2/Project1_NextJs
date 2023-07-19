import { PropsWithChildren, useState } from "react";
import { SystemUI } from "../UI/SystemUI";
import { BackgroundContainer } from "../UI/BackgroundContainer";

const categories = ["Technology", "Clothes", "Games", "Misc"];

export function Filter(props: PropsWithChildren) {
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState<string>(categories[0]);
  let priceText;
  if (value <= 0) {
    priceText = "Less than 1 million";
  } else if (value <= 20) {
    priceText = "Less than 2 million";
  } else if (value <= 40) {
    priceText = "Less than 4 million";
  } else if (value <= 60) {
    priceText = "Less than 6 million";
  } else if (value <= 80) {
    priceText = "Less than 8 million";
  } else if (value < 100) {
    priceText = "Less than 10 million";
  } else {
    priceText = "10 million and above";
  }
  const radioButtonCategories = categories.map((category, index) => {
    if (index === 0) {
      return (
        <label className="block" key={category} htmlFor={` ${category}`}>
          <input
            defaultChecked
            onClick={() => setCategory(category)}
            type="radio"
            id={` ${category}`}
            name="category"
            value="30"
          />
          {category}
        </label>
      );
    } else {
      return (
        <label className="block" key={category} htmlFor={` ${category}`}>
          <input
            onClick={() => setCategory(category)}
            type="radio"
            id={` ${category}`}
            name="category"
            value="30"
          />
          {category}
        </label>
      );
    }
  });

  return (
    <section className="text-gray-700">
      <SystemUI>
        <BackgroundContainer>
          <h1 className="text-attention font-bold relative col-span-3 sm:col-span-2 text-center   before:content-[''] before:w-full before:h-1 before:bg-slate-200 before:absolute before:bottom-0 before:left-0">
            Filters
          </h1>
          {/* <div className="col-span-12 grid">
          <p className=" font-bold text-2xl">
            prices:
            <span className="text-white font-bold text-attention">
              {priceText}
            </span>
          </p>
          <input
            className="inline-block"
            type="range"
            onChange={(e) => setValue(+e.target.value)}
          />
        </div> */}
          <form className="col-span-12 " action="">
            <h1 className="text-2xl font-bold">Category:</h1>

            {radioButtonCategories}
          </form>
        </BackgroundContainer>
      </SystemUI>
    </section>
  );
}
