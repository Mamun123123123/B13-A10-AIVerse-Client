import Banner from "@/components/Banner";
import Reviews from "@/components/Reviews";
import TopCreators from "@/components/TopCreators";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner />
      <TopCreators />
      <Reviews />
    </div>
  );
}
