import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import axios from "axios";
import Tooltip from "./Tooltip";
// import axios from "axios";

function Slider() {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const paginationRef = useRef<HTMLDivElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get(`${url}Team/get-all`);
        setTeamMembers(response.data);
      } catch (error) {
        console.error("Error fetching team members:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  console.log("teamMembers :", teamMembers);

  useEffect(() => {
    setIsReady(true);
  }, []);

  // Dummy data
  const data = [
    {
      title: "AbdElKareem BoYounin , Chairman",
      des: "Partnering with Glocal Solutions was a game-changer for our project. Their professionalism ensured on-time delivery and exceptional quality. From the moment we teamed up, they tackled every challenge with confidence and expertise. We highly recommend them to anyone seeking reliable, high-caliber support.",
      date: "BoYounin Group, KSA",
      img: "/assets/OurClients.png",
    },
    {
      title: "Eng. Akram Hussain, CEO",
      des: "Glocal Solutions brought clarity and structure to a highly complex e-SAM registration process. Their proactive approach and meticulous attention to detail made all the difference. Thanks to their expertise, we successfully opened new opportunities in the U.S. government market. It was a pleasure working with such a reliable and skilled partner.",
      date: "ECGroup, Egypt",
      img: "/assets/OurClients.png",
    },
    {
      title: "Falah AlHajri, Owner",
      des: "Working with Glocal Solutions was a seamless and rewarding experience. They supported us in securing new service contracts with the U.S. Government in Qatar and Kuwait. Their team demonstrated deep technical expertise, clear communication, and a strong commitment to delivering results. From the outset, they understood our needs and provided tailored solutions that exceeded our expectations. We greatly value their professionalism and look forward to continued collaboration.",
      date: "SAS, Qatar",
      img: "/assets/OurClients.png",
    },
    {
      title: "Eng. Ahmed Khader",
      des: "We would like to extend our sincere appreciation to Glocal Solutions LLC for their outstanding support and guidance throughout our e-SAM registration process. Their in-depth knowledge of U.S. federal procurement systems and regulatory frameworks made what could have been a complex and time-consuming process smooth and efficient.",
      date: "Kingdom of Saudi Arabia",
      img: "/assets/OurClients.png",
    },
  ];

  // Function to chunk array into groups of three
  const chunkArray = (arr: any[], size: number) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  // Chunk the data into groups of three
  const chunkedData = chunkArray(teamMembers, 3);
  // const chunkedData = chunkArray(data, 3);

  return (
    <div className="relative m-auto">
      {isReady && (
        <Swiper
          modules={[Navigation, Pagination]}
          speed={1000}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
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
          className="px-4"
        >
          {chunkedData.map((group, groupIndex) => (
            <SwiperSlide key={`slide-group-${groupIndex}`}>
              <div className="flex flex-col md:flex-row items-center gap-5 justify-center">
                {group.map((item, index) => (
                  <div
                    key={`card-${groupIndex}-${index}`}
                    className="bg-[#0A3161]  md:max-h-[350px] w-[300px] rounded-tl-2xl rounded-br-2xl"
                  >
                    <div className="p-4 md:h-[300px] h-auto relative">
                      <div className="flex items-center gap-4 ">
                        <div className="relative h-[50px] w-[50px] rounded-full overflow-hidden">
                          <Image
                            src={item.image || "/assets/user-profile.webp"}
                            alt="client"
                            loading="lazy"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="space-y-0.5">
                          <h3 className="font-semibold text-white">
                            {item.name} , {item.jop}
                          </h3>
                          <p className="text-sm font-normal text-[#E1E1E1]">
                            {item.address}
                          </p>
                        </div>
                      </div>
                      <Tooltip
                        content={item.description}
                        maxWidth={500}
                        placement="bottom"
                      >
                        <p className="leading-relaxed  my-3 text-sm font-normal text-white md:line-clamp-7 line-clamp-none ">
                          {item.description}
                        </p>
                      </Tooltip>
                      <div className="flex justify-end  absolute bottom-2 right-2">
                        <div className="relative h-[30px] w-[30px] rounded-full right-0">
                          <Image
                            src="/assets/qqq.svg"
                            alt="quote"
                            loading="lazy"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className="flex justify-center items-center w-[300px] md:w-[450px] mx-auto mt-12">
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
