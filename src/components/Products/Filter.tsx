import { PropsWithChildren, useState } from "react";
import SystemUI from "../UI/SystemUI";

export function Filter(props: PropsWithChildren) {
  const [value, setValue] = useState(0)
  let priceText
  if (value <= 0) {
    priceText = "Less than 1 million"
  } else if (value <= 20) {
    priceText = "Less than 2 million"
  } else if (value <= 40) {
    priceText = "Less than 4 million"
  } else if (value <= 60) {
    priceText = "Less than 6 million"
  } else if (value <= 80) {
    priceText = "Less than 8 million"
  } else if (value < 100) {
    priceText = "Less than 10 million"
  } else {
    priceText = "10 million and above"
  }
  return <section>
    <SystemUI>
      <h1 className="text-attention relative col-span-3 xl:col-span-2 text-center  text-white before:content-[''] before:w-full before:h-1 before:bg-slate-200 before:absolute before:bottom-0 before:left-0">Filters</h1>
      <div className="col-span-12 grid">
        <p className="text-white/50">prices: <span className="text-white font-bold text-attention">{priceText}</span></p>
        <input className="inline-block" type="range" onChange={(e) => setValue(+e.target.value)} />
      </div>
    </SystemUI>
  </section>
}
