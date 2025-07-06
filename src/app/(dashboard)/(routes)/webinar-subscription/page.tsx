"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable, { TableStyles } from "react-data-table-component";
import { format } from "date-fns";
import { Pagination } from "../../../components/Pagination";
import { Search } from "lucide-react";
import { columns, type WebinarBooking } from "./columns";

const customStyles: TableStyles = {
  table: {
    style: {
      backgroundColor: "transparent",
    },
  },
  rows: {
    style: {
      backgroundColor: "transparent",
      "&:nth-of-type(odd)": {
        backgroundColor: "#f9fafb",
      },
      "&:hover": {
        backgroundColor: "#f3f4f6",
      },
    },
  },
  headRow: {
    style: {
      backgroundColor: "#f3f4f6",
      borderBottom: "1px solid #e5e7eb",
    },
  },
  headCells: {
    style: {
      paddingLeft: "16px",
      paddingRight: "16px",
      fontWeight: "600",
      color: "#374151",
      fontSize: "14px",
    },
  },
  cells: {
    style: {
      paddingLeft: "16px",
      paddingRight: "16px",
      fontSize: "14px",
      whiteSpace: "normal",
      overflow: "visible",
    },
  },
};

const WebinarSubscriptionPage = () => {
  const [data, setData] = useState<WebinarBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  const fetchData = async (page: number = currentPage) => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}Webinar/get-all-bookingWebinar`);
      const allData = response.data;

      // Calculate pagination
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedData = allData.slice(startIndex, endIndex);

      setData(paginatedData);
      setTotalPages(Math.ceil(allData.length / itemsPerPage));
    } catch (error) {
      console.error("Error fetching webinar bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchData(page);
  };

  const filteredData = data.filter(
    (item) =>
      item.email.toLowerCase().includes(filterText.toLowerCase()) ||
      item.firstName.toLowerCase().includes(filterText.toLowerCase()) ||
      item.lastName.toLowerCase().includes(filterText.toLowerCase()) ||
      item.nameWebinar.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-6 rounded-lg shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Webinar Subscriptions
            </h1>
            <p className="text-sm text-gray-600">
              View and manage all webinar bookings
            </p>
          </div>
          <div className="w-full md:w-1/3 relative">
            <input
              type="text"
              placeholder="Search by email, name or webinar..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-black placeholder:text-gray-400"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm">
          <DataTable
            columns={columns}
            data={filteredData}
            customStyles={customStyles}
            pagination={false}
            progressPending={loading}
            progressComponent={
              <div className="flex items-center justify-center h-48">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            }
            noDataComponent={
              <div className="flex items-center justify-center h-48 text-gray-500">
                No subscriptions found
              </div>
            }
          />
          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebinarSubscriptionPage;
