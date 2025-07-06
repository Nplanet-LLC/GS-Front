"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Companies() {
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

  const dataImg = [
    "/assets/Companies-1.png",
    "/assets/Companies-2.png",
    "/assets/Companies-3.png",
    "/assets/Companies-4.png",
    "/assets/Companies-5.png",
  ];

  return (
    <div className="w-full bg-[#ECF3FC] pb-14 px-5 md:px-12  overflow-hidden">
      <span id="companies" className="block h-[80px]"></span>
      {/* الجزء الأول */}
      <div data-aos="fade-right">
        <div>
          <h1 className="text-[#092C57] font-semibold text-2xl text-center mb-2">
            Companies We've Worked With
          </h1>
          <span className="bg-[#B31942] w-[80px] h-1 block m-auto"></span>
        </div>
        <p className="text-[#575757] text-center leading-relaxed mt-3">
          Over the years, we've had the privilege of collaborating with top-tier
          companies across various industries. Our proven expertise and tailored
          services have earned the trust of respected partners in both the
          public and private sectors.
        </p>
      </div>
      <div className="flex justify-between w-full mt-10" data-aos="fade-left">
        <div className="relative h-[100px] w-[80px] rounded-full my-7">
          <Image src="/assets/Companies-6.png" alt="logo" loading="lazy" fill />
        </div>
      </div>
      {/* الجزء الثاني */}
      <div
        className="md:flex gap-4 grid grid-cols-2  md:gap-2 justify-center md:justify-between w-full mt-10"
        data-aos="fade-left"
      >
        {dataImg.map((itme, index) => (
          <div
            className="relative h-[120px] w-full md:w-[200px] rounded-full"
            key={index}
          >
            <Image src={itme} alt="logo" loading="lazy" fill />
          </div>
        ))}
      </div>
      <div className="flex  justify-end ">
        <div className="relative h-[100px] w-[80px] rounded-full mt-20 ">
          <Image src="/assets/Companies-6.png" alt="logo" loading="lazy" fill />
        </div>
      </div>
    </div>
  );
}

export default Companies;
