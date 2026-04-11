import Navbar from "@/components/custom/Navbar";
import Hero from "@/components/custom/Hero";
import SearchBar from "@/components/custom/SearchBar";
import FeaturedEvent from "@/components/custom/FeaturedEvent";



export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <SearchBar />
      <FeaturedEvent />
    </>
  );
}