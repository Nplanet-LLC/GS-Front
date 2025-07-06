"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ChevronRight, CalendarDays, Funnel } from "lucide-react";
import axios from "axios";

function LatestNews() {
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
      icon: "/assets/events-1.png",
      title: "Partnership with Gulf Infrastructure Group",
      des: "We are proud to announce a new strategic partnership with Gulf Infrastructure Group to support large-scale construction projects across the MENA region. This collaboration will enable advanced project delivery and unlock new opportunities for both companies.",
      date: "April 22, 2025",
    },
    {
      icon: "/assets/events-2.png",
      title: "Successful Participation in U.S.-GCC ",
      des: "Our executive team participated in the U.S.-GCC Business Forum in Riyadh, discussing emerging opportunities in federal contracts and smart city developments. The event brought together key stakeholders from government and industry.",
      date: "March 15, 2025",
    },
    {
      icon: "/assets/events-3.png",
      title: "Launch of Government Bidding Support Program",
      des: "We've launched a new support program to help businesses in the Gulf and MENA regions navigate U.S. government bidding processes. The service includes registration, proposal guidance, and technical compliance reviews.",
      date: "April 22, 2025",
    },
  ];

  const data = [
    {
      icon: "/assets/Frame 20.svg",
      title: "Integrity",
      des: "Commitment to ethical business practices and transparent operations.",
      date: "April 22, 2025",
    },
    {
      icon: "/assets/Frame 20 (1).svg",
      title: "Expertise",
      des: "Decades of experience in U.S. government contracting and construction.",
      date: "April 22, 2025",
    },
    {
      icon: "/assets/Frame 23.svg",
      title: "Efficiency",
      des: "Streamlined processes for fast and effective project execution.",
      date: "April 22, 2025",
    },
    {
      icon: "/assets/Frame 24.svg",
      title: "Collaboration",
      des: "Partnering with industry experts to deliver optimal solutions.",
      date: "April 22, 2025",
    },
  ];

  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const [dataLatestNews, setDataLatestNews] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${url}LatestNews/get-all`);
      setDataLatestNews(response.data);
      console.log("dataLatestNews :", response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="w-full bg-white p-14 px-5 md:px-12 overflow-hidden">
      <h2 className="text-[#0A3161] text-3xl font-bold mb-3 text-center">
        {" "}
        Latest News
      </h2>
      {/* Categorie row 1 */}
      <div
        className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8 my-10"
        data-aos="fade-left"
      >
        {dataLatestNews.map((item: any, index: number) => (
          <div
            key={index}
            className="bg-white w-full rounded-md  shadow-2xl"
            data-aos="zoom-in"
          >
            <div className="relative h-[200px] w-full  mx-auto">
              <Image
                src={item.image}
                alt="logo"
                loading="lazy"
                fill
                className="rounded-t-md"
              />
            </div>
            <div className="px-4 py-5 space-y-3 ">
              <p className="text-[#2563EB] font-light">
                {/* {new Date(item.dateTime).toLocaleDateString("en-GB")} */}
                {new Date(item.dateTime).toLocaleDateString("en-US", {
                  month: "long",
                  day: "2-digit",
                  year: "numeric",
                })}
              </p>
              <h3 className="text-[#0A3161] font-bold  ">{item.name}</h3>
              <p
                className="text-[#575757]   leading-relaxed"
                title={item.description}
              >
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LatestNews;
