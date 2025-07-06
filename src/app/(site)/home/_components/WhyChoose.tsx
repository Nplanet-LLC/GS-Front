"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

function WhyChoose() {
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
      icon: "/assets/Frame 201.svg",
      title: "Years of Experience",
      des: "Decades of specialized experience in government contracting and construction management.",
      number: "30+",
    },
    {
      icon: "/assets/Frame 201 (1).svg",
      title: "Industry Experts",
      des: "Access to a vast network of specialists, consultants, and industry professionals.",
      number: "150+",
    },
    {
      icon: "/assets/Frame 201(2).svg",
      title: "Regional Hubs",
      des: "Strategic presence in both the USA and MENA regions for seamless operations.",
      number: "2",
    },
    {
      icon: "/assets/Frame 201 (3).svg",
      title: " Comprehensive Support",
      des: "Complete project lifecycle management from initial planning to final delivery.",
      number: "100%",
    },
  ];

  const dataProven = [
    {
      title: "Strategic Assessment",
      des: "Comprehensive analysis of your capabilities, goals, and optimal market positioning.",
    },
    {
      title: "Tailored Planning",
      des: "Custom roadmap development with clear milestones and resource allocation.",
    },
    {
      title: "Integrated Execution",
      des: "Coordinated implementation with ongoing optimization and adaptation.",
    },
    {
      title: "Continuous Improvement",
      des: "Regular performance reviews and proactive enhancement of processes.",
    },
  ];

  return (
    <div className="w-full px-5 md:px-12  md:bg-white  pb-14  overflow-hidden ">
      <span id="why_us" className="block h-[80px]"></span>
      {/* الجزء الأول */}
      <div data-aos="fade-right " className="">
        {/* bg-red-500 max-w-[800px] m-auto */}
        <div>
          <h1 className="text-[#092C57] font-semibold text-2xl text-center mb-2">
            Why Choose Glocal Solutions
          </h1>
          <span className="bg-[#B31942] w-[80px] h-1 block m-auto"></span>
        </div>
        <p className="text-[#575757] text-center leading-relaxed mt-3">
          With a strong record in delivering strategic, high impact projects,
          Glocal Solutions empowers executive teams through expert consultancy
          in construction management, asset oversight, and USA government
          contracting serving both public and private sectors.
        </p>
      </div>
      {/* الجزء الثاني */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 my-20"
        data-aos="fade-left"
      >
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white w-full rounded-md space-y-4 p-4 shadow-2xl  "
            data-aos="zoom-in"
          >
            <div className="relative h-[40px] w-[40px] rounded-full mx-auto">
              <Image
                src={item.icon}
                alt="logo"
                loading="lazy"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-[#B31942]  font-bold text-xl text-center">
              {item.number}
            </h3>
            <h3 className="text-[#0A3161] text-center">{item.title}</h3>
            <p className="text-[#575757] text-center text-[13px] leading-relaxed">
              {item.des}
            </p>
          </div>
        ))}
      </div>
      {/* الجزء الثالث */}
      <div
        className="flex flex-wrap justify-between w-full my-14"
        data-aos="fade-left"
      >
        <div className="h-full w-full md:w-1/2 min-w-[400px]">
          <div className="mb-5 ">
            <h2 className="text-[#092C57] mb-1 text-2xl font-semibold">
              Our Proven Approach
            </h2>
            <p className="text-[#575757] leading-relaxed mt-3">
              We've developed a systematic methodology that ensures successful
              project outcomes while minimizing risks and maximizing efficiency.
            </p>
          </div>
          <div className="my-8">
            {dataProven.map((itme, index) => (
              <div className="flex gap-4  mb-6" key={index}>
                <span className="w-[45px] h-[45px] bg-[#B31942] rounded-full flex justify-center items-center font-bold text-xl">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-[#092C57] mb-1 text-xl font-semibold">
                    {itme.title}
                  </h3>
                  <p className="text-[#575757] leading-relaxed">{itme.des}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2 min-w-[400px] min-h-[400px] p-8">
          <div className="w-full h-full  rounded-xl relative">
            <Image src="/assets/Proven.png" alt="Proven" loading="lazy" fill />
          </div>
        </div>
      </div>
      <Link href="/success_stories">
        <button
          className="bg-[#B31942] m-auto block cursor-pointer text-white px-8 py-4 rounded-md font-medium shadow-md transition-all duration-300 hover:bg-[#921632]  transform animate-fade-in hover:scale-105"
          data-aos="zoom-in"
        >
          Success Stories
        </button>
      </Link>
    </div>
  );
}

export default WhyChoose;
