import Herosection from "@/components/home/hero.js";
import How from "@/components/home/How.js";
import Price from "@/components/home/Price.js";

export default function Home() {
  return (
    <div className="realtive w-full">
      <Herosection />
      <How />
      <Price />
    </div>
  );
}
