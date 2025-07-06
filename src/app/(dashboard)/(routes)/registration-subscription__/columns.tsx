import { format } from "date-fns";

export interface ServiceBooking {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  amount: number;
  payStatus: string;
  transactionId: string | null;
  paymentDate: string;
  nameService: string;
  description: string;
  priceCompany: number;
}

export const columns = [
  {
    name: "First Name",
    selector: (row: ServiceBooking) => row.firstName,
    sortable: true,
  },
  {
    name: "Last Name",
    selector: (row: ServiceBooking) => row.lastName,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row: ServiceBooking) => row.email,
    sortable: true,
    wrap: true,
    cell: (row: ServiceBooking) => <div className="break-all">{row.email}</div>,
  },
  {
    name: "Phone",
    selector: (row: ServiceBooking) => row.phoneNumber,
  },
  {
    name: "Service",
    selector: (row: ServiceBooking) => row.nameService,
    sortable: true,
  },
  {
    name: "Description",
    selector: (row: ServiceBooking) => row.description,
    wrap: true,
  },
  {
    name: "Amount",
    selector: (row: ServiceBooking) => row.amount,
    sortable: true,
    cell: (row: ServiceBooking) => `$${row.amount.toFixed(2)}`,
  },
  {
    name: "Company Price",
    selector: (row: ServiceBooking) => row.priceCompany,
    sortable: true,
    cell: (row: ServiceBooking) => `$${row.priceCompany.toFixed(2)}`,
  },
  {
    name: "Status",
    selector: (row: ServiceBooking) => row.payStatus,
    sortable: true,
    cell: (row: ServiceBooking) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          row.payStatus === "Paid"
            ? "bg-green-100 text-green-800"
            : "bg-yellow-100 text-yellow-800"
        }`}
      >
        {row.payStatus}
      </span>
    ),
  },
  {
    name: "Transaction ID",
    selector: (row: ServiceBooking) => row.transactionId || "-",
    sortable: true,
  },
  {
    name: "Payment Date",
    selector: (row: ServiceBooking) => row.paymentDate,
    sortable: true,
    cell: (row: ServiceBooking) => {
      const date = new Date(row.paymentDate);
      return date.getFullYear() > 1
        ? format(date, "MMM dd, yyyy")
        : "Not paid yet";
    },
  },
];
