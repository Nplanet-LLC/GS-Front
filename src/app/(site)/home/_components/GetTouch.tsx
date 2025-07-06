"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import SelectCountry from "../../components/SelectCountry";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import Swal from "sweetalert2";

interface FormData {
  firstName: string;
  lastName: string;
  companyName: string;
  phoneNumber: string;
  email: string;
  inquiry: string;
  countryId: number | string;
}

function GetTouch() {
  const [dataContact, setDataContact] = useState<any>([]);

  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const [selectedCountry, setSelectedCountry] = useState<number>(0);

  const handleCountryChange = (value: string | number) => {
    const countryId = typeof value === "string" ? parseInt(value) : value;
    setSelectedCountry(countryId);
    setValue("countryId", countryId);
  };

  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: false,
      offset: 100,
      startEvent: "scroll",
    });

    const timeout = setTimeout(() => {
      AOS.refresh();
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(`${url}ContactUs/add-contactUs`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Message sent successfully!");
      reset(); // Reset form after successful submission
      setSelectedCountry(0);
      setValue("countryId", "");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while sending the message.";
      toast.error(errorMessage);
      console.error(
        "Error sending data:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await axios.get(`${url}Contact/get-all`, {
          headers: {
            Accept: "application/json",
          },
        });
        setDataContact(response.data[0]);
        console.log("dataContact :", response.data[0]);
      } catch (error) {
        console.error("Error fetching header data:", error);
      }
    };

    fetchHeaderData();
  }, []);

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

  const [countries, setCountries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [countriesRes] = await Promise.all([
          axios.get(`${url}Country/get-all`),
        ]);

        setCountries(countriesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load data. Please try again later.",
          confirmButtonColor: "#0A3161",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return (
    <div className="w-full bg-white pb-14 px-5 md:px-12 overflow-hidden relative">
      <div className="absolute top-[-60px] right-[-90px] w-60 h-60 bg-gradient-to-br from-[#B31942] to-transparent opacity-40 rounded-full pointer-events-none z-0 filter blur-2xl"></div>
      <div className="absolute bottom-[-65px] left-[-50px] w-60 h-60 bg-gradient-to-br from-[#B31942] to-transparent opacity-40 rounded-full pointer-events-none z-0 filter blur-2xl "></div>
      <span id="about_as" className="block h-[80px]"></span>
      {/* الجزء الأول */}
      <div data-aos="fade-right">
        <div>
          <h1 className="text-[#092C57] font-semibold text-2xl text-center mb-2">
            Get in Touch
          </h1>
          <span className="bg-[#B31942] w-[80px] h-1 block m-auto"></span>
        </div>
        <p className="text-[#575757] text-center leading-relaxed mt-3">
          Ready to discuss your project needs? Our team is here to help you
          navigate the complexities of government-funded projects.
        </p>
      </div>
      {/* الجزء الثاني */}
      <div className="flex flex-wrap gap-3 w-full mt-10 " data-aos="fade-left">
        {/* start form  */}
        <div className="h-full flex-1 min-w-[300px] md:w-full md:min-w[400px] bg-[#F2F4F8] text-[#092C57] px-3 py-6  rounded-md">
          <h2 className="text-[#092C57] font-semibold mb-5">Contact us</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex md:flex-nowrap flex-wrap gap-2">
              <div className="flex flex-col gap-1 md:w-[50%] w-full">
                <label htmlFor="firstName">First Name</label>
                <input
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  type="text"
                  id="firstName"
                  className="bg-white border min-h-[48px] border-gray-300 rounded px-2 py-1 focus:outline-none"
                />
                {errors.firstName && (
                  <span className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1 md:w-[50%] w-full">
                <label htmlFor="lastName">Last Name</label>
                <input
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  type="text"
                  id="lastName"
                  className="bg-white border min-h-[48px] border-gray-300 rounded px-2 py-1 focus:outline-none"
                />
                {errors.lastName && (
                  <span className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="email">Email Address</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                id="email"
                className="bg-white border min-h-[48px] border-gray-300 rounded px-2 py-1 focus:outline-none"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="phoneNumber">Mobile number</label>
              <input
                {...register("phoneNumber", {
                  required: "Phone number is required",
                })}
                type="tel"
                id="phoneNumber"
                className="bg-white border min-h-[48px] border-gray-300 rounded px-2 py-1 focus:outline-none"
              />
              {errors.phoneNumber && (
                <span className="text-red-500 text-sm">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>

           <div>
  <label
    htmlFor="country"
    className="block text-[#0A3161] mb-1"
  >
    Country
  </label>
  <input
    type="text"
    id="country"
    {...register("country", {
      required: "Country is required",
      minLength: {
        value: 2,
        message: "Country name must be at least 2 characters",
      },
    })}
    className={`w-full bg-white min-h-[48px] border-gray-300 text-[#575757] px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
      errors.country
        ? "border-red-500 focus:ring-red-400"
        : "border-gray-300 focus:ring-blue-500"
    }`}
  />
  {errors.country && (
    <span className="text-red-500 text-sm">
      {errors.country.message}
    </span>
  )}
</div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="companyName">Company Name</label>
              <input
                {...register("companyName", {
                  required: "Company name is required",
                })}
                type="text"
                id="companyName"
                className="bg-white border min-h-[48px] border-gray-300 rounded px-2 py-1 focus:outline-none"
              />
              {errors.companyName && (
                <span className="text-red-500 text-sm">
                  {errors.companyName.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="inquiry">Your Inquiry</label>
              <textarea
                {...register("inquiry", { required: "Inquiry is required" })}
                id="inquiry"
                className="bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none min-h-[200px]"
              />
              {errors.inquiry && (
                <span className="text-red-500 text-sm">
                  {errors.inquiry.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full justify-center text-sm group flex items-center text-white px-6 py-2 shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#0A3161] cursor-pointer"
              }`}
            >
              {isSubmitting ? "Sending..." : "Submit Request"}
            </button>
          </form>
        </div>

        <div className="md:w-[40%] w-full md:min-w-[400px] min-w-[300px] p-3 space-y-10">
          <div className="">
            <h2 className="text-[#092C57] text-xl font-semibold mb-2">
              Our Office
            </h2>
            <ul className="space-y-1 text-sm bg-[#F2F4F8] w-full rounded-xl p-3">
              <li className="flex gap-1.5 items-center mb-4">
                <div className="relative h-[20px] w-[20px] rounded-full">
                  <Image
                    src="/assets/mingcute_location-fill.svg"
                    alt="logo"
                    loading="lazy"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-[#092C57]">
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
                <span className="text-[#092C57]">
                  {dataContact?.phone || "+1 (202) 555-0198"}
                </span>
              </li>
              <li className="flex gap-1.5 items-center mb-6">
                <div className="relative h-[20px] w-[20px] rounded-full">
                  <Image
                    src="/assets/material-symbols_mail-rounded.svg"
                    alt="logo"
                    loading="lazy"
                    fill
                    className="object-contain"
                  />
                </div>
                <Link
                  href={`mailto:${
                    dataContact?.email || "contact@glocalsolutions.com"
                  }`}
                  target="_blank"
                >
                  <span className="text-[#092C57] hover:text-[#B31942] transition-colors duration-200 cursor-pointer">
                    {dataContact?.email || "contact@glocalsolutions.com"}
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-[#092C57] text-xl font-semibold mb-2">
              Connect With Us
            </h2>
            <div className="flex items-center gap-3">
  {icons.map((icon, index) => (
    <a
      href={icon.link}
      key={index}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div className="relative h-[30px] w-[30px] rounded-full">
        <Image
          src={icon.icon}
          alt={`icon-${index}`}
          fill
          loading="lazy"
          className="object-contain rounded-full"
        />
      </div>
    </a>
  ))}
</div>

            {/* <p className="text-[#0A3161] mt-[20px]">
              For immediate assistance, please call our dedicated client support
              line at +1 (800) 555-0199 or email us at info@glocalsolutions.com
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetTouch;
