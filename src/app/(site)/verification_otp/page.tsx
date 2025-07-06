"use client";

import React, { useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const OTPVerificationPage = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (!/^[0-9a-zA-Z]*$/.test(value)) return; // يمنع غير الحروف/الأرقام

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 4) {
      alert("Please complete the 4-digit code");
      return;
    }
    console.log("Entered OTP:", code);
    // Send `code` to server here
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
          onSubmit={handleSubmit}
          className="bg-[#f9fafb] shadow-md rounded-xl p-6 space-y-6"
        >
          <h2 className="text-2xl font-bold text-[#0A3161]">
            OTP Verification
          </h2>
          <p className="text-gray-600 text-sm">
            Enter the verification code we just sent on your email address.
          </p>

          {/* OTP Inputs */}
          <div className="flex justify-between gap-2">
            {[0, 1, 2, 3].map((i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                ref={otpRefs[i]}
                value={otp[i]}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="w-1/4 text-center text-xl p-3 border border-gray-300 rounded-lg focus:outline-none text-[#0A3161] caret-[#0A3161]"
              />
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 cursor-pointer bg-[#0A3161] text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPVerificationPage;
