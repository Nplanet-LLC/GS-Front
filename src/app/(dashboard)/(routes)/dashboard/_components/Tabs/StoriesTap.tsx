"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ImagePlus } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

interface FormData {
  Name: string;
  SubTitle: string;
  Description: string;
  Photo: File | null;
  LogoPhoto: File | null;
}

interface Props {
  onChange: (data: any) => void;
  data: FormData;
}

export default function StoriesTap({ data, onChange }: any) {
  const { control, register, handleSubmit, watch, setValue } =
    useForm<FormData>({
      defaultValues: data,
    });

  const photo = watch("Photo");
  const logoPhoto = watch("LogoPhoto");

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const url = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    if (photo) {
      const url = URL.createObjectURL(photo);
      setPhotoPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPhotoPreview(null);
    }
  }, [photo]);

  useEffect(() => {
    if (logoPhoto) {
      const url = URL.createObjectURL(logoPhoto);
      setLogoPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setLogoPreview(null);
    }
  }, [logoPhoto]);

  const handleFormChange = () => {
    const currentValues = watch();
    onChange(currentValues);
  };
  const onSubmit = async (formValues: FormData) => {
    try {
      const formData = new FormData();
      formData.append("Name", formValues.Name);
      formData.append("SubTitle", formValues.SubTitle);
      formData.append("Description", formValues.Description);

      if (formValues.Photo) {
        formData.append("Photo", formValues.Photo);
      }

      if (formValues.LogoPhoto) {
        formData.append("LogoPhoto", formValues.LogoPhoto);
      }

      const response = await axios.post(`${url}Story/add-story`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(response.data.message || "Added successfully");

      const emptyValues: FormData = {
        Name: "",
        SubTitle: "",
        Description: "",
        Photo: null,
        LogoPhoto: null,
      };

      onChange(emptyValues);
      for (const key in emptyValues) {
        setValue(key as keyof FormData, emptyValues[key as keyof FormData]);
      }
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
      <h2 className="text-[#0A3161] text-2xl font-semibold">
        Stories Information
      </h2>

      <form
        className="mx-auto py-6 space-y-6"
        onChange={handleFormChange}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-semibold text-[#0A3161]">
              Name
            </label>
            <input
              {...register("Name")}
              type="text"
              className="w-full border border-[#91abe2] rounded-md text-[#575757] p-3 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-[#0A3161]">
              SubTitle
            </label>
            <input
              {...register("SubTitle")}
              type="text"
              className="w-full border border-[#91abe2] rounded-md text-[#575757] p-3 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-[#0A3161]">
              Description
            </label>
            <input
              {...register("Description")}
              type="text"
              className="w-full border border-[#91abe2] rounded-md text-[#575757] p-3 focus:outline-none"
            />
          </div>

          {/* رفع صورة Photo */}
          <div>
            <label
              htmlFor="photo"
              className="flex flex-col items-center justify-center gap-2 border border-[#91abe2] cursor-pointer rounded-md shadow-md p-4 text-center hover:bg-blue-50 transition"
            >
              <span className="font-semibold text-[#0A3161]">
                {photo ? "Change Photo" : "Upload Main Photo"}
              </span>
              <ImagePlus className="w-10 h-10 text-[#0A3161]" />
              {photo && (
                <p className="text-sm text-gray-600">Selected: {photo.name}</p>
              )}
            </label>

            <Controller
              control={control}
              name="Photo"
              render={({ field }) => (
                <input
                  type="file"
                  accept="image/*"
                  id="photo"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    field.onChange(file);
                    handleFormChange();
                  }}
                />
              )}
            />

            {photo && photoPreview && (
              <div className="mt-4 flex items-center gap-4">
                <a
                  href={photoPreview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-[150px] h-[150px] rounded-full overflow-hidden border block"
                >
                  <Image
                    src={photoPreview}
                    alt="Main"
                    fill
                    className="object-cover rounded-xl"
                  />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setValue("Photo", null);
                    handleFormChange();
                  }}
                  className="text-red-600 hover:underline text-sm cursor-pointer"
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>

          {/* رفع صورة LogoPhoto */}
          <div>
            <label
              htmlFor="logo"
              className="flex flex-col items-center justify-center gap-2 border border-[#91abe2] cursor-pointer rounded-md shadow-md p-4 text-center hover:bg-blue-50 transition"
            >
              <span className="font-semibold text-[#0A3161]">
                {logoPhoto ? "Change Logo" : "Upload Logo"}
              </span>
              <ImagePlus className="w-10 h-10 text-[#0A3161]" />
              {logoPhoto && (
                <p className="text-sm text-gray-600">
                  Selected: {logoPhoto.name}
                </p>
              )}
            </label>

            <Controller
              control={control}
              name="LogoPhoto"
              render={({ field }) => (
                <input
                  type="file"
                  accept="image/*"
                  id="logo"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    field.onChange(file);
                    handleFormChange();
                  }}
                />
              )}
            />

            {logoPhoto && logoPreview && (
              <div className="mt-4 flex items-center gap-4">
                <a
                  href={logoPreview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-[150px] h-[150px] rounded-full overflow-hidden border block"
                >
                  <Image
                    src={logoPreview}
                    alt="Logo"
                    fill
                    className="object-cover rounded-xl"
                  />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setValue("LogoPhoto", null);
                    handleFormChange();
                  }}
                  className="text-red-600 hover:underline text-sm cursor-pointer"
                >
                  Remove Logo
                </button>
              </div>
            )}
          </div>
        </div>

        {/* زر حفظ التغييرات */}
        <button
          type="submit"
          className="mt-9 bg-[#0A3161] mx-auto block text-white px-6 py-2 rounded-md cursor-pointer hover:scale-105 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
