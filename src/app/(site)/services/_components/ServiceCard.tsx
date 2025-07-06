"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

interface Service {
  name: string;
  description: string;
  image: string | null;
  priceCompany: number;
  id: number;
}

const dataProven = [
  {
    des: "The advantages of registering on the U.S. Government Platform",
  },
  {
    des: "Our services, from registration to identifying project opportunities.",
  },
  {
    des: "Best practices for applying and managing projects.",
  },
];

export default function ServiceCard() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${url}Service/get-all`);
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [url]);

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0A3161]"></div>
      </div>
    );
  }

  return (
    <>
      {services.map((service) => (
        <div
          key={service.id}
          className="bg-[#FBFBFB] shadow-2xl w-full rounded-md border border-[#2f77eb77]/44"
        >
          <div className="px-5 py-6 w-full">
            <h2 className="text-[#092C57] mb-1 text-xl font-semibold">
              {service.name}
            </h2>
            <p className="text-[#575757] leading-relaxed">
              {service.description}
            </p>
            <div className="my-4">
              <div className="h-full">
                <div className="my-5 w-full">
                  {dataProven.map((item, index) => (
                    <div className="flex gap-4 mb-6" key={index}>
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
                        <p className="text-[#575757] leading-relaxed">
                          {item.des}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    <span className="text-[#0A3161]">Company Price:</span>
                    <span className="text-[#B31942]">
                      ${service.priceCompany}
                    </span>
                  </div>
                </div>
                <div className="flex gap-4 justify-center mt-4">
                  <Link href={`/webinar_booking/${service.id}`}>
                    <button className="w-[200px] h-[50px] rounded-md flex justify-center items-center cursor-pointer text-white transition-all duration-300 transform hover:scale-105 bg-[#0A3161] border border-transparent">
                      Pay Now
                    </button>
                  </Link>
                  <Link href="/contact_us">
                    <button className="w-[200px] h-[50px] rounded-md flex justify-center items-center cursor-pointer text-white transition-all duration-300 transform hover:scale-105 bg-[#B31942] border border-transparent">
                      Contact Us
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
