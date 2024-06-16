import Body from "@/components/UI/Body";
import FAQ from "@/components/UI/FAQ";
import Features from "@/components/UI/features";
import Hero from "@/components/UI/hero";
import Newsletter from "@/components/UI/newsletter";
import Zigzag from "@/components/UI/zigzag";

export default function Home() {
  return (
    <>
      <Hero />
      <Body />
      <Features />
      <Zigzag />
      <FAQ />
      <Newsletter />
    </>
  );
}
