"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

function OurServices() {
  useEffect(() => {
    AOS.init({
      duration: 1500, // تحديد مدة الأنميشن
      once: false, // تفعيل الأنميشن عند التمرير في كل مرة
      offset: 100, // الإزاحة قبل بدء الأنميشن (بحيث يبدأ قبل قليل من ظهور العنصر)
      startEvent: "scroll", // تأكد أن الأنميشن يحدث أثناء التمرير
      easing: "ease-in-out",
    });

    const timeout = setTimeout(() => {
      // تأكد من تحديث الأنميشن بعد تحميل المحتوى
      AOS.refresh();
    }, 1000); // زيادة التأخير إلى 1000ms

    return () => clearTimeout(timeout);
  }, []);

  const data1 = [
    {
      icon: "/assets/Services-1.png",
      title: "Executive Management Advisory",
      des: "We offer high-level strategic advice to guide executive decisions across construction, property management, and international business. Our experience empowers leaders to confidently manage projects, assets, and business growth.",
    },
    {
      icon: "/assets/Services-2.png",
      title: "Construction Management Consulting",
      des: "With data-driven insight and industry standard practices, we support organizations through the entire construction process from planning and bidding to project execution ensuring quality, compliance, and success.",
    },
  ];

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
    <div className="w-full bg-[#0A3161] pb-14 px-12 overflow-hidden">
      <span id="services" className="block h-[80px]"></span>
      {/* title*/}
      <div data-aos="fade-right">
        <div>
          <h1 className="text-white font-semibold text-2xl text-center mb-2">
            Our Services
          </h1>
          <span className="bg-[#B31942] w-[80px] h-1 block m-auto"></span>
        </div>
        <p className="text-[#FFFFFF] text-center leading-relaxed mt-3">
          Glocal Solution provides comprehensive consulting and construction
          services
        </p>
      </div>
      {/* Categorie */}
      <div className="flex  w-full mt-10" data-aos="fade-left">
        <div className="bg-white w-full  rounded-md ">
          <div className="relative h-[400px] w-full ">
            <Image
              src="/assets/Our Services.png"
              alt="logo"
              loading="lazy"
              fill
              className="rounded-t-md"
            />
          </div>
          <div className="px-5 py-6 w-full ">
            <h2 className="text-[#092C57] mb-1 text-xl font-semibold">
              Doing Business with the U.S. Government, Public & Private Sector
            </h2>
            <p className="text-[#575757] leading-relaxed">
              {" "}
              We simplify the complex world of U.S. government contracts and
              private sector bids
            </p>
            <div className="my-4">
              <div className="h-full ">
                <div className="mb-5 ">
                  <h2 className="text-[#092C57] mb-1 text-2xl font-semibold">
                    Our Proven Approach
                  </h2>
                  <p className="text-[#575757] leading-relaxed mt-3">
                    We've developed a systematic methodology that ensures
                    successful project outcomes while minimizing risks and
                    maximizing efficiency.
                  </p>
                </div>
                <div className="my-8 w-full">
                  {dataProven.map((itme, index) => (
                    <div className="flex gap-4  mb-6">
                      <span className="w-[20px] h-[20px] flex-wrapr relative rounded-full flex justify-center items-center font-bold text-xl">
                        <Image
                          src="/assets/true.svg"
                          alt="true"
                          loading="lazy"
                          fill
                          className="object-contain"
                        />
                      </span>
                      <div>
                        <h3 className="text-[#092C57] mb-1 text-xl font-semibold">
                          {itme.title}
                        </h3>
                        <p className="text-[#575757] leading-relaxed">
                          {itme.des}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Link href="/services">
                <button
                  className="bg-[#0A3161] group flex items-center gap-1 m-auto cursor-pointer text-white px-6 py-2 font-medium shadow-md transition-transform duration-700 ease-in-out transform"
                  data-aos="zoom-in"
                >
                  Learn More
                  <span className="transition-transform duration-300 ease-in-out group-hover:translate-x-2">
                    <ChevronRight />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Categorie */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8 my-10"
        data-aos="fade-left"
      >
        {data1.map((item, index) => (
          <div
            key={index}
            className="bg-white w-full rounded-md  shadow-2xl"
            data-aos="zoom-in"
          >
            <div className="relative h-[200px] w-full  mx-auto">
              <Image
                src={item.icon}
                alt="logo"
                loading="lazy"
                fill
                className="rounded-t-md"
              />
            </div>
            <div className="px-4 py-3 space-y-3 ">
              <h3 className="text-[#0A3161] font-semibold  ">{item.title}</h3>
              <p className="text-[#575757]  text-[13px] leading-relaxed">
                {item.des}
              </p>
              <button className="bg-[#0A3161] text-sm group flex items-center g m-auto cursor-pointer text-white px-6 py-2  shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105">
                Book Consultation
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurServices;
