import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { CalendarDays, Funnel, CheckCircle } from "lucide-react";
import Image from "next/image";

interface RegistrationService {
  name: string;
  description: string;
  image: string | null;
  priceCompany: number;
  id: number;
}

export default function RegistrationServices() {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const [services, setServices] = useState<RegistrationService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${url}Service/get-all`);
        setServices(response.data);
      } catch (err) {
        setError("Failed to fetch registration services");
        console.error("Error fetching services:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [url]);

  if (isLoading) {
    return (
      <div className="px-4 py-3">
        <h2 className="text-[#0A3161] font-semibold text-2xl mb-4">
          Registration Services
        </h2>
        <h3 className="text-[#0A3161] text-xl leading-relaxed mb-4">
          System for Award Management (SAM)
        </h3>
        <div className="grid grid-cols-1 gap-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-white rounded-lg p-6 border border-[#91abe2]"
            >
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-16 bg-gray-200 rounded mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="flex gap-4">
                <div className="h-12 bg-gray-200 rounded flex-1"></div>
                <div className="h-12 bg-gray-200 rounded flex-1"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-3">
        <h2 className="text-[#0A3161] font-semibold text-2xl mb-4">
          Registration Services
        </h2>
        <h3 className="text-[#0A3161] text-xl leading-relaxed mb-4">
          System for Award Management (SAM)
        </h3>
        <p className="text-red-500 mb-6">{error}</p>
        {/* Fallback content */}
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-lg p-6 border border-[#91abe2]">
            <h3 className="text-[#0A3161] font-bold text-xl mb-4">
              Individual Registration
            </h3>
            <p className="text-[#575757] mb-4">
              Complete registration service for individuals looking to work with
              U.S. government projects.
            </p>
            <div className="flex items-center gap-2 mb-4">
              <CalendarDays className="text-[#0A3161]" />
              <p className="text-[#0A3161] font-bold">
                Individual Registration:{" "}
                <span className="text-[#B31942]">$5,000</span>
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="/registration_booking" className="flex-1">
                <button className="w-full h-[50px] rounded-md flex justify-center items-center cursor-pointer text-white transition-all duration-300 transform hover:scale-105 bg-[#0A3161] border border-transparent">
                  Pay Now
                </button>
              </Link>
              <Link href="/contact_us" className="flex-1">
                <button className="w-full h-[50px] rounded-md flex justify-center items-center cursor-pointer text-white transition-all duration-300 transform hover:scale-105 bg-[#B31942] border border-transparent">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-[#91abe2]">
            <h3 className="text-[#0A3161] font-bold text-xl mb-4">
              Company Registration
            </h3>
            <p className="text-[#575757] mb-4">
              Complete registration service for companies (up to 5 participants)
              to work on U.S. government projects.
            </p>
            <div className="flex items-center gap-2 mb-4">
              <CalendarDays className="text-[#0A3161]" />
              <p className="text-[#0A3161] font-bold">
                Companies (up to 5 Participants):{" "}
                <span className="text-[#B31942]">$400</span>
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="/registration_booking" className="flex-1">
                <button className="w-full h-[50px] rounded-md flex justify-center items-center cursor-pointer text-white transition-all duration-300 transform hover:scale-105 bg-[#0A3161] border border-transparent">
                  Pay Now
                </button>
              </Link>
              <Link href="/contact_us" className="flex-1">
                <button className="w-full h-[50px] rounded-md flex justify-center items-center cursor-pointer text-white transition-all duration-300 transform hover:scale-105 bg-[#B31942] border border-transparent">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-3">
      <h2 className="text-[#0A3161] font-semibold text-2xl mb-4">
        Registration Services
      </h2>
      <h3 className="text-[#0A3161] text-xl leading-relaxed mb-4">
        System for Award Management (SAM)
      </h3>
      <p className="text-[#575757] text-[16px] leading-relaxed mb-4 flex items-center gap-2">
        <CheckCircle className="text-[#0A3161] w-5 h-5" />
        We'll handle registration to get your company eligible for U.S. projects
      </p>

      {/* Dynamic service cards from API */}
      <div className="grid grid-cols-1 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-lg p-6 border border-[#91abe2] hover:shadow-lg transition-all duration-300"
          >
            <h3 className="text-[#0A3161] font-bold text-xl mb-3">
              {service.name}
            </h3>
            <p className="text-[#575757] mb-4">{service.description}</p>
            <div className="flex items-center gap-2 mb-6">
              <CalendarDays className="text-[#0A3161]" />
              <span className="text-[#B31942] font-bold text-2xl">
                ${service.priceCompany.toFixed(2)}
              </span>
            </div>
            <div className="flex gap-4">
              <Link
                href={`/registration_booking/${service.id}`}
                className="flex-1"
              >
                <button className="w-full h-[50px] rounded-md flex justify-center items-center cursor-pointer text-white transition-all duration-300 transform hover:scale-105 bg-[#0A3161] border border-transparent">
                  Pay Now
                </button>
              </Link>
              <Link href="/contact_us" className="flex-1">
                <button className="w-full h-[50px] rounded-md flex justify-center items-center cursor-pointer text-white transition-all duration-300 transform hover:scale-105 bg-[#B31942] border border-transparent">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
