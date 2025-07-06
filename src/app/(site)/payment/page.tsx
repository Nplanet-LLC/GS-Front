"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AOS from "aos";
import "aos/dist/aos.css";
import { CreditCard, User, CalendarClock, ShieldCheck } from "lucide-react";
import SelectCountry from "./_components/SelectCountry";
import Swal from "sweetalert2";
import Image from "next/image";

const FormSchema = z.object({
  NameOnCard: z.string().min(1, "NameOnCard is required"),
  CardNumber: z.string().min(1, "CardNumber is required"),
  ExpireDate: z.string().min(1, "ExpireDate is required"),
  CVC: z.string().min(1, "CVC  is required"),
});

type FormValues = z.infer<typeof FormSchema>;

export default function NewsletterPage() {
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
  });
  const [paymentMethod, setPaymentMethod] = useState("card");

  const onSubmit = (data: any) => {
    console.log("data:", data);

    const formData = {
      ...data,
      paymentMethod,
    };

    console.log("Form data to submit:", formData);

    reset();
  };

  return (
    <div className="w-full bg-white pb-14 px-5 md:px-12 overflow-hidden">
      <span className="block h-[50px]"></span>

      <div className="mb-10">
        <h1 className="text-[#0A3161] font-semibold text-4xl text-center mb-10">
          Payment
        </h1>
        <div className="max-w-3xl p-3 text-[#0A3161]  rounded-md mx-auto space-y-2 border border-[#1877F2] min-h-[100px]">
          <h2 className=" font-semibold text-2xl">Summary</h2>
          <div className="flex justify-between items-center border-b border-gray-400 pb-1">
            <p>Newsletter Subscription </p>
            <span>100$</span>
          </div>
          <div className="flex justify-between items-center ">
            <p className="font-bold text-xl">Total</p>
            <span>100$</span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      {/* <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        {[
          { id: "paypal", label: "PayPal", icon: "/assets/image 9.svg" },
          {
            id: "apple",
            label: "Apple Pay",
            icon: "/assets/ApplePay.svg",
          },
          {
            id: "card",
            label: "Debit/Credit Card",
            icon: "/assets/CreditCard.svg",
          },
        ].map((method) => (
          <div
            key={method.id}
            onClick={() => setPaymentMethod(method.id)}
            className={`cursor-pointer border rounded-xl px-4 py-3 text-center flex flex-col items-center gap-2 transition duration-300 ${
              paymentMethod === method.id
                ? "border-[#0A3161] bg-[#0A3161]/5"
                : "border-gray-300 hover:border-[#0A3161]"
            }`}
          >
            <div className="w-12 h-12 rounded-full mb-2 relative">
              <Image
                src={method.icon}
                alt="true"
                loading="lazy"
                className="object-contain"
                fill
              />
            </div>

            <p className="text-[#0A3161] font-medium">{method.label}</p>

            <div className="mt-2 w-5 h-5 rounded-full border-2 border-[#0A3161] flex items-center justify-center">
              {paymentMethod === method.id && (
                <div className="w-2.5 h-2.5 bg-[#0A3161] rounded-full" />
              )}
            </div>
          </div>
        ))}
      </div> */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-5xl mx-auto space-y-10"
      >
        <div className="w-full  grid grid-cols-1 md:grid-cols-2 gap-10 ">
          {/* Full Name */}
          {/* <div>
            <label
              htmlFor="NameOnCard"
              className="block  font-semibold text-[#0A3161] mb-1"
            >
              Name on Card
            </label>
            <div className="relative">
              <User className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                id="NameOnCard"
                type="text"
                placeholder="Enter your full name"
                {...register("NameOnCard")}
                className={`w-full text-[#575757] pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.NameOnCard
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
            </div>
            {errors.NameOnCard && (
              <p className="text-red-500 text-sm mt-1">
                {errors.NameOnCard.message}
              </p>
            )}
          </div> */}

          {/* Company Name */}
          <div>
            <label
              htmlFor="CardNumber"
              className="block  font-semibold text-[#0A3161] mb-1"
            >
              Card Number
            </label>
            <div className="relative">
              <CreditCard className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                id="CardNumber"
                type="text"
                placeholder="Enter your company name"
                {...register("CardNumber")}
                className={`w-full text-[#575757] pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.CardNumber
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
            </div>
            {errors.CardNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.CardNumber.message}
              </p>
            )}
          </div>

          {/* ExpireDate */}
          <div>
            <label
              htmlFor="ExpireDate"
              className="block  font-semibold text-[#0A3161] mb-1"
            >
              Expire Date
            </label>
            <div className="relative">
              <CalendarClock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                id="ExpireDate"
                type="ExpireDate"
                placeholder="Enter your ExpireDate"
                {...register("ExpireDate")}
                className={`w-full text-[#575757] pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.ExpireDate
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
            </div>
            {errors.ExpireDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.ExpireDate.message}
              </p>
            )}
          </div>
        </div>
        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block  font-semibold text-[#0A3161] mb-1"
          >
            CVC
          </label>
          <div className="relative">
            <ShieldCheck className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <input
              id="CVC"
              type="tel"
              placeholder="Enter your CVC number"
              {...register("CVC")}
              className={`w-full text-[#575757] pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
                errors.CVC
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
          </div>
          {errors.CVC && (
            <p className="text-red-500 text-sm mt-1">{errors.CVC.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 mt-5 max-w-3xl mx-auto">
          <button
            type="submit"
            className="w-full bg-[#0A3161] cursor-pointer text-white py-5 rounded-md hover:bg-[#092b54] transition"
          >
            Pay 155$
          </button>
        </div>
      </form>
    </div>
  );
}
