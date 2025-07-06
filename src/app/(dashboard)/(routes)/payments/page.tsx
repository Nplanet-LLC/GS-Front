"use client";

import React from "react";
import DataTable, { TableStyles } from "react-data-table-component";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Paid" | "Pending" | "Failed";
};

const data: User[] = [
  {
    id: 1,
    name: "أحمد",
    email: "ahmed@example.com",
    role: "مدير",
    status: "Paid",
  },
  {
    id: 2,
    name: "سارة",
    email: "sara@example.com",
    role: "محرر",
    status: "Pending",
  },
  {
    id: 3,
    name: "محمد",
    email: "mohamed@example.com",
    role: "مشرف",
    status: "Failed",
  },
  {
    id: 4,
    name: "ليلى",
    email: "laila@example.com",
    role: "مشرف",
    status: "Paid",
  },
  {
    id: 5,
    name: "خالد",
    email: "khaled@example.com",
    role: "مستخدم",
    status: "Pending",
  },
];

// دالة ترجع عنصر ملوّن حسب الحالة
const renderStatus = (status: User["status"]) => {
  const baseClasses =
    "px-3 py-1 rounded-full text-sm font-medium w-fit mx-auto";

  switch (status) {
    case "Paid":
      return (
        <span
          className={`${baseClasses} bg-[#D1FAE5] !w-[80px] text-center rounded-xl text-[#059669]`}
        >
          Paid
        </span>
      );
    case "Pending":
      return (
        <span
          className={`${baseClasses} bg-[#FEF3C7] !w-[80px] text-center rounded-xl text-[#D97706]`}
        >
          Pending
        </span>
      );
    case "Failed":
      return (
        <span
          className={`${baseClasses} bg-[#FEE2E2] !w-[80px] text-center rounded-xl text-[#DC2626]`}
        >
          Failed
        </span>
      );
    default:
      return null;
  }
};

// الأعمدة
const columns = [
  {
    name: "الاسم",
    selector: (row: User) => row.name,
    sortable: true,
  },
  {
    name: "البريد الإلكتروني",
    selector: (row: User) => row.email,
  },
  {
    name: "الدور",
    selector: (row: User) => row.role,
  },
  {
    name: "الحالة",
    cell: (row: User) => renderStatus(row.status),
    center: true,
  },
];

// تخصيص الألوان
const customStyles: TableStyles = {
  headRow: {
    style: {
      backgroundColor: "#F9FAFB",
      fontWeight: "bold",
    },
  },
  rows: {
    style: {
      //   backgroundColor: "#DBEAFE",
      color: "#1E3A8A",
      padding: "5px",
    },
  },
};

const paginationComponentOptions = {
  rowsPerPageText: "عدد الصفوف:",
  rangeSeparatorText: "من",
  selectAllRowsItem: true,
  selectAllRowsItemText: "الكل",
};

export default function MyTable() {
  return (
    <div className="p-4 px-6 mx-auto">
      <DataTable
        columns={columns}
        data={data}
        responsive
        highlightOnHover={true}
        pointerOnHover={true}
        customStyles={customStyles}
        noDataComponent="لا توجد بيانات"
        // paginationComponentOptions={paginationComponentOptions}
        pagination={false}
      />
    </div>
  );
}
