"use client";
import React, { useState } from "react";

function Hero() {
  const [activeButton, setActiveButton] = useState(1);

  const handleClick = (index: number) => {
    setActiveButton(index);
  };

  const handleScrollToServices = () => {
    const element = document.getElementById("services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="services h-screen w-full relative">
      <div className="bg-[#001C3FB2] absolute w-full h-full ">
        <div className="m-auto text-center gap-4 h-full flex items-center justify-center flex-col">
          <h1 className="text-[#FFFFFF] font-semibold text-2xl md:text-4xl mb-3">
            Your Gateway to USA Government Projects
          </h1>
          <p className="max-w-[800px] leading-relaxed text-sm md:text-xl ">
            At Glocal Solutions, we help businesses register, bid, and win USA
            government contracts — with expert consulting, legal guidance, and
            execution support in both the USA and MENA.
          </p>
          <div className="flex gap-4 mt-5">
            <button
              onClick={handleScrollToServices}
              className={`w-[200px] h-[50px] rounded-md flex justify-center items-center cursor-pointer text-white transition-all duration-300 transform hover:scale-105 bg-[#B31942] border border-transparent`}
            >
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
