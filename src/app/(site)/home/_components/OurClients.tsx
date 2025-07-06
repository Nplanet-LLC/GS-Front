"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Slider from "@/src/components/SliderClient";

function OurClients() {
  useEffect(() => {
    AOS.init({
      duration: 1500, // تحديد مدة الأنميشن
      once: false, // تفعيل الأنميشن عند التمرير في كل مرة
      offset: 100, // الإزاحة قبل بدء الأنميشن (بحيث يبدأ قبل قليل من ظهور العنصر)
      startEvent: "scroll", // تأكد أن الأنميشن يحدث أثناء التمرير
    });

    const timeout = setTimeout(() => {
      // تأكد من تحديث الأنميشن بعد تحميل المحتوى
      AOS.refresh();
    }, 1000); // زيادة التأخير إلى 1000ms

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className="w-full  pb-14  overflow-hidden relative px-5 md:px-12  "
      id="What_Our_Clients_Say"
    >
      <div className="absolute top-[-60px] right-[-90px] w-60 h-60 bg-gradient-to-br from-[#B31942] to-transparent opacity-40 rounded-full pointer-events-none z-0 filter blur-2xl"></div>

      {/* ✅ خلفية جرادينت شفافة في الزاوية السفلية اليسرى */}
      <div className="absolute bottom-[-65px] left-[-50px] w-60 h-60 bg-gradient-to-br from-[#B31942] to-transparent opacity-40 rounded-full pointer-events-none z-0 filter blur-2xl "></div>
      {/* الجزء الأول */}
      <span id="about_as" className="block h-[80px]"></span>
      <div data-aos="fade-right">
        <div>
          <h1 className="text-[#092C57] font-semibold text-2xl text-center mb-2">
            What Our Clients Say
          </h1>
          <span className="bg-[#B31942] w-[80px] h-1 block m-auto"></span>
        </div>
        <p className="text-[#575757] md:text-xl text-sm text-center leading-relaxed mt-3">
          We’re proud to be the trusted partner for companies breaking into USA
          government markets. Here’s what they had to say about working with us.
        </p>
      </div>
      {/* slider*/}
      <div className=" w-full  mx-auto mt-10 ">
        <Slider />
      </div>
    </div>
  );
}

export default OurClients;
