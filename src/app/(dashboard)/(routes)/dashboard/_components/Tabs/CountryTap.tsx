"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ImagePlus } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

interface TeamFormData {
  countryName: string;
}

interface TabProps {
  tabName: string;
  data: {
    title: string;
    subtitle: string;
    headerButtonText: string;
    image: File | null;
  };
  onChange: (data: any) => void;
}

export default function CountryTap({ tabName, data, onChange }: TabProps) {
  const url = "https://glocalapiv2.runasp.net/api/";
  const { control, register, handleSubmit, watch, setValue, reset } =
    useForm<TeamFormData>({
      defaultValues: {
        countryName: "",
      },
    });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formValues: TeamFormData) => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("countryName", formValues.countryName);

      const response = await axios.post(`${url}Country/add-country`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success("Country added successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        reset();
      }
    } catch (error) {
      console.error("Error adding country:", error);
      toast.error("Failed to add country. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-[#0A3161] text-2xl font-semibold">Add Country</h2>

      <form
        className="mx-auto py-6 space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block mb-1 font-semibold text-[#0A3161]">
              Country
            </label>
            <input
              {...register("countryName")}
              type="text"
              placeholder="Enter country name"
              className="w-full border border-[#91abe2] rounded-md text-[#575757] p-3 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-9 bg-[#0A3161] mx-auto block text-white px-6 py-2 rounded-md cursor-pointer hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Adding..." : "Add Client"}
        </button>
      </form>
    </div>
  );
}
