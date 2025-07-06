"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ChevronRight, X } from "lucide-react";
import Link from "next/link";
import axios from "axios";

function OurServices() {
  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: false,
      offset: 100,
      startEvent: "scroll",
      easing: "ease-in-out",
    });

    const timeout = setTimeout(() => {
      AOS.refresh();
    }, 1000);

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
      title: "Government Contracts",
      des: "From registration to proposal submission, we help you meet federal acquisition standards and navigate procurement systems like SAM.gov.",
    },
    {
      title: "Private Sector Bids",
      des: "We assist in finding opportunities, connecting with stakeholders, and customizing proposals that meet industry expectations.",
    },
    {
      title: "Full Support",
      des: "Whether you need consultation or end-to-end management, we ensure you're compliant, competitive, and ready to win.",
    },
  ];

  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const [consultation, setConsultation] = useState<string | null>(null);
  useEffect(() => {
    const fetchConsultation = async () => {
      const response = await axios.get(`${url}Consultation/get-all`);
      setConsultation(response.data[0].link);
    };
    fetchConsultation();
  }, []);

 

  // https://outlook.office.com/bookwithme/user/a268e5a7348243d88e329582c49d1121@glocalsolutions.us/meetingtype/M7GjmpeC5UeB6h3Mh66WBw2?anonymous&ep=mlink
  return (
    <div className="w-full bg-white pb-14 px-5 md:px-12 overflow-hidden">
      <span id="services" className="block h-[80px]"></span>

      <div>
        <div>
          <h1 className="text-[#0A3161] font-semibold text-2xl text-center mb-2">
            Our Services
          </h1>
          <span className="bg-[#B31942] w-[80px] h-1 block m-auto"></span>
        </div>
        <p className="text-[#0A3161] text-center leading-relaxed mt-3">
          Glocal Solution provides comprehensive consulting and construction
          services
        </p>
      </div>

      <div className="flex rounded-t-md w-full mt-10 border border-[#2f77eb77]">
        <div className="bg-white w-full rounded-md ">
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
              We simplify the complex world of U.S. government contracts and
              private sector bids
            </p>
            <div className="my-4">
              <div className="h-full ">
                <div className="my-8 w-full">
                  {dataProven.map((itme, index) => (
                    <div key={index} className="flex gap-4 mb-6">
                      <span className="w-[20px] h-[20px] relative rounded-full flex justify-center items-center font-bold text-xl">
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
                <button className="bg-[#0A3161] group flex items-center gap-1 m-auto cursor-pointer text-white px-6 py-2 font-medium shadow-md transition-transform duration-700 ease-in-out transform">
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

      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8 my-10"
        data-aos="fade-left"
      >
        {data1.map((item, index) => (
          <div
            key={index}
            className="bg-white w-full rounded-md shadow-2xl border border-[#2f77eb77]"
            data-aos="zoom-in"
          >
            <div className="relative h-[200px] w-full mx-auto">
              <Image
                src={item.icon}
                alt="logo"
                loading="lazy"
                fill
                className="rounded-t-md"
              />
            </div>
            <div className="px-4 py-3 space-y-3">
              <h3 className="text-[#0A3161] font-semibold">{item.title}</h3>
              <p className="text-[#575757] text-[13px] leading-relaxed">
                {item.des}
              </p>
              <button
                onClick={() => setShowIframe(true)}
                className="bg-[#0A3161] text-sm group flex items-center m-auto cursor-pointer text-white px-6 py-2 shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105"
              >
                Book Consultation
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* الـ iframe Popup */}
      {showIframe && (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-70 flex justify-center items-center">
          <div className="relative bg-white w-[90%] md:w-[80%] h-[90%] rounded-lg shadow-lg overflow-hidden">
            <button
              onClick={() => setShowIframe(false)}
              className="absolute top-2 right-2 z-50 bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition"
            >
              <X />
            </button>
            <iframe
              src={consultation || ""}
              title="Book Consultation"
              className="w-full h-full"
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default OurServices;
