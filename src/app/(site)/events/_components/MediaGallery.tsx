"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import axios from "axios";

function MediaGallery() {
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

  const photos = [
    {
      icon: "/assets/photo_Media_1.png",
      title: "Executive Management Advisory",
      des: "We offer high-level strategic advice to guide executive decisions across construction, property management, and international business. Our experience empowers leaders to confidently manage projects, assets, and business growth.",
      date: "April 22, 2025",
    },
    {
      icon: "/assets/photo_Media_2.png",
      title: "Construction Management Consulting",
      des: "With data-driven insight and industry standard practices, we support organizations through the entire construction process from planning and bidding to project execution ensuring quality, compliance, and success.",
      date: "March 15, 2025",
    },
    {
      icon: "/assets/photo_Media_3.png",
      title: "Construction Management Consulting",
      des: "With data-driven insight and industry standard practices, we support organizations through the entire construction process from planning and bidding to project execution ensuring quality, compliance, and success.",
      date: "April 22, 2025",
    },
  ];

  const videos = [
    {
      icon: "/assets/events-1.png",
      title: "Executive Management Advisory video",
      des: "We offer high-level strategic advice to guide executive decisions across construction, property management, and international business. Our experience empowers leaders to confidently manage projects, assets, and business growth.",
      date: "April 22, 2025",
    },
    {
      icon: "/assets/events-2.png",
      title: "Construction Management Consulting video",
      des: "With data-driven insight and industry standard practices, we support organizations through the entire construction process from planning and bidding to project execution ensuring quality, compliance, and success.",
      date: "March 15, 2025",
    },
    {
      icon: "/assets/events-3.png",
      title: "Construction Management Consulting video",
      des: "With data-driven insight and industry standard practices, we support organizations through the entire construction process from planning and bidding to project execution ensuring quality, compliance, and success.",
      date: "April 22, 2025",
    },
  ];

  const press = [
    {
      icon: "/assets/events-1.png",
      title: "Executive Management Advisory press",
      des: "We offer high-level strategic advice to guide executive decisions across construction, property management, and international business. Our experience empowers leaders to confidently manage projects, assets, and business growth.",
      date: "April 22, 2025",
    },
    {
      icon: "/assets/events-2.png",
      title: "Construction Management Consulting press",
      des: "With data-driven insight and industry standard practices, we support organizations through the entire construction process from planning and bidding to project execution ensuring quality, compliance, and success.",
      date: "March 15, 2025",
    },
    {
      icon: "/assets/events-3.png",
      title: "Construction Management Consulting press",
      des: "With data-driven insight and industry standard practices, we support organizations through the entire construction process from planning and bidding to project execution ensuring quality, compliance, and success.",
      date: "April 22, 2025",
    },
  ];

  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const [dataEventsPhoto, setDataEventsPhoto] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${url}MediaGallery/get-all`);
      setDataEventsPhoto(response.data);
      console.log("dataEventsPhoto :", response.data);
    };
    fetchData();
  }, []);

  const renderGrid = (data: typeof photos) => (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10"
      data-aos="fade-left"
    >
      {dataEventsPhoto.map((item: any, index: number) => (
        <div
          key={index}
          className="bg-white w-full  shadow-2xl"
          data-aos="zoom-in"
        >
          <div className="relative h-[300px] w-full mx-auto">
            <Image
              src={`${item.pathMedia}`}
              alt="media"
              loading="lazy"
              fill
              className="rounded-md object-cover"
            />
          </div>
          {/* <div className="px-4 py-5 space-y-3">
            <p className="text-[#2563EB] font-light">{item.date}</p>
            <h3 className="text-[#0A3161] font-bold">{item.title}</h3>
            <p className="text-[#575757] leading-relaxed">{item.des}</p>
          </div> */}
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full bg-white pb-14 px-5 md:px-12 overflow-hidden">
      <h2 className="text-[#0A3161] text-3xl font-bold mb-6 text-center">
        Media Gallery
      </h2>

      <Tabs>
        <TabList className="flex justify-center gap-6 mb-6 text-[#0A3161] font-semibold border-b border-gray-200">
          <Tab className="px-4 py-2 cursor-pointer hover:text-[#1565C7] focus:outline-none">
            Photos
          </Tab>
          {/* <Tab className="px-4 py-2 cursor-pointer hover:text-[#1565C7] focus:outline-none">
            Videos
          </Tab>
          <Tab className="px-4 py-2 cursor-pointer hover:text-[#1565C7] focus:outline-none">
            Press Releases
          </Tab> */}
        </TabList>

        <TabPanel>{renderGrid(dataEventsPhoto)}</TabPanel>
        {/* <TabPanel>{renderGrid(videos)}</TabPanel>
        <TabPanel>{renderGrid(press)}</TabPanel> */}
      </Tabs>
    </div>
  );
}

export default MediaGallery;
