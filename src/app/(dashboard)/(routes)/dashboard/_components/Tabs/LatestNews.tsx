import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ImagePlus } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm, Controller } from "react-hook-form";

interface FormData {
  name: string;
  description: string;
  dateTime: Date | null;
  photo: File | null;
}

export default function LatestNews() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      description: "",
      dateTime: null,
      photo: null,
    },
  });

  const watchedValues = watch();
  const isFormEmpty =
    !watchedValues.name &&
    !watchedValues.description &&
    !watchedValues.dateTime;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const onSubmit = async (formData: FormData) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      if (formData.dateTime) {
        formDataToSend.append("dateTime", formData.dateTime.toISOString());
      }
      if (formData.photo) {
        formDataToSend.append("photo", formData.photo);
      }

      const url = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await axios.post(
        `${url}LatestNews/add-latestNews`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(response.data.message || "News added successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });

      // Reset form after successful submission
      reset({
        name: "",
        description: "",
        dateTime: null,
        photo: null,
      });
      setPreviewUrl(null);
    } catch (err: any) {
      toast.error(
        err.response?.data?.message ||
          "Failed to create news. Please try again.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
        }
      );
    }
  };

  return (
    <div>
      <h2 className="text-[#0A3161] text-2xl font-semibold">Latest News</h2>

      <form
        className="mx-auto py-6 space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-semibold text-[#0A3161]">
              News Title
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Enter news title"
              className="w-full border border-[#91abe2] rounded-md text-[#575757] p-3 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-[#0A3161]">
              Date
            </label>
            <Controller
              control={control}
              name="dateTime"
              rules={{ required: true }}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="MMMM d, yyyy"
                  placeholderText="Select date"
                  className="!w-full border border-[#91abe2] rounded-md text-[#575757] p-3 focus:outline-none"
                />
              )}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-semibold text-[#0A3161]">
              Description
            </label>
            <textarea
              {...register("description", { required: true })}
              placeholder="Enter news description"
              rows={4}
              className="w-full border border-[#91abe2] rounded-md text-[#575757] p-3 focus:outline-none resize-none"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="news-image"
              className="flex flex-col items-center justify-center gap-2 border border-[#91abe2] cursor-pointer rounded-md shadow-md p-4 text-center hover:bg-blue-50 transition"
            >
              <span className="font-semibold text-[#0A3161]">
                {watchedValues.photo ? "Change Image" : "Upload News Image"}
              </span>
              <ImagePlus className="w-10 h-10 text-[#0A3161]" />
              {watchedValues.photo && (
                <p className="text-sm text-gray-600">
                  Selected file: {watchedValues.photo.name}
                </p>
              )}
            </label>

            <Controller
              control={control}
              name="photo"
              render={({ field }) => (
                <input
                  type="file"
                  id="news-image"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    field.onChange(file);
                    handleFileChange(e);
                  }}
                  className="hidden"
                />
              )}
            />

            {previewUrl && (
              <div className="mt-4 flex items-center gap-4">
                <div className="relative w-[150px] h-[150px] rounded-full overflow-hidden border">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    reset({ ...watchedValues, photo: null });
                    setPreviewUrl(null);
                  }}
                  className="text-red-600 hover:underline text-sm cursor-pointer"
                >
                  Remove Image
                </button>
              </div>
            )}
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
