import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

type Service = {
  image: any;
  Name: string;
  Description: string;
  Photo: string | null;
  PriceCompany: number;
  Id: number;
};

interface EditServiceModalProps {
  service: Service;
  onSuccess: () => void;
  apiUrl: string;
}

export const handleEditService = async ({
  service,
  onSuccess,
  apiUrl,
}: EditServiceModalProps) => {
  const { value: formValues } = await Swal.fire({
    title: "Edit Service",
    html: `
        <div class="space-y-4 !bg-red-500">
          <div class="text-left">
            <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input id="swal-name" class="w-full px-3 py-2 border border-gray-300 rounded-md" value="${
              service.Name
            }" />
          </div>
          <div class="text-left">
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea id="swal-description" class="w-full px-3 py-2 border border-gray-300 rounded-md" rows="3">${
              service.Description
            }</textarea>
          </div>
          <div class="text-left">
            <label class="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input id="swal-price" type="number" class="w-full px-3 py-2 border border-gray-300 rounded-md" value="${
              service.PriceCompany
            }" step="0.01" />
          </div>
          <div class="text-left">
            <label class="block text-sm font-medium text-gray-700 mb-1">Upload New Image</label>
            <input id="swal-image" type="file" accept="image/*" class="w-full text-sm" />
          </div>
          ${
            service.Photo
              ? `<div class="text-left">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Current Image</label>
                  <img src="${apiUrl}${service.Photo}" alt="${service.Name}" class="w-32 h-32 object-cover rounded-md" />
                </div>`
              : ""
          }
        </div>
      `,
    showCancelButton: true,
    confirmButtonText: "Save Changes",
    cancelButtonText: "Cancel",
    preConfirm: () => {
      const name = (document.getElementById("swal-name") as HTMLInputElement)
        .value;
      const description = (
        document.getElementById("swal-description") as HTMLTextAreaElement
      ).value;
      const priceCompany = parseFloat(
        (document.getElementById("swal-price") as HTMLInputElement).value
      );
      const imageInput = document.getElementById(
        "swal-image"
      ) as HTMLInputElement;
      const imageFile = imageInput?.files?.[0] || null;

      if (!name || !description || isNaN(priceCompany)) {
        Swal.showValidationMessage("Please fill in all fields correctly");
        return false;
      }

      return {
        name,
        description,
        priceCompany,
        imageFile,
      };
    },
  });

  if (formValues) {
    try {
      const updateData = new FormData();
      updateData.append("Id", service.Id.toString());
      updateData.append("Name", formValues.name);
      updateData.append("Description", formValues.description);
      updateData.append("PriceCompany", formValues.priceCompany.toString());

      if (formValues.imageFile) {
        updateData.append("Image", formValues.imageFile); // اسم البارامتر زي اللي في DTO
      } else {
        updateData.append("Photo", service.Photo ?? ""); // لو الصورة قديمة
      }

      await axios.put(
        `${apiUrl}Service/update-service/${service.Id}`,
        updateData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Service updated successfully");
      onSuccess();
    } catch (error: any) {
      toast.error("Failed to update service");
      console.error("Error updating service:", error.response || error);
    }
  }
};
