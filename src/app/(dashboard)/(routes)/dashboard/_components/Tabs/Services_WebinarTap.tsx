"use client";

import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

interface FormData {
  title: string;
  description: string;
  priceIndividual: string;
}

export default function Services_WebinarTap({ data, onChange }: any) {
  const cleanedData = { ...data };
  delete cleanedData.priceCountry;
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting }, // ⬅️ لمراقبة حالة الإرسال
  } = useForm<FormData>({
    defaultValues: data,
  });

  const watchedValues = watch(); // ⬅️ مراقبة القيم

  const url = process.env.NEXT_PUBLIC_BASE_URL;

  const handleFormChange = () => {
    const currentValues = watch();
    onChange(currentValues);
  };

  const isFormEmpty =
    !watchedValues.title &&
    !watchedValues.description &&
    !watchedValues.priceIndividual;

  const onSubmit = async (formValues: FormData) => {
    try {
      const response = await axios.post(
        `${url}Webinar/add-webinar`,
        formValues,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message || "Added successfully");

      const emptyValues: FormData = {
        title: "",
        description: "",
        priceIndividual: "",
      };
      onChange(emptyValues);
      setValue("title", "");
      setValue("description", "");
      setValue("priceIndividual", "");
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
        Services Webinar
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
              {...register("title")}
              type="text"
              className="w-full border border-[#91abe2] rounded-md text-[#575757] p-3 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-[#0A3161]">
              Subtitle
            </label>
            <input
              {...register("description")}
              type="text"
              className="w-full border border-[#91abe2] rounded-md text-[#575757] p-3 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-[#0A3161]">
              Price 
            </label>
            <input
              {...register("priceIndividual")}
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
