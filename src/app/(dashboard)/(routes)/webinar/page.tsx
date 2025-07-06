"use client";

import React, { useEffect, useState } from "react";
import DataTable, { TableStyles } from "react-data-table-component";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Pagination } from "../../../components/Pagination";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

type Webinar = {
  id: number;
  title: string;
  description: string;
  date: string;
  priceIndividual: number;
};

export default function WebinarTable() {
  const url = "https://glocalapiv2.runasp.net/api/";
  const [data, setData] = useState<Webinar[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const fetchData = async (page: number = currentPage) => {
    setLoading(true);
    try {
      const response = await axios.get<Webinar[]>(`${url}Webinar/get-all`);
      const allData = response.data;

      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedData = allData.slice(startIndex, endIndex);

      setData(paginatedData);
      setTotalPages(Math.ceil(allData.length / itemsPerPage));
    } catch (err: any) {
      setError(err?.message || "An error occurred while fetching data.");
      toast.error("Failed to fetch webinars");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchData(page);
  };

  const handleEdit = async (webinar: Webinar) => {
    const { value: formValues } = await Swal.fire({
      title: "Edit Webinar",
      html: `
        <div class="space-y-4 w-full">
          <div class="w-full">
            <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input id="title" class="swal2-input  !w-[90%] !mx-auto" placeholder="Enter title" value="${
              webinar.title
            }">
          </div>
          <div class="w-full">
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea id="description" class="swal2-textarea  !w-[90%] !mx-auto" placeholder="Enter description" style="min-height: 100px;">${
              webinar.description
            }</textarea>
          </div>
          <div class="w-full">
            <label class="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
            <input id="date" type="datetime-local" class="swal2-input  !w-[90%] !mx-auto" value="${webinar.date.slice(
              0,
              16
            )}">
          </div>
          <div class="w-full">
            <label class="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
            <input id="price" type="number" class="swal2-input  !w-[90%] !mx-auto" placeholder="Enter price" value="${
              webinar.priceIndividual
            }">
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
        const title = (document.getElementById("title") as HTMLInputElement)
          .value;
        const description = (
          document.getElementById("description") as HTMLTextAreaElement
        ).value;
        const dateInput = (document.getElementById("date") as HTMLInputElement)
          .value;
        const price = (document.getElementById("price") as HTMLInputElement)
          .value;

        if (!title || !description || !dateInput || !price) {
          Swal.showValidationMessage("Please fill all fields");
          return false;
        }

        const date = new Date(dateInput).toISOString();

        return {
          id: webinar.id,
          title,
          description,
          date,
          notes: "",
          priceIndividual: Number(price),
        };
      },
    });

    if (formValues) {
      try {
        await axios.put(
          `${url}Webinar/update-webinar/${webinar.id}`,
          formValues
        );
        toast.success("Webinar updated successfully");
        fetchData(currentPage);
      } catch (error) {
        toast.error("Failed to update webinar");
        console.error("Error updating webinar:", error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Delete Webinar",
      text: "Are you sure you want to delete this webinar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#B31942",
      cancelButtonColor: "#0A3161",
      customClass: {
        popup: "swal-wide",
        title: "text-xl font-bold text-[#0A3161]",
        confirmButton: "px-6 py-2 rounded-md",
        cancelButton: "px-6 py-2 rounded-md",
      },
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${url}Webinar/delete-webinar/${id}`);
        toast.success("Webinar has been deleted.");
        fetchData(currentPage);
      } catch (error) {
        toast.error("Failed to delete webinar.");
        console.error("Error deleting webinar:", error);
      }
    }
  };

  const columns = [
    {
      name: "Title",
      selector: (row: Webinar) => row.title,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row: Webinar) => row.description,
      width: "400px",
      cell: (row: Webinar) => (
        <div className="truncate max-w-[400px]" title={row.description}>
          {row.description}
        </div>
      ),
    },
    {
      name: "Date",
      selector: (row: Webinar) =>
        row.date === "0001-01-01T00:00:00"
          ? "Not specified"
          : new Date(row.date).toLocaleDateString("en-US"),
      sortable: true,
    },
    {
      name: "Price",
      selector: (row: Webinar) => `${row.priceIndividual}`,
      sortable: true,
      center: true,
    },
    {
      name: "Actions",
      cell: (row: Webinar) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row)}
            className="p-2 cursor-pointer text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full transition-colors"
            aria-label="Edit webinar"
          >
            <Pencil className="w-4 h-4" />
          </button>
          {/* <button
            onClick={() => handleDelete(row.id)}
            className="p-2 cursor-pointer text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full transition-colors"
            aria-label="Delete webinar"
          >
            <Trash2 className="w-4 h-4" />
          </button> */}
        </div>
      ),
      center: true,
      width: "100px",
    },
  ];

  const customStyles: TableStyles = {
    table: {
      style: {
        maxWidth: "100%",
        overflowX: "auto",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#F9FAFB",
        fontWeight: "bold",
        minHeight: "52px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "16px",
        paddingRight: "16px",
        whiteSpace: "nowrap",
      },
    },
    cells: {
      style: {
        paddingLeft: "16px",
        paddingRight: "16px",
        whiteSpace: "nowrap",
      },
    },
    rows: {
      style: {
        color: "#1E3A8A",
        minHeight: "52px",
        "&:not(:last-of-type)": {
          borderBottom: "1px solid #E5E7EB",
        },
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
