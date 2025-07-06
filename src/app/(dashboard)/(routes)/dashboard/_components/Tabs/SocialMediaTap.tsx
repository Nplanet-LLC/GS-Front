"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ImagePlus } from "lucide-react";

interface FormData {
  title: string;
  subtitle: string;
  headerButtonText: string;
  image: File | null;
}

interface Props {
  onChange: (data: FormData) => void;
  data: FormData;
}

export default function SocialMedia({ data, onChange }: Props) {
  const { control, register, handleSubmit, watch, setValue } =
    useForm<FormData>({
      defaultValues: data,
    });

  const image = watch("image");
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

  const onSubmit = (formValues: FormData) => {
    console.log("Form Submitted:", formValues);
    onChange(formValues);
  };

  return (
    <div>
      <h2 className="text-[#0A3161] text-2xl font-semibold">
        Social MediaTap Information
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
              Header Button Text
            </label>
            <input
              {...register("headerButtonText")}
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
          className="mt-9 bg-[#0A3161] mx-auto block  text-white px-6 py-2 rounded-md cursor-pointer hover:scale-105 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
