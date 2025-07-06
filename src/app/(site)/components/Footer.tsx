"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

function Footer() {
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  const [dataContact, setDataContact] = useState<any>([]);

  const icons = [
    {
      icon: "/assets/Group.svg",
      link: "https://wa.me/message/KT2NKQ74BR3MA1",
    },
    {
      icon: "/assets/LinkedIn_icon.svg",
      link: "https://www.linkedin.com/company/glocal-solutions-us",
    },
    {
      icon: "/assets/Group (2).svg",
      link: "https://www.facebook.com/profile.php?id=61575981643630",
    },
  ];

  const dataLinks = [
    { name: "Home", link: "/home" },
    { name: "About Us", link: "/#about_as" },
    { name: "Services", link: "/service" },
    { name: "Why Us", link: "/#why_us" },
    { name: "Testimonials", link: "/#What_Our_Clients_Say" },
    { name: "Events", link: "/events" },
    { name: "Contact Us", link: "/contact_us" },
  ];

  const dataContact_ = [
    {
      icon: "/assets/mingcute_location-fill.svg",
      title: "1234 K Street NW, Suite 500, Washington, D.C., USA",
    },
    {
      icon: "/assets/material-symbols_call-sharp.svg",
      title: "+1 (202) 555-0198",
    },
    {
      icon: "/assets/material-symbols_mail-rounded.svg",
      title: "contact@glocalsolutions.com",
    },
  ];

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await axios.get(`${url}Contact/get-all`, {
          headers: {
            Accept: "application/json",
          },
        });
        setDataContact(response.data[0]);
      } catch (error) {
        console.error("Error fetching header data:", error);
      }
    };

    fetchHeaderData();
  }, []);

  return (
    <footer className="bg-[#F2F7FF] shadow-sm pb-4 pt-10 px-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-[#0d294b]">
        <div className=" ">
          <Link href="/home">
            <div className="relative h-[100px] w-[100px]">
              <Image
                src="/assets/logo.png"
                alt="logo"
                loading="lazy"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-sm  text-[#061D3A] font-bold mt-[10px]">
              Glocal Solutions
            </p>
          </Link>
          <ul className=" text-sm my-3">
            <li>Empowering businesses to win U.S. government </li>
            <li>projects and grow across the Gulf & MENA. </li>
            <li>Global Vision. Local Expertise.</li>
          </ul>
          <div className="flex items-center gap-5 mt-[20px] mx-auto">
            {icons.map((icon, index) => (
              <Link href={icon.link} key={index} target="_blank">
                <div
                  key={index}
                  className="relative h-[30px] w-[30px] rounded-full"
                >
                  <Image
                    src={icon.icon}
                    alt={`icon-${index}`}
                    fill
                    loading="lazy"
                    className="object-contain rounded-full "
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="">
          <h3 className="font-semibold mb-4 text-xl">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            {dataLinks.map((itme, index) => (
              <li
                key={index}
                className="text-lg mb-1.5 w-fit hover:text-[#16375f] hover:pl-2.5 transition-all duration-300 ease-in-out"
              >
                <Link href={itme.link}>{itme.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="">
          <h3 className="font-semibold mb-4 text-xl ">Contact</h3>
          <ul className="space-y-1 text-sm">
            <li className="flex gap-1.5 items-center mb-6">
              <div className="relative h-[20px] w-[20px] rounded-full">
                <Image
                  src="/assets/mingcute_location-fill.svg"
                  alt="logo"
                  loading="lazy"
                  fill
                  className="object-contain"
                />
              </div>
              <span>
                {dataContact?.address ||
                  "1234 K Street NW, Suite 500, Washington, D.C., USA"}
              </span>
            </li>
            <li className="flex gap-1.5 items-center mb-6">
              <div className="relative h-[20px] w-[20px] rounded-full">
                <Image
                  src="/assets/material-symbols_call-sharp.svg"
                  alt="logo"
                  loading="lazy"
                  fill
                  className="object-contain"
                />
              </div>
              <span>{dataContact?.phone || "+1 (202) 555-0198"}</span>
            </li>
            <li className="flex gap-1.5 items-center mb-6">
              <Link
                href={`mailto:${dataContact?.email}`}
                target="_blank"
                className="flex items-center gap-2"
              >
                <div className="relative h-[20px] w-[20px] rounded-full">
                  <Image
                    src="/assets/material-symbols_mail-rounded.svg"
                    alt="logo"
                    loading="lazy"
                    fill
                    className="object-contain"
                  />
                </div>
                <span>
                  {dataContact?.email || "contact@glocalsolutions.com"}
                </span>
              </Link>
            </li>
          </ul>
        </div>
        {/* <div className="">
          <h3 className="font-semibold mb-4 text-xl ">Contact</h3>
          <ul className="space-y-1 text-sm">
            {dataContact_.map((itme, index) => (
              <li key={index} className="flex gap-1.5 items-center mb-6">
                <div className="relative h-[20px] w-[20px] rounded-full">
                  <Image
                    src={itme.icon}
                    alt="logo"
                    loading="lazy"
                    fill
                    className="object-contain"
                  />
                </div>
                <span>{itme.title}</span>
              </li>
            ))}
          </ul>
        </div> */}
      </div>
      <div className=" w-full flex gap-3 items-center text-[#0A3161] mt-10 text-[14px]">
        <Link href="/privacy_policy" target="_blank">
          <span>Privacy Policy</span>
        </Link>
        <span className="w-[1px] bg-[#0A3161] h-6"></span>
        <Link href="/terms_of_use" target="_blank">
          <span>Term Of Use</span>
        </Link>
        <span className="w-[1px] bg-[#0A3161] h-6"></span>
        <Link href="/cancel_policy" target="_blank">
          <span>Return and Cancel Policy</span>
        </Link>
      </div>
      <p className=" w-full text-center text-[#0A3161] mt-10 text-[14px]">
        Copyright © 2025 Glocal Solutions . All rights reserved
      </p>
    </footer>
  );
}

export default Footer;
