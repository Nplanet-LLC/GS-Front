"use client";
import React, { useState } from "react";

function Hero() {
  const [activeButton, setActiveButton] = useState(1);

  const handleClick = (index: number) => {
    setActiveButton(index);
  };

  return (
    <div className="events h-screen w-full relative">
      <div className="bg-[#001C3FB2] absolute w-full h-full ">
        <div className="   m-auto text-center gap-4 h-full flex items-center justify-center flex-col">
          <h1 className="text-[#FFFFFF] font-semibold text-4xl mb-3">
            Events & Media
          </h1>
          <p className="max-w-[800px] leading-relaxed text-xl ">
            Stay up to date with our latest company news, press coverage, and
            event highlights. From conferences to media appearances — this is
            where we share our story.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
