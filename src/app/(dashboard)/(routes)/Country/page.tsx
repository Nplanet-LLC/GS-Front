"use client";

import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";

interface Country {
  id: number;
  countryName: string;
}

const CountryPage = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [newCountry, setNewCountry] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchCountries = async () => {
    try {
      const response = await fetch(
        "https://glocalapiv2.runasp.net/api/Country/get-all"
      );
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      toast.error("Failed to fetch countries");
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleAddCountry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCountry.trim()) {
      toast.error("Please enter a country name");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        "https://glocalapiv2.runasp.net/api/Country/add-country",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ countryName: newCountry }),
        }
      );

      if (response.ok) {
        toast.success("Country added successfully");
        setNewCountry("");
        fetchCountries();
      } else {
        toast.error("Failed to add country");
      }
    } catch (error) {
      toast.error("Failed to add country");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCountry = async (id: number, countryName: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete ${countryName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `https://glocalapiv2.runasp.net/api/Country/delete-country/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          Swal.fire("Deleted!", "Country has been deleted.", "success");
          fetchCountries();
        } else {
          Swal.fire("Error!", "Failed to delete country.", "error");
        }
      } catch (error) {
        Swal.fire("Error!", "Failed to delete country.", "error");
      }
    }
  };

  const columns = [
    {
      name: "ID",
      selector: (row: Country) => row.id,
      sortable: true,
    },
    {
      name: "Country Name",
      selector: (row: Country) => row.countryName,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: Country) => (
        <button
          onClick={() => handleDeleteCountry(row.id, row.countryName)}
          className="cursor-pointer p-2 text-red-500 hover:text-red-700 transition-colors"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#0A3161]">
          Countries Management
        </h1>
      </div>

      <form onSubmit={handleAddCountry} className="flex gap-4">
        <input
          type="text"
          placeholder="Enter country name"
          value={newCountry}
          onChange={(e) => setNewCountry(e.target.value)}
          className="px-4 py-2 border rounded-lg text-black !border-[#0A3161] focus:outline-none focus:ring-0 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Adding..." : "Add Country"}
        </button>
      </form>

      <div className="border rounded-lg">
        <DataTable
          columns={columns}
          data={countries}
          pagination
          highlightOnHover
          responsive
          striped
        />
      </div>
    </div>
  );
};

export default CountryPage;
