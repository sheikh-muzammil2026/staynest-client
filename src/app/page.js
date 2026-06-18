import Banner from "@/components/home/banner";
import FeaturedProperties from "@/components/home/properties";
import Reviews from "@/components/home/reviews";
import TopLocations from "@/components/home/topLocations";
import WhyChooseUs from "@/components/home/whyChoose";
import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import Image from "next/image";

export default function Home() {
  return (
 
   <>
   <Navbar/>
   <Banner/>
   <FeaturedProperties/>
   <WhyChooseUs/>
   <TopLocations/>
   <Reviews/>
   <Footer/>
   </>
  );
}
