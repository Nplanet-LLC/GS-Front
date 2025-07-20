"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const url = process.env.NEXT_PUBLIC_BASE_URL;

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = (data: LoginForm) => {
    setLoading(true);

    axios
      .post(`${url}Account/Login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const token = response.data.token;
        Cookies.set("token", token, { expires: 7 });
        toast.success("logged in successfully");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      })
      .catch((error) => {
        toast.error("Failed to log in");
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-[#f9fafb] px-4 py-12">
      <ToastContainer />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xl p-8 rounded-xl space-y-6"
      >
        <div className="space-x-3">
          <h2 className="text-3xl font-bold text-[#0A3161] mb-2">Login</h2>
          <p className="text-xl text-[#0A3161] mb-2">
            Login to access your travelwise account
          </p>
        </div>

        {/* Email Field */}
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="p-3 border border-gray-300 rounded-lg text-[#575757] focus:outline-none"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col space-y-1 relative">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className="p-3 border border-gray-300 rounded-lg text-[#575757] focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] text-gray-500 cursor-pointer"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
          {/* <Link
            href="/forgot_password"
            className="text-sm text-[#0A3161] mt-2 hover:text-[#3f5269] w-fit"
          >
            Forgot Password?
          </Link> */}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-[#0A3161] cursor-pointer text-white font-semibold rounded-lg transition-all duration-300 transform animate-fade-in hover:scale-105 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <span className="animate-spin border-4 border-white border-t-transparent rounded-full w-6 h-6"></span>
          ) : (
            "Login"
          )}
        </button>
      </form>

      {/* <Link
        href="/sing_up"
        className="text-[#0A3161] cursor-pointer transition-all duration-300 transform hover:text-[#3f5269]"
      >
        Don’t have an account? Sign up
      </Link> */}
    </div>
  );
}

export default LoginPage;
