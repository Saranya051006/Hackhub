"use client";

import { useState } from "react";
import Navbar from "@/components/custom/Navbar";
import Hero from "@/components/custom/Hero";
import SearchBar from "@/components/custom/SearchBar";
import FeaturedEvent from "@/components/custom/FeaturedEvent";
import LatestOpportunities from "@/components/custom/LatestOpportunities";

export default function Home() {
  const [showLatest, setShowLatest] = useState(false);

  return (
    <>
      <Navbar />
      <Hero onExplore={() => setShowLatest(true)} />
      <SearchBar />
      <FeaturedEvent />
      {showLatest && <LatestOpportunities />}
    </>
  );
}