"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// ✅ سكيم فحص الإيميل
const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = (data: ForgotPasswordForm) => {
    console.log("Sending password reset email to:", data.email);
    // هنا تقدر ترسل الطلب للسيرفر
  };

  return (
    <div className="w-full flex flex-col items-center justify-center px-4 py-12 bg-white">
      <div className="w-full max-w-md px-4">
        {/* رجوع لتسجيل الدخول */}
        <Link
          href="/login"
          className="flex items-center text-[#0A3161] hover:text-[#3f5269] mb-6"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to login
        </Link>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#f9fafb] shadow-md rounded-xl p-6 space-y-6"
        >
          <h2 className="text-2xl font-bold text-[#0A3161]">Forgot Password</h2>
          <p className="text-gray-600 text-sm">
            Don't worry! It occurs. Please enter the email address linked with
            your account.
          </p>

          {/* Email field */}
          <div className="flex flex-col">
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

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 felx-col cursor-pointer bg-[#0A3161] text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
          >
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
