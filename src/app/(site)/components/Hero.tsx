"use client";

import React, { useState, useMemo } from "react";
import SocialMedia from "./SocialMedia";
import Link from "next/link";

function Hero({ data }: any) {
  const [activeButton, setActiveButton] = useState(1);

  const heroContent = useMemo(() => {
    return {
      title: data?.titel || "Glocal Solutions",
      subtitle: data?.subtitle || "Your Trusted Partner",
      description:
        data?.textButton ||
        "Trusted strategic leaders in construction management and consultancy delivering unmatched expertise in high-profile projects, property, and asset management.",
    };
  }, [data]);

  const handleClick = (index: number) => {
    setActiveButton(index);
    // Navigate to respective sections based on button click
    if (index === 0) {
      window.location.href = "/success_stories";
    } else {
      window.location.href = "/service";
    }
  };

  return (
    <div className="hero h-screen w-full relative">
      <div className="bg-[#001C3FB2] absolute w-full h-full">
        <div className="m-auto text-center gap-4 h-full flex items-center justify-center flex-col px-4">
          <h1 className="text-[#FFFFFF] font-bold text-4xl md:text-5xl">
            {heroContent.title}
          </h1>
          <h2 className="text-[#FFFFFF] font-semibold text-xl md:text-2xl mt-2">
            {heroContent.subtitle}
          </h2>
          <p className="max-w-[600px] leading-relaxed !text-white dark:!text-white text-base md:text-lg mt-4">
            {heroContent.description}
          </p>
          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <button
              onClick={() => handleClick(0)}
              className={`w-[200px] h-[50px] rounded-md flex justify-center items-center cursor-pointer text-white transition-all duration-300 transform hover:scale-105 ${
                activeButton === 0
                  ? "bg-[#B31942] border border-transparent"
                  : "bg-transparent border border-white hover:bg-[#B31942] hover:border-transparent"
              }`}
            >
              Success Stories
            </button>
            <button
              onClick={() => handleClick(1)}
              className={`w-[200px] h-[50px] rounded-md flex justify-center items-center cursor-pointer text-white transition-all duration-300 transform hover:scale-105 ${
                activeButton === 1
                  ? "bg-[#B31942] border border-transparent"
                  : "bg-transparent border border-white hover:bg-[#B31942] hover:border-transparent"
              }`}
            >
              Explore Our Services
            </button>
          </div>
        </div>
      </div>
      <div className="flex absolute bottom-10 right-5">
        <SocialMedia />
      </div>
    </div>
  );
}

export default Hero;
