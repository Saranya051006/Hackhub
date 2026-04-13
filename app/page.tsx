"use client";

import { useRef } from "react";
import Navbar from "@/components/custom/Navbar";
import Hero from "@/components/custom/Hero";
import SearchBar from "@/components/custom/SearchBar";
import FeaturedEvent from "@/components/custom/FeaturedEvent";
import LatestOpportunities from "@/components/custom/LatestOpportunities";

export default function Home() {
  const latestRef = useRef<HTMLDivElement>(null);

  const handleExplore = () => {
    latestRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Navbar />
      <Hero onExplore={handleExplore} />
      <SearchBar />
      <FeaturedEvent />
      <div ref={latestRef}>
        <LatestOpportunities />
      </div>
    </>
  );
}