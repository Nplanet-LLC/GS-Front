"use client";

import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Funnel, X } from "lucide-react";
import ServiceCard from "./ServiceCard";
import NewsletterPricing from "./NewsletterPricing";
import RegistrationServices from "./RegistrationServices";
import WebinarServices from "./WebinarServices";

export default function WebinarSubscription() {
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleBooking = () => {
    setShowBookingModal(true);
  };

  const handleCloseModal = () => {
    setShowBookingModal(false);
  };

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

  return (
    <>
      <div className="w-full bg-white pb-14 px-5 md:px-12 overflow-hidden">
        <div className="space-y-8 my-10" data-aos="fade-left">
          <div
            className="bg-[#FBFBFB] shadow-2xl w-full rounded-md border border-[#2f77eb77]/44"
            data-aos="zoom-in"
          >
            <WebinarServices />
          </div>
          <div
            className="bg-[#FBFBFB] shadow-2xl w-full rounded-md border border-[#2f77eb77]/44"
            data-aos="zoom-in"
          >
            <RegistrationServices />
          </div>
          <div
            className="bg-[#FBFBFB] shadow-2xl w-full rounded-md border border-[#2f77eb77]/44"
            data-aos="zoom-in"
          >
            <NewsletterPricing />
          </div>
        </div>

        <div className="my-10">
          <h2 className="text-[#0A3161] text-3xl font-bold mb-3">
            Specialized Services
          </h2>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8"
            data-aos="fade-left"
          >
            <div
              className="bg-[#FBFBFB] shadow-2xl w-full rounded-md border border-[#2f77eb77]/44"
              data-aos="zoom-in"
            >
              <div className="px-4 py-3 space-y-2 flex flex-col justify-between h-full">
                <div className="space-y-2">
                  <h2 className="text-[#0A3161] font-semibold text-2xl">
                    Bidding Support for U.S. Government Projects
                  </h2>
                  <p className="text-[#575757] text-[16px] leading-relaxed">
                    Our experts assist registered companies in preparing
                    professional bid documents that meet U.S. government
                    standards, ensuring technical acceptance.
                  </p>
                  <p className="text-[#0A3161] font-bold">
                    <span className="text-[#B31942] text-xl font-semibold">
                      1-3%
                    </span>{" "}
                    of the bid value, based on project size.
                  </p>
                  <p className="text-[#0A3161] font-bold flex items-center gap-1">
                    <span className="text-[#B31942]">
                      <Funnel strokeWidth={2.75} />
                    </span>{" "}
                    <span>
                      Pricing and financial proposals are outside the scope of
                      this service.
                    </span>
                  </p>
                </div>
                <div className="flex gap-4 justify-center mt-7">
                  <button
                    onClick={handleBooking}
                    className="w-[200px] h-[50px] rounded-md flex justify-center items-center cursor-pointer text-white transition-all duration-300 transform hover:scale-105 bg-[#B31942] border border-transparent"
                  >
                    Book Consultation
                  </button>
                </div>
              </div>
            </div>

            <div
              className="bg-[#FBFBFB] shadow-2xl w-full rounded-md border border-[#2f77eb77]/44"
              data-aos="zoom-in"
            >
              <div className="px-4 py-3 space-y-2 flex flex-col justify-between h-full">
                <div className="space-y-2">
                  <h2 className="text-[#0A3161] font-semibold text-2xl">
                    Project Management Support
                  </h2>
                  <p className="text-[#575757] text-[16px] leading-relaxed">
                    We provide consulting services for companies executing U.S.
                    government projects, offering administrative expertise to
                    ensure smooth implementation and timely financial
                    settlements.
                  </p>
                  <p className="text-[#0A3161] font-bold">
                    <span className="text-[#B31942] text-xl font-semibold">
                      1-3%
                    </span>{" "}
                    of the bid value, based on project size.
                  </p>
                </div>
                <div className="flex gap-4 justify-center mt-7">
                  <button
                    onClick={handleBooking}
                    className="w-[200px] h-[50px] rounded-md flex justify-center items-center cursor-pointer text-white transition-all duration-300 transform hover:scale-105 bg-[#B31942] border border-transparent"
                  >
                    Book Consultation
                  </button>
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
              src="https://outlook.office.com/bookwithme/user/a268e5a7348243d88e329582c49d1121@glocalsolutions.us/meetingtype/M7GjmpeC5UeB6h3Mh66WBw2?anonymous&ep=mlink"
              className="w-full h-full rounded-lg"
              title="Book Consultation"
            />
          </div>
        </div>
      )}
    </>
  );
}

// "use client";

// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { ChevronRight, CalendarDays, Funnel } from "lucide-react";
// import Link from "next/link";
// import axios from "axios";
// import ServiceCard from "./ServiceCard";

