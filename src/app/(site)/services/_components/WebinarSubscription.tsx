"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ChevronRight, CalendarDays, Funnel, X } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { Webinar, RegistrationService, NewsItem } from "./types";

function WebinarSubscription() {
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  const [webinars, setWebinars] = useState<Webinar | null>(null);
  const [services, setServices] = useState<RegistrationService | null>(null);
  const [news, setNews] = useState<NewsItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleBooking = () => {
    setShowBookingModal(true);
  };

  const handleCloseModal = () => {
    setShowBookingModal(false);
  };

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
      des: "The advantages of registering on the U.S. Government Platform",
    },
    {
      des: "Our services, from registration to identifying project opportunities.",
    },
    {
      des: "Best practices for applying and managing projects.",
    },
  ];

  useEffect(() => {
    // fetch webinar services
    const fetchWebinars = async () => {
      try {
        const response = await axios.get(`${url}Webinar/get-all`);
        setWebinars(response.data[0]);
      } catch (err) {
        setError("Failed to fetch webinar data");
        console.error("Error fetching webinars:", err);
      } finally {
        setIsLoading(false);
      }
    };

    // fetch registration services
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${url}Service/get-all`);
        setServices(response.data[0]);
      } catch (err) {
        setError("Failed to fetch registration services");
        console.error("Error fetching services:", err);
      } finally {
        setIsLoading(false);
      }
    };

    // fetch news
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${url}News/get-all`);
        setNews(response.data[0]);
      } catch (err) {
        setError("Failed to fetch pricing data");
        console.error("Error fetching news:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWebinars();
    fetchServices();
    fetchNews();
  }, [url]);

  const [consultation, setConsultation] = useState<string | null>(null);
  useEffect(() => {
    const fetchConsultation = async () => {
      const response = await axios.get(`${url}Consultation/get-all`);
      setConsultation(response.data[0].link);
    };
    fetchConsultation();
  }, []);

  return (
    <>
      <div
        className="w-full bg-white pb-14 px-5 md:px-12 overflow-hidden"
        id="services"
      >
        {/* Webinar Section */}
        <div className="flex w-full mt-10" data-aos="fade-left">
          <div className="bg-[#FBFBFB] shadow-2xl w-full rounded-md border border-[#2f77eb77]/44 ">
            <div className="px-5 py-6 w-full">
              <h2 className="text-[#092C57] mb-1 text-xl font-semibold">
                {webinars?.title || "Webinar Subscription"}
              </h2>
              <p className="text-[#575757] leading-relaxed">
                {webinars?.description ||
                  "Learn from our experts about opportunities in U.S. government projects within GCC countries."}
              </p>

              <div className="my-5 w-full">
                {dataProven.map((itme, index) => (
                  <div className="flex gap-4 mb-6" key={index}>
                    <span className="w-[20px] h-[20px] relative rounded-full flex justify-center items-center font-bold text-xl">
                      <Image
                        src="/assets/true.svg"
                        alt="true"
                        loading="lazy"
                        fill
                        className="object-contain"
                      />
                    </span>
                    <p className="text-[#575757] leading-relaxed">{itme.des}</p>
                  </div>
                ))}
              </div>
{/* 
              <div className="flex items-center gap-2 my-5">
                <CalendarDays className="text-[#B31942]" />
                <span className="text-[#0A3161] font-semibold">
                  {webinars?.date
                    ? new Date(webinars.date).toLocaleDateString("en-GB")
                    : ""}
                </span>
              </div> */}

              <p className="text-[#0A3161] font-semibold text-lg">
                <span className="text-[#B31942]">
                  ${webinars?.priceIndividual || "0"}
                </span>{" "}
                Per Invitation
              </p>

             <div className="flex flex-col md:flex-row gap-4 justify-center mt-4">
  {/* <Link href={`/webinar_booking/${webinars?.id}`} className="w-full max-w-[200px]">
    <button className="w-full h-[50px] rounded-md flex justify-center items-center cursor-pointer text-white transition-all duration-300 transform hover:scale-105 bg-[#0A3161] border border-transparent">
      Pay Now
    </button>
  </Link> */}
  <Link href="/contact_us" className="w-full max-w-[200px]">
    <button className="w-full h-[50px] rounded-md flex justify-center items-center cursor-pointer text-white transition-all duration-300 transform hover:scale-105 bg-[#B31942] border border-transparent">
      Contact Us
    </button>
  </Link>
</div>

            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8 my-10"
          data-aos="fade-left"
        >
          {/* Registration Services */}
          <div
            className="bg-[#FBFBFB] shadow-2xl w-full rounded-md border border-[#2f77eb77]/44"
            data-aos="zoom-in"
          >
            <div className="px-4 py-3 space-y-2">
              <h2 className="text-[#0A3161] font-semibold text-2xl">
                {services?.name || "Registration Services"}
              </h2>
              <h3 className="text-[#0A3161] text-xl leading-relaxed">
                {services?.description || "System for Award Management (SAM)"}
              </h3>
              <p className="text-[#575757] text-[16px] leading-relaxed">
                Our experts handle all registration procedures, enabling your
                company to work on U.S. government projects.
              </p>
              <p className="text-[#575757] text-[16px] leading-relaxed flex items-center gap-2">
                <span className="w-[15px] h-[15px] relative rounded-full flex justify-center items-center font-bold text-xl">
                  <Image
                    src="/assets/true.svg"
                    alt="true"
                    loading="lazy"
                    fill
                    className="object-contain"
                  />
                </span>
                We'll handle registration to get your company eligible for U.S.
                projects
              </p>

              <p className="text-[#0A3161] font-semibold text-lg">
                <span className="text-[#B31942]">
                  ${services?.priceCompany || "0"}
                </span>{" "}
                Per Company
              </p>

              <div className="flex gap-4 justify-center mt-4 md:flex-row flex-col items-center">
                { <Link
                  className="md:w-[200px] w-full"
                  href={`/registration_booking/${services?.id}`}
                >
                  <button className="w-full md:w-[200px] h-[50px] rounded-md flex justify-center items-center cursor-pointer text-white transition-all duration-300 transform hover:scale-105 bg-[#0A3161] border border-transparent">
                    Pay Now
                  </button>
                </Link> }
                <Link className="md:w-[200px] w-full" href="/contact_us">
                  <button className="w-full md:w-[200px] h-[50px] rounded-md flex justify-center items-center cursor-pointer text-white transition-all duration-300 transform hover:scale-105 bg-[#B31942] border border-transparent">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div
            className="bg-[#FBFBFB] shadow-2xl w-full rounded-md border border-[#2f77eb77]/44"
            data-aos="zoom-in"
          >
            <div className="px-4 py-3 space-y-2 flex flex-col justify-between h-full">
              <h2 className="text-[#0A3161] font-semibold text-2xl">
                {news?.title || "Newsletter Subscription"}
              </h2>
              <p className="text-[#575757] text-[16px] leading-relaxed">
                Stay informed with periodic updates on new projects tailored to
                your business activity and regions of interest.
              </p>
              <p className="text-[#0A3161] font-bold">
                <span className="text-[#B31942]">
                  ${news?.priceCountry || "0"}
                </span>{" "}
                (Per Country)
              </p>
              <div className="flex gap-4 justify-center mt-7">
                { <Link href={`/newsletter_booking/${news?.id}`}>
                  <button className="w-[200px] h-[50px] rounded-md flex justify-center items-center cursor-pointer text-white transition-all duration-300 transform hover:scale-105 bg-[#0A3161] border border-transparent">
                    Pay Now
                  </button>
                </Link> }
                <Link className="md:w-[200px] w-full" href="/contact_us">
                  <button className="w-full md:w-[200px] h-[50px] rounded-md flex justify-center items-center cursor-pointer text-white transition-all duration-300 transform hover:scale-105 bg-[#B31942] border border-transparent">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Specialized Services */}
        <div className="my-10">
          <h2 className="text-[#0A3161] text-3xl font-bold mb-3">
            Specialized Services
          </h2>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8"
            data-aos="fade-left"
          >
{/* Service 1 */}
<div
  className="bg-[#FBFBFB] shadow-2xl w-full rounded-md border border-[#2f77eb77]/44"
  data-aos="zoom-in"
