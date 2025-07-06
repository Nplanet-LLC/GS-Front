"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

interface FormData {
  Name: string;
  Description: string;
  Photo: File | null; // ستُهمل في الإرسال
}

interface Props {
  onChange: (data: FormData) => void;
  data: FormData;
}

export default function AboutusSectionTap({ data, onChange }: any) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<FormData>({
    defaultValues: data,
  });

  const watchedValues = watch();
  const image = watchedValues.Photo;

  const isFormEmpty = !watchedValues.Name && !watchedValues.Description;

  const handleFormChange = () => {
    const currentValues = watch();
    onChange(currentValues);
  };

  const url = process.env.NEXT_PUBLIC_BASE_URL;

  const onSubmit = async (formValues: FormData) => {
    try {
      const payload = {
        name: formValues.Name,
        description: formValues.Description,
      };

      const response = await axios.post(
        `${url}AboutUsSection/add-aboutusSection`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message || "Added successfully");

      const emptyValues: FormData = {
        Name: "",
        Description: "",
        Photo: null,
      };
      onChange(emptyValues);
      setValue("Name", "");
      setValue("Description", "");
      setValue("Photo", null);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "An error occurred while sending.";
      toast.error(errorMessage);
      console.error(
        "Error sending data:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div>
      <h2 className="text-[#0A3161] text-2xl font-semibold">
        About Information
      </h2>

      <form
        className="mx-auto py-6 space-y-6"
        onChange={handleFormChange}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-semibold text-[#0A3161]">
              Title
            </label>
            <input
              {...register("Name")}
              type="text"
              className="w-full border border-[#91abe2] rounded-md text-[#575757] p-3 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-[#0A3161]">
              Subtitle
            </label>
            <input
              {...register("Description")}
              type="text"
              className="w-full border border-[#91abe2] rounded-md text-[#575757] p-3 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isFormEmpty || isSubmitting}
          className={`mt-9 mx-auto block text-white px-6 py-2 rounded-md transition ${
            isFormEmpty || isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#0A3161] hover:scale-105 cursor-pointer"
          }`}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
