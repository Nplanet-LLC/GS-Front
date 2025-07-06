import Image from "next/image";
import React from "react";
import { CalendarDays, Mail } from "lucide-react";
import Link from "next/link";

function page() {
  return (
    <div className="w-full bg-white p-14 overflow-hidden relative">
      <div className="absolute top-[-60px] right-[-90px] w-60 h-60 bg-gradient-to-br from-[#FF2A60] to-transparent opacity-40 rounded-full pointer-events-none z-0 filter blur-2xl"></div>

      {/* ✅ خلفية جرادينت شفافة في الزاوية السفلية اليسرى */}
      <div className="absolute bottom-[-65px] left-[-50px] w-60 h-60 bg-gradient-to-br from-[#FF2A60] to-transparent opacity-40 rounded-full pointer-events-none z-0 filter blur-2xl "></div>
      <div data-aos="fade-right">
        <div>
          <div>
            <h1 className="text-[#092C57] font-bold text-3xl md:text-4xl text-center mb-2">
              Payment Failed
            </h1>
            <span className="bg-[#B31942] w-[80px] h-1 block m-auto"></span>
            <p className="text-[#575757] text-sm md:text-xl text-center leading-5 md:leading-8 mt-3 max-w-[650px] mx-auto">
              Something went wrong with your transaction. Unfortunately, your
              payment was not successful.
            </p>
          </div>
          <div className="relative h-[300px] w-[300px] md:w-[400px] rounded-full mx-auto my-8">
            <Image
              src="/assets/Emoji Message-Failed.png"
              alt="logo"
              loading="lazy"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <p className="flex items-center gap-2 my-5 justify-center text-xl font-normal">
              <span className="text-[#0A3161] text-center font-normal md:font-semibold">
                Please try again or use a different payment method.
              </span>
            </p>
          </div>
        </div>
        <Link href="/home">
          <button
            className={`w-[300px] md:w-[400px]  h-[50px] text-[#0A3161] font-bold rounded-md flex justify-center items-center cursor-pointer mx-auto transition-all duration-300 transform hover:scale-105 bg-transparent border border-[#0A3161]  `}
          >
            Try Again
          </button>
        </Link>
      </div>
    </div>
  );
}

export default page;
