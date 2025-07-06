import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

function Slider() {
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const paginationRef = useRef<HTMLDivElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  // فعل الجاهزية بعد ما يتم ربط العناصر بـ refs
  useEffect(() => {
    setIsReady(true);
  }, []);

  const data = [
    {
      title: "Hassan Alam",
      des: "Consultant specializing in executive construction management and bids. (Egypt, MENA region and international)",
      date: "",
      logo: "/assets/logo-success-1.jpeg",
      img: "/assets/success_1.jpeg",
    },
    {
      title: "Amer Al Hoshan",
      des: "Consultant with extensive expertise in construction management, asset and property management, and business projects (Kingdom of Saudi Arabia).",
      date: "",
      logo: "/assets/logo-success-2.jpeg",
      img: "/assets/success_2.jpeg",
    },
    {
      title: "Sheikh Faisal Al Thani",
      des: "Director of all Properties & Assets Worldwide, overseeing U.S., European, and MENA property and asset management as well as global construction management programs, projects and initiatives.",
      date: "",
      logo: "/assets/logo-success-1.jpeg",
      img: "/assets/success_3.jpeg",
    },
    {
      title: "The Qatari Corps of Engineers",
      des: "On behalf of the U.S. Army Corps of Engineers, the U.S. Government, and the Department of Defense, advised host nation executive leadership on infrastructure development strategies, ensuring alignment with US and host nation objectives. Provided expert planning, construction management, and design support to drive efficient execution and successful project outcomes",
      date: "",
      logo: "/assets/logo-success-4.jpeg",
      img: "/assets/success_4.jpeg",
    },
    {
      title: "The Royal Saudi Navy",
      des: "Representing the U.S. Army Corps of Engineers, the U.S. Government, and the Department of Defense, advised executive leadership on strategic planning and operational enhancements for critical US and host nation naval infrastructure projects. ",
      date: "",
      logo: "/assets/logo-success-5.jpeg",
      img: "/assets/success_5.jpeg",
    },
    {
      title: "The Royal Saudi Land Forces",
      des: "While serving on behalf of the U.S. Army Corps of Engineers, the U.S. Government, and the Department of Defense, partnered with host nation executive leadership to ensure US and host nation strategic success. Provided comprehensive planning, design expertise, and construction management services for essential projects",
      date: "",
      logo: "/assets/logo-success-2.jpeg",
      img: "/assets/success_6.jpeg",
    },
    {
      title: "US Army Corps of Engineers, Middle East District",
      des: "experience in advising and briefing the U.S. Ambassadors weekly on construction in host nations including Saudi Arabia, Qatar, Lebanon, Abu Dhabi, Kuwait, and Oman. Leadership of construction programs and liaised with U.S. Government and host nation stakeholders to ensure successful program and project delivery",
      date: "",
      logo: "/assets/logo-success-4.jpeg",
      img: "/assets/success_7.jpeg",
    },
    {
      title: "US Mine Safety & Health Administration: ",
      des: "Provided investigative civil engineering solutions, ensuring safety and compliance on critical projects.",
      date: "",
      logo: "/assets/logo-success-7.jpeg",
      img: "/assets/success_8.jpeg",
    },
  ];
  return (
    <div className="relative">
      {isReady && (
        <Swiper
          modules={[Navigation, Pagination]}
          speed={1000}
          loop={true}
          autoplay={{
            delay: 5000, // المدة بين كل انتقال تلقائي، هنا 5 ثواني
            disableOnInteraction: false, // يظل يعمل بعد تفاعل المستخدم
          }}
          navigation={{
            prevEl: prevRef.current!,
            nextEl: nextRef.current!,
          }}
          pagination={{
            el: paginationRef.current!,
            clickable: true,
          }}
          onBeforeInit={(swiper) => {
            if (typeof swiper.params.navigation === "object") {
              swiper.params.navigation.prevEl = prevRef.current!;
              swiper.params.navigation.nextEl = nextRef.current!;
            }
            if (typeof swiper.params.pagination === "object") {
              swiper.params.pagination.el = paginationRef.current!;
            }
          }}
          className="w-full max-w-7xl"
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="space-y-0 border border-[#2f77eb77] rounded-xl relative bg-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* logo */}
                <div className="absolute top-[170px] left-4 w-[120px] h-[120px] z-40 bg-white rounded-lg shadow-lg p-2 border-2 border-white">
                  <Image
                    src={item.logo || ""}
                    alt={`${item.title} logo`}
                    fill
                    className="rounded-md object-contain"
                    sizes="120px"
                    quality={90}
                    priority={index < 3}
                  />
                </div>
                <div className="relative h-[300px] w-full overflow-hidden">
                  <Image
                    src={item.img || ""}
                    alt={item.title}
                    fill
                    className="rounded-t-md object-cover object-center transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={95}
                    priority={index < 3}
                  />
                </div>
                <div className="px-6 py-4 bg-white">
                  <h1 className="text-[#0A3161] text-xl font-bold mb-3 leading-tight">
                    {item.title}
                  </h1>
                  <p className="text-sm text-[#575757] leading-relaxed mb-3">
                    {item.des}
                  </p>
                  {item.date && (
                    <p className="text-end text-[#0558E2] text-sm font-medium">
                      {item.date}
                    </p>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* الأسهم والنقاط أسفل السلايدر */}
      <div className="flex  justify-center items-center w-[300px] md:w-[450px] mx-auto mt-12">
        <div
          ref={prevRef}
          className="swiper-button-prev custom-swiper-arrow !static !text-[#001E6C]"
        />
        <div
          ref={paginationRef}
          className="swiper-pagination !static !flex justify-center"
        />
        <div
          ref={nextRef}
          className="swiper-button-next custom-swiper-arrow !static !text-[#001E6C]"
        />
      </div>
    </div>
  );
}

export default Slider;
