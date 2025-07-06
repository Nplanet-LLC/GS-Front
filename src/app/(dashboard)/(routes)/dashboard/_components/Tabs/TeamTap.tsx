"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ImagePlus } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

interface TeamFormData {
  name: string;
  description: string;
  jop: string;
  Address: string;
  image: File | null;
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

export default function TeamTap({ tabName, data, onChange }: TabProps) {
  const { control, register, handleSubmit, watch, setValue, reset } =
    useForm<TeamFormData>({
      defaultValues: {
        name: "",
        description: "",
        jop: "",
        Address: "",
        image: null,
      },
    });

  const image = watch("image");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formValues: TeamFormData) => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("Name", formValues.name);
      formData.append("Description", formValues.description);
      formData.append("Jop", formValues.jop);
      formData.append("Address", formValues.Address);
      if (formValues.image) {
        formData.append("Photo", formValues.image);
      }

      const response = await axios.post(
        "https://glocalapiv2.runasp.net/api/Team/add-team",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Client added successfully!", {
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
      console.error("Error adding team member:", error);
      toast.error("Failed to add Client. Please try again.", {
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
      <h2 className="text-[#0A3161] text-2xl font-semibold">Add Client</h2>

      <form
        className="mx-auto py-6 space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-semibold text-[#0A3161]">
              Name
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="Enter member name"
              className="w-full border border-[#91abe2] rounded-md text-[#575757] p-3 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-[#0A3161]">
              Job Title
            </label>
            <input
              {...register("jop")}
              type="text"
              placeholder="Enter job title"
              className="w-full border border-[#91abe2] rounded-md text-[#575757] p-3 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-semibold text-[#0A3161]">
              Address
            </label>
            <input
              {...register("Address")}
              type="text"
              placeholder="Enter job title"
              className="w-full border border-[#91abe2] rounded-md text-[#575757] p-3 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-semibold text-[#0A3161]">
              Description
            </label>
            <textarea
              {...register("description")}
              placeholder="Enter member description"
              rows={4}
              className="w-full border border-[#91abe2] rounded-md text-[#575757] p-3 focus:outline-none resize-none"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="member-image"
              className="flex flex-col items-center justify-center gap-2 border border-[#91abe2] cursor-pointer rounded-md shadow-md p-4 text-center hover:bg-blue-50 transition"
            >
              <span className="font-semibold text-[#0A3161]">
                {image ? "Change Photo" : "Upload Client Photo"}
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
                  id="member-image"
                  className="hidden"
                  onChange={(e) => {
                    const file =
                      e.target.files && e.target.files.length > 0
                        ? e.target.files[0]
                        : null;
                    field.onChange(file);
                  }}
                />
              )}
            />

            {image && (
              <div className="mt-4 flex items-center gap-4">
                <div className="relative w-[150px] h-[150px] rounded-lg overflow-hidden border-2 border-[#0A3161]">
                  <Image
                    src={URL.createObjectURL(image)}
                    alt="Selected"
                    fill
                    className="object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setValue("image", null)}
                  className="text-red-600 hover:underline text-sm cursor-pointer"
                >
                  Remove Photo
                </button>
              </div>
            )}
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
