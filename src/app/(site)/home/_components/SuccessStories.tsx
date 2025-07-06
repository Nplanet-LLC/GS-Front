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
import Slider from "@/src/components/Slider";

function SuccessStories() {
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

  const data = [
    {
      icon: "/assets/Frame 20.svg",
      title: "Integrity",
      des: "Commitment to ethical business practices and transparent operations.",
    },
    {
      icon: "/assets/Frame 20 (1).svg",
      title: "Expertise",
      des: "Decades of experience in U.S. government contracting and construction.",
    },
    {
      icon: "/assets/Frame 23.svg",
      title: "Efficiency",
      des: "Streamlined processes for fast and effective project execution.",
    },
    {
      icon: "/assets/Frame 24.svg",
      title: "Collaboration",
      des: "Partnering with industry experts to deliver optimal solutions.",
    },
  ];

  return (
    <div className="w-full  md:bg-white pb-14 px-5 md:px-12 overflow-hidden relative">
      <div className="absolute top-[-60px] right-[-90px] w-60 h-60 bg-gradient-to-br from-[#355d8f] to-transparent opacity-40 rounded-full pointer-events-none z-0 filter blur-2xl"></div>

      {/* ✅ خلفية جرادينت شفافة في الزاوية السفلية اليسرى */}
      <div className="absolute bottom-[-65px] left-[-50px] w-60 h-60 bg-gradient-to-br from-[#355d8f] to-transparent opacity-40 rounded-full pointer-events-none z-0 filter blur-2xl "></div>
      {/* الجزء الأول */}
      <span id="about_as" className="block h-[80px]"></span>
      <div data-aos="fade-right">
        <div>
          <h1 className="text-[#092C57] font-semibold text-2xl text-center mb-2">
            Success Stories
          </h1>
          <span className="bg-[#B31942] w-[80px] h-1 block m-auto"></span>
        </div>
        <p className="text-[#575757] text-center leading-relaxed mt-3">
          Discover how Glocal Solutions has helped clients achieve success
          across major projects and regions through expert consulting and
          construction management.
        </p>
      </div>
      {/* slider*/}
      <div className=" w-full max-w-[700px] mx-auto mt-10 ">
        <Slider />
      </div>
    </div>
  );
}

export default SuccessStories;