>
  <div className="px-4 py-3 space-y-2 flex flex-col justify-between h-full">
    <h2 className="text-[#0A3161] font-semibold text-2xl">
      Bidding Support for U.S. Government Projects
    </h2>
    <p className="text-[#575757] text-[16px] leading-relaxed">
      Our experts assist registered companies in preparing professional bid
      documents that meet U.S. government standards, ensuring technical
      acceptance.
    </p>
    <p className="text-[#0A3161] font-bold">
      <span className="text-[#B31942] text-xl font-semibold">1-3%</span>{" "}
      of the bid value, based on project size.
    </p>
    <p className="text-[#0A3161] font-bold flex items-center gap-1">
      <span className="text-[#B31942]">
        <Funnel strokeWidth={2.75} />
      </span>
      <span>
        Pricing and financial proposals are outside the scope of this service.
      </span>
    </p>
    <div className="flex gap-4 justify-center mt-7">
      <a
        href="https://outlook.office.com/bookwithme/user/a268e5a7348243d88e329582c49d1121%40glocalsolutions.us/meetingtype/M7GjmpeC5UeB6h3Mh66WBw2?anonymous&ismsaljsauthenabled"
        target="_blank"
        rel="noopener noreferrer"
        className="w-[200px]"
      >
        <button className="w-full h-[50px] rounded-md flex justify-center items-center cursor-pointer text-white transition-all duration-300 transform hover:scale-105 bg-[#B31942] border border-transparent">
          Book Consultation
        </button>
      </a>
    </div>
  </div>
</div>

{/* Service 2 */}
<div
  className="bg-[#FBFBFB] shadow-2xl w-full rounded-md border border-[#2f77eb77]/44"
  data-aos="zoom-in"
>
  <div className="px-4 py-3 space-y-2 flex flex-col justify-between h-full">
    <h2 className="text-[#0A3161] font-semibold text-2xl">
      Project Management Support
    </h2>
    <p className="text-[#575757] text-[16px] leading-relaxed">
      We provide consulting services for companies executing U.S. government
      projects, offering administrative expertise to ensure smooth
      implementation and timely financial settlements.
    </p>
    <p className="text-[#0A3161] font-bold">
      <span className="text-[#B31942] text-xl font-semibold">1-3%</span>{" "}
      of the bid value, based on project size.
    </p>
    <div className="flex gap-4 justify-center mt-7">
      <a
        href="https://outlook.office.com/bookwithme/user/a268e5a7348243d88e329582c49d1121%40glocalsolutions.us/meetingtype/M7GjmpeC5UeB6h3Mh66WBw2?anonymous&ismsaljsauthenabled"
        target="_blank"
        rel="noopener noreferrer"
        className="w-[200px]"
      >
        <button className="w-full h-[50px] rounded-md flex justify-center items-center cursor-pointer text-white transition-all duration-300 transform hover:scale-105 bg-[#B31942] border border-transparent">
          Book Consultation
        </button>
      </a>
    </div>
  </div>
</div>

          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            <iframe
              src={consultation || ""}
              className="w-full h-full rounded-lg"
              title="Book Consultation"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default WebinarSubscription;