// interface Service {
//   name: string;
//   description: string;
//   image: string | null;
//   priceCompany: number;
//   id: number;
// }

// function WebinarSubscription() {
//   const [isLoading, setIsLoading] = useState(true);
//   const url = process.env.NEXT_PUBLIC_BASE_URL;

//   useEffect(() => {
//     AOS.init({
//       duration: 1500,
//       once: false,
//       offset: 100,
//       startEvent: "scroll",
//       easing: "ease-in-out",
//     });

//     const timeout = setTimeout(() => {
//       AOS.refresh();
//     }, 1000);

//     return () => clearTimeout(timeout);
//   }, []);

//   const data1 = [
//     {
//       icon: "/assets/Services-1.png",
//       title: "Executive Management Advisory",
//       des: "We offer high-level strategic advice to guide executive decisions across construction, property management, and international business. Our experience empowers leaders to confidently manage projects, assets, and business growth.",
//     },
//     {
//       icon: "/assets/Services-2.png",
//       title: "Construction Management Consulting",
//       des: "With data-driven insight and industry standard practices, we support organizations through the entire construction process from planning and bidding to project execution ensuring quality, compliance, and success.",
//     },
//   ];

//   const data = [
//     {
//       icon: "/assets/Frame 20.svg",
//       title: "Integrity",
//       des: "Commitment to ethical business practices and transparent operations.",
//     },
//     {
//       icon: "/assets/Frame 20 (1).svg",
//       title: "Expertise",
//       des: "Decades of experience in U.S. government contracting and construction.",
//     },
//     {
//       icon: "/assets/Frame 23.svg",
//       title: "Efficiency",
//       des: "Streamlined processes for fast and effective project execution.",
//     },
//     {
//       icon: "/assets/Frame 24.svg",
//       title: "Collaboration",
//       des: "Partnering with industry experts to deliver optimal solutions.",
//     },
//   ];

//   const dataProven = [
//     {
//       des: "The advantages of registering on the U.S. Government Platform",
//     },
//     {
//       des: "Our services, from registration to identifying project opportunities.",
//     },
//     {
//       des: "Best practices for applying and managing projects.",
//     },
//   ];

//   // if (isLoading) {
//   //   return (
//   //     <div className="w-full min-h-screen flex items-center justify-center">
//   //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0A3161]"></div>
//   //     </div>
//   //   );
//   // }

