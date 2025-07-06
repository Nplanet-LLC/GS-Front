"use client";
import React, { useState } from "react";

function Hero() {
  const [activeButton, setActiveButton] = useState(1);

  const handleScrollToStories = () => {
    const element = document.getElementById("success-stories");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="success h-screen w-full relative">
      <div className="bg-[#001C3FB2] absolute w-full h-full ">
        <div className="m-auto text-center gap-4 h-full flex items-center justify-center flex-col">
          <h1 className="text-[#FFFFFF] font-semibold text-2xl md:text-4xl mb-3">
            Real Results. Real Clients. Real Impact
          </h1>
          <p className="max-w-[800px] leading-relaxed text-sm md:text-xl ">
            Discover how we've helped businesses across countries achieve
            measurable success.
          </p>
          <div className="flex gap-4 mt-5">
            <button
              onClick={handleScrollToStories}
              className={`w-[200px] h-[50px] rounded-md flex justify-center items-center cursor-pointer text-white transition-all duration-300 transform hover:scale-105 bg-[#B31942] border border-transparent`}
            >
              Read Their Stories
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
