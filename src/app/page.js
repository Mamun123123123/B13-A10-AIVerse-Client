import AiTools from "@/components/AiTools";
import Banner from "@/components/Banner";
import DemoAccounts from "@/components/DemoAccount";
import Reviews from "@/components/Reviews";
import TopCreators from "@/components/TopCreators";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner />
      <TopCreators />
      <WhyChooseUs />
      <Reviews />
      <AiTools />
      <DemoAccounts />
    </div>
  );
}
