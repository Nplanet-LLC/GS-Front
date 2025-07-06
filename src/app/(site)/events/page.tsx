import React from "react";
import Hero from "./_components/Hero";
import LatestNews from "./_components/LatestNews";
import MediaGallery from "./_components/MediaGallery";

function page() {
  return (
    <div>
      <Hero />
      <LatestNews />
      <MediaGallery />
    </div>
  );
}

export default page;
