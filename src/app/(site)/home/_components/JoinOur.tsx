"use client";

import React, { useState } from "react";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

interface SubscribeData {
  email: string;
}

function JoinOur() {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const [emailValue, setEmailValue] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SubscribeData>();

  const onSubmit = async (data: SubscribeData) => {
    try {
      // استخدام البيانات من الـ state المحلي إذا كانت البيانات من النموذج فارغة
      const emailToUse = data.email || emailValue;

      // التحقق من البيانات قبل الإرسال
      if (!emailToUse) {
        console.error("Email is missing from both form data and state");
        toast.error("Email is required");
        return;
      }

      const trimmedEmail = emailToUse.trim();
      if (trimmedEmail === "") {
        console.error("Email is empty after trimming");
        toast.error("Email is required");
        return;
      }

      // التحقق من صحة البريد الإلكتروني
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(trimmedEmail)) {
        console.error("Invalid email format");
        toast.error("Invalid email address");
        return;
      }

      // تنظيف البيانات قبل الإرسال
      const cleanData = {
        email: trimmedEmail,
      };

      // إرسال البيانات
      const response = await axios.post(
        `${url}Subscribe/add-subscribe`,
        cleanData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );

      // التحقق من الاستجابة
     if (response.status === 200 && response.data?.statusCode === 200) {
  toast.success("✅ Thank you for subscribing!");
  reset();
  setValue("email", "");
  setEmailValue("");
} else {
  toast.error("❌ Subscription failed. Please try again later.");
}
    } catch (error: any) {
      if (error.code === "ECONNABORTED") {
        toast.error("Request timeout. Please try again.");
      } else if (error.response?.status === 404) {
        toast.error("API endpoint not found. Please contact support.");
      } else if (error.response?.status === 400) {
        const errorMessage =
          error.response?.data?.message || "Invalid data sent to server";
        toast.error(errorMessage);
      } else if (error.response?.status === 500) {
        toast.error("Server error. Please try again later.");
      } else {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "An error occurred while subscribing.";
        toast.error(errorMessage);
      }
    }
  };

  return (
    <>
      <div className="w-full min-h-[300px] flex-col relative  bg-gradient-to-r from-[#0A3161] to-[#1565C7] lg:flex hidden justify-center items-center">
        <div className="text-white font-medium text-xl w-[500px]">
          <h1 className="text-center text-4xl mb-2">Join Our Insider Circle</h1>
          <p className="text-sm text-center leading-relaxed ">
            Be the first to know about our news, events, and exclusive updates.
            Enter your email and get connected to what matters.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[60%] absolute h-[75px] bg-white min-w-[350px] border border-[#2f77eb77] left-1/2  -translate-x-1/2 bottom-[-35px] rounded-sm"
          noValidate
        >
          <div className="flex items-center justify-between   w-full h-[75px] py-2 px-4">
            <div className="flex gap-2 items-center w-full">
              <span className="h-[40px] w-[50px] border border-[#B3BFCE] flex justify-center items-center rounded-sm">
                <Mail strokeWidth={3} className="text-[#092C57]" />
              </span>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                  setValueAs: (value) => value.trim(),
                })}
                type="email"
                placeholder="youremail123@gmail.com"
                className="px-2 py-1 focus:outline-none text-[#57656C] w-full"
                value={emailValue}
                onChange={(e) => {
                  setEmailValue(e.target.value);
                  setValue("email", e.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`rounded-sm text-sm group flex items-center text-white px-6 py-2 shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#0A3161] cursor-pointer"
              }`}
            >
              {isSubmitting ? "Subscribing..." : "SUBSCRIBE"}
            </button>
          </div>
          {errors.email && (
            <div className="absolute top-full left-0 right-0 bg-red-100 text-red-600 text-xs px-4 py-1 rounded-b">
              {errors.email.message}
            </div>
          )}
        </form>
      </div>
      <div className="space-y-6 w-full flex-col relative min-h-[340px] bg-gradient-to-r from-[#0A3161] to-[#1565C7] lg:hidden flex justify-center items-center rounded-md">
        <div className="text-white font-medium text-xl ">
          <h1 className="text-center text-4xl mb-2">Join Our Insider Circle</h1>
          <p className="text-sm text-center leading-relaxed w-[330px]  ">
            Be the first to know about our news, events, and exclusive updates.
            Enter your email and get connected to what matters.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 w-full flex flex-col items-center"
          noValidate
        >
          <div className="flex gap-2 items-center bg-white min-w-[350px]  rounded-sm py-2 px-4 ">
            <span className="">
              <Mail strokeWidth={3} className="text-[#092C57]" />
            </span>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
                setValueAs: (value) => value.trim(),
              })}
              type="email"
              placeholder="youremail123@gmail.com"
              className="px-2 py-1 focus:outline-none text-[#57656C] flex-1 bg-transparent"
              value={emailValue}
              onChange={(e) => {
                setEmailValue(e.target.value);
                setValue("email", e.target.value);
              }}
            />
          </div>
          {errors.email && (
            <div className="text-red-100 text-xs text-center">
              {errors.email.message}
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`py-3 ml-2 px-4 min-w-[350px] rounded-sm text-sm group flex justify-center items-center text-white shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#0A3161] cursor-pointer"
            }`}
          >
            {isSubmitting ? "Subscribing..." : "SUBSCRIBE"}
          </button>
        </form>
      </div>
      <div className="w-full h-[75px] bg-white"></div>
    </>
  );
}

export default JoinOur;
