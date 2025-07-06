"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ImagePlus } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

interface FormData {
  Name: string;
  Description: string;
  Photo: File | null;
}

interface Props {
  onChange: (data: FormData) => void;
  data: FormData;
}

export default function AboutTap({ data, onChange }: any) {
  const cleanedData = { ...data };
  delete cleanedData.headerButtonText;
  delete cleanedData.subtitle;
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

  const image = watch("Photo");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const watchedValues = watch();

  const isFormEmpty =
    !watchedValues.Name && !watchedValues.Description && !watchedValues.Photo;

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

  const url = process.env.NEXT_PUBLIC_BASE_URL;

  const onSubmit = async (formValues: FormData) => {
    try {
      const response = await axios.post(
        `${url}AboutUsValue/add-aboutusValue`,
        formValues,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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

          <div>
            <label
              htmlFor="header-image"
              className="flex flex-col items-center justify-center gap-2 border border-[#91abe2] cursor-pointer rounded-md shadow-md p-4 text-center hover:bg-blue-50 transition"
            >
              <span className="font-semibold text-[#0A3161]">
                {image ? "Change Image" : "Upload Header Background"}
              </span>
              <ImagePlus className="w-10 h-10 text-[#0A3161]" />
              {image && (
                <p className="text-sm text-gray-600">
                  Selected file: {image.name}
                </p>
              )}
            </label>

            <Controller
              control={control}
              name="Photo"
              render={({ field }) => (
                <input
                  type="file"
                  accept="image/*"
                  id="header-image"
                  className="hidden"
                  onChange={(e) => {
                    const file =
                      e.target.files && e.target.files.length > 0
                        ? e.target.files[0]
                        : null;
                    field.onChange(file);
                    handleFormChange();
                  }}
                />
              )}
            />

            {image && (
              <div className="mt-4 flex items-center gap-4">
                <a
                  href={URL.createObjectURL(image)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-[150px] h-[150px] rounded-full overflow-hidden border block"
                >
                  <Image
                    src={URL.createObjectURL(image)}
                    alt="Selected"
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
