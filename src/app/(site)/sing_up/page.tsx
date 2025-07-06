"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const signupSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    phone: z
      .string()
      .min(8, "Phone number must be at least 8 digits")
      .max(15, "Phone number too long"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpForm = z.infer<typeof signupSchema>;

function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onSubmit = (data: SignUpForm) => {
    console.log("Sign up data:", data);
  };

  console.log("URL", process.env.NEXT_PUBLIC_BASE_URL);

  return (
    <div className="w-full flex flex-col items-center justify-center bg-white px-4 py-12">
      <Link
        href="/login"
        className="flex items-center text-[#0A3161] hover:text-[#3f5269] mb-6 "
      >
        <ArrowLeft className="mr-2" size={20} />
        Back to login
      </Link>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xl p-8 rounded-xl space-y-6 bg-[#f9fafb] px-4  shadow-md"
      >
        <div className="space-x-3">
          <h2 className="text-3xl font-bold text-[#0A3161] mb-2">Sign Up</h2>
          <p className="text-xl text-[#0A3161] mb-2">
            Let’s get you all st up so you can access your personal account.
          </p>
        </div>

        {/* First & Last Name */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full">
            <label className="text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              {...register("firstName")}
              className="p-3 border border-gray-300 rounded-lg text-[#575757] focus:outline-none"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              {...register("lastName")}
              className="p-3 border border-gray-300 rounded-lg text-[#575757] focus:outline-none"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        {/* Email & Phone */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="p-3 border border-gray-300 rounded-lg text-[#575757] focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="tel"
              {...register("phone")}
              className="p-3 border border-gray-300 rounded-lg text-[#575757] focus:outline-none"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col relative">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className="p-3 border border-gray-300 rounded-lg text-[#575757] focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col relative">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Confirm Password
          </label>
          <input
            type={showConfirm ? "text" : "password"}
            {...register("confirmPassword")}
            className="p-3 border border-gray-300 rounded-lg text-[#575757] focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-[38px] text-gray-500"
          >
            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3  bg-[#0A3161] cursor-pointer text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
        >
          Sign Up
        </button>
      </form>

      <Link
        href="/login"
        className="text-[#0A3161] cursor-pointer transition-all duration-300 hover:text-[#3f5269] mt-6"
      >
        Already have an account? Login
      </Link>
    </div>
  );
}

export default SignupPage;
