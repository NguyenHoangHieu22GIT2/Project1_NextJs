import { useRef } from "react";
import { Button } from "@/components/UI/Button";
import { SystemUI } from "@/components/UI/SystemUI";

export default function CreateProduct() {
  const textareaRef = useRef();
  function run() {
    //@ts-ignore
    textareaRef.current.value += `\nplayer.position.x += 10`;
  }
  function jump() {
    //@ts-ignore
    textareaRef.current.value += `\nplayer.position.y += 10`;
  }
  function loop() {
    //@ts-ignore
    textareaRef.current.value += `\nfor(let i = 0; i <10;i++){}`;
  }
  return (
    <section className="py-5">
      <SystemUI>
        <div className="col-span-12">
          <h1 className="text-black text-center font-bold text-3xl">
            Write Code:
          </h1>
          <textarea
            //@ts-ignore
            ref={textareaRef}
            name=""
            id=""
            className="w-full col-span-12 outline-none font-mono"
            cols={30}
            rows={10}
          ></textarea>
          <div className="py-5">
            <ul className="flex gap-5">
              <li>
                <Button onClick={run}>Run</Button>
              </li>
              <li>
                <Button onClick={jump}>Jump</Button>
              </li>
              <li>
                <Button onClick={loop}>Loop</Button>
              </li>
            </ul>
          </div>
          <Button>Run Code</Button>
        </div>
      </SystemUI>
    </section>
  );
}
