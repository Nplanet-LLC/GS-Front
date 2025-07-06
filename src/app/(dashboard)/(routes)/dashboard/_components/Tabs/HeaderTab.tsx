"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ImagePlus } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

interface FormData {
  title: string;
  subtitle: string;
  headerButtonText: string;
  image: File | null;
}

interface HeaderTabProps {
  onChange: (data: FormData) => void;
  data: FormData;
}

export default function HeaderTab({ data, onChange }: HeaderTabProps) {
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<FormData>({
    defaultValues: data,
  });

  const image = watch("image");
  const watchedValues = watch();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [image]);

  const handleFormChange = () => {
    const currentValues = watch();
    onChange(currentValues);
  };

  const isFormEmpty =
    !watchedValues.title &&
    !watchedValues.subtitle &&
    !watchedValues.headerButtonText;

  const onSubmit = async (formValues: FormData) => {
    const formData = new FormData();
    formData.append("Titel", formValues.title);
    formData.append("Subtitle", formValues.subtitle);
    formData.append("TextButton", formValues.headerButtonText);

    if (formValues.image) {
      formData.append("Photo", formValues.image);
    }

    try {
      const response = await axios.post(`${url}Header/add-header`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // ✅ عرض رسالة نجاح
      toast.success(response.data.message || "Added successfully");

      // ✅ إعادة تعيين الحقول بعد النجاح
      const emptyValues: FormData = {
        title: "",
        subtitle: "",
        headerButtonText: "",
        image: null,
      };
      onChange(emptyValues);
      setValue("title", "");
      setValue("subtitle", "");
      setValue("headerButtonText", "");
      setValue("image", null);
      setPreviewUrl(null);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "An error occurred while sending.";
      toast.error(errorMessage);

      console.error(
        "An error occurred while sending.",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div>
      <h2 className="text-[#0A3161] text-2xl font-semibold">Header Section</h2>

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
              {...register("subtitle")}
              type="text"
              className="w-full border border-[#91abe2] rounded-md text-[#575757] p-3 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-[#0A3161]">
              Description
            </label>
            <input
              {...register("headerButtonText")}
              type="text"
              className="w-full border border-[#91abe2] rounded-md text-[#575757] p-3 focus:outline-none"
            />
          </div>
        </div>

        {/* زر حفظ التغييرات */}
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
