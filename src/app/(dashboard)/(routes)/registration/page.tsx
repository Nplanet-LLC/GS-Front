"use client";

import React, { useEffect, useState } from "react";
import DataTable, { TableStyles } from "react-data-table-component";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { handleEditService } from "./components/EditServiceModal";
import { Pagination } from "../../../components/Pagination";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

type Service = {
  name: string;
  description: string;
  image: string | null;
  priceCompany: number;
  id: number;
};

export default function ServicesTable() {
  const url = "https://glocalapiv2.runasp.net/api/";
  const [data, setData] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const fetchData = async (page: number = currentPage) => {
    setLoading(true);
    try {
      const response = await axios.get<Service[]>(`${url}Service/get-all`);
      const allData = response.data;

      // Calculate pagination
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedData = allData.slice(startIndex, endIndex);

      setData(paginatedData);
      setTotalPages(Math.ceil(allData.length / itemsPerPage));
    } catch (err: any) {
      setError(err?.message || "An error occurred while fetching data.");
      toast.error("Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchData(page);
  };

  const handleEdit = async (webinar: Service) => {
    const { value: formValues } = await Swal.fire({
      title: "Edit Registration Service",
      html: `
        <div class="space-y-4 w-full">
          <div class="w-full">
            <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input id="name" class="swal2-input !w-[90%] !mx-auto" placeholder="Enter name" value="${webinar.name}">
          </div>
          <div class="w-full">
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea id="description" class="swal2-textarea !w-[90%] !mx-auto" placeholder="Enter description" style="min-height: 100px;">${webinar.description}</textarea>
          </div>
          <div class="w-full">
            <label class="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
            <input id="price" type="number" class="swal2-input !w-[90%] !mx-auto" placeholder="Enter price" value="${webinar.priceCompany}">
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Save Changes",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#0A3161",
      cancelButtonColor: "#B31942",
      focusConfirm: false,
      customClass: {
        popup: "swal-wide !w-[600px]",
        title: "text-xl font-bold text-[#0A3161] mb-4",
        confirmButton: "px-6 py-2 rounded-md",
        cancelButton: "px-6 py-2 rounded-md",
        htmlContainer: "w-full",
      },
      preConfirm: () => {
        const Name = (document.getElementById("name") as HTMLInputElement)
          .value;
        const Description = (
          document.getElementById("description") as HTMLTextAreaElement
        ).value;
        const PriceCompany = (
          document.getElementById("price") as HTMLInputElement
        ).value;

        if (!Name || !Description || !PriceCompany) {
          Swal.showValidationMessage("Please fill all fields");
          return false;
        }

        // return {
        //   id: webinar.id,
        //   name: Name,
        //   description: Description,
        //   priceCompany: PriceCompany,
        // };
        return {
          Id: webinar.id,
          Name,
          Description,
          PriceCompany,
        };
      },
    });

    if (formValues) {
      try {
        await axios.put(
          `${url}Service/update-service/${webinar.id}`,
          formValues,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Registration service updated successfully");
        fetchData(currentPage);
      } catch (error) {
        toast.error("Failed to update registration service");
        console.error("Error updating registration service:", error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Delete Registration Service",
      text: "Are you sure you want to delete this service?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#B31942",
      cancelButtonColor: "#0A3161",
      customClass: {
        popup: "swal-wide !w-[600px]",
        title: "text-xl font-bold text-[#0A3161] mb-4",
        confirmButton: "px-6 py-2 rounded-md",
        cancelButton: "px-6 py-2 rounded-md",
      },
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${url}Service/delete-service/${id}`);
        toast.success("Registration service has been deleted.");
        fetchData(currentPage);
      } catch (error) {
        toast.error("Cannot delete: service has an active payment");
        console.error("Error deleting:", error);
      }
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row: Service) => row.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row: Service) => row.description,
    },
    {
      name: "Price",
      selector: (row: Service) => `${row.priceCompany} `,
      sortable: true,
      center: true,
    },
    {
      name: "Actions",
      cell: (row: Service) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row)}
            className="p-2 cursor-pointer text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full transition-colors"
            aria-label="Edit service"
          >
            <Pencil className="w-4 h-4" />
          </button>
          {/* <button
            onClick={() => handleDelete(row.id)}
            className="p-2 cursor-pointer text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full transition-colors"
            aria-label="Delete service"
          >
            <Trash2 className="w-4 h-4" />
          </button> */}
        </div>
      ),
      center: true,
    },
  ];

  const customStyles: TableStyles = {
    headRow: {
      style: {
        backgroundColor: "#F9FAFB",
        fontWeight: "bold",
      },
    },
    rows: {
      style: {
        color: "#1E3A8A",
        padding: "5px",
      },
    },
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4 px-6 mx-auto">
      <DataTable
        columns={columns}
        data={data}
        responsive
        highlightOnHover
        pointerOnHover
        customStyles={customStyles}
        progressPending={loading}
        progressComponent={<LoadingSpinner />}
        noDataComponent={error || "No data available"}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
