"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable, { TableStyles } from "react-data-table-component";
import { Pagination } from "../../../components/Pagination";
import {
  Search,
  Mail,
  Phone,
  Building,
  MapPin,
  MessageCircle,
  X,
} from "lucide-react";

interface ContactUs {
  firstName: string;
  lastName: string;
  companyName: string;
  phoneNumber: string;
  email: string;
  inquiry: string;
  countryName: string;
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

const ContactUsPage = () => {
  const [data, setData] = useState<ContactUs[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedInquiry, setSelectedInquiry] = useState<ContactUs | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 10;
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  const fetchData = async (page: number = currentPage) => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}ContactUs/get-all`);
      const allData = response.data;

      // Calculate pagination
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedData = allData.slice(startIndex, endIndex);

      setData(paginatedData);
      setTotalPages(Math.ceil(allData.length / itemsPerPage));
    } catch (error) {
      console.error("Error fetching contact us data:", error);
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

  const handleInquiryClick = (row: ContactUs) => {
    setSelectedInquiry(row);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedInquiry(null);
  };

  const filteredData = data.filter(
    (item) =>
      item.email.toLowerCase().includes(filterText.toLowerCase()) ||
      item.firstName.toLowerCase().includes(filterText.toLowerCase()) ||
      item.lastName.toLowerCase().includes(filterText.toLowerCase()) ||
      item.companyName.toLowerCase().includes(filterText.toLowerCase()) ||
      item.countryName.toLowerCase().includes(filterText.toLowerCase()) ||
      item.phoneNumber.includes(filterText)
  );

  const columns = [
    {
      name: "First Name",
      selector: (row: ContactUs) => row.firstName,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row: ContactUs) => row.lastName,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: ContactUs) => row.email,
      sortable: true,
      wrap: true,
      cell: (row: ContactUs) => (
        <div className="flex items-center space-x-2 break-all">
          <Mail className="h-4 w-4 text-gray-500 flex-shrink-0" />
          <span>{row.email}</span>
        </div>
      ),
    },
    {
      name: "Phone",
      selector: (row: ContactUs) => row.phoneNumber,
      cell: (row: ContactUs) => (
        <div className="flex items-center space-x-2">
          <Phone className="h-4 w-4 text-gray-500 flex-shrink-0" />
          <span>{row.phoneNumber}</span>
        </div>
      ),
    },
    {
      name: "Company",
      selector: (row: ContactUs) => row.companyName,
      sortable: true,
      cell: (row: ContactUs) => (
        <div className="flex items-center space-x-2">
          <Building className="h-4 w-4 text-gray-500 flex-shrink-0" />
          <span>{row.companyName}</span>
        </div>
      ),
    },
    {
      name: "Country",
      selector: (row: ContactUs) => row.countryName,
      sortable: true,
      cell: (row: ContactUs) => (
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0" />
          <span>{row.countryName}</span>
        </div>
      ),
    },
    {
      name: "Inquiry",
      selector: (row: ContactUs) => row.inquiry,
      wrap: true,
      width: "300px",
      cell: (row: ContactUs) => (
        <div
          className="max-w-xs break-words cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
          onClick={() => handleInquiryClick(row)}
          title="Click to view full message"
        >
          <div className="text-sm leading-relaxed">
            {row.inquiry.length > 50
              ? `${row.inquiry.substring(0, 50)}...`
              : row.inquiry}
          </div>
          {row.inquiry.length > 150 && (
            <div className="text-xs text-blue-600 mt-1 font-medium">
              Click to read more
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-6 rounded-lg shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Contact Us Messages
            </h1>
            <p className="text-sm text-gray-600">
              View and manage all contact form submissions
            </p>
          </div>
          <div className="w-full md:w-1/3 relative">
            <input
              type="text"
              placeholder="Search by email, name, company or country..."
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
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No contact messages found</p>
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

      {/* Modal for full inquiry */}
      {showModal && selectedInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                Full Message from {selectedInquiry.firstName}{" "}
                {selectedInquiry.lastName}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Name:</span>
                  <p className="text-gray-900">
                    {selectedInquiry.firstName} {selectedInquiry.lastName}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Email:</span>
                  <p className="text-gray-900">{selectedInquiry.email}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Phone:</span>
                  <p className="text-gray-900">{selectedInquiry.phoneNumber}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Company:</span>
                  <p className="text-gray-900">{selectedInquiry.companyName}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Country:</span>
                  <p className="text-gray-900">{selectedInquiry.countryName}</p>
                </div>
              </div>
              <div>
                <span className="font-medium text-gray-700">Message:</span>
                <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">
                    {selectedInquiry.inquiry}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUsPage;
