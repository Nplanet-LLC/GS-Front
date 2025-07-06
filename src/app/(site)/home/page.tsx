"use client";

import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import About from "./_components/about";
import WhyChoose from "./_components/WhyChoose";
import OurServices from "./_components/OurServices";
import SuccessStories from "./_components/SuccessStories";
import Companies from "./_components/Companies";
import OurClients from "./_components/OurClients";
import GetTouch from "./_components/GetTouch";
import JoinOur from "./_components/JoinOur";
import axios from "axios";

export default function Home() {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const [headerData, setHeaderData] = useState(null);

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await axios.get(`${url}Header/get-all`, {
          headers: {
            Accept: "application/json",
          },
        });
        setHeaderData(response.data[0]);
        // console.log("data :", response.data);
        // console.log("Fetched Header Data:", response.data);
      } catch (error) {
        console.error("Error fetching header data:", error);
      }
    };

    fetchHeaderData();
  }, []);

  useEffect(() => {
    // التعامل مع hash عند تحميل الصفحة
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      }
    };

    handleHash();
  }, []);

  // console.log("headerData :", headerData);
  return (
    <div className="">
      <Hero data={headerData} />
      <About />
      <WhyChoose />
      {/* <OurServices />
      <SuccessStories /> */}
      <Companies />
      <OurClients />
      <GetTouch />
      <JoinOur />
    </div>
  );
}
