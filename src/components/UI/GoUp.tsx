import goUp from "../../assets/goUp.svg";
import Image from "next/image";

function scrollToTop() {
  window.scrollTo(0, 0);
}
export function GoUp() {
  return (
    <div
      onClick={scrollToTop}
      className="fixed left-0  bottom-0 m-5 cursor-pointer animate-bounce"
    >
      <Image
        src={goUp}
        width={50}
        height={50}
        alt="Go up the top of the page"
      />
    </div>
  );
}
