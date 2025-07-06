"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  User,
  Building2,
  Mail,
  Phone,
  CreditCard,
  Calendar,
  Lock,
} from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";
import { AxiosError } from "axios";

interface ErrorResponse {
  message: string;
}

interface Country {
  id: number;
  countryName: string;
}

interface NewsItem {
  id: number;
  title: string;
  description: string;
  priceCountry: number;
}

const FormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .min(8, "Phone number is too short")
    .regex(/^\d+$/, "Phone must contain only numbers"),
  countries: z
    .array(
      z.object({
        id: z.string().min(1, "Country is required"),
        name: z.string().optional(),
      })
    )
    .min(1, "Please select at least one country"),
  cardNumber: z
    .string()
    .min(16, "Invalid card number")
    .max(30, "Invalid card number"),
  expirationDate: z
    .string()
    .min(5, "Invalid expiration date")
    .max(5, "Invalid expiration date"),
  cardCode: z.string().min(3, "Invalid CVC").max(4, "Invalid CVC"),
});

type FormValues = z.infer<typeof FormSchema>;

export default function NewsletterPage() {
  const params = useParams();
  const router = useRouter();
  const newsId = params?.id as string;
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [countryFields, setCountryFields] = useState([0]);
  const [price, setPrice] = useState(0);
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    getValues,
    watch,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      countries: [],
      cardNumber: "",
      expirationDate: "",
      cardCode: "",
    },
  });

  const watchedCountries = watch(
    countryFields.map((index) => `countries.${index}` as const)
  );

  useEffect(() => {
    const selectedCount = watchedCountries.filter((c) => c?.id).length;
    setPrice(selectedCount * (newsItem?.priceCountry || 0));
  }, [watchedCountries, newsItem]);

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

  const onSubmit = async (data: FormValues) => {
    try {
      const selectedCountryIds = data.countries
        .filter((country) => country?.id)
        .map((country) => Number(country.id));

      if (selectedCountryIds.length === 0) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please select at least one country",
          confirmButtonColor: "#0A3161",
        });
        return;
      }

      const bookingData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        newsLetterId: Number(newsId),
        selectedCountryIds,
        cardNumber: data.cardNumber.replace(/\s+/g, ""),
        expirationDate: data.expirationDate,
        cardCode: data.cardCode,
      };

      await axios.post(`${url}News/create-payment`, bookingData);

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Booking submitted successfully!",
        confirmButtonColor: "#0A3161",
      });

      reset();
      router.push("/sucess");
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          axiosError?.response?.data?.message ||
          "Failed to process payment. Please try again",
        confirmButtonColor: "#0A3161",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [countriesRes, newsRes] = await Promise.all([
          axios.get(`${url}Country/get-all`),
          axios.get(`${url}News/get-by-id/${newsId}`),
        ]);
        setCountries(countriesRes.data);
        setNewsItem(newsRes.data);
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

    if (newsId) {
      fetchData();
    }
  }, [newsId, url]);

  useEffect(() => {
    AOS.init({ duration: 1500, once: false, offset: 100 });
    const timeout = setTimeout(() => AOS.refresh(), 1000);
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0A3161]"></div>
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-[#0A3161] text-xl">Newsletter item not found</div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white pb-14 px-5 md:px-12 overflow-hidden">
      <span className="block h-[50px]"></span>

      <div>
        <h1 className="text-[#0A3161] font-semibold text-4xl text-center mb-10">
          {newsItem.title}
        </h1>
        <p className="text-[#575757] text-center mb-8 max-w-3xl mx-auto">
          {newsItem.description}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-5xl mx-auto space-y-10"
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block font-semibold text-[#0A3161] mb-1"
            >
              First Name
            </label>
            <div className="relative">
              <User className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                {...register("firstName")}
                className={`w-full text-[#575757] pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.firstName
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
            </div>
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="lastName"
              className="block font-semibold text-[#0A3161] mb-1"
            >
              Last Name
            </label>
            <div className="relative">
              <User className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                id="lastName"
                type="text"
                placeholder="Enter your last name"
                {...register("lastName")}
                className={`w-full text-[#575757] pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.lastName
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
            </div>
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
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
              htmlFor="phoneNumber"
              className="block font-semibold text-[#0A3161] mb-1"
            >
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                id="phoneNumber"
                type="tel"
                placeholder="Enter your phone number"
                {...register("phoneNumber")}
                className={`w-full text-[#575757] pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.phoneNumber
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
        </div>

        {/* Countries Selection */}
        <div>
          <label className="block font-semibold text-[#0A3161] mb-3">
            Select Countries
          </label>
          {countryFields.map((index) => (
            <div key={index} className="mb-4">
              <select
                {...register(`countries.${index}.id` as const)}
                onChange={(e) => {
                  const selectedCountry = countries.find(
                    (c) => c.id === Number(e.target.value)
                  );
                  if (selectedCountry) {
                    setValue(`countries.${index}`, {
                      id: e.target.value,
                      name: selectedCountry.countryName,
                    });
                  }
                }}
                className={`w-full text-[#575757] px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.countries?.[index]
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.countryName}
                  </option>
                ))}
              </select>
              {errors.countries?.[index] && (
                <p className="text-red-500 text-sm mt-1">
                  Please select a country
                </p>
              )}
            </div>
          ))}
          {errors.countries && !errors.countries[0] && (
            <p className="text-red-500 text-sm mt-1">
              Please select at least one country
            </p>
          )}
          <button
            type="button"
            onClick={addCountryField}
            className="text-blue-600 underline mt-3 font-semibold cursor-pointer hover:text-blue-800 transition-colors"
          >
            Add Country
          </button>
        </div>

        {/* Payment Information */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Card Number */}
          <div>
            <label
              htmlFor="cardNumber"
              className="block font-semibold text-[#0A3161] mb-1"
            >
              Card Number
            </label>
            <div className="relative">
              <CreditCard className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                id="cardNumber"
                type="text"
                placeholder="4111111111111111"
                maxLength={30}
                {...register("cardNumber")}
                className={`w-full text-[#575757] pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.cardNumber
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
            </div>
            {errors.cardNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.cardNumber.message}
              </p>
            )}
          </div>

          {/* Expiration Date */}
          <div>
            <label
              htmlFor="expirationDate"
              className="block font-semibold text-[#0A3161] mb-1"
            >
              Expiration Date (MM/YY)
            </label>
            <div className="relative">
              <Calendar className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                id="expirationDate"
                type="text"
                placeholder="12/25"
                maxLength={5}
                {...register("expirationDate")}
                className={`w-full text-[#575757] pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.expirationDate
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
            </div>
            {errors.expirationDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.expirationDate.message}
              </p>
            )}
          </div>

          {/* CVC */}
          <div className="md:col-span-2">
            <label
              htmlFor="cardCode"
              className="block font-semibold text-[#0A3161] mb-1"
            >
              CVC
            </label>
            <div className="relative max-w-[200px]">
              <Lock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                id="cardCode"
                type="text"
                placeholder="123"
                maxLength={4}
                {...register("cardCode")}
                className={`w-full text-[#575757] pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.cardCode
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
            </div>
            {errors.cardCode && (
              <p className="text-red-500 text-sm mt-1">
                {errors.cardCode.message}
              </p>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="max-w-3xl p-3 text-[#0A3161] rounded-md mx-auto space-y-2 border border-[#1877F2] min-h-[100px]">
          <h2 className="font-semibold text-2xl">Summary</h2>
          <div className="flex justify-between items-center border-b border-gray-400 pb-1">
            <p>{newsItem?.title}</p>
            <span>${price}</span>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-bold text-xl">Total</p>
            <span>${price}</span>
          </div>
        </div>

        <div className="md:col-span-2 mt-5 max-w-3xl mx-auto">
          <button
            type="submit"
            className="w-full bg-[#0A3161] cursor-pointer text-white py-5 rounded-md hover:bg-[#092b54] transition"
          >
            Process Payment
          </button>
        </div>
      </form>
    </div>
  );
}
