"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

function About() {
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  const [aboutDataSection, setAboutDataSection] = useState<any>(null);
  const [aboutDataMission, setAboutDataMission] = useState<any>(null);
  const [testCardsData, setTestCardsData] = useState<any[]>([]);
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

  useEffect(() => {
    const fetchAboutDataSection = async () => {
      try {
        const response = await axios.get(`${url}AboutUsSection/get-all`, {
          headers: {
            Accept: "application/json",
          },
        });
        setAboutDataSection(response.data[1]);
        // console.log("data :", response.data);
        // console.log("Fetched About Data:", response.data[1]);
        // console.log("Fetched About Data:", response.data[1].name);
      } catch (error) {
        console.error("Error fetching About data:", error);
      }
    };

    const fetchAboutDataMission = async () => {
      try {
        const response = await axios.get(`${url}AboutUsMission/get-all`, {
          headers: {
            Accept: "application/json",
          },
        });
        setAboutDataMission(response.data[0]);
        // console.log("data :", response.data);
        console.log("Fetched About Data:", response.data[0]);
      } catch (error) {
        console.error("Error fetching About data:", error);
      }
    };

    fetchAboutDataSection();
    fetchAboutDataMission();
  }, []);

  const aboutName = useMemo(() => {
    return aboutDataSection?.name_ ?? "About Glocal Solutions";
  }, [aboutDataSection]);

  const aboutDes = useMemo(() => {
    return (
      aboutDataSection?.description_ ??
      "Glocal Solutions is an American consulting and construction management firm, dedicated to supporting businesses in securing and managing US government-funded projects across the U.S. With extensive expertise in regulatory compliance, bidding processes, and project execution, Glocal Solutions enables companies to establish, operate, and thrive in the U.S. market as well as in the Middle East and North Africa regions"
    );
  }, [aboutDataSection]);

  // data mission
  const missionName = useMemo(() => {
    return aboutDataMission?.nameMission_ ?? "Our Mission";
  }, [aboutDataMission]);

  const missionDes = useMemo(() => {
    return (
      aboutDataMission?.descriptionMission_ ??
      "To provide expert consulting and construction services that enable businesses to successfully navigate USA government projects while delivering excellence in construction and supply chain management."
    );
  }, [aboutDataMission]);

  const visionName = useMemo(() => {
    return aboutDataMission?.nameVision_ ?? "Our Vision";
  }, [aboutDataMission]);

  const visionDes = useMemo(() => {
    return (
      aboutDataMission?.descriptionVision_ ??
      "To be the leading partner for businesses seeking to expand into government projects, ensuring seamless operations, compliance, and execution through our expertise and network."
    );
  }, [aboutDataMission]);

  return (
    <div className="w-full bg-[#ECF3FC] pb-14 px-5 md:px-12  overflow-hidden">
      <span id="about_as" className="block h-[80px]"></span>
      {/* الجزء الأول */}
      <div data-aos="fade-right">
        <div>
          <h1 className="text-[#092C57] font-semibold text-2xl text-center mb-2">
            {aboutName}
          </h1>
          <span className="bg-[#B31942] w-[80px] h-1 block m-auto"></span>
        </div>
        <p className="text-[#575757] text-center leading-relaxed mt-3">
          {aboutDes}
        </p>
      </div>
      {/* الجزء الثاني */}
      <div
        className="flex flex-col md:flex-row gap-6 md:gap-0 justify-between w-full mt-10 "
        data-aos="fade-left"
      >
        <div className="h-full w-full md:w-1/2 min-w-[300px] md:min-w-[400px] ">
          <div className="mb-5 max-w-[450px]">
            <h3 className="text-[#092C57] mb-1 text-2xl font-semibold">
              {missionName}
            </h3>
            <p className="text-[#575757] leading-relaxed">{missionDes}</p>
          </div>
          <div className="max-w-[450px]">
            <h3 className="text-[#092C57] mb-1 text-2xl font-semibold">
              {visionName}
            </h3>
            <p className="text-[#575757] leading-relaxed">{visionDes}</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 min-w-[400px] grid grid-cols-1 md:grid-cols-2 gap-4 ">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-white w-full rounded-md space-y-2 p-4"
              data-aos="zoom-in"
            >
              <div className="relative h-[30px] w-[30px] rounded-full">
                <Image
                  src={item.icon}
                  alt="logo"
                  loading="lazy"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-[#0A3161]">{item.title}</h3>
              <p className="text-[#575757] text-[13px] leading-relaxed">
                {item.des}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
