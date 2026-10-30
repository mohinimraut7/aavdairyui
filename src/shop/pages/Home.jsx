import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import BestSellers from "../components/home/BestSellers";
import WhyChooseUs from "../components/home/WhyChooseUs";
import FarmStory from "../components/home/FarmStory";
import HowItWorks from "../components/home/HowItWorks";
import Faq from "../components/home/Faq";
import usePageTitle from "../hooks/usePageTitle";

export default function Home() {
  usePageTitle(null);
  return (
    <>
      <Hero />
      <Categories />
      <BestSellers />
      <WhyChooseUs />
      <FarmStory />
      <HowItWorks />
      <Faq />
    </>
  );
}
