import Banner from "@/components/Banner";
import DemoAccounts from "@/components/DemoAccount";
import Reviews from "@/components/Reviews";
import TopCreators from "@/components/TopCreators";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner />
      <TopCreators />
      <Reviews />
      <DemoAccounts />
    </div>
  );
}
