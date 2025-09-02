"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import axios from "axios";

// Schema validation
const changePasswordSchema = z
  .object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ChangePasswordForm = z.infer<typeof changePasswordSchema>;

const AdminChangePasswordPage = () => {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: ChangePasswordForm) => {
    setLoading(true);
    setMessage("");
    setSuccess(false);

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

      const res = await axios.post(
        `${baseURL}account/change-password`,
        {
          email: data.email,
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(res.data.message || "Password changed successfully");
      setSuccess(true);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Something went wrong.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center px-4 py-12 bg-white">
      <div className="w-full max-w-md px-4">
        <Link
          href="/dashboard"
          className="flex items-center text-[#0A3161] hover:text-[#3f5269] mb-6"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Dashboard
        </Link>

        {message && (
          <p
            className={`mb-4 text-center ${
              success ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#f9fafb] shadow-md rounded-xl p-6 space-y-6"
        >
          <h2 className="text-2xl font-bold text-[#0A3161]">Change User Password</h2>

          {/* Email field */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
              User Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="p-3 border border-gray-300 rounded-lg text-[#575757] focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* New Password */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              {...register("newPassword")}
              className="p-3 border border-gray-300 rounded-lg text-[#575757] focus:outline-none"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              className="p-3 border border-gray-300 rounded-lg text-[#575757] focus:outline-none"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#0A3161] text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
            disabled={loading}
          >
            {loading ? "Updating..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminChangePasswordPage;
