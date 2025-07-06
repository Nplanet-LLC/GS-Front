import Image from "next/image";
import React from "react";
import { CalendarDays, Mail } from "lucide-react";
import Link from "next/link";

function page() {
  return (
    <div className="w-full bg-white py-8 px-5 md:p-14 overflow-hidden relative">
      <div className="absolute top-[-60px] right-[-90px] w-60 h-60 bg-gradient-to-br from-[#04BD8D] to-transparent opacity-40 rounded-full pointer-events-none z-0 filter blur-2xl"></div>

      {/* ✅ خلفية جرادينت شفافة في الزاوية السفلية اليسرى */}
      <div className="absolute bottom-[-65px] left-[-50px] w-60 h-60 bg-gradient-to-br from-[#04BD8D] to-transparent opacity-40 rounded-full pointer-events-none z-0 filter blur-2xl "></div>
      <div data-aos="fade-right">
        <div>
          <div>
            <h1 className="text-[#092C57] font-bold text-3xl md:text-4xl text-center mb-2">
              Payment Successful! 🎉
            </h1>
            <span className="bg-[#B31942] w-[80px] h-1 block m-auto"></span>
            <p className="text-[#575757] text-sm md:text-xl text-center leading-5 md:leading-8 mt-3 max-w-[650px] mx-auto">
              Thank you for booking your consultation with Glocal Solutions.
              Your payment has been received, and your session is now confirmed.
            </p>
          </div>
          <div className="relative h-[300px] w-[300px] md:w-[400px] rounded-full mx-auto my-8">
            <Image
              src="/assets/Emoji Message-Sucess.png"
              alt="logo"
              loading="lazy"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <p className="flex items-center gap-2 my-5 justify-center text-xl font-normal">
              <span>
                <CalendarDays className="text-[#B31942]" />
              </span>
              <span className="text-[#0A3161] font-normal md:font-semibold">
                We’ll be in touch shortly to schedule your meeting
              </span>
            </p>
            <p className="flex items-center gap-2 my-5 justify-center text-xl font-normal">
              <span>
                <Mail className="text-[#B31942]" />
              </span>
              <span className="text-[#0A3161] font-normal md:font-semibold">
                A confirmation email has been sent to your inbox with all the
                details.
              </span>
            </p>
          </div>
        </div>
        <Link href="/home">
          <button
            className={`w-[300px] md:w-[400px]  h-[50px] text-[#0A3161] font-bold rounded-md flex justify-center items-center cursor-pointer mx-auto transition-all duration-300 transform hover:scale-105 bg-transparent border border-[#0A3161] `}
          >
            Back To Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default page;
