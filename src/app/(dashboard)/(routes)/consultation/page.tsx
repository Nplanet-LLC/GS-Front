"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

interface ConsultationFormData {
  link: string;
}

export default function ConsultationSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ConsultationFormData>({
    defaultValues: {
      link: "",
    },
  });

  const onSubmit = async (data: ConsultationFormData) => {
    setLoading(true);
    setSaved(false);

    try {
      const response = await axios.post(
        "https://glocalapiv2.runasp.net/api/Consultation/add-consultation",
        {
          link: data.link,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSaved(true);
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
      console.error("Saving failed", error);
      toast.error("Failed to add Client. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    setLoading(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-black">
        Update Consultation Link
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 max-w-lg"
      >
        <div>
          <label className="font-medium text-black">
            Consultation iFrame URL
          </label>
          <input
            type="text"
            {...register("link", {
              required: "Consultation link is required",
              pattern: {
                value: /^https?:\/\/.+/,
                message:
                  "Please enter a valid URL starting with http:// or https://",
              },
            })}
            className="w-full p-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
            placeholder="https://example.com"
          />
          {errors.link && (
            <p className="text-red-600 text-sm mt-1">{errors.link.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
