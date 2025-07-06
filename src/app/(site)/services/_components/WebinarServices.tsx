import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { CalendarDays } from "lucide-react";

interface Webinar {
  title: string;
  description: string;
  date: string;
  priceIndividual: number;
  id: number;
}

export default function WebinarServices() {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWebinars = async () => {
      try {
        const response = await axios.get(`${url}Webinar/get-all`);
        setWebinars(response.data);
      } catch (err) {
        setError("Failed to fetch webinar data");
        console.error("Error fetching webinars:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWebinars();
  }, [url]);

  if (isLoading) {
    return (
      <div className="px-4 py-3">
        <h2 className="text-[#0A3161] font-semibold text-2xl mb-4">
          Webinar Subscription
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-white rounded-lg p-6 border border-[#91abe2]"
            >
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-16 bg-gray-200 rounded mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
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
          Webinar Subscription
        </h2>
        <p className="text-red-500 mb-6">{error}</p>
        {/* Fallback content */}
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-lg p-6 border border-[#91abe2]">
            <h3 className="text-[#0A3161] font-bold text-xl mb-4">
              No Webinars Available
            </h3>
            <p className="text-[#575757] mb-4">
              Please check back later for upcoming webinars or contact us for
              more information.
            </p>
            <Link href="/contact_us">
              <button className="w-full h-[50px] rounded-md flex justify-center items-center cursor-pointer text-white transition-all duration-300 transform hover:scale-105 bg-[#B31942] border border-transparent">
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
        Webinar Subscription
      </h2>
      <p className="text-[#575757] text-[16px] leading-relaxed mb-6">
        Join our expert-led webinars to learn about U.S. government contracting
        opportunities and best practices.
      </p>

      {/* Dynamic webinar cards from API */}
      <div className="grid grid-cols-1 gap-6">
        {webinars.map((webinar) => (
          <div
            key={webinar.id}
            className="bg-white rounded-lg p-6 border border-[#91abe2] hover:shadow-lg transition-all duration-300"
          >
            <h3 className="text-[#0A3161] font-bold text-xl mb-3">
              {webinar.title}
            </h3>
            <p className="text-[#575757] mb-4">{webinar.description}</p>

            <div className="flex items-center gap-2 mb-4">
              <CalendarDays className="text-[#0A3161]" />
              <span className="text-[#0A3161]">
                {new Date(webinar.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <span className="text-[#0A3161] font-bold">
                Individual Price:
              </span>
              <span className="text-[#B31942] font-bold text-2xl">
                ${webinar.priceIndividual.toFixed(2)}
              </span>
            </div>

            <div className="flex gap-4">
              <Link href={`/webinar_booking/${webinar.id}`} className="flex-1">
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