//   return (
//     <div className="w-full bg-white pb-14 px-5 md:px-12 overflow-hidden">
//       {/* Categorie */}
//       <div className="flex flex-col gap-2 w-full mt-10" data-aos="fade-left">
//         <ServiceCard />
//       </div>
//       {/* Categorie row 1 */}
//       <div
//         className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8 my-10"
//         data-aos="fade-left"
//       >
//         <div
//           className="bg-[#FBFBFB] shadow-2xl w-full  rounded-md border border-[#2f77eb77]/44"
//           data-aos="zoom-in"
//         >
//           <div className="px-4 py-3 space-y-2 ">
//             <h2 className="text-[#0A3161] font-semibold text-2xl  ">
//               Registration Services
//             </h2>
//             <h3 className="text-[#0A3161] text-xl  leading-relaxed">
//               System for Award Management (SAM)
//             </h3>
//             <p className="text-[#575757]  text-[16px] leading-relaxed">
//               Our experts handle all registration procedures, enabling your
//               company to work on U.S. government projects.
//             </p>
//             <p className="text-[#575757]  text-[16px] leading-relaxed flex items-center gap-2">
//               <span className="w-[15px] h-[15px] flex-wrapr relative rounded-full flex justify-center items-center font-bold text-xl">
//                 <Image
//                   src="/assets/true.svg"
//                   alt="true"
//                   loading="lazy"
//                   fill
//                   className="object-contain"
//                 />
//               </span>
//               We'll handle registration to get your company eligible for U.S.
//               projects
//             </p>
//             <div className="flex items-center gap-1">
//               <span className="text-[#0A3161] ">Individuals:</span>
//               <span className="text-[#B31942] ">$5,000</span>
//             </div>
//             <div className="text-[#0A3161] ">
//               Companies (up to 5 Participants):{" "}
//               <span className="text-[#B31942] "> $400</span>{" "}
//             </div>
//             <div className="flex gap-4  justify-center mt-4">
//               <Link href="registration_booking">
//                 <button
//                   className={`w-[200px] h-[50px] rounded-md flex justify-center items-center cursor-pointer text-white transition-all duration-300 transform hover:scale-105 bg-[#0A3161] border border-transparent `}
//                 >
//                   Pay Now
//                 </button>
//               </Link>
//               <Link href="/contact_us">
//                 <button
//                   className={`w-[200px] h-[50px] rounded-md flex justify-center items-center cursor-pointer text-white transition-all duration-300 transform hover:scale-105 bg-[#B31942] border border-transparent`}
//                 >
//                   Contact Us
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//         <div
//           className="bg-[#FBFBFB] shadow-2xl w-full  rounded-md border border-[#2f77eb77]/44"
//           data-aos="zoom-in"
//         >
//           <div className="px-4 py-3 space-y-2 ">
//             <h2 className="text-[#0A3161] font-semibold text-2xl  ">
//               Newsletter Subscription
//             </h2>
//             <p className="text-[#575757]  text-[16px] leading-relaxed">
//               Stay informed with periodic updates on new projects tailored to
//               your business activity and regions of interest.
//             </p>
//             <p className="text-[#0A3161] font-bold ">
//               One country, 2 activities:{" "}
//               <span className="text-[#B31942] ">$200</span> ({" "}
//               <span className="text-[#B31942] ">$50</span> per additional
//               activity)
//             </p>
//             <p className="text-[#0A3161] font-bold ">
//               Two countries, 2 activities:{" "}
//               <span className="text-[#B31942] ">$350</span> ({" "}
//               <span className="text-[#B31942] ">$75</span> per additional
//               activity)
//             </p>
//             <p className="text-[#0A3161] font-bold ">
//               All Gulf countries, all activities:
//               <span className="text-[#B31942] ">$1000 </span>
//             </p>
//             <div className="flex gap-4  justify-center mt-7">
//               <Link href="/newsletter_booking">
//                 <button
//                   className={`w-[200px] h-[50px] rounded-md flex justify-center items-center cursor-pointer text-white transition-all duration-300 transform hover:scale-105 bg-[#0A3161] border border-transparent `}
//                 >
//                   Pay Now
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Categorie row 2 */}
//       <div className="my-10">
//         <h2 className="text-[#0A3161] text-3xl font-bold mb-3">
//           Specialized Services
//         </h2>
//         <div
//           className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8 "
//           data-aos="fade-left"
//         >
//           <div
//             className="bg-[#FBFBFB] shadow-2xl w-full  rounded-md border border-[#2f77eb77]/44"
//             data-aos="zoom-in"
//           >
//             <div className="px-4 py-3 space-y-2 flex flex-col justify-between h-full ">
//               <div className="space-y-2">
//                 <h2 className="text-[#0A3161] font-semibold text-2xl  ">
//                   Bidding Support for U.S. Government Projects
//                 </h2>
//                 <p className="text-[#575757]  text-[16px] leading-relaxed">
//                   Our experts assist registered companies in preparing
//                   professional bid documents that meet U.S. government
//                   standards, ensuring technical acceptance.
//                 </p>
//                 <p className="text-[#0A3161] font-bold ">
//                   <span className="text-[#B31942] text-xl font-semibold ">
//                     1-3%
//                   </span>{" "}
//                   of the bid value, based on project size.
//                 </p>
//                 <p className="text-[#0A3161] font-bold flex items-center gap-1 ">
//                   <span className="text-[#B31942] ">
//                     <Funnel strokeWidth={2.75} />
//                   </span>{" "}
//                   <span>
//                     Pricing and financial proposals are outside the scope of
//                     this service.
//                   </span>
//                 </p>
//               </div>
//               <div className="flex gap-4  justify-center mt-7">
//                 <button
//                   className={`w-[200px] h-[50px] rounded-md flex justify-center items-center cursor-pointer text-white transition-all duration-300 transform hover:scale-105 bg-[#B31942] border border-transparent `}
//                 >
//                   Book Consultation
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div
//             className="bg-[#FBFBFB] shadow-2xl w-full  rounded-md border border-[#2f77eb77]/44"
//             data-aos="zoom-in"
//           >
//             <div className="px-4 py-3 space-y-2 flex flex-col justify-between  h-full  ">
//               <div className="space-y-2">
//                 <h2 className="text-[#0A3161] font-semibold text-2xl  ">
//                   Project Management Support
//                 </h2>
//                 <p className="text-[#575757]  text-[16px] leading-relaxed">
//                   We provide consulting services for companies executing U.S.
//                   government projects, offering administrative expertise to
//                   ensure smooth implementation and timely financial settlements.
//                 </p>
//                 <p className="text-[#0A3161] font-bold ">
//                   <span className="text-[#B31942] text-xl font-semibold ">
//                     1-3%
//                   </span>{" "}
//                   of the bid value, based on project size.
//                 </p>
//               </div>
//               <div className="flex gap-4  justify-center mt-7">
//                 <button
//                   className={`w-[200px] h-[50px] rounded-md flex justify-center items-center cursor-pointer text-white transition-all duration-300 transform hover:scale-105 bg-[#B31942] border border-transparent `}
//                 >
//                   Book Consultation
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default WebinarSubscription;