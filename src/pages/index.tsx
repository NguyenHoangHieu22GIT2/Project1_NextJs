import { Introduction } from "@/components/Home/Introduction";
import { Wave } from "@/components/UI/Wave";
import { About } from "@/components/Home/About";
import { FeaturedProducts } from "@/components/Home/FeaturedProducts";
import { Testimonial } from "@/components/Home/Testimonial";
import { Contact } from "@/components/Home/Contact";
import { AnimatePresence, motion } from "framer-motion";
export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Introduction />
      <Wave />
      <About />
      <Wave />
      <FeaturedProducts />
      <Wave />
      <Testimonial />
      <Wave />
      <Contact />
    </motion.div>
  );
}
