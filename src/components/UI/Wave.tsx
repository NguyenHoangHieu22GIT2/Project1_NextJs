import Image from "next/image";
import Waves from "../../assets/Waves.svg";

export function Wave() {
  return (
    <div className="flex justify-center py-10 invert">
      <Image src={Waves} alt="A Wave" />
    </div>
  );
}
