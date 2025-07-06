"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable, { TableStyles } from "react-data-table-component";
import { Pagination } from "../../../components/Pagination";
import { Search, Mail } from "lucide-react";

interface Subscribe {
  id: number;
  email: string;
}

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

const columns = [
  {
    name: "ID",
    selector: (row: Subscribe) => row.id,
    sortable: true,
    width: "80px",
  },
  {
    name: "Email",
    selector: (row: Subscribe) => row.email,
    sortable: true,
    wrap: true,
    cell: (row: Subscribe) => (
      <div className="flex items-center space-x-2 break-all">
        <Mail className="h-4 w-4 text-gray-500 flex-shrink-0" />
        <span>{row.email}</span>
      </div>
    ),
  },
];

const GeneralSubscriptionPage = () => {
  const [data, setData] = useState<Subscribe[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  const fetchData = async (page: number = currentPage) => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}Subscribe/get-all`);
      const allData = response.data;

      // Calculate pagination
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedData = allData.slice(startIndex, endIndex);

      setData(paginatedData);
      setTotalPages(Math.ceil(allData.length / itemsPerPage));
    } catch (error) {
      console.error("Error fetching subscribers:", error);
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
      item.id.toString().includes(filterText)
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-6 rounded-lg shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              General Subscriptions
            </h1>
            <p className="text-sm text-gray-600">
              View all newsletter subscribers
            </p>
          </div>
          <div className="w-full md:w-1/3 relative">
            <input
              type="text"
              placeholder="Search by email or ID..."
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
                <div className="text-center">
                  <Mail className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No subscribers found</p>
                </div>
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

export default GeneralSubscriptionPage;
