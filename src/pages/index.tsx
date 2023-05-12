import Introduction from "@/components/Home/Introduction";
import { Wave } from "@/components/UI/Wave";
import { About } from "@/components/Home/About";
import { FeaturedProducts } from "@/components/Home/FeaturedProducts";
import { Testimonial } from "@/components/Home/Testimonial";
import { Contact } from "@/components/Home/Contact";
import { useAppSelector } from "@/store";
import Card from "@/components/UI/Card";

export default function Home() {
  return (
    <>
      <Introduction />
      <Wave />
      <About />
      <Wave />
      <FeaturedProducts />
      <Wave />
      <Testimonial />
      <Wave />
      <Contact />
    </>
  );
}
