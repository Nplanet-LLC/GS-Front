"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AOS from "aos";
import "aos/dist/aos.css";
import { User, Building2, Mail, Phone } from "lucide-react";
import SelectCountry from "./_components/SelectCountry";
import Swal from "sweetalert2";
import axios from "axios";

interface Country {
  id: number;
  countryName: string;
}

const FormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  companyName: z.string().min(1, "Company name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(8, "Phone number is too short")
    .regex(/^\d+$/, "Phone must contain only numbers"),
  countries: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
      })
    )
    .min(1, "At least one country is required"),
});

type FormValues = z.infer<typeof FormSchema>;

export default function NewsletterPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`${url}Country/get-all`);
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load countries. Please try again later.",
          confirmButtonColor: "#0A3161",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1500, once: false, offset: 100 });
    const timeout = setTimeout(() => AOS.refresh(), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    getValues,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      countries: [],
    },
  });

  const [countryFields, setCountryFields] = useState([0]);
  const [price, setPrice] = useState(0);
  const watchedCountries = watch(
    countryFields.map((index) => `countries.${index}` as const)
  );

  const addCountryField = () => {
    const values = getValues();
    const lastIndex = countryFields[countryFields.length - 1];
    const lastCountry = values.countries?.[lastIndex];

    if (lastCountry?.id) {
      setCountryFields((prev) => [...prev, prev.length]);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Missing Country",
        text: "Please select a country before adding another one.",
        confirmButtonColor: "#0A3161",
      });
    }
  };

  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);
    console.log("Selected Countries:", data.countries);
    console.log("Total:", data.countries.length * 250);
    setPrice(data.countries.length * 250);

    reset();
    setCountryFields([0]);
  };

  useEffect(() => {
    const selectedCount = watchedCountries.filter((c) => c?.id).length;
    setPrice(selectedCount * 250);
  }, [watchedCountries]);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0A3161]"></div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white pb-14 px-5 md:px-12 overflow-hidden">
      <span className="block h-[50px]"></span>

      <div>
        <h1 className="text-[#0A3161] font-semibold text-4xl text-center mb-10">
          Newsletter Subscription
        </h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-5xl mx-auto space-y-10"
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block font-semibold text-[#0A3161] mb-1"
            >
              Full Name
            </label>
            <div className="relative">
              <User className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                {...register("fullName")}
                className={`w-full text-[#575757] pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.fullName
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
            </div>
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Company Name */}
          <div>
            <label
              htmlFor="companyName"
              className="block font-semibold text-[#0A3161] mb-1"
            >
              Company Name
            </label>
            <div className="relative">
              <Building2 className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                id="companyName"
                type="text"
                placeholder="Enter your company name"
                {...register("companyName")}
                className={`w-full text-[#575757] pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.companyName
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
            </div>
            {errors.companyName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.companyName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block font-semibold text-[#0A3161] mb-1"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                className={`w-full text-[#575757] pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block font-semibold text-[#0A3161] mb-1"
            >
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                {...register("phone")}
                className={`w-full text-[#575757] pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.phone
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        <div>
          {countryFields.map((index) => (
            <SelectCountry
              key={index}
              control={control}
              name={`countries.${index}` as const}
              error={errors.countries?.[index]}
              countries={countries}
            />
          ))}

          <button
            type="button"
            onClick={addCountryField}
            className="text-blue-600 underline mt-3 font-semibold cursor-pointer hover:text-blue-800 transition-colors"
          >
            Add Country
          </button>
        </div>

        <div className="max-w-3xl p-3 text-[#0A3161] rounded-md mx-auto space-y-2 border border-[#1877F2] min-h-[100px]">
          <h2 className="font-semibold text-2xl">Summary</h2>
          <div className="flex justify-between items-center border-b border-gray-400 pb-1">
            <p>Newsletter Subscription </p>
            <span>{price}$</span>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-bold text-xl">Total</p>
            <span>{price}$</span>
          </div>
        </div>

        <div className="md:col-span-2 mt-5 max-w-3xl mx-auto">
          <button
            type="submit"
            className="w-full bg-[#0A3161] cursor-pointer text-white py-5 rounded-md hover:bg-[#092b54] transition-colors"
          >
            Continue To Payment
          </button>
        </div>
      </form>
    </div>
  );
}
