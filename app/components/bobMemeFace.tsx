import Image from "next/image";
import bobAlive from "../public/images/alive.webp";
import bobDead from "../public/images/dead.webp";

export default function BobMemeFace(outageHours: number) {
  return outageHours == 0 ? (
    <Image src={bobAlive} alt="bob alive" />
  ) : (
    <Image src={bobDead} alt="bob dead" />
  );
}
