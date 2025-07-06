import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { CalendarDays, Funnel } from "lucide-react";

interface Service {
  name: string;
  description: string;
  image: string | null;
  priceCompany: number;
  id: number;
}

export default function ServicePricing() {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${url}Service/get-all`);
        setServices(response.data);
      } catch (err) {
        setError("Failed to fetch services data");
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
          Our Services
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-white rounded-lg p-6 border border-[#91abe2]"
            >
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-16 bg-gray-200 rounded mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-12 bg-gray-200 rounded w-1/2"></div>
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
          Our Services
        </h2>
        <p className="text-red-500 mb-6">{error}</p>
        <div className="grid grid-cols-1 gap-6">
          {/* Fallback content */}
          <div className="bg-white rounded-lg p-6 border border-[#91abe2]">
            <h3 className="text-[#0A3161] font-bold text-xl mb-4">
              Registration Services
            </h3>
            <p className="text-[#575757] mb-4">
              System for Award Management (SAM). Our experts handle all
              registration procedures, enabling your company to work on U.S.
              government projects.
            </p>
            <div className="flex items-center gap-2 mb-4">
              <CalendarDays className="text-[#0A3161]" />
              <p className="text-[#0A3161] font-bold">
                Companies (up to 5 Participants):{" "}
                <span className="text-[#B31942]">$400</span>
              </p>
            </div>
            <Link href="/registration_booking">
              <button className="w-full h-[50px] rounded-md flex justify-center items-center cursor-pointer text-white transition-all duration-300 transform hover:scale-105 bg-[#0A3161] border border-transparent">
                Book Now
              </button>
            </Link>
          </div>
          <div className="bg-white rounded-lg p-6 border border-[#91abe2]">
            <h3 className="text-[#0A3161] font-bold text-xl mb-4">
              Bidding Support
            </h3>
            <p className="text-[#575757] mb-4">
              Professional bid documents preparation that meets U.S. government
              standards, ensuring technical acceptance.
            </p>
            <div className="flex items-center gap-2 mb-4">
              <Funnel className="text-[#0A3161]" />
              <p className="text-[#0A3161] font-bold">
                <span className="text-[#B31942]">1-3%</span> of the bid value
              </p>
            </div>
            <Link href="/contact_us">
              <button className="w-full h-[50px] rounded-md flex justify-center items-center cursor-pointer text-white transition-all duration-300 transform hover:scale-105 bg-[#0A3161] border border-transparent">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-3">
      <h2 className="text-[#0A3161] font-semibold text-2xl mb-4">
        Our Services
      </h2>

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
              <Link href="/registration_booking" className="flex-1">
                <button className="w-full h-[50px] rounded-md flex justify-center items-center cursor-pointer text-white transition-all duration-300 transform hover:scale-105 bg-[#0A3161] border border-transparent">
                  Book Now
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
