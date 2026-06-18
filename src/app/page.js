
import Banner from "@/components/public/home/banner";
import FeaturedProperties from "@/components/public/home/properties";
import Reviews from "@/components/public/home/reviews";
import TopLocations from "@/components/public/home/topLocations";
import WhyChooseUs from "@/components/public/home/whyChoose";
import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";


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
