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
  PriceCompany: string;
  image: File | null;
}

interface Props {
  onChange: (data: any) => void;
  data: FormData;
}

export default function ServicesTap({ data, onChange }: any) {
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

  const url = process.env.NEXT_PUBLIC_BASE_URL;

  const handleFormChange = () => {
    const currentValues = watch();
    onChange(currentValues);
  };

  const isFormEmpty =
    !watchedValues.title &&
    !watchedValues.subtitle &&
    !watchedValues.PriceCompany;

  const onSubmit = async (formValues: FormData) => {
    const formData = new FormData();
    formData.append("Name", formValues.title);
    formData.append("Description", formValues.subtitle);
    formData.append("PriceCompany", formValues.PriceCompany);

    if (formValues.image) {
      formData.append("Photo", formValues.image);
    }

    try {
      const response = await axios.post(`${url}Service/add-service`, formData, {
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
        PriceCompany: "",
        image: null,
      };
      onChange(emptyValues);
      setValue("title", "");
      setValue("subtitle", "");
      setValue("PriceCompany", "");
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
      <h2 className="text-[#0A3161] text-2xl font-semibold">
        Services Information
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
              {...register("subtitle")}
              type="text"
              className="w-full border border-[#91abe2] rounded-md text-[#575757] p-3 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-[#0A3161]">
              Price Company
            </label>
            <input
              {...register("PriceCompany")}
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
              name="image"
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
                    setValue("image", null);
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
